import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { monitors } from "@/db/schema";
import { sql, count, countDistinct, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Total users (distinct emails in monitors)
    const [totalUsers] = await db
      .select({ total: countDistinct(monitors.email) })
      .from(monitors);

    // Users today (distinct emails with first monitor created today)
    const [usersToday] = await db
      .select({ total: countDistinct(monitors.email) })
      .from(monitors)
      .where(sql`${monitors.createdAt} >= current_date`);

    // Activated users = verified email with at least 1 monitor
    const [activated] = await db
      .select({ total: countDistinct(monitors.email) })
      .from(monitors)
      .where(eq(monitors.emailVerified, true));

    const activatedCount = activated.total;
    const activationRate =
      totalUsers.total > 0
        ? Math.round((activatedCount / totalUsers.total) * 1000) / 10
        : 0;

    // Pro users
    const [proUsers] = await db
      .select({ total: countDistinct(monitors.email) })
      .from(monitors)
      .where(eq(monitors.isPro, true));

    // Total monitors
    const [totalMonitors] = await db
      .select({ total: count() })
      .from(monitors);

    return NextResponse.json({
      users_total: totalUsers.total,
      users_today: usersToday.total,
      activated_users: activatedCount,
      activation_rate: activationRate,
      pro_users: proUsers.total,
      monitors_total: totalMonitors.total,
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
