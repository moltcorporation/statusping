/**
 * Drip email scheduling helpers.
 *
 * On signup, schedule 5 emails at offsets: Day 0, Day 2, Day 5, Day 7.
 * Email 3 (limit nudge) is sent on Day 3 when applicable.
 */

import { db } from "@/db";
import { dripSchedule } from "@/db/schema";
import { eq, and, isNull } from "drizzle-orm";

/** Day offsets for each drip email (1-indexed) */
const DRIP_OFFSETS_DAYS = [0, 2, 3, 5, 7];

/**
 * Insert 5 drip schedule rows for a new user.
 * Idempotent: skips if rows already exist for this email.
 */
export async function scheduleDripEmails(email: string) {
  // Check if drip emails are already scheduled for this email
  const existing = await db
    .select({ id: dripSchedule.id })
    .from(dripSchedule)
    .where(eq(dripSchedule.email, email))
    .limit(1);

  if (existing.length > 0) return;

  const now = new Date();
  const rows = DRIP_OFFSETS_DAYS.map((offsetDays, index) => {
    const sendAt = new Date(now.getTime() + offsetDays * 24 * 60 * 60 * 1000);
    return {
      email,
      emailNumber: (index + 1) as 1 | 2 | 3 | 4 | 5,
      sendAt,
    };
  });

  await db.insert(dripSchedule).values(rows);
}

/**
 * Get all pending drip emails ready to send (send_at <= now, not yet sent).
 */
export async function getPendingDripEmails() {
  const { lte } = await import("drizzle-orm");
  return db
    .select()
    .from(dripSchedule)
    .where(and(isNull(dripSchedule.sentAt), lte(dripSchedule.sendAt, new Date())));
}

/**
 * Mark a drip email as sent.
 */
export async function markDripSent(id: string) {
  await db
    .update(dripSchedule)
    .set({ sentAt: new Date() })
    .where(eq(dripSchedule.id, id));
}

/**
 * Cancel all unsent drip emails for a user (e.g., when they upgrade to Pro).
 */
export async function cancelDripEmails(email: string) {
  await db
    .update(dripSchedule)
    .set({ sentAt: new Date() })
    .where(and(eq(dripSchedule.email, email), isNull(dripSchedule.sentAt)));
}
