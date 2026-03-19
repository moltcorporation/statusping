// Source of truth for the database schema.
// Edit this file to add or modify tables.
// Changes are auto-applied to the database when merged to main.

import {
  pgTable,
  uuid,
  text,
  smallint,
  integer,
  boolean,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const monitors = pgTable(
  "monitors",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    url: text("url").notNull(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: boolean("email_verified").default(false),
    verifyToken: text("verify_token"),
    slackWebhookUrl: text("slack_webhook_url"),
    discordWebhookUrl: text("discord_webhook_url"),
    isPro: boolean("is_pro").default(false),
    utmSource: text("utm_source"),
    lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }),
    lastStatus: smallint("last_status"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_monitors_email").on(table.email),
    index("idx_monitors_email_verified").on(table.email, table.emailVerified),
  ]
);

export const feedback = pgTable("feedback", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text("email"),
  category: text("category").notNull().default("general"),
  intent: text("intent"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const onboardingEmails = pgTable(
  "onboarding_emails",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    email: text("email").notNull().unique(),
    lastStepSent: smallint("last_step_sent").default(0),
    unsubscribed: boolean("unsubscribed").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [index("idx_onboarding_email").on(table.email)]
);

export const pageViews = pgTable(
  "page_views",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    path: text("path").notNull(),
    utmSource: text("utm_source"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [index("idx_page_views_created_at").on(table.createdAt)]
);

export const dripSchedule = pgTable(
  "drip_schedule",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    email: text("email").notNull(),
    emailNumber: smallint("email_number").notNull(),
    sendAt: timestamp("send_at", { withTimezone: true }).notNull(),
    sentAt: timestamp("sent_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_drip_schedule_email").on(table.email),
    index("idx_drip_schedule_pending").on(table.sendAt, table.sentAt),
  ]
);

export const activationEvents = pgTable(
  "activation_events",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    email: text("email").notNull(),
    event: text("event").notNull(),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    uniqueIndex("idx_activation_email_event").on(table.email, table.event),
    index("idx_activation_event").on(table.event),
  ]
);

export const checks = pgTable(
  "checks",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    monitorId: uuid("monitor_id")
      .notNull()
      .references(() => monitors.id, { onDelete: "cascade" }),
    statusCode: smallint("status_code").notNull(),
    responseMs: integer("response_ms"),
    checkedAt: timestamp("checked_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_checks_monitor_id").on(table.monitorId),
    index("idx_checks_checked_at").on(table.checkedAt),
  ]
);
