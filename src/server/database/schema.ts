import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const popularityEnum = pgEnum("status", [
  "pending",
  "completed",
  "failed",
]);

export const Visits = pgTable("visits", {
  url: varchar("url", { length: 256 }).unique().notNull().primaryKey(),
  count: integer("count").notNull().default(0),
});

export const Transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  match_id: varchar("match_id", { length: 256 }).notNull(),
  
  status: popularityEnum("status").notNull().default("pending"),
  created_at: timestamp("created_at")
    .notNull()
    .$defaultFn(() => {
      return new Date();
    }),
});
