ALTER TABLE "users" ADD PRIMARY KEY ("name");--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_users_name_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "id";