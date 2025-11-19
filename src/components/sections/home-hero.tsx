import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap, BarChart3 } from "lucide-react";

export function HomeHero() {
    return (
        <section className="container flex flex-col gap-10 py-20 md:flex-row md:items-center md:gap-12 lg:py-28">
            <div className="flex flex-1 flex-col items-start gap-6">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-primary"></span>
                    Software & AI-Powered Digital Agency
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl">
                    We build smart web, app, and AI solutions for{" "}
                    <span className="text-primary">modern businesses.</span>
                </h1>
                <p className="text-lg text-muted-foreground lg:text-xl">
                    From custom web & app development to AI automation and digital
                    products. We help you scale with cutting-edge technology and expert
                    support.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Link href="/contact">
                        <Button size="lg" className="w-full sm:w-auto">
                            Book a free consultation
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/projects">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            View our projects
                        </Button>
                    </Link>
                </div>
                <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>End-to-end delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>AI Integration</span>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <div className="relative mx-auto max-w-[500px] lg:max-w-none">
                    <div className="relative rounded-xl border bg-background/50 p-2 shadow-2xl backdrop-blur-sm lg:p-4">
                        <div className="aspect-video rounded-lg bg-muted/50 p-6 flex items-center justify-center border border-dashed">
                            {/* Placeholder for a dashboard image or illustration */}
                            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                                <div className="bg-card p-4 rounded-lg border shadow-sm flex flex-col gap-2">
                                    <Zap className="h-8 w-8 text-yellow-500" />
                                    <div className="text-2xl font-bold">98%</div>
                                    <div className="text-xs text-muted-foreground">Automation Rate</div>
                                </div>
                                <div className="bg-card p-4 rounded-lg border shadow-sm flex flex-col gap-2">
                                    <BarChart3 className="h-8 w-8 text-blue-500" />
                                    <div className="text-2xl font-bold">+240%</div>
                                    <div className="text-xs text-muted-foreground">Growth Metric</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -left-4 -top-4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
                    <div className="absolute -right-4 -bottom-4 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"></div>
                </div>
            </div>
        </section>
    );
}
