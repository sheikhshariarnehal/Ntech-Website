"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    cover_image_url: string | null;
    published_at: string;
    tags: string[] | null;
}

interface HomeBlogClientProps {
    posts: Post[];
}

export function HomeBlogClient({ posts }: HomeBlogClientProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background border-t border-border">
            <div className="container">
                <div className="flex items-end justify-between mb-8 sm:mb-10 md:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground">Latest Insights</h2>
                    <Button variant="link" className="text-primary hidden md:flex" asChild>
                        <Link href="/blog">
                            View all articles <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <Card className="bg-transparent border-none shadow-none group cursor-pointer">
                                    <div className="relative rounded-xl overflow-hidden mb-4 aspect-[4/3]">
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full border border-border text-xs font-medium text-foreground">
                                                {post.tags[0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </div>
                                        )}
                                        {post.cover_image_url ? (
                                            <Image 
                                                src={post.cover_image_url} 
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-muted flex items-center justify-center">
                                                <span className="text-muted-foreground">No image</span>
                                            </div>
                                        )}
                                    </div>
                                    <CardHeader className="p-0 mb-2">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground/70 mb-2">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(post.published_at)}
                                        </div>
                                        <CardTitle className="text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <p className="text-muted-foreground text-sm line-clamp-2">
                                            {post.excerpt || ''}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-0 mt-4">
                                        <span className="text-sm font-medium text-primary flex items-center group-hover:underline">
                                            Read More <ArrowRight className="w-3 h-3 ml-1" />
                                        </span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 md:hidden flex justify-center">
                    <Button variant="link" className="text-primary" asChild>
                        <Link href="/blog">
                            View all articles <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
