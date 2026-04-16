CREATE TYPE "public"."category" AS ENUM('Dagligvare', 'Mat ute', 'Hjem', 'Underholdning', 'Gaming', 'Abonnement', 'Netthandel', 'Helse', 'Kosmetikk', 'Klær', 'Kreditt', 'Transport', 'Bil', 'Bolig', 'Boutgifter', 'Forsikring', 'Overføring', 'Inntekt', 'Sparing', 'Diverse', 'Annet');--> statement-breakpoint
CREATE TYPE "public"."colors" AS ENUM('red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink');--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date,
	"amount" numeric,
	"merchant" text NOT NULL,
	"counterparty" text,
	"category" "category" NOT NULL,
	"type" text NOT NULL,
	"currency" text,
	"exchangeRate" numeric,
	"user" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" "colors" NOT NULL
);
