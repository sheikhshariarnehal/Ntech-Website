#!/bin/bash

# Function to create a file if it doesn't exist
create_file() {
    local file_path="$1"
    local dir_path=$(dirname "$file_path")
    
    # Create directory if it doesn't exist
    mkdir -p "$dir_path"
    
    # Create file if it doesn't exist
    if [ ! -f "$file_path" ]; then
        touch "$file_path"
        echo "Created: $file_path"
    else
        echo "Skipped (exists): $file_path"
    fi
}

echo "Starting folder structure generation..."

# 1. Top-level files
create_file ".env.local"
create_file ".gitignore"
create_file "next.config.mjs"
create_file "package.json"
create_file "postcss.config.mjs"
create_file "tailwind.config.mjs"
create_file "tsconfig.json"
create_file "middleware.ts"

# 2. src/app structure
create_file "src/app/layout.tsx"
create_file "src/app/page.tsx"
create_file "src/app/not-found.tsx"
create_file "src/app/sitemap.ts"
create_file "src/app/robots.ts"

# src/app/(public)
create_file "src/app/(public)/layout.tsx"
create_file "src/app/(public)/services/page.tsx"
create_file "src/app/(public)/services/[slug]/page.tsx"
create_file "src/app/(public)/products/page.tsx"
create_file "src/app/(public)/products/[slug]/page.tsx"
create_file "src/app/(public)/projects/page.tsx"
create_file "src/app/(public)/projects/[slug]/page.tsx"
create_file "src/app/(public)/about/page.tsx"
create_file "src/app/(public)/contact/page.tsx"
create_file "src/app/(public)/blog/page.tsx"
create_file "src/app/(public)/blog/[slug]/page.tsx"
create_file "src/app/(public)/auth/login/page.tsx"
create_file "src/app/(public)/auth/register/page.tsx"

# src/app/(dashboard)
create_file "src/app/(dashboard)/layout.tsx"
create_file "src/app/(dashboard)/page.tsx"

# src/app/admin
create_file "src/app/admin/layout.tsx"
create_file "src/app/admin/page.tsx"
create_file "src/app/admin/services/page.tsx"
create_file "src/app/admin/products/page.tsx"
create_file "src/app/admin/projects/page.tsx"
create_file "src/app/admin/orders/page.tsx"
create_file "src/app/admin/blog/page.tsx"
create_file "src/app/admin/settings/page.tsx"

# src/app/api
create_file "src/app/api/checkout/route.ts"
create_file "src/app/api/webhooks/stripe/route.ts"
create_file "src/app/api/contact/route.ts"

# 3. src/components
create_file "src/components/ui/button.tsx"
create_file "src/components/ui/input.tsx"
create_file "src/components/ui/textarea.tsx"
create_file "src/components/ui/card.tsx"

create_file "src/components/layout/main-header.tsx"
create_file "src/components/layout/main-footer.tsx"
create_file "src/components/layout/admin-sidebar.tsx"
create_file "src/components/layout/admin-header.tsx"

create_file "src/components/sections/home-hero.tsx"
create_file "src/components/sections/home-services.tsx"
create_file "src/components/sections/home-projects.tsx"
create_file "src/components/sections/home-products.tsx"

create_file "src/components/forms/contact-form.tsx"
create_file "src/components/forms/login-form.tsx"
create_file "src/components/forms/register-form.tsx"
create_file "src/components/forms/product-form.tsx"

create_file "src/components/shared/badge.tsx"
create_file "src/components/shared/breadcrumbs.tsx"
create_file "src/components/shared/page-header.tsx"
create_file "src/components/shared/data-table.tsx"
create_file "src/components/shared/loading-spinner.tsx"

# 4. src/features
# auth
create_file "src/features/auth/api/getCurrentUser.ts"
create_file "src/features/auth/api/requireAdmin.ts"
create_file "src/features/auth/hooks/useAuth.ts"
create_file "src/features/auth/components/user-menu.tsx"

# services
create_file "src/features/services/api/getServices.ts"
create_file "src/features/services/api/getServiceBySlug.ts"
create_file "src/features/services/api/upsertService.ts"
create_file "src/features/services/components/service-card.tsx"
create_file "src/features/services/components/service-list.tsx"
create_file "src/features/services/types.ts"

# products
create_file "src/features/products/api/getProducts.ts"
create_file "src/features/products/api/getProductBySlug.ts"
create_file "src/features/products/api/getFeaturedProducts.ts"
create_file "src/features/products/api/upsertProduct.ts"
create_file "src/features/products/components/product-card.tsx"
create_file "src/features/products/components/product-grid.tsx"
create_file "src/features/products/types.ts"

# projects
create_file "src/features/projects/api/getProjects.ts"
create_file "src/features/projects/api/getProjectBySlug.ts"
create_file "src/features/projects/components/project-card.tsx"
create_file "src/features/projects/components/project-grid.tsx"
create_file "src/features/projects/types.ts"

# orders
create_file "src/features/orders/api/getOrders.ts"
create_file "src/features/orders/api/getOrderById.ts"
create_file "src/features/orders/components/order-table.tsx"

# blog
create_file "src/features/blog/api/getPosts.ts"
create_file "src/features/blog/api/getPostBySlug.ts"
create_file "src/features/blog/components/blog-card.tsx"
create_file "src/features/blog/components/blog-list.tsx"
create_file "src/features/blog/types.ts"

# 5. src/lib
create_file "src/lib/supabase/client.ts"
create_file "src/lib/supabase/server-client.ts"
create_file "src/lib/stripe/client.ts"
create_file "src/lib/validation/schemas.ts"
create_file "src/lib/auth.ts"
create_file "src/lib/seo.ts"
create_file "src/lib/logger.ts"
create_file "src/lib/utils.ts"

# 6. src/types
create_file "src/types/supabase.ts"
create_file "src/types/next.d.ts"
create_file "src/types/index.ts"

# 7. src/config
create_file "src/config/navigation.ts"
create_file "src/config/site.ts"
create_file "src/config/seo.ts"
create_file "src/config/constants.ts"

# 8. src/styles
create_file "src/styles/globals.css"
create_file "src/styles/typography.css"

echo "Folder structure generation complete."
