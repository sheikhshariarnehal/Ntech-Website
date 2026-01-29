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
      const { error } = await supabase.storage
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
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Upload error:', err);
      alert('Failed to upload image: ' + err.message);
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
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Fields */}
        <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
          {/* Basic Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            
            <div className="space-y-4">

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">
              Product Name *
            </Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., Premium Website Template"
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
              placeholder="premium-website-template"
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
            value={formData.full_description}
            onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
            placeholder="Detailed product description with features, benefits, and specifications..."
            rows={8}
          />
        </div>
      </div>
    </Card>

    {/* Pricing & Inventory */}
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Pricing & Inventory</h3>
      
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="price">
              Price (৳ BDT) *
            </Label>
            <Input
              id="price"
              type="number"
              step="1"
              min="0"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="5000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="billing_interval">
              Billing Type *
            </Label>
            <Select
              id="billing_interval"
              value={formData.billing_interval}
              onChange={(e) => setFormData({ ...formData, billing_interval: e.target.value })}
            >
              <option value="one_time">One Time Purchase</option>
              <option value="monthly">Monthly Subscription</option>
              <option value="yearly">Yearly Subscription</option>
              <option value="lifetime">Lifetime Access</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">
              Stock Quantity
            </Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              placeholder="Unlimited"
            />
          </div>
        </div>
      </div>
    </Card>

    {/* Digital Assets */}
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Digital Assets</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="download_url">
            Download URL
          </Label>
          <Input
            id="download_url"
            type="url"
            value={formData.download_url}
            onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
            placeholder="https://example.com/download/product.zip"
            className="font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo_url">
            Live Demo URL
          </Label>
          <Input
            id="demo_url"
            type="url"
            value={formData.demo_url}
            onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
            placeholder="https://demo.example.com"
            className="font-mono text-sm"
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
    {/* Publishing */}
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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_featured"
            checked={formData.is_featured}
            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 cursor-pointer"
          />
          <Label htmlFor="is_featured" className="cursor-pointer font-medium">
            Featured product
          </Label>
        </div>

        <div className="pt-4 space-y-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? "Saving..." : submitLabel}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => window.location.href = '/admin/products'}
            disabled={loading}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Card>

    {/* Product Thumbnail */}
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Product Thumbnail</h3>
      
      <div className="space-y-4">
            
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
      </Card>
  </div>
</div>
</form>
  );
}
