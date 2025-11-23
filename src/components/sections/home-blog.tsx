import { createClient } from "@/lib/supabase/server";
import { HomeBlogClient } from "./home-blog-client";

export async function HomeBlog() {
    const supabase = await createClient();
    
    // Fetch published blog posts from Supabase
    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, slug, title, excerpt, cover_image_url, published_at, tags')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3);

    if (error) {
        console.error('Error fetching blog posts:', error);
        return null;
    }

    // If no posts found, return null
    if (!posts || posts.length === 0) {
        return null;
    }

    return <HomeBlogClient posts={posts} />;
}
