import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { monitors, checks } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [monitor] = await db
    .select({
      id: monitors.id,
      url: monitors.url,
      lastStatus: monitors.lastStatus,
    })
    .from(monitors)
    .where(eq(monitors.id, id))
    .limit(1);

  if (!monitor) {
    return new Response("Not found", { status: 404 });
  }

  // Calculate 24h uptime
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [stats] = await db
    .select({
      total: sql<number>`count(*)::int`,
      up: sql<number>`count(*) filter (where ${checks.statusCode} >= 200 and ${checks.statusCode} < 300)::int`,
    })
    .from(checks)
    .where(
      sql`${checks.monitorId} = ${id} AND ${checks.checkedAt} >= ${dayAgo}`
    );

  const total = stats?.total ?? 0;
  const up = stats?.up ?? 0;
  const uptimePercent = total > 0 ? Math.round((up / total) * 100) : 100;

  const isUp =
    monitor.lastStatus !== null &&
    monitor.lastStatus >= 200 &&
    monitor.lastStatus < 300;

  const statusColor = isUp ? "#22c55e" : "#ef4444";
  const statusText = isUp ? "UP" : "DOWN";

  // Extract hostname for display
  let hostname: string;
  try {
    hostname = new URL(monitor.url).hostname;
  } catch {
    hostname = monitor.url;
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#18181b",
          padding: "16px 24px",
          fontFamily: "sans-serif",
          borderRadius: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: statusColor,
            }}
          />
          <span style={{ fontSize: "18px", color: "#fff", fontWeight: 600 }}>
            {hostname}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "16px", color: "#a1a1aa" }}>
            {uptimePercent}% uptime
          </span>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: statusColor,
              backgroundColor: isUp ? "#052e16" : "#450a0a",
              padding: "4px 10px",
              borderRadius: "4px",
            }}
          >
            {statusText}
          </span>
        </div>
      </div>
    ),
    { width: 400, height: 56 }
  );
}
