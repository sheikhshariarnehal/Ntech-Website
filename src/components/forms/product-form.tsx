"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface ProductFormData {
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  price: string;
  billing_interval: string;
  stock: string;
  is_active: boolean;
  is_featured: boolean;
  download_url: string;
  thumbnail_url: string;
  demo_url: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
}

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  submitLabel: string;
  loading: boolean;
}

export function ProductForm({ initialData, onSubmit, submitLabel, loading }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    short_description: initialData?.short_description || "",
    full_description: initialData?.full_description || "",
    price: initialData?.price || "",
    billing_interval: initialData?.billing_interval || "one_time",
    stock: initialData?.stock || "",
    is_active: initialData?.is_active ?? true,
    is_featured: initialData?.is_featured ?? false,
    download_url: initialData?.download_url || "",
    thumbnail_url: initialData?.thumbnail_url || "",
    demo_url: initialData?.demo_url || "",
    seo_title: initialData?.seo_title || "",
    seo_description: initialData?.seo_description || "",
    seo_keywords: initialData?.seo_keywords || "",
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
      slug: !initialData?.slug ? generateSlug(name) : formData.slug,
      seo_title: !initialData?.seo_title ? name : formData.seo_title,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., Premium Website Template"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>
            <Input
              id="slug"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="premium-website-template"
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
            value={formData.full_description}
            onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
            placeholder="Detailed product description..."
            rows={6}
          />
        </div>
      </Card>

      {/* Pricing & Inventory */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Pricing & Inventory</h3>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="99.99"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="billing_interval">Billing Type *</Label>
            <Select
              id="billing_interval"
              value={formData.billing_interval}
              onChange={(e) => setFormData({ ...formData, billing_interval: e.target.value })}
            >
              <option value="one_time">One Time</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="lifetime">Lifetime</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              placeholder="Leave empty for unlimited"
            />
          </div>
        </div>
      </Card>

      {/* Digital Assets */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Digital Assets</h3>

        <div className="space-y-2">
          <Label htmlFor="download_url">Download URL</Label>
          <Input
            id="download_url"
            type="url"
            value={formData.download_url}
            onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
            placeholder="https://example.com/download/product.zip"
          />
          <p className="text-xs text-muted-foreground">
            Direct link to the downloadable file
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
          <Input
            id="thumbnail_url"
            type="url"
            value={formData.thumbnail_url}
            onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
            placeholder="https://example.com/images/product-thumbnail.jpg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo_url">Demo URL</Label>
          <Input
            id="demo_url"
            type="url"
            value={formData.demo_url}
            onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
            placeholder="https://demo.example.com"
          />
        </div>
      </Card>

      {/* Status Options */}
      <Card className="p-6 space-y-4">
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
      </Card>

      {/* SEO Settings */}
      <Card className="p-6 space-y-4">
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
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/products">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
