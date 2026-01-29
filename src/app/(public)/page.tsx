import { HomeHero } from "@/components/sections/home-hero";
import { HomeClients } from "@/components/sections/home-clients";
import { HomeServices } from "@/components/sections/home-services";
import { HomeProjects } from "@/components/sections/home-projects";
import { HomeBlog } from "@/components/sections/home-blog";
import { HomeAbout } from "@/components/sections/home-about";
import { HomeCTA } from "@/components/sections/home-cta";
import { HomeTechnologies } from "@/components/sections/home-technologies";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
    const supabase = await createClient();
    const { data: companies } = await supabase
        .from('trusted_companies')
        .select('id, name, logo_url, website_url')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    return (
        <>
            <HomeHero />
            <HomeClients companies={companies || []} />
            <HomeServices />
            <HomeProjects />
            <HomeTechnologies />
            <HomeAbout />
            <HomeBlog />
            <HomeCTA />
        </>
    );
}