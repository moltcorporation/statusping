import Link from "next/link";
import type { Metadata } from "next";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "SaaS Application Monitoring — StatusPing",
  description:
    "Monitor your SaaS app uptime for free. Track login pages, dashboards, and API endpoints. Get Slack alerts when your app goes down. 10 free monitors, no credit card.",
  alternates: { canonical: `${baseUrl}/use-cases/saas-monitoring` },
  openGraph: {
    title: "SaaS Application Monitoring — StatusPing",
    description:
      "Free uptime monitoring for SaaS applications. Get alerts when your app, dashboard, or API goes down.",
    type: "website",
    siteName: "StatusPing",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Application Monitoring — StatusPing",
    description:
      "Free SaaS uptime monitoring. Track your app, API, and login page availability.",
  },
};

const useCases = [
  {
    title: "Login page availability",
    description:
      "If your login page is down, no one can use your product. It's the single most important page to monitor — and it's often served by different infrastructure than your marketing site.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
      />
    ),
  },
  {
    title: "Dashboard and app performance",
    description:
      "Your users live in the dashboard. If it loads slowly or returns errors, they think your whole product is broken. Monitor your app's main routes and track response time trends.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 6h16M4 10h16M4 14h10M4 18h7"
      />
    ),
  },
  {
    title: "Public status page for customers",
    description:
      "Customers want to know if it's them or you. StatusPing gives you a free public status page so users can check your service status without flooding your support inbox.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    title: "Post-deployment verification",
    description:
      "Shipped a new release? StatusPing's ongoing checks act as a canary — if your latest deploy breaks something, you'll know within minutes instead of waiting for user reports.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    ),
  },
];

const faqs = [
  {
    question: "I already have logging and error tracking. Why do I need uptime monitoring?",
    answer:
      "Logging tools like Datadog or Sentry track errors inside your application. But they can't tell you when the application itself is unreachable — a DNS failure, load balancer crash, or cloud provider outage won't generate application logs. External uptime monitoring checks from outside your infrastructure, catching the failures your internal tools miss.",
  },
  {
    question: "Can I use the public status page with my own domain?",
    answer:
      "StatusPing provides a hosted status page at a unique URL that you can share with customers. It shows real-time status for all your monitors. The free tier includes the status page — no Pro upgrade needed. Custom domains for status pages are on our roadmap.",
  },
  {
    question: "How many SaaS endpoints should I monitor?",
    answer:
      "Start with the critical path: login page, main dashboard, primary API endpoint, and any webhook receivers. That's typically 4 monitors. Add important integrations (Stripe, email provider) with your remaining free monitors. You don't need to monitor every route — focus on the ones users hit most and the ones that make you money.",
  },
  {
    question: "Will StatusPing alert me about slow responses, not just downtime?",
    answer:
      "StatusPing tracks response latency for every check and displays trends on your dashboard. While alerts currently trigger on downtime (non-2xx responses or timeouts), the latency data helps you spot performance degradation before it becomes an outage. Pro users get 1-minute resolution latency data.",
  },
  {
    question: "Is StatusPing reliable enough to monitor a production SaaS?",
    answer:
      "StatusPing runs on distributed infrastructure and confirms downtime with retry checks before alerting to minimize false positives. For a bootstrapped SaaS or small team, it's a practical choice — you get 10 free monitors with Slack/Discord/email alerts, which covers the essentials. Enterprise teams often pair it with their existing observability stack as an external check layer.",
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

export default function SaasMonitoringPage() {
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
              SaaS Application Monitoring
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
              Your customers expect your app to be available 24/7. When it goes
              down, they churn. StatusPing monitors your login, dashboard, and
              API so you fix issues before users notice.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-zinc-400 dark:text-zinc-500">
              <span>Login pages</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Dashboards</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>API endpoints</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Public status pages</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Monitor Your SaaS Free
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
              Why SaaS founders need external uptime monitoring
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500 dark:text-zinc-400">
              Internal health checks run inside your infrastructure — they
              can&apos;t detect DNS failures, CDN outages, or network-level
              issues. External monitoring checks your app the way your customers
              experience it: from the outside. That&apos;s the only view that
              matters.
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
              Example: monitoring a B2B SaaS app
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500 dark:text-zinc-400">
              Cover your critical user paths with 5-7 monitors
            </p>
            <div className="mx-auto mt-6 max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
                <span className="text-sm font-semibold text-black dark:text-white">
                  SaaS Monitors
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                  6 of 10 free monitors used
                </span>
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {[
                  {
                    url: "app.mysaas.com/login",
                    label: "Login page",
                    status: "up",
                    ms: 156,
                  },
                  {
                    url: "app.mysaas.com/dashboard",
                    label: "Dashboard",
                    status: "up",
                    ms: 289,
                  },
                  {
                    url: "api.mysaas.com/v1/health",
                    label: "API health check",
                    status: "up",
                    ms: 34,
                  },
                  {
                    url: "mysaas.com",
                    label: "Marketing site",
                    status: "up",
                    ms: 112,
                  },
                  {
                    url: "webhooks.mysaas.com/stripe",
                    label: "Stripe webhook",
                    status: "up",
                    ms: 28,
                  },
                  {
                    url: "status.mysaas.com",
                    label: "Status page",
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
              Start monitoring your SaaS in 30 seconds
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              10 free monitors. No credit card. No trial expiration.
            </p>
            <Link
              href="/register"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Monitor Your SaaS Free
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
