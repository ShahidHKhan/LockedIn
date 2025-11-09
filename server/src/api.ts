// server/src/api.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ChatGoogle } from "@langchain/google-gauth";
import { createAgent } from "langchain";
import { HumanMessage } from "@langchain/core/messages";
import { stretchTool } from "./tools/stretchTool.js";
import { summarizeTool } from "./tools/summarizeTool.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const tools = [stretchTool, summarizeTool];

const model = new ChatGoogle({
  model: "gemini-2.5-flash",
  maxReasoningTokens: 0
});

const agent = createAgent({
  model,
  tools,
  systemPrompt: `You're a helpful study agent. Use tools for stretches or summaries.`,
});

app.post("/api/ask", async (req, res) => {
  const { prompt } = req.body;
  const response = await agent.invoke({
    messages: [new HumanMessage(prompt)],
  });
  const last = response.messages[response.messages.length - 1];
  res.json({ reply: last?.text });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ API Server running at http://localhost:${PORT}`);
});
