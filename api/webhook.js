// api/webhook.js  (Vercel Node.js 20)
/**
 * 必要な環境変数（Vercel Project Settings → Environment Variables）
 * - NETWORK_TYPE = 'testnet'
 * - NODE_URL = 'https://symbol-test.opening-line.jp:3001' など
 * - LINE_CHANNEL_SECRET
 * - LINE_ACCESS_TOKEN
 * - SYMBOL_PRIVATE_KEY  (テストネット用 64hex)
 */
import crypto from 'crypto';
import { PrivateKey } from 'symbol-sdk';
import {
  SymbolFacade, Address, PublicKey
} from 'symbol-sdk/symbol';

// ====== 設定 ======
const NETWORK = process.env.NETWORK_TYPE || 'testnet';
const NODE_URL = process.env.NODE_URL;
const LINE_SECRET = process.env.LINE_CHANNEL_SECRET;
const LINE_TOKEN  = process.env.LINE_ACCESS_TOKEN;
const PRIVATE_KEY = process.env.SYMBOL_PRIVATE_KEY;

// Testnet XYM MosaicId
const XYM_ID = 0x72C0212E67A08BCEn;

const facade = new SymbolFacade(NETWORK);

// --- Vercel で生ボディを取得（署名検証用） ---
async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
}
const verifyLine = (raw, sig) =>
  !!sig && crypto.createHmac('sha256', LINE_SECRET).update(raw).digest('base64') === sig;

// --- LINEへ返信 ---
async function replyLine(replyToken, text) {
  await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${LINE_TOKEN}` },
    body: JSON.stringify({ replyToken, messages: [{ type: 'text', text }] })
  });
}

// --- Symbolへ送信（メッセージを刻む） ---
async function sendToSymbol(uid, msg) {
  const keyPair = new facade.static.KeyPair(new PrivateKey(PRIVATE_KEY));
  const pubKey = keyPair.publicKey.toString();
  const myAddress = facade.network.publicKeyToAddress(keyPair.publicKey).toString();

  // チェーンに載せるペイロード（短くする）
  const note = JSON.stringify({
    t: 'line',
    uid: String(uid).slice(0, 16),
    msg: String(msg).slice(0, 160),
    ts: new Date().toISOString()
  });

  // object 記法で作成（BigInt を直接使用）
  const tx = facade.transactionFactory.create({
    type: 'transfer_transaction_v1',
    signerPublicKey: pubKey,
    fee: 1000000n, // 手数料調整は適宜
    deadline: BigInt(Math.floor(Date.now() / 1000) + 5 * 60), // 5分
    recipientAddress: myAddress, // 自分宛
    mosaics: [{ mosaicId: XYM_ID, amount: 0n }],
    message: note // プレーンメッセージ
  });

  const signature = facade.signTransaction(keyPair, tx);
  const payload = facade.transactionFactory.static.attachSignature(tx, signature);
  const hash = facade.hashTransaction(tx).toString();

  const r = await fetch(`${NODE_URL}/transactions`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload })
  });
  if (!r.ok) throw new Error(`announce failed: ${r.status} ${await r.text()}`);

  return `https://testnet.symbol.fyi/transactions/${hash}`;
}

// --- Webhook ハンドラ ---
export default async function handler(req, res) {
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
  } catch { /* 失敗は無視 */ }
}

