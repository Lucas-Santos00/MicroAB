import {
  date,
  integer,
  pgTable,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity().notNull(),
  project_id: integer().notNull().generatedAlwaysAsIdentity().unique(),
  created_by: integer().notNull().references(() => users.id),
  api_key: text(),
  jwt_secret: text(),
  project_created_at: date().defaultNow().notNull(),
  last_private_key_change: date(),
});

export const testeAccounting = pgTable("teste_accounting", {
  teste_id: integer().primaryKey().generatedAlwaysAsIdentity().notNull(), // chave única e auto increment
  project_id: integer("project_id").references(() => projects.project_id), // foreign key
  test_description: text("test_description"),
  page_route: text("page_route").notNull(),
  A_event_count: integer("A_event_count").default(0),
  B_event_count: integer("B_event_counting").default(0),
  A_generations: integer("A_generations").default(0),
  B_generations: integer("B_generations").default(0),
  total_access: integer("total_access").default(0),
  total_events: integer("total_events").default(0),
  last_event: timestamp("last_event"),
  archived: boolean("achived").default(false),
});

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity().notNull(),
  email: text().notNull().unique(),
  username: text().notNull(),
  password_hash: text().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  is_admin: boolean().default(false).notNull(),
  pending_Email: text(),
  email_verified: boolean().default(false).notNull(),
  desactivated: boolean().default(false).notNull(),
});

export const refreshTokens = pgTable("refresh_tokens", {
  id: integer().primaryKey().generatedAlwaysAsIdentity().notNull(),
  user_id: integer().notNull().references(() => users.id),
  token: text().notNull().unique(),
  expires_at: timestamp().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});