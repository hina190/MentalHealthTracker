"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { useAuth } from "@/lib/auth-context";
import ProtectedRoute from "@/components/ProtectedRoute";

const emojis = ["😢", "😕", "😐", "🙂", "😊"];

export default function LogMoodPage() {
  const [selected, setSelected] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useAuth();
  const user = auth?.user;
  const router = useRouter(); // ✅ Initialize router

  const handleSubmit = async () => {
    if (!user || !selected) return;

    setLoading(true);

    try {
      const res = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          emoji: selected,
          note,
        }),
      });

      if (res.ok) {
        // ✅ Redirect to dashboard after success
        router.push("/dashboard");
      } else {
        alert("Failed to log mood. Please try again.");
      }
    } catch (error) {
      console.error("Error logging mood:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Log Your Mood</h1>

        <div className="flex gap-2 justify-center">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setSelected(emoji)}
              className={`text-4xl p-3 rounded-lg transition-all ${
                selected === emoji
                  ? "bg-indigo-100 border-2 border-indigo-500 scale-110"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling? (optional)
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Write a note about your mood..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selected || loading}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? "Logging..." : "Log Mood"}
        </button>
      </div>
    </ProtectedRoute>
  );
}
