/**
 * Shared alert utilities for StatusPing cron jobs.
 *
 * Used by both /api/cron (free monitors) and /api/cron/pro (Pro monitors)
 * to send down/recovery notifications via Slack webhooks and email.
 */

// ---------------------------------------------------------------------------
// Email alerts
// ---------------------------------------------------------------------------

/**
 * Send a down-alert email to the monitor owner.
 *
 * Uses the Resend API when RESEND_API_KEY is set. If the key is missing the
 * alert is logged to the console so the triggering logic still works and can
 * be wired up later.
 */
export async function sendEmailAlert(
  recipientEmail: string,
  siteUrl: string,
  statusCode: number
) {
  const subject = `[StatusPing] DOWN — ${siteUrl}`;
  const body = statusCode > 0
    ? `Your site ${siteUrl} is down (HTTP ${statusCode}). We'll notify you when it recovers.`
    : `Your site ${siteUrl} is not responding (timeout/unreachable). We'll notify you when it recovers.`;

  await sendEmail(recipientEmail, subject, body);
}

/**
 * Send a recovery email to the monitor owner.
 */
export async function sendEmailRecovery(
  recipientEmail: string,
  siteUrl: string,
  statusCode: number,
  responseMs: number
) {
  const subject = `[StatusPing] UP — ${siteUrl} recovered`;
  const body = `Good news! ${siteUrl} is back online (HTTP ${statusCode}, ${responseMs}ms).`;

  await sendEmail(recipientEmail, subject, body);
}

/**
 * Low-level email transport.
 *
 * When RESEND_API_KEY is configured the email is sent via the Resend API.
 * Otherwise the call is a no-op (with a console log) so the rest of the
 * alerting pipeline can be developed and tested independently.
 *
 * TODO: Set RESEND_API_KEY (and optionally EMAIL_FROM) in the environment
 *       to enable real email delivery via Resend (https://resend.com).
 */
async function sendEmail(to: string, subject: string, body: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "StatusPing <alerts@statusping.dev>";

  if (!apiKey) {
    console.log(
      `[StatusPing] Email alert skipped (no RESEND_API_KEY): to=${to} subject="${subject}"`
    );
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ from, to, subject, text: body }),
    });
  } catch {
    // Email failures are non-critical — don't break the cron run
    console.error(`[StatusPing] Failed to send email to ${to}`);
  }
}

// ---------------------------------------------------------------------------
// Slack alerts
// ---------------------------------------------------------------------------

export async function sendSlackAlert(
  webhookUrl: string,
  siteUrl: string,
  statusCode: number
) {
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `🔴 *DOWN* — ${siteUrl} is not responding${statusCode > 0 ? ` (HTTP ${statusCode})` : " (timeout/unreachable)"}. Checked by StatusPing.`,
      }),
    });
  } catch {
    // Slack notification failures are non-critical
  }
}

export async function sendSlackRecovery(
  webhookUrl: string,
  siteUrl: string,
  statusCode: number,
  responseMs: number
) {
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `🟢 *UP* — ${siteUrl} is back online (HTTP ${statusCode}, ${responseMs}ms). Checked by StatusPing.`,
      }),
    });
  } catch {
    // Slack notification failures are non-critical
  }
}
