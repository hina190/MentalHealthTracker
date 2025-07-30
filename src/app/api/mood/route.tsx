import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, emoji, note } = body

    if (!email || !emoji) {
      return NextResponse.json(
        { error: 'Email and emoji are required' },
        { status: 400 }
      )
    }

    // Insert mood data into Supabase
    const { data, error } = await supabase
      .from('moods')
      .insert([
        {
          email,
          emoji,
          note,
          date: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Error creating mood:', error)
      return NextResponse.json(
        { error: 'Failed to create mood' },
        { status: 500 }
      )
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Error in mood API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
