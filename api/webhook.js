// ===============================================
// LINE → Symbol ブロックチェーン記録用 Webhook
// version: 2025-10 (note: で始まるメッセージのみ記録)
// ===============================================

import crypto from 'crypto';
import { PrivateKey } from 'symbol-sdk';
import { SymbolFacade, descriptors, models } from 'symbol-sdk/symbol';

// --- 環境変数の読み込み ---
const NETWORK = process.env.NETWORK_TYPE || 'testnet';
const NODE_URL = process.env.NODE_URL;
const LINE_SECRET = process.env.LINE_CHANNEL_SECRET;
const LINE_TOKEN = process.env.LINE_ACCESS_TOKEN;
const PRIVATE_KEY = process.env.SYMBOL_PRIVATE_KEY;

// XYMモザイクID（メインネット／テストネットで切替）
const XYM_ID = NETWORK === 'mainnet'
  ? 0x6BED913FA20223F8n
  : 0x72C0212E67A08BCEn;

const FEE_MULTIPLIER = 100;
const facade = new SymbolFacade(NETWORK);

// ==================================================
// 共通ユーティリティ
// ==================================================

// --- 必要な環境変数が揃っているか確認 ---
function ensureEnv() {
  const missing = [];
  if (!NODE_URL) missing.push('NODE_URL');
  if (!LINE_SECRET) missing.push('LINE_CHANNEL_SECRET');
  if (!LINE_TOKEN) missing.push('LINE_ACCESS_TOKEN');
  if (!PRIVATE_KEY) missing.push('SYMBOL_PRIVATE_KEY');
  if (missing.length) throw new Error(`Missing env: ${missing.join(', ')}`);
}

// --- Explorer のトランザクションURLを生成 ---
function explorerTxUrl(hash) {
  return NETWORK === 'mainnet'
    ? `https://symbol.fyi/transactions/${hash}`
    : `https://testnet.symbol.fyi/transactions/${hash}`;
}

// --- LINE署名の検証 ---
const verifyLine = (raw, sig) =>
  !!sig && crypto.createHmac('sha256', LINE_SECRET).update(raw).digest('base64') === sig;

// --- LINEへの返信 ---
async function replyLine(replyToken, text) {
  try {
    await fetch('https://api.line.me/v2/bot/message/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LINE_TOKEN}`
      },
      body: JSON.stringify({
        replyToken,
        messages: [{ type: 'text', text }]
      })
    });
  } catch (e) {
    console.error('LINE reply error:', e);
  }
}

// ==================================================
// Symbol トランザクション送信ロジック
// ==================================================
async function sendToSymbol(uid, msg) {
  ensureEnv();

  const signer = facade.createAccount(new PrivateKey(PRIVATE_KEY));
  const myAddress = facade.network.publicKeyToAddress(signer.publicKey);

  // note: メッセージ本体を送信
  msg = "\0" + msg; // UTF-8 BOM対策（先頭にnull文字）

  const typed = new descriptors.TransferTransactionV1Descriptor(
    myAddress,
    [
      new descriptors.UnresolvedMosaicDescriptor(
        new models.UnresolvedMosaicId(XYM_ID),
        new models.Amount(0n)
      )
    ],
    msg
  );

  const deadline = 2 * 60 * 60; // 2時間
  const tx = facade.createTransactionFromTypedDescriptor(
    typed,
    signer.publicKey,
    FEE_MULTIPLIER,
    deadline
  );

  console.log('📝 create tx v1, deadline(sec):', deadline);

  const signature = signer.signTransaction(tx);
  let payloadHex = facade.transactionFactory.static.attachSignature(tx, signature);

  // 正常なhex文字列を確保
  if (typeof payloadHex === 'object' && payloadHex.payload) payloadHex = payloadHex.payload;
  if (typeof payloadHex === 'string' && payloadHex.startsWith('{')) {
    try {
      const parsed = JSON.parse(payloadHex);
      if (parsed.payload) payloadHex = parsed.payload;
    } catch { }
  }
  if (typeof payloadHex !== 'string' || payloadHex.includes('{')) {
    throw new Error("attachSignature did not return clean hex string");
  }

  const hash = facade.hashTransaction(tx).toString();
  console.log('🔑 tx hash:', hash);
  console.log('📦 payload length:', payloadHex.length);

  const announceBody = JSON.stringify({ payload: payloadHex });
  console.log('📡 announce body head:', announceBody.slice(0, 80));

  // ノードに送信
  let res, text;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    res = await fetch(`${NODE_URL}/transactions`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: announceBody,
      signal: controller.signal,
    });

    clearTimeout(timeout);
    text = await res.text();

    console.log('📡 res.status:', res.status, res.statusText);
    console.log('📡 res.body  :', text);
  } catch (err) {
    console.error('🌩 announce fetch error:', err);
    throw new Error(`fetch-failed: ${err.message || String(err)}`);
  }

  if (!res.ok) throw new Error(`announce failed: ${res.status} ${text}`);

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

// ==================================================
// Webhook メインハンドラ
// ==================================================
export async function webhookHandler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('ok');

  try {
    ensureEnv();
  } catch (e) {
    console.error(e.message);
    return res.status(500).end('server env not ready');
  }

  const raw = req.body; // express.raw() で Buffer が入る
  const sig = req.headers['x-line-signature'];
  if (!verifyLine(raw, sig)) {
    console.error('❌ signature verification failed');
    return res.status(403).end('forbidden');
  }

  // LINEサーバーにすぐレスポンスを返す
  res.status(200).end('ok');

  try {
    const body = JSON.parse(raw.toString('utf8'));
    for (const ev of body?.events || []) {
      if (ev.type === 'message' && ev.message?.type === 'text') {
        const userId = ev.source?.userId || 'unknown';
        let text = ev.message.text.trim();
        console.log('✉️  user:', userId, 'msg:', text);

        // ✅ 「note:」で始まるメッセージのみブロックチェーンに記録
        if (text.toLowerCase().startsWith('note:')) {
          text = text.slice(5).trim();
          if (!text) {
            console.log('⚠️ note: の後にメッセージがありません。スキップします。');
            continue;
          }

          try {
            const url = await sendToSymbol(userId, text);
            await replyLine(ev.replyToken, `📝 ブロックチェーンに記録しました\n${url}`);
          } catch (e) {
            console.error('TX error:', e);
            await replyLine(
              ev.replyToken,
              `⚠️ 送信に失敗: ${String(e.message || e).slice(0, 160)}`
            );
          }
        } else {
          // note: 以外のメッセージはスルー（返信なし）
          console.log('💤 非noteメッセージを無視しました。');
        }
      }
    }
  } catch (e) {
    console.error('parse error:', e);
  }
}
