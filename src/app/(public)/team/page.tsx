import { PageHeader } from "@/components/shared/page-header";
import { TeamMemberList } from "@/features/team/components/team-member-list";
import { getTeamMembers } from "@/features/team/api/getTeamMembers";
import { Suspense } from "react";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export const metadata = {
    title: "Our Team - Meet the Experts",
    description: "Meet the talented individuals driving innovation and excellence at our company. Our diverse team brings expertise across design, development, and AI.",
};

function TeamLoading() {
    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="overflow-hidden rounded-lg border bg-card animate-pulse"
                >
                    <div className="aspect-square w-full bg-muted" />
                    <div className="p-6 space-y-4">
                        <div className="h-6 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="space-y-2">
                            <div className="h-3 bg-muted rounded" />
                            <div className="h-3 bg-muted rounded" />
                            <div className="h-3 bg-muted rounded w-4/5" />
                        </div>
                        <div className="flex gap-3 pt-2">
                            {[...Array(4)].map((_, j) => (
                                <div key={j} className="w-9 h-9 rounded-full bg-muted" />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default async function TeamPage() {
    const members = await getTeamMembers();

    return (
        <div className="container py-10 md:py-16 lg:py-20">
            <PageHeader
                title="Our Team"
                subtitle="Meet the talented individuals driving innovation and excellence at our company. Together, we build exceptional digital experiences."
            />
            
            <div className="mt-12">
                <Suspense fallback={<TeamLoading />}>
                    <TeamMemberList members={members} />
                </Suspense>
            </div>

            {/* CTA Section */}
            <div className="mt-20 rounded-2xl border bg-gradient-to-br from-primary/5 via-primary/10 to-background p-8 text-center md:p-12">
                <h2 className="text-3xl font-bold tracking-tight">Want to Join Our Team?</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    We're always looking for talented individuals who are passionate about technology and innovation.
                </p>
                <a
                    href="/contact"
                    className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                    Get in Touch
                </a>
            </div>
        </div>
    );
}
