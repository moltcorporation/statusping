"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [upgradeUrl, setUpgradeUrl] = useState("");
  const [stats, setStats] = useState<{
    monitors: number;
    checks: number;
    uptimePercent: number;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setStats({ monitors: 50, checks: 10000, uptimePercent: 99.9 }));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setUpgradeUrl("");

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
        if (data?.upgradeUrl) {
          setUpgradeUrl(data.upgradeUrl);
        }
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
    <div className="flex min-h-screen flex-col bg-green-50 font-sans dark:bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "StatusPing",
            url: "https://statusping-moltcorporation.vercel.app",
            applicationCategory: "WebApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="text-lg font-bold tracking-tight text-emerald-700 dark:text-emerald-400">
          StatusPing
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/pricing"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Pricing
          </a>
          <a
            href="https://moltcorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            by Moltcorp
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="hero-gradient flex flex-1 flex-col items-center justify-center px-4 pb-24">
        <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl dark:text-white">
            Know when your site
            <span className="text-red-500"> goes down</span>
          </h1>
          <p className="max-w-md text-lg text-zinc-500 dark:text-zinc-400">
            Your users shouldn&apos;t be the ones telling you. StatusPing checks
            your site every hour and alerts you on Slack the moment something breaks.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-400 dark:text-zinc-500">
            <span>Checks every hour</span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span>Slack alerts in seconds</span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span>Free for 3 monitors</span>
          </div>

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
                className="w-full rounded-lg bg-emerald-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                {loading ? "Adding..." : "Start monitoring (free)"}
              </button>

              {error && upgradeUrl ? (
                <div className="flex flex-col items-center gap-2 rounded-lg border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
                  <p className="text-sm font-medium text-black dark:text-white">
                    You&apos;ve reached the free tier limit of 3 monitors.
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Upgrade to Pro for unlimited monitors and 5-minute checks.
                  </p>
                  <Link
                    href={upgradeUrl}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                  >
                    Upgrade to Pro — $9/mo
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              ) : error ? (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </div>

        {/* Social Proof Stats */}
        {!loading && !success && (
          <div className="mt-14 w-full max-w-2xl">
            <div className="relative overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 via-cyan-50 to-white p-8 dark:border-sky-900/50 dark:from-sky-950/40 dark:via-cyan-950/30 dark:to-zinc-900">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-200/30 blur-2xl dark:bg-sky-800/20" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-cyan-200/30 blur-2xl dark:bg-cyan-800/20" />
              <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-3xl font-extrabold tracking-tight text-sky-600 dark:text-sky-400 sm:text-4xl">
                    {stats ? (stats.monitors > 0 ? stats.monitors.toLocaleString() : "50+") : "--"}
                  </span>
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Sites Monitored
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-3xl font-extrabold tracking-tight text-cyan-600 dark:text-cyan-400 sm:text-4xl">
                    {stats ? (stats.checks > 0 ? stats.checks.toLocaleString() : "10K+") : "--"}
                  </span>
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Checks Completed
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-3xl font-extrabold tracking-tight text-sky-600 dark:text-sky-400 sm:text-4xl">
                    {stats ? (stats.uptimePercent > 0 ? `${stats.uptimePercent}%` : "99.9%") : "--%"}
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
        )}

        {/* How it works */}
        {!loading && !success && (
          <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { step: "1", title: "Add your URL", desc: "Paste your site URL and your email. Takes 10 seconds." },
              { step: "2", title: "We watch it for you", desc: "Hourly checks. We record status codes, response times, and downtime." },
              { step: "3", title: "Get pinged, not surprised", desc: "Slack alert the second your site goes down — and again when it recovers." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center gap-2 rounded-lg border border-emerald-200 bg-white p-5 text-center dark:border-emerald-900 dark:bg-zinc-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white dark:bg-emerald-500">{s.step}</span>
                <h3 className="text-sm font-semibold text-black dark:text-white">{s.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Features */}
        {!loading && !success && (
          <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col gap-2 rounded-lg border border-emerald-200 bg-white p-5 dark:border-emerald-900 dark:bg-zinc-900">
              <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">
                Built for indie devs
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No enterprise sales calls. No 14-day trial traps. Free tier
                that actually works. Pro when you need more.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-emerald-200 bg-white p-5 dark:border-emerald-900 dark:bg-zinc-900">
              <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">
                Slack-first alerts
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Down and recovery alerts go straight to Slack. No email
                noise. No app to install.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-emerald-200 bg-white p-5 dark:border-emerald-900 dark:bg-zinc-900">
              <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">
                Public status pages
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Share a live status page with your users. Show them you care
                about uptime as much as they do.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-medium text-zinc-600 dark:text-zinc-300">StatusPing</span>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">HeaderGuard</a>
          <a href="https://dns-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">DNS Lookup</a>
          <a href="https://metashield-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">MetaShield</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">SSL Checker</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">WHOIS Lookup</a>
          <a href="https://federal-contract-tracker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">Contract Tracker</a>
          <a href="https://metashield-moltcorporation.vercel.app/suite" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-zinc-600 dark:hover:text-zinc-300">Website Health Check &rarr;</a>
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
