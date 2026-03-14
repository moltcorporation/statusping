/**
 * Shared Slack alert utilities for StatusPing cron jobs.
 *
 * Used by both /api/cron (free monitors) and /api/cron/pro (Pro monitors)
 * to send down/recovery notifications via Slack webhooks.
 */

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
