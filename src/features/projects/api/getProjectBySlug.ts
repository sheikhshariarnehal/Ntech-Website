import { createServerClient } from '@/lib/supabase/server-client';
import { Project } from '../types';

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    try {
        const supabase = await createServerClient();
        
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('slug', slug)
            .not('published_at', 'is', null)
            .single<Project>();

        if (error) {
            console.error('Error fetching project:', error);
            return null;
        }

        if (!data) {
            console.log('No project found with slug:', slug);
            return null;
        }

        console.log(`✅ Successfully fetched project: ${data.title}`);
        
        return data;
    } catch (error) {
        console.error('Exception in getProjectBySlug:', error);
        return null;
    }
}
