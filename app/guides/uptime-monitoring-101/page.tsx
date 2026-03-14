import Link from "next/link";

const faqs = [
  {
    question: "How do I monitor my website uptime for free?",
    answer:
      "Sign up for a free monitoring tool like StatusPing, enter your website URL and email, and monitoring starts immediately. StatusPing's free tier includes 3 monitors with hourly checks and Slack alerts — no credit card required. Other free options include UptimeRobot and Freshping, though features vary.",
  },
  {
    question: "What is a good uptime percentage for a website?",
    answer:
      "99.9% uptime (three nines) is the standard target for most websites. That allows about 8.7 hours of downtime per year, or roughly 43 minutes per month. E-commerce and SaaS products often aim for 99.95% or higher. If your uptime drops below 99.5%, you likely have an infrastructure issue that needs attention.",
  },
  {
    question: "How often should I check my website's uptime?",
    answer:
      "For personal sites and blogs, hourly checks are enough. For business-critical sites like SaaS apps, e-commerce stores, and APIs, 5-minute checks catch outages before most users notice. High-traffic payment and API systems typically use 1-minute intervals.",
  },
  {
    question: "What causes website downtime?",
    answer:
      "The most common causes are server overload from traffic spikes, expired SSL certificates, DNS configuration errors, failed deployments pushing broken code, hosting provider outages, and database connection exhaustion. Many of these can be prevented with proper monitoring and alerts.",
  },
  {
    question:
      "What is the difference between uptime monitoring and performance monitoring?",
    answer:
      "Uptime monitoring checks whether your site is accessible — is it up or down? Performance monitoring (APM) tracks internal metrics like response times, error rates, and database queries. Uptime monitoring is your first line of defense; APM helps you diagnose why things are slow. Most teams need both.",
  },
  {
    question: "Do free website monitoring tools actually work?",
    answer:
      "Yes, but with limitations. Free tools typically offer fewer monitors (1-5), longer check intervals (5-60 minutes), and limited alert channels. For small projects and personal sites, free tools are perfectly adequate. When you need faster checks, more monitors, or advanced features like status pages, paid plans start around $7-20/month.",
  },
  {
    question: "Should I monitor my API endpoints separately?",
    answer:
      "Absolutely. Your API can fail independently of your website. A marketing homepage might load fine while your API returns 500 errors to every mobile user. Monitor the critical endpoints your users and integrations depend on — login, checkout, data fetching, and webhook receivers.",
  },
  {
    question: "What should I do when I get a downtime alert?",
    answer:
      "First, verify the outage isn't a false positive — check your site from a different network or device. If it's real, check your server logs and hosting provider status page. Common quick fixes include restarting the application, rolling back a recent deployment, or clearing a full disk. Document the incident and root cause so you can prevent it from happening again.",
  },
];

export default function UptimeMonitoring101() {
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
            href="/"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Monitor your site free
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-12">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-wide text-sky-600 dark:text-sky-400">
            Guide
          </p>
          <h1 className="text-3xl font-bold text-black sm:text-4xl dark:text-white">
            Uptime Monitoring 101: How to Monitor Website Uptime
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Every minute of downtime costs you visitors, revenue, and credibility.
            This guide covers everything you need to know about uptime monitoring
            — how it works, what to look for in a tool, free vs paid options, and
            how to set it up in under a minute.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="rounded-lg border border-sky-200 bg-sky-50/50 p-5 dark:border-sky-900/50 dark:bg-sky-950/20">
          <p className="mb-3 text-sm font-semibold text-sky-700 dark:text-sky-400">
            In this guide
          </p>
          <ol className="flex flex-col gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <a href="#what-is-uptime-monitoring" className="hover:text-sky-600 dark:hover:text-sky-400">
                1. What is uptime monitoring and why it matters
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-sky-600 dark:hover:text-sky-400">
                2. How uptime monitoring works
              </a>
            </li>
            <li>
              <a href="#what-to-look-for" className="hover:text-sky-600 dark:hover:text-sky-400">
                3. What to look for in a monitoring tool
              </a>
            </li>
            <li>
              <a href="#free-vs-paid" className="hover:text-sky-600 dark:hover:text-sky-400">
                4. Free vs paid monitoring tools
              </a>
            </li>
            <li>
              <a href="#setup-with-statusping" className="hover:text-sky-600 dark:hover:text-sky-400">
                5. How to set up monitoring with StatusPing
              </a>
            </li>
            <li>
              <a href="#common-issues" className="hover:text-sky-600 dark:hover:text-sky-400">
                6. Common uptime issues and how to fix them
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-sky-600 dark:hover:text-sky-400">
                7. Frequently asked questions
              </a>
            </li>
          </ol>
        </nav>

        {/* Section 1: What is uptime monitoring */}
        <section id="what-is-uptime-monitoring" className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            What is uptime monitoring and why it matters
          </h2>
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <p>
              Uptime monitoring is the practice of continuously checking whether your
              website, API, or web service is accessible and responding correctly. A
              monitoring service sends automated requests to your URLs at regular
              intervals and alerts you when something goes wrong.
            </p>
            <p>
              Why does this matter? Because downtime is invisible to you until someone
              complains. Your server can crash at 2 AM, your SSL certificate can expire
              on a Saturday, or a bad deployment can take down your checkout page during
              peak traffic. Without monitoring, you find out from angry users, lost
              sales, or a drop in search rankings.
            </p>
            <p>
              The numbers are stark: studies consistently show that even small businesses
              lose hundreds of dollars per hour of downtime. For e-commerce sites, the
              cost scales directly with traffic. And search engines penalize sites with
              frequent downtime by lowering their rankings — meaning the damage extends
              well beyond the outage window itself.
            </p>
            <p>
              Uptime monitoring flips this dynamic. Instead of reacting to complaints,
              you get alerted the moment something breaks — often before any user
              notices. That early warning is the difference between a 2-minute fix and
              a 2-hour outage.
            </p>
          </div>
        </section>

        {/* Section 2: How it works */}
        <section id="how-it-works" className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            How uptime monitoring works
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Under the hood, uptime monitoring is straightforward. Here are the core
            mechanics:
          </p>
          <div className="flex flex-col gap-4">
            {[
              {
                title: "HTTP checks",
                body: "The monitoring service sends an HTTP GET request to your URL — exactly like a browser would. It records the status code (200 = OK, 500 = server error, etc.), response time, and whether the connection timed out. If the status code indicates an error or the request times out, the check is marked as failed.",
              },
              {
                title: "Check intervals",
                body: "Your monitor runs on a schedule: every 1 minute, 5 minutes, or 60 minutes depending on your plan and configuration. Shorter intervals mean faster detection but use more resources. Most monitoring tools offer 5-minute checks as the sweet spot between speed and cost.",
              },
              {
                title: "Confirmation checks",
                body: "Good monitoring tools don't alert on a single failed check. Network blips and brief timeouts happen constantly. Instead, they run a confirmation check from a different server or region before triggering an alert. This dramatically reduces false positives.",
              },
              {
                title: "Alerts and notifications",
                body: "When downtime is confirmed, the service sends you a notification — via email, Slack, SMS, webhook, or a combination. The best tools also send a recovery alert when your site comes back up, so you know the issue resolved without checking manually.",
              },
              {
                title: "Logging and history",
                body: "Every check result is logged: timestamp, status code, response time, and whether it passed or failed. This history lets you calculate your uptime percentage, spot patterns (do outages happen after deployments? during traffic spikes?), and prove your reliability to stakeholders.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700 dark:bg-sky-900/50 dark:text-sky-400">
                  {i + 1}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold text-black dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: What to look for */}
        <section id="what-to-look-for" className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            What to look for in a monitoring tool
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Not all monitoring tools are created equal. Here are the features that
            actually matter when choosing one:
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                title: "Check frequency",
                desc: "How often does it check your site? Hourly is fine for personal projects, but business-critical sites need 5-minute or 1-minute checks to minimize detection time.",
              },
              {
                title: "Alert channels",
                desc: "Email is table stakes. Look for Slack, Discord, SMS, or webhook support. The faster you get notified, the faster you can respond. Slack alerts in a team channel are often the most effective.",
              },
              {
                title: "Public status pages",
                desc: "A shareable status page shows your users you take reliability seriously. It reduces support tickets during outages because users can check the page themselves instead of emailing you.",
              },
              {
                title: "Number of monitors",
                desc: "How many URLs can you monitor? You'll want at least 3-5: homepage, login, API, checkout, and any critical endpoints. Free tiers usually limit you to 1-5 monitors.",
              },
              {
                title: "Response time tracking",
                desc: "Beyond up/down, tracking response time over time helps you catch performance degradation before it becomes an outage. A site that usually responds in 200ms but is now taking 2 seconds is a warning sign.",
              },
              {
                title: "Multi-region checks",
                desc: "A site can be down in one region but up in another. Monitoring from multiple locations catches region-specific issues and reduces false positives from local network problems.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="font-semibold text-black dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Free vs paid */}
        <section id="free-vs-paid" className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Free vs paid monitoring tools
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Free monitoring tools are genuinely useful — not just marketing bait for
            upsells. Here is an honest breakdown of what you get at each tier:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="py-3 pr-4 text-left font-semibold text-black dark:text-white">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-black dark:text-white">
                    Free tools
                  </th>
                  <th className="py-3 pl-4 text-left font-semibold text-black dark:text-white">
                    Paid tools
                  </th>
                </tr>
              </thead>
              <tbody className="text-zinc-600 dark:text-zinc-400">
                <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                  <td className="py-3 pr-4 font-medium">Monitors</td>
                  <td className="px-4 py-3">1-5 URLs</td>
                  <td className="py-3 pl-4">Unlimited or 50+</td>
                </tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                  <td className="py-3 pr-4 font-medium">Check interval</td>
                  <td className="px-4 py-3">5-60 minutes</td>
                  <td className="py-3 pl-4">30 seconds to 5 minutes</td>
                </tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                  <td className="py-3 pr-4 font-medium">Alerts</td>
                  <td className="px-4 py-3">Email, sometimes Slack</td>
                  <td className="py-3 pl-4">Email, Slack, SMS, webhooks, PagerDuty</td>
                </tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                  <td className="py-3 pr-4 font-medium">Status pages</td>
                  <td className="px-4 py-3">Basic or none</td>
                  <td className="py-3 pl-4">Custom branded pages</td>
                </tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                  <td className="py-3 pr-4 font-medium">History</td>
                  <td className="px-4 py-3">7-30 days</td>
                  <td className="py-3 pl-4">90 days to unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Price</td>
                  <td className="px-4 py-3">$0</td>
                  <td className="py-3 pl-4">$7-29/month</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <p>
              <strong className="text-black dark:text-white">When free is enough:</strong>{" "}
              If you have 1-3 sites, hourly checks are acceptable, and email or Slack
              alerts work for your workflow, a free tier handles the job. Personal
              projects, side projects, and early-stage startups fit here perfectly.
            </p>
            <p>
              <strong className="text-black dark:text-white">When to upgrade:</strong>{" "}
              Once downtime directly costs you money (e-commerce, SaaS with paying
              users, client sites), the $7-20/month for faster checks and more monitors
              pays for itself after preventing a single extended outage. A 5-minute check
              catches problems 12x faster than an hourly one.
            </p>
          </div>
        </section>

        {/* Section 5: Setup with StatusPing */}
        <section id="setup-with-statusping" className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            How to set up monitoring with StatusPing
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            StatusPing is designed to get you from zero to monitored in under a
            minute. No account creation, no credit card, no configuration files.
          </p>
          <div className="flex flex-col gap-4">
            {[
              {
                step: "1",
                title: "Enter your URL",
                body: "Go to the StatusPing homepage and paste in the URL you want to monitor. We'll auto-detect the protocol if you forget the https:// prefix.",
              },
              {
                step: "2",
                title: "Add your email",
                body: "Enter your email address. This is where we'll send verification and alert notifications. You'll receive a confirmation email to activate monitoring.",
              },
              {
                step: "3",
                title: "Verify and go",
                body: "Click the verification link in your email. StatusPing begins checking your site on an hourly schedule immediately. You'll get Slack alerts the moment your site goes down — and again when it recovers.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 rounded-lg border border-cyan-200 bg-gradient-to-r from-cyan-50/50 to-white p-5 dark:border-cyan-900/40 dark:from-cyan-950/20 dark:to-zinc-900"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white dark:bg-cyan-500">
                  {item.step}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold text-black dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <p>
              The free tier gives you 3 monitors with hourly checks and Slack
              alerts. Need more? The{" "}
              <Link href="/pricing" className="font-medium text-sky-600 underline hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300">
                Pro plan at $9/month
              </Link>{" "}
              unlocks unlimited monitors with 5-minute checks.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 via-cyan-50 to-white p-8 text-center dark:border-sky-900/50 dark:from-sky-950/40 dark:via-cyan-950/30 dark:to-zinc-900">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Start monitoring your site for free
          </h2>
          <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">
            Enter your URL and email on the StatusPing homepage. Monitoring starts
            immediately — no account required, no credit card, no setup wizards.
            Free tier includes 3 monitors with hourly checks and Slack alerts.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-sky-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
          >
            Monitor your site free
          </Link>
        </div>

        {/* Section 6: Common issues */}
        <section id="common-issues" className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Common uptime issues and how to fix them
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            When your monitor alerts you, the HTTP status code tells you what went
            wrong. Here are the most common issues and what to do about each one:
          </p>
          <div className="flex flex-col gap-4">
            {[
              {
                code: "500 Internal Server Error",
                cause: "Your application crashed or threw an unhandled exception.",
                fix: "Check your application logs for the stack trace. Common culprits: a null pointer, a failed database query, or a missing environment variable after a deployment. Restart the application and fix the root cause.",
              },
              {
                code: "502 Bad Gateway",
                cause: "Your reverse proxy (Nginx, Cloudflare, load balancer) can't reach your application server.",
                fix: "Verify your application process is running. If you use PM2, Docker, or systemd, check the process status. The proxy is fine — it's the upstream app that's down.",
              },
              {
                code: "503 Service Unavailable",
                cause: "Your server is overloaded or in maintenance mode.",
                fix: "Check CPU and memory usage. If you're getting a traffic spike, consider scaling up or enabling a CDN. If this is intentional maintenance, make sure your status page reflects it.",
              },
              {
                code: "Connection Timeout",
                cause: "The server didn't respond within the timeout window (usually 10-30 seconds).",
                fix: "Could be a network issue, DNS problem, or your server is so overloaded it can't accept new connections. Check if the server is reachable via SSH. If yes, the issue is likely application-level. If not, it's infrastructure or DNS.",
              },
              {
                code: "SSL Certificate Error",
                cause: "Your SSL certificate expired, is misconfigured, or doesn't match the domain.",
                fix: "Check your certificate expiry date. If you use Let's Encrypt, verify auto-renewal is working. If you recently changed hosting, make sure the new certificate covers your exact domain (including www vs non-www).",
              },
              {
                code: "DNS Resolution Failure",
                cause: "The domain name can't be resolved to an IP address.",
                fix: "Check your DNS records with a tool like dig or nslookup. Common causes: expired domain, deleted DNS records, or nameserver misconfiguration after a provider migration.",
              },
            ].map((issue, i) => (
              <div
                key={i}
                className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="font-semibold text-black dark:text-white">
                  {issue.code}
                </h3>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-500">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Cause:</span>{" "}
                  {issue.cause}
                </p>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-500">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Fix:</span>{" "}
                  {issue.fix}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: FAQ */}
        <section id="faq" className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-black dark:text-white">
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
        </section>

        {/* Compare tools */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Compare monitoring tools
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            See how StatusPing stacks up against other monitoring services:
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
      </main>

      {/* Footer */}
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
