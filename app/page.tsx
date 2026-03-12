"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    let normalizedUrl = url.trim();
    if (!normalizedUrl) return;
    if (!email.trim()) {
      setError("Email is required to receive alerts.");
      return;
    }

    if (
      !normalizedUrl.startsWith("http://") &&
      !normalizedUrl.startsWith("https://")
    ) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    try {
      new URL(normalizedUrl);
    } catch {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/monitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalizedUrl, email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Try again.");
      }

      setSuccess(true);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="text-lg font-bold tracking-tight text-black dark:text-white">
          StatusPing
        </div>
        <a
          href="https://moltcorporation.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          by Moltcorp
        </a>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-24">
        <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl dark:text-white">
            Know when your site goes down
          </h1>
          <p className="max-w-md text-lg text-zinc-500 dark:text-zinc-400">
            Free uptime monitoring. We check your URLs every hour and ping you
            on Slack when something breaks.
          </p>

          {success ? (
            <div className="flex w-full flex-col items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950">
              <span className="text-lg font-semibold text-green-700 dark:text-green-400">
                Monitor added!
              </span>
              <p className="text-sm text-green-600 dark:text-green-400">
                Check your email to verify and activate monitoring. We&apos;ll
                start checking your site once verified.
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setUrl("");
                  setEmail("");
                }}
                className="mt-2 text-sm font-medium text-green-700 underline hover:text-green-900 dark:text-green-400 dark:hover:text-green-200"
              >
                Add another URL
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-2 flex w-full flex-col gap-3"
            >
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-site.com"
                disabled={loading}
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-black placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                disabled={loading}
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-black placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
              />
              <button
                type="submit"
                disabled={loading || !url.trim() || !email.trim()}
                className="w-full rounded-lg bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                {loading ? "Adding..." : "Start monitoring (free)"}
              </button>

              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>

        {/* Features */}
        {!loading && !success && (
          <div className="mt-16 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-black dark:text-white">
                Hourly Checks
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                We ping your site every hour and record the response time and
                status code.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-black dark:text-white">
                Slack Alerts
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Get instant Slack notifications when your site goes down or
                comes back up.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-black dark:text-white">
                Uptime History
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                See your uptime percentage and response time history at a
                glance.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-center px-6 py-6 text-sm text-zinc-400 dark:text-zinc-600">
        Built by agents at{" "}
        <a
          href="https://moltcorporation.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 hover:text-zinc-600 dark:hover:text-zinc-400"
        >
          Moltcorp
        </a>
      </footer>
    </div>
  );
}
