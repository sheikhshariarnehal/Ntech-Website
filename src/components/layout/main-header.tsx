"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Sparkles, ChevronDown, Code, Bot, ShoppingBag, Briefcase, Users, Info, Mail, Zap, Rocket, CreditCard } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function MainHeader() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Handle scroll effect
    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu when clicking outside or on a link
    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const megaMenuData = {
        services: {
            title: "Services",
            items: [
                { 
                    icon: Code, 
                    label: "Web Development", 
                    href: "/services#web-development",
                    description: "Custom web applications" 
                },
                { 
                    icon: Bot, 
                    label: "AI Automation", 
                    href: "/services#ai-automation",
                    description: "Intelligent automation solutions" 
                },
                { 
                    icon: Zap, 
                    label: "API Integration", 
                    href: "/services#api-integration",
                    description: "Seamless third-party integrations" 
                },
            ]
        },
        shop: {
            title: "Shop",
            items: [
                { 
                    icon: Rocket, 
                    label: "ChatGPT Pro", 
                    href: "/products#chatgpt",
                    description: "Premium AI subscriptions" 
                },
                { 
                    icon: Sparkles, 
                    label: "Gemini Advanced", 
                    href: "/products#gemini",
                    description: "Google's latest AI model" 
                },
                { 
                    icon: CreditCard, 
                    label: "All Products", 
                    href: "/products",
                    description: "Browse our full catalog" 
                },
            ]
        }
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services", hasMega: true },
        { href: "/products", label: "Shop", hasMega: true },
        { href: "/projects", label: "Projects" },
        { href: "/team", label: "Team" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <>
            <motion.header 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 z-50 w-full transition-all duration-300",
                    scrolled 
                        ? "border-b border-slate-800/50 bg-slate-950/95 backdrop-blur-xl shadow-lg shadow-black/10" 
                        : "border-b border-slate-800/20 bg-slate-950/70 backdrop-blur-md"
                )}
                onMouseLeave={() => setActiveMenu(null)}
            >
                <div className="container flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setIsMenuOpen(false)}>
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/50">
                            <Sparkles className="w-4.5 h-4.5 text-white" />
                        </div>
                        <span className="text-lg font-bold font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                            {siteConfig.name}
                        </span>
                    </Link>

                    {/* Desktop Nav with Mega Menu */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div 
                                key={link.href}
                                className="relative"
                                onMouseEnter={() => link.hasMega && setActiveMenu(link.label.toLowerCase())}
                            >
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg flex items-center gap-1.5",
                                        activeMenu === link.label.toLowerCase() 
                                            ? "text-white bg-slate-800/50" 
                                            : "text-slate-300 hover:text-white hover:bg-slate-800/30"
                                    )}
                                >
                                    {link.label}
                                    {link.hasMega && (
                                        <ChevronDown className={cn(
                                            "w-3.5 h-3.5 transition-transform duration-200",
                                            activeMenu === link.label.toLowerCase() && "rotate-180"
                                        )} />
                                    )}
                                </Link>
                            </div>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link href="/auth/login">
                            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium">
                                Login
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center p-2 lg:hidden hover:bg-slate-800/50 rounded-lg transition-colors"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="h-5 w-5 text-slate-300" />
                        ) : (
                            <Menu className="h-5 w-5 text-slate-300" />
                        )}
                    </motion.button>
                </div>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                    {activeMenu && megaMenuData[activeMenu as keyof typeof megaMenuData] && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 w-full border-t border-slate-800/50 bg-slate-950/95 backdrop-blur-xl shadow-2xl"
                        >
                            <div className="container py-8">
                                <div className="grid grid-cols-3 gap-4 max-w-4xl">
                                    {megaMenuData[activeMenu as keyof typeof megaMenuData].items.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className="group p-4 rounded-xl hover:bg-slate-800/50 transition-all duration-200 border border-transparent hover:border-slate-700"
                                            onClick={() => setActiveMenu(null)}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-purple-600/30 transition-all">
                                                    <item.icon className="w-5 h-5 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                                                        {item.label}
                                                    </h3>
                                                    <p className="text-xs text-slate-400 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Mobile Sidebar Backdrop */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-16 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
                        onClick={() => setIsMenuOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Slide-in Sidebar */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-16 right-0 bottom-0 z-50 w-80 bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl lg:hidden"
                    >
                        <div className="flex flex-col h-full">
                            {/* Sidebar Navigation */}
                            <nav className="flex-1 overflow-y-auto px-6 py-8">
                                <ul className="space-y-2">
                                    {navLinks.map((link, index) => (
                                        <motion.li
                                            key={link.href}
                                            initial={{ x: 50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="flex items-center justify-between px-5 py-3.5 text-base font-medium text-slate-300 rounded-xl transition-all hover:bg-slate-800/50 hover:text-white active:scale-95 group"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <span>{link.label}</span>
                                                {link.hasMega && (
                                                    <ChevronDown className="w-4 h-4 text-slate-500" />
                                                )}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Sidebar Footer - CTA Buttons */}
                            <div className="p-6 border-t border-slate-800/50 bg-slate-900/50 space-y-3">
                                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)} className="block">
                                    <Button variant="outline" size="lg" className="w-full border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block">
                                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium shadow-lg shadow-primary/25">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
