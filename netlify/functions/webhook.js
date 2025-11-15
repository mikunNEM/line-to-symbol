// netlify/functions/webhook.js
import crypto from 'crypto';
import rawBody from 'raw-body';
import { PrivateKey } from 'symbol-sdk';
import { SymbolFacade, descriptors, models } from 'symbol-sdk/symbol';

const NETWORK = process.env.NETWORK_TYPE || 'testnet';
const NODE_URL = process.env.NODE_URL;
const LINE_SECRET = process.env.LINE_CHANNEL_SECRET;
const LINE_TOKEN = process.env.LINE_ACCESS_TOKEN;
const PRIVATE_KEY = process.env.SYMBOL_PRIVATE_KEY;

const XYM_ID = NETWORK === 'mainnet'
  ? 0x6BED913FA20223F8n
  : 0x72C0212E67A08BCEn;

const FEE_MULTIPLIER = 100;
const facade = new SymbolFacade(NETWORK);

function ensureEnv() {
  const missing = [];
  if (!NODE_URL) missing.push('NODE_URL');
  if (!LINE_SECRET) missing.push('LINE_CHANNEL_SECRET');
  if (!LINE_TOKEN) missing.push('LINE_ACCESS_TOKEN');
  if (!PRIVATE_KEY) missing.push('SYMBOL_PRIVATE_KEY');
  if (missing.length) throw new Error(`Missing env: ${missing.join(', ')}`);
}

function explorerTxUrl(hash) {
  return NETWORK === 'mainnet'
    ? `https://symbol.fyi/transactions/${hash}`
    : `https://testnet.symbol.fyi/transactions/${hash}`;
}

const verifyLine = (raw, sig) =>
  !!sig && crypto.createHmac('sha256', LINE_SECRET).update(raw).digest('base64') === sig;

async function replyLine(replyToken, text) {
  try {
    const response = await fetch('https://api.line.me/v2/bot/message/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LINE_TOKEN}`,
      },
      body: JSON.stringify({ replyToken, messages: [{ type: 'text', text }] }),
    });
    if (!response.ok) throw new Error(`LINE reply failed: ${response.status}`);
  } catch (e) {
    console.error('LINE reply error:', e);
  }
}

async function sendToSymbol(uid, msg) {
  ensureEnv();

  const signer = facade.createAccount(new PrivateKey(PRIVATE_KEY));
  const myAddress = facade.network.publicKeyToAddress(signer.publicKey);

  msg = '\0' + msg;

  const typed = new descriptors.TransferTransactionV1Descriptor(
    myAddress,
    [
      new descriptors.UnresolvedMosaicDescriptor(
        new models.UnresolvedMosaicId(XYM_ID),
        new models.Amount(0n)
      ),
    ],
    msg
  );

  const deadline = 2 * 60 * 60;
  const tx = facade.createTransactionFromTypedDescriptor(
    typed,
    signer.publicKey,
    FEE_MULTIPLIER,
    deadline
  );

  console.log('create tx v1, deadline(sec):', deadline);

  const signature = signer.signTransaction(tx);
  let payloadHex = facade.transactionFactory.static.attachSignature(tx, signature);

  if (typeof payloadHex === 'object' && payloadHex.payload) payloadHex = payloadHex.payload;
  if (typeof payloadHex === 'string' && payloadHex.startsWith('{')) {
    try {
      const parsed = JSON.parse(payloadHex);
      if (parsed.payload) payloadHex = parsed.payload;
    } catch {}
  }
  if (typeof payloadHex !== 'string' || payloadHex.includes('{')) {
    throw new Error('attachSignature did not return clean hex string');
  }

  const hash = facade.hashTransaction(tx).toString();
  console.log('tx hash:', hash);
  console.log('payload length:', payloadHex.length);

  const announceBody = JSON.stringify({ payload: payloadHex });
  console.log('announce body head:', announceBody.slice(0, 80));

  let res, text;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    console.log('announce fetch start...');

    res = await fetch(`${NODE_URL}/transactions`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: announceBody,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log('announce fetch success!');

    text = await res.text();
    console.log('res.status:', res.status, res.statusText);
    console.log('res.body  :', text.slice(0, 200));
  } catch (err) {
    console.error('announce fetch error:', err.name, err.message);
    if (err.name === 'AbortError') {
      throw new Error('timeout: Symbol node did not respond within 8s');
    }
    throw new Error(`fetch-failed: ${err.message || String(err)}`);
  }

  if (!res.ok) {
    console.error('announce failed with status:', res.status);
    throw new Error(`announce failed: ${res.status} ${text.slice(0, 100)}`);
  }

  try {
    const parsed = JSON.parse(text);
    console.log('node response parsed:', parsed);
    if (!/pushed/i.test(parsed.message || '')) {
      throw new Error(`announce failed: ${parsed.message}`);
    }
  } catch (e) {
    console.error('parse error:', e.message);
    throw new Error(`announce parse failed: ${e.message || text.slice(0, 100)}`);
  }

  return explorerTxUrl(hash);
}

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 200, body: 'ok' };
  }

  try {
    ensureEnv();
  } catch (e) {
    console.error(e.message);
    return { statusCode: 500, body: 'server env not ready' };
  }

  let rawBodyBuffer;
  try {
    const stream = require('node:stream').Readable.from(event.body, { objectMode: false });
    rawBodyBuffer = await rawBody(stream, {
      length: event.headers['content-length'],
      limit: '10mb',
    });
  } catch (e) {
    console.error('raw body parse error:', e);
    return { statusCode: 400, body: 'invalid body' };
  }

  const sig = event.headers['x-line-signature'];
  if (!verifyLine(rawBodyBuffer, sig)) {
    console.error('signature verification failed');
    return { statusCode: 403, body: 'forbidden' };
  }

  setImmediate(() => {
    (async () => {
      try {
        const body = JSON.parse(rawBodyBuffer.toString('utf8'));
        for (const ev of body?.events || []) {
          if (ev.type === 'message' && ev.message?.type === 'text') {
            const userId = ev.source?.userId || 'unknown';
            let text = ev.message.text.trim();
            console.log('user:', userId, 'msg:', text);

            if (text.toLowerCase().startsWith('note:') || text.startsWith('note:')) {
              text = text.replace(/^note:/i, '').replace(/^note:/, '').trim();
              if (!text) {
                console.log('note/note: の後にメッセージがありません。スキップします。');
                continue;
              }

              try {
                const url = await sendToSymbol(userId, text);
                await replyLine(ev.replyToken, `note: ブロックチェーンに記録しました\n${url}`);
              } catch (e) {
                console.error('TX error:', e);
                await replyLine(ev.replyToken, `警告: 送信に失敗: ${String(e.message || e).slice(0, 160)}`);
              }
            } else {
              console.log('note/note: 非メッセージを無視しました。');
            }
          }
        }
      } catch (e) {
        console.error('parse error:', e);
      }
    })();
  });

  return { statusCode: 200, body: 'ok' };
};
