

---

## 1. Global admin requirements

1. **Authentication & Access**

   * Only authenticated users with `role = 'admin'` can access any `/admin` route.
   * Non-authenticated users hitting `/admin/*` are redirected to `/auth/login`.
   * Authenticated non-admin users are shown an “Access denied” message or redirected to home.
   * Ability to log out from the admin UI.

2. **Layout & Navigation**

   * Persistent sidebar or top navigation with links to:

     * Dashboard (overview)
     * Services
     * Products
     * Projects
     * Orders
     * Customers (optional but recommended)
     * Blog
     * Leads / Contact submissions
     * SEO / Site settings
     * Media / Assets (optional)
     * Admin users (if you manage roles)
   * Breadcrumbs (e.g., `Admin > Products > Edit`).

3. **Common UI Patterns**

   * Standard list views:

     * Search
     * Sort (e.g., by created date, name, status)
     * Filters (status, published, etc.)
     * Pagination or infinite scroll.
   * Standard form behavior:

     * Client-side validation (required fields, formats, etc.).
     * Error feedback for backend failures.
     * Save, save & continue editing, and cancel actions.
   * Confirmation dialogs:

     * Deleting items (projects, products, etc.).
     * Changing critical settings (e.g., turning product off).

4. **Security-related behavior**

   * CSRF-safe API calls (handled via Next.js / Supabase SDK).
   * All sensitive actions (delete, change role, etc.) require authenticated admin session.
   * Logs or events (optional, but recommended) for critical actions.

---

## 2. Admin Dashboard Home (`/admin`)

**Purpose:** Give a quick overview of business & content status.

Functional requirements:

1. **Metrics Widgets**

   * Total revenue (last 30 days).
   * Number of orders (last 30 days).
   * Number of active products.
   * Number of published projects.
2. **Recent Activity**

   * List of latest orders (e.g., last 5).
   * Latest leads/contact form submissions.
   * Recently added/edited products or projects.
3. **Quick Actions**

   * Buttons/links:

     * “Add new product”
     * “Add new project”
     * “Add new blog post”
4. **Notifications Panel (optional)**

   * Show system alerts:

     * Failed webhook events.
     * Products out of stock (if applicable).
     * Pending configuration issues (e.g., missing Stripe key).

---

## 3. Services Management (`/admin/services`)

**List Page**

* Display all services with columns:

  * Name
  * Slug
  * Status (`is_active`)
  * Starting price (if any)
  * Last updated
* Actions per service:

  * Edit
  * Delete
  * Toggle “Active/Inactive”
* Filters:

  * By status (active/inactive).
* Search:

  * By name and slug.

**Create/Edit Service**

* Fields:

  * Name (required).
  * Slug (required, unique; auto-generate from name with option to edit).
  * Short description.
  * Long description (rich text or markdown).
  * Icon (select or URL).
  * Starting price (numeric, optional).
  * Is active (boolean).
  * SEO fields:

    * SEO title
    * SEO description
    * SEO keywords (comma-separated or tags UI)
* Actions:

  * Save draft / update.
  * Cancel (without saving).
* Validations:

  * Required fields (name, slug).
  * Slug format (no spaces, URL-safe).

---

## 4. Products Management (`/admin/products`)

You’re selling digital products: ChatGPT Pro, Gemini Pro, VEO3, Canva Pro, etc.

**List Page**

* Columns:

  * Product name
  * Slug
  * Price
  * Billing interval (`one_time`, `monthly`, `yearly`)
  * Status (`is_active`)
  * Total sales (optional summary)
  * Last updated
* Actions:

  * Edit
  * Delete
  * Toggle active/inactive.
* Filters:

  * Status (active/inactive).
  * Billing interval.
* Search:

  * Name, slug.

**Create/Edit Product**

* Fields:

  * Name (required)
  * Slug (required, unique)
  * Short description
  * Long description (rich text)
  * Price (required, numeric)
  * Billing interval (select from: one_time, monthly, yearly)
  * Stock (optional — unlimited if null)
  * Is active
  * Thumbnail image upload/URL
  * Metadata (key/value pairs) for:

    * Delivery type (`manual`, `automatic email`, `license key`, etc.)
    * Specific instructions to show on the order success page/email.
  * SEO fields:

    * SEO title
    * SEO description
    * SEO keywords
* Actions:

  * Save
  * Save & stay
  * Cancel
* Validations:

  * Required name, slug, price, billing interval.
  * Numeric price ≥ 0.
  * Slug uniqueness.

**Product Detail (Admin)**

* Show:

  * Product info.
  * Sales summary: total revenue, number of orders/items.
  * Recent orders containing this product (with links to orders page).

---

## 5. Projects / Portfolio Management (`/admin/projects`)

**List Page**

* Columns:

  * Title
  * Slug
  * Client name
  * Is featured
  * Published date
  * Status (published/draft if you support drafts)
* Actions:

  * Edit
  * Delete
  * Toggle featured.
* Filters:

  * Featured / non-featured.
  * Published / draft (if applicable).
* Search:

  * Title, client name.

**Create/Edit Project**

* Fields:

  * Title (required)
  * Slug (required, unique)
  * Client name (optional)
  * Short description
  * Full description (case study body)
  * Services used (multi-select from `services` list or tags)
  * Thumbnail image
  * Live URL
  * GitHub URL (optional)
  * Is featured (boolean)
  * Published date (optional – controls ordering, SEO)
* Gallery Management:

  * Add / remove project images.
  * Set image caption.
  * Drag-and-drop sort order.
* SEO:

  * SEO title
  * SEO description
  * SEO keywords
* Actions:

  * Save.
  * Save & preview (open public project page).
  * Delete (with confirmation).
* Validations:

  * Required title, slug.
  * Valid URLs for links.
  * Slug uniqueness.

---

## 6. Orders Management (`/admin/orders`)

**List Page**

* Columns:

  * Order ID
  * Customer email
  * Total amount + currency
  * Status (`pending`, `paid`, `canceled`, `refunded`)
  * Payment provider (Stripe, etc.)
  * Created date
* Actions:

  * View order detail.
  * Update status (e.g., mark refunded if processed externally).
* Filters:

  * Status
  * Date range (e.g., from–to).
  * Payment provider.
* Search:

  * By order ID.
  * By customer email.

**Order Detail Page (`/admin/orders/[id]`)**

* Shows:

  * Order info:

    * Order ID.
    * Created at, updated at.
    * Status.
    * Payment reference (Stripe session/payment intent ID).
    * Payment provider.
  * Customer info:

    * Email.
    * Linked account (if user_id exists).
  * Order items:

    * Product name, quantity, unit price, subtotal.
  * License / key blocks (if you use them):

    * Show codes associated with each order item.
    * Status of each key (`delivered`, `unused`).
* Admin actions:

  * Change order status (manual override, e.g., mark as refunded).
  * Resend order confirmation email.
  * Attach / edit license keys (if manual provisioning).

**Validation / Behavior**

* Status transitions:

  * Typically:

    * `pending` → `paid` (via webhook).
    * `pending` → `canceled`.
    * `paid` → `refunded`.
* Only admins can change status manually.
* Log status changes (optional – but recommended).

---

## 7. Customers / Users Management (`/admin/customers`)

Even if you let guests buy, it’s useful to see customers.

**List Page**

* Columns:

  * Name (from profile if available)
  * Email
  * Number of orders
  * Total spent
  * Last order date
* Filters:

  * High-value customers (total spent > X).
* Search:

  * By name, email.

**Customer Detail**

* Basic info:

  * Name.
  * Email.
  * Role (if they also have admin or other roles).
* Order history:

  * List of orders with links to order detail.
* Actions:

  * (Optional) Change role (e.g., make admin – but only if you want multi-admin management).
  * (Optional) Disable account or flag user (if needed).

---

## 8. Blog / Content Management (`/admin/blog`)

**List Page**

* Columns:

  * Title
  * Slug
  * Author
  * Published status (`published` or `draft`)
  * Published date
* Filters:

  * Status: published/draft.
* Search:

  * Title, slug.

**Create/Edit Blog Post**

* Fields:

  * Title (required)
  * Slug (required, unique)
  * Excerpt (short description)
  * Content (rich text or markdown)
  * Author (select current admin, default to logged-in admin)
  * Cover image
  * Tags (multiselect or chips)
  * Is published (boolean)
  * Published date (optional)
* SEO:

  * SEO title
  * SEO description
  * SEO keywords
* Actions:

  * Save as draft.
  * Publish/unpublish.
  * Preview post on public site.

---

## 9. Leads / Contact Submissions (`/admin/leads`)

These correspond to your public contact form.

**List Page**

* Columns:

  * Name
  * Email
  * Project type / service requested
  * Budget range
  * Status (`new`, `in_progress`, `closed`)
  * Created date
* Filters:

  * Status.
  * Date range.
* Search:

  * Name, email.

**Lead Detail**

* Full message content.
* Metadata:

  * Source page (if you track it).
  * Service type they selected.
* Actions:

  * Change status (`new` → `in_progress` → `closed`).
  * Add internal notes (comments visible only to admins).
  * Mark as spam (optional).
  * Quick “Reply via email” link (mailto).

---

## 10. SEO & Site Settings Management (`/admin/seo`, `/admin/settings`)

### 10.1 Site settings

**General settings**

* Site name
* Tagline
* Primary logo & favicon uploads
* Primary brand color (optional, for theme)
* Support email address
* Social links:

  * Facebook, LinkedIn, GitHub, etc.

**Functional behavior**

* Changes appear on frontend (header/footer, etc).
* Only admins can modify.

### 10.2 SEO settings

**Global SEO config**

* Default SEO title (for pages lacking specific SEO data).
* Default SEO description.
* Default OG image URL.
* Whether to allow indexing (global “noindex” toggle for staging environments).

**Sitemap & robots**

* Toggle to regenerate sitemap (or it’s generated dynamically).
* Configure robots.txt pattern:

  * For example, “Disallow /admin”.

**Schema settings (optional)**

* Basic Organization schema fields:

  * Company name.
  * Logo.
  * Contact email.
  * URL and sameAs (social profiles).

---

## 11. Media / Asset Management (`/admin/media`) – Optional

If you use Supabase Storage or another bucket for assets.

Functional requirements:

* Upload images/files:

  * Projects thumbnails.
  * Blog covers.
  * Product images.
* See list of uploaded media:

  * Thumbnail preview, file name, size, created date.
* Search & filter by:

  * Type (image, doc, etc.).
* Copy URL button for use in other forms.

---

## 12. Admin Users & Roles Management (`/admin/admins`) – Optional

If you want multiple admins or fine-grained permissions later.

**List Page**

* Columns:

  * Name
  * Email
  * Role (admin, editor, etc.)
  * Last login (if tracked)

**Actions**

* Invite new admin (by email).
* Change role (e.g., admin/editor).
* Disable/enable admin account.

---

## 13. System / Logs (Optional but powerful)

**Error logs**

* List of recent system errors (from webhooks, API failures).

**Webhook logs (payments, emails)**

* List of webhook events:

  * Type.
  * Status (success/fail).
  * Created at.
* Event detail view with payload (for debugging).

---
