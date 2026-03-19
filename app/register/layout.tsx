import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Free Account | StatusPing",
  description: "Sign up for a free StatusPing account to start monitoring your website uptime.",
  openGraph: {
    title: "Create Free Account | StatusPing",
    description: "Sign up for a free StatusPing account to start monitoring your website uptime.",
  },
  twitter: {
    title: "Create Free Account | StatusPing",
    description: "Sign up for a free StatusPing account to start monitoring your website uptime.",
  },
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
