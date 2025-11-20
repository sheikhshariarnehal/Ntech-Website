"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";

export default function SEOPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [formData, setFormData] = useState({
    default_seo_title: "",
    default_seo_description: "",
    default_og_image_url: "",
    robots_noindex: false,
    organization_name: "",
    organization_logo_url: "",
    organization_contact_email: "",
    organization_url: "",
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
      const seoData = data as any; // site_settings table type not in generated types
      setSettings(seoData);
      setFormData({
        default_seo_title: seoData.default_seo_title || "",
        default_seo_description: seoData.default_seo_description || "",
        default_og_image_url: seoData.default_og_image_url || "",
        robots_noindex: seoData.robots_noindex || false,
        organization_name: seoData.organization_name || "",
        organization_logo_url: seoData.organization_logo_url || "",
        organization_contact_email: seoData.organization_contact_email || "",
        organization_url: seoData.organization_url || "",
        social_facebook: seoData.social_facebook || "",
        social_twitter: seoData.social_twitter || "",
        social_linkedin: seoData.social_linkedin || "",
        social_github: seoData.social_github || "",
      });
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from('site_settings')
      // @ts-expect-error - site_settings table type not in generated types
      .update({
        default_seo_title: formData.default_seo_title || null,
        default_seo_description: formData.default_seo_description || null,
        default_og_image_url: formData.default_og_image_url || null,
        robots_noindex: formData.robots_noindex,
        organization_name: formData.organization_name || null,
        organization_logo_url: formData.organization_logo_url || null,
        organization_contact_email: formData.organization_contact_email || null,
        organization_url: formData.organization_url || null,
        social_facebook: formData.social_facebook || null,
        social_twitter: formData.social_twitter || null,
        social_linkedin: formData.social_linkedin || null,
        social_github: formData.social_github || null,
      })
      .eq('id', settings?.id);

    setSaving(false);

    if (!error) {
      alert('SEO settings saved successfully!');
    } else {
      alert('Error saving settings: ' + error.message);
    }
  }

  if (loading) {
    return (
      <>
        <PageHeader title="SEO Settings" subtitle="Manage your site's SEO." />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader 
        title="SEO Settings" 
        subtitle="Configure global SEO defaults and schema" 
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Default SEO */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Default SEO Settings</h3>
          <p className="text-sm text-muted-foreground">
            These defaults are used when specific pages don't have their own SEO data.
          </p>

          <div className="space-y-2">
            <Label htmlFor="default_seo_title">Default SEO Title</Label>
            <Input
              id="default_seo_title"
              value={formData.default_seo_title}
              onChange={(e) => setFormData({ ...formData, default_seo_title: e.target.value })}
              placeholder="Your Site Name - Tagline"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="default_seo_description">Default SEO Description</Label>
            <Textarea
              id="default_seo_description"
              value={formData.default_seo_description}
              onChange={(e) => setFormData({ ...formData, default_seo_description: e.target.value })}
              placeholder="Default description for search engines..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="default_og_image_url">Default OG Image URL</Label>
            <Input
              id="default_og_image_url"
              type="url"
              value={formData.default_og_image_url}
              onChange={(e) => setFormData({ ...formData, default_og_image_url: e.target.value })}
              placeholder="https://example.com/og-image.jpg"
            />
            <p className="text-xs text-muted-foreground">
              Default image for social media shares (1200x630px recommended)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="robots_noindex">Search Engine Indexing</Label>
            <Select
              id="robots_noindex"
              value={formData.robots_noindex ? "true" : "false"}
              onChange={(e) => setFormData({ ...formData, robots_noindex: e.target.value === "true" })}
            >
              <option value="false">Allow Indexing (Production)</option>
              <option value="true">Disable Indexing (Staging/Dev)</option>
            </Select>
            <p className="text-xs text-muted-foreground">
              Set to "Disable" for staging environments to prevent search engine indexing
            </p>
          </div>
        </Card>

        {/* Organization Schema */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Organization Schema</h3>
          <p className="text-sm text-muted-foreground">
            Structured data for search engines (Schema.org)
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="organization_name">Company Name</Label>
              <Input
                id="organization_name"
                value={formData.organization_name}
                onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
                placeholder="Your Company Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization_contact_email">Contact Email</Label>
              <Input
                id="organization_contact_email"
                type="email"
                value={formData.organization_contact_email}
                onChange={(e) => setFormData({ ...formData, organization_contact_email: e.target.value })}
                placeholder="contact@example.com"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="organization_url">Company Website URL</Label>
              <Input
                id="organization_url"
                type="url"
                value={formData.organization_url}
                onChange={(e) => setFormData({ ...formData, organization_url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="organization_logo_url">Company Logo URL</Label>
              <Input
                id="organization_logo_url"
                type="url"
                value={formData.organization_logo_url}
                onChange={(e) => setFormData({ ...formData, organization_logo_url: e.target.value })}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>
        </Card>

        {/* Social Profiles */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Social Media Profiles</h3>
          <p className="text-sm text-muted-foreground">
            Links to your social media profiles for schema markup
          </p>

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
            {saving ? "Saving..." : "Save SEO Settings"}
          </Button>
        </div>
      </form>
    </>
  );
}
