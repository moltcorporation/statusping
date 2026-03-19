import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { monitors } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  const email = String(body.email).trim().toLowerCase();

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  // Check if user has any monitors (verifies they're a returning user)
  const userMonitors = await db
    .select({ id: monitors.id })
    .from(monitors)
    .where(eq(monitors.email, email))
    .limit(1);

  if (userMonitors.length === 0) {
    // User not found - they can go create monitors from the homepage
    return NextResponse.json(
      { error: "No monitors found for this email. Start monitoring a URL on the homepage." },
      { status: 404 }
    );
  }

  const response = NextResponse.json({
    message: "Signed in successfully",
  });

  // Set email cookie to authenticate user
  response.cookies.set("sp_email", email, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });

  return response;
}
