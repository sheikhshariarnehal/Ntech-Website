import {
    Code2,
    Database,
    Globe,
    Server,
    Cpu,
    Smartphone,
    Cloud,
    Zap,
    Lock,
    Layout,
    Terminal,
    Layers,
} from "lucide-react";

const technologies = [
    { name: "Next.js", icon: Globe },
    { name: "React", icon: Code2 },
    { name: "TypeScript", icon: Terminal },
    { name: "Tailwind CSS", icon: Layout },
    { name: "Node.js", icon: Server },
    { name: "Supabase", icon: Database },
    { name: "PostgreSQL", icon: Database },
    { name: "OpenAI", icon: Cpu },
    { name: "Stripe", icon: Lock },
    { name: "Vercel", icon: Cloud },
    { name: "React Native", icon: Smartphone },
    { name: "GraphQL", icon: Layers },
];

export function HomeTechnologies() {
    return (
        <section className="py-12 lg:py-16 overflow-hidden">
            <div className="container mb-10 text-center">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Powered by modern tech stack
                </p>
            </div>

            <div className="relative flex w-full overflow-hidden">
                {/* First copy of the list */}
                <div className="flex animate-scroll gap-16 whitespace-nowrap px-8">
                    {technologies.map((tech, index) => (
                        <div
                            key={`tech-1-${index}`}
                            className="flex items-center gap-3 text-muted-foreground/60 transition-all hover:text-primary hover:scale-110 duration-300"
                        >
                            <tech.icon className="h-10 w-10" />
                            <span className="text-xl font-bold hidden md:inline-block">{tech.name}</span>
                        </div>
                    ))}
                    {/* Duplicate list for seamless loop */}
                    {technologies.map((tech, index) => (
                        <div
                            key={`tech-2-${index}`}
                            className="flex items-center gap-3 text-muted-foreground/60 transition-all hover:text-primary hover:scale-110 duration-300"
                        >
                            <tech.icon className="h-10 w-10" />
                            <span className="text-xl font-bold hidden md:inline-block">{tech.name}</span>
                        </div>
                    ))}
                </div>

                {/* Gradient masks for fade effect */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent"></div>
            </div>
        </section>
    );
}
