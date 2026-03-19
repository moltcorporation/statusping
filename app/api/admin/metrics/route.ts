import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { monitors, pageViews } from "@/db/schema";
import { sql, count } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
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

    const signupsTotal = totalSignups.total;
    const visitorsTodayCount = visitorsToday.total;
    const conversionRate =
      visitorsTodayCount > 0
        ? Math.round((signupsToday.total / visitorsTodayCount) * 1000) / 10
        : 0;

    return NextResponse.json({
      signups_total: signupsTotal,
      signups_today: signupsToday.total,
      visitors_total: visitorsTotal.total,
      visitors_today: visitorsTodayCount,
      visitors_by_source: visitorsBySource.reduce(
        (acc, row) => ({ ...acc, [row.source]: row.total }),
        {} as Record<string, number>
      ),
      conversion_rate: conversionRate,
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
