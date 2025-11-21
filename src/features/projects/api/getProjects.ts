import { createServerClient } from '@/lib/supabase/server-client';
import { Database } from '@/types/supabase';

export type Project = Database['public']['Tables']['projects']['Row'] & {
    tags?: string[];
    summary?: string;
    client?: string;
    problem?: string;
    solution?: string;
    results?: string;
};

export async function getProjects(): Promise<Project[]> {
    try {
        const supabase = await createServerClient();
        
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .not('published_at', 'is', null)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching projects:', error);
            return [];
        }

        if (!data) {
            return [];
        }

        // Transform the data to match the expected format
        return data.map((project: any) => ({
            ...project,
            tags: project.services_used || [],
            summary: project.short_description || '',
            client: project.client_name || '',
            problem: project.full_description || '',
            solution: project.full_description || '',
            results: project.full_description || '',
        })) as Project[];
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return [];
    }
}
