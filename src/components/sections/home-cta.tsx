"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HomeCTA() {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

            <div className="container mx-auto relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold font-display text-foreground mb-6 tracking-tight"
                >
                    Ready to upgrade your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">digital presence?</span>
                </motion.h2>
                
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
                >
                    Join hundreds of innovative companies leveraging our tech to scale faster.
                </motion.p>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/contact">
                        <Button size="lg" className="h-14 px-8 text-lg shadow-lg">
                            Book a Consultation
                        </Button>
                    </Link>
                    <Link href="/products">
                        <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
                            Visit Store <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
