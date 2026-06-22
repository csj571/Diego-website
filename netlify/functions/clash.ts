import type { Context, Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import OpenAI from "openai";

const openai = new OpenAI();

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed. Use POST." }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const body = await req.json();
    const { title, codeA, codeB, language = "TypeScript" } = body;

    if (!codeA || !codeB) {
      return new Response(JSON.stringify({ error: "Both codeA and codeB are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const clashTitle = title || "Untitled Code Clash";
    const clashId = `clash_${Date.now()}`;

    // Evaluate the code clash via Netlify AI Gateway
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are CODE CLASH JUDGE, an elite, unbiased, and incredibly sharp technical reviewer. 
You are presented with two code snippets (Snippet A and Snippet B) that are supposed to solve the same problem or implement the same utility in the language specified.
Your task is to analyze both across three metrics:
1. **Readability & Maintainability**
2. **Execution Efficiency & Speed**
3. **Security & Edge Cases**

Assign a score out of 100 for each snippet for each metric. Determine a clear, definitive winner. 
Provide a comprehensive breakdown detailing why the winner's approach is superior, what flaws exist in both implementations, and how the loser can improve.

Format your output strictly as a JSON object with the following structure:
{
  "winner": "A" | "B" | "TIE",
  "clashSummary": "Short explanation of the contest",
  "scores": {
    "A": { "readability": 90, "efficiency": 85, "security": 95, "overall": 90 },
    "B": { "readability": 75, "efficiency": 95, "security": 80, "overall": 83 }
  },
  "judgement": {
    "readabilityAnalysis": "Comparison of style, spacing, naming, and mental model",
    "efficiencyAnalysis": "Comparison of Big-O complexity, allocations, and runtime overhead",
    "securityAnalysis": "Comparison of potential exploits, null pointers, buffer overflows, or inputs validation",
    "verdictDetail": "Final concluding paragraphs detailing why the winner won."
  }
}`
        },
        {
          role: "user",
          content: `Language: ${language}\n\n[SNIPPET A]\n${codeA}\n\n[SNIPPET B]\n${codeB}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const report = JSON.parse(response.choices[0]?.message?.content || "{}");

    const resultPayload = {
      id: clashId,
      title: clashTitle,
      language,
      codeA,
      codeB,
      evaluation: report,
      clashedAt: new Date().toISOString()
    };

    // Save in Netlify Blobs for global explorer feed
    const store = getStore({ name: "sparkdev-clashes" });
    await store.set(clashId, JSON.stringify(resultPayload));

    return new Response(JSON.stringify({
      source: "agent-runner-live",
      clashId,
      data: resultPayload
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const config: Config = {
  path: "/api/clash"
};
