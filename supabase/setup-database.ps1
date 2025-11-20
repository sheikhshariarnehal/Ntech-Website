# Supabase Database Setup Script
# This script helps you set up the Ntech database schema

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Ntech Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Supabase CLI is installed
Write-Host "Checking for Supabase CLI..." -ForegroundColor Yellow
$supabaseCli = Get-Command supabase -ErrorAction SilentlyContinue

if (-not $supabaseCli) {
    Write-Host "❌ Supabase CLI not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install it first:" -ForegroundColor Yellow
    Write-Host "  npm install -g supabase" -ForegroundColor White
    Write-Host ""
    Write-Host "Or use manual setup (see README.md)" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Supabase CLI found" -ForegroundColor Green
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path ".\migrations\20250120000001_initial_schema.sql")) {
    Write-Host "❌ Migration file not found!" -ForegroundColor Red
    Write-Host "Please run this script from the supabase directory" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Migration files found" -ForegroundColor Green
Write-Host ""

# Ask user what they want to do
Write-Host "What would you like to do?" -ForegroundColor Cyan
Write-Host "  1. Apply migrations to linked project" -ForegroundColor White
Write-Host "  2. Apply migrations with seed data" -ForegroundColor White
Write-Host "  3. Show migration SQL (preview)" -ForegroundColor White
Write-Host "  4. Check database status" -ForegroundColor White
Write-Host "  0. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (0-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Applying migrations..." -ForegroundColor Yellow
        supabase db push
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✓ Migrations applied successfully!" -ForegroundColor Green
        } else {
            Write-Host ""
            Write-Host "❌ Migration failed. Check the error above." -ForegroundColor Red
        }
    }
    
    "2" {
        Write-Host ""
        Write-Host "Applying migrations with seed data..." -ForegroundColor Yellow
        supabase db push --include-seed
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✓ Migrations and seed data applied successfully!" -ForegroundColor Green
        } else {
            Write-Host ""
            Write-Host "❌ Migration failed. Check the error above." -ForegroundColor Red
        }
    }
    
    "3" {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "  Migration SQL Preview" -ForegroundColor Cyan
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Get-Content ".\migrations\20250120000001_initial_schema.sql" | Select-Object -First 50
        Write-Host ""
        Write-Host "... (showing first 50 lines)" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Full file: .\migrations\20250120000001_initial_schema.sql" -ForegroundColor Yellow
    }
    
    "4" {
        Write-Host ""
        Write-Host "Checking database status..." -ForegroundColor Yellow
        Write-Host ""
        
        # Check if linked
        Write-Host "Project link status:" -ForegroundColor Cyan
        $projectRef = supabase status 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Project is linked" -ForegroundColor Green
        } else {
            Write-Host "❌ Not linked to a project" -ForegroundColor Red
            Write-Host "Run: supabase link --project-ref YOUR_PROJECT_REF" -ForegroundColor Yellow
        }
        
        Write-Host ""
        Write-Host "Migration status:" -ForegroundColor Cyan
        supabase migration list
    }
    
    "0" {
        Write-Host ""
        Write-Host "Exiting..." -ForegroundColor Yellow
        exit 0
    }
    
    default {
        Write-Host ""
        Write-Host "❌ Invalid choice!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Test your database in Supabase Dashboard" -ForegroundColor White
Write-Host "  2. Create your first admin user" -ForegroundColor White
Write-Host "  3. Update the admin user's role in profiles table" -ForegroundColor White
Write-Host ""
Write-Host "To create an admin user:" -ForegroundColor Cyan
Write-Host "  UPDATE public.profiles" -ForegroundColor White
Write-Host "  SET role = 'admin'" -ForegroundColor White
Write-Host "  WHERE id = 'USER_UUID';" -ForegroundColor White
Write-Host ""
Write-Host "For more information, see README.md" -ForegroundColor Yellow
Write-Host ""
