'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'

export default function TestAuthPage() {
  const [testEmail, setTestEmail] = useState('')
  const [testPassword, setTestPassword] = useState('')
  const [result, setResult] = useState('')
  const { signIn } = useAuth()

  const testLogin = async () => {
    if (!testEmail || !testPassword) {
      setResult('Please enter both email and password')
      return
    }

    try {
      const { error } = await signIn(testEmail, testPassword)
      if (error) {
        setResult(`Error: ${error.message}`)
      } else {
        setResult('Login successful!')
      }
    } catch (err) {
      setResult(`Unexpected error: ${err}`)
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Auth Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="test@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password:</label>
          <input
            type="password"
            value={testPassword}
            onChange={(e) => setTestPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="password"
          />
        </div>
        
        <button
          onClick={testLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Test Login
        </button>
        
        {result && (
          <div className="p-3 bg-gray-100 rounded">
            <strong>Result:</strong> {result}
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Current Forms Status:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Login page should have email + password fields</li>
          <li>Signup page should have name + email + password + confirm password</li>
          <li>Both should NOT mention "magic link"</li>
          <li>Login button should say "Sign in" not "Send Magic Link"</li>
        </ul>
      </div>
    </div>
  )
} 