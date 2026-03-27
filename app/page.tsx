import Link from "next/link";
import SignupForm from "./components/SignupForm";
import StatsDisplay from "./components/StatsDisplay";
import VisitorTracker from "./components/VisitorTracker";
import TrackedCheckoutLink from "./TrackedCheckoutLink";
import { STRIPE_PAYMENT_LINK_URL } from "@/lib/stripe";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <VisitorTracker />
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="text-lg font-bold tracking-tight text-black dark:text-white">
          StatusPing
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/pricing"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Pricing
          </a>
          <a
            href="/login"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Sign in
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-24">
        <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl dark:text-white">
            Know when your site
            <span className="text-red-500"> goes down</span>
          </h1>
          <p className="max-w-md text-lg font-medium text-zinc-600 dark:text-zinc-300">
            Free uptime monitoring. No credit card required.
          </p>
          <p className="max-w-md text-base text-zinc-500 dark:text-zinc-400">
            Your users shouldn&apos;t be the ones telling you. StatusPing checks
            your site every 15 minutes and alerts you on Slack or Discord the moment something breaks.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-400 dark:text-zinc-500">
            <span>Checks every 15 min</span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span>Slack & Discord alerts</span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span>Free for 10 monitors</span>
          </div>

          {/* Trust Bar */}
          <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-lg border border-emerald-200 bg-emerald-50/60 px-5 py-3 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            {[
              { label: "No credit card required" },
              { label: "Cancel anytime" },
              { label: "99.9% Uptime Monitoring" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <svg className="h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{item.label}</span>
              </div>
            ))}
          </div>

          <SignupForm />
        </div>

        {/* Dashboard Preview */}
        <div className="mt-10 w-full max-w-2xl">
          <p className="mb-3 text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
            See what you get
          </p>
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
              <span className="text-sm font-semibold text-black dark:text-white">Your Monitors</span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                All systems operational
              </span>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {[
                { url: "api.myapp.io", status: "up", ms: 42, uptime: 100 },
                { url: "dashboard.myapp.io", status: "up", ms: 118, uptime: 99.98 },
                { url: "myapp.io", status: "up", ms: 87, uptime: 99.95 },
                { url: "staging.myapp.io", status: "down", ms: null as number | null, uptime: 97.2 },
              ].map((m) => (
                <div key={m.url} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${
                        m.status === "up" ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span className="text-sm font-medium text-black dark:text-white">{m.url}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {m.ms !== null ? (
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">{m.ms}ms</span>
                    ) : (
                      <span className="text-xs text-red-400">timeout</span>
                    )}
                    <span
                      className={`text-xs font-semibold ${
                        m.uptime >= 99
                          ? "text-green-600 dark:text-green-400"
                          : m.uptime >= 95
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {m.uptime}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-100 px-5 py-2.5 text-center dark:border-zinc-800">
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                Live dashboard preview — sign up free to start monitoring
              </span>
            </div>
          </div>
        </div>

        {/* Social Proof Stats */}
        <StatsDisplay />

        {/* Dashboard Preview */}
        {!loading && !success && (
          <div className="mt-14 w-full max-w-2xl">
            <p className="mb-4 text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
              See what you get
            </p>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              {/* Mock dashboard header */}
              <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
                <span className="text-sm font-semibold text-black dark:text-white">Your Monitors</span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">All systems operational</span>
              </div>
              {/* Mock monitor rows */}
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {[
                  { name: "api.myapp.com", status: "up", ms: "142ms", uptime: "99.98%" },
                  { name: "myapp.com", status: "up", ms: "89ms", uptime: "100%" },
                  { name: "docs.myapp.com", status: "up", ms: "201ms", uptime: "99.95%" },
                ].map((m) => (
                  <div key={m.name} className="flex items-center gap-3 px-5 py-3">
                    <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-500" />
                    <span className="flex-1 text-sm font-medium text-black dark:text-white">{m.name}</span>
                    <div className="hidden items-center gap-1 sm:flex">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <span key={i} className="h-5 w-1 rounded-full bg-emerald-400/60 dark:bg-emerald-500/40" />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">{m.ms}</span>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{m.uptime}</span>
                  </div>
                ))}
              </div>
              {/* Mock footer */}
              <div className="border-t border-zinc-100 bg-zinc-50/50 px-5 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/50">
                <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-500">
                  Sample dashboard — your monitors will appear here after signup
                </p>
              </div>
            </div>
          </div>
        )}

        {/* How it works */}
        <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { step: "1", title: "Add your URL", desc: "Paste your site URL and your email. Takes 10 seconds." },
            { step: "2", title: "We watch it for you", desc: "Checks every 15 minutes. We record status codes, response times, and downtime." },
            { step: "3", title: "Get pinged, not surprised", desc: "Slack or Discord alert the second your site goes down — and again when it recovers." },
          ].map((s) => (
            <div key={s.step} className="flex flex-col items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-5 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-white dark:bg-white dark:text-black">{s.step}</span>
              <h3 className="text-sm font-semibold text-black dark:text-white">{s.title}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-black dark:text-white">
              Built for indie devs
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No enterprise sales calls. No 14-day trial traps. Free tier
              that actually works. Pro when you need more.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-black dark:text-white">
              Slack & Discord alerts
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Down and recovery alerts go straight to Slack or Discord. No email
              noise. No app to install.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-black dark:text-white">
              Public status pages
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Share a live status page with your users. Show them you care
              about uptime as much as they do.
            </p>
          </div>
        </div>

        {/* Pricing teaser */}
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="mb-4 text-center text-lg font-bold tracking-tight text-black dark:text-white">
            Free to start. $9/mo when you need more.
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <div>
                <h3 className="text-base font-bold text-black dark:text-white">Free</h3>
                <span className="text-2xl font-extrabold text-black dark:text-white">$0</span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">/mo</span>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">&#10003;</span>
                  10 monitors
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">&#10003;</span>
                  15-minute checks
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">&#10003;</span>
                  Slack &amp; Discord alerts
                </li>
              </ul>
              <a
                href="#signup"
                className="mt-auto w-full rounded-lg border border-zinc-300 py-2.5 text-center text-sm font-medium text-black transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Get started free
              </a>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border-2 border-black bg-white p-5 dark:border-white dark:bg-zinc-900">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-black dark:text-white">Pro</h3>
                  <span className="rounded-full bg-black px-2 py-0.5 text-[11px] font-medium text-white dark:bg-white dark:text-black">
                    Popular
                  </span>
                </div>
                <span className="text-2xl font-extrabold text-black dark:text-white">$9</span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">/mo</span>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">&#10003;</span>
                  Unlimited monitors
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">&#10003;</span>
                  5-minute checks
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">&#10003;</span>
                  Priority support
                </li>
              </ul>
              <TrackedCheckoutLink
                href={STRIPE_PAYMENT_LINK_URL}
                className="mt-auto w-full rounded-lg bg-black py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Unlock Pro monitoring
              </TrackedCheckoutLink>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-zinc-400 dark:text-zinc-500">
            <Link href="/pricing" className="underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 dark:decoration-zinc-600 dark:hover:decoration-zinc-400">
              Compare plans in detail
            </Link>
          </p>
        </div>

        {/* Use cases */}
        <div className="mt-8 w-full max-w-2xl text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Running AI agents?{" "}
            <Link href="/use-cases/ai-agent-monitoring" className="font-medium text-black underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 dark:text-white dark:decoration-zinc-600 dark:hover:decoration-zinc-400">
              Monitor your agent API endpoints free
            </Link>
            {" · "}
            <Link href="/use-cases/wordpress-monitoring" className="font-medium text-black underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 dark:text-white dark:decoration-zinc-600 dark:hover:decoration-zinc-400">
              WordPress
            </Link>
            {" · "}
            <Link href="/use-cases/api-monitoring" className="font-medium text-black underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 dark:text-white dark:decoration-zinc-600 dark:hover:decoration-zinc-400">
              APIs
            </Link>
            {" · "}
            <Link href="/use-cases/ecommerce-monitoring" className="font-medium text-black underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 dark:text-white dark:decoration-zinc-600 dark:hover:decoration-zinc-400">
              E-commerce
            </Link>
            {" · "}
            <Link href="/use-cases/saas-monitoring" className="font-medium text-black underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 dark:text-white dark:decoration-zinc-600 dark:hover:decoration-zinc-400">
              SaaS
            </Link>
            {" · "}
            <Link href="/use-cases/portfolio-monitoring" className="font-medium text-black underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 dark:text-white dark:decoration-zinc-600 dark:hover:decoration-zinc-400">
              Side projects
            </Link>
          </p>
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
              <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-200">OneQR</span>
              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">Free QR code generator</span>
            </a>
            <a
              href="https://federal-contract-tracker-moltcorporation.vercel.app?utm_source=statuspingsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-3 py-2.5 text-center transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-200">GovScout</span>
              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">Federal contract tracking</span>
            </a>
            <a
              href="https://trades-quoting-tool-moltcorporation.vercel.app?utm_source=statuspingsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-3 py-2.5 text-center transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-200">TradeQuote</span>
              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">Quoting for tradespeople</span>
            </a>
            <a
              href="https://breeder-platform-moltcorporation.vercel.app?utm_source=statuspingsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 px-3 py-2.5 text-center transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-200">PawPage</span>
              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">Breeder waitlist platform</span>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-600">
          <a href="/privacy" className="hover:text-zinc-600 dark:hover:text-zinc-400">Privacy</a>
          <a href="/terms" className="hover:text-zinc-600 dark:hover:text-zinc-400">Terms</a>
          <a href="/feedback" className="hover:text-zinc-600 dark:hover:text-zinc-400">Feedback</a>
          <span>
            Built by agents at{" "}
            <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-400">Moltcorp</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
