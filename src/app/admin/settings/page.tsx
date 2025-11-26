"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  RefreshCw, 
  Globe, 
  Palette, 
  Mail, 
  Share2, 
  Settings as SettingsIcon,
  AlertCircle,
  CheckCircle,
  Wrench,
  Eye,
  Paintbrush
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Theme Preset Definitions
const THEME_PRESETS = {
  custom: {
    name: "Custom",
    description: "Create your own theme",
    isPremium: false,
    colors: {} // Will use current custom values
  },
  dark: {
    name: "Default Dark (Electric)",
    description: "Professional dark theme with electric blue accents",
    isPremium: false,
    colors: {
      theme_background: "222.2 84% 4.9%",
      theme_foreground: "210 40% 98%",
      theme_card: "222.2 84% 4.9%",
      theme_card_foreground: "210 40% 98%",
      theme_popover: "222.2 84% 4.9%",
      theme_popover_foreground: "210 40% 98%",
      theme_primary: "252 87% 67%",
      theme_primary_foreground: "210 40% 98%",
      theme_secondary: "217.2 32.6% 17.5%",
      theme_secondary_foreground: "210 40% 98%",
      theme_muted: "217.2 32.6% 17.5%",
      theme_muted_foreground: "215 20.2% 65.1%",
      theme_accent: "217.2 32.6% 17.5%",
      theme_accent_foreground: "210 40% 98%",
      theme_destructive: "0 62.8% 30.6%",
      theme_destructive_foreground: "210 40% 98%",
      theme_border: "217.2 32.6% 17.5%",
      theme_input: "217.2 32.6% 17.5%",
      theme_ring: "252 87% 67%",
      theme_radius: "0.5rem"
    }
  },
  light: {
    name: "Light",
    description: "Clean light theme",
    isPremium: false,
    colors: {
      theme_background: "0 0% 100%",
      theme_foreground: "222.2 84% 4.9%",
      theme_card: "0 0% 100%",
      theme_card_foreground: "222.2 84% 4.9%",
      theme_popover: "0 0% 100%",
      theme_popover_foreground: "222.2 84% 4.9%",
      theme_primary: "222.2 47.4% 11.2%",
      theme_primary_foreground: "210 40% 98%",
      theme_secondary: "210 40% 96.1%",
      theme_secondary_foreground: "222.2 47.4% 11.2%",
      theme_muted: "210 40% 96.1%",
      theme_muted_foreground: "215.4 16.3% 46.9%",
      theme_accent: "210 40% 96.1%",
      theme_accent_foreground: "222.2 47.4% 11.2%",
      theme_destructive: "0 84.2% 60.2%",
      theme_destructive_foreground: "210 40% 98%",
      theme_border: "214.3 31.8% 91.4%",
      theme_input: "214.3 31.8% 91.4%",
      theme_ring: "222.2 84% 4.9%",
      theme_radius: "0.5rem"
    }
  },
  ocean: {
    name: "Ocean Blue",
    description: "Cool ocean-inspired theme",
    isPremium: true,
    colors: {
      theme_background: "220 40% 8%",
      theme_foreground: "210 40% 98%",
      theme_card: "220 35% 12%",
      theme_card_foreground: "210 40% 98%",
      theme_popover: "220 35% 12%",
      theme_popover_foreground: "210 40% 98%",
      theme_primary: "199 89% 48%",
      theme_primary_foreground: "210 40% 98%",
      theme_secondary: "215 25% 27%",
      theme_secondary_foreground: "210 40% 98%",
      theme_muted: "215 25% 27%",
      theme_muted_foreground: "215 20% 65%",
      theme_accent: "199 89% 48%",
      theme_accent_foreground: "210 40% 98%",
      theme_destructive: "0 62.8% 30.6%",
      theme_destructive_foreground: "210 40% 98%",
      theme_border: "215 25% 27%",
      theme_input: "215 25% 27%",
      theme_ring: "199 89% 48%",
      theme_radius: "0.75rem"
    }
  },
  sunset: {
    name: "Sunset Orange",
    description: "Warm sunset-inspired theme",
    isPremium: true,
    colors: {
      theme_background: "20 40% 8%",
      theme_foreground: "30 40% 98%",
      theme_card: "20 35% 12%",
      theme_card_foreground: "30 40% 98%",
      theme_popover: "20 35% 12%",
      theme_popover_foreground: "30 40% 98%",
      theme_primary: "25 95% 53%",
      theme_primary_foreground: "30 40% 98%",
      theme_secondary: "30 25% 25%",
      theme_secondary_foreground: "30 40% 98%",
      theme_muted: "30 25% 25%",
      theme_muted_foreground: "30 20% 65%",
      theme_accent: "35 90% 55%",
      theme_accent_foreground: "30 40% 98%",
      theme_destructive: "0 62.8% 30.6%",
      theme_destructive_foreground: "30 40% 98%",
      theme_border: "30 25% 25%",
      theme_input: "30 25% 25%",
      theme_ring: "25 95% 53%",
      theme_radius: "0.75rem"
    }
  },
  forest: {
    name: "Forest Green",
    description: "Nature-inspired green theme",
    isPremium: true,
    colors: {
      theme_background: "140 40% 8%",
      theme_foreground: "140 40% 98%",
      theme_card: "140 35% 12%",
      theme_card_foreground: "140 40% 98%",
      theme_popover: "140 35% 12%",
      theme_popover_foreground: "140 40% 98%",
      theme_primary: "142 76% 36%",
      theme_primary_foreground: "140 40% 98%",
      theme_secondary: "140 25% 25%",
      theme_secondary_foreground: "140 40% 98%",
      theme_muted: "140 25% 25%",
      theme_muted_foreground: "140 20% 65%",
      theme_accent: "142 76% 36%",
      theme_accent_foreground: "140 40% 98%",
      theme_destructive: "0 62.8% 30.6%",
      theme_destructive_foreground: "140 40% 98%",
      theme_border: "140 25% 25%",
      theme_input: "140 25% 25%",
      theme_ring: "142 76% 36%",
      theme_radius: "0.5rem"
    }
  },
  purple: {
    name: "Royal Purple",
    description: "Premium purple theme",
    isPremium: true,
    colors: {
      theme_background: "270 40% 8%",
      theme_foreground: "270 40% 98%",
      theme_card: "270 35% 12%",
      theme_card_foreground: "270 40% 98%",
      theme_popover: "270 35% 12%",
      theme_popover_foreground: "270 40% 98%",
      theme_primary: "271 81% 56%",
      theme_primary_foreground: "270 40% 98%",
      theme_secondary: "270 25% 25%",
      theme_secondary_foreground: "270 40% 98%",
      theme_muted: "270 25% 25%",
      theme_muted_foreground: "270 20% 65%",
      theme_accent: "271 81% 56%",
      theme_accent_foreground: "270 40% 98%",
      theme_destructive: "0 62.8% 30.6%",
      theme_destructive_foreground: "270 40% 98%",
      theme_border: "270 25% 25%",
      theme_input: "270 25% 25%",
      theme_ring: "271 81% 56%",
      theme_radius: "0.75rem"
    }
  },
  emerald: {
    name: "Emerald Dark",
    description: "Dark theme with emerald accents",
    isPremium: false,
    colors: {
      theme_background: "240 10% 3.9%",
      theme_foreground: "0 0% 98%",
      theme_card: "240 10% 3.9%",
      theme_card_foreground: "0 0% 98%",
      theme_popover: "240 10% 3.9%",
      theme_popover_foreground: "0 0% 98%",
      theme_primary: "142.1 76.2% 36.3%",
      theme_primary_foreground: "355.7 100% 97.3%",
      theme_secondary: "240 3.7% 15.9%",
      theme_secondary_foreground: "0 0% 98%",
      theme_muted: "240 3.7% 15.9%",
      theme_muted_foreground: "240 5% 64.9%",
      theme_accent: "240 3.7% 15.9%",
      theme_accent_foreground: "0 0% 98%",
      theme_destructive: "0 62.8% 30.6%",
      theme_destructive_foreground: "0 0% 98%",
      theme_border: "240 3.7% 15.9%",
      theme_input: "240 3.7% 15.9%",
      theme_ring: "142.4 71.8% 29.2%",
      theme_radius: "0.5rem"
    }
  },
  slate: {
    name: "Slate Gray",
    description: "Neutral slate theme",
    isPremium: false,
    colors: {
      theme_background: "222.2 84% 4.9%",
      theme_foreground: "210 40% 98%",
      theme_card: "222.2 84% 4.9%",
      theme_card_foreground: "210 40% 98%",
      theme_popover: "222.2 84% 4.9%",
      theme_popover_foreground: "210 40% 98%",
      theme_primary: "217.2 91.2% 59.8%",
      theme_primary_foreground: "222.2 47.4% 11.2%",
      theme_secondary: "217.2 32.6% 17.5%",
      theme_secondary_foreground: "210 40% 98%",
      theme_muted: "217.2 32.6% 17.5%",
      theme_muted_foreground: "215 20.2% 65.1%",
      theme_accent: "217.2 32.6% 17.5%",
      theme_accent_foreground: "210 40% 98%",
      theme_destructive: "0 62.8% 30.6%",
      theme_destructive_foreground: "210 40% 98%",
      theme_border: "217.2 32.6% 17.5%",
      theme_input: "217.2 32.6% 17.5%",
      theme_ring: "224.3 76.3% 48%",
      theme_radius: "0.5rem"
    }
  },
  corporate: {
    name: "Corporate Blue",
    description: "Professional corporate theme",
    isPremium: false,
    colors: {
      theme_background: "0 0% 100%",
      theme_foreground: "222.2 84% 4.9%",
      theme_card: "0 0% 100%",
      theme_card_foreground: "222.2 84% 4.9%",
      theme_popover: "0 0% 100%",
      theme_popover_foreground: "222.2 84% 4.9%",
      theme_primary: "221.2 83.2% 53.3%",
      theme_primary_foreground: "210 40% 98%",
      theme_secondary: "210 40% 96.1%",
      theme_secondary_foreground: "222.2 47.4% 11.2%",
      theme_muted: "210 40% 96.1%",
      theme_muted_foreground: "215.4 16.3% 46.9%",
      theme_accent: "210 40% 96.1%",
      theme_accent_foreground: "222.2 47.4% 11.2%",
      theme_destructive: "0 84.2% 60.2%",
      theme_destructive_foreground: "210 40% 98%",
      theme_border: "214.3 31.8% 91.4%",
      theme_input: "214.3 31.8% 91.4%",
      theme_ring: "221.2 83.2% 53.3%",
      theme_radius: "0.5rem"
    }
  },
  neon: {
    name: "Neon Cyberpunk",
    description: "Vibrant dark cyberpunk theme",
    isPremium: true,
    colors: {
      theme_background: "280 60% 5%",
      theme_foreground: "280 20% 98%",
      theme_card: "280 50% 10%",
      theme_card_foreground: "280 20% 98%",
      theme_popover: "280 50% 10%",
      theme_popover_foreground: "280 20% 98%",
      theme_primary: "290 100% 50%",
      theme_primary_foreground: "0 0% 100%",
      theme_secondary: "260 50% 20%",
      theme_secondary_foreground: "280 20% 98%",
      theme_muted: "260 30% 20%",
      theme_muted_foreground: "260 20% 70%",
      theme_accent: "180 100% 50%",
      theme_accent_foreground: "280 60% 5%",
      theme_destructive: "0 100% 50%",
      theme_destructive_foreground: "0 0% 100%",
      theme_border: "260 30% 20%",
      theme_input: "260 30% 20%",
      theme_ring: "290 100% 50%",
      theme_radius: "0rem"
    }
  },
  pastel: {
    name: "Soft Pastel",
    description: "Gentle light pastel theme",
    isPremium: true,
    colors: {
      theme_background: "30 30% 98%",
      theme_foreground: "240 10% 30%",
      theme_card: "0 0% 100%",
      theme_card_foreground: "240 10% 30%",
      theme_popover: "0 0% 100%",
      theme_popover_foreground: "240 10% 30%",
      theme_primary: "260 60% 75%",
      theme_primary_foreground: "260 40% 20%",
      theme_secondary: "160 50% 90%",
      theme_secondary_foreground: "160 40% 30%",
      theme_muted: "240 10% 95%",
      theme_muted_foreground: "240 10% 60%",
      theme_accent: "330 60% 90%",
      theme_accent_foreground: "330 40% 30%",
      theme_destructive: "0 60% 90%",
      theme_destructive_foreground: "0 40% 40%",
      theme_border: "240 10% 90%",
      theme_input: "240 10% 90%",
      theme_ring: "260 60% 75%",
      theme_radius: "1rem"
    }
  }
};

// Helper component for color inputs
const ColorInput = ({ label, id, value, onChange }: { label: string; id: string; value: string; onChange: (field: string, value: any) => void }) => {
  const hslToHex = (hsl: string): string => {
    const parts = hsl.trim().split(/\s+/);
    if (parts.length !== 3) return '#000000';
    
    const h = parseFloat(parts[0]);
    const s = parseFloat(parts[1]) / 100;
    const l = parseFloat(parts[2]) / 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
    
    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  
  const hexToHsl = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
        case g: h = ((b - r) / d + 2) * 60; break;
        case b: h = ((r - g) / d + 4) * 60; break;
      }
    }
    
    return `${h.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
  };

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">{label}</Label>
      <div className="flex gap-2">
        <input
          type="color"
          value={hslToHex(value)}
          onChange={(e) => onChange(id, hexToHsl(e.target.value))}
          className="h-9 w-12 rounded cursor-pointer border-2 border-input"
          title={`Pick ${label.toLowerCase()} color`}
        />
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder="H S% L%"
          className="flex-1 h-9 text-xs font-mono"
        />
      </div>
    </div>
  );
};

export default function SettingsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [selectedPreset, setSelectedPreset] = useState("custom");
  const [formData, setFormData] = useState({
    // General
    site_name: "",
    tagline: "",
    support_email: "",
    phone: "",
    address: "",
    office_hours: "",
    
    // Branding
    logo_url: "",
    favicon_url: "",
    primary_color: "",
    theme_mode: "dark",
    
    // Theme Settings
    enable_custom_theme: false,
    
    // Theme Colors (HSL format)
    theme_background: "222.2 84% 4.9%",
    theme_foreground: "210 40% 98%",
    theme_card: "222.2 84% 4.9%",
    theme_card_foreground: "210 40% 98%",
    theme_popover: "222.2 84% 4.9%",
    theme_popover_foreground: "210 40% 98%",
    theme_primary: "210 40% 98%",
    theme_primary_foreground: "222.2 47.4% 11.2%",
    theme_secondary: "217.2 32.6% 17.5%",
    theme_secondary_foreground: "210 40% 98%",
    theme_muted: "217.2 32.6% 17.5%",
    theme_muted_foreground: "215 20.2% 65.1%",
    theme_accent: "217.2 32.6% 17.5%",
    theme_accent_foreground: "210 40% 98%",
    theme_destructive: "0 62.8% 30.6%",
    theme_destructive_foreground: "210 40% 98%",
    theme_border: "217.2 32.6% 17.5%",
    theme_input: "217.2 32.6% 17.5%",
    theme_ring: "212.7 26.8% 83.9%",
    theme_radius: "0.5rem",
    
    // Social Media
    social_facebook: "",
    social_twitter: "",
    social_linkedin: "",
    social_github: "",
    social_instagram: "",
    social_youtube: "",
    
    // SEO
    meta_description: "",
    meta_keywords: "",
    default_seo_title: "",
    default_seo_description: "",
    default_seo_image: "",
    google_analytics_id: "",
    facebook_pixel_id: "",
    
    // Features
    enable_blog: true,
    enable_shop: true,
    enable_newsletter: true,
    
    // Email
    smtp_host: "",
    smtp_port: 587,
    smtp_user: "",
    smtp_from_email: "",
    smtp_from_name: "",
    
    // Maintenance
    maintenance_mode: false,
    maintenance_message: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  // Apply theme colors to CSS variables in real-time
  useEffect(() => {
    applyThemeColors();
  }, [
    formData.enable_custom_theme,
    formData.theme_background,
    formData.theme_foreground,
    formData.theme_card,
    formData.theme_card_foreground,
    formData.theme_popover,
    formData.theme_popover_foreground,
    formData.theme_primary,
    formData.theme_primary_foreground,
    formData.theme_secondary,
    formData.theme_secondary_foreground,
    formData.theme_muted,
    formData.theme_muted_foreground,
    formData.theme_accent,
    formData.theme_accent_foreground,
    formData.theme_destructive,
    formData.theme_destructive_foreground,
    formData.theme_border,
    formData.theme_input,
    formData.theme_ring,
    formData.theme_radius,
  ]);

  function applyThemeColors() {
    const root = document.documentElement;
    
    // Only apply custom theme if enabled, otherwise remove custom properties to use globals.css defaults
    if (formData.enable_custom_theme) {
      root.style.setProperty('--background', formData.theme_background);
      root.style.setProperty('--foreground', formData.theme_foreground);
      root.style.setProperty('--card', formData.theme_card);
      root.style.setProperty('--card-foreground', formData.theme_card_foreground);
      root.style.setProperty('--popover', formData.theme_popover);
      root.style.setProperty('--popover-foreground', formData.theme_popover_foreground);
      root.style.setProperty('--primary', formData.theme_primary);
      root.style.setProperty('--primary-foreground', formData.theme_primary_foreground);
      root.style.setProperty('--secondary', formData.theme_secondary);
      root.style.setProperty('--secondary-foreground', formData.theme_secondary_foreground);
      root.style.setProperty('--muted', formData.theme_muted);
      root.style.setProperty('--muted-foreground', formData.theme_muted_foreground);
      root.style.setProperty('--accent', formData.theme_accent);
      root.style.setProperty('--accent-foreground', formData.theme_accent_foreground);
      root.style.setProperty('--destructive', formData.theme_destructive);
      root.style.setProperty('--destructive-foreground', formData.theme_destructive_foreground);
      root.style.setProperty('--border', formData.theme_border);
      root.style.setProperty('--input', formData.theme_input);
      root.style.setProperty('--ring', formData.theme_ring);
      root.style.setProperty('--radius', formData.theme_radius);
    } else {
      // Remove custom properties to revert to globals.css defaults
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

  // Helper functions for color conversion
  function hslToHex(hsl: string): string {
    const parts = hsl.trim().split(/\s+/);
    if (parts.length !== 3) return '#000000';
    
    const h = parseFloat(parts[0]);
    const s = parseFloat(parts[1]) / 100;
    const l = parseFloat(parts[2]) / 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
    
    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  
  function hexToHsl(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
        case g: h = ((b - r) / d + 2) * 60; break;
        case b: h = ((r - g) / d + 4) * 60; break;
      }
    }
    
    return `${h.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
  }

  function applyPreset(presetKey: string) {
    setSelectedPreset(presetKey);
    const preset = THEME_PRESETS[presetKey as keyof typeof THEME_PRESETS];
    
    if (presetKey === 'custom' || !preset.colors) {
      return; // Keep current custom values
    }
    
    setFormData(prev => ({
      ...prev,
      ...preset.colors
    }));
  }

  async function fetchSettings() {
    setLoading(true);
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .single();

    if (data) {
      const settingsData = data as any; // site_settings table type not in generated types
      setSettings(settingsData);
      setFormData({
        site_name: settingsData.site_name || "",
        tagline: settingsData.tagline || "",
        support_email: settingsData.support_email || "",
        phone: settingsData.phone || "",
        address: settingsData.address || "",
        office_hours: settingsData.office_hours || "",
        logo_url: settingsData.logo_url || "",
        favicon_url: settingsData.favicon_url || "",
        primary_color: settingsData.primary_color || "",
        theme_mode: settingsData.theme_mode || "dark",
        enable_custom_theme: settingsData.enable_custom_theme ?? false,
        theme_background: settingsData.theme_background || "222.2 84% 4.9%",
        theme_foreground: settingsData.theme_foreground || "210 40% 98%",
        theme_card: settingsData.theme_card || "222.2 84% 4.9%",
        theme_card_foreground: settingsData.theme_card_foreground || "210 40% 98%",
        theme_popover: settingsData.theme_popover || "222.2 84% 4.9%",
        theme_popover_foreground: settingsData.theme_popover_foreground || "210 40% 98%",
        theme_primary: settingsData.theme_primary || "210 40% 98%",
        theme_primary_foreground: settingsData.theme_primary_foreground || "222.2 47.4% 11.2%",
        theme_secondary: settingsData.theme_secondary || "217.2 32.6% 17.5%",
        theme_secondary_foreground: settingsData.theme_secondary_foreground || "210 40% 98%",
        theme_muted: settingsData.theme_muted || "217.2 32.6% 17.5%",
        theme_muted_foreground: settingsData.theme_muted_foreground || "215 20.2% 65.1%",
        theme_accent: settingsData.theme_accent || "217.2 32.6% 17.5%",
        theme_accent_foreground: settingsData.theme_accent_foreground || "210 40% 98%",
        theme_destructive: settingsData.theme_destructive || "0 62.8% 30.6%",
        theme_destructive_foreground: settingsData.theme_destructive_foreground || "210 40% 98%",
        theme_border: settingsData.theme_border || "217.2 32.6% 17.5%",
        theme_input: settingsData.theme_input || "217.2 32.6% 17.5%",
        theme_ring: settingsData.theme_ring || "212.7 26.8% 83.9%",
        theme_radius: settingsData.theme_radius || "0.5rem",
        social_facebook: settingsData.social_facebook || "",
        social_twitter: settingsData.social_twitter || "",
        social_linkedin: settingsData.social_linkedin || "",
        social_github: settingsData.social_github || "",
        social_instagram: settingsData.social_instagram || "",
        social_youtube: settingsData.social_youtube || "",
        meta_description: settingsData.meta_description || "",
        meta_keywords: settingsData.meta_keywords || "",
        default_seo_title: settingsData.default_seo_title || "",
        default_seo_description: settingsData.default_seo_description || "",
        default_seo_image: settingsData.default_seo_image || "",
        google_analytics_id: settingsData.google_analytics_id || "",
        facebook_pixel_id: settingsData.facebook_pixel_id || "",
        enable_blog: settingsData.enable_blog ?? true,
        enable_shop: settingsData.enable_shop ?? true,
        enable_newsletter: settingsData.enable_newsletter ?? true,
        smtp_host: settingsData.smtp_host || "",
        smtp_port: settingsData.smtp_port || 587,
        smtp_user: settingsData.smtp_user || "",
        smtp_from_email: settingsData.smtp_from_email || "",
        smtp_from_name: settingsData.smtp_from_name || "",
        maintenance_mode: settingsData.maintenance_mode ?? false,
        maintenance_message: settingsData.maintenance_message || "",
      });
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from('site_settings')
      .update({
        ...formData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', settings?.id);

    setSaving(false);

    if (!error) {
      // Trigger theme refresh across the app
      window.localStorage.setItem('theme-updated', Date.now().toString());
      alert('Settings saved successfully! Theme changes will apply across all pages.');
      fetchSettings();
    } else {
      alert('Error saving settings: ' + error.message);
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <>
        <PageHeader title="Site Settings" subtitle="Manage general site settings." />
        <Card className="p-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Loading settings...</span>
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader 
        title="Site Settings" 
        subtitle="Configure general site information, branding, and features" 
      />

      {/* Tabs Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === "general" ? "default" : "outline"}
            onClick={() => setActiveTab("general")}
            className="gap-2"
          >
            <Globe className="h-4 w-4" />
            General
          </Button>
          <Button
            variant={activeTab === "branding" ? "default" : "outline"}
            onClick={() => setActiveTab("branding")}
            className="gap-2"
          >
            <Palette className="h-4 w-4" />
            Branding
          </Button>
          <Button
            variant={activeTab === "theme" ? "default" : "outline"}
            onClick={() => setActiveTab("theme")}
            className="gap-2"
          >
            <Paintbrush className="h-4 w-4" />
            Theme Colors
          </Button>
          <Button
            variant={activeTab === "social" ? "default" : "outline"}
            onClick={() => setActiveTab("social")}
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            Social Media
          </Button>
          <Button
            variant={activeTab === "seo" ? "default" : "outline"}
            onClick={() => setActiveTab("seo")}
            className="gap-2"
          >
            <SettingsIcon className="h-4 w-4" />
            SEO & Analytics
          </Button>
          <Button
            variant={activeTab === "features" ? "default" : "outline"}
            onClick={() => setActiveTab("features")}
            className="gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Features
          </Button>
          <Button
            variant={activeTab === "email" ? "default" : "outline"}
            onClick={() => setActiveTab("email")}
            className="gap-2"
          >
            <Mail className="h-4 w-4" />
            Email
          </Button>
          <Button
            variant={activeTab === "maintenance" ? "default" : "outline"}
            onClick={() => setActiveTab("maintenance")}
            className="gap-2"
          >
            <Wrench className="h-4 w-4" />
            Maintenance
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        {activeTab === "general" && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">General Information</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="site_name">Site Name *</Label>
                <Input
                  id="site_name"
                  value={formData.site_name}
                  onChange={(e) => handleChange('site_name', e.target.value)}
                  placeholder="Your Company Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={formData.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  placeholder="Your company tagline"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="support_email">Support Email *</Label>
                <Input
                  id="support_email"
                  type="email"
                  value={formData.support_email}
                  onChange={(e) => handleChange('support_email', e.target.value)}
                  placeholder="support@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+880 1234-567890"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Office Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="123 Main St, City, Country"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="office_hours">Office Hours</Label>
                <Input
                  id="office_hours"
                  value={formData.office_hours}
                  onChange={(e) => handleChange('office_hours', e.target.value)}
                  placeholder="Mon-Fri: 9:00 AM - 6:00 PM"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Branding Settings */}
        {activeTab === "branding" && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Branding & Assets</h3>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input
                  id="logo_url"
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => handleChange('logo_url', e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
                <p className="text-xs text-muted-foreground">
                  URL to your company logo
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="favicon_url">Favicon URL</Label>
                <Input
                  id="favicon_url"
                  type="url"
                  value={formData.favicon_url}
                  onChange={(e) => handleChange('favicon_url', e.target.value)}
                  placeholder="https://example.com/favicon.ico"
                />
                <p className="text-xs text-muted-foreground">
                  URL to your favicon (32x32px or 16x16px)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme_mode">Theme Mode</Label>
                <select
                  id="theme_mode"
                  value={formData.theme_mode}
                  onChange={(e) => handleChange('theme_mode', e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
                <p className="text-xs text-muted-foreground">Default theme color mode</p>
              </div>
            </div>
          </Card>
        )}

        {/* Theme Colors Settings */}
        {activeTab === "theme" && (
          <div className="space-y-6">
            {/* Theme Toggle Header */}
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">Theme Presets</h3>
                </div>
                
                {/* Clean Simple Toggle Button */}
                <button
                  type="button"
                  onClick={() => handleChange('enable_custom_theme', !formData.enable_custom_theme)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    formData.enable_custom_theme ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  title={formData.enable_custom_theme ? 'Custom theme enabled' : 'Custom theme disabled'}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.enable_custom_theme ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </Card>

            {/* Theme Preset Selector */}
            <Card className={`p-4 ${!formData.enable_custom_theme ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {Object.entries(THEME_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key)}
                    disabled={!formData.enable_custom_theme}
                    className={`p-3 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                      selectedPreset === key
                        ? 'border-primary bg-primary/10 shadow-sm'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm truncate">{preset.name}</h4>
                      {preset.isPremium && (
                        <Badge variant="secondary" className="text-[10px] h-4 px-1.5">Pro</Badge>
                      )}
                    </div>
                    {preset.colors && 'theme_background' in preset.colors && (
                      <div className="flex gap-1">
                        <div className="w-5 h-5 rounded border border-border/50" style={{ backgroundColor: `hsl(${(preset.colors as any).theme_background})` }}></div>
                        <div className="w-5 h-5 rounded border border-border/50" style={{ backgroundColor: `hsl(${(preset.colors as any).theme_primary})` }}></div>
                        <div className="w-5 h-5 rounded border border-border/50" style={{ backgroundColor: `hsl(${(preset.colors as any).theme_secondary})` }}></div>
                        <div className="w-5 h-5 rounded border border-border/50" style={{ backgroundColor: `hsl(${(preset.colors as any).theme_accent})` }}></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Custom Theme Colors</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.enable_custom_theme 
                      ? 'Customize your theme colors with live preview' 
                      : 'Enable custom theme above to start customizing'}
                  </p>
                </div>
                {formData.enable_custom_theme && (
                  <Badge variant="outline" className="gap-1.5 px-3 py-1">
                    <Eye className="h-3.5 w-3.5" />
                    Live Preview
                  </Badge>
                )}
              </div>

              <div className={`space-y-6 ${!formData.enable_custom_theme ? 'opacity-40 pointer-events-none' : ''}`}>
                {/* Color Sections Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Background Colors */}
                  <div className="space-y-4 p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${formData.theme_background})` }}></div>
                      <h4 className="font-semibold text-sm">Background</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="theme_background" className="text-xs font-medium text-muted-foreground">Background</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(formData.theme_background)}
                            onChange={(e) => handleChange('theme_background', hexToHsl(e.target.value))}
                            className="h-9 w-12 rounded cursor-pointer border-2 border-input"
                            title="Pick background color"
                          />
                          <Input
                            id="theme_background"
                            value={formData.theme_background}
                            onChange={(e) => handleChange('theme_background', e.target.value)}
                            placeholder="222.2 84% 4.9%"
                            className="flex-1 h-9 text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="theme_foreground" className="text-xs font-medium text-muted-foreground">Foreground</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(formData.theme_foreground)}
                            onChange={(e) => handleChange('theme_foreground', hexToHsl(e.target.value))}
                            className="h-9 w-12 rounded cursor-pointer border-2 border-input"
                            title="Pick foreground color"
                          />
                          <Input
                            id="theme_foreground"
                            value={formData.theme_foreground}
                            onChange={(e) => handleChange('theme_foreground', e.target.value)}
                            placeholder="210 40% 98%"
                            className="flex-1 h-9 text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="space-y-4 p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${formData.theme_card})` }}></div>
                      <h4 className="font-semibold text-sm">Card</h4>
                    </div>
                    <div className="space-y-3">
                      <ColorInput label="Background" id="theme_card" value={formData.theme_card} onChange={handleChange} />
                      <ColorInput label="Foreground" id="theme_card_foreground" value={formData.theme_card_foreground} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Primary */}
                  <div className="space-y-4 p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${formData.theme_primary})` }}></div>
                      <h4 className="font-semibold text-sm">Primary</h4>
                    </div>
                    <div className="space-y-3">
                      <ColorInput label="Primary" id="theme_primary" value={formData.theme_primary} onChange={handleChange} />
                      <ColorInput label="Foreground" id="theme_primary_foreground" value={formData.theme_primary_foreground} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Secondary */}
                  <div className="space-y-4 p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${formData.theme_secondary})` }}></div>
                      <h4 className="font-semibold text-sm">Secondary</h4>
                    </div>
                    <div className="space-y-3">
                      <ColorInput label="Secondary" id="theme_secondary" value={formData.theme_secondary} onChange={handleChange} />
                      <ColorInput label="Foreground" id="theme_secondary_foreground" value={formData.theme_secondary_foreground} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Muted */}
                  <div className="space-y-4 p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${formData.theme_muted})` }}></div>
                      <h4 className="font-semibold text-sm">Muted</h4>
                    </div>
                    <div className="space-y-3">
                      <ColorInput label="Muted" id="theme_muted" value={formData.theme_muted} onChange={handleChange} />
                      <ColorInput label="Foreground" id="theme_muted_foreground" value={formData.theme_muted_foreground} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Accent */}
                  <div className="space-y-4 p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${formData.theme_accent})` }}></div>
                      <h4 className="font-semibold text-sm">Accent</h4>
                    </div>
                    <div className="space-y-3">
                      <ColorInput label="Accent" id="theme_accent" value={formData.theme_accent} onChange={handleChange} />
                      <ColorInput label="Foreground" id="theme_accent_foreground" value={formData.theme_accent_foreground} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Destructive */}
                  <div className="space-y-4 p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${formData.theme_destructive})` }}></div>
                      <h4 className="font-semibold text-sm">Destructive</h4>
                    </div>
                    <div className="space-y-3">
                      <ColorInput label="Destructive" id="theme_destructive" value={formData.theme_destructive} onChange={handleChange} />
                      <ColorInput label="Foreground" id="theme_destructive_foreground" value={formData.theme_destructive_foreground} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Border & Input */}
                  <div className="space-y-4 p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <div className="w-4 h-4 rounded border-2" style={{ borderColor: `hsl(${formData.theme_border})` }}></div>
                      <h4 className="font-semibold text-sm">UI Elements</h4>
                    </div>
                    <div className="space-y-3">
                      <ColorInput label="Border" id="theme_border" value={formData.theme_border} onChange={handleChange} />
                      <ColorInput label="Input" id="theme_input" value={formData.theme_input} onChange={handleChange} />
                      <ColorInput label="Ring" id="theme_ring" value={formData.theme_ring} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Border Radius */}
                  <div className="space-y-4 p-4 rounded-lg border bg-card lg:col-span-2">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <div className="w-4 h-4 rounded border-2 border-current"></div>
                      <h4 className="font-semibold text-sm">Border Radius</h4>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="theme_radius" className="text-xs font-medium text-muted-foreground">Radius Value</Label>
                      <Input
                        id="theme_radius"
                        value={formData.theme_radius}
                        onChange={(e) => handleChange('theme_radius', e.target.value)}
                        placeholder="0.5rem"
                        className="h-9 text-xs font-mono"
                      />
                      <p className="text-xs text-muted-foreground">CSS value (e.g., 0.5rem, 8px, 4px)</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Social Media Settings */}
        {activeTab === "social" && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Share2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Social Media Links</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="social_facebook">Facebook URL</Label>
                <Input
                  id="social_facebook"
                  type="url"
                  value={formData.social_facebook}
                  onChange={(e) => handleChange('social_facebook', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_twitter">Twitter/X URL</Label>
                <Input
                  id="social_twitter"
                  type="url"
                  value={formData.social_twitter}
                  onChange={(e) => handleChange('social_twitter', e.target.value)}
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_linkedin">LinkedIn URL</Label>
                <Input
                  id="social_linkedin"
                  type="url"
                  value={formData.social_linkedin}
                  onChange={(e) => handleChange('social_linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_github">GitHub URL</Label>
                <Input
                  id="social_github"
                  type="url"
                  value={formData.social_github}
                  onChange={(e) => handleChange('social_github', e.target.value)}
                  placeholder="https://github.com/yourorg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_instagram">Instagram URL</Label>
                <Input
                  id="social_instagram"
                  type="url"
                  value={formData.social_instagram}
                  onChange={(e) => handleChange('social_instagram', e.target.value)}
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_youtube">YouTube URL</Label>
                <Input
                  id="social_youtube"
                  type="url"
                  value={formData.social_youtube}
                  onChange={(e) => handleChange('social_youtube', e.target.value)}
                  placeholder="https://youtube.com/@yourchannel"
                />
              </div>
            </div>
          </Card>
        )}

        {/* SEO & Analytics Settings */}
        {activeTab === "seo" && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <SettingsIcon className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">SEO & Analytics</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default_seo_title">Default SEO Title</Label>
                <Input
                  id="default_seo_title"
                  value={formData.default_seo_title}
                  onChange={(e) => handleChange('default_seo_title', e.target.value)}
                  placeholder="Your Company - Best Services"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default_seo_description">Default SEO Description</Label>
                <Textarea
                  id="default_seo_description"
                  value={formData.default_seo_description}
                  onChange={(e) => handleChange('default_seo_description', e.target.value)}
                  placeholder="A brief description of your company and services..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => handleChange('meta_description', e.target.value)}
                  placeholder="Site-wide meta description..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_keywords">Meta Keywords</Label>
                <Input
                  id="meta_keywords"
                  value={formData.meta_keywords}
                  onChange={(e) => handleChange('meta_keywords', e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default_seo_image">Default SEO Image URL</Label>
                <Input
                  id="default_seo_image"
                  type="url"
                  value={formData.default_seo_image}
                  onChange={(e) => handleChange('default_seo_image', e.target.value)}
                  placeholder="https://example.com/og-image.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  Default image for social media sharing (1200x630px recommended)
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                  <Input
                    id="google_analytics_id"
                    value={formData.google_analytics_id}
                    onChange={(e) => handleChange('google_analytics_id', e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook_pixel_id">Facebook Pixel ID</Label>
                  <Input
                    id="facebook_pixel_id"
                    value={formData.facebook_pixel_id}
                    onChange={(e) => handleChange('facebook_pixel_id', e.target.value)}
                    placeholder="1234567890"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Features Settings */}
        {activeTab === "features" && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Site Features</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Blog</p>
                  <p className="text-sm text-muted-foreground">Enable blog posts and articles</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enable_blog}
                    onChange={(e) => handleChange('enable_blog', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Online Shop</p>
                  <p className="text-sm text-muted-foreground">Enable product catalog and e-commerce</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enable_shop}
                    onChange={(e) => handleChange('enable_shop', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Newsletter</p>
                  <p className="text-sm text-muted-foreground">Enable newsletter subscription forms</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enable_newsletter}
                    onChange={(e) => handleChange('enable_newsletter', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </Card>
        )}

        {/* Email Settings */}
        {activeTab === "email" && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Email Configuration (SMTP)</h3>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp_host">SMTP Host</Label>
                  <Input
                    id="smtp_host"
                    value={formData.smtp_host}
                    onChange={(e) => handleChange('smtp_host', e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp_port">SMTP Port</Label>
                  <Input
                    id="smtp_port"
                    type="number"
                    value={formData.smtp_port}
                    onChange={(e) => handleChange('smtp_port', parseInt(e.target.value))}
                    placeholder="587"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp_user">SMTP Username</Label>
                <Input
                  id="smtp_user"
                  value={formData.smtp_user}
                  onChange={(e) => handleChange('smtp_user', e.target.value)}
                  placeholder="your-email@gmail.com"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp_from_email">From Email</Label>
                  <Input
                    id="smtp_from_email"
                    type="email"
                    value={formData.smtp_from_email}
                    onChange={(e) => handleChange('smtp_from_email', e.target.value)}
                    placeholder="noreply@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp_from_name">From Name</Label>
                  <Input
                    id="smtp_from_name"
                    value={formData.smtp_from_name}
                    onChange={(e) => handleChange('smtp_from_name', e.target.value)}
                    placeholder="Your Company"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Maintenance Mode */}
        {activeTab === "maintenance" && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Maintenance Mode</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border rounded-lg bg-muted/50">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium mb-1">Enable Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    When enabled, visitors will see a maintenance message instead of your site. Admins can still access the admin panel.
                  </p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.maintenance_mode}
                      onChange={(e) => handleChange('maintenance_mode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                  </label>
                  {formData.maintenance_mode && (
                    <Badge variant="destructive" className="ml-3">Active</Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenance_message">Maintenance Message</Label>
                <Textarea
                  id="maintenance_message"
                  value={formData.maintenance_message}
                  onChange={(e) => handleChange('maintenance_message', e.target.value)}
                  placeholder="We're currently performing scheduled maintenance. We'll be back soon!"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  This message will be displayed to visitors during maintenance
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Save Actions */}
        <div className="flex items-center gap-4 sticky bottom-0 bg-background p-4 border-t">
          <Button type="submit" disabled={saving} className="gap-2">
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={fetchSettings}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </form>
    </>
  );
}
