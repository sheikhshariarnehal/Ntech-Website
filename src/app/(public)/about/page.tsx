import { Metadata } from "next";
import { Code2, Zap, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { generatePageSEO } from "@/config/seo";

export const metadata: Metadata = generatePageSEO({
    title: "About Us - Technical Solutions & Digital Products",
    description: "Ntech provides comprehensive technical support including Web & App Development, AI Automation, and premium digital products like ChatGPT Pro, Gemini Pro, Veo3, and Canva Pro. Expert team with 24/7 support and competitive pricing.",
    path: "/about",
});

export default function AboutPage() {
    // Structured data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Ntech",
        "description": "Ntech provides comprehensive technical support including Web & App Development, AI Automation, and premium digital products.",
        "url": "https://ntech.com/about",
        "mainEntity": {
            "@type": "Organization",
            "name": "Ntech",
            "description": "Technical Solutions & Digital Products Provider",
            "url": "https://ntech.com",
            "logo": "https://ntech.com/icons/favicon.webp",
            "foundingDate": "2020",
            "knowsAbout": [
                "Web Development",
                "App Development",
                "AI Automation",
                "Digital Products",
                "ChatGPT Pro",
                "Gemini Pro",
                "Veo3",
                "Canva Pro"
            ],
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Technical Services and Digital Products",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Web Development",
                            "description": "Custom websites and web applications built with modern technologies"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "App Development",
                            "description": "Native and cross-platform mobile applications"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "AI Automation",
                            "description": "Intelligent automation solutions to streamline workflows"
                        }
                    }
                ]
            }
        }
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b">
                <div className="container px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>Your Technical Partner</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 px-4 sm:px-0">
                            Empowering Businesses with{" "}
                            <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Cutting-Edge Technology
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4 sm:px-0">
                            We provide comprehensive technical support and premium digital products 
                            to help businesses thrive in the digital age.
                        </p>
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                            What We Do
                        </h2>
                        <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
                            We offer a comprehensive suite of technical services and premium digital products
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                        {/* Technical Services */}
                        <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border bg-card p-6 sm:p-8 transition-all hover:shadow-lg hover:border-primary/50">
                            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-primary/5 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 transition-transform group-hover:scale-150" />
                            <div className="relative">
                                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 text-primary mb-3 sm:mb-4">
                                    <Code2 className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Technical Support Services</h3>
                                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                                    Comprehensive technical solutions tailored to your business needs
                                </p>
                                <ul className="space-y-2 sm:space-y-3">
                                    <li className="flex items-start gap-2 sm:gap-3">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm">
                                            <strong className="font-semibold">Web Development:</strong> Custom websites and web applications built with modern technologies
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 sm:gap-3">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm">
                                            <strong className="font-semibold">App Development:</strong> Native and cross-platform mobile applications
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 sm:gap-3">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm">
                                            <strong className="font-semibold">AI Automation:</strong> Intelligent automation solutions to streamline your workflows
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Digital Products */}
                        <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border bg-card p-6 sm:p-8 transition-all hover:shadow-lg hover:border-primary/50">
                            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-primary/5 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 transition-transform group-hover:scale-150" />
                            <div className="relative">
                                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 text-primary mb-3 sm:mb-4">
                                    <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Premium Digital Products</h3>
                                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                                    Access to the best AI and design tools at competitive prices
                                </p>
                                <ul className="space-y-2 sm:space-y-3">
                                    <li className="flex items-start gap-2 sm:gap-3">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm">
                                            <strong className="font-semibold">ChatGPT Pro:</strong> Advanced AI conversations and content generation
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 sm:gap-3">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm">
                                            <strong className="font-semibold">Gemini Pro:</strong> Google&apos;s powerful AI assistant
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 sm:gap-3">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm">
                                            <strong className="font-semibold">Veo3:</strong> Next-generation video creation and editing
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 sm:gap-3">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm">
                                            <strong className="font-semibold">Canva Pro:</strong> Professional design tools for everyone
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission & Values */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/50">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                                Our Mission
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed px-4 sm:px-0">
                                To empower businesses with innovative technical solutions and premium digital tools 
                                that drive growth, efficiency, and success in the digital era.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
                            <div className="text-center p-5 sm:p-6 rounded-xl bg-background border">
                                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 text-primary mb-3 sm:mb-4">
                                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>
                                <h3 className="font-semibold text-base sm:text-lg mb-2">Innovation</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    Leveraging cutting-edge technologies to deliver modern solutions
                                </p>
                            </div>
                            <div className="text-center p-5 sm:p-6 rounded-xl bg-background border">
                                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 text-primary mb-3 sm:mb-4">
                                    <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>
                                <h3 className="font-semibold text-base sm:text-lg mb-2">Quality</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    Commitment to excellence in every project we undertake
                                </p>
                            </div>
                            <div className="text-center p-5 sm:p-6 rounded-xl bg-background border sm:col-span-2 md:col-span-1">
                                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 text-primary mb-3 sm:mb-4">
                                    <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>
                                <h3 className="font-semibold text-base sm:text-lg mb-2">Efficiency</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    Streamlined processes that save time and maximize results
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                                Why Choose Ntech?
                            </h2>
                            <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
                                We combine technical expertise with premium products to deliver complete solutions
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            <div className="flex gap-3 sm:gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 text-primary">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Expert Team</h3>
                                    <p className="text-sm sm:text-base text-muted-foreground">
                                        Skilled professionals with years of experience in web development, 
                                        app development, and AI automation.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 sm:gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 text-primary">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Competitive Pricing</h3>
                                    <p className="text-sm sm:text-base text-muted-foreground">
                                        Affordable rates for premium digital products and technical services 
                                        without compromising quality.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 sm:gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 text-primary">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">24/7 Support</h3>
                                    <p className="text-sm sm:text-base text-muted-foreground">
                                        Round-the-clock customer support to ensure your business 
                                        runs smoothly at all times.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 sm:gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 text-primary">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Proven Track Record</h3>
                                    <p className="text-sm sm:text-base text-muted-foreground">
                                        Successfully delivered hundreds of projects to satisfied clients 
                                        across various industries.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 px-4 sm:px-0">
                            Let&apos;s discuss how our technical services and premium digital products 
                            can help you achieve your goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                            <Button asChild size="lg" className="text-sm sm:text-base w-full sm:w-auto">
                                <Link href="/contact">
                                    Get in Touch
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="text-sm sm:text-base w-full sm:w-auto">
                                <Link href="/services">
                                    View Services
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
}
