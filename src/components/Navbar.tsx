"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import LoginModal from "./LoginModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      {/* Top Navbar */}
      <header className="fixed top-0 w-full z-40 bg-background border-b shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className="text-lg font-semibold text-primary hover:opacity-80 transition"
          >
            MindMate
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Contact
            </Link>
            <Link
              href="/support"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Support
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden md:block">
                  {user.email}
                </span>
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setShowLogin(true)}>
                  Login
                </Button>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar (only visible when user is logged in) */}
      {user && (
        <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 border-r bg-muted/40 p-6 hidden md:flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="hover:bg-muted rounded-md px-4 py-2 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/chatbot"
            className="hover:bg-muted rounded-md px-4 py-2 transition"
          >
            Chatbot
          </Link>
          <Link
            href="/mood-journal"
            className="hover:bg-muted rounded-md px-4 py-2 transition"
          >
            Mood Journal
          </Link>
          <Link
            href="/mood-analytics"
            className="hover:bg-muted rounded-md px-4 py-2 transition"
          >
            Mood Analytics
          </Link>
          <Link
            href="/reminders"
            className="hover:bg-muted rounded-md px-4 py-2 transition"
          >
            Reminders
          </Link>
          <Link
            href="/resources"
            className="hover:bg-muted rounded-md px-4 py-2 transition"
          >
            Resources
          </Link>
        </aside>
      )}

      {/* Floating Chatbot Button */}
      {user && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 rounded-full bg-primary text-white hover:bg-primary/90 shadow-lg"
          onClick={() => router.push("/chatbot")}
        >
          💬
        </Button>
      )}

      {/* Login Modal */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() => setShowLogin(false)}
        />
      )}
    </>
  );
}
