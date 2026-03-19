import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | StatusPing",
  description:
    "StatusPing privacy policy — how we collect, use, and protect your data when you monitor website uptime.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          &larr; Back to StatusPing
        </Link>

        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Last updated: March 19, 2026
        </p>

        <div className="mt-8 space-y-8 text-zinc-700 leading-relaxed dark:text-zinc-300">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              1. Information We Collect
            </h2>

            <h3 className="mt-4 font-medium text-zinc-900 dark:text-white">
              Account Information
            </h3>
            <p className="mt-1">
              When you create an account, we collect your email address and
              password (stored in hashed form).
            </p>

            <h3 className="mt-4 font-medium text-zinc-900 dark:text-white">
              Monitor Data
            </h3>
            <p className="mt-1">
              We store the URLs you configure for monitoring, check intervals,
              and alert preferences. We collect uptime data, response times, and
              status codes for your monitored endpoints.
            </p>

            <h3 className="mt-4 font-medium text-zinc-900 dark:text-white">
              Alert and Notification Data
            </h3>
            <p className="mt-1">
              We store your email addresses and Slack webhook URLs used for
              downtime alerts. Alert history (timestamps, trigger conditions) is
              retained to provide incident timelines.
            </p>

            <h3 className="mt-4 font-medium text-zinc-900 dark:text-white">
              Payment Information
            </h3>
            <p className="mt-1">
              Payment processing is handled by Stripe. We do not store credit
              card numbers. We receive confirmation of payment status and
              subscription details from Stripe.
            </p>

            <h3 className="mt-4 font-medium text-zinc-900 dark:text-white">
              Usage Data
            </h3>
            <p className="mt-1">
              We automatically collect basic usage data such as pages visited,
              browser type, and IP address to improve the service and diagnose
              issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              2. How We Use Your Information
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                To monitor your configured URLs and report uptime status.
              </li>
              <li>
                To send downtime alerts via email and Slack when your monitors
                detect issues.
              </li>
              <li>
                To generate and host public status pages for your monitors.
              </li>
              <li>
                To process payments through our payment provider (Stripe).
              </li>
              <li>
                To send transactional emails (account verification, password
                resets, billing notifications).
              </li>
              <li>To improve the service based on usage patterns.</li>
              <li>
                To enforce our{" "}
                <Link
                  href="/terms"
                  className="text-emerald-600 hover:text-emerald-500 underline dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  Terms of Service
                </Link>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              3. How We Share Your Information
            </h2>
            <p className="mt-2">
              We do not sell your personal information. We share data only in
              these cases:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong className="text-zinc-900 dark:text-white">
                  Public status pages:
                </strong>{" "}
                Monitor names and uptime data you choose to make public are
                visible on your status page.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-white">
                  Payment processing:
                </strong>{" "}
                We share necessary payment information with Stripe to process
                subscriptions.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-white">
                  Legal requirements:
                </strong>{" "}
                We may disclose information if required by law or to protect the
                rights and safety of our users.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              4. Data Retention
            </h2>
            <p className="mt-2">
              We retain your account data and monitoring history for as long as
              your account is active. If you delete your account, we will delete
              your personal data within 30 days, except where retention is
              required by law or for legitimate business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              5. Data Security
            </h2>
            <p className="mt-2">
              We use industry-standard security measures to protect your data,
              including encrypted connections (HTTPS), hashed passwords, and
              secure database hosting. However, no method of transmission or
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              6. Your Rights
            </h2>
            <p className="mt-2">You have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>
                Request deletion of your account and associated data.
              </li>
              <li>Export your monitoring data and uptime history.</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, use the{" "}
              <Link
                href="/feedback"
                className="text-emerald-600 hover:text-emerald-500 underline dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                feedback form
              </Link>{" "}
              or contact us through your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              7. Cookies
            </h2>
            <p className="mt-2">
              We use essential cookies to maintain your login session and
              remember your preferences. We do not use third-party advertising or
              tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              8. Children&apos;s Privacy
            </h2>
            <p className="mt-2">
              StatusPing is not intended for use by anyone under the age of 13.
              We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              9. Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this policy from time to time. We will notify you of
              material changes via email or through the service. Continued use
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              10. Contact
            </h2>
            <p className="mt-2">
              Questions about this policy? Use the{" "}
              <Link
                href="/feedback"
                className="text-emerald-600 hover:text-emerald-500 underline dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                feedback form
              </Link>{" "}
              to reach us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
