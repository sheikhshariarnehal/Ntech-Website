"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, ArrowRight, Tag, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImageUrl: string | null;
    tags: string[];
    publishedAt: string;
    author: string;
}

interface FeaturedBlogCarouselProps {
    posts: Post[];
}

export function FeaturedBlogCarousel({ posts }: FeaturedBlogCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying || posts.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % posts.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying, posts.length]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
        setIsAutoPlaying(false);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    if (posts.length === 0) return null;

    const currentPost = posts[currentIndex];

    return (
        <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
                <div className="h-px flex-1 bg-border" />
                <Badge variant="secondary" className="text-sm font-semibold">
                    Featured Articles
                </Badge>
                <div className="h-px flex-1 bg-border" />
            </div>

            <div className="relative">
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 group">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Image Section */}
                        <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 min-h-[300px] md:min-h-[400px] overflow-hidden">
                            {currentPost.coverImageUrl ? (
                                <Image
                                    src={currentPost.coverImageUrl}
                                    alt={currentPost.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <BookOpen className="h-20 w-20 mx-auto mb-4 text-primary/40" />
                                        <p className="text-sm text-muted-foreground">Featured Article</p>
                                    </div>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-40" />
                            
                            {/* Navigation Arrows */}
                            {posts.length > 1 && (
                                <>
                                    <button
                                        onClick={goToPrevious}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-foreground rounded-full p-2 shadow-lg transition-all hover:scale-110"
                                        aria-label="Previous slide"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={goToNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-foreground rounded-full p-2 shadow-lg transition-all hover:scale-110"
                                        aria-label="Next slide"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </>
                            )}

                            <div className="absolute top-4 left-4 z-10">
                                <Badge className="bg-primary text-primary-foreground">
                                    Featured {currentIndex + 1}/{posts.length}
                                </Badge>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 md:p-10 flex flex-col justify-between">
                            <div>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {currentPost.publishedAt}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        {currentPost.author}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        5 min read
                                    </div>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
                                    {currentPost.title}
                                </h2>

                                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                                    {currentPost.excerpt}
                                </p>

                                {currentPost.tags && currentPost.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {currentPost.tags.slice(0, 3).map((tag: string) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                <Tag className="h-3 w-3 mr-1" />
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <Link href={`/blog/${currentPost.slug}`}>
                                    <Button size="lg" className="w-full md:w-auto group/btn">
                                        Read Full Article
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>

                                {/* Slide Indicators */}
                                {posts.length > 1 && (
                                    <div className="flex gap-2 justify-center md:justify-start">
                                        {posts.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => goToSlide(index)}
                                                className={`h-2 rounded-full transition-all ${
                                                    index === currentIndex
                                                        ? "w-8 bg-primary"
                                                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                                }`}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}
