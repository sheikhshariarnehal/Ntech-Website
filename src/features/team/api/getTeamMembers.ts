import { createServerClient } from "@/lib/supabase/server-client";
import { TeamMember } from "../types";

export async function getTeamMembers(): Promise<TeamMember[]> {
    try {
        const supabase = await createServerClient();
        
        const { data, error } = await supabase
            .from('team')
            .select('*')
            .eq('is_active', true)
            .order('order_position', { ascending: true });

        if (error) {
            console.error('Error fetching team members:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Failed to fetch team members:', error);
        return [];
    }
}
