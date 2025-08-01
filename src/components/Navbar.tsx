"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import LoginModal from "./LoginModal";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const auth = useAuth();
  const user = auth?.user;
  const handleLogout = async () => {
    if (auth?.signOut) {
      await auth.signOut();
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Menu + Logo */}
            <div className="flex items-center gap-4">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-indigo-600 hover:bg-indigo-400"
                  >
                    <Menu className="h-8 w-8 text-white " />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[260px] bg-white shadow-md border-r px-4 py-6"
                >
                  <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    Menu
                  </h2>
                  <nav className="flex flex-col space-y-3">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                    >
                      <span className="text-sm">📊</span>
                      Dashboard
                    </Link>
                    <Link
                      href="/log-mood"
                      className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                    >
                      <span className="text-sm">📝</span>
                      Log Mood
                    </Link>
                    <Link
                      href="/mood-journal"
                      className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                    >
                      <span className="text-sm">📔</span>
                      Mood Journal
                    </Link>
                    <Link
                      href="/mood-analytics"
                      className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                    >
                      <span className="text-sm">📈</span>
                      Mood Analytics
                    </Link>
                    <Link
                      href="/reminders"
                      className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                    >
                      <span className="text-sm">⏰</span>
                      Reminders
                    </Link>
                    <Link
                      href="/resources"
                      className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                    >
                      <span className="text-sm">📚</span>
                      Resources
                    </Link>
                    <Link
                      href="/chatbot"
                      className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                    >
                      <span className="text-sm">💬</span>
                      Chatbot
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>

              <Link href="/" className="text-xl font-bold text-indigo-600">
                MindMate
              </Link>
            </div>

            {/* Navbar Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/support"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Support
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-600 hidden md:inline">
                    Welcome, {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
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
                </>
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
            setShowLogin(false);
          }}
        />
      )}

      {/* Floating Chatbot Button */}
      {user && (
        <Link
          href="/chatbot"
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-5 shadow-lg animate-bounceY z-50"
        >
          💬
        </Link>
      )}

      {/* Chatbot Button Animation Style */}
      <style jsx>{`
        @keyframes bounceY {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-bounceY {
          animation: bounceY 1s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
