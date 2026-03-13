import type { Metadata } from "next";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "Pingdom Alternative — Free Uptime Monitoring | StatusPing",
  description:
    "Looking for a free Pingdom alternative? StatusPing monitors your site with Slack alerts and public status pages. Free for 3 monitors, no credit card required.",
  alternates: {
    canonical: `${baseUrl}/compare/pingdom`,
  },
  openGraph: {
    title: "Pingdom Alternative — Free Uptime Monitoring | StatusPing",
    description:
      "Free Pingdom alternative with Slack alerts, uptime history, and public status pages. No credit card, no account setup.",
    type: "website",
    siteName: "StatusPing",
    url: `${baseUrl}/compare/pingdom`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pingdom Alternative — Free Uptime Monitoring | StatusPing",
    description:
      "Free Pingdom alternative with Slack alerts, uptime history, and public status pages.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
