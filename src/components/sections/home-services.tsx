import Link from "next/link";
import {
    Code2,
    Smartphone,
    Bot,
    Headphones,
    Cloud,
    Sparkles,
    ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
    {
        icon: Code2,
        title: "Web Development",
        description:
            "Custom websites and web applications built with Next.js, React, and modern technologies.",
        href: "/services/web-development",
    },
    {
        icon: Smartphone,
        title: "App Development",
        description:
            "Native and cross-platform mobile apps for iOS and Android that deliver seamless user experiences.",
        href: "/services/app-development",
    },
    {
        icon: Bot,
        title: "AI Automation",
        description:
            "Streamline your business processes with custom AI chatbots, workflows, and automation tools.",
        href: "/services/ai-automation",
    },
    {
        icon: Headphones,
        title: "Technical Support",
        description:
            "24/7 maintenance and support to keep your digital infrastructure running smoothly.",
        href: "/services/technical-support",
    },
    {
        icon: Cloud,
        title: "SaaS Integration",
        description:
            "Seamlessly integrate third-party tools and APIs to enhance your business capabilities.",
        href: "/services/saas-integration",
    },
    {
        icon: Sparkles,
        title: "Digital Products",
        description:
            "Access premium digital tools and subscriptions like ChatGPT Pro, Gemini Pro, and more.",
        href: "/products",
    },
];

export function HomeServices() {
    return (
        <section className="container py-20 lg:py-28">
            <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                <div className="max-w-2xl">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                        What we do
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        We combine engineering excellence with AI innovation to deliver
                        comprehensive digital solutions for startups and enterprises.
                    </p>
                </div>
                <Link
                    href="/services"
                    className="group flex items-center font-medium text-primary"
                >
                    View all services
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <Card
                        key={service.title}
                        className="group relative overflow-hidden p-6 transition-all hover:shadow-lg"
                    >
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <service.icon className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                        <p className="mb-4 text-muted-foreground">{service.description}</p>
                        <Link
                            href={service.href}
                            className="inline-flex items-center text-sm font-medium text-primary"
                        >
                            Learn more <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                    </Card>
                ))}
            </div>
        </section>
    );
}
