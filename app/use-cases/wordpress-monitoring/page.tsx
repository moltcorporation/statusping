import Link from "next/link";
import type { Metadata } from "next";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "WordPress Uptime Monitoring — StatusPing",
  description:
    "Monitor your WordPress site uptime for free. Get Slack, Discord, or email alerts when your site goes down. 10 free monitors, 15-minute checks, no credit card required.",
  alternates: { canonical: `${baseUrl}/use-cases/wordpress-monitoring` },
  openGraph: {
    title: "WordPress Uptime Monitoring — StatusPing",
    description:
      "Free uptime monitoring for WordPress sites. Get instant alerts when your site goes down.",
    type: "website",
    siteName: "StatusPing",
  },
  twitter: {
    card: "summary_large_image",
    title: "WordPress Uptime Monitoring — StatusPing",
    description:
      "Free uptime monitoring for WordPress sites. Slack alerts in seconds.",
  },
};

const useCases = [
  {
    title: "Plugin update breakage",
    description:
      "WordPress plugins update frequently — and sometimes break your site. StatusPing catches the 500 error before your visitors do, so you can roll back fast.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    title: "Hosting downtime",
    description:
      "Shared hosting goes down more than you think. StatusPing monitors your site every 15 minutes (or every minute on Pro) and alerts you before your host even acknowledges the issue.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 12h14M12 5l7 7-7 7"
      />
    ),
  },
  {
    title: "WooCommerce checkout",
    description:
      "If your WooCommerce checkout page returns errors, you're losing sales with every minute of downtime. Monitor /checkout separately from your homepage to catch payment-specific failures.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
      />
    ),
  },
  {
    title: "SSL certificate expiry",
    description:
      "An expired SSL certificate shows a scary browser warning that kills trust instantly. StatusPing detects HTTPS failures so you can renew before visitors see the red padlock.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    ),
  },
];

const faqs = [
  {
    question: "Can StatusPing monitor any WordPress site?",
    answer:
      "Yes. StatusPing monitors any URL that returns an HTTP response — WordPress.com, self-hosted WordPress on any host, WooCommerce stores, multisite installations. Just add your site URL and we'll start checking it every 15 minutes on the free plan.",
  },
  {
    question: "How will I know when my WordPress site goes down?",
    answer:
      "StatusPing sends instant alerts via Slack, Discord, or email when your site stops responding or returns an error code (like 500 or 503). Free tier includes all three alert channels — no paid upgrade needed for notifications.",
  },
  {
    question: "Should I monitor my wp-admin separately?",
    answer:
      "It depends. If your admin panel is on the same server, monitoring the public site is usually enough. But if you use a separate admin URL or your login page has different caching, adding it as a second monitor catches admin-specific issues. You have 10 free monitors — use them.",
  },
  {
    question: "Does StatusPing work with caching plugins like WP Rocket?",
    answer:
      "Yes. StatusPing checks the HTTP response from your server, which works with any caching layer. In fact, caching plugins can mask slow server responses — if your cache expires and the origin is slow, StatusPing's latency tracking will catch the spike.",
  },
  {
    question: "How is this different from my hosting provider's uptime guarantee?",
    answer:
      "Your host promises 99.9% uptime but measures from their infrastructure, not from a visitor's perspective. StatusPing checks from external servers the way a real visitor would. We've seen hosts report 100% uptime while sites returned 503 errors to actual users.",
  },
];

const faqJsonLd = {
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

export default function WordPressMonitoringPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
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
            href="/login"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Sign in
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 pb-24 pt-12">
        <div className="w-full max-w-3xl">
          {/* Hero */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
              Use Case
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-white">
              WordPress Uptime Monitoring
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
              Your WordPress site can go down from a bad plugin update, hosting
              hiccup, or expired SSL — and you won&apos;t know until customers
              tell you. StatusPing watches it for you.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-zinc-400 dark:text-zinc-500">
              <span>WordPress.com &amp; self-hosted</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>WooCommerce stores</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Multisite networks</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Staging environments</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Monitor Your WordPress Site Free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex w-full items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 sm:w-auto dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              See Pricing
            </Link>
          </div>

          {/* Why monitor */}
          <div className="mt-16">
            <h2 className="text-center text-xl font-bold text-black dark:text-white">
              Why WordPress sites need uptime monitoring
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500 dark:text-zinc-400">
              WordPress powers 43% of the web, but its plugin ecosystem makes
              downtime common. Auto-updates, PHP version changes, database
              connection limits, and hosting outages all cause failures that look
              fine in wp-admin but break the public site.
            </p>
          </div>

          {/* Use case cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="flex gap-4 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {uc.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-black dark:text-white">
                    {uc.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {uc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Example monitors */}
          <div className="mt-16">
            <h2 className="text-center text-xl font-bold text-black dark:text-white">
              Example: monitoring a WordPress + WooCommerce site
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500 dark:text-zinc-400">
              A typical WordPress setup uses 3-5 of your 10 free monitors
            </p>
            <div className="mx-auto mt-6 max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
                <span className="text-sm font-semibold text-black dark:text-white">
                  WordPress Monitors
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                  4 of 10 free monitors used
                </span>
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {[
                  {
                    url: "mystore.com",
                    label: "Homepage",
                    status: "up",
                    ms: 245,
                  },
                  {
                    url: "mystore.com/shop",
                    label: "Shop page",
                    status: "up",
                    ms: 380,
                  },
                  {
                    url: "mystore.com/checkout",
                    label: "Checkout",
                    status: "down",
                    ms: null,
                  },
                  {
                    url: "mystore.com/wp-json/wc/v3",
                    label: "WooCommerce API",
                    status: "up",
                    ms: 192,
                  },
                ].map((m) => (
                  <div
                    key={m.url}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-block h-2.5 w-2.5 rounded-full ${
                          m.status === "up" ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <div>
                        <span className="block text-sm font-medium text-black dark:text-white">
                          {m.label}
                        </span>
                        <span className="block text-xs text-zinc-400 dark:text-zinc-500">
                          {m.url}
                        </span>
                      </div>
                    </div>
                    <div>
                      {m.ms !== null ? (
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">
                          {m.ms}ms
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-red-500">
                          timeout
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-center text-xl font-bold text-black dark:text-white">
              Frequently asked questions
            </h2>
            <div className="mx-auto mt-6 max-w-2xl divide-y divide-zinc-200 dark:divide-zinc-800">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group py-4 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-black dark:text-white">
                    {faq.question}
                    <svg
                      className="ml-2 h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-xl font-bold text-black dark:text-white">
              Start monitoring your WordPress site in 30 seconds
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              10 free monitors. No credit card. No trial expiration.
            </p>
            <Link
              href="/register"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Monitor WordPress Free
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-6 px-6 py-8">
        <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-600">
          <Link
            href="/privacy"
            className="hover:text-zinc-600 dark:hover:text-zinc-400"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-zinc-600 dark:hover:text-zinc-400"
          >
            Terms
          </Link>
          <Link
            href="/use-cases/ai-agent-monitoring"
            className="hover:text-zinc-600 dark:hover:text-zinc-400"
          >
            AI Agent Monitoring
          </Link>
          <span>
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
        </div>
      </footer>
    </div>
  );
}
