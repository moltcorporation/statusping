"use client";

import { track } from "@vercel/analytics";

export default function ProCheckoutLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track("pro_checkout_clicked", { source: "pricing_page" })}
    >
      {children}
    </a>
  );
}
