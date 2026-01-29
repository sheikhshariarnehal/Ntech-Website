import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/features/blog/api/getPosts";
import { Metadata } from "next";
import { Calendar, Clock, ArrowRight, User, BookOpen } from "lucide-react";
import Image from "next/image";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { FeaturedBlogCarousel } from "@/components/sections/featured-blog-carousel";

// Revalidate blog page every 5 minutes
export const revalidate = 300;

export const metadata: Metadata = {
    title: "Blog - Latest Insights on Web Development, AI & Technology | Ntech",
    description: "Discover expert insights, tutorials, and updates on web development, mobile apps, AI automation, digital products, and technology trends. Stay ahead with Ntech's blog.",
    keywords: [
        "web development blog",
        "AI automation insights",
        "technology trends",
        "digital products",
        "ChatGPT tutorials",
        "Gemini AI",
        "app development tips",
        "tech blog",
        "software development",
        "programming tutorials"
    ],
    authors: [{ name: "Ntech Team" }],
    creator: "Ntech",
    publisher: "Ntech",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: "Blog - Latest Insights on Web Development, AI & Technology | Ntech",
        description: "Expert insights on web development, AI automation, digital products, and technology trends.",
        url: "https://ntech.com/blog",
        siteName: "Ntech",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/og-blog.jpg",
                width: 1200,
                height: 630,
                alt: "Ntech Blog - Technology Insights",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog - Latest Insights on Web Development, AI & Technology | Ntech",
        description: "Expert insights on web development, AI automation, digital products, and technology trends.",
        images: ["/og-blog.jpg"],
        creator: "@ntech",
    },
    alternates: {
        canonical: "https://ntech.com/blog",
        types: {
            'application/rss+xml': [
                { url: '/blog/feed.xml', title: 'Ntech Blog RSS Feed' },
            ],
        },
    },
};

export default async function BlogPage() {
    const posts = await getPosts();
    
    // Take first 3 posts for featured carousel
    const featuredPosts = posts.slice(0, 3);
    // Remaining posts for grid
    const regularPosts = posts.slice(3);

    // Structured Data for SEO
    const blogStructuredData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Ntech Blog",
        "description": "Expert insights on web development, AI automation, digital products, and technology trends",
        "url": "https://ntech.com/blog",
        "publisher": {
            "@type": "Organization",
            "name": "Ntech",
            "logo": {
                "@type": "ImageObject",
                "url": "https://ntech.com/logo.png"
            }
        },
        "blogPost": posts.slice(0, 10).map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
                "@type": "Person",
                "name": post.author
            },
            "datePublished": post.publishedAt,
            "url": `https://ntech.com/blog/${post.slug}`,
            ...(post.coverImageUrl && {
                "image": {
                    "@type": "ImageObject",
                    "url": post.coverImageUrl
                }
            }),
            ...(post.tags && post.tags.length > 0 && {
                "keywords": post.tags.join(", ")
            })
        }))
    };

    const breadcrumbStructuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ntech.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://ntech.com/blog"
            }
        ]
    };

    return (
        <div className="min-h-screen">
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
            />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b">
                <div className="container py-16 md:py-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <BookOpen className="h-4 w-4" />
                            Our Blog
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            Insights & <span className="text-primary">Updates</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                            Stay updated with the latest trends in technology, AI, web development, 
                            and digital innovation from our expert team.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container py-12 md:py-16">
                {/* Featured Posts Carousel */}
                {featuredPosts.length > 0 && (
                    <FeaturedBlogCarousel posts={featuredPosts} />
                )}

                {/* Recent Posts Grid */}
                <section>
                    <div className="flex items-center gap-2 mb-8">
                        <div className="h-px flex-1 bg-border" />
                        <h2 className="text-2xl md:text-3xl font-bold px-4">
                            Recent Articles
                        </h2>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    {regularPosts.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {regularPosts.map((post) => (
                                <Card 
                                    key={post.slug} 
                                    className="group flex flex-col overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                                >
                                    {/* Card Image */}
                                    <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 h-48 overflow-hidden">
                                        {post.coverImageUrl ? (
                                            <Image
                                                src={post.coverImageUrl}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <BookOpen className="h-12 w-12 text-primary/30" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    {/* Card Content */}
                                    <div className="flex flex-col flex-1 p-6">
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {post.publishedAt}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="h-3.5 w-3.5" />
                                                4 min read
                                            </div>
                                        </div>
                                        
                                        <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        
                                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-1 text-sm leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {post.tags.slice(0, 3).map((tag: string) => (
                                                    <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <User className="h-4 w-4" />
                                                {post.author}
                                            </div>
                                            
                                            <Link href={`/blog/${post.slug}`}>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    className="group/btn"
                                                >
                                                    Read More
                                                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                            <p className="text-muted-foreground text-lg">
                                No articles available yet. Check back soon!
                            </p>
                        </div>
                    )}
                </section>

                {/* Newsletter CTA */}
                <section className="mt-20">
                    <Card className="relative overflow-hidden border-2">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -ml-32 -mb-32" />
                        
                        <div className="relative p-8 md:p-12 text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Stay Updated
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Subscribe to our newsletter and get the latest insights on technology, 
                                AI, and digital innovation delivered to your inbox.
                            </p>
                            <NewsletterForm />
                            <p className="text-xs text-muted-foreground mt-4">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                        </div>
                    </Card>
                </section>
            </div>
        </div>
    );
}
