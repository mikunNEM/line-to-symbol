// api/webhook.js
import crypto from 'crypto';
import { PrivateKey } from 'symbol-sdk';
import { SymbolFacade, Address, descriptors, models } from 'symbol-sdk/symbol';

// ===== env =====
const NETWORK = process.env.NETWORK_TYPE || 'testnet';
const NODE_URL = process.env.NODE_URL; // 例: https://symbol-test.opening-line.jp:3001
const LINE_SECRET = process.env.LINE_CHANNEL_SECRET;
const LINE_TOKEN  = process.env.LINE_ACCESS_TOKEN;
const PRIVATE_KEY = process.env.SYMBOL_PRIVATE_KEY;

// Testnet XYM
const XYM_ID = 0x72C0212E67A08BCEn;
const FEE_MULTIPLIER = 100;
const DEADLINE_SECONDS = 5 * 60;

const facade = new SymbolFacade(NETWORK);

// --- raw body for LINE signature ---
async function getRawBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c));
  return Buffer.concat(chunks);
}
const verifyLine = (raw, sig) =>
  !!sig && crypto.createHmac('sha256', LINE_SECRET).update(raw).digest('base64') === sig;

// --- LINE reply ---
async function replyLine(replyToken, text) {
  await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${LINE_TOKEN}` },
    body: JSON.stringify({ replyToken, messages: [{ type: 'text', text }] })
  });
}

// --- send Symbol tx using typed descriptor (v3流) ---
async function sendToSymbol(uid, msg) {
  // 署名者（アカウント）作成 - v3 では createAccount が使える
  const signer = facade.createAccount(new PrivateKey(PRIVATE_KEY));
  const myAddress = facade.network.publicKeyToAddress(signer.publicKey);

  // なるべく短く整形（メッセージ過長でエラーを避ける）
  const note = JSON.stringify({
    t: 'line', uid: String(uid).slice(0, 16), msg: String(msg).slice(0, 160), ts: new Date().toISOString()
  });

  // typed descriptor で定義（models.* を使うのがポイント。Amount/UnresolvedMosaicId はここから）
  const typed = new descriptors.TransferTransactionV1Descriptor(
    new Address(myAddress.toString()),
    [
      new descriptors.UnresolvedMosaicDescriptor(
        new models.UnresolvedMosaicId(XYM_ID),
        new models.Amount(0n) // BigInt
      )
    ],
    note // プレーンメッセージ
  );

  // トランザクション生成
  const tx = facade.createTransactionFromTypedDescriptor(
    typed,
    signer.publicKey,
    FEE_MULTIPLIER,
    DEADLINE_SECONDS
  );

  // 署名→payload
  const signature = signer.signTransaction(tx);
  const payload   = facade.transactionFactory.static.attachSignature(tx, signature);
  const hash      = facade.hashTransaction(tx).toString();

  // announce
  const res = await fetch(`${NODE_URL}/transactions`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload })
  });
  if (!res.ok) throw new Error(`announce failed: ${res.status} ${await res.text()}`);

  return `https://testnet.symbol.fyi/transactions/${hash}`;
}

// --- webhook handler ---
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
  } catch { /* 解析失敗は無視 */ }
}

