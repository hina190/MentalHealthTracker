import { connectDB } from '@/lib/mongodb'
import { Mood } from '@/models/Mood'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, emoji, note } = body

  await connectDB()
  const mood = await Mood.create({ email, emoji, note })
  return NextResponse.json(mood)
}
