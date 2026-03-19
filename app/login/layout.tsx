import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | StatusPing",
  description: "Sign in to your StatusPing account to manage your website monitors.",
  openGraph: {
    title: "Sign In | StatusPing",
    description: "Sign in to your StatusPing account to manage your website monitors.",
  },
  twitter: {
    title: "Sign In | StatusPing",
    description: "Sign in to your StatusPing account to manage your website monitors.",
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
