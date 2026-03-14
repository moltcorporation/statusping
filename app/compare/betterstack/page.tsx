import Link from "next/link";

const features = [
  {
    feature: "Free tier",
    statusping: "3 monitors, hourly checks, Slack + email alerts",
    competitor: "No free tier — 14-day trial only",
  },
  {
    feature: "Pro pricing",
    statusping: "$9/mo — unlimited monitors, 5-min checks",
    competitor: "$20/mo — 10 monitors, 3-min checks",
  },
  {
    feature: "Check interval (Pro)",
    statusping: "5 minutes",
    competitor: "30 seconds (higher tiers)",
  },
  {
    feature: "Incident management",
    statusping: "Slack and email alerts on down/recovery",
    competitor: "Full incident management with on-call schedules, escalation policies, and integrations",
  },
  {
    feature: "Status pages",
    statusping: "Included free — shareable URL for every monitor",
    competitor: "Included — custom domains, branded pages",
  },
  {
    feature: "Uptime badges",
    statusping: "Embeddable Markdown and HTML badges",
    competitor: "Available",
  },
  {
    feature: "Log management",
    statusping: "Not included — focused on uptime only",
    competitor: "Built-in log management and search",
  },
  {
    feature: "Setup",
    statusping: "30 seconds — no account required",
    competitor: "Account required, team setup, integration configuration",
  },
  {
    feature: "Ecosystem",
    statusping: "Part of Moltcorp Suite (SSL, DNS, Headers, Meta, WHOIS)",
    competitor: "Standalone platform with logging and incident management",
  },
];

const faqs = [
  {
    question: "What is Better Stack?",
    answer:
      "Better Stack (formerly BetterUptime) is an observability platform that combines uptime monitoring, incident management, on-call scheduling, and log management. Their monitoring plans start at $20/mo for 10 monitors with 3-minute checks.",
  },
  {
    question: "Is StatusPing a good alternative to Better Stack?",
    answer:
      "For straightforward uptime monitoring with alerts — yes. StatusPing handles the core job: check if your site is up, alert you when it goes down, show a public status page. If you need on-call scheduling, incident escalation policies, or log management, Better Stack is more comprehensive.",
  },
  {
    question: "Why is Better Stack more expensive?",
    answer:
      "Better Stack is a full observability platform — not just uptime monitoring. Their price includes incident management, on-call schedules, log ingestion, and team collaboration features. StatusPing focuses on one thing — uptime monitoring — and prices accordingly.",
  },
  {
    question: "Does StatusPing have incident management?",
    answer:
      "StatusPing sends Slack and email alerts when your site goes down and when it recovers. It does not have on-call schedules, escalation policies, or incident timelines. For simple alerting, this is enough. For full incident management workflows, consider Better Stack or PagerDuty.",
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

export default function BetterStackComparison() {
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
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-black sm:text-4xl dark:text-white">
            Better Stack Alternative
            <span className="block text-zinc-500 dark:text-zinc-400">
              Simple Uptime Monitoring
            </span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Better Stack (formerly BetterUptime) is a full observability
            platform — uptime monitoring, incident management, on-call, and
            logs. Starts at{" "}
            <strong className="text-black dark:text-white">$20/mo</strong> for
            10 monitors. StatusPing does one thing well: monitor your sites,
            alert you when they go down, and give you public status pages.{" "}
            <strong className="text-black dark:text-white">
              Free or $9/mo
            </strong>{" "}
            for unlimited.
          </p>
        </div>

        {/* Honest comparison */}
        <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            An honest comparison
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Better Stack is significantly more feature-rich than StatusPing.
            They offer on-call scheduling with escalation policies, full
            incident management with timelines and postmortems, log management
            with search and alerting, and 30-second check intervals on higher
            plans. If your team needs those capabilities, Better Stack is
            worth the price.
          </p>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            StatusPing exists for teams that don&apos;t need all of that. If
            your question is simply &ldquo;is my site up?&rdquo; and you want
            Slack alerts when it goes down, StatusPing handles that in 30
            seconds without creating an account. Most small teams and indie
            developers don&apos;t need incident escalation policies — they
            need a ping that says &ldquo;your site is down.&rdquo;
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            StatusPing vs Better Stack
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
                    Better Stack
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
                <li>You need simple uptime monitoring — is my site up?</li>
                <li>You want free monitoring with no trial expiration</li>
                <li>Slack and email alerts cover your notification needs</li>
                <li>You want public status pages included free</li>
                <li>$9/mo for unlimited monitors fits your budget</li>
                <li>You use the Moltcorp suite for SSL, DNS, and headers</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-zinc-500 dark:text-zinc-400">
                Choose Better Stack when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-zinc-500 dark:text-zinc-500">
                <li>You need on-call scheduling and escalation policies</li>
                <li>You want full incident management with postmortems</li>
                <li>You need log management alongside monitoring</li>
                <li>You need sub-minute check intervals</li>
                <li>Your team needs multi-user dashboards and roles</li>
                <li>You need integrations with PagerDuty, Jira, or Opsgenie</li>
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
            Free. No signup. Slack and email alerts included.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-emerald-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
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
              { label: "Security Headers", href: "https://headerguard-moltcorporation.vercel.app" },
              { label: "SSL Certificate", href: "https://ssl-certificate-checker-moltcorporation.vercel.app" },
              { label: "DNS Records", href: "https://dns-lookup-moltcorporation.vercel.app" },
              { label: "Meta Tags", href: "https://metashield-moltcorporation.vercel.app" },
              { label: "WHOIS Lookup", href: "https://whois-lookup-moltcorporation.vercel.app" },
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
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-medium text-zinc-600 dark:text-zinc-300">StatusPing</span>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">HeaderGuard</a>
          <a href="https://dns-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">DNS Lookup</a>
          <a href="https://metashield-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">MetaShield</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">SSL Checker</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">WHOIS Lookup</a>
          <a href="https://federal-contract-tracker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">Contract Tracker</a>
        </div>
        <span className="text-xs text-zinc-400 dark:text-zinc-600">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-400">Moltcorp</a>
        </span>
      </footer>
    </div>
  );
}
