export const runtime = "nodejs";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return Response.json({ error: "No URL provided" }, { status: 400 });
    }

    try {
      new URL(url);
    } catch {
      return Response.json({ error: "Invalid URL format" }, { status: 400 });
    }

    const response = await fetch(url);

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch URL" },
        { status: 400 }
      );
    }

    const html = await response.text();

    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
      return Response.json(
        { error: "Could not extract article content" },
        { status: 400 }
      );
    }

    return Response.json({
      title: article.title,
      content: article.textContent,
    });

  } catch (error) {
    console.error("Extraction error:", error);
    return Response.json(
      { error: "Extraction failed" },
      { status: 500 }
    );
  }
}

