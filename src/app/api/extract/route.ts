export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch URL" },
        { status: 500 }
      );
    }

    const html = await response.text();

    // 🔥 Basic text extraction (remove scripts/styles/tags)
    let text = html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Limit size so Gemini doesn’t explode
    text = text.slice(0, 12000);

    return NextResponse.json({ content: text });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Extraction failed" },
      { status: 500 }
    );
  }
}
