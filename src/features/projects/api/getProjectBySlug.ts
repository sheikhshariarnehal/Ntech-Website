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
        return {
            ...data,
            tags: data.services_used || [],
            summary: data.short_description || '',
            client: data.client_name || '',
            problem: data.full_description || '',
            solution: data.full_description || '',
            results: data.full_description || '',
        };
    } catch (error) {
        console.error('Failed to fetch project:', error);
        return null;
    }
}
