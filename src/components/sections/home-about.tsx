import { CheckCircle2 } from "lucide-react";

const stats = [
    { label: "Projects Shipped", value: "150+" },
    { label: "Client Retention", value: "98%" },
    { label: "Avg. Response Time", value: "< 2h" },
    { label: "Team Members", value: "12" },
];

export function HomeAbout() {
    return (
        <section className="container py-20 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="flex flex-col justify-center">
                    <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
                        A digital agency built for software-era businesses.
                    </h2>
                    <p className="mb-6 text-lg text-muted-foreground">
                        We specialize in helping startups and small-to-medium businesses
                        navigate the complex digital landscape. From building robust web
                        applications to integrating cutting-edge AI automation, we are your
                        technical partner for growth.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="mt-1 h-5 w-5 text-primary" />
                            <div>
                                <span className="font-medium text-foreground">
                                    End-to-end delivery.
                                </span>{" "}
                                <span className="text-muted-foreground">
                                    We handle everything from design and development to deployment
                                    and maintenance.
                                </span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="mt-1 h-5 w-5 text-primary" />
                            <div>
                                <span className="font-medium text-foreground">
                                    AI-First Approach.
                                </span>{" "}
                                <span className="text-muted-foreground">
                                    Leverage the power of OpenAI, Gemini, and custom models to
                                    automate workflows.
                                </span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="mt-1 h-5 w-5 text-primary" />
                            <div>
                                <span className="font-medium text-foreground">
                                    Transparent Communication.
                                </span>{" "}
                                <span className="text-muted-foreground">
                                    Direct access to engineers, clear timelines, and no hidden
                                    costs.
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex flex-col items-center justify-center rounded-xl border bg-muted/30 p-8 text-center transition-colors hover:bg-muted/50"
                        >
                            <div className="text-3xl font-bold tracking-tight md:text-4xl">
                                {stat.value}
                            </div>
                            <div className="mt-2 text-sm font-medium text-muted-foreground">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
