import * as z from "zod";
import { tool } from "@langchain/core/tools";

const summarizeSchema = z.object({
  info: z.string().describe("The full information the user blurted out")
});

function summarizeFunc({ info }: { info: string }): string {
  return `📝 Summary:\n- ${info.split('.').filter(Boolean).map(s => s.trim()).join('\n- ')}`;
}

export const summarizeTool = tool(summarizeFunc, {
  name: "summarize_notes",
  description: "Summarize user's blurted study info into brief notes",
  schema: summarizeSchema
});
