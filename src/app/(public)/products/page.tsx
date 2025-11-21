import { ProductList } from "@/features/products/components/product-list";
import { Metadata } from "next";
import { ShoppingBag, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Products",
    description: "Premium digital products and subscriptions.",
};

export default function ProductsPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Header */}
            <div className="border-b bg-gradient-to-b from-muted/50 to-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                            <ShoppingBag className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                            Digital Products
                        </h1>
                        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                            Discover premium digital products and subscription services at competitive prices.
                        </p>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ProductList />
            </div>
        </div>
    );
}
