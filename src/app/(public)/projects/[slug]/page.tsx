import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getProjectBySlug } from "@/features/projects/api/getProjectBySlug";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import { ExternalLink, Github, ArrowLeft, Calendar, User, CheckCircle2 } from "lucide-react";

interface ProjectPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const project = await getProjectBySlug(params.slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: project.title,
        description: project.short_description || project.full_description,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const project = await getProjectBySlug(params.slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative h-[500px] w-full overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                {project.thumbnail_url && (
                    <>
                        <Image
                            src={project.thumbnail_url}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    </>
                )}
                
                <div className="absolute inset-0 flex items-end">
                    <div className="container pb-12">
                        <Link href="/projects" className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors mb-6 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Projects
                        </Link>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            {project.title}
                        </h1>
                        
                        <p className="text-xl text-muted-foreground max-w-3xl mb-6">
                            {project.short_description}
                        </p>
                        
                        <div className="flex flex-wrap gap-3">
                            {project.live_url && (
                                <Button asChild size="lg">
                                    <a 
                                        href={project.live_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        <span>View Live Site</span>
                                    </a>
                                </Button>
                            )}
                            {project.github_url && (
                                <Button asChild variant="outline" size="lg">
                                    <a 
                                        href={project.github_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <Github className="w-5 h-5" />
                                        <span>View Source</span>
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container py-12 md:py-16">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10 order-2 lg:order-1">
                        {/* About Section */}
                        {project.full_description && (
                            <section>
                                <h2 className="text-3xl font-bold mb-4">About This Project</h2>
                                <div className="prose prose-lg max-w-none dark:prose-invert">
                                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        {project.full_description}
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Features/Highlights */}
                        {project.services_used && project.services_used.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {project.services_used.map((tech: string, index: number) => (
                                        <Card key={index} className="p-4 border-l-4 border-l-primary">
                                            <div className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-semibold mb-1">{tech}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Built with modern {tech} technology
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 order-1 lg:order-2">
                        {/* Project Info Card */}
                        <Card className="p-6">
                            <h3 className="font-bold text-lg mb-4">Project Details</h3>
                            
                            <div className="space-y-4">
                                {project.client_name && (
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                            <User className="w-4 h-4" />
                                            <span>Client</span>
                                        </div>
                                        <p className="font-semibold">{project.client_name}</p>
                                    </div>
                                )}

                                {project.published_at && (
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>Completed</span>
                                        </div>
                                        <p className="font-semibold">
                                            {new Date(project.published_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long'
                                            })}
                                        </p>
                                    </div>
                                )}

                                {project.services_used && project.services_used.length > 0 && (
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-2">
                                            Technologies
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.services_used.map((tech: string, idx: number) => (
                                                <Badge key={idx} variant="secondary" className="text-xs">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 pt-6 border-t space-y-3">
                                {project.live_url && (
                                    <Button asChild className="w-full">
                                        <a 
                                            href={project.live_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span>Visit Website</span>
                                        </a>
                                    </Button>
                                )}
                                {project.github_url && (
                                    <Button asChild variant="outline" className="w-full">
                                        <a 
                                            href={project.github_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <Github className="w-4 h-4" />
                                            <span>View Code</span>
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </Card>

                        {/* CTA Card */}
                        <Card className="p-6 bg-primary text-primary-foreground">
                            <h3 className="font-bold text-lg mb-2">Interested in Similar Work?</h3>
                            <p className="text-sm mb-4 opacity-90">
                                Let&apos;s discuss how we can help bring your project to life.
                            </p>
                            <Button asChild variant="secondary" className="w-full">
                                <Link href="/contact">
                                    Get in Touch
                                </Link>
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
