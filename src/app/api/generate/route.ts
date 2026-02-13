export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, tone, depth, cta, hashtags } = body;

    if (!content) {
      return NextResponse.json({ error: "Missing content" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key missing" }, { status: 500 });
    }

    const prompt = `
You are an AI content repurposing engine.

Return ONLY valid JSON.
Do NOT add explanations.
Do NOT wrap in markdown.
Do NOT include \`\`\`.

Format strictly as:

{
  "linkedin": ["", "", ""],
  "twitter_hooks": ["", "", ""],
  "meta_description": "",
  "youtube": {
    "title": "",
    "description": ""
  }
}

Tone: ${tone}
Depth: ${depth}
CTA: ${cta}
Include Hashtags: ${hashtags}

Content:
${content}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Gemini API failed" },
        { status: 500 },
      );
    }

    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json(
        { error: "Empty Gemini response" },
        { status: 500 },
      );
    }

    // 🔥 SAFELY EXTRACT JSON
    let jsonText = rawText.trim();

    // Remove markdown ```json blocks if present
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```json/g, "");
      jsonText = jsonText.replace(/```/g, "");
    }

    // Extract first { ... } block
    const firstBrace = jsonText.indexOf("{");
    const lastBrace = jsonText.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      return NextResponse.json(
        { error: "Gemini did not return JSON structure" },
        { status: 500 },
      );
    }

    jsonText = jsonText.substring(firstBrace, lastBrace + 1);

    let parsed;

    try {
      parsed = JSON.parse(jsonText);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse Gemini JSON" },
        { status: 500 },
      );
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unexpected server error" },
      { status: 500 },
    );
  }
}
