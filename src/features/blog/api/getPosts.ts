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

    // Type assertion to handle the complex join result
    const post = data as any;

    return {
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
                month: 'long', 
                day: 'numeric' 
              })
            : new Date(post.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }),
        author: post.profiles?.full_name || 'Ntech Team',
        seoTitle: post.seo_title,
        seoDescription: post.seo_description,
    };
}
