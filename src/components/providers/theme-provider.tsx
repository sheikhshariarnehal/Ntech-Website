"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { createClient } from "@/lib/supabase/client";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    loadAndApplyCustomTheme();

    // Listen for theme updates from settings page
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme-updated') {
        loadAndApplyCustomTheme();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for theme updates in the same tab
    const handleLocalUpdate = () => {
      loadAndApplyCustomTheme();
    };
    
    window.addEventListener('theme-update', handleLocalUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('theme-update', handleLocalUpdate as EventListener);
    };
  }, []);

  async function loadAndApplyCustomTheme() {
    const supabase = createClient();
    const { data } = await supabase
      .from('site_settings')
      .select('enable_custom_theme, theme_background, theme_foreground, theme_card, theme_card_foreground, theme_popover, theme_popover_foreground, theme_primary, theme_primary_foreground, theme_secondary, theme_secondary_foreground, theme_muted, theme_muted_foreground, theme_accent, theme_accent_foreground, theme_destructive, theme_destructive_foreground, theme_border, theme_input, theme_ring, theme_radius')
      .single();

    if (data) {
      const root = document.documentElement;
      
      // Check if custom theme is enabled
      if (data.enable_custom_theme) {
        // Apply custom theme colors to CSS variables
        if (data.theme_background) root.style.setProperty('--background', data.theme_background);
        if (data.theme_foreground) root.style.setProperty('--foreground', data.theme_foreground);
        if (data.theme_card) root.style.setProperty('--card', data.theme_card);
        if (data.theme_card_foreground) root.style.setProperty('--card-foreground', data.theme_card_foreground);
        if (data.theme_popover) root.style.setProperty('--popover', data.theme_popover);
        if (data.theme_popover_foreground) root.style.setProperty('--popover-foreground', data.theme_popover_foreground);
        if (data.theme_primary) root.style.setProperty('--primary', data.theme_primary);
        if (data.theme_primary_foreground) root.style.setProperty('--primary-foreground', data.theme_primary_foreground);
        if (data.theme_secondary) root.style.setProperty('--secondary', data.theme_secondary);
        if (data.theme_secondary_foreground) root.style.setProperty('--secondary-foreground', data.theme_secondary_foreground);
        if (data.theme_muted) root.style.setProperty('--muted', data.theme_muted);
        if (data.theme_muted_foreground) root.style.setProperty('--muted-foreground', data.theme_muted_foreground);
        if (data.theme_accent) root.style.setProperty('--accent', data.theme_accent);
        if (data.theme_accent_foreground) root.style.setProperty('--accent-foreground', data.theme_accent_foreground);
        if (data.theme_destructive) root.style.setProperty('--destructive', data.theme_destructive);
        if (data.theme_destructive_foreground) root.style.setProperty('--destructive-foreground', data.theme_destructive_foreground);
        if (data.theme_border) root.style.setProperty('--border', data.theme_border);
        if (data.theme_input) root.style.setProperty('--input', data.theme_input);
        if (data.theme_ring) root.style.setProperty('--ring', data.theme_ring);
        if (data.theme_radius) root.style.setProperty('--radius', data.theme_radius);
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

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
