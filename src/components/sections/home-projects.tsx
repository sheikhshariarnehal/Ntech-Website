import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/shared/badge";

const projects = [
    {
        title: "E-commerce Platform",
        summary: "A full-featured online store with payment integration.",
        tags: ["Next.js", "Stripe", "Supabase"],
        slug: "ecommerce-platform",
    },
    {
        title: "Corporate Website",
        summary: "Modern corporate website for a leading finance firm.",
        tags: ["React", "Tailwind", "CMS"],
        slug: "corporate-website",
    },
    {
        title: "AI Chatbot",
        summary: "Customer support chatbot powered by LLMs.",
        tags: ["Python", "OpenAI", "FastAPI"],
        slug: "ai-chatbot",
    },
];

export function HomeProjects() {
    return (
        <section
            id="projects"
            className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                    Featured Projects
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Check out some of our recent work.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.slug} className="flex flex-col justify-between">
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                            <p className="text-muted-foreground mb-4">{project.summary}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            <Link href={`/projects/${project.slug}`}>
                                <Button variant="outline" className="w-full">
                                    View Details
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
