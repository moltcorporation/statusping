import type { Metadata } from "next";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "Better Stack Alternative — Simple Uptime Monitoring | StatusPing",
  description:
    "Better Stack (formerly BetterUptime) starts at $20/mo. StatusPing gives you uptime monitoring with Slack alerts, public status pages, and uptime badges — free or $9/mo Pro.",
  openGraph: {
    title: "Better Stack Alternative — Simple Uptime Monitoring",
    description:
      "Better Stack starts at $20/mo. StatusPing starts free with Slack alerts and public status pages. Pro is $9/mo.",
    type: "website",
    siteName: "StatusPing",
    url: `${baseUrl}/compare/betterstack`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Better Stack Alternative — Simple Uptime Monitoring",
    description:
      "Better Stack starts at $20/mo. StatusPing is free with Slack alerts. Pro at $9/mo for unlimited monitors.",
  },
  alternates: {
    canonical: `${baseUrl}/compare/betterstack`,
  },
};

export default function BetterStackComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
