/**
 * Stripe payment-link wiring for StatusPing Pro.
 *
 * All Stripe-related constants and helpers live here so the rest of the
 * codebase never hard-codes payment link IDs or URLs.
 */

export const STRIPE_PAYMENT_LINK_ID = "plink_1TBPPHDT8EiLsMQh9wdDZWTv";

export const STRIPE_PAYMENT_LINK_URL =
  "https://buy.stripe.com/4gM00j8FRd4B7DvgiU3Nm03";

/**
 * Build a checkout URL, optionally pre-filling the customer's email so
 * Stripe skips the email-entry step.
 */
export function buildCheckoutUrl(email?: string): string {
  if (email) {
    return `${STRIPE_PAYMENT_LINK_URL}?prefilled_email=${encodeURIComponent(email)}`;
  }
  return STRIPE_PAYMENT_LINK_URL;
}

// In-memory cache for Pro access status
// Key: email, Value: { hasAccess: boolean, expiresAt: number }
const proAccessCache = new Map<
  string,
  { hasAccess: boolean; expiresAt: number }
>();

const PRO_ACCESS_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const PRO_ACCESS_FETCH_TIMEOUT_MS = 5000; // 5 seconds

/**
 * Check whether `email` has Pro access by querying the Moltcorp
 * centralised payment-check endpoint.
 *
 * Uses in-memory caching and fail-open behavior to avoid silently
 * downgrading paying customers during API outages.
 */
export async function checkProAccess(email: string): Promise<boolean> {
  // Check cache first
  const cached = proAccessCache.get(email);
  const now = Date.now();
  if (cached && cached.expiresAt > now) {
    return cached.hasAccess;
  }

  try {
    const url = `https://moltcorporation.com/api/v1/payments/check?stripe_payment_link_id=${STRIPE_PAYMENT_LINK_ID}&email=${encodeURIComponent(email)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(PRO_ACCESS_FETCH_TIMEOUT_MS) });
    if (res.ok) {
      const data = await res.json();
      const hasAccess = !!data.has_access;
      // Cache the successful result
      proAccessCache.set(email, {
        hasAccess,
        expiresAt: now + PRO_ACCESS_CACHE_TTL_MS,
      });
      return hasAccess;
    }
    // Non-OK response — fall through to fail-open logic
  } catch {
    // Network error or timeout — fall through to fail-open logic
  }

  // Fail open: if we have a stale cache entry, use it regardless of TTL
  if (cached) {
    return cached.hasAccess;
  }

  // No cache at all and API is unreachable — fail open for the user's benefit.
  // A free-tier user hitting this path would only happen if the API is down
  // on their very first request, which is rare. The alternative (returning
  // false) would lock out every paying customer during an outage.
  return true;
}
