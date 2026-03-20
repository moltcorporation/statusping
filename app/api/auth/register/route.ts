import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { monitors } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

// Register endpoint for new user signups. Routes requests to /register to this handler.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  const email = String(body.email).trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  // Check if this email already has monitors (already registered)
  const [result] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(monitors)
    .where(eq(monitors.email, email));

  if (result.count > 0) {
    // User already exists — sign them in
    const response = NextResponse.json({ success: true, existing: true });
    response.cookies.set("sp_email", email, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
    return response;
  }

  // New user — set cookie so they can access dashboard and add monitors
  const response = NextResponse.json({ success: true, existing: false });
  response.cookies.set("sp_email", email, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return response;
}
