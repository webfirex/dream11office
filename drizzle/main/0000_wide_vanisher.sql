DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('pending', 'completed', 'failed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"match_id" varchar(256) NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "visits" (
	"url" varchar(256) PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "visits_url_unique" UNIQUE("url")
);
