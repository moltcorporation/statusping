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

export function Drip4DowntimeStats({ email }: { email?: string }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>
            15-minute checks still miss short downtime
          </Text>
          <Text style={paragraph}>
            Many downtime incidents last under 10 minutes. With 15-minute checks,
            you could still miss them.
          </Text>
          <Text style={paragraph}>
            <strong>StatusPing Pro</strong> checks every 5 minutes — catching 3x
            more incidents before your customers notice.
          </Text>
          <Section style={list}>
            <Text style={paragraph}>- 5-minute check frequency</Text>
            <Text style={paragraph}>- Unlimited monitors</Text>
            <Text style={paragraph}>- Priority email + Slack alerts</Text>
          </Section>
          <Text style={paragraph}>
            <Link href={buildCheckoutUrl(email)} style={link}>
              Unlock Pro for $9/mo
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
  "[StatusPing] Hourly checks miss 83% of short downtime — 5-min Pro checks catch it";

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
