export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { db } from "@/db";
import { monitors, checks } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [monitor] = await db
    .select()
    .from(monitors)
    .where(and(eq(monitors.id, id), eq(monitors.emailVerified, true)))
    .limit(1);

  if (!monitor) return { title: "Status Page — StatusPing" };

  const host = new URL(monitor.url).hostname;
  return {
    title: `${host} Status — StatusPing`,
    description: `Live uptime status for ${host}. Monitored by StatusPing.`,
  };
}

function UptimeDots({
  recentChecks,
}: {
  recentChecks: { statusCode: number; checkedAt: Date | null }[];
}) {
  const reversed = [...recentChecks].reverse();
  return (
    <div className="flex gap-1 flex-wrap">
      {reversed.map((check, i) => {
        const isUp =
          check.statusCode >= 200 && check.statusCode < 300;
        return (
          <div
            key={i}
            title={`${check.statusCode} at ${check.checkedAt ? new Date(check.checkedAt).toLocaleString() : "unknown"}`}
            className={`h-8 w-2 rounded-full ${
              isUp
                ? "bg-sky-500 dark:bg-green-400"
                : "bg-red-500 dark:bg-red-400"
            }`}
          />
        );
      })}
      {reversed.length === 0 && (
        <p className="text-sm text-zinc-400">No checks recorded yet.</p>
      )}
    </div>
  );
}

export default async function PublicStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [monitor] = await db
    .select()
    .from(monitors)
    .where(and(eq(monitors.id, id), eq(monitors.emailVerified, true)))
    .limit(1);

  if (!monitor) {
    notFound();
  }

  const host = new URL(monitor.url).hostname;

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const recentChecks = await db
    .select({
      statusCode: checks.statusCode,
      responseMs: checks.responseMs,
      checkedAt: checks.checkedAt,
    })
    .from(checks)
    .where(
      and(
        eq(checks.monitorId, id),
        sql`${checks.checkedAt} >= ${twentyFourHoursAgo}`
      )
    )
    .orderBy(desc(checks.checkedAt))
    .limit(50);

  const [stats] = await db
    .select({
      total: sql<number>`count(*)::int`,
      up: sql<number>`count(*) filter (where ${checks.statusCode} >= 200 and ${checks.statusCode} < 300)::int`,
      avgMs: sql<number>`coalesce(avg(${checks.responseMs})::int, 0)`,
    })
    .from(checks)
    .where(
      and(
        eq(checks.monitorId, id),
        sql`${checks.checkedAt} >= ${twentyFourHoursAgo}`
      )
    );

  const uptime24h =
    stats.total > 0 ? Math.round((stats.up / stats.total) * 100) : null;

  const isUp =
    monitor.lastStatus !== null &&
    monitor.lastStatus >= 200 &&
    monitor.lastStatus < 300;
  const isPending = monitor.lastStatus === null;

  return (
    <div className="flex min-h-screen flex-col bg-sky-50 font-sans dark:bg-black">
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-sky-700 dark:text-sky-400"
        >
          StatusPing
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Pricing
          </Link>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            Public status page
          </span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-12">
        {/* Status hero */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-full ${
              isPending
                ? "bg-zinc-100 dark:bg-zinc-800"
                : isUp
                  ? "bg-green-100 dark:bg-green-950"
                  : "bg-red-100 dark:bg-red-950"
            }`}
          >
            <div
              className={`h-8 w-8 rounded-full ${
                isPending
                  ? "bg-zinc-300 dark:bg-zinc-600"
                  : isUp
                    ? "bg-sky-500 dark:bg-green-400"
                    : "bg-red-500 dark:bg-red-400"
              }`}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black dark:text-white">
              {host}
            </h1>
            <p
              className={`mt-1 text-lg font-semibold ${
                isPending
                  ? "text-zinc-400"
                  : isUp
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
              }`}
            >
              {isPending
                ? "Pending first check"
                : isUp
                  ? "All systems operational"
                  : "Service disruption detected"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-1 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Status
            </span>
            <span
              className={`text-lg font-bold ${
                isPending
                  ? "text-zinc-400"
                  : isUp
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
              }`}
            >
              {isPending ? "Pending" : isUp ? "Up" : "Down"}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Uptime (24h)
            </span>
            <span
              className={`text-lg font-bold ${
                uptime24h === null
                  ? "text-zinc-400"
                  : uptime24h >= 99
                    ? "text-green-600 dark:text-green-400"
                    : uptime24h >= 95
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
              }`}
            >
              {uptime24h !== null ? `${uptime24h}%` : "\u2014"}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Avg response (24h)
            </span>
            <span className="text-lg font-bold text-black dark:text-white">
              {stats.total > 0 ? `${stats.avgMs}ms` : "\u2014"}
            </span>
          </div>
        </div>

        {/* Uptime timeline */}
        <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-black dark:text-white">
              Last 24 hours
            </h2>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              {recentChecks.length} checks
            </span>
          </div>
          <UptimeDots recentChecks={recentChecks} />
          <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500">
            <span>24h ago</span>
            <span>Now</span>
          </div>
        </div>

        {/* Last checked */}
        {monitor.lastCheckedAt && (
          <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
            Last checked:{" "}
            {new Date(monitor.lastCheckedAt).toLocaleString()}
          </p>
        )}
      </main>

      <footer className="flex flex-col items-center gap-3 px-6 py-6">
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Monitored by{" "}
          <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300">
            StatusPing
          </Link>
          {" \u2014 "}
          <a
            href="https://moltcorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            Moltcorp
          </a>
        </p>
      </footer>
    </div>
  );
}
