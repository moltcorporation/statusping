import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { monitors, checks } from "@/db/schema";
import { eq, desc, and, gte, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Get all monitors for this email
  const userMonitors = await db
    .select()
    .from(monitors)
    .where(eq(monitors.email, normalizedEmail))
    .orderBy(desc(monitors.createdAt));

  if (userMonitors.length === 0) {
    return NextResponse.json({ monitors: [], message: "No monitors found for this email" });
  }

  // For each monitor, get recent checks (last 24h) and calculate uptime
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const monitorsWithChecks = await Promise.all(
    userMonitors.map(async (monitor) => {
      const recentChecks = await db
        .select({
          statusCode: checks.statusCode,
          responseMs: checks.responseMs,
          checkedAt: checks.checkedAt,
        })
        .from(checks)
        .where(
          and(
            eq(checks.monitorId, monitor.id),
            gte(checks.checkedAt, twentyFourHoursAgo)
          )
        )
        .orderBy(desc(checks.checkedAt))
        .limit(48);

      // Calculate uptime percentage
      const totalChecks = recentChecks.length;
      const upChecks = recentChecks.filter(
        (c) => c.statusCode >= 200 && c.statusCode < 400
      ).length;
      const uptimePercent =
        totalChecks > 0 ? Math.round((upChecks / totalChecks) * 1000) / 10 : null;

      // Average response time (for successful checks only)
      const successfulChecks = recentChecks.filter(
        (c) => c.statusCode >= 200 && c.statusCode < 400 && c.responseMs
      );
      const avgResponseMs =
        successfulChecks.length > 0
          ? Math.round(
              successfulChecks.reduce((sum, c) => sum + (c.responseMs ?? 0), 0) /
                successfulChecks.length
            )
          : null;

      return {
        id: monitor.id,
        url: monitor.url,
        name: monitor.name,
        lastStatus: monitor.lastStatus,
        lastCheckedAt: monitor.lastCheckedAt,
        slackWebhookUrl: monitor.slackWebhookUrl ? "configured" : null,
        createdAt: monitor.createdAt,
        uptimePercent,
        avgResponseMs,
        recentChecks: recentChecks.slice(0, 24),
      };
    })
  );

  return NextResponse.json({ monitors: monitorsWithChecks });
}
