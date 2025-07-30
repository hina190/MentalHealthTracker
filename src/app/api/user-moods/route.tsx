import { supabase } from '@/lib/supabase'
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

    // Fetch moods from Supabase
    const { data: moods, error } = await supabase
      .from('moods')
      .select('*')
      .eq('email', email)
      .order('date', { ascending: true })

    if (error) {
      console.error('❌ API: Error fetching moods:', error)
      return NextResponse.json({ error: 'Failed to fetch moods' }, { status: 500 })
    }

    console.log('✅ API: Found moods:', moods?.length || 0)
    
    return NextResponse.json(moods || [])
  } catch (error) {
    console.error('❌ API: Error in user-moods endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
