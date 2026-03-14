import type { Metadata } from "next";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "Uptime Monitoring 101: How to Monitor Website Uptime for Free | StatusPing",
  description:
    "Learn how to monitor website uptime with free tools. This guide covers HTTP checks, alert setup, check intervals, status pages, and how to choose the right free website monitoring tool for your stack.",
  keywords: [
    "how to monitor website uptime",
    "free website monitoring tools",
    "uptime monitoring guide",
    "website uptime checker",
    "free uptime monitor",
    "website downtime alerts",
  ],
  openGraph: {
    title: "Uptime Monitoring 101: How to Monitor Website Uptime for Free",
    description:
      "Complete guide to website uptime monitoring. Learn how HTTP checks work, compare free monitoring tools, and set up alerts in under a minute.",
    type: "article",
    siteName: "StatusPing",
    url: `${baseUrl}/guides/uptime-monitoring-101`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Uptime Monitoring 101: How to Monitor Website Uptime for Free",
    description:
      "Everything you need to know about monitoring website uptime — from HTTP checks to free tools to alert setup.",
  },
  alternates: {
    canonical: `${baseUrl}/guides/uptime-monitoring-101`,
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
