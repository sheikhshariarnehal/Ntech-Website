import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/shared/badge";
import { PageHeader } from "@/components/shared/page-header";
import { getProjects } from "@/features/projects/api/getProjects";
import { Metadata } from "next";
import { ExternalLink, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Projects",
    description: "Our portfolio of successful projects.",
};

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="container py-12 md:py-16">
            <PageHeader
                title="Our Projects"
                subtitle="Explore our portfolio of innovative solutions and successful collaborations with clients worldwide."
            />
            
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {projects.map((project) => (
                    <Card 
                        key={project.slug} 
                        className="group overflow-hidden border border-border/50 shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 bg-card"
                    >
                        {/* Project Image */}
                        <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-muted to-background">
                            {project.thumbnail_url ? (
                                <Image
                                    src={project.thumbnail_url}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                                    <div className="text-6xl font-bold text-primary/40">
                                        {project.title.charAt(0)}
                                    </div>
                                </div>
                            )}
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Tags on Image - Show on hover */}
                            <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <Badge 
                                        key={tag} 
                                        variant="secondary"
                                        className="text-xs font-semibold bg-primary dark:bg-primary text-primary-foreground border-0 shadow-lg"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                                {project.tags.length > 3 && (
                                    <Badge variant="secondary" className="text-xs font-semibold bg-primary dark:bg-primary text-primary-foreground border-0 shadow-lg">
                                        +{project.tags.length - 3}
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 border-t border-border/30">
                            {/* Title */}
                            <h3 className="font-bold text-lg mb-2.5 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">
                                {project.summary}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex gap-2.5">
                                {project.live_url && (
                                    <Button 
                                        asChild 
                                        variant="default" 
                                        size="sm"
                                        className="flex-1 group/btn bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                                    >
                                        <a 
                                            href={project.live_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span>Live Demo</span>
                                        </a>
                                    </Button>
                                )}
                                <Button 
                                    asChild 
                                    variant={project.live_url ? "outline" : "default"}
                                    size="sm"
                                    className={project.live_url ? "flex-1" : "w-full group/btn"}
                                >
                                    <Link 
                                        href={`/projects/${project.slug}`}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <span>View Details</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {projects.length === 0 && (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-2xl font-bold mb-2">No Projects Yet</h3>
                    <p className="text-muted-foreground">
                        Check back soon to see our amazing work!
                    </p>
                </div>
            )}
        </div>
    );
}
