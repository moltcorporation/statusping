import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UptimeRobot Alternative — Free Website Uptime Monitor | StatusPing",
  description:
    "Looking for an UptimeRobot alternative? StatusPing is a free uptime monitor with Slack alerts, public status pages, and embeddable uptime badges. No credit card required.",
  openGraph: {
    title: "UptimeRobot Alternative — StatusPing",
    description:
      "Free uptime monitoring with Slack alerts, public status pages, and uptime badges. No credit card required.",
    type: "website",
    siteName: "StatusPing",
  },
  twitter: {
    card: "summary_large_image",
    title: "UptimeRobot Alternative — StatusPing",
    description:
      "Free uptime monitoring with Slack alerts and public status pages.",
  },
};

const features = [
  {
    statuspng: "Free tier with hourly checks, no credit card",
    competitor: "Free tier with 5-minute checks (50 monitors)",
  },
  {
    statuspng: "Pro: 5-minute checks at $9/mo",
    competitor: "Pro: 5-minute checks at $7/mo (50 monitors)",
  },
  {
    statuspng: "Slack alerts on down/recovery transitions",
    competitor: "Email, SMS, Slack, webhooks, and more",
  },
  {
    statuspng: "Public status page with shareable URL",
    competitor: "Status pages available on paid plans",
  },
  {
    statuspng: "Embeddable uptime badge (Markdown & HTML)",
    competitor: "No embeddable badges",
  },
  {
    statuspng: "Part of the Moltcorp suite (SSL, DNS, Headers, Meta)",
    competitor: "Standalone monitoring tool",
  },
  {
    statuspng: "Simple, focused — set up in 30 seconds",
    competitor: "Feature-rich but more complex setup",
  },
];

export default function UptimeRobotComparison() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-black dark:text-white">
          StatusPing
        </Link>
        <Link
          href="/"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Monitor your site free
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-black sm:text-4xl dark:text-white">
            UptimeRobot Alternative
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            UptimeRobot is the most popular free uptime monitor. StatusPing is
            a simpler alternative built for developers who want quick setup,
            Slack alerts, and public status pages — all part of a full website
            health suite. No credit card. No complex dashboards.
          </p>
        </div>

        {/* Honest comparison */}
        <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            An honest comparison
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            UptimeRobot has more features: more notification channels, more
            monitors on the free tier, and a longer track record. If you need
            SMS alerts, 50+ monitors, or detailed incident management,
            UptimeRobot is hard to beat. But if you want a simple monitor
            that&apos;s part of a broader website security suite — with SSL
            checks, DNS lookups, header analysis, and meta tag validation all
            in one place — StatusPing fits that workflow.
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            StatusPing vs UptimeRobot
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                    StatusPing
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-zinc-500 dark:text-zinc-500">
                    UptimeRobot
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/50"
                  >
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{row.statuspng}</td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-500">
                      {row.competitor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to choose StatusPing */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            When StatusPing is the better choice
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "You want a full security suite",
                desc: "StatusPing works alongside HeaderGuard, SSL Checker, DNS Lookup, and MetaShield. One domain, every angle.",
              },
              {
                title: "You want minimal setup",
                desc: "Enter a URL and email. That's it. Monitor is live in seconds. No account creation, no credit card.",
              },
              {
                title: "You need public status pages",
                desc: "Every monitor gets a shareable public status page with uptime stats, response times, and check history.",
              },
              {
                title: "You embed uptime badges",
                desc: "Copy a Markdown or HTML snippet to show live uptime status on your README or website.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="font-semibold text-black dark:text-white">{item.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Start monitoring in 30 seconds
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Free. No signup. Slack alerts included.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-black px-8 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Open StatusPing
          </Link>
        </div>

        {/* Related tools */}
        <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-black dark:text-white">
            Also check your site with
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://headerguard-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Security Headers &rarr;
            </a>
            <a
              href="https://ssl-certificate-checker-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              SSL Certificate &rarr;
            </a>
            <a
              href="https://dns-lookup-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              DNS Records &rarr;
            </a>
            <a
              href="https://metashield-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Meta Tags &rarr;
            </a>
            <a
              href="https://whois-lookup-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              WHOIS Lookup &rarr;
            </a>
          </div>
        </div>
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
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-400">Moltcorp</a>
        </span>
      </footer>
    </div>
  );
}
