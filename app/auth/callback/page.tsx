"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const dashboard = searchParams.get("dashboard");
    const user = searchParams.get("user");

    if (!accessToken || !refreshToken || !user) {
      router.push("/auth/login");
      return;
    }

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user", user);

    // Check if eco_traveler has completed onboarding
    const parsedUser = JSON.parse(user);
    if (parsedUser.role === "eco_traveler") {
      apiFetch<{ is_onboarded?: boolean } | null>("/eco-traveler/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((profile) => {
          if (!profile || !profile.is_onboarded) {
            router.push("/onboarding");
          } else {
            router.push(dashboard || "/dashboard");
          }
        })
        .catch(() => {
          // No profile yet → go to onboarding
          router.push("/onboarding");
        });
    } else {
      router.push(dashboard || "/dashboard");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-slate-500 font-medium">Connexion en cours…</p>
      </div>
    </div>
  );
}