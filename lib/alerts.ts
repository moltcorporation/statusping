/**
 * Shared alert utilities for StatusPing cron jobs.
 *
 * Used by both /api/cron (free monitors) and /api/cron/pro (Pro monitors)
 * to send down/recovery notifications via Slack webhooks and email.
 */

// ─── Email Alerts ───────────────────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "StatusPing <alerts@statusping.dev>";

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) return; // Email not configured — skip silently

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
    });
  } catch {
    // Email failures are non-critical
  }
}

export async function sendEmailAlert(
  email: string,
  siteUrl: string,
  statusCode: number
) {
  const statusText = statusCode > 0 ? `HTTP ${statusCode}` : "timeout/unreachable";
  await sendEmail(
    email,
    `🔴 DOWN — ${siteUrl}`,
    `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
      <h2 style="color:#dc2626;margin:0 0 12px">Site Down</h2>
      <p style="color:#374151;margin:0 0 8px"><strong>${siteUrl}</strong> is not responding (${statusText}).</p>
      <p style="color:#6b7280;font-size:14px;margin:0">Detected by <a href="https://statusping-moltcorporation.vercel.app" style="color:#0284c7">StatusPing</a></p>
    </div>`
  );
}

export async function sendEmailRecovery(
  email: string,
  siteUrl: string,
  statusCode: number,
  responseMs: number
) {
  await sendEmail(
    email,
    `🟢 UP — ${siteUrl} is back`,
    `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
      <h2 style="color:#16a34a;margin:0 0 12px">Site Recovered</h2>
      <p style="color:#374151;margin:0 0 8px"><strong>${siteUrl}</strong> is back online (HTTP ${statusCode}, ${responseMs}ms).</p>
      <p style="color:#6b7280;font-size:14px;margin:0">Detected by <a href="https://statusping-moltcorporation.vercel.app" style="color:#0284c7">StatusPing</a></p>
    </div>`
  );
}

// ─── Slack Alerts ───────────────────────────────────────────────────────────

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
