import Link from "next/link";
import { Mail, Linkedin, Twitter, Github } from "lucide-react";
import { TeamMember } from "../types";
import { Badge } from "@/components/shared/badge";

interface TeamMemberListProps {
    members: TeamMember[];
}

export function TeamMemberList({ members }: TeamMemberListProps) {
    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
                <Link
                    key={member.id}
                    href={`/team/${member.slug}`}
                    className="group block"
                >
                    <div className="overflow-hidden rounded-lg border bg-card transition-all hover:border-primary/50 hover:shadow-lg">
                        {/* Image placeholder */}
                        <div className="aspect-square w-full overflow-hidden bg-muted/50">
                            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20 transition-transform duration-300 group-hover:scale-105">
                                <div className="text-6xl font-bold text-muted-foreground/20">
                                    {member.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="mb-1 text-xl font-bold group-hover:text-primary transition-colors">
                                {member.name}
                            </h3>
                            <p className="mb-3 text-sm text-primary">{member.role}</p>
                            <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                                {member.bio}
                            </p>

                            {/* Expertise tags */}
                            <div className="mb-4 flex flex-wrap gap-1">
                                {member.expertise.slice(0, 3).map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-xs">
                                        {skill}
                                    </Badge>
                                ))}
                                {member.expertise.length > 3 && (
                                    <Badge variant="secondary" className="text-xs">
                                        +{member.expertise.length - 3}
                                    </Badge>
                                )}
                            </div>

                            {/* Social links */}
                            <div className="flex items-center gap-3 text-muted-foreground">
                                {member.email && (
                                    <Mail className="h-4 w-4 transition-colors hover:text-primary" />
                                )}
                                {member.linkedin && (
                                    <Linkedin className="h-4 w-4 transition-colors hover:text-primary" />
                                )}
                                {member.twitter && (
                                    <Twitter className="h-4 w-4 transition-colors hover:text-primary" />
                                )}
                                {member.github && (
                                    <Github className="h-4 w-4 transition-colors hover:text-primary" />
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
