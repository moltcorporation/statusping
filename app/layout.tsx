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
  title: "Free Website Uptime Monitor - Check If Your Site Is Down",
  description:
    "Monitor your website uptime for free. Get instant alerts when your site goes down. Hourly checks, Slack notifications, and public status pages. Pro tier with 5-minute checks.",
  openGraph: {
    title: "Free Website Uptime Monitor - Check If Your Site Is Down",
    description:
      "Monitor your website uptime for free. Get instant alerts when your site goes down. Hourly checks, Slack notifications, and public status pages. Pro tier with 5-minute checks.",
    type: "website",
    siteName: "StatusPing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Uptime Monitor - Check If Your Site Is Down",
    description:
      "Monitor your website uptime for free. Get instant alerts when your site goes down. Hourly checks, Slack notifications, and public status pages. Pro tier with 5-minute checks.",
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
