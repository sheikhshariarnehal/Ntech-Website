"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Github, Twitter, Linkedin, Sparkles, Mail, MapPin, Phone, Send, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";

export function MainFooter() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement newsletter subscription
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 3000);
    };

    const footerLinks = {
        company: [
            { label: "About Us", href: "/about" },
            { label: "Our Team", href: "/team" },
            { label: "Projects", href: "/projects" },
            { label: "Blog", href: "/blog" },
            { label: "Careers", href: "/careers" },
        ],
        services: [
            { label: "Web Development", href: "/services#web-development" },
            { label: "App Development", href: "/services#app-development" },
            { label: "AI Automation", href: "/services#ai-automation" },
            { label: "API Integration", href: "/services#api-integration" },
            { label: "Technical Support", href: "/services#support" },
        ],
        products: [
            { label: "ChatGPT Pro", href: "/products#chatgpt" },
            { label: "Gemini Advanced", href: "/products#gemini" },
            { label: "Canva Pro", href: "/products#canva" },
            { label: "All Products", href: "/products" },
        ],
        legal: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Cookie Policy", href: "/cookies" },
            { label: "Refund Policy", href: "/refund" },
        ],
    };

    const socialLinks = [
        { icon: Github, href: siteConfig.links.github, label: "GitHub" },
        { icon: Twitter, href: siteConfig.links.twitter, label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Youtube, href: "#", label: "YouTube" },
    ];

    return (
        <footer className="border-t border-border/50 bg-background relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent pointer-events-none" />
            
            <div className="container relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 py-12 lg:py-16">
                    {/* Brand & Newsletter - Takes 4 columns on large screens */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2.5 group w-fit">
                            <div className="relative w-9 h-9">
                                <Image 
                                    src={siteConfig.logo} 
                                    alt="Ntech Solutions Logo" 
                                    fill 
                                    className="object-contain rounded-lg" 
                                    priority 
                                />
                            </div>
                            <span className="text-lg font-bold font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                                {siteConfig.name}
                            </span>
                        </Link>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                            Building smart web, mobile, and AI solutions for modern businesses. 
                            Empowering innovation through cutting-edge technology.
                        </p>

                        {/* Newsletter */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-foreground">Stay Updated</h4>
                            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-10"
                                />
                                <Button 
                                    type="submit" 
                                    size="sm" 
                                    className="bg-primary hover:bg-primary/90 shrink-0 h-10 px-4"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                            {subscribed && (
                                <p className="text-xs text-green-400">Thanks for subscribing! 🎉</p>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                <a href="mailto:contact@ntech.com" className="hover:text-primary transition-colors">
                                    contact@ntech.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary" />
                                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                                    +1 (234) 567-890
                                </a>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <span>123 Tech Street, Silicon Valley, CA 94000</span>
                            </div>
                        </div>
                    </div>

                    {/* Company Links - 2 columns */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-foreground">Company</h3>
                        <nav className="flex flex-col gap-2.5">
                            {footerLinks.company.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Services Links - 2 columns */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-foreground">Services</h3>
                        <nav className="flex flex-col gap-2.5">
                            {footerLinks.services.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Products Links - 2 columns */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-foreground">Products</h3>
                        <nav className="flex flex-col gap-2.5">
                            {footerLinks.products.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Legal Links - 2 columns */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-foreground">Legal</h3>
                        <nav className="flex flex-col gap-2.5">
                            {footerLinks.legal.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border/50 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-muted-foreground/70 text-center sm:text-left">
                            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4.5 h-4.5" />
                                </Link>
                            ))}
                        </div>

                        {/* Additional Links */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
                            <Link href="/sitemap.xml" className="hover:text-primary transition-colors">
                                Sitemap
                            </Link>
                            <span>•</span>
                            <Link href="/rss" className="hover:text-primary transition-colors">
                                RSS
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Padding for Fixed Elements */}
            <div className="h-20 sm:h-0" />
        </footer>
    );
}
