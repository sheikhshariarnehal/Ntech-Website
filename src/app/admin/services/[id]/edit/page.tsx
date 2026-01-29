"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminPageHeader } from "@/components/layout/admin-page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { ArrowLeft } from "lucide-react";

type Service = Database['public']['Tables']['services']['Row'];

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id as string;
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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

  useEffect(() => {
    fetchService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  const fetchService = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", serviceId)
      .single();

    if (!error && data) {
      const service = data as Service;
      setFormData({
        name: service.name || "",
        slug: service.slug || "",
        short_description: service.short_description || "",
        full_description: service.full_description || "",
        starting_price: service.starting_price?.toString() || "",
        icon: service.icon || "",
        is_active: service.is_active ?? true,
        seo_title: service.seo_title || "",
        seo_description: service.seo_description || "",
        seo_keywords: Array.isArray(service.seo_keywords) ? service.seo_keywords.join(', ') : "",
      });
    }
    setFetching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updateData: Database['public']['Tables']['services']['Update'] = {
      name: formData.name,
      slug: formData.slug,
      short_description: formData.short_description,
      full_description: formData.full_description,
      starting_price: formData.starting_price ? parseFloat(formData.starting_price) : null,
      icon: formData.icon || null,
      is_active: formData.is_active,
      seo_title: formData.seo_title || null,
      seo_description: formData.seo_description || null,
      seo_keywords: formData.seo_keywords ? formData.seo_keywords.split(',').map(k => k.trim()).filter(k => k) : null,
    };

    const { error } = await supabase
      .from("services")
      .update(updateData)
      .eq("id", serviceId);

    setLoading(false);

    if (!error) {
      router.push("/admin/services");
    } else {
      alert("Error updating service: " + error.message);
    }
  };

  if (fetching) {
    return (
      <>
        <div className="flex items-center justify-between mb-6 gap-4">
          <AdminPageHeader title="Edit Service" subtitle="Loading..." />
          <Button variant="outline" onClick={() => router.push("/admin/services")} className="gap-2 flex-shrink-0">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Services</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading service data...</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6 gap-4">
        <AdminPageHeader title="Edit Service" subtitle="Update service information." />
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
                <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Web Development"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="web-development"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Short Description *</Label>
              <Textarea
                id="short_description"
                required
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="Brief description for listings..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_description">Full Description</Label>
              <Textarea
                id="full_description"
                value={formData.full_description || ""}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                placeholder="Detailed description of the service..."
                rows={8}
              />
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
                {loading ? "Updating..." : "Update Service"}
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
