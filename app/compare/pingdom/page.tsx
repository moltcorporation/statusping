import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pingdom Alternative — Simple, Affordable Uptime Monitoring | StatusPing",
  description:
    "Looking for a Pingdom alternative? StatusPing offers simple uptime monitoring at $9/mo flat — no per-check pricing. Free tier included. Slack alerts, status pages, and uptime badges.",
  openGraph: {
    title: "Pingdom Alternative — StatusPing",
    description:
      "Simple uptime monitoring without the enterprise price tag. $9/mo flat vs Pingdom's per-check pricing. Free tier available.",
    type: "website",
    siteName: "StatusPing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pingdom Alternative — StatusPing",
    description:
      "Simple uptime monitoring at $9/mo flat. No per-check pricing, no complexity.",
  },
};

const features = [
  {
    statuspng: "Free tier with hourly checks, no credit card",
    competitor: "No free tier — starts at $15/mo for 10 monitors",
  },
  {
    statuspng: "Pro: $9/mo flat for 5-minute checks",
    competitor: "Starts at $15/mo, scales to $85/mo+ with more checks",
  },
  {
    statuspng: "Simple pricing — one plan, everything included",
    competitor: "Per-check pricing adds up fast as you scale",
  },
  {
    statuspng: "Slack alerts on down/recovery transitions",
    competitor: "Email, SMS, Slack, webhooks, and integrations",
  },
  {
    statuspng: "Public status page with shareable URL",
    competitor: "Status pages available (additional cost on some plans)",
  },
  {
    statuspng: "Embeddable uptime badge (Markdown & HTML)",
    competitor: "Banners and widgets available",
  },
  {
    statuspng: "Part of the Moltcorp suite (SSL, DNS, Headers, Meta, WHOIS)",
    competitor: "Standalone monitoring tool (SolarWinds ecosystem)",
  },
  {
    statuspng: "Set up in 30 seconds — enter URL and go",
    competitor: "Full-featured but more complex onboarding",
  },
];

const faqs = [
  {
    q: "Is StatusPing really a good alternative to Pingdom?",
    a: "For indie developers and small teams who need straightforward uptime monitoring, yes. StatusPing covers the essentials — HTTP checks, Slack alerts, public status pages, and uptime badges — at a fraction of Pingdom's cost. If you need enterprise features like transaction monitoring or 60+ probe locations, Pingdom is the better choice.",
  },
  {
    q: "How does pricing compare between StatusPing and Pingdom?",
    a: "StatusPing offers a free tier with hourly checks and a Pro plan at $9/mo flat. Pingdom has no free tier and starts at $15/mo for 10 synthetic monitors, with costs scaling to $85/mo or more as you add checks. For small teams, StatusPing is significantly cheaper.",
  },
  {
    q: "What can Pingdom do that StatusPing can't?",
    a: "Pingdom offers transaction monitoring (multi-step scripts), Real User Monitoring (RUM), over 60 global probe locations, and deep SolarWinds integrations for enterprise observability. If you need those capabilities, Pingdom is worth the premium.",
  },
  {
    q: "Does StatusPing support alerts other than Slack?",
    a: "Currently, StatusPing supports Slack alerts on down and recovery transitions. Pingdom supports email, SMS, Slack, PagerDuty, webhooks, and many other notification channels. If you rely on SMS or PagerDuty, Pingdom has you covered.",
  },
  {
    q: "What is the Moltcorp Suite?",
    a: "StatusPing is part of a family of free website health tools built by Moltcorp: SSL Certificate Checker, DNS Lookup, HeaderGuard (security headers), MetaShield (meta tags), and WHOIS Lookup. Together they give you a complete picture of your site's health from one ecosystem.",
  },
];

export default function PingdomComparison() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

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
            Pingdom Alternative
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Pingdom is one of the oldest uptime monitoring services around, but
            its per-check pricing and SolarWinds enterprise focus can be
            overkill for indie developers and small teams. StatusPing is a
            simpler, more affordable alternative — $9/mo flat for everything,
            with a free tier to get started. No credit card. No complex
            dashboards.
          </p>
        </div>

        {/* Honest comparison */}
        <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            An honest comparison
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Pingdom has been around since 2007 and earned its reputation.
            It offers transaction monitoring, Real User Monitoring (RUM), 60+
            probe locations worldwide, and deep integrations across the
            SolarWinds platform. If you need enterprise-grade observability or
            multi-step transaction scripts, Pingdom delivers. But if you&apos;re
            an indie dev or small team that just needs to know when your site
            goes down — without paying $15+/mo per service — StatusPing gets
            the job done at a fraction of the cost, and it&apos;s part of a
            broader website health suite.
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            StatusPing vs Pingdom
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                    StatusPing
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-zinc-500 dark:text-zinc-500">
                    Pingdom
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

        {/* When Pingdom is better */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            When Pingdom is the better choice
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "You need transaction monitoring",
                desc: "Pingdom can script multi-step user flows — login, add to cart, checkout — and alert if any step fails. StatusPing does HTTP checks only.",
              },
              {
                title: "You need 60+ global probe locations",
                desc: "Pingdom monitors from dozens of locations worldwide for geo-specific latency data. StatusPing checks from a single region.",
              },
              {
                title: "You need Real User Monitoring",
                desc: "Pingdom RUM tracks actual visitor performance with page load metrics. StatusPing focuses on synthetic uptime checks.",
              },
              {
                title: "You're in the SolarWinds ecosystem",
                desc: "If your team already uses SolarWinds for infrastructure observability, Pingdom integrates seamlessly with that stack.",
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

        {/* When StatusPing is better */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            When StatusPing is the better choice
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "You want simple, flat pricing",
                desc: "StatusPing is $9/mo for everything. Pingdom starts at $15/mo and costs scale with every check you add. No surprises with StatusPing.",
              },
              {
                title: "You want a full website health suite",
                desc: "StatusPing works alongside HeaderGuard, SSL Checker, DNS Lookup, MetaShield, and WHOIS Lookup. One ecosystem, every angle.",
              },
              {
                title: "You want minimal setup",
                desc: "Enter a URL and email. That's it. Monitor is live in seconds. No account creation, no credit card.",
              },
              {
                title: "You need public status pages & badges",
                desc: "Every monitor gets a shareable public status page and an embeddable uptime badge for your README or website.",
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

        {/* FAQ */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="font-semibold text-black dark:text-white">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{faq.a}</p>
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
