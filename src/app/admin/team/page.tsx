import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { getTeamMembers } from "@/features/team/api/getTeamMembers";
import Link from "next/link";

export default async function AdminTeamPage() {
    const members = await getTeamMembers();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="Team Members"
                    subtitle="Manage your team members"
                />
                <Button>Add Team Member</Button>
            </div>

            <div className="rounded-lg border bg-card overflow-hidden">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Expertise</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Joined</th>
                            <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {members.map((member) => (
                            <tr key={member.id} className="transition-colors hover:bg-muted/50">
                                <td className="px-4 py-3">
                                    <div>
                                        <div className="font-medium">{member.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            <Link href={`/team/${member.slug}`} className="hover:underline">
                                                {member.slug}
                                            </Link>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm">{member.role}</td>
                                <td className="px-4 py-3 text-sm">
                                    {member.expertise.slice(0, 2).join(", ")}
                                    {member.expertise.length > 2 && ` +${member.expertise.length - 2}`}
                                </td>
                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                    {new Date(member.joinedAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 text-right text-sm">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="sm">
                                            Edit
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
                <strong>Note:</strong> Team member management is currently using mock data.
                Connect to Supabase to enable full CRUD operations.
            </div>
        </div>
    );
}
