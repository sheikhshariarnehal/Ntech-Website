"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Code, Database, Cpu, Layers, Globe, Zap } from "lucide-react";

const TECH_STACK = [
    { name: "Next.js", icon: Globe, desc: "Full-Stack Framework" },
    { name: "React", icon: Code, desc: "UI Library" },
    { name: "Python", icon: Layers, desc: "AI Backend" },
    { name: "OpenAI", icon: Cpu, desc: "LLM Integration" },
    { name: "Supabase", icon: Database, desc: "Real-time Database" },
    { name: "Tailwind", icon: Zap, desc: "Rapid Styling" },
];

export function HomeTechnologies() {
    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background border-t border-border">
            <div className="container">
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground mb-3 sm:mb-4">Powered by Modern Tech</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
                        We build on top of the most reliable and scalable technologies.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                    {TECH_STACK.map((tech, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Card className="bg-card/30 border-border hover:bg-card hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center p-4 sm:p-6 h-28 sm:h-32 group">
                                <tech.icon className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground group-hover:text-primary transition-colors mb-2 sm:mb-3" />
                                <span className="text-sm sm:text-base text-foreground font-medium font-display">{tech.name}</span>
                                <span className="text-xs text-muted-foreground/70 mt-0.5 sm:mt-1">{tech.desc}</span>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
