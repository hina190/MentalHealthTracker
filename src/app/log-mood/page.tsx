'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import ProtectedRoute from '@/components/ProtectedRoute'

const emojis = ['😢', '😕', '😐', '🙂', '😊']

export default function LogMoodPage() {
  const [selected, setSelected] = useState('')
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleSubmit = async () => {
    if (!user) return

    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/mood', {
        method: 'POST',
        body: JSON.stringify({
          email: user.email,
          emoji: selected,
          note,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (res.ok) {
        setMessage('Mood logged successfully!')
        setSelected('')
        setNote('')
      } else {
        setMessage('Failed to log mood. Please try again.')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="p-6 space-y-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold">Log Your Mood</h1>
        
        <div className="flex gap-2 justify-center">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setSelected(emoji)}
              className={`text-4xl p-4 rounded-lg transition-all ${
                selected === emoji 
                  ? 'bg-blue-100 border-2 border-blue-500 scale-110' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling? (optional)
          </label>
          <textarea
            id="note"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write a note about your mood..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
          />
        </div>

        <button 
          onClick={handleSubmit} 
          disabled={!selected || loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging...' : 'Log Mood'}
        </button>

        {message && (
          <div className={`text-center p-3 rounded-md ${
            message.includes('successfully') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
