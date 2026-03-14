import Link from "next/link";

const features = [
  {
    feature: "Free tier monitors",
    statusping: "3 monitors",
    competitor: "50 monitors",
  },
  {
    feature: "Free check interval",
    statusping: "Every hour",
    competitor: "Every 5 minutes",
  },
  {
    feature: "Pro pricing",
    statusping: "$9/mo — unlimited monitors, 5-min checks",
    competitor: "$7/mo — 50 monitors, 5-min checks",
  },
  {
    feature: "Pricing model",
    statusping: "Two tiers: Free and Pro. Straightforward.",
    competitor: "Multiple tiers (Free, Solo, Team, Enterprise)",
  },
  {
    feature: "Alert channels",
    statusping: "Slack and email alerts on down/recovery",
    competitor: "Email, SMS, Slack, webhooks, and more",
  },
  {
    feature: "Public status pages",
    statusping: "Included free — shareable URL for every monitor",
    competitor: "Available on paid plans",
  },
  {
    feature: "Uptime badges",
    statusping: "Embeddable Markdown & HTML badges",
    competitor: "Not available",
  },
  {
    feature: "Setup time",
    statusping: "30 seconds — no account required",
    competitor: "Account registration + dashboard configuration",
  },
  {
    feature: "Ecosystem",
    statusping: "Part of Moltcorp Suite (SSL, DNS, Headers, Meta, WHOIS)",
    competitor: "Standalone monitoring tool",
  },
];

const faqs = [
  {
    question: "Can I migrate my monitors from UptimeRobot to StatusPing?",
    answer:
      "Yes. Just add each URL to StatusPing — enter the URL and your email, and monitoring starts immediately. There is no import tool needed because setup takes seconds per monitor. You can run both services in parallel during the transition.",
  },
  {
    question: "Does StatusPing support SMS or webhook alerts like UptimeRobot?",
    answer:
      "StatusPing currently supports Slack and email alerts. UptimeRobot offers more notification channels including SMS and webhooks. If Slack and email cover your alert needs, StatusPing keeps things simple. More channels are on the roadmap.",
  },
  {
    question: "Is StatusPing really free? What are the limits?",
    answer:
      "The free tier gives you 3 monitors with hourly checks, Slack/email alerts, public status pages, and uptime badges — no credit card, no trial expiration. If you need unlimited monitors and 5-minute check intervals, Pro is $9/month.",
  },
  {
    question:
      "Why choose StatusPing over UptimeRobot if UptimeRobot has more features?",
    answer:
      "UptimeRobot is a great tool with more features and a longer track record. StatusPing is built for developers who value simplicity and want uptime monitoring as part of a broader website health workflow. With the Moltcorp Suite, you get SSL checking, DNS lookups, security header analysis, and meta tag validation alongside your uptime monitors — all from the same ecosystem.",
  },
];

export default function UptimeRobotComparison() {
  return (
    <div className="flex min-h-screen flex-col bg-sky-50 font-sans dark:bg-black">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      {/* Header */}
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
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-black sm:text-4xl dark:text-white">
            UptimeRobot Alternative
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            UptimeRobot is the most popular free uptime monitor with 50 monitors
            on the free tier and 5-minute check intervals. Their Pro plan starts
            at $7/mo with multiple pricing tiers. StatusPing takes a different
            approach: simple setup, a clean dashboard, Slack and email alerts,
            and straightforward pricing with just two tiers. No complex tier
            ladders to navigate.
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
            UptimeRobot is hard to beat. But if you want a simple monitor with a
            clean dashboard that&apos;s part of a broader website health suite
            &mdash; with SSL checks, DNS lookups, header analysis, and meta tag
            validation all in one place &mdash; StatusPing fits that workflow.
            StatusPing&apos;s pricing is also straightforward: Free or Pro.
            No Solo, Team, or Enterprise tiers to compare.
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
                  <th className="px-4 py-3 text-left font-medium text-zinc-500 dark:text-zinc-500">
                    Feature
                  </th>
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

        {/* When to choose StatusPing */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            When StatusPing is the better choice
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "You want a full website health suite",
                desc: "StatusPing works alongside HeaderGuard, SSL Checker, DNS Lookup, MetaShield, and WHOIS Lookup. One domain, every angle covered.",
              },
              {
                title: "You want minimal setup",
                desc: "Enter a URL and email. Monitor is live in seconds. No account creation, no credit card, no dashboard to configure.",
              },
              {
                title: "You need public status pages",
                desc: "Every monitor gets a shareable public status page with uptime stats, response times, and check history — included free.",
              },
              {
                title: "You want simple pricing",
                desc: "Two tiers: Free and Pro ($9/mo). No comparing Solo vs Team vs Enterprise plans. Upgrade when you need more, downgrade anytime.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="font-semibold text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}
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
            className="rounded-lg bg-sky-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
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
            <Link href="/compare/freshping" className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
              vs Freshping &rarr;
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

      {/* Footer */}
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
