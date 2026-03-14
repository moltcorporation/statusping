import Link from "next/link";

const faqs = [
  {
    question: "Is HetrixTools free?",
    answer:
      "Yes. HetrixTools offers a generous free tier with 15 monitors, 1-minute check intervals, and multi-location monitoring. StatusPing's free tier is smaller (3 monitors, hourly checks) but requires no account creation — paste a URL and you're monitoring in 30 seconds.",
  },
  {
    question: "Why choose StatusPing over HetrixTools if HetrixTools has more free monitors?",
    answer:
      "Simplicity. HetrixTools requires account creation, email verification, and dashboard configuration. StatusPing is designed to get you monitoring in 30 seconds with zero friction. If you need 15+ monitors, HetrixTools is the better free option. If you need quick, simple monitoring with native Slack alerts, StatusPing is faster to set up.",
  },
  {
    question: "Does StatusPing have blacklist monitoring like HetrixTools?",
    answer:
      "No. HetrixTools includes IP and domain blacklist monitoring on their free tier, which is valuable for email deliverability. StatusPing focuses purely on uptime/downtime detection and alerting. For blacklist monitoring, HetrixTools is the better choice.",
  },
  {
    question: "Which tool has better alerting?",
    answer:
      "Different strengths. HetrixTools supports email, Slack, Discord, Telegram, PagerDuty, and more via integrations. StatusPing has native Slack alerts built in — no webhook configuration needed, just add your Slack webhook URL. If Slack is your primary channel, StatusPing is simpler. If you need multi-channel alerting, HetrixTools has more options.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "HetrixTools Alternative — StatusPing",
    url: "https://statusping-moltcorporation.vercel.app/compare/hetrixtools",
    description:
      "Compare StatusPing vs HetrixTools. Both offer free uptime monitoring — HetrixTools has more monitors, StatusPing has simpler setup with native Slack alerts.",
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

export default function HetrixToolsComparison() {
  return (
    <div className="flex min-h-screen flex-col bg-green-50 font-sans dark:bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-emerald-700 dark:text-emerald-400"
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
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
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
            HetrixTools Alternative — Simpler Uptime Monitoring
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            HetrixTools has one of the most generous free tiers in uptime
            monitoring — 15 monitors with 1-minute checks. StatusPing trades
            monitor count for simplicity: free monitoring with native Slack
            alerts, no account required, set up in 30 seconds.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex self-start rounded-lg bg-emerald-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
        >
          Start monitoring free
        </Link>

        {/* Comparison table */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            HetrixTools vs StatusPing
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-zinc-400 dark:text-zinc-500">
                    HetrixTools
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                    StatusPing
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {[
                  [
                    "Free monitors",
                    "15",
                    "3",
                  ],
                  [
                    "Check interval (free)",
                    "1 minute",
                    "1 hour",
                  ],
                  [
                    "Check locations",
                    "Multi-location worldwide",
                    "Single location",
                  ],
                  [
                    "Account required",
                    "Yes — email verification",
                    "No — paste URL and go",
                  ],
                  [
                    "Setup time",
                    "~5 minutes",
                    "30 seconds",
                  ],
                  [
                    "Slack alerts",
                    "Via integration setup",
                    "Native — built in",
                  ],
                  [
                    "Blacklist monitoring",
                    "Yes — IP and domain",
                    "No",
                  ],
                  [
                    "Public status page",
                    "Yes (paid plans)",
                    "Yes (included free)",
                  ],
                  [
                    "Uptime badges",
                    "No",
                    "Yes — HTML + Markdown",
                  ],
                  [
                    "Pro plan",
                    "From $5.95/mo",
                    "$9/mo — unlimited monitors",
                  ],
                  [
                    "Part of a suite",
                    "Standalone + server monitoring",
                    "Moltcorp Suite — SSL, DNS, Headers, Meta, WHOIS",
                  ],
                ].map(([feature, hetrix, statusping]) => (
                  <tr key={feature} className="bg-white dark:bg-black">
                    <td className="px-4 py-3 font-medium text-black dark:text-white">
                      {feature}
                    </td>
                    <td className="px-4 py-3 text-zinc-400 dark:text-zinc-500">
                      {hetrix}
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

        {/* When HetrixTools is better */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            When HetrixTools is the better choice
          </h2>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                You need more than 3 free monitors — HetrixTools gives you 15
                with 1-minute intervals, which is genuinely hard to beat.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                You need multi-location monitoring to detect regional outages
                and measure latency from different geographies.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                You need blacklist monitoring to protect email deliverability
                and domain reputation.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                You want server resource monitoring (CPU, RAM, disk) alongside
                uptime checks in one dashboard.
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
                You want to start monitoring immediately — no account creation,
                no email verification, no dashboard setup. Paste a URL, done.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                Slack is your team&apos;s primary communication channel and you
                want native alerts without configuring webhooks through a
                separate integration panel.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                You need a public status page included on the free tier — not
                locked behind a paid plan.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-zinc-400">&bull;</span>
              <span>
                You use other Moltcorp Suite tools and want uptime monitoring
                alongside SSL, DNS, security headers, meta tags, and WHOIS
                checks.
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
            className="rounded-lg bg-emerald-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
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
            <Link href="/compare/pingdom" className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
              vs Pingdom &rarr;
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
