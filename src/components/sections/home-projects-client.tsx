"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Project {
    id: string;
    slug: string;
    title: string;
    short_description: string | null;
    thumbnail_url: string | null;
    services_used: string[] | null;
}

interface HomeProjectsClientProps {
    projects: Project[];
}

export function HomeProjectsClient({ projects }: HomeProjectsClientProps) {
    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background border-t border-border">
            <div className="container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 md:mb-16 gap-4 sm:gap-6">
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground mb-3 sm:mb-4">Featured Projects</h2>
                        <p className="text-muted-foreground max-w-xl text-sm sm:text-base md:text-lg">
                            See how we&apos;ve transformed ideas into powerful digital solutions.
                        </p>
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto" asChild>
                        <Link href="/projects">View All Work</Link>
                    </Button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <Link href={`/projects/${project.slug}`}>
                                <div className="relative overflow-hidden rounded-lg sm:rounded-xl aspect-[16/9] mb-4 sm:mb-6">
                                    <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                    {project.thumbnail_url ? (
                                        <Image
                                            src={project.thumbnail_url}
                                            alt={project.title}
                                            fill
                                            className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-muted flex items-center justify-center">
                                            <span className="text-muted-foreground">No image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent dark:from-black/80 dark:via-black/30" />

                                    <div className="absolute bottom-0 left-0 p-4 sm:p-6 z-20 translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {project.services_used && project.services_used.length > 0 && (
                                            <span className="text-primary-foreground dark:text-primary text-xs sm:text-sm font-medium mb-1 sm:mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                {project.services_used[0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </span>
                                        )}
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
                                        {project.short_description && (
                                            <p className="text-white/80 text-xs sm:text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 hidden md:block">
                                                {project.short_description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
