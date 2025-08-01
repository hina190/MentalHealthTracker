import { NextRequest, NextResponse } from "next/server";

let reminders: { time: string; message: string }[] = [];

export async function GET() {
  // Return reminders sorted by time ascending
  const sorted = reminders.sort((a, b) => a.time.localeCompare(b.time));
  return NextResponse.json({ reminders: sorted });
}

export async function POST(req: NextRequest) {
  const reminder = await req.json();

  // Avoid duplicates (same time + message)
  const exists = reminders.some(
    (r) => r.time === reminder.time && r.message === reminder.message
  );
  if (!exists) {
    reminders = [reminder, ...reminders];
  }

  const sorted = reminders.sort((a, b) => a.time.localeCompare(b.time));
  return NextResponse.json({ reminders: sorted });
}

export async function DELETE(req: NextRequest) {
  const { time, message, clearAll } = await req.json();

  if (clearAll) {
    reminders = [];
    return NextResponse.json({ reminders });
  }

  if (time && message) {
    reminders = reminders.filter(
      (r) => !(r.time === time && r.message === message)
    );
    return NextResponse.json({ reminders });
  }

  return NextResponse.json(
    { error: "Missing parameters for deletion" },
    { status: 400 }
  );
}
