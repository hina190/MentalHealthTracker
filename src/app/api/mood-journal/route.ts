import { NextRequest, NextResponse } from 'next/server';

let moodEntries: any[] = [];

export async function GET() {
  return NextResponse.json({ entries: moodEntries });
}

export async function POST(req: NextRequest) {
  const entry = await req.json();
  moodEntries = [entry, ...moodEntries];
  return NextResponse.json({ entries: moodEntries });
}