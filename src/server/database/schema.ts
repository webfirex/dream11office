import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
  json,
  text,
} from "drizzle-orm/pg-core";

export const popularityEnum = pgEnum("status", [
  "pending",
  "completed",
  "failed",
]);

export const Visits = pgTable("visits", {
  url: varchar("url", { length: 256 }).unique().notNull().primaryKey(),
  count: integer("count").notNull().default(0),
  name: varchar("name", { length: 256 }).notNull(),
});

export const Transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  match_id: integer("match_id").notNull(),
  phone_number: varchar("phone_number", { length: 10 }).notNull(),
  rank: integer("rank").notNull(),
  status: popularityEnum("status").notNull().default("pending"),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  created_at: timestamp("created_at")
    .notNull()
    .$defaultFn(() => {
      return new Date();
    }),
});

export const ResultTypes = pgEnum("result_type", ["video", "photo"]);

export const Results = pgTable("results", {
  id: serial("id").primaryKey(),
  src: varchar("src", { length: 500 }).notNull(),
  type: ResultTypes("type").notNull(),
  thumbnail: varchar("thumbnail", { length: 500 }),
});

export const Matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  banner: varchar("banner", { length: 256 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  subTitle: varchar("subTitle", { length: 256 }).notNull(),
  date: varchar("date", { length: 500 }).notNull(),
  description: text("description").notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  ranks: json("ranks")
    .$type<{ prize: string; cost: number }[]>()
    .notNull()
    .default([]),
});

export const TxnRelations = relations(Transactions, ({ one }) => ({
  match: one(Matches, {
    fields: [Transactions.match_id],
    references: [Matches.id],
  }),
}));
