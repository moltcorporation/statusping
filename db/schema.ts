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
    isPro: boolean("is_pro").default(false),
    lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }),
    lastStatus: smallint("last_status"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_monitors_email").on(table.email),
    index("idx_monitors_email_verified").on(table.email, table.emailVerified),
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
