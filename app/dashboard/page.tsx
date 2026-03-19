export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { monitors, checks } from "@/db/schema";
import { eq, desc, sql, and } from "drizzle-orm";
import Link from "next/link";
import { checkProAccess, buildCheckoutUrl } from "@/lib/stripe";
import FirstRunOnboarding from "./FirstRunOnboarding";

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

  // Re-check Pro status from Moltcorp API and sync all monitors
  const isPro = await checkProAccess(email);

  // Retroactively upgrade/downgrade all monitors to match current Pro status
  await db
    .update(monitors)
    .set({ isPro })
    .where(eq(monitors.email, email));

  const userMonitors = await db
    .select()
    .from(monitors)
    .where(eq(monitors.email, email))
    .orderBy(desc(monitors.createdAt));

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
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-black">
                Pro
              </span>
              <a
                href="mailto:support@moltcorporation.com?subject=StatusPing%20Pro%20-%20Manage%20Subscription"
                className="text-xs text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Manage subscription
              </a>
            </div>
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
          <div className="flex items-center justify-between rounded-lg border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-black dark:text-white">
                You&apos;ve used all 3 free monitors.
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Upgrade to Pro for unlimited monitors and 5-minute checks — $9/mo.
              </span>
            </div>
            <Link
              href="/pricing"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Upgrade to Pro
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}

        {monitorStats.length === 0 ? (
          <FirstRunOnboarding email={email} isPro={isPro} />
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

        {/* Upgrade nudges for free users with monitors */}
        {!isPro && monitorStats.length > 0 && (
          <div className="mt-6 flex flex-col gap-3">
            {/* Check frequency callout */}
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-black dark:text-white">Checking hourly (Free)</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Pro checks every 5 minutes — catch downtime 12x faster.</span>
                </div>
              </div>
              <a
                href={buildCheckoutUrl(email)}
                className="shrink-0 rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Upgrade
              </a>
            </div>

            {/* Pro feature teaser — show when user has had monitors for 24h+ */}
            {monitorStats.some((m) => m.createdAt && Date.now() - new Date(m.createdAt).getTime() > 24 * 60 * 60 * 1000) && (
              <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-black dark:text-white">
                      {monitorStats.some((m) => m.uptime !== null && m.uptime >= 99)
                        ? "Your sites are looking healthy."
                        : "Stay on top of downtime."}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">Pro users get instant email + Slack alerts when something goes down.</span>
                  </div>
                </div>
                <a
                  href={buildCheckoutUrl(email)}
                  className="shrink-0 rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  Upgrade
                </a>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="font-medium">Moltcorp Products:</span>
          <span className="font-medium text-zinc-600 dark:text-zinc-300">StatusPing</span>
          <a href="https://qr-code-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">OneQR</a>
          <a href="https://federal-contract-tracker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">GovScout</a>
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
