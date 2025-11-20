"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { ArrowLeft, Upload, X, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    client_name: "",
    short_description: "",
    full_description: "",
    services_used: "",
    thumbnail_url: "",
    live_url: "",
    github_url: "",
    is_featured: false,
    published_at: "",
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, WebP, or GIF)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, thumbnail_url: publicUrl });
    } catch (error: any) {
      console.error('Upload error:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async () => {
    if (formData.thumbnail_url) {
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
    setLoading(true);

    const insertData: Database['public']['Tables']['projects']['Insert'] = {
      title: formData.title,
      slug: formData.slug,
      client_name: formData.client_name || null,
      short_description: formData.short_description || null,
      full_description: formData.full_description || null,
      services_used: formData.services_used ? formData.services_used.split(',').map(s => s.trim()).filter(s => s) : null,
      thumbnail_url: formData.thumbnail_url || null,
      live_url: formData.live_url || null,
      github_url: formData.github_url || null,
      is_featured: formData.is_featured,
      published_at: formData.published_at ? new Date(formData.published_at).toISOString() : null,
    };

    const { error } = await (supabase as any).from("projects").insert([insertData]);

    setLoading(false);

    if (!error) {
      router.push("/admin/projects");
    } else {
      alert("Error creating project: " + error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageHeader title="Add New Project" subtitle="Create a new portfolio project." />
        <Button variant="outline" size="sm" asChild className="flex-shrink-0">
          <Link href="/admin/projects" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back to Projects</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Fields */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
        {/* Basic Information */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="E-commerce Platform"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="ecommerce-platform"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_name">Client Name</Label>
            <Input
              id="client_name"
              value={formData.client_name}
              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              placeholder="Company or client name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_description">Short Description</Label>
            <Textarea
              id="short_description"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              placeholder="Brief project description..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_description">Full Description</Label>
            <Textarea
              id="full_description"
              value={formData.full_description}
              onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
              placeholder="Detailed project description..."
              rows={6}
            />
          </div>
        </Card>

        {/* Media */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Media & Assets</h3>

          <div className="space-y-2">
            <Label htmlFor="thumbnail_upload">Project Thumbnail</Label>
            
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
                </label>
              </div>
            ) : (
              <div className="relative group">
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src={formData.thumbnail_url}
                    alt="Project thumbnail"
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
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Right Column - Sidebar */}
      <div className="space-y-6 order-1 lg:order-2">
        {/* Status */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Publishing</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 cursor-pointer"
              />
              <Label htmlFor="is_featured" className="cursor-pointer font-medium">
                Featured project
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="published_at">Publish Date</Label>
              <Input
                id="published_at"
                type="datetime-local"
                value={formData.published_at}
                onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to save as draft
              </p>
            </div>

            <div className="pt-4 space-y-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? "Creating..." : "Create Project"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/projects")}
                disabled={loading}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>

        {/* Links & Services */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Links & Services</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="live_url">Live URL</Label>
              <Input
                id="live_url"
                type="url"
                value={formData.live_url}
                onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="services_used">Services Used</Label>
              <Input
                id="services_used"
                value={formData.services_used}
                onChange={(e) => setFormData({ ...formData, services_used: e.target.value })}
                placeholder="web-development, ui-ux-design, seo"
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated service slugs
              </p>
            </div>
          </div>
        </Card>

        {/* Image Preview */}
        {formData.thumbnail_url && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Thumbnail Preview</h3>
            <img
              src={formData.thumbnail_url}
              alt="Project thumbnail"
              className="w-full h-auto rounded-lg"
            />
          </Card>
        )}
      </div>
    </div>
  </form>
    </>
  );
}
