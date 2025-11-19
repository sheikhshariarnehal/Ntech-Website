export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    slug: string;
    image?: string;
    email?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
    expertise: string[];
    joinedAt: string;
    order?: number;
}
