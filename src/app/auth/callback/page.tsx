'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Processing authentication...')

  useEffect(() => {
    const handleAuth = async () => {
      try {
        console.log('🔐 Starting authentication callback...')
        console.log('🔗 Current URL:', window.location.href)
        
        // Handle the auth callback
        const { data, error } = await supabase.auth.getSession()
        
        console.log('🔐 Auth result:', { data, error })
        
        if (error) {
          console.error('❌ Error getting session:', error.message)
          setStatus(`Error: ${error.message}`)
          setTimeout(() => router.push('/login'), 3000)
          return
        }
        
        if (data.session) {
          console.log('✅ Session successfully restored!')
          setStatus('Authentication successful! Redirecting...')
          
          // Check if this is a new user (first time signing in)
          const user = data.session.user
          const isNewUser = user.created_at === user.last_sign_in_at
          
          // Wait a moment for the session to be fully established
          setTimeout(() => {
            if (isNewUser) {
              // New user - redirect to welcome page
              router.push('/welcome')
            } else {
              // Existing user - redirect to dashboard
              router.push('/dashboard')
            }
          }, 1000)
        } else {
          console.log('❌ No session found, trying to handle URL...')
          
          // Try to handle the URL manually if session wasn't detected
          const { data: urlData, error: urlError } = await supabase.auth.getSession()
          
          if (urlError) {
            console.error('❌ URL handling error:', urlError)
            setStatus('Authentication failed. Please try again.')
            setTimeout(() => router.push('/login'), 3000)
          } else if (urlData.session) {
            console.log('✅ Session found after URL handling!')
            setStatus('Authentication successful! Redirecting...')
            
            const user = urlData.session.user
            const isNewUser = user.created_at === user.last_sign_in_at
            
            setTimeout(() => {
              if (isNewUser) {
                router.push('/welcome')
              } else {
                router.push('/dashboard')
              }
            }, 1000)
          } else {
            console.log('❌ Still no session found')
            setStatus('No session found. Redirecting to login...')
            setTimeout(() => router.push('/login'), 3000)
          }
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Authenticating...
          </h2>
          <p className="text-gray-600">{status}</p>
        </div>
      </div>
    </div>
  )
}
