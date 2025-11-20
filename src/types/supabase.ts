export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          service_type: string | null
          budget_range: string | null
          message: string
          status: string
          source_page: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          service_type?: string | null
          budget_range?: string | null
          message: string
          status?: string
          source_page?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          service_type?: string | null
          budget_range?: string | null
          message?: string
          status?: string
          source_page?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      licenses_or_keys: {
        Row: {
          code: string
          created_at: string
          id: string
          order_item_id: string
          status: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          order_item_id: string
          status?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          order_item_id?: string
          status?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          subtotal: number
          unit_price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity?: number
          subtotal: number
          unit_price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          subtotal?: number
          unit_price?: number
        }
      }
      orders: {
        Row: {
          created_at: string
          currency: string
          email: string
          id: string
          payment_provider: string | null
          payment_reference: string | null
          status: string
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          currency?: string
          email: string
          id?: string
          payment_provider?: string | null
          payment_reference?: string | null
          status?: string
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          currency?: string
          email?: string
          id?: string
          payment_provider?: string | null
          payment_reference?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
      }
      posts: {
        Row: {
          author_id: string | null
          content: string
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_published: boolean
          published_at: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
      }
      product_metadata: {
        Row: {
          id: string
          key: string
          product_id: string
          value: string | null
        }
        Insert: {
          id?: string
          key: string
          product_id: string
          value?: string | null
        }
        Update: {
          id?: string
          key?: string
          product_id?: string
          value?: string | null
        }
      }
      products: {
        Row: {
          billing_interval: string
          created_at: string
          id: string
          is_active: boolean
          is_featured: boolean
          full_description: string | null
          name: string
          price: number
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          short_description: string | null
          slug: string
          stock: number | null
          thumbnail_url: string | null
          updated_at: string
        }
        Insert: {
          billing_interval?: string
          created_at?: string
          id?: string
          is_active?: boolean
          is_featured?: boolean
          full_description?: string | null
          name: string
          price: number
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          stock?: number | null
          thumbnail_url?: string | null
          updated_at?: string
        }
        Update: {
          billing_interval?: string
          created_at?: string
          id?: string
          is_active?: boolean
          is_featured?: boolean
          full_description?: string | null
          name?: string
          price?: number
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          stock?: number | null
          thumbnail_url?: string | null
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string
        }
      }
      project_images: {
        Row: {
          caption: string | null
          id: string
          image_url: string
          project_id: string
          sort_order: number
        }
        Insert: {
          caption?: string | null
          id?: string
          image_url: string
          project_id: string
          sort_order?: number
        }
        Update: {
          caption?: string | null
          id?: string
          image_url?: string
          project_id?: string
          sort_order?: number
        }
      }
      projects: {
        Row: {
          client_name: string | null
          created_at: string
          full_description: string | null
          github_url: string | null
          id: string
          is_featured: boolean
          live_url: string | null
          published_at: string | null
          services_used: string[] | null
          short_description: string | null
          slug: string
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          client_name?: string | null
          created_at?: string
          full_description?: string | null
          github_url?: string | null
          id?: string
          is_featured?: boolean
          live_url?: string | null
          published_at?: string | null
          services_used?: string[] | null
          short_description?: string | null
          slug: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          client_name?: string | null
          created_at?: string
          full_description?: string | null
          github_url?: string | null
          id?: string
          is_featured?: boolean
          live_url?: string | null
          published_at?: string | null
          services_used?: string[] | null
          short_description?: string | null
          slug?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          created_at: string
          full_description: string | null
          icon: string | null
          id: string
          is_active: boolean
          name: string
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          short_description: string | null
          slug: string
          starting_price: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name: string
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          starting_price?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          starting_price?: number | null
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          created_at: string
          default_seo_description: string | null
          default_seo_image: string | null
          default_seo_title: string | null
          id: string
          logo_url: string | null
          primary_color: string | null
          site_name: string | null
          support_email: string | null
          tagline: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_seo_description?: string | null
          default_seo_image?: string | null
          default_seo_title?: string | null
          id?: string
          logo_url?: string | null
          primary_color?: string | null
          site_name?: string | null
          support_email?: string | null
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_seo_description?: string | null
          default_seo_image?: string | null
          default_seo_title?: string | null
          id?: string
          logo_url?: string | null
          primary_color?: string | null
          site_name?: string | null
          support_email?: string | null
          tagline?: string | null
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: {
      is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
    Enums: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
