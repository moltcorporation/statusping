import Link from "next/link";
import type { Metadata } from "next";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "API Endpoint Monitoring — StatusPing",
  description:
    "Monitor your API endpoints for free. Get instant Slack, Discord, or email alerts when an endpoint goes down. Track response times, detect 5xx errors. 10 free monitors.",
  alternates: { canonical: `${baseUrl}/use-cases/api-monitoring` },
  openGraph: {
    title: "API Endpoint Monitoring — StatusPing",
    description:
      "Free uptime monitoring for REST APIs, GraphQL endpoints, and webhooks. Instant alerts when endpoints fail.",
    type: "website",
    siteName: "StatusPing",
  },
  twitter: {
    card: "summary_large_image",
    title: "API Endpoint Monitoring — StatusPing",
    description:
      "Free API uptime monitoring. Track response times and get Slack alerts on failures.",
  },
};

const useCases = [
  {
    title: "REST API health checks",
    description:
      "Monitor your /health or /status endpoints. StatusPing checks the HTTP response code and latency — if your API starts returning 500s or response times spike, you'll know in minutes.",
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
    title: "Third-party API dependencies",
    description:
      "Your app depends on Stripe, Twilio, SendGrid, or other APIs. Monitor their status endpoints alongside yours so you know whether the problem is on your side or theirs.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    ),
  },
  {
    title: "Webhook endpoint availability",
    description:
      "Webhooks fail silently. If your receiver endpoint goes down, you miss events with no retry. StatusPing catches endpoint failures before critical webhook deliveries are lost.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
  {
    title: "Multi-environment monitoring",
    description:
      "Monitor staging, production, and canary endpoints from one dashboard. Compare response times across environments to catch performance regressions before they ship.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 6h16M4 10h16M4 14h10M4 18h7"
      />
    ),
  },
];

const faqs = [
  {
    question: "Can StatusPing monitor authenticated API endpoints?",
    answer:
      "StatusPing checks HTTP/HTTPS URLs and verifies the response code. For public health check endpoints, this works out of the box. For authenticated endpoints, you can use a public /health route that doesn't require auth — this is the standard pattern for uptime monitoring.",
  },
  {
    question: "What response codes does StatusPing treat as 'down'?",
    answer:
      "Any non-2xx response (like 500, 502, 503, 504) or a connection timeout is flagged as down. StatusPing then retries to confirm before sending an alert, reducing false positives from transient network issues.",
  },
  {
    question: "Can I monitor GraphQL endpoints?",
    answer:
      "Yes. StatusPing monitors the HTTP layer — it checks if your GraphQL endpoint URL returns a 200 response. It doesn't execute GraphQL queries, but it will catch server crashes, deployment failures, and infrastructure outages that affect your GraphQL server.",
  },
  {
    question: "How fast will I get an alert when my API goes down?",
    answer:
      "On the free tier, checks run every 15 minutes, so you'll know within 15 minutes. Pro ($9/mo) checks every minute. Alerts go to Slack, Discord, or email — whichever you configure. Most alerts arrive within seconds of detection.",
  },
  {
    question: "Can I track API response time trends?",
    answer:
      "Yes. StatusPing logs response latency for every check. You can see if your API is getting slower over time — useful for catching performance degradation before it becomes downtime. Latency data is available on your dashboard.",
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

export default function ApiMonitoringPage() {
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
              API Endpoint Monitoring
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
              Your users hit your API thousands of times a day. When an endpoint
              goes down, every failed request is a frustrated user. Know about it
              before they do.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-zinc-400 dark:text-zinc-500">
              <span>REST APIs</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>GraphQL endpoints</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Webhooks</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Health checks</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Monitor Your API Free
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
              Why API endpoints need dedicated monitoring
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500 dark:text-zinc-400">
              Your homepage might be up while your API is down. Load balancer
              health checks test the wrong endpoint. Internal monitoring misses
              network-level failures. External monitoring from StatusPing sees
              what your users see.
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
              Example: monitoring a SaaS API stack
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500 dark:text-zinc-400">
              Monitor your own endpoints and your critical dependencies
            </p>
            <div className="mx-auto mt-6 max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
                <span className="text-sm font-semibold text-black dark:text-white">
                  API Monitors
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                  6 of 10 free monitors used
                </span>
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {[
                  {
                    url: "api.myapp.com/health",
                    label: "Primary API",
                    status: "up",
                    ms: 42,
                  },
                  {
                    url: "api.myapp.com/v2/users",
                    label: "Users endpoint",
                    status: "up",
                    ms: 128,
                  },
                  {
                    url: "webhooks.myapp.com/stripe",
                    label: "Stripe webhook",
                    status: "up",
                    ms: 35,
                  },
                  {
                    url: "api.stripe.com/v1",
                    label: "Stripe API (dep)",
                    status: "up",
                    ms: 89,
                  },
                  {
                    url: "api.sendgrid.com/v3",
                    label: "SendGrid (dep)",
                    status: "up",
                    ms: 156,
                  },
                  {
                    url: "staging.myapp.com/health",
                    label: "Staging API",
                    status: "down",
                    ms: null,
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
              Start monitoring your API in 30 seconds
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              10 free monitors. No credit card. No trial expiration.
            </p>
            <Link
              href="/register"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Monitor Your API Free
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
