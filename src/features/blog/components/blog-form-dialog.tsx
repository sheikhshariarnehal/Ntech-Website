"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostWithAuthor } from "../types";

interface BlogFormDialogProps {
  post?: PostWithAuthor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (post: any) => Promise<void>;
}

export function BlogFormDialog({
  post,
  open,
  onOpenChange,
  onSave,
}: BlogFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    slug: "",
    cover_image_url: "",
    tags: "",
    is_published: false,
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
  });

  // Update form data when post changes
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        excerpt: post.excerpt || "",
        content: post.content || "",
        slug: post.slug || "",
        cover_image_url: post.cover_image_url || "",
        tags: post.tags?.join(", ") || "",
        is_published: post.is_published || false,
        seo_title: post.seo_title || "",
        seo_description: post.seo_description || "",
        seo_keywords: post.seo_keywords?.join(", ") || "",
      });
    } else {
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        slug: "",
        cover_image_url: "",
        tags: "",
        is_published: false,
        seo_title: "",
        seo_description: "",
        seo_keywords: "",
      });
    }
  }, [post, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        ...formData,
        tags: formData.tags
          ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : null,
        seo_keywords: formData.seo_keywords
          ? formData.seo_keywords.split(",").map((k) => k.trim()).filter(Boolean)
          : null,
      };

      await onSave(postData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      // Only auto-generate slug if it's empty or we're creating a new post
      slug: !post && !prev.slug ? title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') : prev.slug,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{post ? "Edit Post" : "Create New Post"}</DialogTitle>
          <DialogDescription>
            {post
              ? "Make changes to your blog post here."
              : "Fill in the details to create a new blog post."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {/* Main Content - 2 Column Layout on Desktop */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                    placeholder="Post title"
                    className="text-base"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    placeholder="post-url-slug"
                    className="text-base font-mono"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Short description of the post"
                    rows={3}
                    className="text-base resize-none"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="cover_image_url">Cover Image URL</Label>
                  <Input
                    id="cover_image_url"
                    name="cover_image_url"
                    value={formData.cover_image_url}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="text-base"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="technology, business, AI"
                    className="text-base"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="is_published"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                  />
                  <Label htmlFor="is_published" className="cursor-pointer font-medium">
                    Publish this post
                  </Label>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    placeholder="Post content (Markdown supported)"
                    rows={20}
                    className="font-mono text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            {/* SEO Settings Section */}
            <div className="border-t pt-6">
              <h4 className="font-semibold mb-4 text-base">SEO Settings</h4>
              
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="seo_title">SEO Title</Label>
                  <Input
                    id="seo_title"
                    name="seo_title"
                    value={formData.seo_title}
                    onChange={handleChange}
                    placeholder="SEO optimized title"
                    className="text-base"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="seo_keywords">SEO Keywords (comma separated)</Label>
                  <Input
                    id="seo_keywords"
                    name="seo_keywords"
                    value={formData.seo_keywords}
                    onChange={handleChange}
                    placeholder="keyword1, keyword2, keyword3"
                    className="text-base"
                  />
                </div>

                <div className="grid gap-2 lg:col-span-2">
                  <Label htmlFor="seo_description">SEO Description</Label>
                  <Textarea
                    id="seo_description"
                    name="seo_description"
                    value={formData.seo_description}
                    onChange={handleChange}
                    placeholder="SEO meta description"
                    rows={2}
                    className="text-base resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="min-w-[100px]"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="min-w-[120px]">
              {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
