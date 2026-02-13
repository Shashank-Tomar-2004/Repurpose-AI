import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { content, tone } = await req.json();

    if (!content) {
      return Response.json({ error: "No content provided" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a growth marketer.

Tone: ${tone || "Professional B2B"}

Generate:

1. Three LinkedIn posts (array of strings only).
2. Three Twitter hooks (array of strings only).
3. One SEO meta description under 160 characters.
4. One YouTube title and description.

Return STRICTLY valid JSON:

{
  "linkedin": ["post1","post2","post3"],
  "twitter_hooks": ["hook1","hook2","hook3"],
  "meta_description": "string",
  "youtube": {
    "title": "string",
    "description": "string"
  }
}

Blog content:
${content.slice(0, 8000)}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch {
      console.error("Invalid JSON from AI:", text);
      return Response.json(
        { error: "AI returned invalid JSON" },
        { status: 500 }
      );
    }

    // Ensure correct structure
    parsed.linkedin = Array.isArray(parsed.linkedin)
      ? parsed.linkedin.map((x: any) =>
          typeof x === "string" ? x : String(x)
        )
      : [];

    parsed.twitter_hooks = Array.isArray(parsed.twitter_hooks)
      ? parsed.twitter_hooks.map((x: any) =>
          typeof x === "string" ? x : String(x)
        )
      : [];

    parsed.meta_description =
      typeof parsed.meta_description === "string"
        ? parsed.meta_description
        : "";

    parsed.youtube = parsed.youtube || {};
    parsed.youtube.title =
      typeof parsed.youtube.title === "string"
        ? parsed.youtube.title
        : "";
    parsed.youtube.description =
      typeof parsed.youtube.description === "string"
        ? parsed.youtube.description
        : "";

    return Response.json(parsed);

  } catch (error) {
    console.error("AI Route Error:", error);
    return Response.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}

