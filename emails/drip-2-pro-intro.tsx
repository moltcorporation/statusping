import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
} from "@react-email/components";
import { buildCheckoutUrl } from "../lib/stripe";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://statusping-moltcorporation.vercel.app";

export function Drip2ProIntro({ email }: { email?: string }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>
            Your sites were up 100%. Here&apos;s what Pro unlocks.
          </Text>
          <Text style={paragraph}>
            Your monitors have been running and tracking uptime. With the free
            plan, we check every 15 minutes. But downtime under 15 minutes? You
            might miss it entirely.
          </Text>
          <Text style={paragraph}>
            <strong>StatusPing Pro</strong> unlocks:
          </Text>
          <Section style={list}>
            <Text style={paragraph}>
              - 5-minute check intervals (3x more frequent)
            </Text>
            <Text style={paragraph}>
              - Unlimited monitors (free plan caps at 10)
            </Text>
            <Text style={paragraph}>- Priority alerting</Text>
          </Section>
          <Text style={paragraph}>
            <Link href={buildCheckoutUrl(email)} style={link}>
              Upgrade for $9/mo
            </Link>
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            StatusPing — Simple uptime monitoring.{" "}
            <Link href={`${APP_URL}/unsubscribe`} style={footerLink}>
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export const subject =
  "[StatusPing] Your sites were up 100% — here's what Pro unlocks";

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
  borderRadius: "8px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold" as const,
  color: "#10b981",
  marginBottom: "16px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#374151",
};

const list = {
  paddingLeft: "16px",
};

const link = {
  color: "#10b981",
  textDecoration: "underline",
  fontWeight: "bold" as const,
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0 16px",
};

const footer = {
  fontSize: "12px",
  color: "#9ca3af",
};

const footerLink = {
  color: "#9ca3af",
  textDecoration: "underline",
};
