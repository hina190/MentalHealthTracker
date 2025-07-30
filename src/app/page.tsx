'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { clearAuthData } from '@/lib/auth-utils';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Get both session and user to ensure proper authentication
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      console.log("🔐 Session:", session);
      console.log("🔐 User data:", user);
      console.log("❌ Session Error:", sessionError);
      console.log("❌ User Error:", userError);

      // Check if both session and user exist
      if (session && user) {
        setIsLoggedIn(true);
      } else {
        // Clear any stale session data and redirect to login
        await supabase.auth.signOut();
        router.push('/login');
        return;
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleClearAuth = async () => {
    await clearAuthData();
    router.push('/login');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to MindMate</h1>
        <p className="text-xl text-gray-600 mb-8">
          Track your mental health journey with our intuitive mood tracking app
        </p>
        
        <div className="space-y-4">
          <a href="/dashboard" className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">
            Go to Dashboard
          </a>
          <br />
          <button onClick={handleLogout} className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors">
            Logout
          </button>
          <br />
          {process.env.NODE_ENV === 'development' && (
            <button onClick={handleClearAuth} className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-colors">
              Clear All Auth Data (Dev Only)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
