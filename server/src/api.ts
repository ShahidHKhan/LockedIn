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
  maxReasoningTokens: 0,
});

const agent = createAgent({
  model,
  tools,
  systemPrompt: `You're a helpful study agent. Use tools for stretches or summaries.`,
});

app.post("/ask", async (req, res) => {
  try {
    const { userId, input } = req.body;

    if (!userId || !input) {
      return res.status(400).json({ error: "Missing userId or input" });
    }

    const result = await agent.invoke(
      {
        messages: [new HumanMessage(input)],
      },
      {
        context: { userId },
        configurable: { thread_id: "lockedin" },
      }
    );

    const reply = result?.messages?.[result.messages.length - 1]?.content;
    res.json({ response: reply });
  } catch (error) {
    console.error("Agent error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// Use process.env.PORT (for Render), or default to 5000 locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ API Server running on port ${PORT}`);
});
