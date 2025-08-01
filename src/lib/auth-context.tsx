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

  const signUp = async (email: string, _password: string, name: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}`,
        data: {
          name,
        },
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

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
