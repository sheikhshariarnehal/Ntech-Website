import { teamMembers } from "./getTeamMembers";
import { TeamMember } from "../types";

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
    // TODO: Replace with Supabase query
    // const { data } = await supabase.from('team_members').select('*').eq('slug', slug).single();
    const member = teamMembers.find((member) => member.slug === slug);
    return member || null;
}
