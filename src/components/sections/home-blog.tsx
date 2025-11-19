import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { posts } from "@/features/blog/api/getPosts";
import { Badge } from "@/components/shared/badge";

export function HomeBlog() {
    // Use the first 3 posts for the homepage
    const recentPosts = posts.slice(0, 3);

    return (
        <section className="container py-20 lg:py-28">
            <div className="mb-12 flex flex-col items-center text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                    Latest Insights
                </h2>
                <p className="max-w-2xl text-lg text-muted-foreground">
                    Thoughts on technology, design, and the future of digital business.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {recentPosts.map((post) => (
                    <Card
                        key={post.slug}
                        className="flex flex-col overflow-hidden transition-all hover:border-primary/50 hover:shadow-md group"
                    >
                        <div className="aspect-video w-full bg-muted/50 p-8 flex items-center justify-center overflow-hidden relative">
                            {/* Placeholder for blog thumbnail */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 group-hover:scale-105 transition-transform duration-500" />
                            <span className="text-muted-foreground font-medium relative z-10">
                                {post.title}
                            </span>
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                            <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    <span>{post.author}</span>
                                </div>
                            </div>
                            <h3 className="mb-2 text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                                {post.title}
                            </h3>
                            <p className="mb-4 flex-1 text-muted-foreground line-clamp-3">
                                {post.excerpt}
                            </p>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                            >
                                Read article <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="mt-12 text-center">
                <Link href="/blog">
                    <Button variant="outline" size="lg">
                        View all articles
                    </Button>
                </Link>
            </div>
        </section>
    );
}
