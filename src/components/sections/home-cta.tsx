"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HomeCTA() {
    return (
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background relative overflow-hidden px-4 sm:px-6">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

            <div className="container mx-auto relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-display text-foreground mb-4 sm:mb-6 tracking-tight"
                >
                    Ready to upgrade your <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">digital presence?</span>
                </motion.h2>
                
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10"
                >
                    Join hundreds of innovative companies leveraging our tech to scale faster.
                </motion.p>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
                >
                    <Link href="/contact" className="w-full sm:w-auto">
                        <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg shadow-lg w-full sm:w-auto">
                            Book a Consultation
                        </Button>
                    </Link>
                    <Link href="/products" className="w-full sm:w-auto">
                        <Button variant="outline" size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg w-full sm:w-auto">
                            Visit Store <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
