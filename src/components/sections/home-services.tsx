import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
    {
        title: "Web Development",
        description:
            "Custom websites and web applications built with modern technologies like Next.js and React.",
        slug: "web-development",
    },
    {
        title: "App Development",
        description:
            "Native and cross-platform mobile applications for iOS and Android.",
        slug: "app-development",
    },
    {
        title: "AI Automation",
        description:
            "Streamline your business processes with custom AI solutions and automation workflows.",
        slug: "ai-automation",
    },
];

export function HomeServices() {
    return (
        <section
            id="services"
            className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                    Services
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    We offer a wide range of technical services to help your business grow.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                {services.map((service) => (
                    <Card key={service.slug} className="flex flex-col justify-between">
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                            <p className="text-muted-foreground">{service.description}</p>
                        </div>
                        <div className="p-6 pt-0">
                            <Link href={`/services/${service.slug}`}>
                                <Button variant="ghost" className="w-full">
                                    Learn more
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
