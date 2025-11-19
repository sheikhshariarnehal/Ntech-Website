import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Github, Twitter, Linkedin } from "lucide-react";

export function MainFooter() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container py-12 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold tracking-tight">
                                {siteConfig.name}
                                <span className="text-primary">.</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            We build smart web, app, and AI solutions for modern businesses.
                            Helping you automate and scale.
                        </p>
                    </div>

                    {/* Company Column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold">Company</h3>
                        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <Link href="/about" className="hover:text-primary transition-colors">
                                About Us
                            </Link>
                            <Link href="/projects" className="hover:text-primary transition-colors">
                                Projects
                            </Link>
                            <Link href="/blog" className="hover:text-primary transition-colors">
                                Blog
                            </Link>
                            <Link href="/contact" className="hover:text-primary transition-colors">
                                Contact
                            </Link>
                        </nav>
                    </div>

                    {/* Services Column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold">Services</h3>
                        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <Link href="/services/web-development" className="hover:text-primary transition-colors">
                                Web Development
                            </Link>
                            <Link href="/services/app-development" className="hover:text-primary transition-colors">
                                App Development
                            </Link>
                            <Link href="/services/ai-automation" className="hover:text-primary transition-colors">
                                AI Automation
                            </Link>
                            <Link href="/services/technical-support" className="hover:text-primary transition-colors">
                                Technical Support
                            </Link>
                        </nav>
                    </div>

                    {/* Social / Contact Column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold">Connect</h3>
                        <div className="flex gap-4">
                            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            Email: contact@ntech.com
                        </p>
                    </div>
                </div>

                <div className="mt-12 border-t pt-8 text-center md:text-left">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
