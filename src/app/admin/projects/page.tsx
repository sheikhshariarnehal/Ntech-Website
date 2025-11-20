import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { createServerClient } from "@/lib/supabase/server-client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects Management",
    description: "Manage your portfolio projects.",
};

export const revalidate = 0;

async function getProjects() {
    const supabase = await createServerClient();
    
    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
    
    return projects || [];
}

export default async function ProjectsPage() {
    const projects = await getProjects();
    
    return (
        <>
            <PageHeader title="Projects" subtitle="Manage your portfolio projects." />
            
            <div className="grid gap-4">
                {projects.length === 0 ? (
                    <Card className="p-8 text-center">
                        <p className="text-muted-foreground">No projects found.</p>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {projects.map((project) => (
                            <Card key={project.id} className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold">{project.title}</h3>
                                            {project.is_featured && (
                                                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Featured</span>
                                            )}
                                            {project.published_at ? (
                                                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Published</span>
                                            ) : (
                                                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">Draft</span>
                                            )}
                                        </div>
                                        {project.client_name && (
                                            <p className="text-sm text-muted-foreground mt-1">Client: {project.client_name}</p>
                                        )}
                                        <p className="text-sm text-muted-foreground mt-1">{project.short_description}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
