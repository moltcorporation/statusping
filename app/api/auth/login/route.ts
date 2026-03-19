import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { monitors } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

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

  // Check if this email has any monitors
  const [result] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(monitors)
    .where(eq(monitors.email, email));

  if (result.count === 0) {
    return NextResponse.json(
      { error: "No account found with this email. Add a monitor first to get started." },
      { status: 404 }
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("sp_email", email, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });

  return response;
}
