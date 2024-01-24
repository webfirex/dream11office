CREATE TABLE IF NOT EXISTS "matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"banner" varchar(256) NOT NULL,
	"title" varchar(256) NOT NULL,
	"subTitle" varchar(256) NOT NULL,
	"date" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"ranks" json DEFAULT '[]'::json NOT NULL
);
