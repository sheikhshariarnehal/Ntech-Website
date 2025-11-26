import { createPublicClient } from "@/lib/supabase/public-client";
import { TeamMember } from "../types";

export async function getTeamMembers(): Promise<TeamMember[]> {
    try {
        const supabase = createPublicClient();
        
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
