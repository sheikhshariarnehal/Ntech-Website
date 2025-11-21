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
        <section className="py-24 bg-slate-950 border-t border-slate-900">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">Powered by Modern Tech</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        We build on top of the most reliable and scalable technologies.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {TECH_STACK.map((tech, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Card className="bg-slate-900/30 border-slate-800 hover:bg-slate-900 hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center p-6 h-32 group">
                                <tech.icon className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors mb-3" />
                                <span className="text-white font-medium font-display">{tech.name}</span>
                                <span className="text-xs text-slate-500 mt-1">{tech.desc}</span>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
