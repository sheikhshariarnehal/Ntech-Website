import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeHero() {
    return (
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                    Technical support, web & app development, and AI automation for modern
                    businesses.
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    We help you build, scale, and automate your business with cutting-edge
                    technology and expert support.
                </p>
                <div className="space-x-4">
                    <Link href="/contact">
                        <Button size="lg">Get Started</Button>
                    </Link>
                    <Link href="/projects">
                        <Button variant="outline" size="lg">
                            View our work
                        </Button>
                    </Link>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                    <span>Web Development</span>
                    <span>•</span>
                    <span>App Development</span>
                    <span>•</span>
                    <span>AI Automation</span>
                    <span>•</span>
                    <span>Digital Subscriptions</span>
                </div>
            </div>
        </section>
    );
}
