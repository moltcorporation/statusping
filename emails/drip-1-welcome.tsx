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

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://statusping-moltcorporation.vercel.app";

export function Drip1Welcome() {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>Your first monitor is live</Text>
          <Text style={paragraph}>Welcome to StatusPing!</Text>
          <Text style={paragraph}>
            Your monitor is active and we&apos;re already checking it. Here&apos;s what
            to watch for:
          </Text>
          <Section style={list}>
            <Text style={paragraph}>
              <strong>Green</strong> — your site is up and responding normally
            </Text>
            <Text style={paragraph}>
              <strong>Red</strong> — we detected downtime and you&apos;ll get an
              alert
            </Text>
          </Section>
          <Text style={paragraph}>
            <Link href={`${APP_URL}/dashboard`} style={link}>
              Check your dashboard
            </Link>
          </Text>
          <Text style={paragraph}>
            <strong>Tip:</strong> Add up to 3 monitors on the free plan. We
            check every hour and notify you the moment something goes down.
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

export const subject = "[StatusPing] Your first monitor is live — here's what to watch for";

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
