'use client';

import React, { useState, useEffect } from 'react';

interface Reminder {
  time: string;
  message: string;
}

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/reminders')
      .then(res => res.json())
      .then(data => setReminders(data.reminders || []));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const reminder = { time, message };
    const res = await fetch('/api/reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reminder),
    });
    const data = await res.json();
    setReminders(data.reminders);
    setTime('');
    setMessage('');
  };

  return (
    <div>
      <h2>Reminders</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 16 }}>
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Reminder message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
        />
        <button type="submit">Add Reminder</button>
      </form>
      <ul>
        {reminders.map((rem, idx) => (
          <li key={idx}>
            {rem.time} - {rem.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;