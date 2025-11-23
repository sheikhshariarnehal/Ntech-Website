import { Project } from "../types";
import { ProjectCard } from "./project-card";

interface ProjectGridProps {
    projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
    if (!projects || projects.length === 0) {
        return (
            <div className="text-center py-16 px-4">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-2xl font-bold mb-2">No Projects Found</h3>
                <p className="text-muted-foreground">
                    We're working on exciting projects. Check back soon!
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}
