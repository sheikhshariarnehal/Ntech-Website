import { createClient } from "@/lib/supabase/server";
import { HomeProjectsClient } from "./home-projects-client";

export async function HomeProjects() {
    const supabase = await createClient();
    
    // Fetch featured projects from Supabase
    const { data: projects, error } = await supabase
        .from('projects')
        .select('id, slug, title, short_description, thumbnail_url, services_used')
        .eq('is_featured', true)
        .not('published_at', 'is', null)
        .order('published_at', { ascending: false })
        .limit(4);

    if (error) {
        console.error('Error fetching projects:', error);
        return null;
    }

    // If no projects found, return null
    if (!projects || projects.length === 0) {
        return null;
    }

    return <HomeProjectsClient projects={projects} />;
}
