"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Reminder {
  time: string;
  message: string;
}

interface MoodEntry {
  mood: string;
}

const moodSuggestions: Record<string, string[]> = {
  anxious: [
    "Try breathing exercises",
    "Take a short walk",
    "Practice mindfulness meditation",
  ],
  sad: [
    "Call a friend or family member",
    "Listen to your favorite music",
    "Write down what you feel",
  ],
  tired: ["Get some rest", "Avoid caffeine before bedtime", "Take a power nap"],
  happy: [
    "Keep up the great mood!",
    "Share your positivity",
    "Keep journaling",
  ],
  stressed: [
    "Try progressive muscle relaxation",
    "Take a short break from work",
    "Drink a glass of water",
  ],
};

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Fetch reminders from API
  useEffect(() => {
    fetch("/api/reminders")
      .then((res) => res.json())
      .then((data) => setReminders(data.reminders || []));
  }, []);

  // Fetch user email and moods for AI suggestions
  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const email = session?.user?.email;
      if (!email) {
        setLoading(false);
        return;
      }
      setUserEmail(email);

      try {
        const res = await fetch(`/api/mood-journal?email=${email}`);
        const data = await res.json();
        setEntries(data.entries || []);
      } catch {
        // fail silently for moods fetch
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Calculate most frequent mood
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const sortedMoods = Object.entries(moodCounts).sort((a, b) => b[1] - a[1]);
  const mostFrequentMood = sortedMoods[0]?.[0] || "";

  // Suggested reminders based on mood
  const suggestions = moodSuggestions[mostFrequentMood] || [
    "Remember to check in with yourself",
    "Stay positive!",
  ];

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!time || !message.trim()) return;

    const reminder = { time, message };
    const res = await fetch("/api/reminders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reminder),
    });
    const data = await res.json();
    setReminders(data.reminders);
    setTime("");
    setMessage("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md font-sans text-gray-900">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        ⏰ Reminders
      </h2>

      {/* Reminder Form */}
      <form
        onSubmit={handleAdd}
        className="flex flex-col sm:flex-row gap-4 mb-8 items-center"
      >
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="p-3 border border-indigo-300 rounded-md w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Reminder time"
        />
        <input
          type="text"
          placeholder="Reminder message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="p-3 border border-indigo-300 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Reminder message"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition w-full sm:w-auto"
          aria-label="Add reminder"
        >
          Add Reminder
        </button>
      </form>

      {/* Suggested Reminders */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-indigo-600">
          Suggested Reminders Based on Your Mood{" "}
          {mostFrequentMood && `(${mostFrequentMood})`}
        </h3>
        {loading ? (
          <p className="text-gray-600">Loading mood data...</p>
        ) : suggestions.length === 0 ? (
          <p className="text-gray-600">No suggestions available.</p>
        ) : (
          <ul className="space-y-2">
            {suggestions.map((sugg, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-indigo-50 p-3 rounded-md shadow-sm"
              >
                <span>{sugg}</span>
                <button
                  onClick={() => setMessage(sugg)}
                  className="text-indigo-700 font-semibold hover:underline ml-4"
                  aria-label={`Add suggested reminder: ${sugg}`}
                  type="button"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* List of Existing Reminders */}
      <section>
        <h3 className="text-xl font-semibold mb-3 text-indigo-600">
          Your Reminders
        </h3>
        {reminders.length === 0 ? (
          <p className="text-gray-600">No reminders yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {reminders.map((rem, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center py-3"
                aria-label={`Reminder at ${rem.time}: ${rem.message}`}
              >
                <span className="font-medium text-indigo-700">{rem.time}</span>
                <span className="flex-grow mx-4">{rem.message}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Reminders;
