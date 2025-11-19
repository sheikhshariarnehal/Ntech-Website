import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { getPostBySlug } from "@/features/blog/api/getPostBySlug";
import { Metadata } from "next";

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="container py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4">
                        {post.title}
                    </h1>
                    <div className="text-muted-foreground">
                        <span>{post.publishedAt}</span> • <span>{post.author}</span>
                    </div>
                </div>
                <div className="prose max-w-none dark:prose-invert">
                    <p className="text-lg leading-relaxed">{post.content}</p>
                </div>
            </div>
        </div>
    );
}
