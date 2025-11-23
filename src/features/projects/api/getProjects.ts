import { createServerClient } from '@/lib/supabase/server-client';
import { Project } from '../types';

export async function getProjects(): Promise<Project[]> {
    try {
        const supabase = await createServerClient();
        
        // Fetch all published projects
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .not('published_at', 'is', null)
            .order('published_at', { ascending: false });

        if (error) {
            console.error('Supabase error fetching projects:', error);
            return [];
        }

        if (!data || data.length === 0) {
            console.log('No projects found in database');
            return [];
        }

        console.log(`✅ Successfully fetched ${data.length} projects`);
        
        // Return data as is - it already matches the Project type from supabase
        return data as Project[];
        
    } catch (error) {
        console.error('Exception in getProjects:', error);
        return [];
    }
}
