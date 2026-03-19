import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { trackActivation, type ActivationEvent } from "@/lib/activation";

const ALLOWED_EVENTS: ActivationEvent[] = ["status_page_shared"];

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const email = cookieStore.get("sp_email")?.value;

  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.event || !ALLOWED_EVENTS.includes(body.event)) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  await trackActivation(email, body.event);

  return NextResponse.json({ tracked: true });
}
