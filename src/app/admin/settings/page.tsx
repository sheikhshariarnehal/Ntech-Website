"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [formData, setFormData] = useState({
    site_name: "",
    tagline: "",
    support_email: "",
    primary_color: "",
    logo_url: "",
    favicon_url: "",
    social_facebook: "",
    social_twitter: "",
    social_linkedin: "",
    social_github: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

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
        primary_color: data.primary_color || "",
        logo_url: data.logo_url || "",
        favicon_url: data.favicon_url || "",
        social_facebook: data.social_facebook || "",
        social_twitter: data.social_twitter || "",
        social_linkedin: data.social_linkedin || "",
        social_github: data.social_github || "",
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
        site_name: formData.site_name || null,
        tagline: formData.tagline || null,
        support_email: formData.support_email || null,
        primary_color: formData.primary_color || null,
        logo_url: formData.logo_url || null,
        favicon_url: formData.favicon_url || null,
        social_facebook: formData.social_facebook || null,
        social_twitter: formData.social_twitter || null,
        social_linkedin: formData.social_linkedin || null,
        social_github: formData.social_github || null,
      })
      .eq('id', settings?.id);

    setSaving(false);

    if (!error) {
      alert('Settings saved successfully!');
    } else {
      alert('Error saving settings: ' + error.message);
    }
  }

  if (loading) {
    return (
      <>
        <PageHeader title="Site Settings" subtitle="Manage general site settings." />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader 
        title="Site Settings" 
        subtitle="Configure general site information and branding" 
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">General Information</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="site_name">Site Name</Label>
              <Input
                id="site_name"
                value={formData.site_name}
                onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                placeholder="Your Company Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="Your company tagline"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support_email">Support Email</Label>
              <Input
                id="support_email"
                type="email"
                value={formData.support_email}
                onChange={(e) => setFormData({ ...formData, support_email: e.target.value })}
                placeholder="support@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="primary_color">Primary Brand Color</Label>
              <Input
                id="primary_color"
                value={formData.primary_color}
                onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                placeholder="#3b82f6"
              />
              <p className="text-xs text-muted-foreground">Hex color code for theme</p>
            </div>
          </div>
        </Card>

        {/* Branding Assets */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Branding Assets</h3>

          <div className="space-y-2">
            <Label htmlFor="logo_url">Logo URL</Label>
            <Input
              id="logo_url"
              type="url"
              value={formData.logo_url}
              onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, favicon_url: e.target.value })}
              placeholder="https://example.com/favicon.ico"
            />
            <p className="text-xs text-muted-foreground">
              URL to your favicon (32x32px or 16x16px)
            </p>
          </div>
        </Card>

        {/* Social Links */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Social Media Links</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="social_facebook">Facebook URL</Label>
              <Input
                id="social_facebook"
                type="url"
                value={formData.social_facebook}
                onChange={(e) => setFormData({ ...formData, social_facebook: e.target.value })}
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="social_twitter">Twitter/X URL</Label>
              <Input
                id="social_twitter"
                type="url"
                value={formData.social_twitter}
                onChange={(e) => setFormData({ ...formData, social_twitter: e.target.value })}
                placeholder="https://twitter.com/yourhandle"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="social_linkedin">LinkedIn URL</Label>
              <Input
                id="social_linkedin"
                type="url"
                value={formData.social_linkedin}
                onChange={(e) => setFormData({ ...formData, social_linkedin: e.target.value })}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="social_github">GitHub URL</Label>
              <Input
                id="social_github"
                type="url"
                value={formData.social_github}
                onChange={(e) => setFormData({ ...formData, social_github: e.target.value })}
                placeholder="https://github.com/yourorg"
              />
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </>
  );
}
