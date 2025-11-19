import { HomeHero } from "@/components/sections/home-hero";
import { HomeServices } from "@/components/sections/home-services";
import { HomeProducts } from "@/components/sections/home-products";
import { HomeProjects } from "@/components/sections/home-projects";

export default function Home() {
    return (
        <>
            <HomeHero />
            <HomeServices />
            <HomeProducts />
            <HomeProjects />
        </>
    );
}
