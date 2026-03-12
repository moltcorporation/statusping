"use client";

import { useState } from "react";
import Link from "next/link";

interface Check {
  statusCode: number;
  responseMs: number | null;
  checkedAt: string;
}

interface Monitor {
  id: string;
  url: string;
  name: string | null;
  lastStatus: number | null;
  lastCheckedAt: string | null;
  slackWebhookUrl: string | null;
  createdAt: string;
  uptimePercent: number | null;
  avgResponseMs: number | null;
  recentChecks: Check[];
}

function StatusDot({ status }: { status: number | null }) {
  if (status === null)
    return (
      <span className="inline-block h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
    );
  if (status >= 200 && status < 400)
    return (
      <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
    );
  return <span className="inline-block h-3 w-3 rounded-full bg-red-500" />;
}

function UptimeBar({ checks }: { checks: Check[] }) {
  // Show last 24 checks as small colored bars
  const bars = checks.slice().reverse();
  if (bars.length === 0)
    return (
      <span className="text-xs text-zinc-400 dark:text-zinc-500">
        No checks yet
      </span>
    );

  return (
    <div className="flex gap-0.5">
      {bars.map((check, i) => {
        const isUp = check.statusCode >= 200 && check.statusCode < 400;
        return (
          <div
            key={i}
            className={`h-6 w-1.5 rounded-sm ${isUp ? "bg-green-500" : "bg-red-500"}`}
            title={`${new Date(check.checkedAt).toLocaleString()} — HTTP ${check.statusCode}${check.responseMs ? ` (${check.responseMs}ms)` : ""}`}
          />
        );
      })}
    </div>
  );
}

function MonitorCard({ monitor }: { monitor: Monitor }) {
  const domain = (() => {
    try {
      return new URL(monitor.url).hostname;
    } catch {
      return monitor.url;
    }
  })();

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusDot status={monitor.lastStatus} />
          <span className="font-medium text-black dark:text-white">
            {monitor.name || domain}
          </span>
        </div>
        {monitor.uptimePercent !== null && (
          <span
            className={`text-sm font-medium ${
              monitor.uptimePercent >= 99
                ? "text-green-600 dark:text-green-400"
                : monitor.uptimePercent >= 95
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-red-600 dark:text-red-400"
            }`}
          >
            {monitor.uptimePercent}% uptime
          </span>
        )}
      </div>

      <a
        href={monitor.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        {monitor.url}
      </a>

      <UptimeBar checks={monitor.recentChecks} />

      <div className="flex gap-4 text-xs text-zinc-400 dark:text-zinc-500">
        {monitor.avgResponseMs !== null && (
          <span>Avg: {monitor.avgResponseMs}ms</span>
        )}
        {monitor.lastCheckedAt && (
          <span>
            Last check: {new Date(monitor.lastCheckedAt).toLocaleString()}
          </span>
        )}
        {monitor.slackWebhookUrl && <span>Slack alerts on</span>}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [monitors, setMonitors] = useState<Monitor[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/dashboard?email=${encodeURIComponent(email.trim())}`
      );
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong");
      }
      const data = await res.json();
      setMonitors(data.monitors);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
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
          href="/"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Add monitor
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Your Monitors
        </h1>

        {monitors === null ? (
          <form onSubmit={handleLookup} className="flex flex-col gap-3">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Enter the email you used to create your monitors.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                disabled={loading}
                className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-black placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
              />
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="rounded-lg bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                {loading ? "Loading..." : "View"}
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </form>
        ) : monitors.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-500 dark:text-zinc-400">
              No monitors found for this email.
            </p>
            <Link
              href="/"
              className="text-sm font-medium text-black underline dark:text-white"
            >
              Add your first monitor
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {monitors.length} monitor{monitors.length !== 1 ? "s" : ""} for{" "}
              {email}
            </p>
            {monitors.map((monitor) => (
              <MonitorCard key={monitor.id} monitor={monitor} />
            ))}
          </div>
        )}
      </main>

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
