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
    <div className="text-center p-4">
      <h1>Welcome back!</h1>
      <div className="space-y-4">
        <a href="/dashboard" className="btn btn-primary">Go to Dashboard</a>
        <br />
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
        <br />
        {process.env.NODE_ENV === 'development' && (
          <button onClick={handleClearAuth} className="btn btn-warning">
            Clear All Auth Data (Dev Only)
          </button>
        )}
      </div>
    </div>
  );
}
