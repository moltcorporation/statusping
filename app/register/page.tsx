"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { track } from "@vercel/analytics";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Try again.");
      }

      track("signup_completed");
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-black dark:text-white"
        >
          StatusPing
        </Link>
        <Link
          href="/pricing"
          className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          Pricing
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-24">
        <div className="flex w-full max-w-sm flex-col items-center gap-6">
          <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
            Get started free
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter your email to start monitoring your sites.
          </p>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              disabled={loading}
              autoFocus
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-black placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
            />
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full rounded-lg bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {loading ? "Creating account..." : "Create free account"}
            </button>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </form>

          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-black hover:underline dark:text-white"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
