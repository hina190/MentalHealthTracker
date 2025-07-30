import { connectDB } from '@/lib/mongodb'
import { Mood } from '@/models/Mood'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    console.log('🔍 API: user-moods endpoint called')
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    
    console.log('🔍 API: Email parameter:', email)

    if (!email) {
      console.error('❌ API: No email provided')
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 })
    }

    await connectDB()
    console.log('✅ API: Database connected')
    
    const moods = await Mood.find({ email }).sort({ date: 1 }).lean()
    console.log('✅ API: Found moods:', moods.length)
    
    return NextResponse.json(moods)
  } catch (error) {
    console.error('❌ API: Error in user-moods endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
