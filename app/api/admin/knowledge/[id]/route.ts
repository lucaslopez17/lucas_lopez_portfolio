import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { title, category, content, language, is_active } = body;

  const update: Record<string, unknown> = {};
  if (title !== undefined) update.title = title;
  if (category !== undefined) update.category = category;
  if (content !== undefined) update.content = content;
  if (language !== undefined) update.language = language;
  if (is_active !== undefined) update.is_active = is_active;

  const { data, error } = await getSupabaseServer()
    .from("profile_knowledge")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ row: data });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { error } = await getSupabaseServer().from("profile_knowledge").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
