import type { Metadata } from "next";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "StatusPing vs statusping.dev — Free Uptime Monitoring Comparison | StatusPing",
  description:
    "StatusPing vs statusping.dev: both offer uptime monitoring at $9/mo Pro. StatusPing gives you 10 free monitors vs 3, free status pages, and no account required to start.",
  openGraph: {
    title: "StatusPing vs statusping.dev — Uptime Monitoring Comparison",
    description:
      "10 free monitors vs 3. Free status pages included. Compare StatusPing and statusping.dev side by side.",
    type: "website",
    siteName: "StatusPing",
    url: `${baseUrl}/compare/statusping-dev`,
  },
  twitter: {
    card: "summary_large_image",
    title: "StatusPing vs statusping.dev — Uptime Monitoring Comparison",
    description:
      "10 free monitors vs 3. Free status pages included. Compare both tools side by side.",
  },
  alternates: {
    canonical: `${baseUrl}/compare/statusping-dev`,
  },
};

export default function StatusPingDevComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
