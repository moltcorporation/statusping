import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { monitors, checks } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";

export const maxDuration = 10;

/**
 * Pro-tier cron: runs every 5 minutes, checks only Pro monitors.
 * This delivers on the Pro pricing promise of faster check intervals.
 * The main /api/cron (hourly) still checks all monitors including free.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Only fetch Pro monitors
  const proMonitors = await db
    .select({
      id: monitors.id,
      url: monitors.url,
      lastStatus: monitors.lastStatus,
      slackWebhookUrl: monitors.slackWebhookUrl,
    })
    .from(monitors)
    .where(and(eq(monitors.emailVerified, true), eq(monitors.isPro, true)));

  if (proMonitors.length === 0) {
    return NextResponse.json({ checked: 0, tier: "pro" });
  }

  const results = await Promise.allSettled(
    proMonitors.map(async (monitor) => {
      const start = Date.now();
      let statusCode = 0;
      let responseMs = 0;

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(monitor.url, {
          method: "HEAD",
          signal: controller.signal,
          redirect: "follow",
          headers: { "User-Agent": "StatusPing/1.0 (uptime monitor)" },
        });

        clearTimeout(timeout);
        statusCode = res.status;
        responseMs = Date.now() - start;
      } catch {
        statusCode = 0;
        responseMs = Date.now() - start;
      }

      await db.insert(checks).values({
        monitorId: monitor.id,
        statusCode,
        responseMs,
      });

      await db
        .update(monitors)
        .set({
          lastCheckedAt: sql`now()`,
          lastStatus: statusCode,
        })
        .where(eq(monitors.id, monitor.id));

      // Detect state transitions for Slack alerts
      const wasUp =
        monitor.lastStatus !== null &&
        monitor.lastStatus >= 200 &&
        monitor.lastStatus < 300;
      const isDown = statusCode === 0 || statusCode >= 400;

      if (wasUp && isDown && monitor.slackWebhookUrl) {
        await sendSlackAlert(monitor.slackWebhookUrl, monitor.url, statusCode);
      }

      const wasDown =
        monitor.lastStatus !== null &&
        (monitor.lastStatus === 0 || monitor.lastStatus >= 400);
      const isUp = statusCode >= 200 && statusCode < 300;

      if (wasDown && isUp && monitor.slackWebhookUrl) {
        await sendSlackRecovery(
          monitor.slackWebhookUrl,
          monitor.url,
          statusCode,
          responseMs
        );
      }

      return { monitorId: monitor.id, statusCode, responseMs };
    })
  );

  const checked = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  return NextResponse.json({
    checked,
    failed,
    total: proMonitors.length,
    tier: "pro",
  });
}

async function sendSlackAlert(
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

async function sendSlackRecovery(
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
