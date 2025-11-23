"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "../types";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <Card className="group overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer">
            <Link href={`/projects/${project.slug}`} className="flex-1 flex flex-col">
                {/* Cover Image */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                    {project.thumbnail_url && !imageError ? (
                        <Image
                            src={project.thumbnail_url}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <span className="text-6xl font-bold text-muted-foreground/20">
                                {project.title.charAt(0)}
                            </span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Content */}
                <CardContent className="flex-1 p-4">
                    <h3 className="text-lg font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {project.short_description || "No description available"}
                    </p>

                    {/* Tags */}
                    {project.services_used && project.services_used.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {project.services_used.slice(0, 3).map((service, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {service}
                                </Badge>
                            ))}
                            {project.services_used.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{project.services_used.length - 3}
                                </Badge>
                            )}
                        </div>
                    )}
                </CardContent>
            </Link>

            {/* Action Buttons */}
            <CardFooter className="p-4 pt-0 gap-2">
                {project.live_url && (
                    <Button
                        asChild
                        size="sm"
                        className="flex-1"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>Live</span>
                        </a>
                    </Button>
                )}
                {project.github_url && (
                    <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5"
                        >
                            <Github className="h-3.5 w-3.5" />
                            <span>Code</span>
                        </a>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}