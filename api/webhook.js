// api/webhook.js
import crypto from 'crypto';
import { PrivateKey } from 'symbol-sdk';
import { SymbolFacade, descriptors, models } from 'symbol-sdk/symbol';

// ===== env =====
const NETWORK     = process.env.NETWORK_TYPE || 'testnet';
const NODE_URL    = process.env.NODE_URL;                 // 例: https://symbol-test.opening-line.jp:3001
const LINE_SECRET = process.env.LINE_CHANNEL_SECRET;
const LINE_TOKEN  = process.env.LINE_ACCESS_TOKEN;
const PRIVATE_KEY = process.env.SYMBOL_PRIVATE_KEY;

// Testnet XYM
const XYM_ID = 0x72C0212E67A08BCEn;
const FEE_MULTIPLIER   = 100;
const DEADLINE_SECONDS = 5 * 60;

const facade = new SymbolFacade(NETWORK);

function ensureEnv() {
  const missing = [];
  if (!NODE_URL)    missing.push('NODE_URL');
  if (!LINE_SECRET) missing.push('LINE_CHANNEL_SECRET');
  if (!LINE_TOKEN)  missing.push('LINE_ACCESS_TOKEN');
  if (!PRIVATE_KEY) missing.push('SYMBOL_PRIVATE_KEY');
  if (missing.length) throw new Error(`Missing env: ${missing.join(', ')}`);
}

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
  try {
    await fetch('https://api.line.me/v2/bot/message/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${LINE_TOKEN}` },
      body: JSON.stringify({ replyToken, messages: [{ type: 'text', text }] })
    });
  } catch (e) {
    console.error('LINE reply error:', e);
  }
}

// --- send Symbol tx using typed descriptor (v3流) ---
async function sendToSymbol(uid, msg) {
  ensureEnv();

  // 署名者（アカウント）
  const signer    = facade.createAccount(new PrivateKey(PRIVATE_KEY));
  const myAddress = facade.network.publicKeyToAddress(signer.publicKey); // Address オブジェクト

  // なるべく短く（過長でRESTが弾くのを防ぐ）
  const note = JSON.stringify({
    t: 'line', uid: String(uid).slice(0, 16), msg: String(msg).slice(0, 160), ts: new Date().toISOString()
  });

  // typed descriptor
  const typed = new descriptors.TransferTransactionV1Descriptor(
    myAddress, // そのまま渡してOK
    [
      new descriptors.UnresolvedMosaicDescriptor(
        new models.UnresolvedMosaicId(XYM_ID),
        new models.Amount(0n) // BigInt
      )
    ],
    note // プレーンメッセージ
  );

  // 作成
  const tx = facade.createTransactionFromTypedDescriptor(
    typed,
    signer.publicKey,
    FEE_MULTIPLIER,
    DEADLINE_SECONDS
  );
  console.log('📝 create tx v1, deadline:', DEADLINE_SECONDS, 'sec');

  // 署名→payload
  const signature = signer.signTransaction(tx);
  const payload   = facade.transactionFactory.static.attachSignature(tx, signature);
  const hash      = facade.hashTransaction(tx).toString();

  console.log('🔑 tx hash:', hash);
  console.log('📦 payload length:', typeof payload === 'string' ? payload.length : JSON.stringify(payload).length);

  // announce
  console.log('🌐 announce to:', `${NODE_URL}/transactions`);
  const res  = await fetch(`${NODE_URL}/transactions`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload })
  });
  const text = await res.text();
  console.log('📡 node status:', res.status);
  console.log('📡 node body  :', text);

  if (!res.ok || !/pushed/i.test(text)) {
    throw new Error(`announce failed: ${res.status} ${text}`);
  }

  return `https://testnet.symbol.fyi/transactions/${hash}`;
}

// --- webhook handler ---
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('ok');

  try {
    ensureEnv();
  } catch (e) {
    console.error(e.message);
    return res.status(500).end('server env not ready');
  }

  const raw = await getRawBody(req);
  const sig = req.headers['x-line-signature'];
  if (!verifyLine(raw, sig)) return res.status(403).end('forbidden');

  // 受信確認（署名検証後にログ）
  try {
    const preview = raw.toString('utf8').slice(0, 256);
    console.log('✅ LINE Webhook received, raw preview:', preview);
  } catch {}

  // 先にACK（LINEのタイムアウト対策）
  res.status(200).end('ok');

  try {
    const body = JSON.parse(raw.toString('utf8'));
    for (const ev of body?.events || []) {
      if (ev.type === 'message' && ev.message?.type === 'text') {
        const userId = ev.source?.userId || 'unknown';
        const text   = ev.message.text;
        console.log('✉️  user:', userId, 'msg:', text);

        try {
          const url = await sendToSymbol(userId, text);
          await replyLine(ev.replyToken, `📝 ブロックチェーンに記録しました\n${url}`);
        } catch (e) {
          console.error('TX error:', e);
          await replyLine(ev.replyToken, `⚠️ 送信に失敗: ${String(e).slice(0, 160)}`);
        }
      }
    }
  } catch (e) {
    console.error('parse error:', e);
  }
}

// （Next.js 互換のrawボディ対策・Vercelでは無視されても害なし）
export const config = { api: { bodyParser: false } };
