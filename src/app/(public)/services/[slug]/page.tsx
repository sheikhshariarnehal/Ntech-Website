import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { getServiceBySlug } from "@/features/services/api/getServiceBySlug";
import { Metadata } from "next";
import { 
    Code, 
    Smartphone, 
    Bot, 
    Palette, 
    LineChart, 
    Sparkles,
    CheckCircle2, 
    ArrowRight,
    Clock,
    Users,
    Shield
} from "lucide-react";

// Revalidate service pages every hour
export const revalidate = 3600;

interface ServicePageProps {
    params: {
        slug: string;
    };
}

const iconMap: Record<string, any> = {
  "web-development": Code,
  "mobile-app-development": Smartphone,
  "app-development": Smartphone,
  "ai-automation": Bot,
  "google-gemini-pro": Sparkles,
  "seo-optimization": LineChart,
  "seo": LineChart,
  "ui-ux-design": Palette,
};

export async function generateMetadata({
    params,
}: ServicePageProps): Promise<Metadata> {
    const service = await getServiceBySlug(params.slug);

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: service.seo_title || service.name,
        description: service.seo_description || service.short_description || "",
        keywords: service.seo_keywords || [],
    };
}

export default async function ServicePage({ params }: ServicePageProps) {
    const service = await getServiceBySlug(params.slug);

    if (!service) {
        notFound();
    }

    const Icon = iconMap[service.slug] || Code;
    const isIconUrl = service.icon?.startsWith("http") || service.icon?.startsWith("/");

    return (
        <div className="min-h-screen">
            <div className="container py-8 md:py-12 lg:py-16">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 mb-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary overflow-hidden flex-shrink-0">
                                {isIconUrl && service.icon ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img 
                                        src={service.icon} 
                                        alt={service.name} 
                                        className="w-10 h-10 object-contain" 
                                    />
                                ) : (
                                    <Icon className="w-10 h-10" />
                                )}
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                                {service.name}
                            </h1>
                        </div>
                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                            {service.short_description}
                        </p>
                        
                        {/* Full Description - moved here */}
                        {service.full_description && (
                            <div className="prose prose-lg dark:prose-invert max-w-none pt-2">
                                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                    {service.full_description}
                                </p>
                            </div>
                        )}
                    </div>
                    
                    {/* CTA Card - Sticky on desktop */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <Card className="border-2 shadow-lg">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl sm:text-2xl">Get Started</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {service.starting_price && (
                                    <div className="pb-4 border-b">
                                        <p className="text-sm text-muted-foreground mb-1">Starting at</p>
                                        <p className="text-3xl sm:text-4xl font-bold">
                                            ${service.starting_price}
                                        </p>
                                    </div>
                                )}
                                
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        </div>
                                        <span className="text-sm">Professional Quality</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-4 h-4 text-blue-500" />
                                        </div>
                                        <span className="text-sm">Timely Delivery</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                            <Users className="w-4 h-4 text-purple-500" />
                                        </div>
                                        <span className="text-sm">Expert Team</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                            <Shield className="w-4 h-4 text-orange-500" />
                                        </div>
                                        <span className="text-sm">100% Satisfaction</span>
                                    </div>
                                </div>

                                <Link href="/contact" className="block">
                                    <Button size="lg" className="w-full group">
                                        Request This Service
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-4xl space-y-12">
                    {/* Features Grid */}
                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6">What's Included</h2>
                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                            {getServiceFeatures(service.slug).map((feature, idx) => (
                                <Card key={idx} className="border-muted/60 hover:border-primary/50 transition-colors">
                                    <CardContent className="pt-6 pb-6">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <h3 className="font-semibold mb-1 text-sm sm:text-base">{feature.title}</h3>
                                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="rounded-2xl bg-gradient-to-br from-muted/80 to-muted/40 p-8 sm:p-12 text-center space-y-6">
                        <h2 className="text-2xl sm:text-3xl font-bold">Ready to Get Started?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Let's discuss your project and create a custom solution that fits your needs and budget.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                            <Link href="/contact">
                                <Button size="lg" className="font-semibold w-full sm:w-auto">
                                    Contact Us Today
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                    View All Services
                                </Button>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

// Helper function to get service-specific features
function getServiceFeatures(slug: string) {
    const features: Record<string, Array<{title: string, description: string}>> = {
        "web-development": [
            { title: "Responsive Design", description: "Mobile-first approach ensuring perfect display on all devices" },
            { title: "Modern Tech Stack", description: "Built with Next.js, React, and cutting-edge technologies" },
            { title: "SEO Optimized", description: "Search engine friendly architecture for better visibility" },
            { title: "Fast Performance", description: "Optimized for speed with lazy loading and code splitting" },
            { title: "Secure & Scalable", description: "Industry-standard security practices and scalable infrastructure" },
            { title: "Custom Features", description: "Tailored functionality to meet your specific requirements" },
        ],
        "mobile-app-development": [
            { title: "Cross-Platform", description: "iOS and Android apps from a single codebase" },
            { title: "Native Performance", description: "Smooth, fast user experience on all devices" },
            { title: "Push Notifications", description: "Engage users with timely notifications" },
            { title: "Offline Support", description: "Core features work even without internet" },
            { title: "App Store Ready", description: "Full deployment to Apple App Store and Google Play" },
            { title: "Analytics Integration", description: "Track user behavior and app performance" },
        ],
        "ui-ux-design": [
            { title: "User Research", description: "In-depth analysis of your target audience" },
            { title: "Wireframing", description: "Low-fidelity layouts to establish structure" },
            { title: "High-Fidelity Mockups", description: "Pixel-perfect designs ready for development" },
            { title: "Interactive Prototypes", description: "Clickable prototypes to validate user flows" },
            { title: "Design System", description: "Consistent component library for scalability" },
            { title: "Usability Testing", description: "Validate designs with real user feedback" },
        ],
        "seo-optimization": [
            { title: "Keyword Research", description: "Identify high-value keywords for your industry" },
            { title: "On-Page SEO", description: "Optimize content, meta tags, and site structure" },
            { title: "Technical SEO", description: "Improve crawlability, speed, and mobile-friendliness" },
            { title: "Link Building", description: "Build quality backlinks to boost authority" },
            { title: "Analytics Setup", description: "Track rankings, traffic, and conversions" },
            { title: "Monthly Reports", description: "Detailed insights into your SEO performance" },
        ],
    };

    return features[slug] || [
        { title: "Custom Solution", description: "Tailored to your specific business needs" },
        { title: "Expert Team", description: "Experienced professionals dedicated to your success" },
        { title: "Quality Assurance", description: "Rigorous testing to ensure top-notch delivery" },
        { title: "Ongoing Support", description: "Continued assistance after project completion" },
    ];
}
