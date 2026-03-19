import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { monitors, onboardingEmails } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import { buildCheckoutUrl } from "@/lib/stripe";

export const maxDuration = 10;

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://statusping-moltcorporation.vercel.app";

type EmailContent = {
  subject: string;
  body: string;
};

function getEmailForStep(
  step: number,
  monitorCount: number,
  isPro: boolean
): EmailContent | null {
  if (isPro) return null;

  switch (step) {
    case 1:
      return {
        subject: "[StatusPing] Welcome — your first monitor is live",
        body: [
          "Welcome to StatusPing!",
          "",
          "Your first monitor is live and we're already checking it. Here's what to watch for:",
          "",
          "- Green = your site is up and responding normally",
          "- Red = we detected downtime and you'll get an alert",
          "",
          `Check your dashboard: ${APP_URL}/dashboard`,
          "",
          "Tip: Add up to 10 monitors on the free plan. We check every 15 minutes and notify you the moment something goes down.",
          "",
          "— StatusPing",
        ].join("\n"),
      };

    case 2:
      return {
        subject:
          "[StatusPing] Your sites are being watched — here's what Pro unlocks",
        body: [
          "Hey! Your monitors have been running and tracking uptime.",
          "",
          "With the free plan, we check every 15 minutes. But downtime under 15 minutes? You might miss it entirely.",
          "",
          "StatusPing Pro unlocks:",
          "- 5-minute check intervals (12x more frequent)",
          "- Unlimited monitors (free plan caps at 10)",
          "- Priority alerting",
          "",
          `Upgrade for $9/mo: ${buildCheckoutUrl()}`,
          "",
          "— StatusPing",
        ].join("\n"),
      };

    case 3:
      if (monitorCount < 10) return null;
      return {
        subject: "[StatusPing] You're at the free monitor limit",
        body: [
          `You're using ${monitorCount}/10 free monitors. Need to watch more sites?`,
          "",
          "StatusPing Pro gives you unlimited monitors plus 5-minute checks — so you catch downtime before your users do.",
          "",
          `Add unlimited monitors for $9/mo: ${buildCheckoutUrl()}`,
          "",
          "— StatusPing",
        ].join("\n"),
      };

    case 4:
      return {
        subject:
          "[StatusPing] Hourly checks miss 83% of short downtime",
        body: [
          "Quick fact: most downtime incidents last under 10 minutes. With 15-minute checks, you could still miss them.",
          "",
          "StatusPing Pro checks every 5 minutes — catching 3x more incidents before your customers notice.",
          "",
          "For $9/mo, you get:",
          "- 5-minute check frequency",
          "- Unlimited monitors",
          "- Priority email + Slack alerts",
          "",
          `Upgrade now: ${buildCheckoutUrl()}`,
          "",
          "— StatusPing",
        ].join("\n"),
      };

    default:
      return null;
  }
}

// Returns the step to send based on days since signup
function getStepForDay(daysSinceSignup: number): number | null {
  if (daysSinceSignup === 0) return 1; // Day 0: welcome
  if (daysSinceSignup >= 2 && daysSinceSignup < 5) return 2; // Day 2: value reinforcement
  if (daysSinceSignup >= 5 && daysSinceSignup < 7) return 3; // Day 5: limit nudge
  if (daysSinceSignup >= 7) return 4; // Day 7: urgency
  return null;
}

async function sendOnboardingEmail(to: string, subject: string, body: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.EMAIL_FROM ?? "StatusPing <alerts@statusping.dev>";

  if (!apiKey) {
    console.log(
      `[StatusPing] Onboarding email skipped (no RESEND_API_KEY): to=${to} subject="${subject}"`
    );
    return;
  }

  const unsubscribeNote = `\n\n---\nDon't want onboarding emails? Reply "unsubscribe" to opt out.`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text: body + unsubscribeNote,
      }),
    });
  } catch {
    console.error(`[StatusPing] Failed to send onboarding email to ${to}`);
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all unique emails with verified monitors
  const uniqueEmails = await db
    .selectDistinct({ email: monitors.email, createdAt: sql<string>`min(${monitors.createdAt})` })
    .from(monitors)
    .where(eq(monitors.emailVerified, true))
    .groupBy(monitors.email);

  let sent = 0;
  let skipped = 0;

  for (const row of uniqueEmails) {
    const email = row.email;
    const signupDate = new Date(row.createdAt);
    const now = new Date();
    const daysSinceSignup = Math.floor(
      (now.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const targetStep = getStepForDay(daysSinceSignup);
    if (!targetStep) {
      skipped++;
      continue;
    }

    // Upsert onboarding record
    await db
      .insert(onboardingEmails)
      .values({ email })
      .onConflictDoNothing({ target: onboardingEmails.email });

    // Get current state
    const [record] = await db
      .select()
      .from(onboardingEmails)
      .where(eq(onboardingEmails.email, email));

    if (!record || record.unsubscribed || (record.lastStepSent ?? 0) >= targetStep) {
      skipped++;
      continue;
    }

    // Check if user is already Pro
    const proMonitors = await db
      .select({ isPro: monitors.isPro })
      .from(monitors)
      .where(and(eq(monitors.email, email), eq(monitors.isPro, true)))
      .limit(1);

    const isPro = proMonitors.length > 0;

    // Count monitors for step 3 conditional
    const monitorRows = await db
      .select({ id: monitors.id })
      .from(monitors)
      .where(eq(monitors.email, email));

    const monitorCount = monitorRows.length;

    const emailContent = getEmailForStep(targetStep, monitorCount, isPro);
    if (!emailContent) {
      skipped++;
      continue;
    }

    await sendOnboardingEmail(email, emailContent.subject, emailContent.body);

    // Update last step sent
    await db
      .update(onboardingEmails)
      .set({ lastStepSent: targetStep, updatedAt: sql`now()` })
      .where(eq(onboardingEmails.email, email));

    sent++;
  }

  return NextResponse.json({ sent, skipped, total: uniqueEmails.length });
}
