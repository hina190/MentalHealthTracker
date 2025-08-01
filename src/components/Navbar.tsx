'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import LoginModal from './LoginModal'
import Link from 'next/link'

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false)
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <>
      <nav className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                MindMate
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
              <Link href="/support" className="text-gray-600 hover:text-gray-900 transition-colors">
                Support
              </Link>
              {user && (
                <>
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/chatbot" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Chatbot
                  </Link>
                  <Link href="/mood-journal" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Mood Journal
                  </Link>
                  <Link href="/mood-analytics" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Mood Analytics
                  </Link>
                  <Link href="/reminders" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Reminders
                  </Link>
                  <Link href="/resources" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Resources
                  </Link>
                </>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Login
                  </button>
                  <Link
                    href="/signup"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            setShowLogin(false)
          }}
        />
      )}
    </>
  )
} 