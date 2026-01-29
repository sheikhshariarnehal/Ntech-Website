import { notFound } from "next/navigation";
import Link from "next/link";
import { Mail, Linkedin, Twitter, Github, ArrowLeft, Calendar } from "lucide-react";
import { getTeamMemberBySlug } from "@/features/team/api/getTeamMemberBySlug";
import { Button } from "@/components/ui/button";

// Revalidate team member pages every hour
export const revalidate = 3600;

interface TeamMemberPageProps {
    params: {
        slug: string;
    };
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
    const member = await getTeamMemberBySlug(params.slug);

    if (!member) {
        notFound();
    }

    return (
        <div className="container py-10">
            {/* Back button */}
            <Link href="/team" className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Team
            </Link>

            <div className="grid gap-12 lg:grid-cols-3">
                {/* Left column - Image and contact */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        {/* Image placeholder */}
                        <div className="mb-6 aspect-square w-full overflow-hidden rounded-lg border bg-muted/50">
                            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
                                <div className="text-9xl font-bold text-muted-foreground/20">
                                    {member.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </div>
                            </div>
                        </div>

                        {/* Contact information */}
                        <div className="space-y-4">
                            {member.email && (
                                <a
                                    href={`mailto:${member.email}`}
                                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Mail className="h-4 w-4" />
                                    {member.email}
                                </a>
                            )}

                            {/* Social links */}
                            <div className="flex gap-3">
                                {member.linkedin_url && (
                                    <a
                                        href={member.linkedin_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                )}
                                {member.twitter_url && (
                                    <a
                                        href={member.twitter_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                )}
                                {member.github_url && (
                                    <a
                                        href={member.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <Github className="h-5 w-5" />
                                    </a>
                                )}
                            </div>

                            {/* Joined date */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                Joined {new Date(member.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column - Details */}
                <div className="lg:col-span-2">
                    <h1 className="mb-2 text-4xl font-bold tracking-tight">{member.name}</h1>
                    <p className="mb-6 text-xl text-primary">{member.designation}</p>

                    {/* Bio */}
                    {member.bio && (
                        <div className="mb-8">
                            <h2 className="mb-4 text-2xl font-bold">About</h2>
                            <p className="text-lg leading-relaxed text-muted-foreground">{member.bio}</p>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mt-12 rounded-lg border bg-muted/30 p-6">
                        <h3 className="mb-2 text-xl font-bold">Want to work with {member.name.split(" ")[0]}?</h3>
                        <p className="mb-4 text-muted-foreground">
                            Get in touch to discuss your project and how we can help.
                        </p>
                        <Link href="/contact">
                            <Button>Contact Us</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
