"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

    router.push(dashboard || "/dashboard");
  }, [router, searchParams]);

  return <p>Connexion en cours...</p>;
}