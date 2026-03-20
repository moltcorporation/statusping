import Link from "next/link";
import type { Metadata } from "next";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "E-commerce Store Uptime Monitoring — StatusPing",
  description:
    "Monitor your online store uptime for free. Get instant alerts when checkout, product pages, or payment processing go down. 10 free monitors, no credit card required.",
  alternates: { canonical: `${baseUrl}/use-cases/ecommerce-monitoring` },
  openGraph: {
    title: "E-commerce Store Uptime Monitoring — StatusPing",
    description:
      "Free uptime monitoring for online stores. Get alerts when checkout or product pages go down.",
    type: "website",
    siteName: "StatusPing",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce Store Uptime Monitoring — StatusPing",
    description:
      "Free uptime monitoring for e-commerce. Never miss a checkout failure again.",
  },
};

const useCases = [
  {
    title: "Checkout page failures",
    description:
      "A down checkout page means zero revenue. StatusPing monitors your /checkout or /cart endpoint separately from your homepage — because your store can look fine while the checkout is broken.",
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
    title: "Payment gateway health",
    description:
      "Stripe, PayPal, or Square going down affects your store even when your server is fine. Monitor their status endpoints to know whether the problem is your code or your payment provider.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    ),
  },
  {
    title: "Product catalog availability",
    description:
      "Database connection limits, CDN failures, or search index crashes can make your product pages return errors while the homepage stays cached. Monitor deep pages, not just the root URL.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    ),
  },
  {
    title: "Flash sale traffic spikes",
    description:
      "Running a promotion? Your server might buckle under the load. StatusPing detects the moment your site starts returning errors or response times spike past acceptable levels.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
];

const faqs = [
  {
    question: "How much does downtime actually cost an online store?",
    answer:
      "Industry data shows the average e-commerce site loses $5,600 per minute of downtime (Gartner). For a small store doing $10K/month, even 30 minutes of undetected checkout downtime during peak hours could mean $200+ in lost sales. StatusPing's free tier catches these failures within 15 minutes.",
  },
  {
    question: "Can I monitor my Shopify or BigCommerce store?",
    answer:
      "Yes. StatusPing monitors any URL — Shopify, BigCommerce, WooCommerce, Magento, custom builds. Add your store URL and we'll check it every 15 minutes (free) or every minute (Pro). You can also monitor specific pages like /collections, /cart, or /checkout.",
  },
  {
    question: "Should I monitor my store differently during sales events?",
    answer:
      "Yes. Before a flash sale or holiday promotion, consider upgrading to Pro for 1-minute checks. Add monitors for your highest-traffic product pages and the checkout flow specifically. You can always downgrade after the event.",
  },
  {
    question: "Can StatusPing check if my product search is working?",
    answer:
      "StatusPing checks HTTP responses, so it can monitor the URL of your search page (e.g., /search?q=test). If the search endpoint returns an error or times out, you'll get an alert. It won't validate search result quality, but it catches the common case of search infrastructure going down entirely.",
  },
  {
    question: "Do I need monitoring if my host promises 99.9% uptime?",
    answer:
      "99.9% uptime still means 8.7 hours of downtime per year. And hosting uptime guarantees measure server availability, not your application's health. A crashed Node process, exhausted database pool, or bad deployment can take your store down while the server itself reports healthy. External monitoring catches what infrastructure monitoring misses.",
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

export default function EcommerceMonitoringPage() {
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
              E-commerce Store Uptime Monitoring
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
              Every minute your checkout is down, you&apos;re losing sales.
              StatusPing monitors your store&apos;s critical pages and alerts you
              before customers give up and shop elsewhere.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-zinc-400 dark:text-zinc-500">
              <span>Shopify &amp; WooCommerce</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Checkout monitoring</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Payment gateways</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Product pages</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Monitor Your Store Free
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
              Why online stores need uptime monitoring
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500 dark:text-zinc-400">
              Unlike a blog or portfolio, e-commerce downtime has a direct dollar
              cost. A broken checkout during peak hours can lose more revenue in
              30 minutes than your hosting costs for the month. External
              monitoring is insurance against silent failures.
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
              Example: monitoring an online store
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500 dark:text-zinc-400">
              Monitor the pages that make you money, not just the homepage
            </p>
            <div className="mx-auto mt-6 max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
                <span className="text-sm font-semibold text-black dark:text-white">
                  Store Monitors
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                  5 of 10 free monitors used
                </span>
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {[
                  {
                    url: "myshop.com",
                    label: "Homepage",
                    status: "up",
                    ms: 189,
                  },
                  {
                    url: "myshop.com/products/best-seller",
                    label: "Top product page",
                    status: "up",
                    ms: 312,
                  },
                  {
                    url: "myshop.com/cart",
                    label: "Shopping cart",
                    status: "up",
                    ms: 245,
                  },
                  {
                    url: "myshop.com/checkout",
                    label: "Checkout",
                    status: "down",
                    ms: null,
                  },
                  {
                    url: "api.stripe.com/v1",
                    label: "Stripe (payment dep)",
                    status: "up",
                    ms: 67,
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
              Start monitoring your store in 30 seconds
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              10 free monitors. No credit card. No trial expiration.
            </p>
            <Link
              href="/register"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Monitor Your Store Free
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
