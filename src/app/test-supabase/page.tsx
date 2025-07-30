'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestSupabasePage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testSignup = async () => {
    if (!email || !password) {
      setResult('Please enter both email and password')
      return
    }

    setLoading(true)
    setResult('Testing signup...')

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/welcome`,
        }
      })

      if (error) {
        setResult(`Error: ${error.message}`)
      } else {
        setResult(`Success! User created: ${data.user?.email}`)
        console.log('Signup data:', data)
      }
    } catch (err) {
      setResult(`Unexpected error: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const testLogin = async () => {
    if (!email || !password) {
      setResult('Please enter both email and password')
      return
    }

    setLoading(true)
    setResult('Testing login...')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setResult(`Login Error: ${error.message}`)
      } else {
        setResult(`Login Success! User: ${data.user?.email}`)
        console.log('Login data:', data)
      }
    } catch (err) {
      setResult(`Unexpected error: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const checkConfig = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    setResult(`Config Check:
    URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}
    Key: ${supabaseKey ? '✅ Set' : '❌ Missing'}
    
    Current URL: ${window.location.origin}
    Supabase URL: ${supabaseUrl || 'Not set'}`)
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="test@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="password"
          />
        </div>
        
        <div className="space-y-2">
          <button
            onClick={testSignup}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Test Signup
          </button>
          
          <button
            onClick={testLogin}
            disabled={loading}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            Test Login
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
        <h3 className="font-semibold mb-2">Troubleshooting Steps:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Click "Check Config" to verify environment variables</li>
          <li>Try "Test Signup" with a new email</li>
          <li>Try "Test Login" with the same credentials</li>
          <li>Check browser console for detailed logs</li>
        </ol>
      </div>
    </div>
  )
} 