import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { monitors } from "@/db/schema";
import { eq, and, count } from "drizzle-orm";
import { randomBytes } from "crypto";
import { checkProAccess, buildCheckoutUrl } from "@/lib/stripe";
import { scheduleDripEmails } from "@/lib/drip";
import { trackActivation } from "@/lib/activation";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.url || !body?.email) {
    return NextResponse.json(
      { error: "URL and email are required" },
      { status: 400 }
    );
  }

  const url = String(body.url).trim();
  const email = String(body.email).trim().toLowerCase();

  // Validate URL
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Invalid protocol");
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // Validate email (basic check)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  // Check if user is Pro via Moltcorp platform payment check
  const isPro = await checkProAccess(email);

  // If user is now Pro, retroactively upgrade all their existing monitors
  if (isPro) {
    await db
      .update(monitors)
      .set({ isPro: true })
      .where(eq(monitors.email, email));
  }

  // Check monitor limit: max 10 per email (free tier), unlimited for Pro
  const [existing] = await db
    .select({ count: count() })
    .from(monitors)
    .where(eq(monitors.email, email));

  if (!isPro && existing.count >= 10) {
    trackActivation(email, "hit_free_limit");
    return NextResponse.json(
      {
        error: "You've reached your free plan limit of 10 monitors. Upgrade to Pro for unlimited monitors and 5-minute checks.",
        upgradeUrl: buildCheckoutUrl(email),
        limitType: "monitors",
      },
      { status: 429 }
    );
  }

  // Check for duplicate URL + email
  const [dupe] = await db
    .select({ count: count() })
    .from(monitors)
    .where(and(eq(monitors.email, email), eq(monitors.url, url)));

  if (dupe.count > 0) {
    return NextResponse.json(
      { error: "You are already monitoring this URL" },
      { status: 409 }
    );
  }

  const verifyToken = randomBytes(32).toString("hex");

  const [monitor] = await db
    .insert(monitors)
    .values({
      url,
      email,
      verifyToken,
      isPro,
    })
    .returning({ id: monitors.id });

  // TODO: Send verification email once email service is available
  // For now, auto-verify so the MVP works without email infrastructure
  await db
    .update(monitors)
    .set({ emailVerified: true })
    .where(eq(monitors.id, monitor.id));

  // Track first monitor activation milestone
  if (existing.count === 0) {
    trackActivation(email, "first_monitor_added");
  }

  // Schedule drip email sequence for new users (idempotent — skips if already scheduled)
  if (!isPro) {
    scheduleDripEmails(email).catch((err) =>
      console.error("[StatusPing] Failed to schedule drip emails:", err)
    );
  }

  const response = NextResponse.json({
    id: monitor.id,
    url,
    message:
      "Monitor added and activated. We will check your site every 15 minutes.",
  });

  // Set email cookie so the dashboard knows who this user is
  response.cookies.set("sp_email", email, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });

  return response;
}
