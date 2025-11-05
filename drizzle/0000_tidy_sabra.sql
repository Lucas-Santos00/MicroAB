CREATE TABLE "projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"project_id" integer GENERATED ALWAYS AS IDENTITY (sequence name "projects_project_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_by" integer NOT NULL,
	"api_key" text,
	"jwt_secret" text,
	"project_created_at" date DEFAULT now() NOT NULL,
	"last_private_key_change" date,
	CONSTRAINT "projects_project_id_unique" UNIQUE("project_id")
);
--> statement-breakpoint
CREATE TABLE "teste_accounting" (
	"teste_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "teste_accounting_teste_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"project_id" integer,
	"test_description" text,
	"page_route" text NOT NULL,
	"A_event_count" integer DEFAULT 0,
	"B_event_counting" integer DEFAULT 0,
	"A_generations" integer DEFAULT 0,
	"B_generations" integer DEFAULT 0,
	"total_access" integer DEFAULT 0,
	"total_events" integer DEFAULT 0,
	"last_event" timestamp,
	"achived" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "teste_accounting" ADD CONSTRAINT "teste_accounting_project_id_projects_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("project_id") ON DELETE no action ON UPDATE no action;