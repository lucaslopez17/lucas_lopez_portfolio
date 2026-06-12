import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "lucas_admin_session";

// Server-side check: compares the session cookie against ADMIN_PASSWORD.
// Used by admin API routes to gate read/write access to profile_knowledge.
export async function isAdminAuthenticated(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === password;
}
