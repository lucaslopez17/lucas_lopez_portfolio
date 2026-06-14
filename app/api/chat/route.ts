import { NextRequest, NextResponse } from "next/server";
import { askLucasBot } from "@/lib/gemini";
import { detectLanguage, getRelevantKnowledge } from "@/lib/knowledge";

export const runtime = "nodejs";

const NOT_ENOUGH_INFO = {
  en: "I don't have enough information to answer that accurately. You can contact Lucas directly for confirmation.",
  es: "No tengo suficiente información para responder eso con precisión. Podés contactar a Lucas directamente para confirmarlo.",
};

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const requestLog = new Map<string, number[]>();

const TOO_MANY_REQUESTS = {
  en: "You're sending messages too quickly. Please wait a few minutes and try again.",
  es: "Estás enviando mensajes muy rápido. Esperá unos minutos y volvé a intentar.",
};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      const body = await request.json().catch(() => ({}));
      const message = typeof body?.message === "string" ? body.message : "";
      const language = detectLanguage(message);
      return NextResponse.json({ reply: TOO_MANY_REQUESTS[language] }, { status: 429 });
    }

    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: "Message is too long" }, { status: 400 });
    }

    // 1. Detect language so we can scope the knowledge search and the
    //    final Gemini response to English or Spanish.
    const language = detectLanguage(message);

    // 2. Retrieve relevant knowledge from Supabase.
    //    --- EDIT HERE to change how knowledge is retrieved (e.g. switch
    //    to embeddings/pgvector search — see lib/knowledge.ts for details) ---
    const context = await getRelevantKnowledge(message, language);

    // If there's truly nothing relevant and no rules to fall back on,
    // short-circuit with the canned "not enough info" response.
    if (context.length === 0) {
      return NextResponse.json({ reply: NOT_ENOUGH_INFO[language] });
    }

    // 3. Send the message + retrieved context to Gemini.
    //    --- EDIT HERE to change the model, prompt, or response shaping ---
    const reply = await askLucasBot(message, context, language);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Lucas Bot /api/chat error:", error);
    return NextResponse.json(
      { error: "Something went wrong talking to Lucas Bot. Please try again." },
      { status: 500 }
    );
  }
}
