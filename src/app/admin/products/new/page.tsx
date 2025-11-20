"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/forms/product-form";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    setLoading(true);

    const insertData: Database['public']['Tables']['products']['Insert'] = {
      name: formData.name,
      slug: formData.slug,
      short_description: formData.short_description,
      full_description: formData.full_description || null,
      price: parseFloat(formData.price),
      billing_interval: formData.billing_interval,
      stock: formData.stock ? parseInt(formData.stock) : null,
      is_active: formData.is_active,
      thumbnail_url: formData.thumbnail_url || null,
      seo_title: formData.seo_title || null,
      seo_description: formData.seo_description || null,
      seo_keywords: formData.seo_keywords ? formData.seo_keywords.split(',').map((k: string) => k.trim()).filter((k: string) => k) : null,
    };

    const { error } = await (supabase as any).from("products").insert([insertData]);

    setLoading(false);

    if (!error) {
      router.push("/admin/products");
    } else {
      alert("Error creating product: " + error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6 gap-4">
        <PageHeader title="Add New Product" subtitle="Create a new digital product." />
        <Button variant="outline" onClick={() => router.push("/admin/products")} className="gap-2 flex-shrink-0">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Products</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        submitLabel="Create Product"
        loading={loading}
      />
    </>
  );
}
