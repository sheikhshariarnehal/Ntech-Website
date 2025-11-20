# IMPORTANT: MCP is in Read-Only Mode

The Supabase MCP server is currently configured in **read-only mode** for security. This means migrations cannot be applied directly through the MCP.

## ✅ Migration Files Created

I've created the following files for you:

1. **`migrations/20250120000001_initial_schema.sql`** - Complete database schema with:
   - All tables (profiles, services, products, orders, projects, posts, etc.)
   - Row Level Security (RLS) policies for all tables
   - Helper functions (`is_admin()`, `handle_updated_at()`, etc.)
   - Indexes for performance
   - Triggers for automation

2. **`seed.sql`** - Sample data including:
   - 5 services (Web Development, Mobile App, AI Integration, etc.)
   - 5 digital products (ChatGPT Pro, Gemini Pro, Canva Pro, etc.)
   - 3 portfolio projects
   - 3 blog posts

3. **`setup-database.ps1`** - PowerShell script to help apply migrations
4. **`README.md`** - Complete documentation

## 🚀 How to Apply the Migrations

You have **three options**:

### Option 1: Using Supabase CLI (Recommended)

```powershell
# 1. Install Supabase CLI if not installed
npm install -g supabase

# 2. Login to Supabase
supabase login

# 3. Navigate to supabase directory
cd d:\Poject\Ntech\supabase

# 4. Link to your project
supabase link --project-ref xrpgyotzqminukdmmxoq

# 5. Apply migrations
supabase db push

# 6. (Optional) Apply seed data
supabase db push --include-seed
```

### Option 2: Using the PowerShell Script

```powershell
cd d:\Poject\Ntech\supabase
.\setup-database.ps1
```

Then follow the on-screen instructions.

### Option 3: Manual Application via Dashboard

1. Go to https://supabase.com/dashboard/project/xrpgyotzqminukdmmxoq
2. Navigate to **SQL Editor**
3. Open `d:\Poject\Ntech\supabase\migrations\20250120000001_initial_schema.sql`
4. Copy all the SQL content
5. Paste it into the SQL Editor
6. Click "Run"
7. (Optional) Repeat for `seed.sql` to add sample data

## 🔍 What Gets Created

### Tables
- ✅ **profiles** - User profiles with admin/customer roles
- ✅ **services** - Technical services offered
- ✅ **products** - Digital products for sale
- ✅ **product_metadata** - Additional product information
- ✅ **orders** - Customer orders
- ✅ **order_items** - Order line items
- ✅ **licenses_or_keys** - License/voucher codes
- ✅ **projects** - Portfolio projects
- ✅ **project_images** - Project screenshots
- ✅ **posts** - Blog content
- ✅ **site_settings** - Global site configuration

### Security Features
- ✅ **RLS enabled** on all tables
- ✅ **Admin helper function** for role checks
- ✅ **Public read access** for active/published content
- ✅ **User-specific access** for orders and profiles
- ✅ **Admin-only write access** for most tables

### Performance
- ✅ **Indexes** on frequently queried columns
- ✅ **Automatic timestamps** with triggers
- ✅ **Foreign key constraints** for data integrity

## 📝 Next Steps After Migration

1. **Create your first admin user**:
   - Sign up through your app's authentication
   - Run this SQL to make them admin:
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE id = 'USER_UUID_HERE';
   ```

2. **Test the setup**:
   ```sql
   -- Check all tables exist
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' ORDER BY table_name;
   
   -- Verify RLS is enabled
   SELECT tablename, rowsecurity FROM pg_tables 
   WHERE schemaname = 'public';
   
   -- Check seed data (if applied)
   SELECT COUNT(*) FROM public.services;
   SELECT COUNT(*) FROM public.products;
   ```

3. **Configure your application**:
   - Update connection strings
   - Test authentication flows
   - Verify RLS policies work as expected

## ⚠️ Important Notes

- The migration is **idempotent** - you can run it multiple times safely
- All `CREATE` statements use `IF NOT EXISTS` where applicable
- Seed data uses `ON CONFLICT DO NOTHING` where applicable
- The database will be empty except for sample data if you run seed.sql

## 🆘 Troubleshooting

If you encounter errors:

1. **Check Supabase CLI version**: `supabase --version`
2. **Verify project connection**: `supabase status`
3. **Review error logs**: Check the terminal output carefully
4. **Manual inspection**: Use the Supabase Dashboard SQL Editor

For more help, see the README.md file in the supabase directory.

## 🔒 Security Reminder

Remember to:
- Never commit sensitive credentials to Git
- Use environment variables for secrets
- Test RLS policies thoroughly before production
- Keep the Supabase CLI updated

---

**Ready to proceed?** Choose one of the three options above to apply your database schema!
