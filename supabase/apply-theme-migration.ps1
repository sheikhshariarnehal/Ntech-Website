# Apply the enable_custom_theme migration
# This script adds the enable_custom_theme column to the site_settings table

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Apply enable_custom_theme Migration" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$migrationFile = "supabase\migrations\20250121000001_add_enable_custom_theme.sql"

if (-not (Test-Path $migrationFile)) {
    Write-Host "Error: Migration file not found: $migrationFile" -ForegroundColor Red
    exit 1
}

Write-Host "Migration file found: $migrationFile" -ForegroundColor Green
Write-Host ""
Write-Host "This migration will:" -ForegroundColor Yellow
Write-Host "  1. Add 'enable_custom_theme' column to site_settings table" -ForegroundColor White
Write-Host "  2. Set default value to false (use globals.css theme)" -ForegroundColor White
Write-Host ""

Write-Host "To apply this migration, you have two options:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Option 1: Using Supabase CLI (Recommended)" -ForegroundColor Green
Write-Host "  1. Make sure Supabase CLI is installed: npm install -g supabase" -ForegroundColor White
Write-Host "  2. Link your project: supabase link --project-ref YOUR_PROJECT_REF" -ForegroundColor White
Write-Host "  3. Apply migration: supabase db push" -ForegroundColor White
Write-Host ""

Write-Host "Option 2: Using Supabase Dashboard" -ForegroundColor Green
Write-Host "  1. Go to your Supabase project dashboard" -ForegroundColor White
Write-Host "  2. Navigate to SQL Editor" -ForegroundColor White
Write-Host "  3. Copy and paste the SQL from: $migrationFile" -ForegroundColor White
Write-Host "  4. Run the SQL" -ForegroundColor White
Write-Host ""

Write-Host "Migration SQL Preview:" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray
Get-Content $migrationFile | ForEach-Object { Write-Host $_ -ForegroundColor White }
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host ""

Write-Host "After applying the migration, the enable_custom_theme toggle" -ForegroundColor Yellow
Write-Host "will be available in the admin settings page." -ForegroundColor Yellow
Write-Host ""
