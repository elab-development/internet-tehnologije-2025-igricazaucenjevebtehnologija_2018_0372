CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "challenges" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer,
	"title" varchar(100) NOT NULL,
	"description" text,
	"buggy_code" text NOT NULL,
	"solution" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;