export interface Service {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  full_description: string | null;
  icon: string | null;
  starting_price: number | null;
  is_active: boolean;
  features: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  created_at: string;
  updated_at: string;
}
