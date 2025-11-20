
---

## 4. Data model (Supabase schema)

You can tweak names, but this gives you a strong starting point.

### 4.1 Users & roles

Supabase already has `auth.users`. Add a profile table:

**`profiles`**

* `id (uuid, PK, references auth.users)`
* `full_name (text)`
* `role (text)` – e.g., `admin`, `customer`
* `created_at (timestamp)`
* `updated_at (timestamp)`

### 4.2 Services

**`services`**

* `id (uuid, PK)`
* `slug (text, unique)` – e.g., `web-development`
* `name (text)` – “Web Development”
* `short_description (text)`
* `long_description (text)` – rich text/markdown
* `icon (text)` – URL or icon key
* `starting_price (numeric)` – optional
* `is_active (boolean)` – for showing/hiding
* `seo_title (text)`
* `seo_description (text)`
* `seo_keywords (text[])`
* `created_at (timestamp)`
* `updated_at (timestamp)`

### 4.3 Digital products

**`products`**

* `id (uuid, PK)`
* `slug (text, unique)` – e.g., `chatgpt-pro-subscription`
* `name (text)` – “ChatGPT Pro Subscription”
* `short_description (text)`
* `long_description (text)`
* `price (numeric)` – e.g., monthly or one-time
* `billing_interval (text)` – `one_time`, `monthly`, `yearly`
* `stock (int)` – if limited (maybe 0 or null for unlimited)
* `is_active (boolean)`
* `thumbnail_url (text)`
* `seo_title (text)`
* `seo_description (text)`
* `seo_keywords (text[])`
* `created_at (timestamp)`
* `updated_at (timestamp)`

**`product_metadata`** (optional, for license delivery instructions)

* `id (uuid, PK)`
* `product_id (uuid, FK products)`
* `key (text)` – e.g., `delivery_type`, `notes`, `integration_instructions`
* `value (text)`

### 4.4 Orders & payments

**`orders`**

* `id (uuid, PK)`
* `user_id (uuid, FK profiles, nullable)` – guest checkout allowed?
* `email (text)` – for guest orders
* `status (text)` – `pending`, `paid`, `canceled`, `refunded`
* `total_amount (numeric)`
* `currency (text)` – e.g., `usd`
* `payment_provider (text)` – `stripe`
* `payment_reference (text)` – e.g., Stripe session ID
* `created_at (timestamp)`
* `updated_at (timestamp)`

**`order_items`**

* `id (uuid, PK)`
* `order_id (uuid, FK orders)`
* `product_id (uuid, FK products)`
* `quantity (int)`
* `unit_price (numeric)`
* `subtotal (numeric)`

**`licenses_or_keys`** (if you store license keys / codes)

* `id (uuid, PK)`
* `order_item_id (uuid, FK order_items)`
* `code (text)` – e.g., voucher code, account details, etc.
* `status (text)` – `unused`, `delivered`, `revoked`
* `created_at (timestamp)`

> Business note (not technical): make sure selling these subscriptions as digital products complies with each provider’s terms (OpenAI, Google, Canva, etc.). Technically it's fine, but you’ll need a process for provisioning or delivering them.

### 4.5 Projects (portfolio)

**`projects`**

* `id (uuid, PK)`
* `slug (text, unique)`
* `title (text)`
* `client_name (text)`
* `short_description (text)`
* `full_description (text)` – case study, problem/solution/tech stack
* `services_used (text[])` – link to `services` if needed via join table
* `thumbnail_url (text)`
* `live_url (text)`
* `github_url (text)`
* `is_featured (boolean)`
* `published_at (timestamp)`
* `created_at (timestamp)`
* `updated_at (timestamp)`

**`project_images`**

* `id (uuid, PK)`
* `project_id (uuid, FK projects)`
* `image_url (text)`
* `caption (text)`
* `sort_order (int)`

### 4.6 Blog & SEO

**`posts`**

* `id (uuid, PK)`
* `slug (text, unique)`
* `title (text)`
* `excerpt (text)`
* `content (text)` – markdown/HTML
* `author_id (uuid, FK profiles)`
* `cover_image_url (text)`
* `tags (text[])`
* `published_at (timestamp)`
* `is_published (boolean)`
* `seo_title (text)`
* `seo_description (text)`
* `seo_keywords (text[])`
* `created_at (timestamp)`
* `updated_at (timestamp)`

**`site_settings`**

* `id (uuid, PK, default 1)`
* `site_name (text)`
* `tagline (text)`
* `logo_url (text)`
* `primary_color (text)`
* `support_email (text)`
* `default_seo_title (text)`
* `default_seo_description (text)`
* `default_seo_image (text)`
* `created_at (timestamp)`
* `updated_at (timestamp)`

---
