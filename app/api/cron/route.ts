import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { monitors, checks } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { sendSlackAlert, sendSlackRecovery } from "@/lib/alerts";

export const maxDuration = 10;

export async function GET(request: NextRequest) {
  // Verify Vercel Cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch all verified, non-Pro monitors (Pro monitors use /api/cron/pro)
  const allMonitors = await db
    .select({
      id: monitors.id,
      url: monitors.url,
      lastStatus: monitors.lastStatus,
      slackWebhookUrl: monitors.slackWebhookUrl,
    })
    .from(monitors)
    .where(
      sql`${monitors.emailVerified} = true AND (${monitors.isPro} = false OR ${monitors.isPro} IS NULL)`
    );

  if (allMonitors.length === 0) {
    return NextResponse.json({ checked: 0 });
  }

  // Check all monitors in parallel with 5s timeout per request
  const results = await Promise.allSettled(
    allMonitors.map(async (monitor) => {
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

      // Insert check result
      await db.insert(checks).values({
        monitorId: monitor.id,
        statusCode,
        responseMs,
      });

      // Update monitor's last check info
      await db
        .update(monitors)
        .set({
          lastCheckedAt: sql`now()`,
          lastStatus: statusCode,
        })
        .where(eq(monitors.id, monitor.id));

      // Detect down transition: was up (2xx), now not
      const wasUp =
        monitor.lastStatus !== null &&
        monitor.lastStatus >= 200 &&
        monitor.lastStatus < 300;
      const isDown = statusCode === 0 || statusCode >= 400;

      if (wasUp && isDown && monitor.slackWebhookUrl) {
        await sendSlackAlert(monitor.slackWebhookUrl, monitor.url, statusCode);
      }

      // Detect recovery: was down, now up
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

  return NextResponse.json({ checked, failed, total: allMonitors.length });
}

