import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-side Supabase client. Uses the service role key when available
// (bypasses RLS for trusted server reads/writes), otherwise falls back to
// the public anon key (respects RLS, e.g. only reads is_active = true rows).
//
// Lazily initialized so that `next build` doesn't fail when env vars
// aren't present at build time (they're only needed at request time).
let client: SupabaseClient | null = null;

export function getSupabaseServer(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are not configured");
  }

  client = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  return client;
}
