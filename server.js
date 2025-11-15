import express from "express";
import crypto from "crypto";
import { PrivateKey } from "symbol-sdk";
import { SymbolFacade, descriptors, models } from "symbol-sdk/symbol";

const app = express();

// ---- 生のリクエストボディを保持（LINE署名検証用） ----
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
  SYMBOL_PRIVATE_KEY
} = process.env;

const XYM_ID =
  NETWORK_TYPE === "mainnet"
    ? 0x6BED913FA20223F8n
    : 0x72C0212E67A08BCEn;

const FEE_MULTIPLIER = 100;
const facade = new SymbolFacade(NETWORK_TYPE);

// ---- Explorer URL ----
const explorerTxUrl = (hash) =>
  NETWORK_TYPE === "mainnet"
    ? `https://symbol.fyi/transactions/${hash}`
    : `https://testnet.symbol.fyi/transactions/${hash}`;

// ---- LINE Verify ----
function verifyLineSignature(rawBody, signature) {
  const calc = crypto
    .createHmac("sha256", LINE_CHANNEL_SECRET)
    .update(rawBody)
    .digest("base64");

  return calc === signature;
}

// ---- LINE Reply ----
async function replyLine(replyToken, message) {
  try {
    const res = await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        replyToken,
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
  const myAddress = facade.network.publicKeyToAddress(keyPair.publicKey);

  // メッセージは先頭NULL付き
  msg = "\0" + msg;

  // ---- トランザクション記述子 ----
  const descriptor = new descriptors.TransferTransactionV1Descriptor(
    myAddress,
    [
      new descriptors.UnresolvedMosaicDescriptor(
        new models.UnresolvedMosaicId(XYM_ID),
        new models.Amount(0n)
      )
    ],
    msg
  );

  // ---- tx 作成 ----
  const tx = facade.createTransactionFromTypedDescriptor(
    descriptor,
    keyPair.publicKey,
    FEE_MULTIPLIER,
    2 * 60 * 60 // deadline 2 hours
  );

  // ---- 署名 ----
  const signature = facade.signTransaction(keyPair, tx);

  // ---- payload 作成（正しい方法）----
  const signedTx = facade.transactionFactory.static.attachSignature(tx, signature);

  // ---- Announce ----
  const res = await fetch(`${NODE_URL}/transactions`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload: signedTx.payload })
  });

  const json = await res.json();
  if (!/pushed/i.test(json.message || "")) {
    throw new Error("Announce failed: " + json.message);
  }

  // ---- ハッシュ計算 ----
  const hash = facade.hashTransaction(tx).toString();
  return explorerTxUrl(hash);
}

// ---- Webhook ----
app.post("/webhook", async (req, res) => {
  const signature = req.headers["x-line-signature"];
  const raw = req.rawBody || Buffer.from(JSON.stringify(req.body));

  if (!verifyLineSignature(raw, signature)) {
    return res.status(403).send("invalid signature");
  }

  // LINE へは即レス
  res.status(200).send("ok");

  // バックグラウンド処理
  (async () => {
    try {
      const events = req.body.events || [];

      for (const ev of events) {
        if (ev.type !== "message") continue;
        if (ev.message.type !== "text") continue;

        const replyToken = ev.replyToken;
        let text = ev.message.text.trim();

        // note判定
        const isNote =
          text.startsWith("📝") || text.toLowerCase().startsWith("note:");

        if (!isNote) continue;

        // 先頭の「📝」「note:」を除去
        text = text.replace(/^📝/, "").replace(/^note:/i, "").trim();

        if (!text) {
          await replyLine(replyToken, "📝 の後に内容を書いてね。");
          continue;
        }

        try {
          const url = await sendToSymbol(ev.source.userId, text);
          await replyLine(replyToken, `📝 ブロックチェーンに記録しました\n${url}`);
        } catch (err) {
          await replyLine(replyToken, `⚠️エラー: ${err.message}`);
        }
      }
    } catch (e) {
      console.error("background error:", e);
    }
  })();
});

// ---- Start Server ----
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on", PORT));
