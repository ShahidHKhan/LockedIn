import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ChatGoogle } from "@langchain/google-gauth";
import { HumanMessage } from "@langchain/core/messages";
import { createAgent } from "langchain";
import { MemorySaver } from "@langchain/langgraph";

import { stretchTool } from "./tools/stretchTool.js";
import { summarizeTool } from "./tools/summarizeTool.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const model = new ChatGoogle({
  model: "gemini-2.5-flash",
  maxReasoningTokens: 0
});

const agent = createAgent({
  model,
  tools: [stretchTool, summarizeTool],
  systemPrompt: `
You are a helpful study assistant. 
Suggest stretches or summarize info using tools. Be brief and supportive.
  `,
  checkpointer: new MemorySaver()
});

// POST /api/ask
app.post("/api/ask", async (req, res) => {
  const { message, userId = "student_1" } = req.body;

  const response = await agent.invoke(
    {
      messages: [new HumanMessage(message)],
    },
    {
      configurable: { thread_id: "lockedin" },
      context: { userId },
    }
  );

  res.json({ response: response.messages.at(-1)?.text });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
