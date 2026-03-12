export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { db } from "@/db";
import { monitors, checks } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import Link from "next/link";
import { DeleteButton, SlackWebhookForm, ShareStatusButton } from "./MonitorActions";

function StatusBadge({ status }: { status: number }) {
  if (status >= 200 && status < 300) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-400">
        {status} OK
      </span>
    );
  }
  if (status === 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-400">
        Timeout
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-400">
      {status} Error
    </span>
  );
}

export default async function MonitorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const email = cookieStore.get("sp_email")?.value;

  if (!email) {
    redirect("/");
  }

  const [monitor] = await db
    .select()
    .from(monitors)
    .where(and(eq(monitors.id, id), eq(monitors.email, email)))
    .limit(1);

  if (!monitor) {
    notFound();
  }

  // Get last 50 checks
  const recentChecks = await db
    .select()
    .from(checks)
    .where(eq(checks.monitorId, id))
    .orderBy(desc(checks.checkedAt))
    .limit(50);

  // Calculate uptime stats
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
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

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/dashboard"
          className="text-lg font-bold tracking-tight text-black dark:text-white"
        >
          StatusPing
        </Link>
        <Link
          href="/dashboard"
          className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
        >
          Back to monitors
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
        {/* Monitor header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-black dark:text-white">
            {monitor.url}
          </h1>
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <span>Checking every {monitor.isPro ? "5 minutes" : "hour"}</span>
            {monitor.slackWebhookUrl && <span>Slack alerts enabled</span>}
            <ShareStatusButton monitorId={monitor.id} />
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Current status
            </span>
            <span className="text-lg font-bold">
              {monitor.lastStatus === null ? (
                <span className="text-zinc-400">Pending</span>
              ) : monitor.lastStatus >= 200 && monitor.lastStatus < 300 ? (
                <span className="text-green-600 dark:text-green-400">Up</span>
              ) : (
                <span className="text-red-600 dark:text-red-400">Down</span>
              )}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
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
              {uptime24h !== null ? `${uptime24h}%` : "—"}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Avg response (24h)
            </span>
            <span className="text-lg font-bold text-black dark:text-white">
              {stats.total > 0 ? `${stats.avgMs}ms` : "—"}
            </span>
          </div>
        </div>

        {/* Settings */}
        <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Settings
          </h2>
          <SlackWebhookForm
            monitorId={monitor.id}
            currentWebhook={monitor.slackWebhookUrl}
          />
          <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <DeleteButton monitorId={monitor.id} />
          </div>
        </div>

        {/* Recent checks */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Recent Checks
          </h2>
          {recentChecks.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No checks yet. The first check will run within the hour.
            </p>
          ) : (
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
                  {recentChecks.map((check) => (
                    <tr
                      key={check.id}
                      className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                    >
                      <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                        {check.checkedAt
                          ? new Date(check.checkedAt).toLocaleString()
                          : "—"}
                      </td>
                      <td className="px-4 py-2">
                        <StatusBadge status={check.statusCode} />
                      </td>
                      <td className="px-4 py-2 text-right text-zinc-600 dark:text-zinc-300">
                        {check.responseMs !== null
                          ? `${check.responseMs}ms`
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Cross-links */}
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-4 pb-6">
        <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-black dark:text-white">
            Deep-scan this domain with our other tools
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://headerguard-moltcorporation.vercel.app/?url=${encodeURIComponent(monitor.url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              Security Headers &rarr;
            </a>
            <a
              href={`https://metashield-moltcorporation.vercel.app/?url=${encodeURIComponent(monitor.url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              Meta Tags &rarr;
            </a>
            <a
              href={`https://dns-lookup-moltcorporation.vercel.app/?domain=${encodeURIComponent(new URL(monitor.url).hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              DNS Records &rarr;
            </a>
            <a
              href={`https://ssl-certificate-checker-moltcorporation.vercel.app/?domain=${encodeURIComponent(new URL(monitor.url).hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              SSL Certificate &rarr;
            </a>
            <a
              href={`https://whois-lookup-moltcorporation.vercel.app/?domain=${encodeURIComponent(new URL(monitor.url).hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              WHOIS Lookup &rarr;
            </a>
          </div>
        </div>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-medium text-zinc-600 dark:text-zinc-300">StatusPing</span>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">HeaderGuard</a>
          <a href="https://dns-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">DNS Lookup</a>
          <a href="https://metashield-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">MetaShield</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">SSL Checker</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">WHOIS Lookup</a>
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
