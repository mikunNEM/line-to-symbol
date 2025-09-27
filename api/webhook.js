// api/webhook.js
import crypto from 'crypto';
import { PrivateKey } from 'symbol-sdk';
import {
  SymbolFacade, descriptors, models,
  Address, PublicKey, UnresolvedMosaicId, Amount, PlainMessage
} from 'symbol-sdk/symbol';

const NETWORK = process.env.NETWORK_TYPE || 'testnet';
const NODE_URL = process.env.NODE_URL; // 例: https://symbol-test.opening-line.jp:3001
const LINE_SECRET = process.env.LINE_CHANNEL_SECRET;
const LINE_TOKEN  = process.env.LINE_ACCESS_TOKEN;
const PRIVATE_KEY = process.env.SYMBOL_PRIVATE_KEY;
const XYM_ID_HEX  = '72C0212E67A08BCE'; // Testnet XYM

const facade = new SymbolFacade(NETWORK);

// Vercelで“生ボディ”を読む（署名検証用）
async function getRawBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c));
  return Buffer.concat(chunks);
}
const verifyLine = (raw, sig) =>
  !!sig && crypto.createHmac('sha256', LINE_SECRET).update(raw).digest('base64') === sig;

async function replyLine(replyToken, text) {
  await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${LINE_TOKEN}` },
    body: JSON.stringify({ replyToken, messages: [{ type: 'text', text }] })
  });
}

async function sendToSymbol(uid, msg) {
  const keyPair = new facade.static.KeyPair(new PrivateKey(PRIVATE_KEY));
  const pubKey  = keyPair.publicKey;
  const myAddr  = facade.network.publicKeyToAddress(pubKey).toString();

  const note = JSON.stringify({
    t:'line', uid:String(uid).slice(0,16), msg:String(msg).slice(0,160), ts:new Date().toISOString()
  });

  const typed = new descriptors.TransferTransactionV1Descriptor(
    new Address(myAddr),
    [ new descriptors.UnresolvedMosaicDescriptor(
        new UnresolvedMosaicId(BigInt('0x'+XYM_ID_HEX)), new Amount(0n)
      )
    ],
    new PlainMessage(note)
  );

  const tx = facade.createTransactionFromTypedDescriptor(typed, new PublicKey(pubKey.toString()), 100, 5*60);
  const signature = facade.signTransaction(keyPair, tx);
  const payload   = facade.transactionFactory.static.attachSignature(tx, signature);
  const hash      = facade.hashTransaction(tx).toString();

  const r = await fetch(`${NODE_URL}/transactions`, {
    method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ payload })
  });
  if (!r.ok) throw new Error(`announce failed: ${r.status} ${await r.text()}`);
  return `https://testnet.symbol.fyi/transactions/${hash}`;
}

export default async function handler(req, res) {
  // GETでブラウザから開いた時はヘルスチェックだけ返す
  if (req.method !== 'POST') return res.status(200).send('ok');

  const raw = await getRawBody(req);
  const sig = req.headers['x-line-signature'];
  if (!verifyLine(raw, sig)) return res.status(403).end('forbidden');

  // 先にACK
  res.status(200).end('ok');

  try {
    const body = JSON.parse(raw.toString('utf8'));
    for (const ev of body?.events || []) {
      if (ev.type === 'message' && ev.message?.type === 'text') {
        try {
          const url = await sendToSymbol(ev.source?.userId || 'unknown', ev.message.text);
          await replyLine(ev.replyToken, `📝 ブロックチェーンに記録しました\n${url}`);
        } catch (e) {
          await replyLine(ev.replyToken, `⚠️ 送信に失敗: ${String(e).slice(0,120)}`);
        }
      }
    }
  } catch {/* 解析失敗は無視 */}
}

