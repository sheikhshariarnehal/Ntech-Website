"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PROJECTS = [
    {
        title: "FinTech Dashboard",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        description: "A comprehensive dashboard for financial data visualization using Recharts and Next.js."
    },
    {
        title: "AI Customer Support",
        category: "AI Automation",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2606&auto=format&fit=crop",
        description: "Intelligent chatbot system reducing support tickets by 60%."
    },
    {
        title: "E-Commerce Platform",
        category: "Full Stack",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2664&auto=format&fit=crop",
        description: "Modern e-commerce solution with real-time inventory management."
    },
    {
        title: "HealthTech App",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
        description: "Patient monitoring application ensuring real-time health tracking."
    }
];

export function HomeProjects() {
    return (
        <section className="py-24 bg-background border-t border-border">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4">Featured Projects</h2>
                        <p className="text-muted-foreground max-w-xl text-lg">
                            See how we&apos;ve transformed ideas into powerful digital solutions.
                        </p>
                    </div>
                    <Button variant="outline">
                        View All Work
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-xl aspect-[16/9] mb-6">
                                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                                
                                <div className="absolute bottom-0 left-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-primary text-sm font-medium mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                                    <p className="text-muted-foreground text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 hidden md:block">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
