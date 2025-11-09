import * as z from "zod";
import { ChatGoogle } from "@langchain/google-gauth";
import { BaseMessage, HumanMessage } from "@langchain/core/messages";
import { StructuredTool, ToolRunnableConfig } from "@langchain/core/tools";
import { createAgent } from "langchain";
import { MemorySaver } from "@langchain/langgraph";
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { lastMsg, msgsToTxt } from "./util.js";
import { stretchTool } from "./tools/stretchTool.js";
import { summarizeTool } from "./tools/summarizeTool.js";
import "dotenv/config";

// Types
type AgentContext = { userId: string };
type AgentConfig = ToolRunnableConfig<Record<string, any>, AgentContext>;

// Tools
const tools: StructuredTool[] = [stretchTool, summarizeTool];

// Model
const model = new ChatGoogle({
  model: "gemini-2.5-flash",
  maxReasoningTokens: 0
});

// System prompt
const systemPrompt = `
You are a study assistant.
Use tools to help users with:
- Suggesting stretches if they feel sore
- Summarizing info they say out loud into clean notes
Always be helpful and brief.
`;

const agent = createAgent({
  model,
  tools,
  systemPrompt,
  checkpointer: new MemorySaver()
});

// CLI input
const rl = readline.createInterface({ input, output });
const id = process.argv[2] || "student_1";
const config: AgentConfig = {
  configurable: { thread_id: "lockedin" },
  context: { userId: id }
};

// CLI Loop
const prompt = await rl.question("You: ");
const messages = [new HumanMessage(prompt)];
const response = await agent.invoke({ messages }, config);
const responseMessages = response.messages;
const lastMessage = lastMsg(responseMessages);

console.log(msgsToTxt(responseMessages));
console.log(lastMessage?.text);

rl.close(); // <- close after one use
