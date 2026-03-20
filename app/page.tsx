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
      .then((res) => {
        if (!res.ok) throw new Error("Stats fetch failed");
        return res.json();
      })
      .then((data) => setStats(data))
      .catch(() => setStats(null));

    // Lightweight visitor tracking beacon
    const params = new URLSearchParams(window.location.search);
    const trackData = JSON.stringify({
      path: window.location.pathname,
      utm_source: params.get("utm_source") || null,
    });
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon("/api/track", new Blob([trackData], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", body: trackData, keepalive: true }).catch(() => {});
    }
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
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
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
        <div className="text-lg font-bold tracking-tight text-black dark:text-white">
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
            href="/login"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Sign in
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-24">
        <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl dark:text-white">
            Know when your site
            <span className="text-red-500"> goes down</span>
          </h1>
          <p className="max-w-md text-lg font-medium text-zinc-600 dark:text-zinc-300">
            Free uptime monitoring. No credit card required.
          </p>
          <p className="max-w-md text-base text-zinc-500 dark:text-zinc-400">
            Your users shouldn&apos;t be the ones telling you. StatusPing checks
            your site every 15 minutes and alerts you on Slack or Discord the moment something breaks.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-400 dark:text-zinc-500">
            <span>Checks every 15 min</span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span>Slack & Discord alerts</span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span>Free for 10 monitors</span>
          </div>

          {/* Trust Bar */}
          <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-lg border border-emerald-200 bg-emerald-50/60 px-5 py-3 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            {[
              { label: "No credit card required" },
              { label: "Cancel anytime" },
              { label: "99.9% Uptime Monitoring" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <svg className="h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{item.label}</span>
              </div>
            ))}
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
                className="w-full rounded-lg bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                {loading ? "Adding..." : "Monitor Your Site Free"}
              </button>

              {error && upgradeUrl ? (
                <div className="flex flex-col items-center gap-2 rounded-lg border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
                  <p className="text-sm font-medium text-black dark:text-white">
                    You&apos;ve reached the free tier limit of 10 monitors.
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Unlock unlimited monitors and 5-minute checks.
                  </p>
                  <Link
                    href={upgradeUrl}
                    className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                  >
                    Unlock 5-min checks — $9/mo
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
        {!loading && !success && stats && stats.monitors > 0 && (
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
        )}

        {/* How it works */}
        {!loading && !success && (
          <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { step: "1", title: "Add your URL", desc: "Paste your site URL and your email. Takes 10 seconds." },
              { step: "2", title: "We watch it for you", desc: "Checks every 15 minutes. We record status codes, response times, and downtime." },
              { step: "3", title: "Get pinged, not surprised", desc: "Slack or Discord alert the second your site goes down — and again when it recovers." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-5 text-center dark:border-zinc-800 dark:bg-zinc-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-white dark:bg-white dark:text-black">{s.step}</span>
                <h3 className="text-sm font-semibold text-black dark:text-white">{s.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Features */}
        {!loading && !success && (
          <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-black dark:text-white">
                Built for indie devs
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No enterprise sales calls. No 14-day trial traps. Free tier
                that actually works. Pro when you need more.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-black dark:text-white">
                Slack & Discord alerts
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Down and recovery alerts go straight to Slack or Discord. No email
                noise. No app to install.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-black dark:text-white">
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
      <footer className="flex flex-col items-center gap-6 px-6 py-8">
        <div className="w-full max-w-2xl">
          <p className="mb-3 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">
            More from Moltcorp
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <a
              href="https://qr-code-tool-moltcorporation.vercel.app?utm_source=statuspingsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-3 py-2.5 text-center transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-200">OneQR</span>
              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">Free QR code generator</span>
            </a>
            <a
              href="https://federal-contract-tracker-moltcorporation.vercel.app?utm_source=statuspingsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-3 py-2.5 text-center transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-200">GovScout</span>
              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">Federal contract tracking</span>
            </a>
            <a
              href="https://trades-quoting-tool-moltcorporation.vercel.app?utm_source=statuspingsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-3 py-2.5 text-center transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-200">TradeQuote</span>
              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">Quoting for tradespeople</span>
            </a>
            <a
              href="https://breeder-platform-moltcorporation.vercel.app?utm_source=statuspingsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-3 py-2.5 text-center transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-200">PawPage</span>
              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">Breeder waitlist platform</span>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-600">
          <a href="/privacy" className="hover:text-zinc-600 dark:hover:text-zinc-400">Privacy</a>
          <a href="/terms" className="hover:text-zinc-600 dark:hover:text-zinc-400">Terms</a>
          <a href="/feedback" className="hover:text-zinc-600 dark:hover:text-zinc-400">Feedback</a>
          <span>
            Built by agents at{" "}
            <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-400">Moltcorp</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
