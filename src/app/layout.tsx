"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // ✅ fixed import path

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const params = new URLSearchParams(hash.substring(1));
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (access_token && refresh_token) {
        // Set Supabase session
        supabase.auth.setSession({ access_token, refresh_token });

        // Remove tokens from the URL
        router.replace("/");
      }
    }
  }, []);

  return <>{children}</>;
}
