import { createServerClient } from '@/lib/supabase/server-client';

export async function getPosts() {
    const supabase = await createServerClient();
    
    const { data, error } = await supabase
        .from('posts')
        .select(`
            id,
            slug,
            title,
            excerpt,
            content,
            cover_image_url,
            tags,
            published_at,
            is_published,
            created_at,
            author_id,
            profiles:author_id(full_name)
        `)
        .eq('is_published', true)
        .order('published_at', { ascending: false, nullsFirst: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }

    return (data || []).map(post => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || '',
        content: post.content,
        coverImageUrl: post.cover_image_url,
        tags: post.tags || [],
        publishedAt: post.published_at 
            ? new Date(post.published_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })
            : new Date(post.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              }),
        author: (post.profiles as any)?.full_name || 'Ntech Team',
    }));
}

export async function getPostBySlug(slug: string) {
    const supabase = await createServerClient();
    
    const { data, error } = await supabase
        .from('posts')
        .select(`
            id,
            slug,
            title,
            excerpt,
            content,
            cover_image_url,
            tags,
            published_at,
            is_published,
            created_at,
            seo_title,
            seo_description,
            author_id,
            profiles:author_id(full_name)
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    if (error) {
        console.error('Error fetching post:', error);
        return null;
    }

    if (!data) return null;

    return {
        id: data.id,
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt || '',
        content: data.content,
        coverImageUrl: data.cover_image_url,
        tags: data.tags || [],
        publishedAt: data.published_at 
            ? new Date(data.published_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })
            : new Date(data.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }),
        author: (data.profiles as any)?.full_name || 'Ntech Team',
        seoTitle: data.seo_title,
        seoDescription: data.seo_description,
    };
}
