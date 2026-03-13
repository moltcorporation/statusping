import type { Metadata } from "next";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "Freshping Alternative — Free Uptime Monitoring After Shutdown | StatusPing",
  description:
    "Freshping by Freshworks is shutting down in March 2026. StatusPing is a free alternative with Slack alerts, public status pages, and uptime badges. Migrate in 30 seconds.",
  alternates: {
    canonical: `${baseUrl}/compare/freshping`,
  },
  openGraph: {
    title: "Freshping Alternative After Shutdown — StatusPing",
    description:
      "Freshping is shutting down. StatusPing is the free replacement — uptime monitoring with Slack alerts and public status pages.",
    type: "website",
    siteName: "StatusPing",
    url: `${baseUrl}/compare/freshping`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Freshping Alternative After Shutdown — StatusPing",
    description:
      "Freshping is shutting down. StatusPing replaces it with free uptime monitoring, Slack alerts, and public status pages.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
