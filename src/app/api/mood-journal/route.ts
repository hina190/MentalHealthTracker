// /app/api/mood-journal/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface MoodEntry {
  id: string;
  email: string;
  date: string;
  mood: string;
  note: string;
}

// GET all entries for a specific email
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("mood_entries")
    .select("*")
    .eq("email", email)
    .order("date", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entries: data });
}

// POST new entry
export async function POST(req: NextRequest) {
  const entry = await req.json();

  const { data, error } = await supabase
    .from("mood_entries")
    .insert([entry])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entries: data });
}

// DELETE specific entry or clear all
export async function DELETE(req: NextRequest) {
  const { email, id, clearAll } = await req.json();

  if (clearAll && email) {
    const { error } = await supabase
      .from("mood_entries")
      .delete()
      .eq("email", email);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ entries: [] });
  }

  if (id) {
    const { error } = await supabase.from("mood_entries").delete().eq("id", id);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Missing id or email" }, { status: 400 });
}
