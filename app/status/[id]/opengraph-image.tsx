import { ImageResponse } from "next/og";
import { db } from "@/db";
import { monitors, checks } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";

export const runtime = "edge";
export const alt = "StatusPing Status Page";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [monitor] = await db
    .select()
    .from(monitors)
    .where(and(eq(monitors.id, id), eq(monitors.emailVerified, true)))
    .limit(1);

  if (!monitor) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            color: "#fff",
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          StatusPing
        </div>
      ),
      { ...size }
    );
  }

  const host = new URL(monitor.url).hostname;
  const isUp =
    monitor.lastStatus !== null &&
    monitor.lastStatus >= 200 &&
    monitor.lastStatus < 300;
  const isPending = monitor.lastStatus === null;

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [stats] = await db
    .select({
      total: sql<number>`count(*)::int`,
      up: sql<number>`count(*) filter (where ${checks.statusCode} >= 200 and ${checks.statusCode} < 300)::int`,
    })
    .from(checks)
    .where(
      and(
        eq(checks.monitorId, id),
        sql`${checks.checkedAt} >= ${twentyFourHoursAgo}`
      )
    );

  const uptime =
    stats.total > 0 ? Math.round((stats.up / stats.total) * 100) : null;

  const statusColor = isPending ? "#a1a1aa" : isUp ? "#22c55e" : "#ef4444";
  const statusText = isPending ? "PENDING" : isUp ? "UP" : "DOWN";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          color: "#fff",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: statusColor,
            }}
          />
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: statusColor,
              letterSpacing: "0.05em",
            }}
          >
            {statusText}
          </span>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {host}
        </div>
        {uptime !== null && (
          <div
            style={{
              fontSize: 24,
              color: "#a1a1aa",
            }}
          >
            {uptime}% uptime (24h)
          </div>
        )}
        <div
          style={{
            fontSize: 18,
            color: "#52525b",
            marginTop: 16,
          }}
        >
          Monitored by StatusPing
        </div>
      </div>
    ),
    { ...size }
  );
}
