import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { createServerClient } from "@/lib/supabase/server-client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog Management",
    description: "Manage blog posts.",
};

export const revalidate = 0;

async function getPosts() {
    const supabase = await createServerClient();
    
    const { data: posts, error } = await supabase
        .from('posts')
        .select(`
            *,
            author:profiles(full_name)
        `)
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
    
    return posts || [];
}

export default async function BlogPage() {
    const posts = await getPosts();
    
    return (
        <>
            <PageHeader title="Blog Posts" subtitle="Manage your blog content." />
            
            <div className="grid gap-4">
                {posts.length === 0 ? (
                    <Card className="p-8 text-center">
                        <p className="text-muted-foreground">No blog posts found.</p>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {posts.map((post) => (
                            <Card key={post.id} className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold">{post.title}</h3>
                                            {post.is_published ? (
                                                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Published</span>
                                            ) : (
                                                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Draft</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                            {post.author && <span>By: {(post.author as any).full_name || 'Unknown'}</span>}
                                            {post.published_at && (
                                                <span>Published: {new Date(post.published_at).toLocaleDateString()}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

