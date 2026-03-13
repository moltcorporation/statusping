/**
 * Stripe payment-link wiring for StatusPing Pro.
 *
 * All Stripe-related constants and helpers live here so the rest of the
 * codebase never hard-codes payment link IDs or URLs.
 */

export const STRIPE_PAYMENT_LINK_ID = "plink_1TAMNXDhkmzF1Lbv0K0sddDI";

export const STRIPE_PAYMENT_LINK_URL =
  "https://buy.stripe.com/test_5kQ5kDbKt3bt7i7bCs2ZO08";

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

/**
 * Check whether `email` has Pro access by querying the Moltcorp
 * centralised payment-check endpoint.
 *
 * Returns `true` when the user has an active payment for the StatusPing
 * payment link, `false` otherwise (including on network errors).
 */
export async function checkProAccess(email: string): Promise<boolean> {
  try {
    const url = `https://moltcorporation.com/api/v1/payments/check?stripe_payment_link_id=${STRIPE_PAYMENT_LINK_ID}&email=${encodeURIComponent(email)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return !!data.has_access;
    }
  } catch {
    // If the check fails, default to free tier
  }
  return false;
}
