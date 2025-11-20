export interface TeamMember {
    id: string;
    name: string;
    designation: string;
    bio: string | null;
    email: string | null;
    phone: string | null;
    linkedin_url: string | null;
    twitter_url: string | null;
    github_url: string | null;
    image_url: string | null;
    order_position: number | null;
    is_active: boolean | null;
    created_at: string;
    updated_at: string;
}

export interface TeamMemberDisplay {
    id: string;
    name: string;
    designation: string;
    bio: string;
    email?: string;
    phone?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    githubUrl?: string;
    imageUrl?: string;
    orderPosition: number;
    isActive: boolean;
}
