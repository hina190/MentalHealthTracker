import { NextRequest, NextResponse } from 'next/server';

let reminders: any[] = [];

export async function GET() {
  return NextResponse.json({ reminders });
}

export async function POST(req: NextRequest) {
  const reminder = await req.json();
  reminders = [reminder, ...reminders];
  return NextResponse.json({ reminders });
}