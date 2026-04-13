"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail } from "@/lib/auth";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [message, setMessage] = useState("Vérification en cours...");
  const [error, setError] = useState("");

  useEffect(() => {
    async function run() {
      if (!token) {
        setError("Token manquant.");
        return;
      }

      try {
        const result = await verifyEmail(token);
        setMessage(result.message);

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (err: any) {
        setError(err.message || "Échec de la vérification.");
      }
    }

    run();
  }, [token, router]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8 border border-slate-200">
        <h1 className="text-2xl font-extrabold mb-4">Vérification email</h1>
        {error ? (
          <p className="text-red-600 font-semibold">{error}</p>
        ) : (
          <p className="text-green-700 font-semibold">{message}</p>
        )}
      </div>
    </main>
  );
}