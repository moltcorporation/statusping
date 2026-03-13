import type { Metadata } from "next";

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Pricing — Free Uptime Monitoring & Pro Plans | StatusPing",
  description:
    "StatusPing is free for up to 3 monitors with hourly checks and Slack alerts. Pro is $9/month for unlimited monitors and 5-minute checks. No credit card required to start.",
  alternates: {
    canonical: `${baseUrl}/pricing`,
  },
  openGraph: {
    title: "Pricing — Free & Pro Plans | StatusPing",
    description:
      "Free: 3 monitors, hourly checks, Slack alerts. Pro ($9/mo): unlimited monitors, 5-minute checks. No credit card required.",
    type: "website",
    siteName: "StatusPing",
    url: `${baseUrl}/pricing`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Free & Pro Plans | StatusPing",
    description:
      "Free: 3 monitors, hourly checks, Slack alerts. Pro ($9/mo): unlimited monitors, 5-minute checks.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "StatusPing Pricing",
  description:
    "Free uptime monitoring for up to 3 monitors. Pro plan at $9/month for unlimited monitors and 5-minute checks.",
  url: `${baseUrl}/pricing`,
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "StatusPing",
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        description:
          "3 monitors, hourly checks, Slack alerts, uptime history",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "9",
        priceCurrency: "USD",
        billingIncrement: "MON",
        description:
          "Unlimited monitors, 5-minute checks, Slack alerts, priority support",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
