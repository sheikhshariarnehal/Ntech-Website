# Supabase Database Setup

This directory contains the database schema and migrations for the Ntech SaaS platform.

## 📋 Overview

The database schema includes:
- **User Management**: Profiles with role-based access (admin/customer)
- **Services**: Technical services offered by the company
- **Products**: Digital products (ChatGPT Pro, Gemini Pro, etc.)
- **Orders & Payments**: Order management with Stripe integration
- **Projects**: Portfolio/case studies
- **Blog**: Content management system
- **Site Settings**: Global site configuration

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Admin helper function** for role-based policies
- **User-specific data access** for orders and profiles
- **Public read access** for published content

## 🚀 Quick Start

### Option 1: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Apply migrations
supabase db push

# Apply seed data (optional)
supabase db push --include-seed
```

### Option 2: Manual Application via Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `migrations/20250120000001_initial_schema.sql`
4. Paste and run the SQL
5. (Optional) Copy and run `seed.sql` for sample data

### Option 3: Using PowerShell Script

```powershell
# Run the setup script
.\setup-database.ps1
```

## 📊 Database Schema

### Core Tables

#### 1. profiles
- User profile information
- Links to `auth.users`
- Stores role (admin/customer)

#### 2. services
- Technical services offered
- SEO fields for marketing
- Active/inactive status

#### 3. products
- Digital products for sale
- Pricing and billing intervals
- Stock management

#### 4. orders & order_items
- Order tracking
- Payment status
- Line items with pricing

#### 5. licenses_or_keys
- License/voucher codes for digital products
- Delivery status tracking

#### 6. projects
- Portfolio projects
- Client case studies
- Featured projects

#### 7. posts
- Blog content
- Author attribution
- SEO optimization

#### 8. site_settings
- Global site configuration
- Branding and SEO defaults

## 🔒 Row Level Security Policies

### Public Content (Read Access)
- Active services
- Published projects
- Published blog posts
- Active products
- Site settings

### User-Specific Access
- Users can view/update their own profile
- Users can view their own orders
- Authors can manage their own posts

### Admin-Only Access
- Full CRUD on all tables
- Can view inactive/unpublished content
- Can manage all user data

## 🛠️ Helper Functions

### `is_admin()`
Returns `true` if the current authenticated user has admin role.

```sql
SELECT public.is_admin();
```

### `handle_updated_at()`
Automatically updates `updated_at` timestamp on row updates.

### `handle_new_user()`
Automatically creates a profile when a new user signs up.

## 📝 Indexes

Performance indexes are created for:
- Lookups by slug (services, products, projects, posts)
- Filtering by active/published status
- User-based queries (orders, profiles)
- Time-based sorting (created_at, published_at)

## 🧪 Testing the Schema

After applying the migrations, test the setup:

```sql
-- Check all tables are created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Verify RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Test admin function
SELECT public.is_admin();

-- Check seed data
SELECT COUNT(*) FROM public.services;
SELECT COUNT(*) FROM public.products;
SELECT COUNT(*) FROM public.posts;
```

## 🔄 Making Changes

### Adding New Migrations

```bash
# Create a new migration
supabase migration new your_migration_name

# Edit the generated file
# supabase/migrations/<timestamp>_your_migration_name.sql

# Apply the migration
supabase db push
```

### Best Practices

1. **Never edit existing migrations** - create new ones
2. **Test locally first** - use `supabase start` for local dev
3. **Review RLS policies** - ensure data security
4. **Add indexes** - for frequently queried columns
5. **Document changes** - add comments to complex SQL

## 🐛 Troubleshooting

### Migration Fails
- Check SQL syntax in migration file
- Ensure previous migrations are applied
- Verify you have proper permissions

### RLS Blocking Access
- Check if RLS policies are too restrictive
- Use `public.is_admin()` for admin bypass
- Test policies with different user roles

### Seed Data Not Appearing
- Ensure migrations are applied first
- Check for foreign key constraint errors
- Verify RLS allows inserting seed data

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL RLS](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Supabase documentation
3. Contact the development team
