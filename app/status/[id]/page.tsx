export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { db } from "@/db";
import { monitors, checks } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import Link from "next/link";
import type { Metadata } from "next";

function StatusDot({ up }: { up: boolean | null }) {
  if (up === null) {
    return (
      <span className="inline-block h-4 w-4 rounded-full bg-zinc-400 dark:bg-zinc-600" />
    );
  }
  return (
    <span
      className={`inline-block h-4 w-4 rounded-full ${
        up
          ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
          : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
      }`}
    />
  );
}

function UptimeBar({
  checksData,
}: {
  checksData: { statusCode: number; checkedAt: Date | null }[];
}) {
  if (checksData.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        No checks recorded yet.
      </p>
    );
  }

  // Show most recent 24 checks (oldest on left, newest on right)
  const display = checksData.slice(0, 24).reverse();

  return (
    <div className="flex gap-1">
      {display.map((check, i) => {
        const isUp = check.statusCode >= 200 && check.statusCode < 300;
        return (
          <div
            key={i}
            title={`${check.checkedAt ? new Date(check.checkedAt).toLocaleString() : "—"} — ${isUp ? "UP" : "DOWN"} (${check.statusCode})`}
            className={`h-8 flex-1 rounded-sm ${
              isUp
                ? "bg-green-500 dark:bg-green-600"
                : "bg-red-500 dark:bg-red-600"
            }`}
          />
        );
      })}
    </div>
  );
}

async function getMonitor(id: string) {
  const [monitor] = await db
    .select()
    .from(monitors)
    .where(eq(monitors.id, id))
    .limit(1);

  return monitor || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const monitor = await getMonitor(id);

  if (!monitor) {
    return { title: "Monitor not found — StatusPing" };
  }

  const displayName = monitor.name || monitor.url;
  const isUp =
    monitor.lastStatus !== null &&
    monitor.lastStatus >= 200 &&
    monitor.lastStatus < 300;
  const statusText = monitor.lastStatus === null ? "Pending" : isUp ? "UP" : "DOWN";

  return {
    title: `${displayName} — ${statusText} — StatusPing`,
    description: `Live status page for ${displayName}. Currently ${statusText}. Monitored by StatusPing.`,
    openGraph: {
      title: `${displayName} — ${statusText}`,
      description: `Live uptime status for ${displayName}. Monitored by StatusPing.`,
      type: "website",
      siteName: "StatusPing",
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName} — ${statusText}`,
      description: `Live uptime status for ${displayName}. Monitored by StatusPing.`,
    },
  };
}

export default async function PublicStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const monitor = await getMonitor(id);
  if (!monitor) {
    notFound();
  }

  const displayName = monitor.name || monitor.url;
  const isUp =
    monitor.lastStatus !== null &&
    monitor.lastStatus >= 200 &&
    monitor.lastStatus < 300;
  const isPending = monitor.lastStatus === null;

  // Get recent checks (last 24h)
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

  // Calculate stats
  const total = recentChecks.length;
  const upCount = recentChecks.filter(
    (c) => c.statusCode >= 200 && c.statusCode < 300
  ).length;
  const uptime = total > 0 ? Math.round((upCount / total) * 100) : null;
  const avgMs =
    total > 0
      ? Math.round(
          recentChecks.reduce((sum, c) => sum + (c.responseMs || 0), 0) / total
        )
      : null;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-black dark:text-white"
        >
          StatusPing
        </Link>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          Public status page
        </span>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-8">
        {/* Status hero */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <StatusDot up={isPending ? null : isUp} />
            <span
              className={`text-3xl font-bold ${
                isPending
                  ? "text-zinc-400"
                  : isUp
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
              }`}
            >
              {isPending ? "Pending" : isUp ? "Operational" : "Down"}
            </span>
          </div>
          <h1 className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
            {displayName}
          </h1>
          {monitor.lastCheckedAt && (
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Last checked{" "}
              {new Date(monitor.lastCheckedAt).toLocaleString()}
            </p>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-1 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Uptime (24h)
            </span>
            <span
              className={`text-2xl font-bold ${
                uptime === null
                  ? "text-zinc-400"
                  : uptime >= 99
                    ? "text-green-600 dark:text-green-400"
                    : uptime >= 95
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
              }`}
            >
              {uptime !== null ? `${uptime}%` : "—"}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Avg response
            </span>
            <span className="text-2xl font-bold text-black dark:text-white">
              {avgMs !== null ? `${avgMs}ms` : "—"}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Checks (24h)
            </span>
            <span className="text-2xl font-bold text-black dark:text-white">
              {total}
            </span>
          </div>
        </div>

        {/* Uptime bar */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-black dark:text-white">
              Recent checks
            </h2>
            <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-sm bg-green-500" />
                Up
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-sm bg-red-500" />
                Down
              </span>
            </div>
          </div>
          <UptimeBar checksData={recentChecks} />
          {recentChecks.length > 0 && (
            <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500">
              <span>Oldest</span>
              <span>Most recent</span>
            </div>
          )}
        </div>

        {/* Recent checks table */}
        {recentChecks.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-black dark:text-white">
              Check history
            </h2>
            <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="px-4 py-2 text-left font-medium text-zinc-500 dark:text-zinc-400">
                      Time
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-zinc-500 dark:text-zinc-400">
                      Status
                    </th>
                    <th className="px-4 py-2 text-right font-medium text-zinc-500 dark:text-zinc-400">
                      Response
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentChecks.slice(0, 10).map((check, i) => {
                    const isCheckUp =
                      check.statusCode >= 200 && check.statusCode < 300;
                    return (
                      <tr
                        key={i}
                        className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                      >
                        <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                          {check.checkedAt
                            ? new Date(check.checkedAt).toLocaleString()
                            : "—"}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              isCheckUp
                                ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                                : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                            }`}
                          >
                            {check.statusCode === 0
                              ? "Timeout"
                              : `${check.statusCode} ${isCheckUp ? "OK" : "Error"}`}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-right text-zinc-600 dark:text-zinc-300">
                          {check.responseMs !== null
                            ? `${check.responseMs}ms`
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Powered by */}
        <div className="flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Monitored by
          </span>
          <Link
            href="/"
            className="text-sm font-semibold text-black dark:text-white"
          >
            StatusPing
          </Link>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            — free uptime monitoring
          </span>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-medium text-zinc-600 dark:text-zinc-300">
            StatusPing
          </span>
          <a
            href="https://headerguard-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            HeaderGuard
          </a>
          <a
            href="https://dns-lookup-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            DNS Lookup
          </a>
          <a
            href="https://metashield-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            MetaShield
          </a>
          <a
            href="https://ssl-checker-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            SSL Checker
          </a>
        </div>
        <span className="text-xs text-zinc-400 dark:text-zinc-600">
          Built by agents at{" "}
          <a
            href="https://moltcorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-400"
          >
            Moltcorp
          </a>
        </span>
      </footer>
    </div>
  );
}
