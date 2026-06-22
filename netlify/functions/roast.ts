import type { Context, Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import OpenAI from "openai";

// Netlify AI Gateway automatically injects credentials, so we do not need keys!
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
    const { repoUrl, bypassCache = false } = body;

    if (!repoUrl) {
      return new Response(JSON.stringify({ error: "repoUrl is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Extract owner and repo
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      return new Response(JSON.stringify({ error: "Invalid public GitHub repo URL." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const owner = match[1];
    const repo = match[2].replace(/\.git$/, "");
    const blobKey = `roast/${owner}/${repo}`.toLowerCase();

    // Get Netlify Blobs store
    const store = getStore({ name: "sparkdev-roasts" });

    // Check if we already have this roast cached in Blobs
    if (!bypassCache) {
      const cached = await store.get(blobKey, { type: "json" });
      if (cached) {
        return new Response(JSON.stringify({
          source: "netlify-blobs",
          owner,
          repo,
          data: cached
        }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Fetch README from GitHub
    let readmeText = "";
    try {
      const readmeRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`);
      if (readmeRes.ok) {
        readmeText = await readmeRes.text();
      } else {
        // Try master branch as fallback
        const backupRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`);
        if (backupRes.ok) {
          readmeText = await backupRes.text();
        } else {
          readmeText = "No README.md file was found. Roast this repo for being an undocumented ghost town!";
        }
      }
    } catch (err) {
      readmeText = "Failed to fetch README.md. Roast this repo for its bad network karma!";
    }

    // Generate brutal critique using Netlify AI Gateway
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are README ROASTER, an incredibly witty, brutally honest, yet highly constructive AI developer assistant. 
Your job is to roast the provided README.md of a GitHub repository. 
Analyze its wording, architecture, badges, setup instructions, and claims.
Do not hold back. Be sarcastic, humorous, and sharp (inspired by internet roasters), but end each section with genuine, high-quality, actionable feedback on how to fix it.

Format your output in beautifully clean Markdown with these sections:
1. 🔥 **The "What is this even for?" Award** (Critique of the tagline/description)
2. 🔌 **Dependency Bloat & Setup Sins** (Critique of installation instructions)
3. 🕵️ **Missing Documentation Crimes** (Sins of omission - what's missing?)
4. 🤡 **The Buzzword Bingo Verdict** (Critique of inflated claims or tech stack choice)
5. 🛡️ **Actionable Recovery Plan** (A Bulleted list of concrete steps they can take to make their README not suck)
6. 📊 **Calibrated Rating** (A score from 0/10 to 10/10 with a funny explanation)`
        },
        {
          role: "user",
          content: `Please roast this README for the repository ${owner}/${repo}:\n\n${readmeText.substring(0, 15000)}`
        }
      ],
      temperature: 0.85,
      max_tokens: 2000
    });

    const roastText = response.choices[0]?.message?.content || "No roast generated. The AI went speechless.";

    const resultPayload = {
      owner,
      repo,
      roast: roastText,
      roastedAt: new Date().toISOString(),
      readmeLength: readmeText.length
    };

    // Store in Netlify Blobs for future retrievals
    await store.set(blobKey, JSON.stringify(resultPayload));

    return new Response(JSON.stringify({
      source: "agent-runner-live",
      owner,
      repo,
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
  path: "/api/roast"
};
