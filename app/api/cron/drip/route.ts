import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/components";
import { db } from "@/db";
import { monitors } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getPendingDripEmails, markDripSent, cancelDripEmails } from "@/lib/drip";
import { Drip1Welcome } from "@/emails/drip-1-welcome";
import { subject as subject1 } from "@/emails/drip-1-welcome";
import { Drip2ProIntro } from "@/emails/drip-2-pro-intro";
import { subject as subject2 } from "@/emails/drip-2-pro-intro";
import { Drip3LimitNudge } from "@/emails/drip-3-limit-nudge";
import { subject as subject3 } from "@/emails/drip-3-limit-nudge";
import { Drip4DowntimeStats } from "@/emails/drip-4-downtime-stats";
import { subject as subject4 } from "@/emails/drip-4-downtime-stats";
import { Drip5LastChance } from "@/emails/drip-5-last-chance";
import { subject as subject5 } from "@/emails/drip-5-last-chance";

export const maxDuration = 30;

function getEmailTemplate(emailNumber: number, email: string) {
  switch (emailNumber) {
    case 1:
      return { subject: subject1, element: Drip1Welcome() };
    case 2:
      return { subject: subject2, element: Drip2ProIntro({ email }) };
    case 3:
      return { subject: subject3, element: Drip3LimitNudge({ email }) };
    case 4:
      return { subject: subject4, element: Drip4DowntimeStats({ email }) };
    case 5:
      return { subject: subject5, element: Drip5LastChance({ email }) };
    default:
      return null;
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[StatusPing] Drip cron skipped — no RESEND_API_KEY");
    return NextResponse.json({ sent: 0, skipped: 0, reason: "no_api_key" });
  }

  const resend = new Resend(apiKey);
  const from = process.env.EMAIL_FROM ?? "StatusPing <alerts@statusping.dev>";
  const pending = await getPendingDripEmails();

  let sent = 0;
  let skipped = 0;

  for (const row of pending) {
    // Skip if user already upgraded to Pro
    const proMonitors = await db
      .select({ isPro: monitors.isPro })
      .from(monitors)
      .where(and(eq(monitors.email, row.email), eq(monitors.isPro, true)))
      .limit(1);

    if (proMonitors.length > 0) {
      // Cancel all remaining drip emails for this Pro user
      await cancelDripEmails(row.email);
      skipped++;
      continue;
    }

    const template = getEmailTemplate(row.emailNumber, row.email);
    if (!template) {
      skipped++;
      continue;
    }

    try {
      const html = await render(template.element);
      await resend.emails.send({
        from,
        to: row.email,
        subject: template.subject,
        html,
      });
      await markDripSent(row.id);
      sent++;
    } catch (err) {
      console.error(
        `[StatusPing] Failed to send drip email #${row.emailNumber} to ${row.email}:`,
        err
      );
      skipped++;
    }
  }

  return NextResponse.json({ sent, skipped, total: pending.length });
}
