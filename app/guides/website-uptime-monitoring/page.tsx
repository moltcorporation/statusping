import Link from "next/link";

const steps = [
  {
    title: "Decide what to monitor",
    body: "Start with your most important URLs — your homepage, login page, API endpoints, and any page that generates revenue. Most sites need 2–5 monitors. Don't try to monitor every page; focus on the critical paths your users depend on. If your checkout page goes down, that's more urgent than a blog post returning a 404.",
  },
  {
    title: "Choose your check frequency",
    body: "Check frequency determines how quickly you'll know about an outage. Hourly checks are fine for personal projects and blogs — you'll know within an hour. For SaaS products, APIs, and e-commerce sites, 5-minute checks mean you'll catch issues before most users notice. The tradeoff is cost: faster checks use more resources, which is why most free tiers use hourly intervals.",
  },
  {
    title: "Set up alerts",
    body: "Monitoring is useless without alerts. At minimum, set up email alerts so you get notified when a site goes down. For faster response, add Slack or webhook alerts that notify your team channel instantly. Good monitoring tools also alert you when a site comes back up, so you know the issue is resolved without checking manually.",
  },
  {
    title: "Understand what a 'down' check means",
    body: "A single failed check doesn't necessarily mean your site is down — it could be a network blip, a timeout, or a temporary server hiccup. Good monitoring tools confirm downtime with a second check before alerting you to reduce false positives. When you do get an alert, check the HTTP status code: a 500 means your server crashed, a 503 means it's overloaded, and a timeout means it's not responding at all.",
  },
  {
    title: "Track your uptime over time",
    body: "Uptime isn't just about catching outages — it's about understanding your reliability trend. 99.9% uptime sounds great until you realize that's 8.7 hours of downtime per year. Track your uptime percentage monthly. If it's trending down, you have an infrastructure problem to address. Use your monitoring dashboard to spot patterns: do outages happen at specific times, after deployments, or during traffic spikes?",
  },
  {
    title: "Monitor from outside your infrastructure",
    body: "Always use an external monitoring service, not something running on the same server as your application. If your server goes down, your self-hosted monitor goes down with it. External monitors check your site from independent infrastructure, so they catch the exact same outages your users experience. This is why hosted monitoring services exist.",
  },
];

const faqs = [
  {
    question: "What is website uptime monitoring?",
    answer:
      "Uptime monitoring is a service that periodically checks whether your website is accessible and responding correctly. It sends HTTP requests to your URLs at regular intervals (every 1–60 minutes) and alerts you via email, Slack, or webhook if your site goes down or returns an error. The goal is to catch outages before your users report them.",
  },
  {
    question: "How often should I check my website's uptime?",
    answer:
      "It depends on how critical your site is. For personal sites and blogs, hourly checks are sufficient. For SaaS products and e-commerce sites, 5-minute checks catch most outages before users notice. For high-traffic APIs or payment systems, 1-minute checks are standard. StatusPing offers hourly checks on the free tier and 5-minute checks on Pro ($9/month).",
  },
  {
    question: "What's a good uptime percentage?",
    answer:
      "99.9% uptime (often called 'three nines') means about 8.7 hours of downtime per year, or about 43 minutes per month. Most modern hosting providers target 99.95% or higher. If your uptime is below 99.5%, you likely have a systemic issue worth investigating. Track your monthly uptime percentage to spot trends before they become problems.",
  },
  {
    question: "Can I monitor my website for free?",
    answer:
      "Yes. StatusPing offers free uptime monitoring with 3 monitors, hourly checks, and Slack alerts — no credit card or account creation required. Enter your URL and email, and monitoring starts immediately. For unlimited monitors and 5-minute checks, the Pro plan is $9/month.",
  },
  {
    question: "What's the difference between uptime monitoring and APM?",
    answer:
      "Uptime monitoring checks whether your site is accessible from the outside — is it up or down? APM (Application Performance Monitoring) tools like Datadog, New Relic, or Sentry track internal performance: response times, error rates, database queries, and code-level traces. Most teams need both: uptime monitoring as the first line of defense, and APM for diagnosing performance issues.",
  },
  {
    question: "Should I monitor my API endpoints too?",
    answer:
      "Yes. If your application has an API that other services or mobile apps depend on, monitor those endpoints separately. An API endpoint can return errors or time out even when your marketing homepage loads fine. Monitor the specific endpoints your users and integrations depend on most.",
  },
];

export default function UptimeMonitoringGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Monitor Website Uptime",
    description:
      "Step-by-step guide to monitoring your website's uptime, including what to monitor, check frequency, alerts, and choosing the right tool.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

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
            href="/"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Monitor your site free
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-wide text-green-600 dark:text-green-400">
            Guide
          </p>
          <h1 className="text-3xl font-bold text-black sm:text-4xl dark:text-white">
            How to Monitor Website Uptime
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Your website going down costs you visitors, revenue, and trust.
            Uptime monitoring catches outages before your users report them —
            here&apos;s how to set it up the right way.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {i + 1}
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  {step.title}
                </h2>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Start monitoring in 30 seconds
          </h2>
          <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">
            Enter your URL and email. StatusPing starts checking immediately —
            no account creation, no credit card, no setup. Free tier includes 3
            monitors with hourly checks and Slack alerts.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-black px-8 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Monitor your site free
          </Link>
        </div>

        {/* Compare tools */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Compare uptime monitoring tools
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            See how StatusPing compares to other monitoring services:
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "UptimeRobot", href: "/compare/uptimerobot" },
              { name: "Freshping", href: "/compare/freshping" },
              { name: "Better Stack", href: "/compare/betterstack" },
              { name: "Pingdom", href: "/compare/pingdom" },
              { name: "HetrixTools", href: "/compare/hetrixtools" },
            ].map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
              >
                vs {tool.name}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="font-semibold text-black dark:text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-zinc-200 px-6 py-6 dark:border-zinc-800">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-semibold text-black dark:text-white">
            StatusPing
          </span>
          <a href="https://federal-contract-tracker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black dark:hover:text-white">Federal Contract Tracker</a>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black dark:hover:text-white">HeaderGuard</a>
          <a href="https://metashield-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black dark:hover:text-white">MetaShield</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black dark:hover:text-white">SSL Checker</a>
          <a href="https://dns-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black dark:hover:text-white">DNS Lookup</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black dark:hover:text-white">WHOIS Lookup</a>
        </div>
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black dark:hover:text-white">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
