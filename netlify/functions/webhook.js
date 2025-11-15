// netlify/functions/webhook.js
import crypto from 'crypto';
import { SymbolFacade, PrivateKey, descriptors, models } from 'symbol-sdk/symbol';

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

// -------------------------
// ENV チェック
// -------------------------
function ensureEnv() {
  const missing = [];
  if (!NODE_URL) missing.push("NODE_URL");
  if (!LINE_SECRET) missing.push("LINE_CHANNEL_SECRET");
  if (!LINE_TOKEN) missing.push("LINE_ACCESS_TOKEN");
  if (!PRIVATE_KEY) missing.push("SYMBOL_PRIVATE_KEY");
  if (missing.length) throw new Error("Missing env: " + missing.join(", "));
}

// -------------------------
// Explorer URL
// -------------------------
const explorerTxUrl = (hash) =>
  NETWORK === 'mainnet'
    ? `https://symbol.fyi/transactions/${hash}`
    : `https://testnet.symbol.fyi/transactions/${hash}`;

// -------------------------
// LINE署名検証
// -------------------------
const verifyLine = (raw, sig) => {
  if (!sig) return false;
  const calc = crypto.createHmac("sha256", LINE_SECRET).update(raw).digest("base64");
  return calc === sig;
};

// -------------------------
// LINE返信
// -------------------------
async function replyLine(replyToken, text) {
  try {
    const res = await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LINE_TOKEN}`,
      },
      body: JSON.stringify({
        replyToken,
        messages: [{ type: "text", text }],
      }),
    });

    if (!res.ok) throw new Error("LINE reply failed: " + res.status);
  } catch (err) {
    console.error("LINE reply error:", err);
  }
}

// -------------------------
// Symbolブロックチェーンへ送信
// -------------------------
async function sendToSymbol(userId, msg) {
  ensureEnv();

  const pk = new PrivateKey(PRIVATE_KEY);
  const keyPair = new facade.static.KeyPair(pk);

  const myAddress = facade.network.publicKeyToAddress(keyPair.publicKey);

  // メッセージ先頭に NULL を付与
  msg = "\0" + msg;

  const typedDescriptor = new descriptors.TransferTransactionV1Descriptor(
    myAddress,
    [
      new descriptors.UnresolvedMosaicDescriptor(
        new models.UnresolvedMosaicId(XYM_ID),
        new models.Amount(0n)
      )
    ],
    msg
  );

  const deadline = 2 * 60 * 60;

  const tx = facade.createTransactionFromTypedDescriptor(
    typedDescriptor,
    keyPair.publicKey,
    FEE_MULTIPLIER,
    deadline
  );

  // 署名
  const signature = facade.signTransaction(keyPair, tx);

  // Payload化
  let payload = facade.transactionFactory.static.attachSignature(tx, signature);
  if (typeof payload === "object") payload = payload.payload;
  if (payload.startsWith("{")) payload = JSON.parse(payload).payload;

  if (!payload || payload.includes("{"))
    throw new Error("Invalid payload after attachSignature");

  const hash = facade.hashTransaction(tx).toString();

  // アナウンス
  const res = await fetch(`${NODE_URL}/transactions`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload }),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error("announce failed: " + res.status + " " + text);
  }

  const json = JSON.parse(text);
  if (!/pushed/i.test(json.message || "")) {
    throw new Error("announce error: " + json.message);
  }

  return explorerTxUrl(hash);
}

// -------------------------
// Netlify Handler
// -------------------------
export const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 200, body: "ok" };
  }

  try {
    ensureEnv();
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }

  // body → Buffer（署名検証用）
  const rawBuffer = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64")
    : Buffer.from(event.body || "", "utf8");

  // LINE署名
  const sig =
    event.headers["x-line-signature"] ||
    event.headers["X-Line-Signature"] ||
    event.headers["X-LINE-SIGNATURE"];

  if (!verifyLine(rawBuffer, sig)) {
    console.error("LINE signature mismatch");
    return { statusCode: 403, body: "forbidden" };
  }

  // 💡 Netlify の 1秒制限回避 → 即レス
  setImmediate(() => {
    (async () => {
      try {
        const body = JSON.parse(rawBuffer.toString("utf8"));

        for (const ev of body?.events || []) {
          if (ev.type === "message" && ev.message?.type === "text") {
            const userId = ev.source?.userId || "unknown";
            let text = ev.message.text.trim();
            const replyToken = ev.replyToken;

            console.log("user:", userId, "msg:", text);

            // 📝 / note:
            const isNote =
              text.toLowerCase().startsWith("note:") ||
              text.startsWith("📝");

            if (isNote) {
              // 前置トリガー削除
              text = text
                .replace(/^note:/i, "")
                .replace(/^📝/, "")
                .trim();

              if (!text) {
                await replyLine(replyToken, "📝 の後に内容を書いてください。");
                continue;
              }

              try {
                const url = await sendToSymbol(userId, text);
                await replyLine(
                  replyToken,
                  `📝 ブロックチェーンに記録しました\n${url}`
                );
              } catch (e) {
                await replyLine(
                  replyToken,
                  `⚠️ 送信に失敗: ${String(e.message || e).slice(0, 200)}`
                );
              }
            } else {
              console.log("💤 非 note:/📝 メッセージを無視しました。");
            }
          }
        }
      } catch (e) {
        console.error("background parse error:", e);
      }
    })();
  });

  return { statusCode: 200, body: "ok" };
};
