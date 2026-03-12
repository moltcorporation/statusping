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
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
            }}
          />
          <span style={{ fontSize: "64px", fontWeight: 700 }}>StatusPing</span>
        </div>
        <span
          style={{
            fontSize: "28px",
            color: "#a1a1aa",
            maxWidth: "600px",
            textAlign: "center",
          }}
        >
          Free uptime monitoring with hourly checks and Slack alerts
        </span>
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "48px",
            fontSize: "20px",
            color: "#71717a",
          }}
        >
          <span>Hourly checks</span>
          <span>•</span>
          <span>Slack alerts</span>
          <span>•</span>
          <span>Uptime history</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
