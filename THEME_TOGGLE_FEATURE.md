# Theme Colors Enable/Disable Feature

## Overview
Added the ability to enable/disable custom theme colors in the admin settings. When disabled, the site will use the default theme colors defined in `globals.css`.

## Changes Made

### 1. Frontend Updates (`src/app/admin/settings/page.tsx`)

#### Added State
- **`enable_custom_theme`**: Boolean flag (default: `false`) to control whether custom theme colors are applied

#### Updated Functions
- **`applyThemeColors()`**: Modified to check the `enable_custom_theme` flag
  - When `true`: Applies custom theme colors from the database to CSS variables
  - When `false`: Removes custom CSS properties to revert to `globals.css` defaults

#### UI Improvements
- **Toggle Switch**: Added a prominent toggle at the top of the Theme Colors section
  - Shows current status (Enabled/Disabled)
  - Visual indicator with color coding
  - Info messages explaining the current state
  
- **Visual Feedback**:
  - Blue info box when disabled (explains default theme is in use)
  - Green success box when enabled (explains custom colors are active)
  - Disabled state (opacity + pointer-events-none) for theme presets and color inputs when custom theme is off

#### Updated Dependencies
- Added `enable_custom_theme` to the `useEffect` dependency array that applies theme colors

### 2. Database Migration (`supabase/migrations/20250121000001_add_enable_custom_theme.sql`)

```sql
-- Add the enable_custom_theme column to site_settings table
ALTER TABLE public.site_settings
ADD COLUMN IF NOT EXISTS enable_custom_theme BOOLEAN DEFAULT false;

-- Add documentation comment
COMMENT ON COLUMN public.site_settings.enable_custom_theme IS 
  'Enable custom theme colors. When false, uses default theme from globals.css';

-- Update existing rows
UPDATE public.site_settings
SET enable_custom_theme = false
WHERE enable_custom_theme IS NULL;
```

### 3. Migration Helper Script (`supabase/apply-theme-migration.ps1`)
Created a PowerShell script to guide users through applying the migration via:
- Supabase CLI
- Supabase Dashboard (manual SQL execution)

## How It Works

### Default Behavior (Custom Theme Disabled)
1. `enable_custom_theme` is `false` by default
2. The site uses theme colors from `src/styles/globals.css`
3. Admin settings page shows disabled state with blue info message
4. Theme preset selector and color inputs are visually disabled
5. No custom CSS variables are applied to the DOM

### When Custom Theme is Enabled
1. Admin toggles `enable_custom_theme` to `true`
2. Custom theme colors from settings are immediately applied via CSS variables
3. Live preview shows changes in real-time
4. Theme presets and color inputs become interactive
5. On save, the custom theme persists across all pages

## User Flow

1. **Navigate to Admin Settings**
   ```
   http://localhost:3000/admin/settings
   ```

2. **Go to Theme Colors Tab**
   - Click on "Theme Colors" tab

3. **Enable Custom Theme**
   - Toggle the "Custom Theme Colors" switch to Enabled
   - The page immediately applies custom colors (live preview)

4. **Customize Colors (Optional)**
   - Select a preset theme or
   - Manually edit color values in HSL format

5. **Save Settings**
   - Click "Save Settings" button
   - Changes persist and apply site-wide

6. **Disable Custom Theme (Revert to Default)**
   - Toggle the switch to Disabled
   - Site reverts to `globals.css` theme
   - Save to persist this setting

## Migration Instructions

### Option 1: Using Supabase CLI (Recommended)
```bash
# Make sure Supabase CLI is installed
npm install -g supabase

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Apply migration
supabase db push
```

### Option 2: Using Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the SQL from `supabase/migrations/20250121000001_add_enable_custom_theme.sql`
4. Paste and execute

### Option 3: Using PowerShell Helper Script
```powershell
.\supabase\apply-theme-migration.ps1
```

## Benefits

✅ **Flexibility**: Switch between default and custom themes easily  
✅ **Safety**: Default theme always available as fallback  
✅ **Live Preview**: See changes immediately without saving  
✅ **User-Friendly**: Clear visual indicators of current state  
✅ **Backward Compatible**: Existing installations default to `globals.css`  

## Technical Details

### CSS Variable Management
- **Custom Theme Enabled**: Sets CSS variables on `document.documentElement`
- **Custom Theme Disabled**: Removes inline CSS variables, allowing `globals.css` to take precedence

### State Management
- Theme state stored in `site_settings` table in Supabase
- Real-time application via React `useEffect` hook
- Changes broadcast via `localStorage` event for cross-tab synchronization

## Testing Checklist

- [ ] Toggle switch works correctly
- [ ] Theme changes apply in real-time (live preview)
- [ ] Disabled state shows correct UI (opacity, info message)
- [ ] Presets and color inputs are disabled when toggle is off
- [ ] Saving persists the toggle state
- [ ] Page refresh maintains the toggle state
- [ ] Default theme loads when toggle is disabled
- [ ] Custom theme loads when toggle is enabled
- [ ] Migration applies successfully without errors

## Future Enhancements

- Add theme preview thumbnails for presets
- Export/import theme configurations
- Schedule theme changes (e.g., dark mode at night)
- Multiple theme profiles (A/B testing)
