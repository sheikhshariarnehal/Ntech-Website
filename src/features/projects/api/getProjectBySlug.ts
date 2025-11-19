import { projects } from "./getProjects";

export async function getProjectBySlug(slug: string) {
    return projects.find((project) => project.slug === slug);
}
