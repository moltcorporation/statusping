import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StatusPing — Free Uptime Monitoring",
  description:
    "Know when your site goes down. Free uptime monitoring with hourly checks and Slack alerts. No signup required.",
  openGraph: {
    title: "StatusPing — Free Uptime Monitoring",
    description:
      "Know when your site goes down. Free uptime monitoring with hourly checks and Slack alerts.",
    type: "website",
    siteName: "StatusPing",
  },
  twitter: {
    card: "summary_large_image",
    title: "StatusPing — Free Uptime Monitoring",
    description:
      "Know when your site goes down. Free hourly uptime checks with Slack alerts.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
