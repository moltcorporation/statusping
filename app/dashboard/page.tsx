export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { monitors, checks } from "@/db/schema";
import { eq, desc, sql, and } from "drizzle-orm";
import Link from "next/link";

function StatusDot({ status }: { status: number | null }) {
  if (status === null) {
    return (
      <span className="inline-block h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
    );
  }
  if (status >= 200 && status < 300) {
    return (
      <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
    );
  }
  return <span className="inline-block h-3 w-3 rounded-full bg-red-500" />;
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("sp_email")?.value;

  if (!email) {
    redirect("/");
  }

  const userMonitors = await db
    .select()
    .from(monitors)
    .where(eq(monitors.email, email))
    .orderBy(desc(monitors.createdAt));

  const isPro = userMonitors.some((m) => m.isPro);

  // For each monitor, get the check count and uptime percentage (last 24h)
  const monitorStats = await Promise.all(
    userMonitors.map(async (m) => {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const [stats] = await db
        .select({
          total: sql<number>`count(*)::int`,
          up: sql<number>`count(*) filter (where ${checks.statusCode} >= 200 and ${checks.statusCode} < 300)::int`,
        })
        .from(checks)
        .where(
          and(
            eq(checks.monitorId, m.id),
            sql`${checks.checkedAt} >= ${twentyFourHoursAgo}`
          )
        );

      const uptime =
        stats.total > 0 ? Math.round((stats.up / stats.total) * 100) : null;

      return { ...m, uptime, totalChecks: stats.total };
    })
  );

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-black dark:text-white"
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
          <Link
            href="/"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Add monitor
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Your Monitors
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {isPro
                ? `${userMonitors.length} monitors (Pro)`
                : `${userMonitors.length}/3 monitors used (free tier)`}
            </p>
          </div>
          {isPro ? (
            <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-black">
              Pro
            </span>
          ) : (
            <Link
              href="/pricing"
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Upgrade to Pro
            </Link>
          )}
        </div>

        {!isPro && userMonitors.length >= 3 && (
          <div className="flex items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                You&apos;ve reached the free tier limit
              </span>
              <span className="text-xs text-yellow-600 dark:text-yellow-400">
                Upgrade to Pro for unlimited monitors and 5-minute checks
              </span>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              View pricing
            </Link>
          </div>
        )}

        {monitorStats.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-500 dark:text-zinc-400">
              No monitors yet. Add a URL to start monitoring.
            </p>
            <Link
              href="/"
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Add your first monitor
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {monitorStats.map((m) => (
              <Link
                key={m.id}
                href={`/dashboard/${m.id}`}
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <StatusDot status={m.lastStatus} />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-black dark:text-white">
                      {m.url}
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                      {m.lastCheckedAt
                        ? `Last checked ${new Date(m.lastCheckedAt).toLocaleString()}`
                        : "Not checked yet"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {m.uptime !== null ? (
                    <span
                      className={`text-sm font-semibold ${
                        m.uptime >= 99
                          ? "text-green-600 dark:text-green-400"
                          : m.uptime >= 95
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {m.uptime}% uptime
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-400">
                      Awaiting first check
                    </span>
                  )}
                  <span className="text-zinc-300 dark:text-zinc-600">
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

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
