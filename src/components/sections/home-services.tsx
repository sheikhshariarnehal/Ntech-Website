"use client";

import { motion } from "framer-motion";
import { Laptop, Bot, ShoppingCart, ArrowRight, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SERVICES = [
    {
        icon: Laptop,
        title: "Web & App Development",
        desc: "Custom scalable solutions using Next.js and React Native. We build performant, secure, and beautiful applications.",
        features: ["Custom Web Apps", "Mobile Development", "SaaS Platforms", "API Integration"],
        color: "text-blue-400",
        gradient: "from-blue-500/20 to-transparent",
        delay: 0
    },
    {
        icon: Bot,
        title: "AI Automation",
        desc: "Streamline your workflow with custom AI agents and Chatbots. Reduce costs and increase efficiency with intelligent automation.",
        features: ["Custom Chatbots", "Workflow Automation", "Data Analysis", "AI Integration"],
        color: "text-purple-400",
        gradient: "from-purple-500/20 to-transparent",
        delay: 0.1
    },
    {
        icon: ShoppingCart,
        title: "Premium Subscriptions",
        desc: "Instant access to ChatGPT Pro, Gemini Pro, Veo3, and Canva Pro at competitive rates. Get the tools you need for less.",
        features: ["Instant Delivery", "24/7 Support", "Competitive Pricing", "Secure Payment"],
        color: "text-emerald-400",
        gradient: "from-emerald-500/20 to-transparent",
        delay: 0.2
    }
];

export function HomeServices() {
    return (
        <section className="py-24 bg-slate-950 relative" id="services">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">Our Expertise</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Bridging the gap between complex technology and accessible solutions.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: service.delay }}
                        >
                            <Card className="bg-slate-900/50 border-slate-800 h-full hover:border-slate-600 transition-all duration-300 group hover:-translate-y-2 overflow-hidden relative">
                                <div className={`absolute inset-0 bg-gradient-to-b ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                
                                <CardHeader>
                                    <div className={`w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${service.color}`}>
                                        <service.icon className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="text-2xl text-white">{service.title}</CardTitle>
                                    <CardDescription className="text-slate-400 text-base mt-2">
                                        {service.desc}
                                    </CardDescription>
                                </CardHeader>
                                
                                <CardContent>
                                    <ul className="space-y-3">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                                <Check className={`w-4 h-4 ${service.color}`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter>
                                    <Button variant="ghost" className="p-0 text-slate-300 hover:text-white group-hover:translate-x-2 transition-transform">
                                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
