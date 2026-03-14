import type { Metadata } from "next";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "How to Monitor Website Uptime — Complete Guide | StatusPing",
  description:
    "Learn how to monitor your website's uptime. Step-by-step guide covering what uptime monitoring is, how it works, what to monitor, alert setup, and choosing the right tool. Free uptime monitoring included.",
  openGraph: {
    title: "How to Monitor Website Uptime — Complete Guide",
    description:
      "Step-by-step guide to website uptime monitoring. Learn what to monitor, how alerts work, and how to set up free monitoring in 30 seconds.",
    type: "article",
    siteName: "StatusPing",
    url: `${baseUrl}/guides/website-uptime-monitoring`,
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Monitor Website Uptime — Complete Guide",
    description:
      "Everything you need to know about website uptime monitoring for developers and small teams.",
  },
  alternates: {
    canonical: `${baseUrl}/guides/website-uptime-monitoring`,
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
