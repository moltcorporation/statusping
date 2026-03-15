import Link from "next/link";

const faqs = [
  {
    question: "When exactly is Freshping shutting down?",
    answer:
      "Freshworks announced the discontinuation for March 2026. Existing monitors will stop running after the shutdown date. We recommend migrating before then to avoid any monitoring gaps.",
  },
  {
    question: "Is StatusPing really free?",
    answer:
      "Yes. The free tier gives you 3 monitors with hourly checks and Slack alerts. No credit card, no trial expiration. If you need unlimited monitors and 5-minute checks, the Pro plan is $9/month.",
  },
  {
    question: "Can I monitor 50 sites like I did on Freshping?",
    answer:
      "On the free tier, you get 3 monitors. The Pro plan ($9/mo) gives you unlimited monitors. If you were using all 50 Freshping monitors, Pro is the way to go.",
  },
  {
    question: "Will StatusPing also shut down?",
    answer:
      "StatusPing is part of the Moltcorp suite of developer tools. It is actively maintained and developed. We understand the frustration of losing a tool you depend on — that's exactly why we built StatusPing to be simple and sustainable.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Freshping Alternative — StatusPing",
    url: "https://statusping-moltcorporation.vercel.app/compare/freshping",
    description:
      "Freshping by Freshworks is shutting down in March 2026. StatusPing is a free uptime monitoring alternative.",
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

export default function FreshpingComparison() {
  return (
    <div className="flex min-h-screen flex-col bg-sky-50 font-sans dark:bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-sky-700 dark:text-sky-400"
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
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
          >
            Monitor your site free
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-wide text-red-500">
            Freshping is shutting down
          </p>
          <h1 className="text-3xl font-bold text-black sm:text-4xl dark:text-white">
            Freshping Alternative for 2026
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Freshping by Freshworks is discontinuing its free uptime monitoring
            service in March 2026. If you relied on Freshping for uptime checks,
            StatusPing is a free alternative you can set up in 30 seconds — no
            account creation required.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex self-start rounded-lg bg-sky-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
        >
          Start monitoring free
        </Link>

        {/* What happened */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            What happened to Freshping?
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Freshworks announced in early 2026 that Freshping, their free
            website monitoring tool, would be discontinued. Freshping was popular
            for its generous free tier — 50 monitors with 1-minute check
            intervals from 10 global locations. Many indie developers, small
            teams, and startups relied on it as their primary uptime monitor.
          </p>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            With the shutdown, thousands of users need to migrate their monitors
            to a new service. StatusPing is designed for exactly this use case —
            simple, free uptime monitoring with the features that matter most.
          </p>
        </section>

        {/* Comparison table */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Freshping vs StatusPing
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-zinc-400 line-through dark:text-zinc-500">
                    Freshping
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                    StatusPing
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {[
                  [
                    "Status",
                    "Shutting down March 2026",
                    "Active and maintained",
                  ],
                  [
                    "Free monitors",
                    "50 monitors",
                    "3 monitors",
                  ],
                  [
                    "Check interval (free)",
                    "1 minute",
                    "1 hour (Pro: 5 min)",
                  ],
                  [
                    "Setup time",
                    "Account + email verification",
                    "30 seconds, no account needed",
                  ],
                  [
                    "Slack alerts",
                    "Yes",
                    "Yes — down + recovery",
                  ],
                  [
                    "Public status page",
                    "Yes",
                    "Yes",
                  ],
                  [
                    "Uptime badges",
                    "No",
                    "Yes — HTML + Markdown",
                  ],
                  [
                    "Part of a suite",
                    "No (standalone)",
                    "Yes — SSL, DNS, Headers, Meta, WHOIS",
                  ],
                  [
                    "Pro pricing",
                    "N/A (shutting down)",
                    "$9/mo — unlimited monitors, 5-min checks",
                  ],
                ].map(([feature, freshping, statuspng]) => (
                  <tr key={feature} className="bg-white dark:bg-black">
                    <td className="px-4 py-3 font-medium text-black dark:text-white">
                      {feature}
                    </td>
                    <td className="px-4 py-3 text-zinc-400 dark:text-zinc-500">
                      {freshping}
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {statuspng}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Honest take */}
        <section className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            An honest comparison
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Freshping&apos;s free tier was more generous than ours — 50 monitors
            with 1-minute checks vs our 3 monitors with hourly checks.
            That&apos;s a real gap. If you need dozens of monitors with
            sub-minute intervals, you&apos;ll want to look at UptimeRobot or
            BetterUptime.
          </p>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            But if you monitor a handful of sites and want the simplest possible
            setup — no account creation, Slack alerts out of the box, and a
            suite of related tools (SSL checks, DNS lookups, security headers,
            meta tag analysis) — StatusPing is built for that workflow. And
            unlike Freshping, we&apos;re not going anywhere.
          </p>
        </section>

        {/* Migration steps */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            How to migrate from Freshping
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Export your URLs",
                desc: "Note the URLs you were monitoring in Freshping before the shutdown.",
              },
              {
                step: "2",
                title: "Add to StatusPing",
                desc: "Paste each URL on our homepage with your email. Takes 30 seconds per monitor.",
              },
              {
                step: "3",
                title: "Set up Slack alerts",
                desc: "Add a Slack webhook URL to get instant down and recovery notifications.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="flex flex-col items-center gap-2 rounded-lg border border-zinc-200 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white dark:bg-sky-500">
                  {s.step}
                </span>
                <h3 className="text-sm font-semibold text-black dark:text-white">
                  {s.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
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
            Don&apos;t wait for the shutdown
          </h2>
          <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">
            Migrate your monitors now. Free, instant setup, Slack alerts
            included. No account required.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-sky-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
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
            <Link href="/compare/betterstack" className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
              vs Better Stack &rarr;
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
          <span className="font-medium text-zinc-600 dark:text-zinc-300">
            StatusPing
          </span>
          <a
            href="https://headerguard-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            HeaderGuard
          </a>
          <a
            href="https://dns-lookup-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            DNS Lookup
          </a>
          <a
            href="https://metashield-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            MetaShield
          </a>
          <a
            href="https://ssl-certificate-checker-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            SSL Checker
          </a>
          <a
            href="https://whois-lookup-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            WHOIS Lookup
          </a>
          <a
            href="https://federal-contract-tracker-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            Contract Tracker
          </a>
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
