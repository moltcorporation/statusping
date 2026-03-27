import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { monitors, pageViews, activationEvents } from "@/db/schema";
import { sql, count, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // --- Visitor metrics ---
    const [totalSignups] = await db
      .select({ total: count() })
      .from(monitors);

    const [signupsToday] = await db
      .select({ total: count() })
      .from(monitors)
      .where(sql`${monitors.createdAt} >= current_date`);

    const [visitorsTotal] = await db
      .select({ total: count() })
      .from(pageViews);

    const [visitorsToday] = await db
      .select({ total: count() })
      .from(pageViews)
      .where(sql`${pageViews.createdAt} >= current_date`);

    const visitorsBySource = await db
      .select({
        source: sql<string>`coalesce(${pageViews.utmSource}, 'direct')`,
        total: count(),
      })
      .from(pageViews)
      .where(sql`${pageViews.createdAt} >= current_date`)
      .groupBy(sql`coalesce(${pageViews.utmSource}, 'direct')`);

    const visitorsTodayCount = visitorsToday.total;
    const conversionRate =
      visitorsTodayCount > 0
        ? Math.round((signupsToday.total / visitorsTodayCount) * 1000) / 10
        : 0;

    // --- Unique users (distinct emails) ---
    const [uniqueUsers] = await db
      .select({ total: sql<number>`count(distinct ${monitors.email})::int` })
      .from(monitors);

    // --- Pro users ---
    const [proUsers] = await db
      .select({ total: sql<number>`count(distinct ${monitors.email})::int` })
      .from(monitors)
      .where(eq(monitors.isPro, true));

    // --- Activation depth ---
    // Count distinct emails that reached each milestone
    const milestones = await db
      .select({
        event: activationEvents.event,
        total: count(),
      })
      .from(activationEvents)
      .groupBy(activationEvents.event);

    const milestoneMap = milestones.reduce(
      (acc, row) => ({ ...acc, [row.event]: row.total }),
      {} as Record<string, number>
    );

    const totalUniqueUsers = uniqueUsers.total;
    const firstMonitorCount = milestoneMap["first_monitor_added"] ?? 0;
    const activationRate =
      totalUniqueUsers > 0
        ? Math.round((firstMonitorCount / totalUniqueUsers) * 1000) / 10
        : 0;

    return NextResponse.json({
      signups_total: totalSignups.total,
      signups_today: signupsToday.total,
      monitors_created: totalSignups.total,
      users_with_monitors: totalUniqueUsers,
      unique_users: totalUniqueUsers,
      pro_users: proUsers.total,
      visitors_total: visitorsTotal.total,
      visitors_today: visitorsTodayCount,
      visitors_by_source: visitorsBySource.reduce(
        (acc, row) => ({ ...acc, [row.source]: row.total }),
        {} as Record<string, number>
      ),
      conversion_rate: conversionRate,
      activation: {
        total_users: totalUniqueUsers,
        first_monitor_added: firstMonitorCount,
        status_page_shared: milestoneMap["status_page_shared"] ?? 0,
        alert_configured: milestoneMap["alert_configured"] ?? 0,
        hit_free_limit: milestoneMap["hit_free_limit"] ?? 0,
        activation_rate: activationRate,
      },
      generated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Metrics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
