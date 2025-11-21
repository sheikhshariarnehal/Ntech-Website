import { notFound } from "next/navigation";
import { getPostBySlug } from "@/features/blog/api/getPostBySlug";
import { Metadata } from "next";
import { Calendar, User, ArrowLeft, Tag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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

    const title = post.seoTitle || post.title;
    const description = post.seoDescription || post.excerpt || post.title;
    const url = `https://ntech.com/blog/${post.slug}`;

    return {
        title: `${title} | Ntech Blog`,
        description: description,
        keywords: post.tags || [],
        authors: [{ name: post.author }],
        creator: post.author,
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
            title: title,
            description: description,
            url: url,
            siteName: "Ntech",
            locale: "en_US",
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author],
            tags: post.tags,
            images: post.coverImageUrl ? [
                {
                    url: post.coverImageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: post.coverImageUrl ? [post.coverImageUrl] : [],
            creator: "@ntech",
        },
        alternates: {
            canonical: url,
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = post.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Structured Data for Article
    const articleStructuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.coverImageUrl || "https://ntech.com/og-blog.jpg",
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Ntech",
            "logo": {
                "@type": "ImageObject",
                "url": "https://ntech.com/logo.png"
            }
        },
        "datePublished": post.publishedAt,
        "dateModified": post.publishedAt,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://ntech.com/blog/${post.slug}`
        },
        "keywords": post.tags ? post.tags.join(", ") : "",
        "articleBody": post.content.substring(0, 500),
        "wordCount": wordCount,
        "timeRequired": `PT${readingTime}M`
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
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://ntech.com/blog/${post.slug}`
            }
        ]
    };

    return (
        <div className="min-h-screen">
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
            />

            {/* Hero Section with Cover Image */}
            <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b">
                <div className="container py-8">
                    <Link href="/blog">
                        <Button variant="ghost" size="sm" className="mb-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Blog
                        </Button>
                    </Link>
                </div>
                
                {post.coverImageUrl && (
                    <div className="relative w-full h-[400px] md:h-[500px] bg-muted">
                        <Image
                            src={post.coverImageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    </div>
                )}

                <div className="container pb-8">
                    <div className="max-w-4xl mx-auto text-center -mt-32 relative z-10">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-shadow">
                            {post.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span itemProp="author">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{readingTime} min read</span>
                            </div>
                        </div>

                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 justify-center">
                                {post.tags.map((tag: string) => (
                                    <Badge key={tag} variant="secondary">
                                        <Tag className="h-3 w-3 mr-1" />
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="container py-12 md:py-16" itemScope itemType="https://schema.org/BlogPosting">
                <meta itemProp="headline" content={post.title} />
                <meta itemProp="description" content={post.excerpt} />
                <meta itemProp="datePublished" content={post.publishedAt} />
                {post.coverImageUrl && <meta itemProp="image" content={post.coverImageUrl} />}
                
                <div className="max-w-4xl mx-auto">
                    {post.excerpt && (
                        <div className="text-xl text-muted-foreground leading-relaxed mb-8 pb-8 border-b italic" itemProp="description">
                            {post.excerpt}
                        </div>
                    )}
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none" itemProp="articleBody">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                h1: ({node, ...props}) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-2xl font-bold mt-5 mb-2" {...props} />,
                                p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                                li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                                code: ({node, inline, ...props}: any) => 
                                    inline ? (
                                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                                    ) : (
                                        <code className="block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto" {...props} />
                                    ),
                                pre: ({node, ...props}) => <pre className="mb-4 overflow-x-auto" {...props} />,
                                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />,
                                a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
                            }}
                        >
                            {post.content.replace(/\\n/g, '\n')}
                        </ReactMarkdown>
                    </div>
                </div>
            </article>

            {/* Back to Blog CTA */}
            <section className="container pb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="p-8 rounded-2xl border bg-muted/50">
                        <h3 className="text-2xl font-bold mb-4">
                            Read More Articles
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Explore more insights and updates from our blog
                        </p>
                        <Link href="/blog">
                            <Button size="lg">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to All Posts
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
