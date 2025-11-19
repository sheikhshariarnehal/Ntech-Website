import { PageHeader } from "@/components/shared/page-header";
import { TeamMemberList } from "@/features/team/components/team-member-list";
import { getTeamMembers } from "@/features/team/api/getTeamMembers";

export const metadata = {
    title: "Our Team",
    description: "Meet the talented individuals driving innovation and excellence at our company.",
};

export default async function TeamPage() {
    const members = await getTeamMembers();

    return (
        <div className="container py-10">
            <PageHeader
                title="Our Team"
                subtitle="Meet the talented individuals driving innovation and excellence at our company."
            />
            <TeamMemberList members={members} />
        </div>
    );
}
