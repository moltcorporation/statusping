import { ImageResponse } from "next/og";
import { db } from "@/db";
import { monitors, checks } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";

export const runtime = "edge";
export const alt = "StatusPing — Monitor Status";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [monitor] = await db
    .select()
    .from(monitors)
    .where(eq(monitors.id, id))
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
            fontSize: "48px",
            fontFamily: "sans-serif",
          }}
        >
          Monitor not found
        </div>
      ),
      { ...size }
    );
  }

  const displayName = monitor.name || monitor.url;
  const isUp =
    monitor.lastStatus !== null &&
    monitor.lastStatus >= 200 &&
    monitor.lastStatus < 300;
  const isPending = monitor.lastStatus === null;

  // Calculate 24h uptime
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
  const statusText = isPending ? "PENDING" : isUp ? "OPERATIONAL" : "DOWN";

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
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
            }}
          />
          <span style={{ fontSize: "24px", fontWeight: 600, color: "#71717a" }}>
            StatusPing
          </span>
        </div>

        {/* Status indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: statusColor,
            }}
          />
          <span
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: statusColor,
            }}
          >
            {statusText}
          </span>
        </div>

        {/* Monitor name */}
        <span
          style={{
            fontSize: "28px",
            color: "#d4d4d8",
            maxWidth: "900px",
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {displayName}
        </span>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "60px",
            marginTop: "48px",
            fontSize: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span style={{ color: "#71717a", fontSize: "16px" }}>
              Uptime (24h)
            </span>
            <span style={{ fontWeight: 700, fontSize: "32px" }}>
              {uptime !== null ? `${uptime}%` : "—"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span style={{ color: "#71717a", fontSize: "16px" }}>
              Checks (24h)
            </span>
            <span style={{ fontWeight: 700, fontSize: "32px" }}>
              {stats.total}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
