"use client";

import { useState } from "react";
import Link from "next/link";

interface FirstRunOnboardingProps {
  email: string;
  isPro: boolean;
}

export default function FirstRunOnboarding({
  email,
  isPro,
}: FirstRunOnboardingProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent, isDemo: boolean = false) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const urlToAdd = isDemo ? "https://example.com" : url;

    if (!urlToAdd) {
      setError("Please enter a URL");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/monitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: urlToAdd,
          email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to add monitor");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setSubmitted(true);
      setDemoMode(isDemo);
      setUrl("");

      // Refresh the dashboard after a short delay to show the newly created monitor
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-lg border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500">
              <span className="text-white text-sm font-bold">✓</span>
            </span>
            <span className="text-lg font-bold text-black dark:text-white">
              Your site is now monitored!
            </span>
          </div>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            We'll check{" "}
            <span className="font-semibold">
              {demoMode ? "example.com" : url || "your site"}
            </span>{" "}
            regularly and alert you if it goes down.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="rounded-lg bg-white dark:bg-zinc-900 p-4 text-left">
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              Your current plan:
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-black dark:text-white">
                {isPro ? "Pro" : "Free"} — Checking every{" "}
                {isPro ? "5 minutes" : "15 minutes"}
              </span>
              {!isPro && (
                <Link
                  href="/pricing"
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Unlock Pro
                </Link>
              )}
            </div>
          </div>

          {!isPro && (
            <div className="rounded-lg border border-emerald-200 bg-white dark:border-emerald-900 dark:bg-zinc-900 p-3">
              <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Unlock Pro:
              </div>
              <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
                <li>✓ 5-minute checks (vs 15-min)</li>
                <li>✓ Unlimited monitors (vs 10)</li>
                <li>✓ SMS alerts</li>
              </ul>
            </div>
          )}
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Reloading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 rounded-lg border border-emerald-200 bg-emerald-50 p-8 dark:border-emerald-900 dark:bg-emerald-950">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-xl font-bold text-black dark:text-white">
          Add your first URL
        </h2>
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          See your site's uptime and get alerted if it goes down.
        </p>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)} className="w-full">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              placeholder="https://yoursite.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              className="flex-1 rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm text-black placeholder-zinc-400 transition-colors hover:border-emerald-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 dark:border-emerald-800 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500 dark:hover:border-emerald-700 dark:focus:border-emerald-600 dark:focus:ring-emerald-600"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-60 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              {loading ? "Adding..." : "Monitor"}
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
          )}

          <div className="relative flex items-center gap-3">
            <div className="flex-1 border-t border-emerald-300 dark:border-emerald-800" />
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              OR
            </span>
            <div className="flex-1 border-t border-emerald-300 dark:border-emerald-800" />
          </div>

          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
            className="rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-60 dark:border-emerald-800 dark:bg-zinc-900 dark:text-emerald-300 dark:hover:bg-emerald-950"
          >
            Try with example.com →
          </button>
        </div>
      </form>

      <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
        Free tier: 10 monitors, 15-minute checks
        {!isPro && (
          <>
            {" "}
            •{" "}
            <Link
              href="/pricing"
              className="font-medium text-emerald-700 hover:underline dark:text-emerald-300"
            >
              Unlock unlimited monitoring
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
