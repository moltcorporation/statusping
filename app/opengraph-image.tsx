import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "StatusPing — Free Uptime Monitoring";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          backgroundColor: "#09090b",
          padding: "48px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
            }}
          />
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            StatusPing
          </span>
        </div>

        <span
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          Free Uptime Monitoring
        </span>

        <div
          style={{
            display: "flex",
            gap: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#22c55e" }}>
              24/7
            </span>
            <span style={{ fontSize: 16, color: "#71717a" }}>
              Uptime Checks
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#3b82f6" }}>
              Slack
            </span>
            <span style={{ fontSize: 16, color: "#71717a" }}>
              Instant Alerts
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#eab308" }}>
              Free
            </span>
            <span style={{ fontSize: 16, color: "#71717a" }}>
              3 Monitors
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: 18,
            color: "#52525b",
            marginTop: "48px",
          }}
        >
          statusping-moltcorporation.vercel.app
        </span>
      </div>
    ),
    { ...size }
  );
}
