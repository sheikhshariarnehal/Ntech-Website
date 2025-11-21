"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Bot, HeadphonesIcon } from "lucide-react";

export function HomeHero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-0 pt-16 pb-10 sm:pb-0 overflow-hidden bg-background">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-[20%] left-[10%] sm:left-[20%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute top-[30%] right-[10%] sm:right-[20%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-primary/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-muted/50 border border-border backdrop-blur-sm mb-6 sm:mb-8 text-xs sm:text-sm"
                >
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    <span className="font-medium text-muted-foreground">The Future of Digital Solutions</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-display tracking-tight text-foreground mb-4 sm:mb-6 leading-tight px-4 sm:px-0"
                >
                    Empowering Your Business <br className="hidden sm:block" />
                    <span className="sm:inline">with </span><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">NTech Solutions</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0"
                >
                    We provide full-stack development, custom AI automation, and premium access to the world&apos;s best AI tools.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
                >
                    <Link href="/services" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_-5px_rgba(139,92,246,0.6)] transition-all hover:scale-105">
                            Explore Services
                        </Button>
                    </Link>
                    <Link href="/products" className="w-full sm:w-auto">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base transition-all">
                            Get Premium Tools
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-12 px-4 sm:px-0"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                            <p className="text-xl sm:text-2xl font-bold text-foreground">200+</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">Happy Clients</p>
                        </div>
                    </div>

                    <div className="hidden sm:block h-12 w-px bg-border"></div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                            <p className="text-xl sm:text-2xl font-bold text-foreground">AI-Powered</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">Automation</p>
                        </div>
                    </div>

                    <div className="hidden sm:block h-12 w-px bg-border"></div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <HeadphonesIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                            <p className="text-xl sm:text-2xl font-bold text-foreground">24/7</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">Support</p>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
        </section>
    );
}