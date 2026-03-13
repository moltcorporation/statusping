import Link from "next/link";

const faqs = [
  {
    question: "Is StatusPing really free?",
    answer:
      "Yes. The free tier gives you 3 monitors with hourly checks and Slack alerts. No credit card, no trial that expires. If you need unlimited monitors and 5-minute checks, the Pro plan is $9/month.",
  },
  {
    question: "How does StatusPing compare to Pingdom's free tier?",
    answer:
      "Pingdom discontinued their free tier years ago. Their cheapest plan starts at $15/month for 10 monitors. StatusPing offers 3 free monitors forever with no credit card required, and Pro is $9/month for unlimited monitors.",
  },
  {
    question: "Does StatusPing support SMS or email alerts?",
    answer:
      "StatusPing currently sends alerts via Slack. Pingdom supports SMS, email, and integrations with many incident management tools. If you need SMS alerting, Pingdom or BetterStack may be a better fit.",
  },
  {
    question: "Can StatusPing monitor from multiple locations?",
    answer:
      "StatusPing currently monitors from a single location. Pingdom checks from over 100 probe servers worldwide. For multi-region latency monitoring, Pingdom has the advantage. StatusPing focuses on simple, reliable up/down detection.",
  },
  {
    question: "Does StatusPing have an API?",
    answer:
      "API access is coming soon on the Pro plan. Pingdom has a mature REST API for managing checks, retrieving results, and integrating with CI/CD pipelines.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pingdom Alternative — StatusPing",
    url: "https://statusping-moltcorporation.vercel.app/compare/pingdom",
    description:
      "Compare StatusPing vs Pingdom. Free uptime monitoring alternative with Slack alerts and public status pages.",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "StatusPing",
      url: "https://statusping-moltcorporation.vercel.app",
      applicationCategory: "WebApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  },
  {
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
  },
];

export default function PingdomComparison() {
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
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Comparison
          </p>
          <h1 className="text-3xl font-bold text-black sm:text-4xl dark:text-white">
            Pingdom Alternative — Free Uptime Monitoring
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Pingdom by SolarWinds is the industry standard for uptime
            monitoring — but it starts at $15/month with no free tier.
            StatusPing gives you free uptime monitoring with Slack alerts
            and public status pages. No credit card, no trial expiration.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex self-start rounded-lg bg-black px-8 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Start monitoring free
        </Link>

        {/* Comparison table */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Pingdom vs StatusPing
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-zinc-400 dark:text-zinc-500">
                    Pingdom
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                    StatusPing
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {[
                  [
                    "Free tier",
                    "None (removed)",
                    "3 monitors, forever free",
                  ],
                  [
                    "Cheapest paid plan",
                    "$15/mo (10 monitors)",
                    "$9/mo (unlimited monitors)",
                  ],
                  [
                    "Check interval",
                    "1 minute",
                    "1 hour (Pro: 5 min)",
                  ],
                  [
                    "Check locations",
                    "100+ global probes",
                    "Single location",
                  ],
                  [
                    "Setup time",
                    "Account + billing info",
                    "30 seconds, no account",
                  ],
                  [
                    "Slack alerts",
                    "Via integrations",
                    "Native — down + recovery",
                  ],
                  [
                    "Public status page",
                    "Yes (paid add-on)",
                    "Yes (included free)",
                  ],
                  [
                    "Uptime badges",
                    "No",
                    "Yes — HTML + Markdown",
                  ],
                  [
                    "Transaction monitoring",
                    "Yes (multi-step scripts)",
                    "No — HTTP checks only",
                  ],
                  [
                    "RUM (Real User Monitoring)",
                    "Yes",
                    "No",
                  ],
                  [
                    "Part of a suite",
                    "SolarWinds ecosystem",
                    "Moltcorp Suite — SSL, DNS, Headers, Meta, WHOIS",
                  ],
                ].map(([feature, pingdom, statusping]) => (
                  <tr key={feature} className="bg-white dark:bg-black">
                    <td className="px-4 py-3 font-medium text-black dark:text-white">
                      {feature}
                    </td>
                    <td className="px-4 py-3 text-zinc-400 dark:text-zinc-500">
                      {pingdom}
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {statusping}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When Pingdom is better */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            When Pingdom is the better choice
          </h2>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                You need sub-minute check intervals and global probe locations
                for latency monitoring across regions.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                You need transaction monitoring — multi-step scripts that
                simulate user flows like login, checkout, or form submissions.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                You need Real User Monitoring (RUM) to track actual page load
                performance from real visitors.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                You&apos;re already in the SolarWinds ecosystem and want
                integrated observability across infrastructure.
              </span>
            </li>
          </ul>
        </section>

        {/* When StatusPing is better */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            When StatusPing is the better choice
          </h2>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                You want free uptime monitoring with zero commitment — no credit
                card, no trial, no account creation.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                You monitor a small number of sites and don&apos;t need
                enterprise-grade features like RUM or transaction scripts.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                You want Slack alerts natively — no integration setup, just
                instant down and recovery notifications.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                You want a suite of related tools — check SSL certificates, DNS
                records, security headers, meta tags, and WHOIS data alongside
                uptime monitoring.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                Budget matters — StatusPing Pro is $9/month for unlimited
                monitors vs Pingdom&apos;s $15/month for 10.
              </span>
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, i) => (
            <div key={i} className="flex flex-col gap-3">
              <h3 className="font-semibold text-black dark:text-white">
                {faq.question}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </section>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Try StatusPing — it&apos;s free
          </h2>
          <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">
            Paste your URL, add your email, get Slack alerts when your site goes
            down. 30 seconds to set up. No credit card.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-black px-8 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Start monitoring free
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
            <Link href="/compare/freshping" className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
              vs Freshping &rarr;
            </Link>
            <Link href="/compare/betterstack" className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
              vs Better Stack &rarr;
            </Link>
            <Link href="/compare/hetrixtools" className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
              vs HetrixTools &rarr;
            </Link>
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-medium text-zinc-600 dark:text-zinc-300">
            StatusPing
          </span>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">HeaderGuard</a>
          <a href="https://dns-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">DNS Lookup</a>
          <a href="https://metashield-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">MetaShield</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">SSL Checker</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">WHOIS Lookup</a>
          <a href="https://federal-contract-tracker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">Contract Tracker</a>
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
