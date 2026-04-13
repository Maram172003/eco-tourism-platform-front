"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("access_token");

    if (!storedUser || !token) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  async function handleLogout() {
    const token = localStorage.getItem("access_token");

    try {
      if (token) {
        await logoutUser(token);
      }
    } catch {}

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    router.push("/login");
  }

  return (
    <main className="min-h-screen p-10 bg-background">
      <h1 className="text-3xl font-extrabold mb-6">Dashboard</h1>

      {user && (
        <div className="space-y-2 mb-6">
          <p><strong>Nom :</strong> {user.full_name || "-"}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Rôle :</strong> {user.role}</p>
          <p><strong>Statut :</strong> {user.status}</p>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="px-5 py-3 rounded-xl bg-primary text-black font-bold"
      >
        Se déconnecter
      </button>
    </main>
  );
}