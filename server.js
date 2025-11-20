import express from "express";
import crypto from "crypto";
import { PrivateKey } from "symbol-sdk";
import { SymbolFacade, descriptors, models } from "symbol-sdk/symbol";
import fs from "fs";

const app = express();

import path from "path";
const __dirname = path.resolve();
app.use(express.static(__dirname));

// LINE署名検証：生 body を保持
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }
  })
);

// ---- ENV ----
const {
  NETWORK_TYPE = "testnet",
  NODE_URL,
  LINE_CHANNEL_SECRET,
  LINE_ACCESS_TOKEN,
  SYMBOL_PRIVATE_KEY,
  SYMBOL_TO_ADDRESS            // ★送信先アドレス
} = process.env;

// ---- XYM Mosaic ID ----
const XYM_ID =
  NETWORK_TYPE === "mainnet"
    ? 0x6BED913FA20223F8n
    : 0x72C0212E67A08BCEn;

const FEE_MULTIPLIER = 100;

// ---- Symbol facade ----
const facade = new SymbolFacade(NETWORK_TYPE);

// ---- Explorer URL ----
const explorerTxUrl = (hash) =>
  NETWORK_TYPE === "mainnet"
    ? `https://symbol.fyi/transactions/${hash}`
    : `https://testnet.symbol.fyi/transactions/${hash}`;

// ---- LINE Verify ----
function verifyLineSignature(rawBody, signature) {
  const body = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody);

  const calc = crypto
    .createHmac("sha256", LINE_CHANNEL_SECRET)
    .update(body)
    .digest("base64");

  return calc === signature;
}

// ---- LINE Reply ----
async function replyLine(token, message) {
  try {
    const res = await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        replyToken: token,
        messages: [{ type: "text", text: message }]
      })
    });

    if (!res.ok) {
      console.error("LINE reply error:", await res.text());
    }
  } catch (err) {
    console.error("LINE reply catch:", err);
  }
}

// ---- Send to Symbol ----
async function sendToSymbol(userId, msg) {
  const pk = new PrivateKey(SYMBOL_PRIVATE_KEY);
  const keyPair = new facade.static.KeyPair(pk);

  // ---- 平文メッセージ（0x00 プレフィックス）----
  const plainMessage = "\0" + msg;
  const messageBytes = new TextEncoder().encode(plainMessage);

  // ---- Transfer TX ----
  const descriptor = new descriptors.TransferTransactionV1Descriptor(
    new Address(SYMBOL_TO_ADDRESS),   // ★ENV から取得したアドレスに送る
    [
      new descriptors.UnresolvedMosaicDescriptor(
        new models.UnresolvedMosaicId(XYM_ID),
        new models.Amount(0n)
      )
    ],
    messageBytes
  );

  const tx = facade.createTransactionFromTypedDescriptor(
    descriptor,
    keyPair.publicKey,
    FEE_MULTIPLIER,
    2 * 60 * 60 // 2 hours
  );

  // ---- 署名 ----
  const sig = facade.signTransaction(keyPair, tx);
  const jsonPayload =
    facade.transactionFactory.static.attachSignature(tx, sig);

  // ---- アナウンス ----
  const res = await fetch(`${NODE_URL}/transactions`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: jsonPayload
  });

  const json = await res.json();
  if (!/pushed/i.test(json.message || "")) {
    throw new Error("Announce failed: " + json.message);
  }

  const hash = facade.hashTransaction(tx).toString();
  return explorerTxUrl(hash);
}

// ---- Webhook ----
app.post("/webhook", async (req, res) => {
  const signature = req.headers["x-line-signature"];
  const raw = req.rawBody;

  if (!verifyLineSignature(raw, signature)) {
    return res.status(403).send("invalid signature");
  }

  res.status(200).send("ok"); // 先にレスポンス返す

  // 非同期バックグラウンド処理
  (async () => {
    try {
      const events = req.body.events || [];

      for (const ev of events) {
        if (ev.type !== "message") continue;
        if (ev.message.type !== "text") continue;

        const replyToken = ev.replyToken;
        let text = ev.message.text.trim();

        const isNote =
          text.startsWith("📝") ||
          text.toLowerCase().startsWith("note:");

        if (!isNote) continue;

        text = text.replace(/^📝/, "").replace(/^note:/i, "").trim();
        if (!text) {
          await replyLine(replyToken, "📝 の後に内容を書いてね。");
          continue;
        }

        try {
          const url = await sendToSymbol(ev.source.userId, text);

          await replyLine(
            replyToken,
            `📝 ブロックチェーンに記録しました\n${url}`
          );
        } catch (err) {
          await replyLine(replyToken, `⚠️エラー: ${err.message}`);
        }
      }
    } catch (e) {
      console.error("background error:", e);
    }
  })();
});

// ---- viewer.html にアドレスを渡す ----
app.get("/viewer", (req, res) => {
  const html = fs.readFileSync("./viewer.html", "utf8")
    .replace("___PLACEHOLDER___", process.env.SYMBOL_TO_ADDRESS);

  res.send(html);
});


// ---- Start Server ----
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on", PORT));
