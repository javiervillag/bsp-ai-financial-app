import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getSession } from "@/lib/auth";
import { aiContext } from "@/lib/demo-data";

export async function POST(request: Request) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { message } = await request.json();
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is missing. Real AI responses are required, so this endpoint will not fake an answer." },
      { status: 503 },
    );
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4.1",
    input: [
      {
        role: "system",
        content:
          "You are Barker AI, a financial intelligence analyst for Barker and Sons Plumbing. Use the provided Barker demo data and Fathom-derived context. Be concise, specific, and operational. Never claim live integrations beyond demo context.",
      },
      {
        role: "user",
        content: `Context:\n${JSON.stringify(aiContext)}\n\nQuestion:\n${String(message || "")}`,
      },
    ],
  });

  return NextResponse.json({ answer: response.output_text });
}
