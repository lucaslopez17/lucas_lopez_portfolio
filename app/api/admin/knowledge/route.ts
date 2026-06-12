import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await getSupabaseServer()
    .from("profile_knowledge")
    .select("id, title, category, content, language, is_active, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ rows: data });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, category, content, language, is_active } = body;

  if (!title || !category || !content || !language) {
    return NextResponse.json({ error: "title, category, content and language are required" }, { status: 400 });
  }

  const { data, error } = await getSupabaseServer()
    .from("profile_knowledge")
    .insert({ title, category, content, language, is_active: is_active ?? true })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ row: data });
}
