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
    features: "",
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
      features: formData.features ? formData.features.split(',').map(f => f.trim()).filter(f => f) : null,
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
      <div className="flex items-center justify-between mb-6 gap-4">
        <PageHeader title="Add New Service" subtitle="Create a new service offering." />
        <Button variant="outline" onClick={() => router.push("/admin/services")} className="gap-2 flex-shrink-0">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Services</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Fields */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            {/* Basic Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              
              <div className="space-y-4">

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Service Name *
                </Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Web Development"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">
                  URL Slug *
                </Label>
                <Input
                  id="slug"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="web-development"
                  className="font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">
                Short Description *
              </Label>
              <Textarea
                id="short_description"
                required
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="Brief description for listings and previews..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_description">
                Full Description
              </Label>
              <Textarea
                id="full_description"
                value={formData.full_description || ""}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                placeholder="Detailed description with features, benefits, and what's included..."
                rows={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">
                Features (comma separated)
              </Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Custom Chatbots, Workflow Automation, Data Analysis, AI Integration"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">Enter features separated by commas. These will appear as bullet points on the service card.</p>
            </div>
          </div>
        </Card>

        {/* SEO Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seo_title">SEO Title</Label>
              <Input
                id="seo_title"
                value={formData.seo_title}
                onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                placeholder="Title for search engines"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seo_description">SEO Description</Label>
              <Textarea
                id="seo_description"
                value={formData.seo_description}
                onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                placeholder="Description for search engines..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seo_keywords">SEO Keywords (comma separated)</Label>
              <Input
                id="seo_keywords"
                value={formData.seo_keywords}
                onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column - Sidebar */}
      <div className="space-y-6 order-1 lg:order-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Publishing</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 cursor-pointer"
              />
              <Label htmlFor="is_active" className="cursor-pointer font-medium">
                Active (visible to customers)
              </Label>
            </div>

            <div className="pt-4 space-y-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? "Creating..." : "Create Service"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/services")}
                disabled={loading}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Pricing & Icon</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="starting_price">Starting Price (৳ BDT)</Label>
              <Input
                id="starting_price"
                type="number"
                step="1"
                min="0"
                value={formData.starting_price}
                onChange={(e) => setFormData({ ...formData, starting_price: e.target.value })}
                placeholder="50000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon URL</Label>
              <Input
                id="icon"
                type="url"
                value={formData.icon || ""}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="https://example.com/icon.svg"
                className="font-mono text-sm"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  </form>
    </>
  );
}
