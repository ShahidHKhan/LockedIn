import * as z from "zod";
import { tool } from "@langchain/core/tools";

const stretchSchema = z.object({
  bodyPart: z.string().describe("Body part that feels sore, e.g. neck, wrist, back")
});

function stretchFunc({ bodyPart }: { bodyPart: string }): string {
  const suggestions: Record<string, string[]> = {
    neck: ["Neck tilt", "Neck rotation", "Chin tuck"],
    wrist: ["Wrist flexor stretch", "Wrist extensor stretch", "Prayer stretch"],
    back: ["Cat-cow", "Child’s pose", "Standing backbend"]
  };

  const list = suggestions[bodyPart.toLowerCase()] || ["Gentle movement", "Breathing", "Rest"];
  return `Top 3 stretches for ${bodyPart}:\n- ${list.join("\n- ")}`;
}

export const stretchTool = tool(stretchFunc, {
  name: "suggest_stretches",
  description: "Suggest 3 stretches for a sore body part",
  schema: stretchSchema
});
