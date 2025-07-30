'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const { error } = await supabase.auth.getSessionFromUrl()
      if (error) {
        console.error('Error getting session:', error.message)
      } else {
        // ✅ Session successfully restored!
        router.push('/dashboard') // or wherever you want
      }
    }

    handleAuth()
  }, [])

  return <p className="p-4">Logging you in...</p>
}
