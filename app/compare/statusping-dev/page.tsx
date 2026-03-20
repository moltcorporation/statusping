import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "StatusPing vs statusping.dev — Free Uptime Monitoring Comparison | StatusPing",
  description:
    "StatusPing vs statusping.dev: both offer uptime monitoring at $9/mo Pro. StatusPing gives you 10 free monitors vs 3, free status pages, and no account required to start.",
  alternates: {
    canonical: `${baseUrl}/compare/statusping-dev`,
  },
  openGraph: {
    title: "StatusPing vs statusping.dev — Uptime Monitoring Comparison",
    description:
      "10 free monitors vs 3. Free status pages included. Compare both tools side by side.",
    type: "website",
    siteName: "StatusPing",
    url: `${baseUrl}/compare/statusping-dev`,
  },
  twitter: {
    card: "summary_large_image",
    title: "StatusPing vs statusping.dev — Uptime Monitoring Comparison",
    description:
      "10 free monitors vs 3. Free status pages included. Compare both tools side by side.",
  },
};

const features = [
  {
    feature: "Free monitors",
    statusping: "10 monitors included free",
    competitor: "3 monitors on free tier",
  },
  {
    feature: "Free check interval",
    statusping: "15 minutes",
    competitor: "5 minutes",
  },
  {
    feature: "Pro pricing",
    statusping: "$9/mo — unlimited monitors, 5-min checks",
    competitor: "$9/mo — 20 monitors, 1-min checks",
  },
  {
    feature: "Team pricing",
    statusping: "Not available — flat $9/mo Pro",
    competitor: "$29/mo — 100 monitors, 30-sec checks",
  },
  {
    feature: "Status pages",
    statusping: "Included free — public shareable URL per monitor",
    competitor: "Available on paid plans",
  },
  {
    feature: "Uptime badges",
    statusping: "Embeddable Markdown and HTML badges — free",
    competitor: "Not listed",
  },
  {
    feature: "Alerts",
    statusping: "Slack and email on down/recovery",
    competitor: "Email, Slack, Discord, Telegram, webhooks",
  },
  {
    feature: "Account required",
    statusping: "No — start monitoring in 30 seconds",
    competitor: "Yes — email signup required",
  },
  {
    feature: "Check types",
    statusping: "HTTP/HTTPS uptime checks",
    competitor: "HTTP, keyword, port, ping, DNS",
  },
  {
    feature: "Pricing model",
    statusping: "Simple: Free or $9/mo. No tiers.",
    competitor: "3 tiers: Free, Pro ($9), Team ($29)",
  },
];

const faqs = [
  {
    question: "What is statusping.dev?",
    answer:
      "statusping.dev is an uptime monitoring service offering 3 free monitors with 5-minute checks, Pro at $9/mo for 20 monitors with 1-minute checks, and Team at $29/mo for 100 monitors with 30-second checks. They support HTTP, keyword, port, ping, and DNS checks.",
  },
  {
    question: "How is StatusPing different from statusping.dev?",
    answer:
      "Both offer uptime monitoring at similar price points. StatusPing gives you more free monitors (10 vs 3), includes free public status pages and uptime badges, and requires no account to start. statusping.dev offers faster check intervals on free tier (5 min vs 15 min), more check types (port, ping, DNS), and a Team plan for larger setups.",
  },
  {
    question: "Which is better for a single site?",
    answer:
      "For monitoring a single site for free, both work. StatusPing lets you start in 30 seconds without creating an account and includes a shareable public status page. statusping.dev requires signup but offers 5-minute checks on the free tier vs StatusPing's 15 minutes.",
  },
  {
    question: "Which is better for teams?",
    answer:
      "statusping.dev has a dedicated Team plan at $29/mo with 100 monitors and 30-second checks. StatusPing's Pro plan covers unlimited monitors at $9/mo with 5-minute checks. If you need sub-minute checks or 100+ monitors with granular intervals, statusping.dev's Team plan may fit better. If unlimited monitors at a lower price matters more, StatusPing Pro is the better deal.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function StatusPingDevComparison() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            Monitor your site free
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-black sm:text-4xl dark:text-white">
            StatusPing vs statusping.dev
            <span className="block text-zinc-500 dark:text-zinc-400">
              Two Uptime Monitors, Same Name
            </span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Both StatusPing and statusping.dev offer uptime monitoring with Pro
            plans at{" "}
            <strong className="text-black dark:text-white">$9/mo</strong>.
            StatusPing gives you{" "}
            <strong className="text-black dark:text-white">
              10 free monitors
            </strong>{" "}
            with public status pages and no signup required.
            statusping.dev offers{" "}
            <strong className="text-black dark:text-white">
              3 free monitors
            </strong>{" "}
            with faster check intervals and more check types. Here&apos;s how
            they compare.
          </p>
        </div>

        {/* Honest comparison */}
        <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            An honest comparison
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            statusping.dev offers faster free-tier check intervals (5 minutes
            vs our 15 minutes), more check types including port, ping, and DNS
            monitoring, and a Team plan at $29/mo for teams needing 100+
            monitors with 30-second checks. If those capabilities matter to
            you, statusping.dev is a solid choice.
          </p>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            StatusPing is built for simplicity. You get more free monitors (10
            vs 3), public status pages and embeddable uptime badges included
            at no cost, and you can start monitoring without creating an
            account. Our Pro plan at $9/mo gives you unlimited monitors — no
            cap. If you want straightforward monitoring with the most generous
            free tier, that&apos;s us.
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Feature comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                  <th className="px-4 py-3 text-left font-medium text-zinc-500 dark:text-zinc-500">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                    StatusPing
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-zinc-500 dark:text-zinc-500">
                    statusping.dev
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/50"
                  >
                    <td className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {row.statusping}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-500">
                      {row.competitor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to use each */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            When to use each tool
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-black dark:text-white">
                Choose StatusPing when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                <li>You want the most free monitors (10 vs 3)</li>
                <li>You need public status pages included free</li>
                <li>You want to start without creating an account</li>
                <li>You need unlimited monitors on Pro ($9/mo)</li>
                <li>You want embeddable uptime badges</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-zinc-500 dark:text-zinc-400">
                Choose statusping.dev when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-zinc-500 dark:text-zinc-500">
                <li>You need faster free-tier checks (5 min vs 15 min)</li>
                <li>You need port, ping, or DNS monitoring</li>
                <li>You want 30-second check intervals (Team plan)</li>
                <li>You need 100+ monitors on the Team plan</li>
                <li>You prefer multi-channel alerts (Discord, Telegram)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="font-semibold text-black dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {faq.answer}
                </p>
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
            Free. No signup. 10 monitors with Slack and email alerts.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-black px-8 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Try StatusPing free
          </Link>
        </div>

        {/* More comparisons */}
        <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-black dark:text-white">
            More uptime monitor comparisons
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/compare/uptimerobot" className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
              vs UptimeRobot &rarr;
            </Link>
            <Link href="/compare/betterstack" className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
              vs Better Stack &rarr;
            </Link>
            <Link href="/compare/freshping" className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
              vs Freshping &rarr;
            </Link>
            <Link href="/compare/pingdom" className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
              vs Pingdom &rarr;
            </Link>
            <Link href="/compare/hetrixtools" className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
              vs HetrixTools &rarr;
            </Link>
          </div>
        </div>

        {/* Related tools */}
        <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-black dark:text-white">
            Also check your site with
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "GovScout", href: "https://federal-contract-tracker-moltcorporation.vercel.app" },
            ].map((tool) => (
              <a
                key={tool.label}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {tool.label} &rarr;
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="font-medium">Moltcorp Products:</span>
          <span className="font-medium text-zinc-600 dark:text-zinc-300">StatusPing</span>
          <a href="https://qr-code-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">OneQR</a>
          <a href="https://federal-contract-tracker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">GovScout</a>
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <Link href="/privacy" className="hover:text-zinc-600 dark:hover:text-zinc-300">Privacy</Link>
          <Link href="/terms" className="hover:text-zinc-600 dark:hover:text-zinc-300">Terms</Link>
        </div>
        <span className="text-xs text-zinc-400 dark:text-zinc-600">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-400">Moltcorp</a>
        </span>
      </footer>
    </div>
  );
}
