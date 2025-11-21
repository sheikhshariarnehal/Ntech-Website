import { ProductList } from "@/features/products/components/product-list";
import { Metadata } from "next";
import { ShoppingBag, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: "Products | Ntech",
    description: "Premium digital products, AI tools, and subscription services.",
};

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <div className="relative border-b overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10" />
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto">
                        <Badge variant="outline" className="px-4 py-1.5 text-sm rounded-full border-primary/20 bg-primary/5 text-primary animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Sparkles className="w-3.5 h-3.5 mr-2 inline-block" />
                            Premium Digital Assets
                        </Badge>
                        
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                            Elevate Your Workflow with <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                                Professional Tools
                            </span>
                        </h1>
                        
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                            Discover our curated collection of high-quality digital products, AI-powered tools, and subscription services designed to boost your productivity.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4 pt-2 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full border border-border/50">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                <span>Instant Delivery</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full border border-border/50">
                                <ShoppingBag className="w-4 h-4 text-blue-500" />
                                <span>Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <ProductList />
            </div>
        </div>
    );
}
