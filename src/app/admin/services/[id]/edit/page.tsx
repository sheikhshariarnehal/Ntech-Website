"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
    delivery_time: "",
    is_active: true,
    is_featured: false,
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
  });

  useEffect(() => {
    fetchService();
  }, [serviceId]);

  const fetchService = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", serviceId)
      .single();

    if (!error && data) {
      setFormData({
        name: data.name || "",
        slug: data.slug || "",
        short_description: data.short_description || "",
        full_description: data.full_description || "",
        starting_price: data.starting_price?.toString() || "",
        delivery_time: data.delivery_time || "",
        is_active: data.is_active ?? true,
        is_featured: data.is_featured ?? false,
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        seo_keywords: data.seo_keywords || "",
      });
    }
    setFetching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("services")
      .update({
        name: formData.name,
        slug: formData.slug,
        short_description: formData.short_description,
        full_description: formData.full_description,
        starting_price: formData.starting_price ? parseFloat(formData.starting_price) : null,
        delivery_time: formData.delivery_time || null,
        is_active: formData.is_active,
        is_featured: formData.is_featured,
        seo_title: formData.seo_title || null,
        seo_description: formData.seo_description || null,
        seo_keywords: formData.seo_keywords || null,
      })
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
        <PageHeader title="Edit Service" subtitle="Loading..." />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading service data...</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/services">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <PageHeader title="Edit Service" subtitle="Update service information." />
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

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
                rows={6}
              />
            </div>
          </div>

          {/* Pricing & Delivery */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pricing & Delivery</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="starting_price">Starting Price ($)</Label>
                <Input
                  id="starting_price"
                  type="number"
                  step="0.01"
                  value={formData.starting_price}
                  onChange={(e) => setFormData({ ...formData, starting_price: e.target.value })}
                  placeholder="999.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery_time">Delivery Time</Label>
                <Input
                  id="delivery_time"
                  value={formData.delivery_time || ""}
                  onChange={(e) => setFormData({ ...formData, delivery_time: e.target.value })}
                  placeholder="e.g., 2-4 weeks"
                />
              </div>
            </div>
          </div>

          {/* Status Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Status</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="is_active">Visibility</Label>
                <Select
                  id="is_active"
                  value={formData.is_active ? "true" : "false"}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.value === "true" })}
                >
                  <option value="true">Active (Visible)</option>
                  <option value="false">Inactive (Hidden)</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="is_featured">Featured</Label>
                <Select
                  id="is_featured"
                  value={formData.is_featured ? "true" : "false"}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.value === "true" })}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Select>
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">SEO Settings</h3>

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
              <Label htmlFor="seo_keywords">SEO Keywords</Label>
              <Input
                id="seo_keywords"
                value={formData.seo_keywords}
                onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Service"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/services">Cancel</Link>
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}
