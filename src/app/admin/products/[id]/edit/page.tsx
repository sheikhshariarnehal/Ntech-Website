"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/forms/product-form";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [initialData, setInitialData] = useState<any>(null);

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
      setInitialData({
        name: data.name || "",
        slug: data.slug || "",
        short_description: data.short_description || "",
        full_description: data.full_description || "",
        price: data.price?.toString() || "",
        billing_interval: data.billing_interval || "one_time",
        stock: data.stock?.toString() || "",
        is_active: data.is_active ?? true,
        is_featured: data.is_featured ?? false,
        download_url: data.download_url || "",
        thumbnail_url: data.thumbnail_url || "",
        demo_url: data.demo_url || "",
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        seo_keywords: data.seo_keywords || "",
      });
    }
    setFetching(false);
  };

  const handleSubmit = async (formData: any) => {
    setLoading(true);

    const { error } = await supabase
      .from("products")
      .update({
        name: formData.name,
        slug: formData.slug,
        short_description: formData.short_description,
        full_description: formData.full_description || null,
        price: parseFloat(formData.price),
        billing_interval: formData.billing_interval,
        stock: formData.stock ? parseInt(formData.stock) : null,
        is_active: formData.is_active,
        is_featured: formData.is_featured,
        download_url: formData.download_url || null,
        thumbnail_url: formData.thumbnail_url || null,
        demo_url: formData.demo_url || null,
        seo_title: formData.seo_title || null,
        seo_description: formData.seo_description || null,
        seo_keywords: formData.seo_keywords || null,
      })
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
        <PageHeader title="Edit Product" subtitle="Loading..." />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading product data...</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <PageHeader title="Edit Product" subtitle="Update product information." />
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
