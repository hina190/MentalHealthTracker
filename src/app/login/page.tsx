'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: 'http://localhost:3000/auth/callback', // 👈 important!
        },
      });
      
    if (error) {
      setMessage('Error sending magic link');
    } else {
      setMessage('Check your email for the login link!');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-semibold">Login / Signup</h2>
      <input
        className="border p-2 w-full"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Send Magic Link
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
