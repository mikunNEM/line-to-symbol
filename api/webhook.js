// api/webhook.js
// LINE → (署名検証) → TX生成 → 署名 → ノードにannounce（8秒タイムアウト）
// 失敗時は原因を Runtime Logs に必ず出す

import crypto from 'crypto';
import { PrivateKey } from 'symbol-sdk';
import { SymbolFacade, descriptors, models } from 'symbol-sdk/symbol';

// ===== env =====
const NETWORK     = process.env.NETWORK_TYPE || 'testnet';          // 'testnet' | 'mainnet'
const NODE_URL    = process.env.NODE_URL;                           // 例: https://symbol-test.opening-line.jp:3001
const LINE_SECRET = process.env.LINE_CHANNEL_SECRET;
const LINE_TOKEN  = process.env.LINE_ACCESS_TOKEN;
const PRIVATE_KEY = process.env.SYMBOL_PRIVATE_KEY;

// XYM mosaicId
const XYM_ID = NETWORK === 'mainnet'
  ? 0x6BED913FA20223F8n   // mainnet
  : 0x72C0212E67A08BCEn;  // testnet

const FEE_MULTIPLIER = 100;
const facade = new SymbolFacade(NETWORK);

function ensureEnv() {
  const missing = [];
  if (!NODE_URL)    missing.push('NODE_URL');
  if (!LINE_SECRET) missing.push('LINE_CHANNEL_SECRET');
  if (!LINE_TOKEN)  missing.push('LINE_ACCESS_TOKEN');
  if (!PRIVATE_KEY) missing.push('SYMBOL_PRIVATE_KEY');
  if (missing.length) throw new Error(`Missing env: ${missing.join(', ')}`);
}

function explorerTxUrl(hash) {
  return NETWORK === 'mainnet'
    ? `https://symbol.fyi/transactions/${hash}`
    : `https://testnet.symbol.fyi/transactions/${hash}`;
}

// --- raw body for LINE signature ---
async function getRawBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c));
  return Buffer.concat(chunks);
}
const verifyLine = (raw, sig) =>
  !!sig && crypto.createHmac('sha256', LINE_SECRET).update(raw).digest('base64') === sig;

// --- LINE reply（失敗はログに出すが例外は投げない） ---
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

// --- 送信本体 ---
async function sendToSymbol(uid, msg) {
  ensureEnv();

  // 署名者
  const signer    = facade.createAccount(new PrivateKey(PRIVATE_KEY));
  const myAddress = facade.network.publicKeyToAddress(signer.publicKey);

  // メッセージ整形（過長防止）
  const note = JSON.stringify({
    t: 'line',
    uid: String(uid).slice(0, 16),
    msg: String(msg).slice(0, 160),
    ts: new Date().toISOString()
  });

  // typed descriptor（自分宛てに0XYM＋メッセージ）
  const typed = new descriptors.TransferTransactionV1Descriptor(
    myAddress,
    [
      new descriptors.UnresolvedMosaicDescriptor(
        new models.UnresolvedMosaicId(XYM_ID),
        new models.Amount(0n)
      )
    ],
    note
  );

  // トランザクション生成
  const deadline = 2 * 60 * 60; // 2時間有効
  const tx = facade.createTransactionFromTypedDescriptor(
    typed,
    signer.publicKey,
    FEE_MULTIPLIER,
    deadline
  );
  console.log('📝 create tx v1, deadline(sec):', deadline);

  // 署名→payload→hash
  const signature = signer.signTransaction(tx);
  let payloadHex  = facade.transactionFactory.static.attachSignature(tx, signature);

  // attachSignature の戻り値を正規化
  if (typeof payloadHex === 'object' && payloadHex.payload) {
    // オブジェクト形式 { payload: "...hex..." }
    payloadHex = payloadHex.payload;
  } else if (typeof payloadHex === 'string' && payloadHex.startsWith('{')) {
    // JSON文字列形式 '{"payload":"..."}'
    try {
      const parsed = JSON.parse(payloadHex);
      if (parsed.payload) payloadHex = parsed.payload;
    } catch (e) {
      console.error('❌ payload JSON.parse failed:', e);
    }
  }

  console.log('📦 payload full:', payloadHex);


  const hash = facade.hashTransaction(tx).toString();

  console.log('🔑 tx hash:', hash);
  console.log('📦 payload final type:', typeof payloadHex, 'len:', payloadHex?.length);
  console.log('📦 payload head:', payloadHex?.slice(0, 64) + '...');
  console.log('🌐 announce to:', `${NODE_URL}/transactions`);

  // announce（8秒タイムアウト & 詳細ログ）
  let res, text;
  try {
    console.log('📡 fetch start...');
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      console.error('⏰ fetch timeout (8s)');
      controller.abort();
    }, 8000);

    res = await fetch(`${NODE_URL}/transactions`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: payloadHex,
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!res) {
      console.error('❌ fetch returned no response object');
      throw new Error('no response');
    }

    console.log('📡 fetch done. res.status:', res.status, res.statusText);

    try {
      text = await res.text();
      console.log('📡 raw response text:', text);
    } catch (e) {
      console.error('❌ res.text() failed:', e);
    }

  } catch (err) {
    console.error('🌩 announce fetch error:', err);
    throw new Error(`fetch-failed: ${err.message || String(err)}`);
  }

  if (!res.ok) {
    throw new Error(`announce failed: ${res.status} ${text}`);
  }

  try {
    const parsed = JSON.parse(text);
    if (!/pushed/i.test(parsed.message || '')) {
      throw new Error(`announce failed: ${parsed.message}`);
    }
  } catch (e) {
    throw new Error(`announce parse failed: ${e.message || text}`);
  }

  return explorerTxUrl(hash);
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

  // 署名検証用に raw を先に取得
  const raw = await getRawBody(req);
  const sig = req.headers['x-line-signature'];
  if (!verifyLine(raw, sig)) return res.status(403).end('forbidden');

  // 受信ログ（previewだけ）
  try {
    const preview = raw.toString('utf8').slice(0, 256);
    console.log('✅ LINE Webhook received, raw preview:', preview);
  } catch {}

  // 先にACK（LINEの3秒制限対策）
  res.status(200).end('ok');

  try {
    const body = JSON.parse(raw.toString('utf8'));
    for (const ev of body?.events || []) {
      if (ev.type === 'message' && ev.message?.type === 'text') {
        const userId = ev.source?.userId || 'unknown';
        const text = ev.message.text;
        console.log('✉️  user:', userId, 'msg:', text);

        try {
          const url = await sendToSymbol(userId, text);
          await replyLine(ev.replyToken, `📝 ブロックチェーンに記録しました\n${url}`);
        } catch (e) {
          console.error('TX error:', e);
          await replyLine(ev.replyToken, `⚠️ 送信に失敗: ${String(e.message || e).slice(0, 160)}`);
        }
      }
    }
  } catch (e) {
    console.error('parse error:', e);
  }
}

// Vercel/Next.js で raw 受け取る設定（冪等）
export const config = { api: { bodyParser: false } };
