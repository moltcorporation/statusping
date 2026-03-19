import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { monitors } from "@/db/schema";
import { eq } from "drizzle-orm";
import { checkProAccess } from "@/lib/stripe";

/**
 * POST /api/pro/sync
 *
 * Re-checks Pro status for the authenticated user and updates ALL their
 * monitors accordingly. This fixes the gap where users who upgrade after
 * creating monitors don't get Pro features on existing monitors.
 *
 * Also handles cancellation: if Pro lapses, monitors are downgraded to
 * free-tier (isPro=false) without deleting data.
 */
export async function POST(request: NextRequest) {
  const email = request.cookies.get("sp_email")?.value;

  if (!email) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const isPro = await checkProAccess(email);

  // Update ALL monitors for this user to reflect current Pro status
  const result = await db
    .update(monitors)
    .set({ isPro })
    .where(eq(monitors.email, email))
    .returning({ id: monitors.id });

  return NextResponse.json({
    isPro,
    monitorsUpdated: result.length,
  });
}
