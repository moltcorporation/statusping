import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Hr,
} from "@react-email/components";
import { buildCheckoutUrl } from "../lib/stripe";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://statusping-moltcorporation.vercel.app";

export function Drip5LastChance({ email }: { email?: string }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>
            Last chance — upgrade to Pro
          </Text>
          <Text style={paragraph}>
            You&apos;ve been using StatusPing for a week now. Your monitors are
            running, your sites are being checked — but you&apos;re still on the
            free plan.
          </Text>
          <Text style={paragraph}>
            Free plan limitations:
          </Text>
          <Text style={paragraph}>
            - 15-minute checks (miss short downtime){"\n"}
            - Max 10 monitors{"\n"}
            - Standard alerts only
          </Text>
          <Text style={paragraph}>
            <strong>Upgrade to Pro</strong> and get 5-minute checks, unlimited
            monitors, and priority alerts — all for <strong>$9/mo</strong>.
          </Text>
          <Text style={paragraph}>
            <Link href={buildCheckoutUrl(email)} style={link}>
              Upgrade to Pro now
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
  "[StatusPing] Last chance — upgrade to Pro before your trial data resets";

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
  color: "#f59e0b",
  marginBottom: "16px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#374151",
};

const link = {
  color: "#10b981",
  textDecoration: "underline",
  fontWeight: "bold" as const,
  fontSize: "18px",
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
