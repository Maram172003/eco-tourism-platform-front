"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userParam = searchParams.get("user");

    if (!accessToken || !userParam) {
      router.replace("/login");
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userParam));

      localStorage.setItem("access_token", accessToken);

      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }

      localStorage.setItem("user", JSON.stringify(user));

      router.replace("/dashboard");
    } catch {
      router.replace("/login");
    }
  }, [router, searchParams]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8 border border-slate-200 text-center">
        <h1 className="text-2xl font-extrabold mb-4 text-slate-900">
          Connexion en cours...
        </h1>
        <p className="text-slate-600 font-medium">
          Veuillez patienter un instant.
        </p>
      </div>
    </main>
  );
}