import { HomeHero } from "@/components/sections/home-hero";
import { HomeClients } from "@/components/sections/home-clients";
import { HomeServices } from "@/components/sections/home-services";
import { HomeProjects } from "@/components/sections/home-projects";
import { HomeBlog } from "@/components/sections/home-blog";
import { HomeAbout } from "@/components/sections/home-about";
import { HomeCTA } from "@/components/sections/home-cta";
import { HomeTechnologies } from "@/components/sections/home-technologies";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <HomeHero />
            <HomeClients />
            <HomeServices />
            <HomeProjects />
            <HomeBlog />
            <HomeAbout />
            <HomeTechnologies />
            <HomeCTA />
        </main>
    );
}