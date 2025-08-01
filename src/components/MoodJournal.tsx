'use client';

import React, { useState, useEffect } from 'react';

interface MoodEntry {
  date: string;
  mood: string;
  note: string;
}

const MoodJournal: React.FC = () => {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    fetch('/api/mood-journal')
      .then(res => res.json())
      .then(data => setEntries(data.entries || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const entry = { date: new Date().toISOString().slice(0, 10), mood, note };
    const res = await fetch('/api/mood-journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    const data = await res.json();
    setEntries(data.entries);
    setMood('');
    setNote('');
  };

  return (
    <div>
      <h2>Mood Journal</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Mood (e.g. happy, sad)"
          value={mood}
          onChange={e => setMood(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <button type="submit">Log Mood</button>
      </form>
      <ul>
        {entries.map((entry, idx) => (
          <li key={idx}>
            <b>{entry.date}</b>: {entry.mood} {entry.note && `- ${entry.note}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodJournal;