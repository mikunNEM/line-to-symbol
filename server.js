import express from "express";
import crypto from "crypto";
import { PrivateKey } from "symbol-sdk";
import { SymbolFacade, descriptors, models } from "symbol-sdk/symbol";

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

// ---- Start Server ----
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on", PORT));

// viewerにアドレスを渡す
app.get("/viewer", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<title>Symbol Live Tx Viewer (Identicon)</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />

<style>
  body {
    background: #f4f1ff;
    font-family: "Inter","Hiragino Sans","Noto Sans JP",sans-serif;
    margin: 0;
    padding: 0;
  }

  h1 {
    background: linear-gradient(135deg, #6B4DF5, #9d84ff);
    color: white;
    padding: 18px 20px;
    margin: 0;
    font-size: 22px;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  #list {
    padding: 20px;
  }

  .tx {
    background: #ffffff;
    margin-bottom: 16px;
    padding: 14px 20px 14px 70px; /* 左にアイコン分の余白 */
    border-radius: 14px;
    box-shadow: 0 4px 10px rgba(105, 70, 230, 0.15);
    animation: fadeIn 0.45s ease;
    transition: all 0.35s ease;
    cursor: pointer;
    position: relative;
  }

  /* Unconfirmed is yellow */
  .unconfirmed {
    background: #fff7d1 !important;
  }

  /* identicon container */
  .identicon {
    width: 42px;
    height: 42px;
    position: absolute;
    left: 16px;
    top: 14px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 0 3px #ffffffaa;
  }

  .hash {
    font-size: 12px;
    margin-top: 6px;
    color: #6B4DF5;
    opacity: 0.9;
  }

  .tx b {
  color: #0066ff;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
</style>
</head>

<body>
<h1>Symbol Live Tx Viewer</h1>
<div id="list"></div>

<script>
/* ===== 設定 ===== */
const NODES = [
  "https://testnet1.symbol-mikun.net:3001",
  "https://sym-test-01.opening-line.jp:3001"
];
  
const ADDRESS = "${process.env.SYMBOL_TO_ADDRESS}";

let ws = null;
let uid = "";
const callbacks = {};
const txMap = {};

/* ============================================================
   🧩 Blockies Identicon Generator（GitHub風）
   ============================================================ */
function identiconSvg(address) {
  // Hash → 15 bytes
  let hash = [];
  for (let i = 0; i < address.length; i++) {
    hash.push(address.charCodeAt(i) & 0xff);
  }
  while (hash.length < 15) hash.push(0);

  // Hue from first byte
  const hue = hash[0] % 360;

  // 5×5 grid
  let svg = `<svg width="42" height="42" viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">`;

  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 3; x++) {
      const i = (x + y * 3) % hash.length;
      const bit = hash[i] & 1;

      if (bit === 1) {
        const color = `hsl(${hue},70%,55%)`;
        svg += `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`;
        svg += `<rect x="${4-x}" y="${y}" width="1" height="1" fill="${color}"/>`;
      }
    }
  }

  svg += `</svg>`;
  return "data:image/svg+xml;base64," + btoa(svg);
}

/* ============================================================
   decodeMessage()
   ============================================================ */
function decodeMessage(payload) {
  if (!payload || typeof payload !== "string") return "(no message)";
  let hex = payload;
  if (hex.startsWith("00")) hex = hex.slice(2);

  const arr = hex.match(/.{1,2}/g);
  if (!arr) return "(decode error)";
  const bytes = new Uint8Array(arr.map(h => parseInt(h, 16)));

  try { return new TextDecoder("utf-8").decode(bytes); }
  catch { return "(decode error)"; }
}

/* ============================================================
   🎨 UI: カード生成（Identicon付き）
   ============================================================ */
function createTxElement(hash, msg, state, sender) {
  const div = document.createElement("div");
  div.className = `tx ${state}`;
  div.id = hash;

  /* Identicon */
  const icon = document.createElement("img");
  icon.className = "identicon";
  icon.src = identiconSvg(sender);
  div.appendChild(icon);

  div.innerHTML += `
    <b>${msg}</b>
    <div class="hash">${state.toUpperCase()} - ${hash}</div>
  `;

  div.onclick = () =>
    window.open(`https://testnet.symbol.fyi/transactions/${hash}`, "_blank");

  document.getElementById("list").prepend(div);
  txMap[hash] = div;
}

function promote(hash) {
  const el = txMap[hash];
  if (!el) return;
  el.classList.remove("unconfirmed");
  el.classList.add("confirmed");
  el.querySelector(".hash").textContent = `CONFIRMED - ${hash}`;
}

/* ============================================================
   過去履歴読み込み
   ============================================================ */
async function loadHistory() {
  const NODE = NODES[Math.floor(Math.random() * NODES.length)];
  const url =
    `${NODE}/transactions/confirmed?address=${ADDRESS}&pageSize=30&order=desc`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    const txs = json.data || [];

    txs.reverse().forEach(item => {
      const hash = item.meta.hash;
      if (txMap[hash]) return;

      const msg = decodeMessage(item.transaction.message);
      const sender = item.transaction.signerPublicKey;

      createTxElement(hash, msg, "confirmed", sender);
    });

  } catch (e) {
    console.error("History load failed:", e);
  }
}

/* ============================================================
   WebSocket 永続接続
   ============================================================ */
async function connectWS() {
  const NODE = NODES[Math.floor(Math.random() * NODES.length)];
  const WSURL = NODE.replace("http", "ws") + "/ws";

  ws = new WebSocket(WSURL);

  ws.onopen = () => console.log("WS Connected:", WSURL);

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);

    if (data.uid !== undefined) {
      uid = data.uid;
      subscribe("block");
      subscribe(`unconfirmedAdded/${ADDRESS}`);
      subscribe(`confirmedAdded/${ADDRESS}`);
      return;
    }

    if (callbacks[data.topic]) {
      callbacks[data.topic].forEach(cb => cb(data.data));
    }
  };

  ws.onerror = (e) => console.error("WS Error:", e);
  ws.onclose = () => {
    uid = "";
    setTimeout(connectWS, 2000);
  };
}

function subscribe(topic) {
  ws.send(JSON.stringify({ uid, subscribe: topic }));
}

/* ============================================================
   WebSocket イベント登録
   ============================================================ */
function addCallback(topic, cb) {
  if (!callbacks[topic]) callbacks[topic] = [];
  callbacks[topic].push(cb);
}

addCallback(`unconfirmedAdded/${ADDRESS}`, tx => {
  const hash = tx.meta.hash;
  const msg = decodeMessage(tx.transaction.message);
  const sender = tx.transaction.signerPublicKey;

  createTxElement(hash, msg, "unconfirmed", sender);
});

addCallback(`confirmedAdded/${ADDRESS}`, tx => {
  const hash = tx.meta.hash;
  const sender = tx.transaction.signerPublicKey;

  if (!txMap[hash]) {
    const msg = decodeMessage(tx.transaction.message);
    createTxElement(hash, msg, "confirmed", sender);
  } else {
    promote(hash);
  }
});

addCallback("block", block =>
  console.log("⛓ Block:", block.block.height)
);

/* ============================================================
   初期ロード
   ============================================================ */
(async () => {
  await loadHistory();
  connectWS();
})();
</script>
</body>
</html>
  `);
});

