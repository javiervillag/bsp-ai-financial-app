import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    checks: {
      authSecret: Boolean(process.env.AUTH_SECRET),
      databaseUrl: Boolean(process.env.DATABASE_URL),
      openAiKey: Boolean(process.env.OPENAI_API_KEY),
      openAiModel: process.env.OPENAI_MODEL || "gpt-4.1",
    },
  });
}
