"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { clearAuthData } from "@/lib/auth-utils";
import Link from "next/link";
import { Loader2, LogOut, ArrowRightCircle } from "lucide-react";
import Head from "next/head";
import Image from "next/image";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (session && user) {
      setIsLoggedIn(true);
    } else {
      await supabase.auth.signOut();
      router.push("/login");
      return;
    }

    setLoading(false);
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleClearAuth = async () => {
    await clearAuthData();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
        <span className="ml-2 text-gray-600">Checking session...</span>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>MindMate – Welcome</title>
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-100 py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-bold text-indigo-700 mb-6">
              Welcome to MindMate
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Track your mental health journey with ease and clarity. Visualize
              your moods, discover patterns, and take control of your
              well-being.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                <ArrowRightCircle size={20} />
                Go to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/img.jpg"
              alt="Mental Health Illustration"
              width={500}
              height={500}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section (Optional) */}
      <section className="py-20 bg-white px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-10">
          Why MindMate?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="p-6 rounded-xl shadow-md bg-gray-50">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">
              Mood Tracking
            </h3>
            <p className="text-gray-600">
              Easily log your daily moods and activities.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-md bg-gray-50">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">
              Visual Insights
            </h3>
            <p className="text-gray-600">
              See patterns and trends in your mental health.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-md bg-gray-50">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">
              Private & Secure
            </h3>
            <p className="text-gray-600">
              Your data is safe and only accessible to you.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
