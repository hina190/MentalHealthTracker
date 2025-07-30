'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestEmailPage() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testMagicLink = async () => {
    if (!email) {
      setResult('Please enter an email address')
      return
    }

    setLoading(true)
    setResult('Sending magic link...')

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      })

      if (error) {
        setResult(`Error: ${error.message}`)
      } else {
        setResult('Magic link sent! Check your email (and spam folder).')
      }
    } catch (err) {
      setResult(`Error: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const checkConfig = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    setResult(`Production Config Check:
    URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}
    Key: ${supabaseKey ? '✅ Set' : '❌ Missing'}
    
    Current URL: ${window.location.origin}
    Supabase URL: ${supabaseUrl || 'Not set'}
    
    If both are set, the issue is in Supabase dashboard settings.`)
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Email Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="your-email@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <button
            onClick={testMagicLink}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Test Magic Link'}
          </button>
          
          <button
            onClick={checkConfig}
            className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Check Config
          </button>
        </div>
        
        {result && (
          <div className="p-3 bg-gray-100 rounded whitespace-pre-line">
            <strong>Result:</strong> {result}
          </div>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-semibold mb-2">If emails still don't work:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Check Supabase dashboard → Authentication → Settings</li>
          <li>Update Site URL to: https://mental-health-tracker-flax.vercel.app</li>
          <li>Add redirect URLs for production domain</li>
          <li>Check email service limits in Settings → General</li>
          <li>Check spam folder</li>
        </ol>
      </div>
    </div>
  )
} 