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
    name: "Default Dark",
    description: "Professional dark theme",
    isPremium: false,
    colors: {
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
  }
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
      setSettings(data);
      setFormData({
        site_name: data.site_name || "",
        tagline: data.tagline || "",
        support_email: data.support_email || "",
        phone: data.phone || "",
        address: data.address || "",
        office_hours: data.office_hours || "",
        logo_url: data.logo_url || "",
        favicon_url: data.favicon_url || "",
        primary_color: data.primary_color || "",
        theme_mode: data.theme_mode || "dark",
        theme_background: data.theme_background || "222.2 84% 4.9%",
        theme_foreground: data.theme_foreground || "210 40% 98%",
        theme_card: data.theme_card || "222.2 84% 4.9%",
        theme_card_foreground: data.theme_card_foreground || "210 40% 98%",
        theme_popover: data.theme_popover || "222.2 84% 4.9%",
        theme_popover_foreground: data.theme_popover_foreground || "210 40% 98%",
        theme_primary: data.theme_primary || "210 40% 98%",
        theme_primary_foreground: data.theme_primary_foreground || "222.2 47.4% 11.2%",
        theme_secondary: data.theme_secondary || "217.2 32.6% 17.5%",
        theme_secondary_foreground: data.theme_secondary_foreground || "210 40% 98%",
        theme_muted: data.theme_muted || "217.2 32.6% 17.5%",
        theme_muted_foreground: data.theme_muted_foreground || "215 20.2% 65.1%",
        theme_accent: data.theme_accent || "217.2 32.6% 17.5%",
        theme_accent_foreground: data.theme_accent_foreground || "210 40% 98%",
        theme_destructive: data.theme_destructive || "0 62.8% 30.6%",
        theme_destructive_foreground: data.theme_destructive_foreground || "210 40% 98%",
        theme_border: data.theme_border || "217.2 32.6% 17.5%",
        theme_input: data.theme_input || "217.2 32.6% 17.5%",
        theme_ring: data.theme_ring || "212.7 26.8% 83.9%",
        theme_radius: data.theme_radius || "0.5rem",
        social_facebook: data.social_facebook || "",
        social_twitter: data.social_twitter || "",
        social_linkedin: data.social_linkedin || "",
        social_github: data.social_github || "",
        social_instagram: data.social_instagram || "",
        social_youtube: data.social_youtube || "",
        meta_description: data.meta_description || "",
        meta_keywords: data.meta_keywords || "",
        default_seo_title: data.default_seo_title || "",
        default_seo_description: data.default_seo_description || "",
        default_seo_image: data.default_seo_image || "",
        google_analytics_id: data.google_analytics_id || "",
        facebook_pixel_id: data.facebook_pixel_id || "",
        enable_blog: data.enable_blog ?? true,
        enable_shop: data.enable_shop ?? true,
        enable_newsletter: data.enable_newsletter ?? true,
        smtp_host: data.smtp_host || "",
        smtp_port: data.smtp_port || 587,
        smtp_user: data.smtp_user || "",
        smtp_from_email: data.smtp_from_email || "",
        smtp_from_name: data.smtp_from_name || "",
        maintenance_mode: data.maintenance_mode ?? false,
        maintenance_message: data.maintenance_message || "",
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
            {/* Theme Preset Selector */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Choose Theme Preset</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Object.entries(THEME_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedPreset === key
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{preset.name}</h4>
                      {preset.isPremium && (
                        <Badge variant="secondary" className="text-xs">Premium</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{preset.description}</p>
                    {preset.colors && (
                      <div className="flex gap-1">
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: `hsl(${preset.colors.theme_background})` }}></div>
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: `hsl(${preset.colors.theme_primary})` }}></div>
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: `hsl(${preset.colors.theme_secondary})` }}></div>
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: `hsl(${preset.colors.theme_accent})` }}></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Paintbrush className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Custom Theme Colors</h3>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <Eye className="h-3 w-3" />
                  Live Preview
                </Badge>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg mb-4">
                <p className="text-sm text-muted-foreground">
                  {selectedPreset === 'custom' 
                    ? 'Create your custom theme by editing the color values below. Use HSL format like "210 40% 98%".'
                    : `You're using the "${THEME_PRESETS[selectedPreset as keyof typeof THEME_PRESETS].name}" preset. You can further customize these colors below.`
                  }
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Background Colors */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(${formData.theme_background})` }}></div>
                    Background Colors
                  </h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme_background">Background</Label>
                    <Input
                      id="theme_background"
                      value={formData.theme_background}
                      onChange={(e) => handleChange('theme_background', e.target.value)}
                      placeholder="222.2 84% 4.9%"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme_foreground">Foreground</Label>
                    <Input
                      id="theme_foreground"
                      value={formData.theme_foreground}
                      onChange={(e) => handleChange('theme_foreground', e.target.value)}
                      placeholder="210 40% 98%"
                    />
                  </div>
                </div>

                {/* Card Colors */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(${formData.theme_card})` }}></div>
                    Card Colors
                  </h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme_card">Card Background</Label>
                    <Input
                      id="theme_card"
                      value={formData.theme_card}
                      onChange={(e) => handleChange('theme_card', e.target.value)}
                      placeholder="222.2 84% 4.9%"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme_card_foreground">Card Foreground</Label>
                    <Input
                      id="theme_card_foreground"
                      value={formData.theme_card_foreground}
                      onChange={(e) => handleChange('theme_card_foreground', e.target.value)}
                      placeholder="210 40% 98%"
                    />
                  </div>
                </div>

                {/* Primary Colors */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(${formData.theme_primary})` }}></div>
                    Primary Colors
                  </h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme_primary">Primary</Label>
                    <Input
                      id="theme_primary"
                      value={formData.theme_primary}
                      onChange={(e) => handleChange('theme_primary', e.target.value)}
                      placeholder="210 40% 98%"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme_primary_foreground">Primary Foreground</Label>
                    <Input
                      id="theme_primary_foreground"
                      value={formData.theme_primary_foreground}
                      onChange={(e) => handleChange('theme_primary_foreground', e.target.value)}
                      placeholder="222.2 47.4% 11.2%"
                    />
                  </div>
                </div>

                {/* Secondary Colors */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(${formData.theme_secondary})` }}></div>
                    Secondary Colors
                  </h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme_secondary">Secondary</Label>
                    <Input
                      id="theme_secondary"
                      value={formData.theme_secondary}
                      onChange={(e) => handleChange('theme_secondary', e.target.value)}
                      placeholder="217.2 32.6% 17.5%"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme_secondary_foreground">Secondary Foreground</Label>
                    <Input
                      id="theme_secondary_foreground"
                      value={formData.theme_secondary_foreground}
                      onChange={(e) => handleChange('theme_secondary_foreground', e.target.value)}
                      placeholder="210 40% 98%"
                    />
                  </div>
                </div>

                {/* Muted Colors */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(${formData.theme_muted})` }}></div>
                    Muted Colors
                  </h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme_muted">Muted</Label>
                    <Input
                      id="theme_muted"
                      value={formData.theme_muted}
                      onChange={(e) => handleChange('theme_muted', e.target.value)}
                      placeholder="217.2 32.6% 17.5%"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme_muted_foreground">Muted Foreground</Label>
                    <Input
                      id="theme_muted_foreground"
                      value={formData.theme_muted_foreground}
                      onChange={(e) => handleChange('theme_muted_foreground', e.target.value)}
                      placeholder="215 20.2% 65.1%"
                    />
                  </div>
                </div>

                {/* Accent Colors */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(${formData.theme_accent})` }}></div>
                    Accent Colors
                  </h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme_accent">Accent</Label>
                    <Input
                      id="theme_accent"
                      value={formData.theme_accent}
                      onChange={(e) => handleChange('theme_accent', e.target.value)}
                      placeholder="217.2 32.6% 17.5%"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme_accent_foreground">Accent Foreground</Label>
                    <Input
                      id="theme_accent_foreground"
                      value={formData.theme_accent_foreground}
                      onChange={(e) => handleChange('theme_accent_foreground', e.target.value)}
                      placeholder="210 40% 98%"
                    />
                  </div>
                </div>

                {/* Destructive Colors */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(${formData.theme_destructive})` }}></div>
                    Destructive Colors
                  </h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme_destructive">Destructive</Label>
                    <Input
                      id="theme_destructive"
                      value={formData.theme_destructive}
                      onChange={(e) => handleChange('theme_destructive', e.target.value)}
                      placeholder="0 62.8% 30.6%"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme_destructive_foreground">Destructive Foreground</Label>
                    <Input
                      id="theme_destructive_foreground"
                      value={formData.theme_destructive_foreground}
                      onChange={(e) => handleChange('theme_destructive_foreground', e.target.value)}
                      placeholder="210 40% 98%"
                    />
                  </div>
                </div>

                {/* Border & Input Colors */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: `hsl(${formData.theme_border})` }}></div>
                    Border & Input
                  </h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme_border">Border</Label>
                    <Input
                      id="theme_border"
                      value={formData.theme_border}
                      onChange={(e) => handleChange('theme_border', e.target.value)}
                      placeholder="217.2 32.6% 17.5%"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme_input">Input</Label>
                    <Input
                      id="theme_input"
                      value={formData.theme_input}
                      onChange={(e) => handleChange('theme_input', e.target.value)}
                      placeholder="217.2 32.6% 17.5%"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme_ring">Ring (Focus)</Label>
                    <Input
                      id="theme_ring"
                      value={formData.theme_ring}
                      onChange={(e) => handleChange('theme_ring', e.target.value)}
                      placeholder="212.7 26.8% 83.9%"
                    />
                  </div>
                </div>

                {/* Border Radius */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Border Radius</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme_radius">Radius</Label>
                    <Input
                      id="theme_radius"
                      value={formData.theme_radius}
                      onChange={(e) => handleChange('theme_radius', e.target.value)}
                      placeholder="0.5rem"
                    />
                    <p className="text-xs text-muted-foreground">
                      CSS value like "0.5rem" or "8px"
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Preview Card */}
            <Card className="p-6">
              <h4 className="font-semibold mb-4">Live Preview</h4>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button>Primary Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <Card className="p-4">
                  <p className="text-muted-foreground">This is a preview card with muted text</p>
                </Card>
                <Input placeholder="Input field preview" />
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
