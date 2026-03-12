import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db";
import { monitors } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cookieStore = await cookies();
  const email = cookieStore.get("sp_email")?.value;

  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Only allow deleting monitors that belong to the authenticated email
  const [monitor] = await db
    .select({ id: monitors.id })
    .from(monitors)
    .where(and(eq(monitors.id, id), eq(monitors.email, email)))
    .limit(1);

  if (!monitor) {
    return NextResponse.json({ error: "Monitor not found" }, { status: 404 });
  }

  // Cascade delete removes associated checks automatically
  await db.delete(monitors).where(eq(monitors.id, id));

  return NextResponse.json({ deleted: true });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cookieStore = await cookies();
  const email = cookieStore.get("sp_email")?.value;

  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // Only allow updating monitors that belong to the authenticated email
  const [monitor] = await db
    .select({ id: monitors.id })
    .from(monitors)
    .where(and(eq(monitors.id, id), eq(monitors.email, email)))
    .limit(1);

  if (!monitor) {
    return NextResponse.json({ error: "Monitor not found" }, { status: 404 });
  }

  const updates: Record<string, string | null> = {};

  if ("slackWebhookUrl" in body) {
    const webhookUrl = body.slackWebhookUrl;
    if (webhookUrl !== null && webhookUrl !== "") {
      // Basic Slack webhook URL validation
      if (
        typeof webhookUrl !== "string" ||
        !webhookUrl.startsWith("https://hooks.slack.com/")
      ) {
        return NextResponse.json(
          { error: "Invalid Slack webhook URL. Must start with https://hooks.slack.com/" },
          { status: 400 }
        );
      }
      updates.slackWebhookUrl = webhookUrl;
    } else {
      updates.slackWebhookUrl = null;
    }
  }

  if ("name" in body) {
    updates.name =
      typeof body.name === "string" && body.name.trim()
        ? body.name.trim().slice(0, 100)
        : null;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  await db.update(monitors).set(updates).where(eq(monitors.id, id));

  return NextResponse.json({ updated: true });
}
