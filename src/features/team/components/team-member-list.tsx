"use client";

import Image from "next/image";
import { Mail, Linkedin, Twitter, Github, Phone } from "lucide-react";
import { TeamMember } from "../types";
import { Card, CardContent } from "@/components/ui/card";

interface TeamMemberListProps {
    members: TeamMember[];
}

export function TeamMemberList({ members }: TeamMemberListProps) {
    if (members.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg text-muted-foreground">No team members found.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
                <Card
                    key={member.id}
                    className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-muted"
                >
                    <CardContent className="p-0">
                        {/* Image */}
                        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                            {member.image_url ? (
                                <Image
                                    src={member.image_url}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <div className="text-7xl font-bold text-muted-foreground/10 transition-all duration-300 group-hover:text-muted-foreground/20 group-hover:scale-110">
                                        {member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .toUpperCase()}
                                    </div>
                                </div>
                            )}
                            
                            {/* Overlay gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            {/* Name and Role */}
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                                    {member.name}
                                </h3>
                                <p className="text-sm font-medium text-primary/80">
                                    {member.designation}
                                </p>
                            </div>

                            {/* Bio */}
                            {member.bio && (
                                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                    {member.bio}
                                </p>
                            )}

                            {/* Social Links */}
                            <div className="flex items-center gap-3 pt-2">
                                {member.email && (
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
                                        aria-label={`Email ${member.name}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Mail className="h-4 w-4" />
                                    </a>
                                )}
                                {member.phone && (
                                    <a
                                        href={`tel:${member.phone}`}
                                        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
                                        aria-label={`Call ${member.name}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Phone className="h-4 w-4" />
                                    </a>
                                )}
                                {member.linkedin_url && (
                                    <a
                                        href={member.linkedin_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
                                        aria-label={`${member.name}'s LinkedIn`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Linkedin className="h-4 w-4" />
                                    </a>
                                )}
                                {member.twitter_url && (
                                    <a
                                        href={member.twitter_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
                                        aria-label={`${member.name}'s Twitter`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Twitter className="h-4 w-4" />
                                    </a>
                                )}
                                {member.github_url && (
                                    <a
                                        href={member.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
                                        aria-label={`${member.name}'s GitHub`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github className="h-4 w-4" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
