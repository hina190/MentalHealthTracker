'use client';

import React, { useEffect, useState } from 'react';

interface MoodEntry {
  date: string;
  mood: string;
  note: string;
}

const MoodAnalytics: React.FC = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    fetch('/api/mood-journal')
      .then(res => res.json())
      .then(data => setEntries(data.entries || []));
  }, []);

  // Count moods
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <h2>Mood Analytics</h2>
      <ul>
        {Object.entries(moodCounts).map(([mood, count]) => (
          <li key={mood}>
            {mood}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodAnalytics;