import { db } from "@/db";
import { activationEvents } from "@/db/schema";

export type ActivationEvent =
  | "first_monitor_added"
  | "status_page_shared"
  | "alert_configured"
  | "hit_free_limit";

/**
 * Record an activation milestone for a user. Idempotent — only the first
 * occurrence per email+event is stored (uses ON CONFLICT DO NOTHING).
 */
export async function trackActivation(
  email: string,
  event: ActivationEvent
): Promise<void> {
  try {
    await db
      .insert(activationEvents)
      .values({ email, event })
      .onConflictDoNothing();
  } catch (err) {
    console.error(`[activation] Failed to track ${event} for ${email}:`, err);
  }
}
