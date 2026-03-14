import Link from "next/link";
import { STRIPE_PAYMENT_LINK_URL } from "@/lib/stripe";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 text-green-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5l3.5 3.5 6.5-7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 text-zinc-300 dark:text-zinc-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-green-50 font-sans dark:bg-black">
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-emerald-700 dark:text-emerald-400"
        >
          StatusPing
        </Link>
        <Link
          href="/dashboard"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          Dashboard
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-white">
            Simple pricing
          </h1>
          <p className="max-w-md text-lg text-zinc-500 dark:text-zinc-400">
            Start free, upgrade when you need more monitors and faster checks.
          </p>
        </div>

        <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Free tier */}
          <div className="flex flex-col gap-6 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold text-black dark:text-white">
                Free
              </h2>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-black dark:text-white">
                  $0
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  /month
                </span>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                { text: "3 monitors", included: true },
                { text: "Hourly checks", included: true },
                { text: "Slack alerts", included: true },
                { text: "Uptime history", included: true },
                { text: "Unlimited monitors", included: false },
                { text: "5-minute checks", included: false },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-2.5">
                  {item.included ? <CheckIcon /> : <XIcon />}
                  <span
                    className={
                      item.included
                        ? "text-sm text-black dark:text-white"
                        : "text-sm text-zinc-400 dark:text-zinc-500"
                    }
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="mt-auto w-full rounded-lg border border-zinc-300 py-2.5 text-center text-sm font-medium text-black transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              Get started free
            </Link>
          </div>

          {/* Pro tier */}
          <div className="flex flex-col gap-6 rounded-xl border-2 border-emerald-600 bg-white p-6 dark:border-emerald-400 dark:bg-zinc-900">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-black dark:text-white">
                  Pro
                </h2>
                <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white dark:bg-emerald-500">
                  Popular
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-black dark:text-white">
                  $9
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  /month
                </span>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                "Unlimited monitors",
                "5-minute checks",
                "Slack alerts",
                "Uptime history",
                "Priority support",
                "API access (coming soon)",
              ].map((text) => (
                <li key={text} className="flex items-center gap-2.5">
                  <CheckIcon />
                  <span className="text-sm text-black dark:text-white">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={STRIPE_PAYMENT_LINK_URL}
              className="mt-auto w-full rounded-lg bg-emerald-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-medium text-zinc-600 dark:text-zinc-300">
            StatusPing
          </span>
          <a
            href="https://headerguard-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            HeaderGuard
          </a>
          <a
            href="https://metashield-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            MetaShield
          </a>
          <a
            href="https://dns-lookup-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            DNS Lookup
          </a>
          <a
            href="https://ssl-certificate-checker-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            SSL Checker
          </a>
          <a
            href="https://whois-lookup-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            WHOIS Lookup
          </a>
          <a
            href="https://federal-contract-tracker-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            Contract Tracker
          </a>
        </div>
        <span className="text-xs text-zinc-400 dark:text-zinc-600">
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
      </footer>
    </div>
  );
}
