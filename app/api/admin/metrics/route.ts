import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { monitors } from "@/db/schema";
import { sql, count } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Total unique signups (distinct emails)
    const [totalSignups] = await db
      .select({ total: sql<number>`count(distinct ${monitors.email})` })
      .from(monitors);

    // Signups today (distinct emails where first monitor was created today)
    const [signupsToday] = await db
      .select({ total: sql<number>`count(distinct ${monitors.email})` })
      .from(monitors)
      .where(sql`${monitors.createdAt} >= current_date`);

    // Signups by source
    const bySource = await db
      .select({
        source: sql<string>`coalesce(${monitors.utmSource}, 'direct')`,
        total: sql<number>`count(distinct ${monitors.email})`,
      })
      .from(monitors)
      .groupBy(sql`coalesce(${monitors.utmSource}, 'direct')`);

    // Total paid users (distinct emails with isPro)
    const [payments] = await db
      .select({ total: sql<number>`count(distinct ${monitors.email})` })
      .from(monitors)
      .where(sql`${monitors.isPro} = true`);

    return NextResponse.json({
      signups_total: totalSignups.total,
      signups_today: signupsToday.total,
      signups_by_source: bySource.reduce(
        (acc, row) => ({ ...acc, [row.source]: row.total }),
        {} as Record<string, number>
      ),
      payments_total: payments.total,
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
