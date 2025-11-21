"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

const POSTS = [
    {
        title: "How AI is changing Web Dev",
        excerpt: "The landscape of frontend development is shifting rapidly with the introduction of generative AI tools.",
        date: "Nov 15, 2025",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2832&auto=format&fit=crop"
    },
    {
        title: "Top 5 Features of Gemini Pro",
        excerpt: "Exploring the capabilities of the latest multimodal models and how they compare to the competition.",
        date: "Nov 12, 2025",
        category: "AI Trends",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
    },
    {
        title: "Why you need a custom App",
        excerpt: "Off-the-shelf solutions might be holding your business back. Here&apos;s why custom software is an investment.",
        date: "Nov 08, 2025",
        category: "Business",
        image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2670&auto=format&fit=crop"
    }
];

export function HomeBlog() {

    return (
        <section className="py-24 bg-slate-950 border-t border-slate-900">
            <div className="container mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-white">Latest Insights</h2>
                    <Button variant="link" className="text-primary hidden md:flex">
                        View all articles <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {POSTS.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="bg-transparent border-none shadow-none group cursor-pointer">
                                <div className="relative rounded-xl overflow-hidden mb-4 aspect-[4/3]">
                                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-slate-950/80 backdrop-blur-sm rounded-full border border-slate-800 text-xs font-medium text-white">
                                        {post.category}
                                    </div>
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <CardHeader className="p-0 mb-2">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                        <Calendar className="w-3 h-3" />
                                        {post.date}
                                    </div>
                                    <CardTitle className="text-xl text-white group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <p className="text-slate-400 text-sm line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                </CardContent>
                                <CardFooter className="p-0 mt-4">
                                    <span className="text-sm font-medium text-primary flex items-center group-hover:underline">
                                        Read More <ArrowRight className="w-3 h-3 ml-1" />
                                    </span>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 md:hidden flex justify-center">
                    <Button variant="link" className="text-primary">
                        View all articles <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
