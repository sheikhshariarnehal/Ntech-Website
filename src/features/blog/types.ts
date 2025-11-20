export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  author_id: string | null;
  cover_image_url: string | null;
  tags: string[] | null;
  published_at: string | null;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface PostWithAuthor extends Post {
  author?: {
    full_name: string | null;
  };
}

export interface CreatePostInput {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  author_id?: string;
  cover_image_url?: string;
  tags?: string[];
  is_published?: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  id: string;
}
