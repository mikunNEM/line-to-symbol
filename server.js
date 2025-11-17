//-----------------------------------------------------
//  server.js（完全版）
//  LINE →（位置情報＋メモ）→ Symbol にJSON記録
//  /locations で Leaflet 用データを返す
//-----------------------------------------------------

import express from "express";
import crypto from "crypto";
import { PrivateKey } from "symbol-sdk";
import { SymbolFacade, descriptors, models } from "symbol-sdk/symbol";
import { TextEncoder, TextDecoder } from "util";

const app = express();
const encoder = new TextEncoder();
const decoder = new TextDecoder();

// ---- rawBody（LINE署名検証のため） ----
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }
  })
);

// ---- 静的ファイル（viewer.html 用）----
app.use(express.static("public"));

// ---- ENV ----
const {
  NETWORK_TYPE = "testnet",
  NODE_URL,
  LINE_CHANNEL_SECRET,
  LINE_ACCESS_TOKEN,
  SYMBOL_PRIVATE_KEY
} = process.env;

if (!NODE_URL || !LINE_CHANNEL_SECRET || !LINE_ACCESS_TOKEN || !SYMBOL_PRIVATE_KEY) {
  console.error("環境変数が不足しています！");
  process.exit(1);
}

// ---- XYM Mosaic ID ----
const XYM_ID =
  NETWORK_TYPE === "mainnet"
    ? 0x6BED913FA20223F8n
    : 0x72C0212E67A08BCEn;

const FEE_MULTIPLIER = 100;
const facade = new SymbolFacade(NETWORK_TYPE);

// ---- Explorer ----
const explorerTxUrl = (hash) =>
  NETWORK_TYPE === "mainnet"
    ? `https://symbol.fyi/transactions/${hash}`
    : `https://testnet.symbol.fyi/transactions/${hash}`;

// ---- LINE Signature Verify ----
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

    if (!res.ok) console.error("LINE reply error:", await res.text());
  } catch (err) {
    console.error("LINE reply catch:", err);
  }
}

//-----------------------------------------------------
// 1023バイト制限に収めて JSON メッセージを作る
//-----------------------------------------------------
function utf8Length(str) {
  return encoder.encode(str).length;
}

function buildMessageJson(payload, maxBytes = 1023) {
  const original = payload.text;
  let low = 0;
  let high = original.length;
  let best = "";

  const full = JSON.stringify(payload);
  if (utf8Length(full) <= maxBytes) {
    return full;
  }

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const text = original.slice(0, mid);
    const candidate = JSON.stringify({ ...payload, text });
    const len = utf8Length(candidate);

    if (len <= maxBytes) {
      best = candidate;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  if (!best) throw new Error("JSONが1023バイトに収まりません");

  return best;
}

//-----------------------------------------------------
// Symbolへ送信（msgJsonを \0 + JSON で送る）
//-----------------------------------------------------
async function sendToSymbol(payload) {
  const pk = new PrivateKey(SYMBOL_PRIVATE_KEY);
  const keyPair = new facade.static.KeyPair(pk);
  const myAddress = facade.network.publicKeyToAddress(keyPair.publicKey);

  const msgJson = buildMessageJson(payload);
  const msg = "\0" + msgJson;

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

  const tx = facade.createTransactionFromTypedDescriptor(
    descriptor,
    keyPair.publicKey,
    FEE_MULTIPLIER,
    7200 // deadline 2h
  );

  const sig = facade.signTransaction(keyPair, tx);
  const jsonPayload =
    facade.transactionFactory.static.attachSignature(tx, sig);

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
  return { hash, url: explorerTxUrl(hash) };
}

//-----------------------------------------------------
// 直前の位置情報を保持（userId → {lat,lon,address}）
//-----------------------------------------------------
const userLocation = new Map();

//-----------------------------------------------------
// Webhook
//-----------------------------------------------------
app.post("/webhook", async (req, res) => {
  const signature = req.headers["x-line-signature"];
  if (!verifyLineSignature(req.rawBody, signature)) {
    return res.status(403).send("invalid signature");
  }

  res.status(200).send("ok");

  (async () => {
    try {
      const events = req.body.events || [];

      for (const ev of events) {
        const userId = ev?.source?.userId;
        const replyToken = ev.replyToken;

        if (ev.type !== "message") continue;

        //-------------------------------------------------
        // 📍 位置情報メッセージ
        //-------------------------------------------------
        if (ev.message.type === "location") {
          userLocation.set(userId, {
            lat: ev.message.latitude,
            lon: ev.message.longitude,
            address: ev.message.address
          });

          await replyLine(
            replyToken,
            "📍 位置情報を保存しました。\n次に「📝メモ」を送ると、位置付きでSymbolへ記録します。"
          );
          continue;
        }

        //-------------------------------------------------
        // 📝 メモメッセージ
        //-------------------------------------------------
        if (ev.message.type !== "text") continue;

        let text = ev.message.text.trim();
        const isNote =
          text.startsWith("📝") || text.toLowerCase().startsWith("note:");

        if (!isNote) continue;

        text = text.replace(/^📝/, "").replace(/^note:/i, "").trim();
        if (!text) {
          await replyLine(replyToken, "📝 の後に内容を入れてね。");
          continue;
        }

        const loc = userLocation.get(userId) || {};

        const payload = {
          userId,
          text,
          lat: loc.lat ?? null,
          lon: loc.lon ?? null,
          address: loc.address ?? null,
          timestamp: Math.floor(Date.now() / 1000)
        };

        try {
          const { url } = await sendToSymbol(payload);

          await replyLine(
            replyToken,
            `📝 記録完了！\n${loc.lat ? `📍 lat:${loc.lat}, lon:${loc.lon}` : ""}\n🔗 ${url}`
          );

          userLocation.delete(userId);
        } catch (err) {
          await replyLine(replyToken, `⚠️エラー: ${err.message}`);
        }
      }
    } catch (err) {
      console.error("background error:", err);
    }
  })();
});

//-----------------------------------------------------
// /locations → Leaflet 表示用のデータ
//-----------------------------------------------------
function hexToBytes(hex) {
  if (!hex) return new Uint8Array();
  const clean = hex.length % 2 === 1 ? "0" + hex : hex;
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.substr(i * 2, 2), 16);
  }
  return out;
}

app.get("/locations", async (req, res) => {
  try {
    const pk = new PrivateKey(SYMBOL_PRIVATE_KEY);
    const keyPair = new facade.static.KeyPair(pk);
    const myAddress = facade.network.publicKeyToAddress(keyPair.publicKey);
    const addr = myAddress.toString();

    const api = `${NODE_URL}/accounts/${addr}/transactions/confirmed?order=desc&pageSize=100`;
    const r = await fetch(api);
    const data = await r.json();
    const txs = data.data || data || [];

    const records = [];

    for (const row of txs) {
      const tx = row.transaction || row;
      const type = tx.type ?? tx.transactionType;
      if (type !== 0x4154 && type !== 16724) continue;

      let msg = tx.message;
      if (!msg) continue;

      let bytes = hexToBytes(msg);
      if (bytes[0] === 0) bytes = bytes.slice(1);

      let jsonText;
      try {
        jsonText = decoder.decode(bytes);
      } catch {
        continue;
      }

      let obj;
      try {
        obj = JSON.parse(jsonText);
      } catch {
        continue;
      }

      if (obj.lat == null || obj.lon == null) continue;

      const hash =
        row.meta?.hash ||
        row.meta?.transactionHash ||
        tx.metaHash ||
        null;

      records.push({
        lat: obj.lat,
        lon: obj.lon,
        text: obj.text,
        address: obj.address,
        timestamp: obj.timestamp,
        hash,
        url: hash ? explorerTxUrl(hash) : null
      });
    }

    res.json(records);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//-----------------------------------------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running:", PORT));
