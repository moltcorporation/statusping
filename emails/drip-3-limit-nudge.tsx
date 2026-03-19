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

export function Drip3LimitNudge({ email }: { email?: string }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>You&apos;re using 10/10 monitors</Text>
          <Text style={paragraph}>
            You&apos;ve hit the free plan limit. Need to watch more sites?
          </Text>
          <Text style={paragraph}>
            <strong>StatusPing Pro</strong> gives you unlimited monitors plus
            5-minute checks — so you catch downtime before your users do.
          </Text>
          <Text style={paragraph}>
            <Link href={buildCheckoutUrl(email)} style={link}>
              Add unlimited monitors for $9/mo
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
  "[StatusPing] You're using 10/10 monitors — unlimited for $9/mo";

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
