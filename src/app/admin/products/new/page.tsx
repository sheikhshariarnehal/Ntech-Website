"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/forms/product-form";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    setLoading(true);

    const { error } = await supabase.from("products").insert([
      {
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
      },
    ]);

    setLoading(false);

    if (!error) {
      router.push("/admin/products");
    } else {
      alert("Error creating product: " + error.message);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <PageHeader title="Add New Product" subtitle="Create a new digital product." />
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        submitLabel="Create Product"
        loading={loading}
      />
    </>
  );
}
