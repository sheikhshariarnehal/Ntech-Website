import { PageHeader } from "@/components/shared/page-header";
import { getProjects } from "@/features/projects/api/getProjects";
import { ProjectGrid } from "@/features/projects/components/project-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Projects | Ntech Solutions",
    description: "Explore our portfolio of innovative solutions and successful collaborations with clients worldwide.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <main className="min-h-screen pt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <PageHeader
                    title="Our Projects"
                    subtitle="Explore our portfolio of innovative solutions and successful collaborations with clients worldwide."
                />
                
                <ProjectGrid projects={projects} />
            </div>
        </main>
    );
}
