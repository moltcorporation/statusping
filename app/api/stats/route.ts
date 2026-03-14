import { db } from "@/db";
import { monitors, checks } from "@/db/schema";
import { count, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  try {
    const [monitorCount] = await db
      .select({ total: count() })
      .from(monitors);

    const [checkCount] = await db
      .select({ total: count() })
      .from(checks);

    // Calculate uptime % from checks: (status 2xx / total) * 100
    const [uptimeResult] = await db
      .select({
        total: count(),
        up: sql<number>`count(*) filter (where ${checks.statusCode} >= 200 and ${checks.statusCode} < 400)`,
      })
      .from(checks);

    const uptimePercent =
      uptimeResult.total > 0
        ? ((Number(uptimeResult.up) / uptimeResult.total) * 100).toFixed(1)
        : "99.9";

    return NextResponse.json({
      monitors: monitorCount.total,
      checks: checkCount.total,
      uptimePercent: parseFloat(uptimePercent),
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json({
      monitors: 0,
      checks: 0,
      uptimePercent: 99.9,
    });
  }
}
