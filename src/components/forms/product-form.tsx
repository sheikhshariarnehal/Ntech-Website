"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, Image as ImageIcon } from "lucide-react";
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
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, WebP, or GIF)');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, thumbnail_url: publicUrl });
      setUploadProgress(100);
    } catch (error: any) {
      console.error('Upload error:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const removeImage = async () => {
    if (formData.thumbnail_url) {
      // Extract file path from URL
      try {
        const url = new URL(formData.thumbnail_url);
        const pathParts = url.pathname.split('/product-images/');
        if (pathParts.length > 1) {
          const filePath = pathParts[1];
          await supabase.storage.from('product-images').remove([filePath]);
        }
      } catch (error) {
        console.error('Error removing image:', error);
      }
    }
    setFormData({ ...formData, thumbnail_url: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
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
            <p className="text-sm text-muted-foreground">Core product details and identification</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Product Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., Premium Website Template"
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
              placeholder="premium-website-template"
              className="transition-all focus:ring-2 focus:ring-primary font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">Used in product URL</p>
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
            <span>Appears in product listings</span>
            <span>{formData.short_description.length} characters</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="full_description" className="text-sm font-medium">
            Full Description
          </Label>
          <Textarea
            id="full_description"
            value={formData.full_description}
            onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
            placeholder="Detailed product description with features, benefits, and specifications..."
            rows={6}
            className="transition-all focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground">Detailed information shown on product page</p>
        </div>
      </Card>

      {/* Pricing & Inventory */}
      <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Pricing & Inventory</h3>
            <p className="text-sm text-muted-foreground">Set pricing and manage stock levels</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Price ($) <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="99.99"
                className="pl-7 transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="billing_interval" className="text-sm font-medium">
              Billing Type <span className="text-destructive">*</span>
            </Label>
            <Select
              id="billing_interval"
              value={formData.billing_interval}
              onChange={(e) => setFormData({ ...formData, billing_interval: e.target.value })}
              className="transition-all focus:ring-2 focus:ring-primary"
            >
              <option value="one_time">One Time Purchase</option>
              <option value="monthly">Monthly Subscription</option>
              <option value="yearly">Yearly Subscription</option>
              <option value="lifetime">Lifetime Access</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock" className="text-sm font-medium">
              Stock Quantity
            </Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              placeholder="Unlimited"
              className="transition-all focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground">Leave empty for unlimited</p>
          </div>
        </div>
      </Card>

      {/* Digital Assets */}
      <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Digital Assets</h3>
            <p className="text-sm text-muted-foreground">Upload files and media for your product</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="download_url" className="text-sm font-medium">
              Download URL
            </Label>
            <Input
              id="download_url"
              type="url"
              value={formData.download_url}
              onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
              placeholder="https://example.com/download/product.zip"
              className="transition-all focus:ring-2 focus:ring-primary font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Direct link to the downloadable file (protected by authentication)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail_upload" className="text-sm font-medium">
              Product Thumbnail
            </Label>
            
            {!formData.thumbnail_url ? (
              <div className="border-2 border-dashed rounded-lg p-6 hover:border-primary transition-colors">
                <input
                  id="thumbnail_upload"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <label
                  htmlFor="thumbnail_upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    {uploading ? (
                      <svg className="animate-spin h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <Upload className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    {uploading ? 'Uploading...' : 'Click to upload image'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, WebP or GIF (max 5MB)
                  </p>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-full mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            ) : (
              <div className="relative group">
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src={formData.thumbnail_url}
                    alt="Product thumbnail"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <ImageIcon className="h-4 w-4" />
                  <span className="truncate">{formData.thumbnail_url}</span>
                </div>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground">
              Main product image (recommended: 800x600px)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo_url" className="text-sm font-medium">
              Live Demo URL
            </Label>
            <Input
              id="demo_url"
              type="url"
              value={formData.demo_url}
              onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
              placeholder="https://demo.example.com"
              className="transition-all focus:ring-2 focus:ring-primary font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Live preview or demo link for customers
            </p>
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
            <h3 className="text-lg font-semibold">Product Status</h3>
            <p className="text-sm text-muted-foreground">Control visibility and featuring</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
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
              <option value="false">✗ Inactive (Hidden from store)</option>
            </Select>
            <p className="text-xs text-muted-foreground">
              {formData.is_active ? "Product is live and purchasable" : "Product is hidden from customers"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="is_featured" className="text-sm font-medium">
              Featured Product
            </Label>
            <Select
              id="is_featured"
              value={formData.is_featured ? "true" : "false"}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.value === "true" })}
              className="transition-all focus:ring-2 focus:ring-primary"
            >
              <option value="false">No</option>
              <option value="true">★ Yes (Featured)</option>
            </Select>
            <p className="text-xs text-muted-foreground">
              {formData.is_featured ? "Appears in featured sections" : "Standard product listing"}
            </p>
          </div>
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
              placeholder="Title for search engines (leave empty to use product name)"
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
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          asChild
          className="min-w-[140px]"
        >
          <Link href="/admin/products">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
