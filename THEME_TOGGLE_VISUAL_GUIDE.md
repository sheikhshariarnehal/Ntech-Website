# Theme Toggle Feature - Visual Guide

## Admin Settings Page - Theme Colors Tab

### Toggle States

#### 1. Custom Theme DISABLED (Default State)
```
┌─────────────────────────────────────────────────────────────┐
│  Custom Theme Colors                          🎨 Live Preview│
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  🎨  Custom Theme Colors                              │  │
│  │      Using default theme from globals.css             │  │
│  │                                        Disabled [OFF]  │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │  ℹ️  Custom theme is disabled. The site is using     │  │
│  │     the default theme colors defined in globals.css.  │  │
│  │     Enable this option to customize theme colors.     │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
│  [Theme Presets Section - DISABLED/GRAYED OUT]               │
│  [Color Inputs Section - DISABLED/GRAYED OUT]                │
└─────────────────────────────────────────────────────────────┘
```

#### 2. Custom Theme ENABLED
```
┌─────────────────────────────────────────────────────────────┐
│  Custom Theme Colors                          🎨 Live Preview│
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  🎨  Custom Theme Colors                              │  │
│  │      Using custom theme colors from settings below    │  │
│  │                                         Enabled [ON]   │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │  ✅  Custom theme is active. Changes to the colors   │  │
│  │     below will be applied immediately with live       │  │
│  │     preview.                                          │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌─ Choose Theme Preset ─────────────────────────────────┐  │
│  │  [Custom]  [Dark]  [Light]  [Ocean]  [Sunset] ...     │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌─ Custom Theme Colors ─────────────────────────────────┐  │
│  │  Background Colors:                                    │  │
│  │    Background:  [222.2 84% 4.9%]                      │  │
│  │    Foreground:  [210 40% 98%]                         │  │
│  │                                                         │  │
│  │  Primary Colors:                                       │  │
│  │    Primary:     [210 40% 98%]                         │  │
│  │    ...                                                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Features Visualization

### Toggle Switch Component
```
DISABLED State:              ENABLED State:
┌──────────┐                ┌──────────┐
│○         │ Disabled       │         ○│ Enabled
└──────────┘                └──────────┘
  Gray/Muted                  Primary Color
```

### Color Indicators
Each color input shows a live preview circle:
```
🟣 Background Colors
  Background:  [222.2 84% 4.9%]  ← HSL color value
  Foreground:  [210 40% 98%]

🟦 Primary Colors
  Primary:     [210 40% 98%]
  ...
```

### Info Boxes

#### Disabled Info (Blue):
```
┌──────────────────────────────────────────┐
│ ℹ️  Custom theme is disabled...         │
│    Using default theme from globals.css  │
└──────────────────────────────────────────┘
```

#### Enabled Info (Green):
```
┌──────────────────────────────────────────┐
│ ✅  Custom theme is active...            │
│    Live preview enabled                  │
└──────────────────────────────────────────┘
```

## User Interaction Flow

```
User visits /admin/settings
    ↓
Clicks "Theme Colors" tab
    ↓
Sees "Custom Theme Colors" toggle (default: OFF)
    ↓
┌─────────────────────┐         ┌──────────────────────┐
│  Keep toggle OFF    │         │  Turn toggle ON      │
│  Use globals.css    │         │  Use custom colors   │
│  (Default theme)    │         │  (Customizable)      │
└─────────────────────┘         └──────────────────────┘
                                        ↓
                                Select preset OR
                                Edit colors manually
                                        ↓
                                Live preview applies
                                        ↓
                                Click "Save Settings"
                                        ↓
                                Theme persists site-wide
```

## Technical Flow

```
Page Load
    ↓
fetchSettings() loads enable_custom_theme from DB
    ↓
useEffect triggers applyThemeColors()
    ↓
┌──────────────────────┐         ┌─────────────────────┐
│ enable_custom_theme  │         │ enable_custom_theme │
│      = false         │         │      = true         │
└──────────────────────┘         └─────────────────────┘
         ↓                                   ↓
removeProperty() removes              setProperty() applies
custom CSS variables              custom CSS variables
         ↓                                   ↓
globals.css defaults           Custom colors from DB
     take effect                    override defaults
```

## Color Format (HSL)

All colors use HSL format without the `hsl()` wrapper:
```
Correct:   "222.2 84% 4.9%"
Incorrect: "hsl(222.2, 84%, 4.9%)"
```

This format is compatible with Tailwind CSS and shadcn/ui components.

## Example Color Values

### Dark Theme Colors:
```
Background:  222.2 84% 4.9%   → Very dark blue-gray
Foreground:  210 40% 98%      → Nearly white
Primary:     210 40% 98%      → Light blue-gray
Border:      217.2 32.6% 17.5% → Dark border
```

### Light Theme Colors:
```
Background:  0 0% 100%        → Pure white
Foreground:  222.2 84% 4.9%   → Very dark text
Primary:     222.2 47.4% 11.2% → Dark primary
Border:      214.3 31.8% 91.4% → Light border
```

## Database Schema

```sql
site_settings
├── id (uuid)
├── site_name (text)
├── ...
├── enable_custom_theme (boolean) ← NEW COLUMN
├── theme_background (text)
├── theme_foreground (text)
├── theme_primary (text)
└── ...
```

## API Response Example

```json
{
  "id": "...",
  "site_name": "Ntech",
  "enable_custom_theme": false,  ← Controls theme
  "theme_background": "222.2 84% 4.9%",
  "theme_foreground": "210 40% 98%",
  "theme_primary": "210 40% 98%",
  ...
}
```

When `enable_custom_theme` is `false`, the theme_* values are stored but not applied.
