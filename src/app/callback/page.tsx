'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Callback() {
  const router = useRouter()
  const [status, setStatus] = useState('Processing authentication...')

  useEffect(() => {
    const handleAuth = async () => {
      try {
        console.log('🔐 Starting authentication callback...')
        console.log('🔗 Current URL:', window.location.href)
        
        // With detectSessionInUrl enabled, we can just get the session
        const { data: { session }, error } = await supabase.auth.getSession()
        
        console.log('🔐 Auth result:', { session, error })
        
        if (error) {
          console.error('❌ Error getting session:', error.message)
          setStatus(`Error: ${error.message}`)
          // Redirect to login on error
          setTimeout(() => router.push('/login'), 3000)
        } else if (session) {
          console.log('✅ Session successfully restored!')
          setStatus('Authentication successful! Redirecting...')
          router.push('/')
        } else {
          console.log('❌ No session found')
          setStatus('No session found. Redirecting to login...')
          setTimeout(() => router.push('/login'), 3000)
        }
      } catch (err) {
        console.error('❌ Unexpected error:', err)
        setStatus(`Unexpected error: ${err}`)
        setTimeout(() => router.push('/login'), 3000)
      }
    }

    handleAuth()
  }, [router])

  return (
    <div className="p-4 text-center">
      <p>{status}</p>
      <p className="text-sm text-gray-500 mt-2">Please wait...</p>
    </div>
  )
}
