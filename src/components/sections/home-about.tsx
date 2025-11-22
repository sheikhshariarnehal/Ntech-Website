"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function HomeAbout() {
    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden px-4 sm:px-6">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
                    
                    {/* Text Content */}
                    <motion.div 
                        className="lg:w-1/2 w-full"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                            Our Mission
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground mb-4 sm:mb-6 leading-tight">
                            Bridging the gap between <br className="hidden sm:block" />
                            <span className="text-primary">Complex Tech</span> and <br className="hidden sm:block" />
                            <span className="text-foreground">Accessible Solutions.</span>
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
                            At NovaTech, we believe that advanced technology shouldn&apos;t be reserved for tech giants. 
                            Our mission is to democratize access to powerful AI tools and custom development services, 
                            empowering businesses of all sizes to innovate and grow.
                        </p>
                        
                        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                            {[
                                "Enterprise-grade Security",
                                "Scalable Architecture",
                                "24/7 Expert Support",
                                "Custom AI Model Tuning"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 sm:gap-3">
                                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                                    <span className="text-foreground text-sm sm:text-base">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Button size="lg" className="font-medium w-full sm:w-auto">
                            Learn More About Us
                        </Button>
                    </motion.div>

                    {/* Image/Visual Content */}
                    <motion.div 
                        className="lg:w-1/2 w-full relative"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative aspect-square max-w-md mx-auto">
                            {/* Abstract glowing orbs */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-[80px] mix-blend-screen animate-pulse" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/30 rounded-full blur-[80px] mix-blend-screen animate-pulse" style={{ animationDelay: "2s" }} />
                            
                            {/* Image Container */}
                            <div className="relative z-10 rounded-2xl overflow-hidden border border-border shadow-2xl bg-card/50 backdrop-blur-sm">
                                <img 
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop" 
                                    alt="Team working on AI" 
                                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                                />
                                
                                {/* Overlay Stats Card */}
                                <div className="absolute bottom-6 left-6 right-6 p-4 bg-background/80 backdrop-blur-md border border-border rounded-xl flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Clients Served</p>
                                        <p className="text-2xl font-bold text-foreground">200+</p>
                                    </div>
                                    <div className="h-8 w-[1px] bg-slate-800" />
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider">Projects Shipped</p>
                                        <p className="text-2xl font-bold text-white">500+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
