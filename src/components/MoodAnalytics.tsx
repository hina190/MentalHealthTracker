"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface MoodEntry {
  date: string;
  mood: string;
  note: string;
}

const MOOD_SCORES: Record<string, number> = {
  happy: 5,
  excited: 5,
  calm: 4,
  neutral: 3,
  tired: 2,
  sad: 1,
  anxious: 1,
  angry: 1,
};

const COLORS = [
  "#6366F1", // Indigo-500
  "#10B981", // Emerald-500
  "#FBBF24", // Amber-400
  "#EF4444", // Red-500
  "#3B82F6", // Blue-500
  "#8B5CF6", // Violet-500
  "#F472B6", // Pink-400
  "#34D399", // Emerald-400
];

const MoodAnalytics: React.FC = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoodData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const email = session?.user?.email;
      if (!email) {
        console.error("No logged-in user.");
        setLoading(false);
        return;
      }

      setUserEmail(email);

      try {
        const res = await fetch(`/api/mood-journal?email=${email}`);
        const result = await res.json();
        setEntries(result.entries || []);
      } catch (err) {
        console.error("Error fetching moods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodData();
  }, []);

  const sortedEntries = [...entries].sort((a, b) => (a.date < b.date ? 1 : -1));

  const mostRecentEntry = sortedEntries[0];
  const uniqueDates = new Set(entries.map((e) => e.date));
  const totalDaysLogged = uniqueDates.size;

  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedMoods = Object.entries(moodCounts).sort((a, b) => b[1] - a[1]);
  const mostFrequentMood = sortedMoods[0];
  const rareMoods = sortedMoods.filter(([, count]) => count < 3);

  function getLongestMoodStreak(entries: MoodEntry[]) {
    if (entries.length === 0) return { mood: null, length: 0 };

    let longestMood = entries[0].mood;
    let longestLength = 1;

    let currentMood = entries[0].mood;
    let currentLength = 1;

    for (let i = 1; i < entries.length; i++) {
      if (entries[i].mood === currentMood) {
        currentLength++;
      } else {
        if (currentLength > longestLength) {
          longestLength = currentLength;
          longestMood = currentMood;
        }
        currentMood = entries[i].mood;
        currentLength = 1;
      }
    }
    if (currentLength > longestLength) {
      longestLength = currentLength;
      longestMood = currentMood;
    }
    return { mood: longestMood, length: longestLength };
  }
  const longestStreak = getLongestMoodStreak(sortedEntries);

  const pieData = sortedMoods.map(([mood, count]) => ({
    name: mood,
    value: count,
  }));

  const topMoods = sortedMoods.slice(0, 3).map(([mood]) => mood);

  const groupedByDate: Record<string, Record<string, number>> = {};
  entries.forEach(({ date, mood }) => {
    if (!groupedByDate[date]) groupedByDate[date] = {};
    groupedByDate[date][mood] = (groupedByDate[date][mood] || 0) + 1;
  });

  const datesSorted = Object.keys(groupedByDate).sort();

  const lineData = datesSorted.map((date) => {
    const moodsForDate = groupedByDate[date];
    const obj: Record<string, number | string> = { date };
    topMoods.forEach((mood) => {
      obj[mood] = moodsForDate[mood] || 0;
    });
    return obj;
  });

  const avgMoodScorePerDay = datesSorted.map((date) => {
    const moodsForDate = groupedByDate[date];
    let totalScore = 0;
    let totalCount = 0;
    for (const [mood, count] of Object.entries(moodsForDate)) {
      const score = MOOD_SCORES[mood.toLowerCase()] || 3;
      totalScore += score * count;
      totalCount += count;
    }
    return {
      date,
      avgScore: totalCount ? totalScore / totalCount : 0,
    };
  });

  function getMoodCountsInRange(daysAgoStart: number, daysAgoEnd: number) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgoStart);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - daysAgoEnd);

    const filtered = entries.filter(({ date }) => {
      const d = new Date(date);
      return d <= startDate && d > endDate;
    });

    return filtered.reduce((acc, e) => {
      acc[e.mood] = (acc[e.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  const lastWeekCounts = getMoodCountsInRange(0, 7);
  const prevWeekCounts = getMoodCountsInRange(7, 14);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 font-sans text-gray-900">
      <h2 className="text-3xl font-extrabold text-indigo-600 text-center mb-6">
        📊 Mood Analytics
      </h2>

      {loading ? (
        <p className="text-center text-lg text-gray-600">
          Loading mood data...
        </p>
      ) : entries.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No mood entries found for{" "}
          <span className="font-semibold">{userEmail}</span>.
        </p>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg shadow-md text-center">
              <p className="text-indigo-700 font-semibold">
                🕒 Most Recent Mood
              </p>
              <p className="mt-2 text-xl font-bold text-indigo-900">
                {mostRecentEntry?.mood || "-"}
              </p>
              <p className="text-sm text-gray-600">
                {mostRecentEntry?.date || "-"}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg shadow-md text-center">
              <p className="text-green-700 font-semibold">
                📅 Total Days Logged
              </p>
              <p className="mt-2 text-xl font-bold text-green-900">
                {totalDaysLogged}
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg shadow-md text-center">
              <p className="text-yellow-700 font-semibold">🔥 Longest Streak</p>
              <p className="mt-2 text-xl font-bold text-yellow-900">
                {longestStreak.length} days of {longestStreak.mood || "-"}
              </p>
            </div>
          </div>

          {/* Mood Counts List */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">
              Mood Counts
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {sortedMoods.map(([mood, count]) => (
                <li key={mood} className="capitalize">
                  {mood}: <span className="font-semibold">{count}</span>{" "}
                  {count === 1 ? "entry" : "entries"}
                </li>
              ))}
            </ul>

            {rareMoods.length > 0 && (
              <p className="mt-4 text-sm text-red-600 font-medium">
                ⚠️ Rare Moods: {rareMoods.map(([mood]) => mood).join(", ")}
              </p>
            )}
          </section>

          {/* Charts Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">
                Mood Distribution
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#6366F1"
                    label={(entry) =>
                      entry.name.charAt(0).toUpperCase() + entry.name.slice(1)
                    }
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">
                Mood Trends (Top 3 moods)
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart
                  data={lineData}
                  margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  {topMoods.map((mood, index) => (
                    <Line
                      key={mood}
                      type="monotone"
                      dataKey={mood}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">
                Average Mood Score Per Day
              </h3>
              <ul className="max-h-48 overflow-auto text-gray-700 space-y-1">
                {avgMoodScorePerDay.map(({ date, avgScore }) => (
                  <li
                    key={date}
                    className="flex justify-between border-b border-gray-200 py-1 px-2"
                  >
                    <span>{date}</span>
                    <span className="font-semibold">{avgScore.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Weekly Comparison */}
          <section className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">
              📅 Weekly Mood Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-gray-700">
                <thead>
                  <tr>
                    <th className="border-b border-gray-300 px-4 py-2">Mood</th>
                    <th className="border-b border-gray-300 px-4 py-2">
                      Last 7 Days
                    </th>
                    <th className="border-b border-gray-300 px-4 py-2">
                      Previous 7 Days
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys({ ...lastWeekCounts, ...prevWeekCounts }).map(
                    (mood) => {
                      const lastWeek = lastWeekCounts[mood] || 0;
                      const prevWeek = prevWeekCounts[mood] || 0;
                      const diff = lastWeek - prevWeek;
                      const diffText =
                        diff === 0
                          ? "No change"
                          : diff > 0
                          ? `+${diff}`
                          : `${diff}`;
                      const diffColor =
                        diff > 0
                          ? "text-green-600"
                          : diff < 0
                          ? "text-red-600"
                          : "text-gray-600";

                      return (
                        <tr key={mood} className="capitalize">
                          <td className="border-b border-gray-200 px-4 py-2">
                            {mood}
                          </td>
                          <td className="border-b border-gray-200 px-4 py-2 font-semibold">
                            {lastWeek}
                          </td>
                          <td className="border-b border-gray-200 px-4 py-2">
                            {prevWeek}
                          </td>
                          <td
                            className={`border-b border-gray-200 px-4 py-2 ${diffColor}`}
                          >
                            {diffText}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default MoodAnalytics;
