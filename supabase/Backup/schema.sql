
\restrict 8p4NZhREz2iifSpgPvkIEbfgkWsk34up445SJ1ai4QjFAOQhUAozdjDhNrrHZ1f


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."create_admin_user"("user_email" "text", "user_password" "text", "user_full_name" "text" DEFAULT NULL::"text") RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Insert into auth.users with proper password hashing
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    user_email,
    crypt(user_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', user_full_name),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO new_user_id;

  -- Insert into profiles with admin role
  INSERT INTO public.profiles (id, full_name, email, role, created_at, updated_at)
  VALUES (new_user_id, user_full_name, user_email, 'admin', NOW(), NOW());

  RETURN new_user_id::TEXT;
END;
$$;


ALTER FUNCTION "public"."create_admin_user"("user_email" "text", "user_password" "text", "user_full_name" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'customer');
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_admin"() RETURNS boolean
    LANGUAGE "plpgsql" STABLE SECURITY DEFINER
    AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Bypass RLS by using SECURITY DEFINER
  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = auth.uid()
  LIMIT 1;
  
  RETURN COALESCE(user_role = 'admin', false);
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$;


ALTER FUNCTION "public"."is_admin"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."contact_submissions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "company" "text",
    "service_type" "text",
    "budget_range" "text",
    "message" "text" NOT NULL,
    "status" "text" DEFAULT 'new'::"text" NOT NULL,
    "source_page" "text",
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "contact_submissions_status_check" CHECK (("status" = ANY (ARRAY['new'::"text", 'in_progress'::"text", 'closed'::"text", 'spam'::"text"])))
);


ALTER TABLE "public"."contact_submissions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."licenses_or_keys" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "order_item_id" "uuid" NOT NULL,
    "code" "text" NOT NULL,
    "status" "text" DEFAULT 'unused'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "licenses_or_keys_status_check" CHECK (("status" = ANY (ARRAY['unused'::"text", 'delivered'::"text", 'revoked'::"text"])))
);


ALTER TABLE "public"."licenses_or_keys" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."newsletter_subscribers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "email" "text" NOT NULL,
    "status" "text" DEFAULT 'active'::"text",
    "subscribed_at" timestamp with time zone DEFAULT "now"(),
    "unsubscribed_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "newsletter_subscribers_status_check" CHECK (("status" = ANY (ARRAY['active'::"text", 'unsubscribed'::"text"])))
);


ALTER TABLE "public"."newsletter_subscribers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."order_items" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "order_id" "uuid" NOT NULL,
    "product_id" "uuid" NOT NULL,
    "quantity" integer DEFAULT 1 NOT NULL,
    "unit_price" numeric(10,2) NOT NULL,
    "subtotal" numeric(10,2) NOT NULL,
    CONSTRAINT "order_items_quantity_check" CHECK (("quantity" > 0))
);


ALTER TABLE "public"."order_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."orders" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid",
    "email" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "total_amount" numeric(10,2) NOT NULL,
    "currency" "text" DEFAULT 'usd'::"text" NOT NULL,
    "payment_provider" "text" DEFAULT 'stripe'::"text",
    "payment_reference" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "orders_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'paid'::"text", 'canceled'::"text", 'refunded'::"text"])))
);


ALTER TABLE "public"."orders" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."posts" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "slug" "text" NOT NULL,
    "title" "text" NOT NULL,
    "excerpt" "text",
    "content" "text" NOT NULL,
    "author_id" "uuid",
    "cover_image_url" "text",
    "tags" "text"[],
    "published_at" timestamp with time zone,
    "is_published" boolean DEFAULT false NOT NULL,
    "seo_title" "text",
    "seo_description" "text",
    "seo_keywords" "text"[],
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."posts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."product_metadata" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "product_id" "uuid" NOT NULL,
    "key" "text" NOT NULL,
    "value" "text"
);


ALTER TABLE "public"."product_metadata" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "short_description" "text",
    "full_description" "text",
    "price" numeric(10,2) NOT NULL,
    "billing_interval" "text" DEFAULT 'one_time'::"text" NOT NULL,
    "stock" integer DEFAULT 0,
    "is_active" boolean DEFAULT true NOT NULL,
    "thumbnail_url" "text",
    "seo_title" "text",
    "seo_description" "text",
    "seo_keywords" "text"[],
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "category" "text",
    "features" "text"[],
    CONSTRAINT "products_billing_interval_check" CHECK (("billing_interval" = ANY (ARRAY['one_time'::"text", 'monthly'::"text", 'yearly'::"text"])))
);


ALTER TABLE "public"."products" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "full_name" "text",
    "role" "text" DEFAULT 'customer'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "email" "text",
    "phone" "text",
    CONSTRAINT "profiles_role_check" CHECK (("role" = ANY (ARRAY['admin'::"text", 'customer'::"text"])))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."project_images" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "project_id" "uuid" NOT NULL,
    "image_url" "text" NOT NULL,
    "caption" "text",
    "sort_order" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."project_images" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."projects" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "slug" "text" NOT NULL,
    "title" "text" NOT NULL,
    "client_name" "text",
    "short_description" "text",
    "full_description" "text",
    "services_used" "text"[],
    "thumbnail_url" "text",
    "live_url" "text",
    "github_url" "text",
    "is_featured" boolean DEFAULT false NOT NULL,
    "published_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."projects" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."services" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "short_description" "text",
    "full_description" "text",
    "icon" "text",
    "starting_price" numeric(10,2),
    "is_active" boolean DEFAULT true NOT NULL,
    "seo_title" "text",
    "seo_description" "text",
    "seo_keywords" "text"[],
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "features" "text"[]
);


ALTER TABLE "public"."services" OWNER TO "postgres";


COMMENT ON COLUMN "public"."services"."features" IS 'List of key features for the service';



CREATE TABLE IF NOT EXISTS "public"."site_settings" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "site_name" "text",
    "tagline" "text",
    "logo_url" "text",
    "primary_color" "text",
    "support_email" "text",
    "default_seo_title" "text",
    "default_seo_description" "text",
    "default_seo_image" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "favicon_url" "text",
    "social_facebook" "text",
    "social_twitter" "text",
    "social_linkedin" "text",
    "social_github" "text",
    "social_instagram" "text",
    "social_youtube" "text",
    "phone" "text",
    "address" "text",
    "office_hours" "text",
    "google_analytics_id" "text",
    "facebook_pixel_id" "text",
    "meta_description" "text",
    "meta_keywords" "text",
    "theme_mode" "text" DEFAULT 'dark'::"text",
    "enable_blog" boolean DEFAULT true,
    "enable_shop" boolean DEFAULT true,
    "enable_newsletter" boolean DEFAULT true,
    "smtp_host" "text",
    "smtp_port" integer,
    "smtp_user" "text",
    "smtp_from_email" "text",
    "smtp_from_name" "text",
    "maintenance_mode" boolean DEFAULT false,
    "maintenance_message" "text",
    "theme_background" "text" DEFAULT '222.2 84% 4.9%'::"text",
    "theme_foreground" "text" DEFAULT '210 40% 98%'::"text",
    "theme_card" "text" DEFAULT '222.2 84% 4.9%'::"text",
    "theme_card_foreground" "text" DEFAULT '210 40% 98%'::"text",
    "theme_popover" "text" DEFAULT '222.2 84% 4.9%'::"text",
    "theme_popover_foreground" "text" DEFAULT '210 40% 98%'::"text",
    "theme_primary" "text" DEFAULT '252 87% 67%'::"text",
    "theme_primary_foreground" "text" DEFAULT '222.2 47.4% 11.2%'::"text",
    "theme_secondary" "text" DEFAULT '217.2 32.6% 17.5%'::"text",
    "theme_secondary_foreground" "text" DEFAULT '210 40% 98%'::"text",
    "theme_muted" "text" DEFAULT '217.2 32.6% 17.5%'::"text",
    "theme_muted_foreground" "text" DEFAULT '215 20.2% 65.1%'::"text",
    "theme_accent" "text" DEFAULT '217.2 32.6% 17.5%'::"text",
    "theme_accent_foreground" "text" DEFAULT '210 40% 98%'::"text",
    "theme_destructive" "text" DEFAULT '0 62.8% 30.6%'::"text",
    "theme_destructive_foreground" "text" DEFAULT '210 40% 98%'::"text",
    "theme_border" "text" DEFAULT '217.2 32.6% 17.5%'::"text",
    "theme_input" "text" DEFAULT '217.2 32.6% 17.5%'::"text",
    "theme_ring" "text" DEFAULT '252 87% 67%'::"text",
    "theme_radius" "text" DEFAULT '0.5rem'::"text",
    "enable_custom_theme" boolean DEFAULT false,
    CONSTRAINT "check_theme_mode" CHECK (("theme_mode" = ANY (ARRAY['light'::"text", 'dark'::"text", 'system'::"text"])))
);


ALTER TABLE "public"."site_settings" OWNER TO "postgres";


COMMENT ON COLUMN "public"."site_settings"."theme_mode" IS 'Theme color mode: light, dark, or system';



COMMENT ON COLUMN "public"."site_settings"."maintenance_mode" IS 'Enable/disable maintenance mode';



COMMENT ON COLUMN "public"."site_settings"."theme_background" IS 'Background color in HSL format';



COMMENT ON COLUMN "public"."site_settings"."theme_primary" IS 'Primary color in HSL format';



COMMENT ON COLUMN "public"."site_settings"."enable_custom_theme" IS 'Enable custom theme colors. When false, uses default theme from globals.css';



CREATE TABLE IF NOT EXISTS "public"."team" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(255) NOT NULL,
    "designation" character varying(255) NOT NULL,
    "bio" "text",
    "email" character varying(255),
    "phone" character varying(50),
    "linkedin_url" character varying(500),
    "twitter_url" character varying(500),
    "github_url" character varying(500),
    "image_url" "text",
    "order_position" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."team" OWNER TO "postgres";


COMMENT ON TABLE "public"."team" IS 'Team members information for the company website';



CREATE TABLE IF NOT EXISTS "public"."trusted_companies" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "logo_url" "text" NOT NULL,
    "website_url" "text",
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."trusted_companies" OWNER TO "postgres";


ALTER TABLE ONLY "public"."contact_submissions"
    ADD CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."licenses_or_keys"
    ADD CONSTRAINT "licenses_or_keys_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."newsletter_subscribers"
    ADD CONSTRAINT "newsletter_subscribers_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."newsletter_subscribers"
    ADD CONSTRAINT "newsletter_subscribers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."order_items"
    ADD CONSTRAINT "order_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."product_metadata"
    ADD CONSTRAINT "product_metadata_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."product_metadata"
    ADD CONSTRAINT "product_metadata_product_id_key_key" UNIQUE ("product_id", "key");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."project_images"
    ADD CONSTRAINT "project_images_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."services"
    ADD CONSTRAINT "services_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."services"
    ADD CONSTRAINT "services_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."site_settings"
    ADD CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."team"
    ADD CONSTRAINT "team_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."trusted_companies"
    ADD CONSTRAINT "trusted_companies_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_contact_submissions_created_at" ON "public"."contact_submissions" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_contact_submissions_status" ON "public"."contact_submissions" USING "btree" ("status");



CREATE INDEX "idx_order_items_order_id" ON "public"."order_items" USING "btree" ("order_id");



CREATE INDEX "idx_order_items_product_id" ON "public"."order_items" USING "btree" ("product_id");



CREATE INDEX "idx_orders_created_at" ON "public"."orders" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_orders_email" ON "public"."orders" USING "btree" ("email");



CREATE INDEX "idx_orders_status" ON "public"."orders" USING "btree" ("status");



CREATE INDEX "idx_orders_user_id" ON "public"."orders" USING "btree" ("user_id");



CREATE INDEX "idx_posts_author_id" ON "public"."posts" USING "btree" ("author_id");



CREATE INDEX "idx_posts_is_published" ON "public"."posts" USING "btree" ("is_published");



CREATE INDEX "idx_posts_published_at" ON "public"."posts" USING "btree" ("published_at" DESC);



CREATE INDEX "idx_posts_slug" ON "public"."posts" USING "btree" ("slug");



CREATE INDEX "idx_posts_tags" ON "public"."posts" USING "gin" ("tags");



CREATE INDEX "idx_products_billing_interval" ON "public"."products" USING "btree" ("billing_interval");



CREATE INDEX "idx_products_category" ON "public"."products" USING "btree" ("category");



CREATE INDEX "idx_products_is_active" ON "public"."products" USING "btree" ("is_active");



CREATE INDEX "idx_products_slug" ON "public"."products" USING "btree" ("slug");



CREATE INDEX "idx_profiles_email" ON "public"."profiles" USING "btree" ("email");



CREATE INDEX "idx_profiles_role" ON "public"."profiles" USING "btree" ("role");



CREATE INDEX "idx_projects_is_featured" ON "public"."projects" USING "btree" ("is_featured");



CREATE INDEX "idx_projects_published_at" ON "public"."projects" USING "btree" ("published_at" DESC);



CREATE INDEX "idx_projects_slug" ON "public"."projects" USING "btree" ("slug");



CREATE INDEX "idx_services_is_active" ON "public"."services" USING "btree" ("is_active");



CREATE INDEX "idx_services_slug" ON "public"."services" USING "btree" ("slug");



CREATE INDEX "idx_team_active" ON "public"."team" USING "btree" ("is_active");



CREATE INDEX "idx_team_order" ON "public"."team" USING "btree" ("order_position");



CREATE INDEX "newsletter_subscribers_email_idx" ON "public"."newsletter_subscribers" USING "btree" ("email");



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."contact_submissions" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."orders" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."posts" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."products" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."projects" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."services" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."site_settings" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



ALTER TABLE ONLY "public"."licenses_or_keys"
    ADD CONSTRAINT "licenses_or_keys_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "public"."order_items"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."order_items"
    ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."order_items"
    ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."product_metadata"
    ADD CONSTRAINT "product_metadata_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."project_images"
    ADD CONSTRAINT "project_images_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;



CREATE POLICY "Active products are viewable by everyone" ON "public"."products" FOR SELECT USING ((("is_active" = true) OR "public"."is_admin"()));



CREATE POLICY "Admins can delete contact submissions" ON "public"."contact_submissions" FOR DELETE USING ("public"."is_admin"());



CREATE POLICY "Admins can delete licenses" ON "public"."licenses_or_keys" FOR DELETE USING ("public"."is_admin"());



CREATE POLICY "Admins can delete order items" ON "public"."order_items" FOR DELETE USING ("public"."is_admin"());



CREATE POLICY "Admins can delete orders" ON "public"."orders" FOR DELETE USING ("public"."is_admin"());



CREATE POLICY "Admins can delete posts" ON "public"."posts" FOR DELETE USING ("public"."is_admin"());



CREATE POLICY "Admins can delete product metadata" ON "public"."product_metadata" FOR DELETE USING ("public"."is_admin"());



CREATE POLICY "Admins can delete products" ON "public"."products" FOR DELETE USING ("public"."is_admin"());



CREATE POLICY "Admins can delete profiles" ON "public"."profiles" FOR DELETE USING ("public"."is_admin"());



CREATE POLICY "Admins can delete project images" ON "public"."project_images" FOR DELETE USING ("public"."is_admin"());



CREATE POLICY "Admins can delete projects" ON "public"."projects" FOR DELETE USING ("public"."is_admin"());



CREATE POLICY "Admins can delete services" ON "public"."services" FOR DELETE USING ("public"."is_admin"());



CREATE POLICY "Admins can delete site settings" ON "public"."site_settings" FOR DELETE USING ("public"."is_admin"());



CREATE POLICY "Admins can insert licenses" ON "public"."licenses_or_keys" FOR INSERT WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert order items" ON "public"."order_items" FOR INSERT WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert orders" ON "public"."orders" FOR INSERT WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert posts" ON "public"."posts" FOR INSERT WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert product metadata" ON "public"."product_metadata" FOR INSERT WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert products" ON "public"."products" FOR INSERT WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert profiles" ON "public"."profiles" FOR INSERT WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert project images" ON "public"."project_images" FOR INSERT WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert projects" ON "public"."projects" FOR INSERT WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert services" ON "public"."services" FOR INSERT WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert site settings" ON "public"."site_settings" FOR INSERT WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can update any profile" ON "public"."profiles" FOR UPDATE USING ("public"."is_admin"());



CREATE POLICY "Admins can update contact submissions" ON "public"."contact_submissions" FOR UPDATE USING ("public"."is_admin"());



CREATE POLICY "Admins can update licenses" ON "public"."licenses_or_keys" FOR UPDATE USING ("public"."is_admin"());



CREATE POLICY "Admins can update order items" ON "public"."order_items" FOR UPDATE USING ("public"."is_admin"());



CREATE POLICY "Admins can update orders" ON "public"."orders" FOR UPDATE USING ("public"."is_admin"());



CREATE POLICY "Admins can update posts" ON "public"."posts" FOR UPDATE USING ("public"."is_admin"());



CREATE POLICY "Admins can update product metadata" ON "public"."product_metadata" FOR UPDATE USING ("public"."is_admin"());



CREATE POLICY "Admins can update products" ON "public"."products" FOR UPDATE USING ("public"."is_admin"());



CREATE POLICY "Admins can update project images" ON "public"."project_images" FOR UPDATE USING ("public"."is_admin"());



CREATE POLICY "Admins can update projects" ON "public"."projects" FOR UPDATE USING ("public"."is_admin"());



CREATE POLICY "Admins can update services" ON "public"."services" FOR UPDATE USING ("public"."is_admin"());



CREATE POLICY "Admins can update site settings" ON "public"."site_settings" FOR UPDATE USING ("public"."is_admin"());



CREATE POLICY "Admins can update subscribers" ON "public"."newsletter_subscribers" FOR UPDATE USING ("public"."is_admin"());



CREATE POLICY "Admins can view all contact submissions" ON "public"."contact_submissions" FOR SELECT USING ("public"."is_admin"());



CREATE POLICY "Admins can view all subscribers" ON "public"."newsletter_subscribers" FOR SELECT USING ("public"."is_admin"());



CREATE POLICY "Allow authenticated full access" ON "public"."team" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Allow public read access" ON "public"."team" FOR SELECT USING (true);



CREATE POLICY "Anyone can subscribe to newsletter" ON "public"."newsletter_subscribers" FOR INSERT WITH CHECK (true);



CREATE POLICY "Authors can insert own posts" ON "public"."posts" FOR INSERT WITH CHECK (("auth"."uid"() = "author_id"));



CREATE POLICY "Authors can update own posts" ON "public"."posts" FOR UPDATE USING (("auth"."uid"() = "author_id"));



CREATE POLICY "Enable delete for authenticated users only" ON "public"."trusted_companies" FOR DELETE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Enable insert for all users" ON "public"."contact_submissions" FOR INSERT WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."trusted_companies" FOR INSERT WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Enable read access for all users" ON "public"."trusted_companies" FOR SELECT USING (true);



CREATE POLICY "Enable update for authenticated users only" ON "public"."trusted_companies" FOR UPDATE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Product metadata is viewable by everyone" ON "public"."product_metadata" FOR SELECT USING (true);



CREATE POLICY "Project images are viewable with projects" ON "public"."project_images" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."projects"
  WHERE (("projects"."id" = "project_images"."project_id") AND (("projects"."published_at" IS NOT NULL) OR "public"."is_admin"())))));



CREATE POLICY "Public profiles are viewable by everyone" ON "public"."profiles" FOR SELECT USING (true);



CREATE POLICY "Published posts are viewable by everyone" ON "public"."posts" FOR SELECT USING ((("is_published" = true) OR "public"."is_admin"()));



CREATE POLICY "Published projects are viewable by everyone" ON "public"."projects" FOR SELECT USING ((("published_at" IS NOT NULL) OR "public"."is_admin"()));



CREATE POLICY "Services are viewable by everyone" ON "public"."services" FOR SELECT USING ((("is_active" = true) OR "public"."is_admin"()));



CREATE POLICY "Site settings are viewable by everyone" ON "public"."site_settings" FOR SELECT USING (true);



CREATE POLICY "Users can insert own order items" ON "public"."order_items" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."orders"
  WHERE (("orders"."id" = "order_items"."order_id") AND ("orders"."user_id" = "auth"."uid"())))));



CREATE POLICY "Users can insert own orders" ON "public"."orders" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own profile" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view own licenses" ON "public"."licenses_or_keys" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM ("public"."order_items"
     JOIN "public"."orders" ON (("orders"."id" = "order_items"."order_id")))
  WHERE (("order_items"."id" = "licenses_or_keys"."order_item_id") AND (("orders"."user_id" = "auth"."uid"()) OR "public"."is_admin"())))));



CREATE POLICY "Users can view own order items" ON "public"."order_items" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."orders"
  WHERE (("orders"."id" = "order_items"."order_id") AND (("orders"."user_id" = "auth"."uid"()) OR "public"."is_admin"())))));



CREATE POLICY "Users can view own orders" ON "public"."orders" FOR SELECT USING ((("auth"."uid"() = "user_id") OR "public"."is_admin"()));



CREATE POLICY "Users can view own profile" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));



ALTER TABLE "public"."licenses_or_keys" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."newsletter_subscribers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."order_items" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."orders" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."posts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."product_metadata" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."project_images" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."projects" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."services" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."site_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."team" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."trusted_companies" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."create_admin_user"("user_email" "text", "user_password" "text", "user_full_name" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."create_admin_user"("user_email" "text", "user_password" "text", "user_full_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_admin_user"("user_email" "text", "user_password" "text", "user_full_name" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "service_role";


















GRANT ALL ON TABLE "public"."contact_submissions" TO "anon";
GRANT ALL ON TABLE "public"."contact_submissions" TO "authenticated";
GRANT ALL ON TABLE "public"."contact_submissions" TO "service_role";



GRANT ALL ON TABLE "public"."licenses_or_keys" TO "anon";
GRANT ALL ON TABLE "public"."licenses_or_keys" TO "authenticated";
GRANT ALL ON TABLE "public"."licenses_or_keys" TO "service_role";



GRANT ALL ON TABLE "public"."newsletter_subscribers" TO "anon";
GRANT ALL ON TABLE "public"."newsletter_subscribers" TO "authenticated";
GRANT ALL ON TABLE "public"."newsletter_subscribers" TO "service_role";



GRANT ALL ON TABLE "public"."order_items" TO "anon";
GRANT ALL ON TABLE "public"."order_items" TO "authenticated";
GRANT ALL ON TABLE "public"."order_items" TO "service_role";



GRANT ALL ON TABLE "public"."orders" TO "anon";
GRANT ALL ON TABLE "public"."orders" TO "authenticated";
GRANT ALL ON TABLE "public"."orders" TO "service_role";



GRANT ALL ON TABLE "public"."posts" TO "anon";
GRANT ALL ON TABLE "public"."posts" TO "authenticated";
GRANT ALL ON TABLE "public"."posts" TO "service_role";



GRANT ALL ON TABLE "public"."product_metadata" TO "anon";
GRANT ALL ON TABLE "public"."product_metadata" TO "authenticated";
GRANT ALL ON TABLE "public"."product_metadata" TO "service_role";



GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."project_images" TO "anon";
GRANT ALL ON TABLE "public"."project_images" TO "authenticated";
GRANT ALL ON TABLE "public"."project_images" TO "service_role";



GRANT ALL ON TABLE "public"."projects" TO "anon";
GRANT ALL ON TABLE "public"."projects" TO "authenticated";
GRANT ALL ON TABLE "public"."projects" TO "service_role";



GRANT ALL ON TABLE "public"."services" TO "anon";
GRANT ALL ON TABLE "public"."services" TO "authenticated";
GRANT ALL ON TABLE "public"."services" TO "service_role";



GRANT ALL ON TABLE "public"."site_settings" TO "anon";
GRANT ALL ON TABLE "public"."site_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."site_settings" TO "service_role";



GRANT ALL ON TABLE "public"."team" TO "anon";
GRANT ALL ON TABLE "public"."team" TO "authenticated";
GRANT ALL ON TABLE "public"."team" TO "service_role";



GRANT ALL ON TABLE "public"."trusted_companies" TO "anon";
GRANT ALL ON TABLE "public"."trusted_companies" TO "authenticated";
GRANT ALL ON TABLE "public"."trusted_companies" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























\unrestrict 8p4NZhREz2iifSpgPvkIEbfgkWsk34up445SJ1ai4QjFAOQhUAozdjDhNrrHZ1f

RESET ALL;
