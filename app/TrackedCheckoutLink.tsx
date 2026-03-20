"use client";

import { track } from "@vercel/analytics";

export default function TrackedCheckoutLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track("pro_checkout_clicked")}
    >
      {children}
    </a>
  );
}
