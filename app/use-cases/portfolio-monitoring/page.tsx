import Link from "next/link";
import type { Metadata } from "next";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Monitor Your Side Projects — StatusPing",
  description:
    "Free uptime monitoring for side projects, portfolios, and hobby apps. Get Slack alerts when your projects go down. 10 free monitors, no credit card required.",
  alternates: { canonical: `${baseUrl}/use-cases/portfolio-monitoring` },
  openGraph: {
    title: "Monitor Your Side Projects — StatusPing",
    description:
      "Free uptime monitoring for developers' side projects. Get alerts before users notice downtime.",
    type: "website",
    siteName: "StatusPing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monitor Your Side Projects — StatusPing",
    description:
      "Free uptime monitoring for side projects. 10 monitors, Slack alerts, no credit card.",
  },
};

const useCases = [
  {
    title: "Portfolio site uptime",
    description:
      "Your portfolio is your resume. If a recruiter clicks your link and gets a 502, that's an opportunity lost. StatusPing checks it every 15 minutes so you never miss a visitor to a dead site.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    title: "Hobby app health",
    description:
      "Side projects on free tiers tend to sleep, crash, or run out of database connections. StatusPing catches the failure so you can fix it on your schedule instead of finding out weeks later.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    ),
  },
  {
    title: "Demo apps for interviews",
    description:
      "Sharing a live demo in a job application? Make sure it's actually live. StatusPing lets you verify your demo URLs are responding before you hit send on that application.",
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
    title: "Multi-project dashboard",
    description:
      "Got 5 side projects scattered across Vercel, Railway, and Render? Monitor them all from one dashboard. See which ones are healthy, which are slow, and which quietly died three weeks ago.",
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
    question: "Is StatusPing really free for side projects?",
    answer:
      "Yes. The free tier includes 10 monitors with 15-minute checks, Slack/Discord/email alerts, and a public status page. No credit card, no trial expiration, no catch. It's designed for exactly this use case — developers who need basic monitoring without paying $20/month for enterprise features they'll never use.",
  },
  {
    question: "Can I monitor projects on Vercel, Railway, Render, or Heroku?",
    answer:
      "Yes — any platform that gives you a public URL. Just add the URL and StatusPing checks it. This includes Vercel preview URLs, Railway public endpoints, Render free tier apps, Heroku dynos, Fly.io apps, and any custom domain pointing to any host.",
  },
  {
    question: "My free tier app sleeps after inactivity. Will StatusPing keep it awake?",
    answer:
      "StatusPing checks every 15 minutes on the free tier, which will keep most platforms' free dynos awake (Heroku sleeps after 30 minutes of no traffic, for example). However, this is a side effect, not the primary purpose — StatusPing is a monitoring tool, not a keep-alive service.",
  },
  {
    question: "I have 12 side projects. Can I monitor them all?",
    answer:
      "The free tier covers 10 monitors. For 12 projects, you'd need Pro ($9/mo) which gives 30 monitors. Or prioritize — monitor the 10 you care most about (portfolio, active projects, anything with users) and skip the archived experiments.",
  },
  {
    question: "Can I share my status page with users of my side project?",
    answer:
      "Yes. Every StatusPing account gets a free public status page showing real-time status of your monitors. Share the link in your project's footer or README. It looks professional and shows users you care about reliability — even for a side project.",
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

export default function PortfolioMonitoringPage() {
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
              Monitor Your Side Projects
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
              You shipped it, shared the link, then forgot about it. Three weeks
              later, it&apos;s down and you had no idea. StatusPing watches your
              projects so you don&apos;t have to.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-zinc-400 dark:text-zinc-500">
              <span>Portfolio sites</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Hobby apps</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Demo projects</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Open source tools</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Monitor Your Projects Free
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
              Why developers need monitoring for side projects
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500 dark:text-zinc-400">
              Free tier hosting is great until it isn&apos;t. Dynos sleep,
              database connections expire, SSL certificates lapse, and deploy
              previews get cleaned up. Your project link on your resume, Twitter
              bio, or GitHub README should work when someone clicks it.
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
              Example: monitoring a developer&apos;s project portfolio
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500 dark:text-zinc-400">
              One dashboard for everything you&apos;ve shipped
            </p>
            <div className="mx-auto mt-6 max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
                <span className="text-sm font-semibold text-black dark:text-white">
                  My Projects
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                  7 of 10 free monitors used
                </span>
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {[
                  {
                    url: "janedoe.dev",
                    label: "Portfolio",
                    status: "up",
                    ms: 89,
                  },
                  {
                    url: "budgetapp.janedoe.dev",
                    label: "Budget tracker",
                    status: "up",
                    ms: 234,
                  },
                  {
                    url: "weather-cli.vercel.app",
                    label: "Weather app",
                    status: "up",
                    ms: 156,
                  },
                  {
                    url: "recipe-api.railway.app",
                    label: "Recipe API",
                    status: "down",
                    ms: null,
                  },
                  {
                    url: "markdown-preview.fly.dev",
                    label: "Markdown previewer",
                    status: "up",
                    ms: 312,
                  },
                  {
                    url: "janedoe.dev/blog",
                    label: "Blog",
                    status: "up",
                    ms: 178,
                  },
                  {
                    url: "chat-demo.render.com",
                    label: "Chat demo (interview)",
                    status: "up",
                    ms: 445,
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
              Start monitoring your projects in 30 seconds
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              10 free monitors. No credit card. No trial expiration.
            </p>
            <Link
              href="/register"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Monitor Your Projects Free
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
