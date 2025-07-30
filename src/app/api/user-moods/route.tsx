import { connectDB } from '@/lib/mongodb'
import { Mood } from '@/models/Mood'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  await connectDB()
  const moods = await Mood.find({ email }).sort({ date: 1 }).lean()
  return NextResponse.json(moods)
}
