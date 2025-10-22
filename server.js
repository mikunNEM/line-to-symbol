import 'dotenv/config';
import express from "express";
import { webhookHandler } from "./api/webhook.js";

const app = express();

// LINEの署名検証用に raw body が必要
app.use(express.raw({ type: "*/*" }));

// Webhook エンドポイント
app.post("/webhook", webhookHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

