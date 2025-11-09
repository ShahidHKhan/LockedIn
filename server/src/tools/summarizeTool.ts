import * as z from "zod";
import { tool } from "@langchain/core/tools";

const summarizeSchema = z.object({
  info: z.string().describe("The user's raw, possibly incorrect study notes.")
});

async function summarizeFunc({ info }: { info: string }): Promise<string> {
  return `Please take the following study notes and:
1. Correct any factual inaccuracies.
2. Rewrite them clearly.
3. Return them as clean bullet points.

Notes: """${info}"""`;
}

export const summarizeTool = tool(summarizeFunc, {
  name: "summarize_notes",
  description: "Fix incorrect study notes and rewrite them as clean bullet points.",
  schema: summarizeSchema,
});
