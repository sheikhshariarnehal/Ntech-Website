-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  name text,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Services
CREATE TABLE IF NOT EXISTS public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  short_description text,
  description text,
  starting_price numeric(10,2),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- 3. Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  client_name text,
  service_id uuid REFERENCES public.services (id),
  summary text,
  problem text,
  solution text,
  results text,
  tech_stack text[],
  thumbnail_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 4. Project Media
CREATE TABLE IF NOT EXISTS public.project_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects (id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('image', 'video', 'link')),
  url text NOT NULL,
  caption text,
  sort_order int DEFAULT 0
);

ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;

-- 5. Products
CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  short_description text,
  description text,
  type text NOT NULL CHECK (type IN ('subscription', 'one_time')),
  external_provider text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 6. Product Pricing
CREATE TABLE IF NOT EXISTS public.product_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.products (id) ON DELETE CASCADE,
  currency text DEFAULT 'USD',
  amount numeric(10,2) NOT NULL,
  billing_interval text NOT NULL CHECK (billing_interval IN ('monthly', 'yearly', 'one_time')),
  stripe_price_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.product_pricing ENABLE ROW LEVEL SECURITY;

-- 7. Orders
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users (id),
  email text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  total_amount numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  payment_provider text,
  payment_reference text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 8. Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders (id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products (id),
  quantity int NOT NULL DEFAULT 1,
  unit_amount numeric(10,2) NOT NULL,
  total_amount numeric(10,2) NOT NULL
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 9. Subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users (id),
  product_id uuid REFERENCES public.products (id),
  status text NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  stripe_subscription_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- 10. Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text,
  featured_image_url text,
  published_at timestamptz,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 11. Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  company text,
  quote text NOT NULL,
  avatar_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- 12. Settings
CREATE TABLE IF NOT EXISTS public.settings (
  id int PRIMARY KEY DEFAULT 1,
  site_name text,
  primary_color text,
  logo_url text,
  default_meta_title text,
  default_meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- 13. Contact Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Helper Function: is_admin()
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  );
$$;

-- RLS Policies

-- Profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
CREATE POLICY "Admins can read all profiles" ON public.profiles FOR SELECT USING (public.is_admin());

-- Services (Public Read, Admin Manage)
DROP POLICY IF EXISTS "Public read services" ON public.services;
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage services" ON public.services;
CREATE POLICY "Admins manage services" ON public.services FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Projects (Public Read, Admin Manage)
DROP POLICY IF EXISTS "Public read projects" ON public.projects;
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage projects" ON public.projects;
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Project Media (Public Read, Admin Manage)
DROP POLICY IF EXISTS "Public read project_media" ON public.project_media;
CREATE POLICY "Public read project_media" ON public.project_media FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage project_media" ON public.project_media;
CREATE POLICY "Admins manage project_media" ON public.project_media FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Products (Public Read, Admin Manage)
DROP POLICY IF EXISTS "Public read products" ON public.products;
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage products" ON public.products;
CREATE POLICY "Admins manage products" ON public.products FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Product Pricing (Public Read, Admin Manage)
DROP POLICY IF EXISTS "Public read product_pricing" ON public.product_pricing;
CREATE POLICY "Public read product_pricing" ON public.product_pricing FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage product_pricing" ON public.product_pricing;
CREATE POLICY "Admins manage product_pricing" ON public.product_pricing FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Blog Posts (Public Read, Admin Manage)
DROP POLICY IF EXISTS "Public read blog_posts" ON public.blog_posts;
CREATE POLICY "Public read blog_posts" ON public.blog_posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage blog_posts" ON public.blog_posts;
CREATE POLICY "Admins manage blog_posts" ON public.blog_posts FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Testimonials (Public Read, Admin Manage)
DROP POLICY IF EXISTS "Public read testimonials" ON public.testimonials;
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage testimonials" ON public.testimonials;
CREATE POLICY "Admins manage testimonials" ON public.testimonials FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Settings (Public Read, Admin Manage)
DROP POLICY IF EXISTS "Public read settings" ON public.settings;
CREATE POLICY "Public read settings" ON public.settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage settings" ON public.settings;
CREATE POLICY "Admins manage settings" ON public.settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Orders (User Read Own, Admin Read All, Admin Manage)
DROP POLICY IF EXISTS "Users read own orders" ON public.orders;
CREATE POLICY "Users read own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins read all orders" ON public.orders;
CREATE POLICY "Admins read all orders" ON public.orders FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admins manage orders" ON public.orders;
CREATE POLICY "Admins manage orders" ON public.orders FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Order Items (User Read Own via Order, Admin Read/Manage All)
DROP POLICY IF EXISTS "Users read own order items" ON public.order_items;
CREATE POLICY "Users read own order items" ON public.order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id
      AND o.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Admins read all order items" ON public.order_items;
CREATE POLICY "Admins read all order items" ON public.order_items FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admins manage order items" ON public.order_items;
CREATE POLICY "Admins manage order items" ON public.order_items FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Subscriptions (User Read Own, Admin Read/Manage All)
DROP POLICY IF EXISTS "Users read own subscriptions" ON public.subscriptions;
CREATE POLICY "Users read own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins read all subscriptions" ON public.subscriptions;
CREATE POLICY "Admins read all subscriptions" ON public.subscriptions FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admins manage subscriptions" ON public.subscriptions;
CREATE POLICY "Admins manage subscriptions" ON public.subscriptions FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Contact Messages (Public Insert, Admin Read/Manage)
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins read contact messages" ON public.contact_messages;
CREATE POLICY "Admins read contact messages" ON public.contact_messages FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admins manage contact messages" ON public.contact_messages;
CREATE POLICY "Admins manage contact messages" ON public.contact_messages FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins delete contact messages" ON public.contact_messages;
CREATE POLICY "Admins delete contact messages" ON public.contact_messages FOR DELETE USING (public.is_admin());
