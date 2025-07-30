'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser()

      console.log("🔐 User data:", data)
      console.log("❌ Error:", error)

      if (data?.user) {
        setIsLoggedIn(true)
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="text-center p-4">
      {isLoggedIn ? (
        <>
          <h1>Welcome back!</h1>
          <a href="/dashboard" className="btn btn-primary">Go to Dashboard</a>
        </>
      ) : (
        <a href="/login" className="btn btn-primary">Go to Login</a>
      )}
    </div>
  )
}
