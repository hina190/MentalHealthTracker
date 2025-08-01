"use client";
import React, { useEffect, useState } from "react";

interface MoodEntry {
  id: string;
  email: string;
  date: string;
  mood: string;
  note: string;
}

const userEmail = "hina27fatima@gmail.com";

const moodOptions = ["happy", "anxious", "tired", "stressed", "sad"];

export default function MoodJournal() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [dateFilter, setDateFilter] = useState("");
  const [sortNewestFirst, setSortNewestFirst] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMoods();
  }, []);

  async function fetchMoods() {
    setLoading(true);
    try {
      const res = await fetch(`/api/mood-journal?email=${userEmail}`);
      const data = await res.json();
      setEntries(data.entries || []);
    } catch {
      // handle error silently
    } finally {
      setLoading(false);
    }
  }

  async function addMood() {
    if (!mood.trim()) return;
    setLoading(true);
    const newEntry = {
      id: Date.now().toString(),
      email: userEmail,
      date: new Date().toISOString().split("T")[0],
      mood,
      note,
    };

    try {
      const res = await fetch("/api/mood-journal", {
        method: "POST",
        body: JSON.stringify(newEntry),
      });
      const data = await res.json();
      setEntries(data.entries || []);
      setMood("");
      setNote("");
    } catch {
      // handle error silently
    } finally {
      setLoading(false);
    }
  }

  async function deleteMood(id: string) {
    setLoading(true);
    await fetch("/api/mood-journal", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchMoods();
  }

  async function clearAllMoods() {
    setLoading(true);
    await fetch("/api/mood-journal", {
      method: "DELETE",
      body: JSON.stringify({ clearAll: true, email: userEmail }),
    });
    setEntries([]);
    setLoading(false);
  }

  const filteredEntries = dateFilter
    ? entries.filter((e) => e.date === dateFilter)
    : entries;

  const sortedEntries = filteredEntries.sort((a, b) =>
    sortNewestFirst ? (a.date < b.date ? 1 : -1) : a.date < b.date ? -1 : 1
  );

  const moodCount = filteredEntries.reduce(
    (acc: Record<string, number>, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    },
    {}
  );
  const sortedMoods = Object.entries(moodCount).sort((a, b) => b[1] - a[1]);
  const mostFrequentMood = sortedMoods[0];

  // Count today's moods
  const today = new Date().toISOString().split("T")[0];
  const todayMoodsCount = entries.reduce((acc, e) => {
    if (e.date === today) acc[e.mood] = (acc[e.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white max-w-3xl mx-auto p-8 rounded-3xl shadow-lg font-sans">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center tracking-wide">
        🌈 Mood Journal
      </h2>

      <div className="space-y-5 mb-8">
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full p-4 border border-indigo-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 text-lg"
          required
        >
          <option value="" disabled>
            Select your mood
          </option>
          {moodOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note (optional)"
          rows={4}
          className="w-full p-4 border border-indigo-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 text-lg resize-none"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={addMood}
            disabled={!mood || loading}
            className={`flex-1 py-4 rounded-lg font-semibold text-white transition ${
              mood && !loading
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-300 cursor-not-allowed"
            }`}
          >
            {loading ? "Saving..." : "Add Mood"}
          </button>
          <button
            onClick={clearAllMoods}
            disabled={loading || entries.length === 0}
            className={`py-4 px-6 rounded-lg font-semibold text-white transition ${
              entries.length && !loading
                ? "bg-red-500 hover:bg-red-600"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div>
          <label className="font-medium text-indigo-700 mr-3">
            Filter by Date:
          </label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
          />
          {dateFilter && (
            <button
              onClick={() => setDateFilter("")}
              className="ml-3 text-sm text-red-600 hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-indigo-700 font-semibold">
          Sort:
          <button
            onClick={() => setSortNewestFirst(true)}
            className={`px-3 py-1 rounded ${
              sortNewestFirst
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-100"
            }`}
          >
            Newest First
          </button>
          <button
            onClick={() => setSortNewestFirst(false)}
            className={`px-3 py-1 rounded ${
              !sortNewestFirst
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-100"
            }`}
          >
            Oldest First
          </button>
        </div>
      </div>

      <p className="text-indigo-600 font-semibold mb-4 text-center text-lg">
        Total Entries: {entries.length} | Today&#39;s moods:{" "}
        {Object.entries(todayMoodsCount).length === 0
          ? "No moods logged today"
          : Object.entries(todayMoodsCount)
              .map(([m, c]) => `${m} (${c})`)
              .join(", ")}
      </p>

      {sortedEntries.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No entries found.</p>
      ) : (
        <ul className="space-y-5">
          {sortedEntries.map((entry) => (
            <li
              key={entry.id}
              className="border border-indigo-100 bg-indigo-50 p-5 rounded-2xl shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700 font-mono">
                  {entry.date}
                </span>
                <button
                  onClick={() => deleteMood(entry.id)}
                  title="Delete entry"
                  disabled={loading}
                  className="text-red-600 hover:underline text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-800 capitalize">
                  {entry.mood}
                </p>
                {entry.note && (
                  <p className="mt-1 text-gray-700 whitespace-pre-wrap">
                    {entry.note}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
