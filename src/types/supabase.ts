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
          budget_range: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          notes: string | null
          phone: string | null
          service_type: string | null
          source_page: string | null
          status: string
          updated_at: string
        }
        Insert: {
          budget_range?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          notes?: string | null
          phone?: string | null
          service_type?: string | null
          source_page?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          budget_range?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          notes?: string | null
          phone?: string | null
          service_type?: string | null
          source_page?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "licenses_or_keys_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string | null
          email: string
          id: string
          status: string | null
          subscribed_at: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          status?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          status?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "product_metadata_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          billing_interval: string
          category: string | null
          created_at: string
          features: string[] | null
          full_description: string | null
          id: string
          is_active: boolean
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
          category?: string | null
          created_at?: string
          features?: string[] | null
          full_description?: string | null
          id?: string
          is_active?: boolean
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
          category?: string | null
          created_at?: string
          features?: string[] | null
          full_description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          price?: number
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          stock?: number | null
          thumbnail_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
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
          slug: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          features: string[] | null
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
          features?: string[] | null
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
          features?: string[] | null
          full_description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          starting_price?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          address: string | null
          created_at: string
          default_seo_description: string | null
          default_seo_image: string | null
          default_seo_title: string | null
          enable_blog: boolean | null
          enable_custom_theme: boolean | null
          enable_newsletter: boolean | null
          enable_shop: boolean | null
          facebook_pixel_id: string | null
          favicon_url: string | null
          google_analytics_id: string | null
          id: string
          logo_url: string | null
          maintenance_message: string | null
          maintenance_mode: boolean | null
          meta_description: string | null
          meta_keywords: string | null
          office_hours: string | null
          phone: string | null
          primary_color: string | null
          site_name: string | null
          smtp_from_email: string | null
          smtp_from_name: string | null
          smtp_host: string | null
          smtp_port: number | null
          smtp_user: string | null
          social_facebook: string | null
          social_github: string | null
          social_instagram: string | null
          social_linkedin: string | null
          social_twitter: string | null
          social_youtube: string | null
          support_email: string | null
          tagline: string | null
          theme_accent: string | null
          theme_accent_foreground: string | null
          theme_background: string | null
          theme_border: string | null
          theme_card: string | null
          theme_card_foreground: string | null
          theme_destructive: string | null
          theme_destructive_foreground: string | null
          theme_foreground: string | null
          theme_input: string | null
          theme_mode: string | null
          theme_muted: string | null
          theme_muted_foreground: string | null
          theme_popover: string | null
          theme_popover_foreground: string | null
          theme_primary: string | null
          theme_primary_foreground: string | null
          theme_radius: string | null
          theme_ring: string | null
          theme_secondary: string | null
          theme_secondary_foreground: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          default_seo_description?: string | null
          default_seo_image?: string | null
          default_seo_title?: string | null
          enable_blog?: boolean | null
          enable_custom_theme?: boolean | null
          enable_newsletter?: boolean | null
          enable_shop?: boolean | null
          facebook_pixel_id?: string | null
          favicon_url?: string | null
          google_analytics_id?: string | null
          id?: string
          logo_url?: string | null
          maintenance_message?: string | null
          maintenance_mode?: boolean | null
          meta_description?: string | null
          meta_keywords?: string | null
          office_hours?: string | null
          phone?: string | null
          primary_color?: string | null
          site_name?: string | null
          smtp_from_email?: string | null
          smtp_from_name?: string | null
          smtp_host?: string | null
          smtp_port?: number | null
          smtp_user?: string | null
          social_facebook?: string | null
          social_github?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_twitter?: string | null
          social_youtube?: string | null
          support_email?: string | null
          tagline?: string | null
          theme_accent?: string | null
          theme_accent_foreground?: string | null
          theme_background?: string | null
          theme_border?: string | null
          theme_card?: string | null
          theme_card_foreground?: string | null
          theme_destructive?: string | null
          theme_destructive_foreground?: string | null
          theme_foreground?: string | null
          theme_input?: string | null
          theme_mode?: string | null
          theme_muted?: string | null
          theme_muted_foreground?: string | null
          theme_popover?: string | null
          theme_popover_foreground?: string | null
          theme_primary?: string | null
          theme_primary_foreground?: string | null
          theme_radius?: string | null
          theme_ring?: string | null
          theme_secondary?: string | null
          theme_secondary_foreground?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          default_seo_description?: string | null
          default_seo_image?: string | null
          default_seo_title?: string | null
          enable_blog?: boolean | null
          enable_custom_theme?: boolean | null
          enable_newsletter?: boolean | null
          enable_shop?: boolean | null
          facebook_pixel_id?: string | null
          favicon_url?: string | null
          google_analytics_id?: string | null
          id?: string
          logo_url?: string | null
          maintenance_message?: string | null
          maintenance_mode?: boolean | null
          meta_description?: string | null
          meta_keywords?: string | null
          office_hours?: string | null
          phone?: string | null
          primary_color?: string | null
          site_name?: string | null
          smtp_from_email?: string | null
          smtp_from_name?: string | null
          smtp_host?: string | null
          smtp_port?: number | null
          smtp_user?: string | null
          social_facebook?: string | null
          social_github?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_twitter?: string | null
          social_youtube?: string | null
          support_email?: string | null
          tagline?: string | null
          theme_accent?: string | null
          theme_accent_foreground?: string | null
          theme_background?: string | null
          theme_border?: string | null
          theme_card?: string | null
          theme_card_foreground?: string | null
          theme_destructive?: string | null
          theme_destructive_foreground?: string | null
          theme_foreground?: string | null
          theme_input?: string | null
          theme_mode?: string | null
          theme_muted?: string | null
          theme_muted_foreground?: string | null
          theme_popover?: string | null
          theme_popover_foreground?: string | null
          theme_primary?: string | null
          theme_primary_foreground?: string | null
          theme_radius?: string | null
          theme_ring?: string | null
          theme_secondary?: string | null
          theme_secondary_foreground?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      team: {
        Row: {
          bio: string | null
          created_at: string
          designation: string
          email: string | null
          github_url: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          linkedin_url: string | null
          name: string
          order_position: number | null
          phone: string | null
          twitter_url: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          designation: string
          email?: string | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          linkedin_url?: string | null
          name: string
          order_position?: number | null
          phone?: string | null
          twitter_url?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          designation?: string
          email?: string | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          linkedin_url?: string | null
          name?: string
          order_position?: number | null
          phone?: string | null
          twitter_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      trusted_companies: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          logo_url: string
          name: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          logo_url: string
          name: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          logo_url?: string
          name?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_admin_user: {
        Args: {
          user_email: string
          user_full_name?: string
          user_password: string
        }
        Returns: string
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
