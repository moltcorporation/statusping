import type { Metadata } from "next";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "HetrixTools Alternative — Simpler Free Uptime Monitoring | StatusPing",
  description:
    "HetrixTools offers 15 free monitors but requires account setup. StatusPing gives you free uptime monitoring with Slack alerts in 30 seconds — no account needed.",
  openGraph: {
    title: "HetrixTools Alternative | StatusPing",
    description:
      "HetrixTools has a generous free tier. StatusPing trades monitor count for simplicity — free uptime checks with Slack alerts, no account required.",
    type: "website",
    siteName: "StatusPing",
    url: `${baseUrl}/compare/hetrixtools`,
  },
  twitter: {
    card: "summary_large_image",
    title: "HetrixTools Alternative | StatusPing",
    description:
      "HetrixTools has a generous free tier. StatusPing trades monitor count for simplicity — free uptime checks with Slack alerts, no account required.",
  },
  alternates: {
    canonical: `${baseUrl}/compare/hetrixtools`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
