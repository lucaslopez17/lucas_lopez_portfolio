import { getSupabaseServer } from "./supabase";

export type KnowledgeRow = {
  id: string;
  title: string;
  category: string;
  content: string;
  language: string;
  is_active: boolean;
  tags: string[];
};

/**
 * Retrieve knowledge rows relevant to the user's message.
 *
 * v1 (current): simple ILIKE text search across title, category and content,
 * scoped to active rows. Also pulls in always-relevant "rule" categories
 * (Response Rules, Contact Rules) so Gemini always has the guardrails.
 *
 * --- FUTURE UPGRADE PATH (pgvector / embeddings) ---
 * To switch to vector similarity search later:
 *   1. Add an `embedding vector(768)` column (see supabase/profile_knowledge.sql).
 *   2. Generate an embedding for `message` via the Gemini embeddings API.
 *   3. Replace the query below with an RPC call, e.g.:
 *        supabaseServer.rpc("match_profile_knowledge", {
 *          query_embedding: embedding,
 *          match_count: 6,
 *        })
 *   The function signature/return shape can stay the same, so
 *   app/api/chat/route.ts does not need to change.
 * ----------------------------------------------------
 */
export async function getRelevantKnowledge(message: string, language: string): Promise<KnowledgeRow[]> {
  const keywords = extractKeywords(message).map(normalize);
  const supabaseServer = getSupabaseServer();

  // Search across both languages — language detection from a short message
  // is unreliable, and excluding the other language can hide keyword matches
  // (e.g. an "es" entry when the message was misdetected as "en").
  const { data, error } = await supabaseServer
    .from("profile_knowledge")
    .select("id, title, category, content, language, is_active, tags")
    .eq("is_active", true);

  if (error) {
    console.error("Supabase knowledge query failed:", error.message);
    return [];
  }

  const rows = data ?? [];

  if (keywords.length > 0) {
    const matches = rows.filter((row) => {
      const haystackWords = normalize(
        `${row.title} ${row.category} ${row.content} ${(row.tags ?? []).join(" ")}`
      ).split(/\s+/);

      return keywords.some((word) =>
        haystackWords.some((haystackWord) => wordsMatch(word, haystackWord))
      );
    });

    if (matches.length > 0) {
      return matches.slice(0, 8);
    }
  }

  // Fallback: no keyword matches — return the "always relevant" rule rows
  // plus the "About Lucas" overview so Gemini still has something to work with.
  const { data: fallback, error: fallbackError } = await getSupabaseServer()
    .from("profile_knowledge")
    .select("id, title, category, content, language, is_active, tags")
    .eq("is_active", true)
    .eq("language", language === "es" ? "es" : "en")
    .in("category", ["About Lucas", "Response Rules", "Contact Rules"]);

  if (fallbackError) {
    console.error("Supabase fallback knowledge query failed:", fallbackError.message);
    return [];
  }

  return fallback ?? [];
}

// Strips accents/diacritics and lowercases, so "hidráulico" matches "hidraulico".
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// Loose match for two normalized words: exact match, or one is a prefix of
// the other (length >= 5) so plurals/conjugations like "hidraulicas" /
// "hidraulico" or "reparaciones" / "reparar" still match.
function wordsMatch(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.length >= 5 && b.length >= 5) {
    const len = Math.min(a.length, b.length) - 1;
    return a.slice(0, len) === b.slice(0, len);
  }
  return false;
}

// Pull out meaningful words from the user's message to use as search terms.
// Filters out very short / common stopwords to avoid overly broad matches.
function extractKeywords(message: string): string[] {
  const stopwords = new Set([
    "the", "and", "for", "are", "you", "what", "does", "did", "can", "with",
    "about", "lucas", "his", "him", "que", "para", "con", "los", "las", "del",
    "una", "uno", "tiene", "sobre", "lucas's", "is", "of", "in", "on", "a",
    "es", "el", "la", "de", "y", "tu", "su",
  ]);

  return Array.from(
    new Set(
      message
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, " ")
        .split(/\s+/)
        .filter((word) => word.length > 2 && !stopwords.has(word))
    )
  ).slice(0, 8);
}

// Naive language detection: looks for Spanish-specific characters/words.
export function detectLanguage(message: string): "en" | "es" {
  const spanishWords = new Set([
    "que", "como", "cual", "cuales", "donde", "porque", "cuando", "quien",
    "quienes", "para", "con", "los", "las", "del", "una", "unos", "unas",
    "tiene", "tienes", "tenes", "tengo", "eres", "sos", "esta", "estas",
    "puedes", "podes", "puede", "sabes", "sabe", "conoces", "conoce", "dime",
    "cuentame", "hablas", "habla", "toca", "tocas", "tocar", "le", "lo", "su",
    "sus", "muy", "mas", "pero", "tambien", "trabaja", "trabajas", "trabajo",
    "vive", "vives", "gusta", "gustan", "hace", "haces", "hizo", "es", "el",
    "la", "de", "y", "en", "un", "se", "te", "mi", "si", "no", "esto", "eso",
  ]);

  if (/[áéíóúñ¿¡]/i.test(message)) {
    return "es";
  }

  const words = message
    .toLowerCase()
    .replace(/[^\p{L}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);

  return words.some((word) => spanishWords.has(word)) ? "es" : "en";
}
