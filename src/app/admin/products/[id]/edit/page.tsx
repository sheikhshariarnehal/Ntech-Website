"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminPageHeader } from "@/components/layout/admin-page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductForm } from "@/components/forms/product-form";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { ArrowLeft } from "lucide-react";

type Product = Database['public']['Tables']['products']['Row'];

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [initialData, setInitialData] = useState<Partial<{
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
  }> | null>(null);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (!error && data) {
      const product = data as Product;
      setInitialData({
        name: product.name || "",
        slug: product.slug || "",
        short_description: product.short_description || "",
        full_description: product.full_description || "",
        price: product.price?.toString() || "",
        billing_interval: product.billing_interval || "one_time",
        stock: product.stock?.toString() || "",
        is_active: product.is_active ?? true,
        is_featured: false,
        download_url: "",
        thumbnail_url: product.thumbnail_url || "",
        demo_url: "",
        seo_title: product.seo_title || "",
        seo_description: product.seo_description || "",
        seo_keywords: Array.isArray(product.seo_keywords) ? product.seo_keywords.join(', ') : "",
      });
    }
    setFetching(false);
  };

  const handleSubmit = async (formData: { name?: string; slug?: string; short_description?: string; full_description?: string; price?: string; billing_interval?: string; stock?: string; is_active?: boolean; thumbnail_url?: string; seo_title?: string; seo_description?: string; seo_keywords?: string }) => {
    setLoading(true);

    const updateData: Database['public']['Tables']['products']['Update'] = {
      name: formData.name,
      slug: formData.slug,
      short_description: formData.short_description,
      full_description: formData.full_description || null,
      price: formData.price ? parseFloat(formData.price) : undefined,
      billing_interval: formData.billing_interval,
      stock: formData.stock ? parseInt(formData.stock) : null,
      is_active: formData.is_active,
      thumbnail_url: formData.thumbnail_url || null,
      seo_title: formData.seo_title || null,
      seo_description: formData.seo_description || null,
      seo_keywords: formData.seo_keywords ? formData.seo_keywords.split(',').map((k: string) => k.trim()).filter((k: string) => k) : null,
    };

    const { error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", productId);

    setLoading(false);

    if (!error) {
      router.push("/admin/products");
    } else {
      alert("Error updating product: " + error.message);
    }
  };

  if (fetching) {
    return (
      <>
        <div className="flex items-center justify-between mb-6 gap-4">
          <AdminPageHeader title="Edit Product" subtitle="Loading..." />
          <Button variant="outline" onClick={() => router.push("/admin/products")} className="gap-2 flex-shrink-0">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Products</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading product data...</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6 gap-4">
        <AdminPageHeader title="Edit Product" subtitle="Update product information." />
        <Button variant="outline" onClick={() => router.push("/admin/products")} className="gap-2 flex-shrink-0">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Products</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </div>

      <ProductForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Update Product"
        loading={loading}
      />
    </>
  );
}
