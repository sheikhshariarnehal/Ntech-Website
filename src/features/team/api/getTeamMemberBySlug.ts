import { createServerClient } from "@/lib/supabase/server-client";
import { TeamMember } from "../types";

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
    try {
        const supabase = await createServerClient();
        
        const { data, error } = await supabase
            .from('team')
            .select('*')
            .eq('slug', slug)
            .eq('is_active', true)
            .single();

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
