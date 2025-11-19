import { notFound } from "next/navigation";
import { Badge } from "@/components/shared/badge";
import { PageHeader } from "@/components/shared/page-header";
import { getProjectBySlug } from "@/features/projects/api/getProjectBySlug";
import { Metadata } from "next";

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
        description: project.summary,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const project = await getProjectBySlug(params.slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="container py-8 md:py-12">
            <PageHeader title={project.title} subtitle={project.summary} />
            <div className="mt-8 max-w-3xl">
                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="space-y-8">
                    {project.client && (
                        <div>
                            <h3 className="text-xl font-bold mb-2">Client</h3>
                            <p className="text-muted-foreground">{project.client}</p>
                        </div>
                    )}

                    <div>
                        <h3 className="text-xl font-bold mb-2">The Problem</h3>
                        <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-2">The Solution</h3>
                        <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-2">Results</h3>
                        <p className="text-muted-foreground leading-relaxed">{project.results}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
