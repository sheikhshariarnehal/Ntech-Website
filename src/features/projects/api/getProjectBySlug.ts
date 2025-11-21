import { createServerClient } from '@/lib/supabase/server-client';
import { Project } from './getProjects';

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    try {
        const supabase = await createServerClient();
        
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !data) {
            console.error('Error fetching project:', error);
            return null;
        }

        // Transform the data to match the expected format
        // Use type assertion to handle the Supabase query result
        const project = data as any;
        
        return {
            ...project,
            tags: project.services_used || [],
            summary: project.short_description || '',
            client: project.client_name || '',
            problem: project.full_description || '',
            solution: project.full_description || '',
            results: project.full_description || '',
        };
    } catch (error) {
        console.error('Failed to fetch project:', error);
        return null;
    }
}
