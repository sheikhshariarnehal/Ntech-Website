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
      .select('theme_background, theme_foreground, theme_card, theme_card_foreground, theme_popover, theme_popover_foreground, theme_primary, theme_primary_foreground, theme_secondary, theme_secondary_foreground, theme_muted, theme_muted_foreground, theme_accent, theme_accent_foreground, theme_destructive, theme_destructive_foreground, theme_border, theme_input, theme_ring, theme_radius')
      .single();

    if (data) {
      const root = document.documentElement;
      
      // Apply theme colors to CSS variables
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
    }
  }

  return <>{children}</>;
}
