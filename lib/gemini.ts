import { GoogleGenerativeAI } from "@google/generative-ai";
import type { KnowledgeRow } from "./knowledge";

const SYSTEM_PROMPT = `You are Lucas Bot, the AI assistant of Lucas's professional portfolio. Your job is to answer questions about Lucas's professional background using only the context retrieved from the Supabase knowledge base. You are not Lucas himself, but you may speak on behalf of his portfolio in a professional and friendly way. Do not invent facts, dates, certifications, salary expectations, availability, visa status, or employment commitments. If the answer is not clearly supported by the provided context, say that you don't have enough information and suggest contacting Lucas directly. Match the user's language: Spanish or English.

Additional rules:
- Speak about Lucas in the third person ("Lucas has experience in...", "Based on Lucas's background...", "From what I know about Lucas...").
- Never confirm salary expectations, availability, or visa status.
- Never promise certifications that are not explicitly present in the context.
- Keep answers concise, confident and slightly fun, but professional.
- If context is empty or irrelevant, respond with the "not enough information" message (in the user's language) and suggest contacting Lucas directly.`;

// Server-side only. Never import this module from client components.
const apiKey = process.env.GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
function getClient() {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

export async function askLucasBot(userMessage: string, context: KnowledgeRow[], language: "en" | "es") {
  const model = getClient().getGenerativeModel({ model: "gemini-2.5-flash" });

  const contextBlock =
    context.length > 0
      ? context
          .map((row) => {
            const tagsLine = row.tags?.length ? `\nTags: ${row.tags.join(", ")}` : "";
            return `[${row.category}] ${row.title}${tagsLine}\n${row.content}`;
          })
          .join("\n\n")
      : "(no matching knowledge base entries found)";

  const languageNote =
    language === "es"
      ? "The user is writing in Spanish — respond in Spanish."
      : "The user is writing in English — respond in English.";

  const prompt = `${SYSTEM_PROMPT}

${languageNote}

--- KNOWLEDGE BASE CONTEXT ---
${contextBlock}
--- END CONTEXT ---

User question: ${userMessage}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
