import { ProductList } from "@/features/products/components/product-list";
import { Metadata } from "next";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { generatePageSEO } from "@/config/seo";

export const metadata: Metadata = generatePageSEO({
    title: "Premium Digital Products & AI Tools",
    description: "Access premium digital products including ChatGPT Pro, Gemini Pro, Canva Pro, Veo3, and more at up to 95% off retail prices. Instant access, 100% satisfaction guaranteed, and free updates.",
    path: "/products",
});

export default function ProductsPage() {
    // Structured data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Premium Digital Products & AI Tools",
        "description": "Access premium digital products including ChatGPT Pro, Gemini Pro, Canva Pro, Veo3, and more at competitive prices.",
        "url": "https://ntech.com/products",
        "mainEntity": {
            "@type": "ItemList",
            "name": "Premium Tools Collection",
            "description": "Professional-grade software for creators, marketers, and businesses",
            "itemListElement": [
                {
                    "@type": "Product",
                    "name": "ChatGPT Pro",
                    "description": "Advanced AI conversations and content generation"
                },
                {
                    "@type": "Product",
                    "name": "Gemini Pro",
                    "description": "Google's powerful AI assistant"
                },
                {
                    "@type": "Product",
                    "name": "Canva Pro",
                    "description": "Professional design tools for everyone"
                },
                {
                    "@type": "Product",
                    "name": "Veo3",
                    "description": "Next-generation video creation and editing"
                }
            ]
        },
        "provider": {
            "@type": "Organization",
            "name": "Ntech",
            "url": "https://ntech.com"
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
            {/* Hero Header */}
            <div className="mt-16 sm:mt-20 md:mt-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
                    <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 max-w-4xl mx-auto">
                        <Badge variant="outline" className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full border-primary/30 bg-primary/10 text-primary font-medium">
                            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 mr-1.5 sm:mr-2 inline-block" />
                            Premium Tools Collection
                        </Badge>
                        
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                            All Premium Tools
                        </h1>
                        
                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                            Access our complete collection of premium tools at 95% off retail prices. Professional-grade software for creators, marketers, and businesses.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:gap-x-5 pt-1 sm:pt-2 w-full px-4">
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground">
                                <div className="flex items-center justify-center w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-green-500/20 flex-shrink-0">
                                    <CheckCircle2 className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 text-green-600 dark:text-green-400" />
                                </div>
                                <span>Instant Access</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground">
                                <div className="flex items-center justify-center w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-green-500/20 flex-shrink-0">
                                    <CheckCircle2 className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="whitespace-nowrap">100% Satisfaction</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground">
                                <div className="flex items-center justify-center w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-green-500/20 flex-shrink-0">
                                    <CheckCircle2 className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 text-green-600 dark:text-green-400" />
                                </div>
                                <span>Free Updates</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                <ProductList />
            </div>
        </div>
        </>
    );
}
