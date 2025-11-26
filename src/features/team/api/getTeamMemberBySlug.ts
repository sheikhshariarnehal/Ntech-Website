import { createServerClient } from "@/lib/supabase/server-client";
import { TeamMember } from "../types";

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
    try {
        const supabase = await createServerClient();
        
        // @ts-ignore - Supabase type instantiation is excessively deep
        const query = supabase
            .from('team')
            .select('*')
            .eq('slug', slug)
            .eq('is_active', true)
            .single();

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching team member:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Failed to fetch team member:', error);
        return null;
    }
}
