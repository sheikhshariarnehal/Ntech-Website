"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    loadAndApplyTheme();

    // Listen for theme updates from settings page
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme-updated') {
        loadAndApplyTheme();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for theme updates in the same tab
    const handleLocalUpdate = () => {
      loadAndApplyTheme();
    };
    
    window.addEventListener('theme-update', handleLocalUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('theme-update', handleLocalUpdate as EventListener);
    };
  }, []);

  async function loadAndApplyTheme() {
    const supabase = createClient();
    const { data } = await supabase
      .from('site_settings')
      .select('enable_custom_theme, theme_background, theme_foreground, theme_card, theme_card_foreground, theme_popover, theme_popover_foreground, theme_primary, theme_primary_foreground, theme_secondary, theme_secondary_foreground, theme_muted, theme_muted_foreground, theme_accent, theme_accent_foreground, theme_destructive, theme_destructive_foreground, theme_border, theme_input, theme_ring, theme_radius')
      .single();

    if (data) {
      const themeData = data as any; // site_settings table type not in generated types
      const root = document.documentElement;
      
      // Check if custom theme is enabled
      if (themeData.enable_custom_theme) {
        // Apply custom theme colors to CSS variables
        if (themeData.theme_background) root.style.setProperty('--background', themeData.theme_background);
        if (themeData.theme_foreground) root.style.setProperty('--foreground', themeData.theme_foreground);
        if (themeData.theme_card) root.style.setProperty('--card', themeData.theme_card);
        if (themeData.theme_card_foreground) root.style.setProperty('--card-foreground', themeData.theme_card_foreground);
        if (themeData.theme_popover) root.style.setProperty('--popover', themeData.theme_popover);
        if (themeData.theme_popover_foreground) root.style.setProperty('--popover-foreground', themeData.theme_popover_foreground);
        if (themeData.theme_primary) root.style.setProperty('--primary', themeData.theme_primary);
        if (themeData.theme_primary_foreground) root.style.setProperty('--primary-foreground', themeData.theme_primary_foreground);
        if (themeData.theme_secondary) root.style.setProperty('--secondary', themeData.theme_secondary);
        if (themeData.theme_secondary_foreground) root.style.setProperty('--secondary-foreground', themeData.theme_secondary_foreground);
        if (themeData.theme_muted) root.style.setProperty('--muted', themeData.theme_muted);
        if (themeData.theme_muted_foreground) root.style.setProperty('--muted-foreground', themeData.theme_muted_foreground);
        if (themeData.theme_accent) root.style.setProperty('--accent', themeData.theme_accent);
        if (themeData.theme_accent_foreground) root.style.setProperty('--accent-foreground', themeData.theme_accent_foreground);
        if (themeData.theme_destructive) root.style.setProperty('--destructive', themeData.theme_destructive);
        if (themeData.theme_destructive_foreground) root.style.setProperty('--destructive-foreground', themeData.theme_destructive_foreground);
        if (themeData.theme_border) root.style.setProperty('--border', themeData.theme_border);
        if (themeData.theme_input) root.style.setProperty('--input', themeData.theme_input);
        if (themeData.theme_ring) root.style.setProperty('--ring', themeData.theme_ring);
        if (themeData.theme_radius) root.style.setProperty('--radius', themeData.theme_radius);
      } else {
        // Remove custom theme properties to revert to globals.css defaults
        root.style.removeProperty('--background');
        root.style.removeProperty('--foreground');
        root.style.removeProperty('--card');
        root.style.removeProperty('--card-foreground');
        root.style.removeProperty('--popover');
        root.style.removeProperty('--popover-foreground');
        root.style.removeProperty('--primary');
        root.style.removeProperty('--primary-foreground');
        root.style.removeProperty('--secondary');
        root.style.removeProperty('--secondary-foreground');
        root.style.removeProperty('--muted');
        root.style.removeProperty('--muted-foreground');
        root.style.removeProperty('--accent');
        root.style.removeProperty('--accent-foreground');
        root.style.removeProperty('--destructive');
        root.style.removeProperty('--destructive-foreground');
        root.style.removeProperty('--border');
        root.style.removeProperty('--input');
        root.style.removeProperty('--ring');
        root.style.removeProperty('--radius');
      }
    }
  }

  return <>{children}</>;
}
