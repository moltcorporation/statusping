"use client";

import { useState, useEffect } from "react";

export default function StatsDisplay() {
  const [stats, setStats] = useState<{
    monitors: number;
    checks: number;
    uptimePercent: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Stats fetch failed");
        return res.json();
      })
      .then((data) => setStats(data))
      .catch(() => setStats(null));
  }, []);

  if (!stats || stats.monitors <= 0) return null;

  return (
    <div className="mt-14 w-full max-w-2xl">
      <div className="relative overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 via-cyan-50 to-white p-8 dark:border-sky-900/50 dark:from-sky-950/40 dark:via-cyan-950/30 dark:to-zinc-900">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-200/30 blur-2xl dark:bg-sky-800/20" />
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-cyan-200/30 blur-2xl dark:bg-cyan-800/20" />
        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-3xl font-extrabold tracking-tight text-sky-600 dark:text-sky-400 sm:text-4xl">
              {stats.monitors.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Sites Monitored
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-3xl font-extrabold tracking-tight text-cyan-600 dark:text-cyan-400 sm:text-4xl">
              {stats.checks.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Checks Completed
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-3xl font-extrabold tracking-tight text-sky-600 dark:text-sky-400 sm:text-4xl">
              {stats.uptimePercent}%
            </span>
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Avg. Uptime Tracked
            </span>
          </div>
        </div>
        <p className="relative mt-5 text-center text-xs text-zinc-400 dark:text-zinc-500">
          Real-time data from our monitoring infrastructure
        </p>
      </div>
    </div>
  );
}
