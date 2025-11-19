import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { getPosts } from "@/features/blog/api/getPosts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Insights and updates from our team.",
};

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="container py-8 md:py-12">
            <PageHeader
                title="Blog"
                subtitle="Insights, news, and updates from our team."
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <Card key={post.slug} className="flex flex-col justify-between">
                        <div className="p-6">
                            <div className="text-sm text-muted-foreground mb-2">
                                {post.publishedAt}
                            </div>
                            <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                                {post.excerpt}
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <Link href={`/blog/${post.slug}`}>
                                <Button variant="ghost" className="w-full">
                                    Read More
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
