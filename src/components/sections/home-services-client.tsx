"use client";

import { motion } from "framer-motion";
import { Laptop, Bot, ShoppingCart, ArrowRight, Check, Code, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Service {
    id: string;
    name: string;
    short_description: string | null;
    icon: string | null;
    features: string[] | null;
    slug: string;
}

interface HomeServicesClientProps {
    services: Service[];
}

// Map slugs to colors and gradients
const SERVICE_STYLES: Record<string, { color: string; gradient: string; icon: any }> = {
    'web-development': {
        color: 'text-blue-400',
        gradient: 'from-blue-500/20 to-transparent',
        icon: Laptop
    },
    'mobile-app-development': {
        color: 'text-purple-400',
        gradient: 'from-purple-500/20 to-transparent',
        icon: Code
    },
    'ai-automation': {
        color: 'text-purple-400',
        gradient: 'from-purple-500/20 to-transparent',
        icon: Bot
    },
    'seo-optimization': {
        color: 'text-green-400',
        gradient: 'from-green-500/20 to-transparent',
        icon: Sparkles
    },
    'ui-ux-design': {
        color: 'text-pink-400',
        gradient: 'from-pink-500/20 to-transparent',
        icon: Sparkles
    },
    'default': {
        color: 'text-emerald-400',
        gradient: 'from-emerald-500/20 to-transparent',
        icon: ShoppingCart
    }
};

export function HomeServicesClient({ services }: HomeServicesClientProps) {
    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background relative" id="services">
            <div className="container">
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground mb-3 sm:mb-4">Our Expertise</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
                        Bridging the gap between complex technology and accessible solutions.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {services.map((service, index) => {
                        const style = SERVICE_STYLES[service.slug] || SERVICE_STYLES.default;
                        const IconComponent = style.icon;
                        
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="bg-card/50 border-border h-full hover:border-primary/50 transition-all duration-300 group hover:-translate-y-2 overflow-hidden relative">
                                    <div className={`absolute inset-0 bg-gradient-to-b ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                    
                                    <CardHeader>
                                        <div className={`w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${style.color}`}>
                                            {service.icon ? (
                                                <Image 
                                                    src={service.icon} 
                                                    alt={service.name}
                                                    width={24}
                                                    height={24}
                                                    className="w-6 h-6 object-contain"
                                                />
                                            ) : (
                                                <IconComponent className="w-6 h-6" />
                                            )}
                                        </div>
                                        <CardTitle className="text-2xl text-foreground">{service.name}</CardTitle>
                                        <CardDescription className="text-muted-foreground text-base mt-2">
                                            {service.short_description || ''}
                                        </CardDescription>
                                    </CardHeader>
                                    
                                    <CardContent>
                                        {service.features && service.features.length > 0 && (
                                            <ul className="space-y-3">
                                                {service.features.map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                                                        <Check className={`w-4 h-4 ${style.color} flex-shrink-0`} />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </CardContent>

                                    <CardFooter>
                                        <Button 
                                            variant="ghost" 
                                            className="p-0 text-slate-300 hover:text-white group-hover:translate-x-2 transition-transform"
                                            asChild
                                        >
                                            <a href={`/services/${service.slug}`}>
                                                Learn More <ArrowRight className="w-4 h-4 ml-2" />
                                            </a>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
