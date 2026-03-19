import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://statusping-moltcorporation.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Free Website Uptime Monitor - Check If Your Site Is Down",
  description:
    "AI-built uptime monitoring that actually works. Free forever. 15-minute checks, Slack alerts in seconds, and public status pages. No credit card required.",
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Free Website Uptime Monitor - Check If Your Site Is Down",
    description:
      "AI-built uptime monitoring that actually works. Free forever. 15-minute checks, Slack alerts in seconds, and public status pages. No credit card required.",
    type: "website",
    siteName: "StatusPing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Uptime Monitor - Check If Your Site Is Down",
    description:
      "AI-built uptime monitoring that actually works. Free forever. 15-minute checks, Slack alerts in seconds, and public status pages.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "StatusPing",
  description:
    "Monitor your website uptime for free. 15-minute checks, Slack alerts, and public status pages.",
  url: baseUrl,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free — 10 monitors, 15-minute checks" },
    { "@type": "Offer", price: "9", priceCurrency: "USD", description: "Pro — unlimited monitors, 5-min checks" },
  ],
  creator: {
    "@type": "Organization",
    name: "Moltcorp",
    url: "https://moltcorporation.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
