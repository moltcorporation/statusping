import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | StatusPing",
  description:
    "StatusPing terms of service — acceptable use, accounts, payments, and liability for our uptime monitoring platform.",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Last updated: March 19, 2026
        </p>

        <div className="mt-8 space-y-8 text-zinc-700 leading-relaxed dark:text-zinc-300">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2">
              By creating an account or using StatusPing, you agree to these
              Terms of Service. If you do not agree, do not use the service.
              StatusPing is operated by Moltcorp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              2. Description of Service
            </h2>
            <p className="mt-2">
              StatusPing provides website and API uptime monitoring with
              configurable check intervals, downtime alerts (email and Slack),
              and public status pages. The service includes a free tier and a
              paid Pro subscription.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              3. Account Responsibilities
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                You must provide accurate information when creating your account.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                login credentials.
              </li>
              <li>
                You are responsible for all activity that occurs under your
                account.
              </li>
              <li>
                You must be at least 13 years old to create an account.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              4. Acceptable Use
            </h2>
            <p className="mt-2">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Use the service for any unlawful purpose.</li>
              <li>
                Monitor URLs you do not own or have authorization to monitor.
              </li>
              <li>
                Use StatusPing to perform denial-of-service attacks or excessive
                load testing against third-party services.
              </li>
              <li>
                Attempt to interfere with or disrupt the service or its
                infrastructure.
              </li>
              <li>
                Resell or redistribute access to the service without
                authorization.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              5. Monitoring Data
            </h2>
            <p className="mt-2">
              You retain ownership of all monitoring configurations and data. By
              using StatusPing, you grant us a license to store and process this
              data as necessary to provide the service, including displaying
              uptime data on public status pages you create. See our{" "}
              <Link
                href="/privacy"
                className="text-emerald-600 hover:text-emerald-500 underline dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Privacy Policy
              </Link>{" "}
              for details on how we handle personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              6. Payments and Subscriptions
            </h2>
            <p className="mt-2">
              Pro plans are billed monthly. You may cancel at any time; your
              access continues until the end of the current billing period.
              Refunds are not provided for partial billing periods. StatusPing
              reserves the right to change pricing with 30 days&apos; notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              7. Service Availability
            </h2>
            <p className="mt-2">
              We strive to maintain high availability for monitoring checks and
              alerts, but do not guarantee 100% uptime of the StatusPing service
              itself. Scheduled maintenance windows will be communicated in
              advance when possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              8. Account Termination
            </h2>
            <p className="mt-2">
              You may delete your account at any time through your account
              settings. We may suspend or terminate your account if you violate
              these terms or engage in abusive behavior. Upon termination, your
              monitors will stop and your data will be deleted in accordance with
              our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              9. Limitation of Liability
            </h2>
            <p className="mt-2">
              StatusPing is provided &quot;as is&quot; without warranties of any
              kind. To the maximum extent permitted by law, Moltcorp shall not be
              liable for any indirect, incidental, special, or consequential
              damages arising from your use of the service, including but not
              limited to missed alerts, undetected downtime, lost profits, data
              loss, or business interruption.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              10. Changes to Terms
            </h2>
            <p className="mt-2">
              We may update these terms from time to time. We will notify you of
              material changes via email or through the service. Continued use
              after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              11. Contact
            </h2>
            <p className="mt-2">
              Questions about these terms? Use the{" "}
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
