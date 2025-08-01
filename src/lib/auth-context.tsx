<<<<<<< HEAD
// context/auth-context.tsx
"use client";

import { supabase } from "@/lib/supabase";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Session = Awaited<
  ReturnType<typeof supabase.auth.getSession>
>["data"]["session"];
type User = Session extends null ? null : NonNullable<Session>["user"] | null;

type AuthContextType = {
  user: User;
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);
=======
'use client'

import React, { createContext, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  user_metadata: {
    name: string
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('mindmate_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('mindmate_user')
      }
    }
    setLoading(false)
  }, [])
>>>>>>> bc09d7bc872f01c507bf0a9ae26e352fca0f5ced

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
<<<<<<< HEAD
      },
    });
    console.log("Sending OTP to:", email);

    return { error };
  };

  const signIn = async (email: string, _password: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/auth");
  };
=======
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: { message: data.error } }
      }

      return { error: null }
    } catch (error) {
      console.error('Signup error:', error)
      return { error: { message: 'An unexpected error occurred' } }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: { message: data.error } }
      }

      // Create a user object for frontend state management
      const userObject = {
        id: data.user.id,
        email: data.user.email,
        user_metadata: { name: data.user.name }
      }

      // Save to localStorage for persistence
      localStorage.setItem('mindmate_user', JSON.stringify(userObject))
      setUser(userObject as any)

      return { error: null }
    } catch (error) {
      console.error('Login error:', error)
      return { error: { message: 'An unexpected error occurred' } }
    }
  }

  const signOut = async () => {
    try {
      // Clear the user state and localStorage
      localStorage.removeItem('mindmate_user')
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Signout error:', error)
    }
  }
>>>>>>> bc09d7bc872f01c507bf0a9ae26e352fca0f5ced

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

<<<<<<< HEAD
export const useAuth = () => useContext(AuthContext);
=======
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
>>>>>>> bc09d7bc872f01c507bf0a9ae26e352fca0f5ced
