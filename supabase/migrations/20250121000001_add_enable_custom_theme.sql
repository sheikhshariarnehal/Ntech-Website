-- Migration: Add enable_custom_theme column to site_settings table
-- Description: Adds a boolean flag to enable/disable custom theme colors
-- When disabled, the site will use default theme colors from globals.css

-- Add the enable_custom_theme column
ALTER TABLE public.site_settings
ADD COLUMN IF NOT EXISTS enable_custom_theme BOOLEAN DEFAULT false;

-- Add comment to document the column
COMMENT ON COLUMN public.site_settings.enable_custom_theme IS 'Enable custom theme colors. When false, uses default theme from globals.css';

-- Update any existing rows to have the column (in case table already has data)
UPDATE public.site_settings
SET enable_custom_theme = false
WHERE enable_custom_theme IS NULL;
