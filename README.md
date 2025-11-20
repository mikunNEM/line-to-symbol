# LINE → Symbol ブロックチェーン連携サーバー  
`server.js` 解説 README

このドキュメントは、LINE Bot から受信したメッセージを  
**Symbol ブロックチェーンに記録する Node.js サーバー (`server.js`) の解説**です。

使用技術：

- Node.js + Express
- LINE Messaging API
- Symbol SDK v3（symbol-sdk/symbol）
- Webhook 形式での受信
- 転送トランザクションでメッセージ保存

---

# 📁 ファイル構成

```
server.js      ← LINE Webhook → Symbol書き込みサーバー本体
.env           ← APIキーや秘密鍵
package.json   ← 依存ライブラリ定義
```

---

# 🚀 server.js の全体フロー

```
LINEメッセージ（📝やnote:で始まる）
          ↓
WebhookとしてExpressが受信
          ↓
署名検証（LINE Verify）
          ↓
メッセージを Symbol に書き込む
          ↓
LINEへ返信（トランザクションURL）
```

---

# 🔧 必要な環境変数（.env）

```bash
NETWORK_TYPE=testnet
NODE_URL=https://testnet1.symbol-mikun.net:3001
LINE_CHANNEL_SECRET=xxxxx
LINE_ACCESS_TOKEN=xxxxx
SYMBOL_PRIVATE_KEY=あなたの秘密鍵
SYMBOL_TO_ADDRESS=送信先アドレス
```

---

# 📦 1. モジュール読み込み

```js
import express from "express";
import crypto from "crypto";
import { PrivateKey } from "symbol-sdk";
import { Address, SymbolFacade, descriptors, models } from "symbol-sdk/symbol";
```

---

# 🧵 2. LINE署名検証を有効化

```js
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }
  })
);
```

---

# 🧩 3. 環境変数のロード

```js
const {
  NETWORK_TYPE = "testnet",
  NODE_URL,
  LINE_CHANNEL_SECRET,
  LINE_ACCESS_TOKEN,
  SYMBOL_PRIVATE_KEY,
  SYMBOL_TO_ADDRESS
} = process.env;
```

---

# 💎 4. Symbol SDK 設定

```js
const XYM_ID =
  NETWORK_TYPE === "mainnet"
    ? 0x6BED913FA20223F8n
    : 0x72C0212E67A08BCEn;

const facade = new SymbolFacade(NETWORK_TYPE);
```

---

# 🔐 5. LINE署名検証関数

```js
function verifyLineSignature(rawBody, signature) {
  const calc = crypto
    .createHmac("sha256", LINE_CHANNEL_SECRET)
    .update(rawBody)
    .digest("base64");

  return calc === signature;
}
```

---

# 💬 6. LINEへ返信

```js
async function replyLine(token, message) {
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
}
```

---

# 📝 7. Symbol ブロックチェーンにメッセージ記録

```js
async function sendToSymbol(userId, msg) {
  const pk = new PrivateKey(SYMBOL_PRIVATE_KEY);
  const keyPair = new facade.static.KeyPair(pk);

  const plainMessage = "\0" + msg;
  const messageBytes = new TextEncoder().encode(plainMessage);

  const descriptor = new descriptors.TransferTransactionV1Descriptor(
    new Address(SYMBOL_TO_ADDRESS),
    [
      new descriptors.UnresolvedMosaicDescriptor(
        new models.UnresolvedMosaicId(XYM_ID),
        new models.Amount(0n)
      )
    ],
    messageBytes
  );
```

### トランザクション作成 & 署名

```js
const tx = facade.createTransactionFromTypedDescriptor(
  descriptor,
  keyPair.publicKey,
  FEE_MULTIPLIER,
  2 * 60 * 60
);

const sig = facade.signTransaction(keyPair, tx);
const jsonPayload =
  facade.transactionFactory.static.attachSignature(tx, sig);
```

### ネットワークにアナウンス

```js
const res = await fetch(`${NODE_URL}/transactions`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: jsonPayload
});
```

---

# 📡 8. Webhook受信（LINE Bot → サーバー）

```js
app.post("/webhook", async (req, res) => {
  const signature = req.headers["x-line-signature"];
  const raw = req.rawBody;

  if (!verifyLineSignature(raw, signature)) {
    return res.status(403).send("invalid signature");
  }

  res.status(200).send("ok");
```

---

# 🧠 9. メッセージ処理

```js
const events = req.body.events || [];

for (const ev of events) {
  if (ev.type !== "message") continue;
  if (ev.message.type !== "text") continue;

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
```

---

# ✨ Symbolへ書き込み → LINE返信

```js
try {
  const url = await sendToSymbol(ev.source.userId, text);
  await replyLine(
    ev.replyToken,
    `📝 ブロックチェーンに記録しました\n${url}`
  );
} catch (err) {
  await replyLine(ev.replyToken, `⚠️エラー: ${err.message}`);
}
```

---

# 🏁 10. サーバー起動

```js
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on", PORT));
```

---

# ✔ まとめ

- LINE Messaging API の署名検証を実装済み  
- Symbol SDK v3 の正しい使い方  
- 0XYM のメッセージ転送でコスト最小  
- Webhookを使った完全自動処理  
- レスポンスは Symbol Explorer URL を返す  

---

MIT License
