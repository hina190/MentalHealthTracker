'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

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
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Mood History</h1>
          <div className="space-x-2">
            <a href="/" className="btn btn-sm btn-outline">Home</a>
            <a href="/log-mood" className="btn btn-sm btn-primary">Log Mood</a>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your mood data...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No mood data found yet.</p>
            <a href="/log-mood" className="btn btn-primary">
              Log Your First Mood
            </a>
          </div>
        ) : (
          <Line data={chartData} />
        )}
        
        <div className="mt-4">
          <a href="/log-mood" className="btn btn-secondary">
            Log New Mood
          </a>
        </div>
      </div>
    </ProtectedRoute>
  )
}
