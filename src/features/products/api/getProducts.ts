import { createServerClient } from "@/lib/supabase/server-client";
import { Product, ProductFilters } from "../types";

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const supabase = await createServerClient();
  
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  // Apply category filter
  if (filters?.category && filters.category !== 'All') {
    query = query.eq('category', filters.category);
  }

  // Apply billing interval filter
  if (filters?.billing_interval && filters.billing_interval !== 'all') {
    query = query.eq('billing_interval', filters.billing_interval);
  }

  // Apply search filter
  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  if (!data) {
    return [];
  }

  // Apply price filters in memory (since we can't directly filter on numeric type in text format)
  let products: Product[] = data as Product[];
  
  if (filters?.min_price !== undefined) {
    products = products.filter((p) => p.price >= filters.min_price!);
  }
  
  if (filters?.max_price !== undefined) {
    products = products.filter((p) => p.price <= filters.max_price!);
  }

  return products;
}

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

  return data as Product | null;
}

export async function getProductCategories(): Promise<string[]> {
  const supabase = await createServerClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('category')
    .eq('is_active', true)
    .not('category', 'is', null);

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  // Get unique categories
  const categories = Array.from(new Set((data as Product[]).map(p => p.category).filter(Boolean)));
  return categories as string[];
}
