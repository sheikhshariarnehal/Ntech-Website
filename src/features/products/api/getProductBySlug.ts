import { createServerClient } from "@/lib/supabase/server-client";
import { Product } from "../types";

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createServerClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}
