'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import PersonalizedTips from '../../components/PersonalizedTips';
import CrisisSupport from '../../components/CrisisSupport';
import Link from 'next/link';
import Image from 'next/image';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

interface MoodEntry {
    mood: string
    date: string
    emoji: string
    note?: string
  }
  
const emojis = ['😢', '😕', '😐', '🙂', '😊']
  
export default function DashboardPage() {
  const [data, setData] = useState<MoodEntry[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const getData = async () => {
      if (!user) return
      
      try {
        console.log('🔍 Dashboard: Starting data fetch...')
        console.log('🔍 Dashboard: User data:', user)

        console.log('🔍 Dashboard: Fetching moods for email:', user.email)
        const res = await fetch('/api/user-moods?email=' + user.email)
        
        if (!res.ok) {
          console.error('❌ Dashboard: API error:', res.status, res.statusText)
          throw new Error(`API error: ${res.status}`)
        }
        
        const moods = await res.json()
        console.log('✅ Dashboard: Moods fetched:', moods)
        setData(moods)
        setLoading(false)
      } catch (error) {
        console.error('❌ Dashboard: Error fetching data:', error)
        setLoading(false)
        // Don't redirect on API errors, just show empty state
      }
    }

    getData()
  }, [user])

  const chartData = {
    labels: data.map((m) => new Date(m.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood over time',
        data: data.map((m) => emojis.indexOf(m.emoji) + 1),
        borderColor: '#4f46e5',
      },
    ],
  }

  return (
    <ProtectedRoute>
      <div className="p-6 space-y-6 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-indigo-700 flex items-center gap-2">
            <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Your Mood Dashboard
          </h1>
          <div className="space-x-2">
            <Link href="/log-mood" className="bg-gradient-to-r from-indigo-500 to-teal-400 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition-transform font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Log Mood
            </Link>
          </div>
        </div>

        {/* Mood Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-indigo-50">
          <h2 className="text-xl font-bold text-indigo-600 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" /></svg>
            Mood Over Time
          </h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your mood data...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-8 flex flex-col items-center">
              <Image src="/globe.svg" alt="No data" width={64} height={64} className="mb-4 opacity-70" />
              <p className="text-gray-500 mb-4 text-lg">No mood data found yet.</p>
              <Link href="/log-mood" className="bg-gradient-to-r from-indigo-500 to-teal-400 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition-transform font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Log Your First Mood
              </Link>
            </div>
          ) : (
            <Line data={chartData} />
          )}
        </div>

        {/* Recent Mood Entries */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-indigo-50">
          <h2 className="text-xl font-bold text-indigo-600 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            Recent Mood Entries
          </h2>
          {data.length === 0 ? (
            <p className="text-gray-500">No recent entries.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {data.slice(0, 5).map((entry, idx) => (
                <li key={idx} className="py-2 flex items-center justify-between">
                  <span>{entry.date} - <span className="text-xl">{entry.emoji}</span> {entry.mood}</span>
                  {entry.note && <span className="text-gray-500 text-sm">{entry.note}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Personalized Tip */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <PersonalizedTips />
        </div>

        {/* Crisis Support */}
        <CrisisSupport />

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-4 justify-center">
          <Link href="/chatbot" className="btn btn-outline">AI Chatbot</Link>
          <Link href="/mood-journal" className="btn btn-outline">Mood Journal</Link>
          <Link href="/mood-analytics" className="btn btn-outline">Mood Analytics</Link>
          <Link href="/reminders" className="btn btn-outline">Reminders</Link>
          <Link href="/resources" className="btn btn-outline">Resources</Link>
        </div>
      </div>
    </ProtectedRoute>
  )
}
