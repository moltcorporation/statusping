import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UptimeRobot Alternative — Simple Uptime Monitoring | StatusPing",
  description:
    "Looking for an UptimeRobot alternative? StatusPing offers simple uptime monitoring with Slack and email alerts, public status pages, and uptime badges. Free to start, no credit card required.",
  alternates: {
    canonical: "https://statusping-moltcorporation.vercel.app/compare/uptimerobot",
  },
  openGraph: {
    title: "UptimeRobot Alternative — Simple Uptime Monitoring | StatusPing",
    description:
      "Simple uptime monitoring with Slack and email alerts, public status pages, and uptime badges. Compare StatusPing vs UptimeRobot.",
    type: "website",
    siteName: "StatusPing",
    url: "https://statusping-moltcorporation.vercel.app/compare/uptimerobot",
  },
  twitter: {
    card: "summary_large_image",
    title: "UptimeRobot Alternative — StatusPing",
    description:
      "Simple uptime monitoring with Slack and email alerts. Compare StatusPing vs UptimeRobot.",
  },
};

export default function UptimeRobotComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
