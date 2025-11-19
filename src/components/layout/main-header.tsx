"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MainHeader() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/products", label: "Products" },
        { href: "/projects", label: "Projects" },
        { href: "/team", label: "Team" },
        { href: "/about", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                            <span className="text-xl font-bold tracking-tight">
                                {siteConfig.name}
                                <span className="text-primary">.</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="transition-colors hover:text-primary text-muted-foreground"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/auth/login">
                            <Button variant="ghost" size="sm">
                                Login
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="sm">Get a quote</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="flex items-center justify-center p-2 md:hidden hover:bg-muted rounded-md transition-colors"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Sidebar Backdrop */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Slide-in Sidebar */}
            <aside
                className={cn(
                    "fixed top-16 right-0 bottom-0 z-50 w-72 bg-background border-l shadow-2xl md:hidden transform transition-transform duration-300 ease-in-out overflow-hidden",
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Navigation */}
                    <nav className="flex-1 overflow-y-auto px-4 py-6">
                        <ul className="space-y-1">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all hover:bg-muted hover:text-primary active:scale-95"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Sidebar Footer - CTA Buttons */}
                    <div className="p-4 border-t bg-muted/30 space-y-2">
                        <Link href="/auth/login" onClick={() => setIsMenuOpen(false)} className="block">
                            <Button variant="outline" size="lg" className="w-full">
                                Login
                            </Button>
                        </Link>
                        <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block">
                            <Button size="lg" className="w-full">Get a quote</Button>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
