import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/shared/badge";

// TODO: Fetch from API
const projects = [
    {
        title: "E-Commerce Platform",
        description:
            "A full-featured online store with Stripe payments, inventory management, and admin dashboard.",
        tags: ["Next.js", "Supabase", "Stripe"],
        slug: "ecommerce-platform",
    },
    {
        title: "AI Content Generator",
        description:
            "SaaS application that uses OpenAI to generate marketing copy and blog posts for businesses.",
        tags: ["React", "OpenAI", "Tailwind"],
        slug: "ai-content-generator",
    },
    {
        title: "Healthcare Portal",
        description:
            "Secure patient management system with appointment scheduling and telemedicine features.",
        tags: ["TypeScript", "PostgreSQL", "WebRTC"],
        slug: "healthcare-portal",
    },
];

export function HomeProjects() {
    return (
        <section className="bg-muted/30 py-20 lg:py-28">
            <div className="container">
                <div className="mb-12 flex flex-col items-center text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                        Featured projects
                    </h2>
                    <p className="max-w-2xl text-lg text-muted-foreground">
                        Some of our recent work for startups and growing businesses. We build
                        scalable, secure, and high-performance solutions.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Card
                            key={project.slug}
                            className="flex flex-col overflow-hidden transition-all hover:border-primary/50 hover:shadow-md"
                        >
                            <div className="aspect-video w-full bg-muted/50 p-8 flex items-center justify-center">
                                {/* Placeholder for project thumbnail */}
                                <span className="text-muted-foreground font-medium">{project.title}</span>
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                                <p className="mb-4 flex-1 text-muted-foreground">
                                    {project.description}
                                </p>
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                                >
                                    View case study <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/projects">
                        <Button variant="outline" size="lg">
                            View all projects
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

import { Button } from "@/components/ui/button";
