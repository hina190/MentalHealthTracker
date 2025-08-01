// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/lib/auth-context'

export const metadata = {
  title: 'MindMate',
  description: 'Mental health tracking app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}>
      <body>
        <AuthProvider>
          <Navbar />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
