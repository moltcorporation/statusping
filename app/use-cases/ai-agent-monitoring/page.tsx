import Link from "next/link";
import type { Metadata } from "next";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Monitor Your AI Agent Uptime — StatusPing",
  description:
    "Free uptime monitoring for AI agent API endpoints, webhooks, and dashboards. Get Slack alerts when your agents go down. 10 free monitors, no credit card.",
  alternates: { canonical: `${baseUrl}/use-cases/ai-agent-monitoring` },
  openGraph: {
    title: "Monitor Your AI Agent Uptime — StatusPing",
    description:
      "Free uptime monitoring for AI agent API endpoints, webhooks, and dashboards. Get Slack alerts when your agents go down.",
    type: "website",
    siteName: "StatusPing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monitor Your AI Agent Uptime — StatusPing",
    description:
      "Free uptime monitoring for AI agent API endpoints, webhooks, and dashboards. Slack alerts in seconds.",
  },
};

const useCases = [
  {
    title: "API endpoint health",
    description:
      "Monitor your agent's API endpoints — REST, GraphQL, or webhook receivers. Know within minutes when an endpoint stops responding.",
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
    title: "Agent dashboard uptime",
    description:
      "Your users check dashboards to see agent status. If the dashboard is down, they assume the agent is too. Monitor it.",
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
    title: "Webhook reliability",
    description:
      "Agents depend on webhooks for triggers and callbacks. StatusPing checks that your webhook endpoints are reachable before a missed event costs you.",
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
    title: "Multi-agent orchestration",
    description:
      "Running agents across multiple services? Monitor each endpoint from one dashboard. See which piece of your stack went down first.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    ),
  },
];

const faqs = [
  {
    question: "Can StatusPing monitor AI agent API endpoints?",
    answer:
      "Yes. StatusPing monitors any HTTP/HTTPS URL — including REST APIs, GraphQL endpoints, webhook receivers, and agent dashboards. Add your endpoint URL, and we'll check it every 15 minutes (free) or every 5 minutes (Pro) and alert you on Slack, Discord, or email when it stops responding.",
  },
  {
    question: "How is this different from monitoring a regular website?",
    answer:
      "It's the same technology — HTTP uptime checks. The difference is what you monitor. Instead of a marketing site, you're monitoring the API endpoints and dashboards that your AI agents depend on. StatusPing checks response codes and latency, which is exactly what matters for agent infrastructure.",
  },
  {
    question: "Does StatusPing track token usage or task success rates?",
    answer:
      "No. StatusPing is focused on uptime and availability — is your endpoint responding, and how fast? For token usage, cost tracking, or task-level observability, you'd pair StatusPing with a dedicated agent analytics tool. We handle the 'is it up?' layer.",
  },
  {
    question:
      "I run agents on OpenClaw / Polsia / custom infrastructure. Will this work?",
    answer:
      "If your agent exposes an HTTP endpoint (API, dashboard, health check), StatusPing can monitor it. It doesn't matter what platform your agent runs on — we just need a URL to ping.",
  },
  {
    question: "How many agent endpoints can I monitor for free?",
    answer:
      "The free tier includes 10 monitors with 15-minute checks, Slack/Discord/email alerts, and a public status page. No credit card required. Pro ($9/mo) gives you 30 monitors with 1-minute checks.",
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

export default function AgentMonitoringPage() {
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
              Monitor Your AI Agent Uptime
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
              Your agents run 24/7. You shouldn&apos;t have to. Get alerted on
              Slack or Discord the moment an endpoint goes down.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-zinc-400 dark:text-zinc-500">
              <span>API endpoints</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Webhook health</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Agent dashboards</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Multi-agent stacks</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Start Monitoring Free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex w-full items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 sm:w-auto dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              See Pricing
            </Link>
          </div>

          {/* Why monitor agents */}
          <div className="mt-16">
            <h2 className="text-center text-xl font-bold text-black dark:text-white">
              Why your AI agents need uptime monitoring
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500 dark:text-zinc-400">
              AI agents fail silently. An API endpoint returns 500, a webhook
              stops accepting requests, a dashboard goes blank — and nobody
              notices until a user reports it. StatusPing catches these failures
              in minutes, not hours.
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
              Example: monitoring an AI agent stack
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500 dark:text-zinc-400">
              A typical setup uses 4-6 of your 10 free monitors
            </p>
            <div className="mx-auto mt-6 max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
                <span className="text-sm font-semibold text-black dark:text-white">
                  Agent Monitors
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                  5 of 10 free monitors used
                </span>
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {[
                  {
                    url: "api.myagent.io/health",
                    label: "Agent API",
                    status: "up",
                    ms: 38,
                  },
                  {
                    url: "dashboard.myagent.io",
                    label: "Dashboard",
                    status: "up",
                    ms: 112,
                  },
                  {
                    url: "webhooks.myagent.io/inbound",
                    label: "Webhook receiver",
                    status: "up",
                    ms: 45,
                  },
                  {
                    url: "myagent.io",
                    label: "Marketing site",
                    status: "up",
                    ms: 89,
                  },
                  {
                    url: "api.myagent.io/v2/tasks",
                    label: "Task queue",
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

          {/* Comparison strip */}
          <div className="mt-16">
            <h2 className="text-center text-xl font-bold text-black dark:text-white">
              StatusPing vs dedicated agent monitoring
            </h2>
            <div className="mx-auto mt-6 max-w-lg overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                    <th className="px-5 py-3 font-medium text-zinc-500 dark:text-zinc-400" />
                    <th className="px-5 py-3 font-semibold text-black dark:text-white">
                      StatusPing
                    </th>
                    <th className="px-5 py-3 font-medium text-zinc-500 dark:text-zinc-400">
                      Typical agent platforms
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 bg-white dark:divide-zinc-800 dark:bg-zinc-950">
                  {[
                    ["Uptime checks", "Yes (free)", "$19-49/mo+"],
                    ["Check interval", "15 min / 1 min (Pro)", "Varies"],
                    ["Slack/Discord alerts", "Included free", "Usually paid"],
                    ["Public status page", "Included free", "Rare"],
                    ["Token/cost tracking", "No", "Yes"],
                    ["Task-level logs", "No", "Yes"],
                    ["Price", "Free / $9 mo", "$19-49/mo+"],
                  ].map(([feature, sp, other]) => (
                    <tr key={feature}>
                      <td className="px-5 py-3 text-zinc-600 dark:text-zinc-300">
                        {feature}
                      </td>
                      <td className="px-5 py-3 font-medium text-black dark:text-white">
                        {sp}
                      </td>
                      <td className="px-5 py-3 text-zinc-500 dark:text-zinc-400">
                        {other}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mx-auto mt-4 max-w-lg text-center text-xs text-zinc-400 dark:text-zinc-500">
              StatusPing handles the &ldquo;is it up?&rdquo; layer. Pair it with
              agent-specific tools for task-level observability.
            </p>
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
              Start monitoring your agents in 30 seconds
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              10 free monitors. No credit card. No trial expiration.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Monitor Your Agents Free
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-6 px-6 py-8">
        <div className="w-full max-w-2xl">
          <p className="mb-3 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">
            More from Moltcorp
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <a
              href="https://qr-code-tool-moltcorporation.vercel.app?utm_source=statuspingsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-3 py-2.5 text-center transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-200">
                OneQR
              </span>
              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">
                Free QR code generator
              </span>
            </a>
            <a
              href="https://federal-contract-tracker-moltcorporation.vercel.app?utm_source=statuspingsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-3 py-2.5 text-center transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-200">
                GovScout
              </span>
              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">
                Federal contract tracking
              </span>
            </a>
            <a
              href="https://trades-quoting-tool-moltcorporation.vercel.app?utm_source=statuspingsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-3 py-2.5 text-center transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-200">
                TradeQuote
              </span>
              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">
                Quoting for tradespeople
              </span>
            </a>
            <a
              href="https://breeder-platform-moltcorporation.vercel.app?utm_source=statuspingsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-3 py-2.5 text-center transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-200">
                PawPage
              </span>
              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">
                Breeder waitlist platform
              </span>
            </a>
          </div>
        </div>
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
            href="/feedback"
            className="hover:text-zinc-600 dark:hover:text-zinc-400"
          >
            Feedback
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
