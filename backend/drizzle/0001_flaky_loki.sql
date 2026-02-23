CREATE TYPE "public"."role" AS ENUM('student', 'professor', 'admin');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('active', 'baned');--> statement-breakpoint
CREATE TYPE "public"."challeng_status" AS ENUM('pending', 'approved');--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"bio" text,
	"points" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"challenge_id" integer NOT NULL,
	"is_correct" boolean DEFAULT false,
	"submitted_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "challenges" ALTER COLUMN "title" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'student';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "status" "status" DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "difficulty" varchar(50);--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "status" "challeng_status" DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;