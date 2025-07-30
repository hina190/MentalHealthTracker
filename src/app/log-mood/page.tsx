'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const emojis = ['😄', '🙂', '😐', '😔', '😢']

export default function LogMoodPage() {
  const [selected, setSelected] = useState('')
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return alert('Not logged in')

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
      setMessage('Mood logged!')
      setSelected('')
      setNote('')
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Log Your Mood</h1>
      <div className="flex gap-2">
        {emojis.map((e) => (
          <button
            key={e}
            onClick={() => setSelected(e)}
            className={`text-3xl btn ${selected === e ? 'btn-primary' : 'btn-ghost'}`}
          >
            {e}
          </button>
        ))}
      </div>
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="Write a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit} className="btn btn-success w-full">
        Submit Mood
      </button>
      {message && <p className="text-success text-center">{message}</p>}
    </div>
  )
}
