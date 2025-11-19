import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/shared/badge";
import { PageHeader } from "@/components/shared/page-header";
import { getProjects } from "@/features/projects/api/getProjects";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "Our portfolio of successful projects.",
};

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="container py-8 md:py-12">
            <PageHeader
                title="Our Projects"
                subtitle="Check out some of our recent work and success stories."
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.slug} className="flex flex-col justify-between">
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                            <p className="text-muted-foreground mb-4">{project.summary}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            <Link href={`/projects/${project.slug}`}>
                                <Button variant="outline" className="w-full">
                                    View Details
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
