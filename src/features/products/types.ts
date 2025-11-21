export interface Product {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  full_description: string | null;
  price: string;
  billing_interval: 'one_time' | 'monthly' | 'yearly';
  stock: number | null;
  is_active: boolean;
  thumbnail_url: string | null;
  category: string | null;
  features: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface ProductFilters {
  category?: string;
  billing_interval?: string;
  search?: string;
  min_price?: number;
  max_price?: number;
}

export const PRODUCT_CATEGORIES = [
  'All',
  'AI Tools',
  'Productivity',
  'Design',
  'Development',
  'Marketing',
  'Software',
  'Cloud Services',
] as const;

export const BILLING_INTERVALS = [
  { value: 'all', label: 'All Types' },
  { value: 'one_time', label: 'One-Time Purchase' },
  { value: 'monthly', label: 'Monthly Subscription' },
  { value: 'yearly', label: 'Yearly Subscription' },
] as const;
