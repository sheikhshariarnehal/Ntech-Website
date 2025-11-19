Here’s a full **Supabase database setup guide** for your project **plus a ready-made AI prompt** you can paste into an AI agent / Supabase SQL Editor to generate the schema and policies.

---

## 1. What this setup will give you

We’ll set up a Postgres schema (in Supabase) that supports:

* Services (web dev, app dev, AI automation, etc.)
* Projects/portfolio
* Digital products & pricing (ChatGPT Pro, Gemini, etc.)
* Orders & subscriptions
* Blog, testimonials, site settings
* Auth roles (admin vs normal user) via `profiles`

Core assumptions:

* You’re using **Supabase** (hosted Postgres with Auth & RLS).
* Auth users live in `auth.users`.
* You’ll have a `profiles` table mapping auth users → role.

---

## 2. Step-by-step Supabase DB setup (human guide)

### Step 1 – Create Supabase project

1. Create a new project in Supabase.
2. Note:

   * **Project URL**
   * **Anon key**
3. You’ll use them later in your Next.js `.env.local`.

---

### Step 2 – Create schema via SQL

You’ll create:

* `profiles`
* `services`
* `projects`, `project_media`
* `products`, `product_pricing`
* `orders`, `order_items`, `subscriptions`
* `blog_posts`
* `testimonials`
* `settings`
* `contact_messages`

You can either:

* Run the SQL directly in **Supabase SQL editor**, or
* Use the **AI prompt** at the end of this answer to ask an AI agent to create those tables & policies for you.

---

### Step 3 – Enable Row Level Security (RLS) and policies

We’ll use this pattern:

* **Public read** for content tables:

  * `services`, `projects`, `project_media`, `products`, `product_pricing`, `blog_posts`, `testimonials`, `settings`
  * Anyone can `SELECT`.

* **Admins manage** (insert/update/delete):

  * Only users whose `profiles.role = 'admin'`.

* **Profiles:**

  * User can read/update only their own row.
  * Admins can read all.

* **Orders & subscriptions:**

  * Users can read only their own data.
  * Admins can read all.

We’ll encode this logic in RLS policies.

---

### Step 4 – Connect Supabase to Next.js

In your Next.js project (`.env.local`):

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # server-only, never exposed to client
```

Then inside `src/lib/supabase/client.ts` and `server-client.ts` you’ll:

* use `@supabase/supabase-js`
* create a browser client for client-side usage
* create a server client using cookies (for authenticated SSR)

---

### Step 5 – Use DB in your features

* `features/services/api/getServices.ts` → `select * from services where is_active = true`
* `features/products/api/getProducts.ts` → join `products` + `product_pricing`
* `features/projects/api/getProjects.ts` → etc.
* Admin dashboard pages use `upsertService`, `upsertProduct`, etc.

Once the tables & policies are in place, it’s just normal Supabase queries.

---

## 3. Suggested SQL schema (for reference)

You **don’t** have to type this manually if you use the AI prompt later, but this is the shape we’re aiming for:

> You can skim this; the prompt below will encapsulate it.

```sql
-- 1. Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  role text not null default 'user', -- 'user' | 'admin'
  created_at timestamptz not null default now()
);

-- 2. Services
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text,
  description text,
  starting_price numeric(10,2),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Projects & media
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client_name text,
  service_id uuid references public.services (id),
  summary text,
  problem text,
  solution text,
  results text,
  tech_stack text[], -- e.g. ARRAY['Next.js', 'Supabase']
  thumbnail_url text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  type text not null check (type in ('image', 'video', 'link')),
  url text not null,
  caption text,
  sort_order int not null default 0
);

-- 4. Products & pricing
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text,
  description text,
  type text not null check (type in ('subscription', 'one_time')),
  external_provider text, -- e.g. 'OpenAI', 'Google', 'Canva'
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_pricing (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  currency text not null default 'USD',
  amount numeric(10,2) not null,
  billing_interval text not null check (billing_interval in ('monthly', 'yearly', 'one_time')),
  stripe_price_id text,
  created_at timestamptz not null default now()
);

-- 5. Orders & items
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id),
  email text not null,
  status text not null check (status in ('pending', 'paid', 'failed', 'refunded')),
  total_amount numeric(10,2) not null,
  currency text not null default 'USD',
  payment_provider text, -- 'stripe', 'manual', etc.
  payment_reference text, -- stripe session id, etc.
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid not null references public.products (id),
  quantity int not null default 1,
  unit_amount numeric(10,2) not null,
  total_amount numeric(10,2) not null
);

-- 6. Subscriptions
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id),
  product_id uuid not null references public.products (id),
  status text not null check (status in ('active', 'canceled', 'past_due', 'trialing')),
  stripe_subscription_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

-- 7. Blog
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  featured_image_url text,
  published_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 8. Testimonials
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  company text,
  quote text not null,
  avatar_url text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- 9. Settings (singleton row)
create table if not exists public.settings (
  id int primary key default 1,
  site_name text,
  primary_color text,
  logo_url text,
  default_meta_title text,
  default_meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 10. Contact messages (from contact form)
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);
```

---

### RLS and policies (reference)

```sql
-- Enable RLS
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.project_media enable row level security;
alter table public.products enable row level security;
alter table public.product_pricing enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.subscriptions enable row level security;
alter table public.blog_posts enable row level security;
alter table public.testimonials enable row level security;
alter table public.settings enable row level security;
alter table public.contact_messages enable row level security;

-- Helper: check if current user is admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

-- PROFILES policies
create policy "Users can view own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id);

create policy "Admins can read all profiles"
on public.profiles
for select
using (public.is_admin());

-- Content tables: public read
create policy "Public read - services"
on public.services
for select
using (true);

create policy "Admins manage services"
on public.services
for all
using (public.is_admin())
with check (public.is_admin());

-- Repeat same pattern for projects, project_media, products, product_pricing,
-- blog_posts, testimonials, settings:

create policy "Public read - projects"
on public.projects
for select using (true);

create policy "Admins manage projects"
on public.projects
for all
using (public.is_admin())
with check (public.is_admin());

-- ...and so on for each table:
-- project_media, products, product_pricing, blog_posts, testimonials, settings

-- Orders: user + admin access
create policy "Users read own orders"
on public.orders
for select
using (auth.uid() = user_id);

create policy "Admins read all orders"
on public.orders
for select
using (public.is_admin());

create policy "Admins manage orders"
on public.orders
for all
using (public.is_admin())
with check (public.is_admin());

-- Order items: join through orders
create policy "Users read own order items"
on public.order_items
for select
using (
  exists (
    select 1 from public.orders o
    where o.id = order_items.order_id
      and o.user_id = auth.uid()
  )
);

create policy "Admins read all order items"
on public.order_items
for select
using (public.is_admin());

create policy "Admins manage order items"
on public.order_items
for all
using (public.is_admin())
with check (public.is_admin());

-- Subscriptions: user + admin
create policy "Users read own subscriptions"
on public.subscriptions
for select
using (auth.uid() = user_id);

create policy "Admins read all subscriptions"
on public.subscriptions
for select
using (public.is_admin());

create policy "Admins manage subscriptions"
on public.subscriptions
for all
using (public.is_admin())
with check (public.is_admin());

-- Contact messages: admins only
create policy "Admins read contact messages"
on public.contact_messages
for select
using (public.is_admin());

create policy "Anyone can create contact messages"
on public.contact_messages
for insert
with check (true);
```

---
