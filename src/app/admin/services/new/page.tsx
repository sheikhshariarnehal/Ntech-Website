"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewServicePage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    short_description: "",
    full_description: "",
    starting_price: "",
    icon: "",
    is_active: true,
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
      seo_title: formData.seo_title || name,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const insertData: Database['public']['Tables']['services']['Insert'] = {
      name: formData.name,
      slug: formData.slug,
      short_description: formData.short_description,
      full_description: formData.full_description,
      starting_price: formData.starting_price ? parseFloat(formData.starting_price) : null,
      icon: formData.icon || null,
      is_active: formData.is_active,
      seo_title: formData.seo_title || null,
      seo_description: formData.seo_description || null,
      seo_keywords: formData.seo_keywords ? formData.seo_keywords.split(',').map(k => k.trim()) : null,
    };

    const { error } = await (supabase as any).from("services").insert([insertData]);

    setLoading(false);

    if (!error) {
      router.push("/admin/services");
    } else {
      alert("Error creating service: " + error.message);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/services">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <PageHeader title="Add New Service" subtitle="Create a new service offering." />
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <p className="text-sm text-muted-foreground">Core service details and identification</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Service Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Web Development"
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground">This will be displayed to customers</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-sm font-medium">
                  URL Slug <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="slug"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="web-development"
                  className="transition-all focus:ring-2 focus:ring-primary font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">Used in service URL</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description" className="text-sm font-medium">
                Short Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="short_description"
                required
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="Brief description for listings and previews..."
                rows={3}
                className="transition-all focus:ring-2 focus:ring-primary resize-none"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Appears in service listings</span>
                <span>{formData.short_description.length} characters</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_description" className="text-sm font-medium">
                Full Description
              </Label>
              <Textarea
                id="full_description"
                value={formData.full_description || ""}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                placeholder="Detailed description with features, benefits, and what's included..."
                rows={6}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground">Detailed information shown on service page</p>
            </div>
          </Card>

          {/* Pricing & Appearance */}
          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Pricing & Appearance</h3>
                <p className="text-sm text-muted-foreground">Set pricing and service icon</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="starting_price" className="text-sm font-medium">
                  Starting Price ($)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="starting_price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.starting_price}
                    onChange={(e) => setFormData({ ...formData, starting_price: e.target.value })}
                    placeholder="999.00"
                    className="pl-7 transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Leave empty for custom quotes</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon" className="text-sm font-medium">
                  Icon URL
                </Label>
                <Input
                  id="icon"
                  type="url"
                  value={formData.icon || ""}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="https://example.com/icon.svg"
                  className="transition-all focus:ring-2 focus:ring-primary font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">Service icon or image URL</p>
              </div>
            </div>
          </Card>

          {/* Status Options */}
          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Service Status</h3>
                <p className="text-sm text-muted-foreground">Control visibility and featuring</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="is_active" className="text-sm font-medium">
                Visibility Status
              </Label>
              <Select
                id="is_active"
                value={formData.is_active ? "true" : "false"}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.value === "true" })}
                className="transition-all focus:ring-2 focus:ring-primary"
              >
                <option value="true">✓ Active (Visible to customers)</option>
                <option value="false">✗ Inactive (Hidden from site)</option>
              </Select>
              <p className="text-xs text-muted-foreground">
                {formData.is_active ? "Service is live and visible" : "Service is hidden from customers"}
              </p>
            </div>
          </Card>

          {/* SEO Settings */}
          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">SEO Settings</h3>
                <p className="text-sm text-muted-foreground">Optimize for search engines</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo_title" className="text-sm font-medium">
                  SEO Title
                </Label>
                <Input
                  id="seo_title"
                  value={formData.seo_title}
                  onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                  placeholder="Title for search engines (leave empty to use service name)"
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Recommended: 50-60 characters</span>
                  <span>{formData.seo_title.length}/60</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo_description" className="text-sm font-medium">
                  SEO Meta Description
                </Label>
                <Textarea
                  id="seo_description"
                  value={formData.seo_description}
                  onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                  placeholder="Description for search engines and social media..."
                  rows={3}
                  className="transition-all focus:ring-2 focus:ring-primary resize-none"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Recommended: 150-160 characters</span>
                  <span>{formData.seo_description.length}/160</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo_keywords" className="text-sm font-medium">
                  SEO Keywords
                </Label>
                <Input
                  id="seo_keywords"
                  value={formData.seo_keywords}
                  onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground">
                  Comma-separated keywords for search optimization
                </p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6 border-t sticky bottom-0 bg-background py-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="min-w-[140px] shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Service"
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              asChild
              className="min-w-[140px]"
            >
              <Link href="/admin/services">Cancel</Link>
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}
