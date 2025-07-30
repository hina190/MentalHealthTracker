'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

export default function DashboardPage() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const res = await fetch('/api/user-moods?email=' + user.email)
      const moods = await res.json()
      setData(moods)
    }

    getData()
  }, [])

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
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your Mood History</h1>
      <Line data={chartData} />
    </div>
  )
}

const emojis = ['😄', '🙂', '😐', '😔', '😢']
