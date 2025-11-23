import { notFound } from "next/navigation";
import { getProductBySlug } from "@/features/products/api/getProductBySlug";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductActions } from "@/features/products/components/product-actions";
import { 
  ShoppingCart, 
  Check, 
  Shield, 
  Zap,
  BarChart,
  Globe,
  Clock,
  Star,
  CheckCircle2
} from "lucide-react";
import { Metadata } from "next";

// Revalidate product pages every 5 minutes
export const revalidate = 300;

interface ProductPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({
    params,
}: ProductPageProps): Promise<Metadata> {
    const product = await getProductBySlug(params.slug);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    return {
        title: product.seo_title || product.name,
        description: product.seo_description || product.short_description || undefined,
        keywords: product.seo_keywords || undefined,
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await getProductBySlug(params.slug);

    if (!product) {
        notFound();
    }

    const formatPrice = (price: string, interval: string) => {
        const numPrice = parseFloat(price);
        const formattedPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(numPrice);

        if (interval === 'monthly') return { price: formattedPrice, suffix: '/month' };
        if (interval === 'yearly') return { price: formattedPrice, suffix: '/year' };
        return { price: formattedPrice, suffix: '' };
    };

    const { price: displayPrice, suffix } = formatPrice(product.price, product.billing_interval);

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: product.name },
    ];

    return (
        <div className="min-h-screen bg-background pt-16">
            <div className="container py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
                <Breadcrumbs items={breadcrumbItems} className="mb-6 sm:mb-8" />

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start">
                    {/* Left Column: Image & Gallery */}
                    <div className="space-y-4 sm:space-y-6">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-muted border shadow-sm">
                            {product.thumbnail_url ? (
                                <Image
                                    src={product.thumbnail_url}
                                    alt={product.name}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center bg-secondary/30">
                                    <ShoppingCart className="h-24 w-24 text-muted-foreground/20" />
                                </div>
                            )}
                            {product.stock !== null && product.stock < 10 && (
                                <div className="absolute top-4 left-4">
                                    <Badge variant="destructive" className="px-3 py-1 text-sm">
                                        Only {product.stock} left
                                    </Badge>
                                </div>
                            )}
                        </div>
                        
                        {/* Value Props Grid */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-4">
                            <div className="flex flex-col items-center text-center p-2 sm:p-4 rounded-xl bg-card border shadow-sm">
                                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1 sm:mb-2" />
                                <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">Instant Access</span>
                            </div>
                            <div className="flex flex-col items-center text-center p-2 sm:p-4 rounded-xl bg-card border shadow-sm">
                                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1 sm:mb-2" />
                                <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">Secure Payment</span>
                            </div>
                            <div className="flex flex-col items-center text-center p-2 sm:p-4 rounded-xl bg-card border shadow-sm">
                                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1 sm:mb-2" />
                                <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">24/7 Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="flex flex-col space-y-6 sm:space-y-8">
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-2">
                                {product.category && (
                                    <Badge variant="secondary" className="text-primary bg-primary/10 hover:bg-primary/20 border-0">
                                        {product.category}
                                    </Badge>
                                )}
                                <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span>4.9</span>
                                    <span className="text-muted-foreground font-normal">(120+ reviews)</span>
                                </div>
                            </div>
                            
                            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                {product.name}
                            </h1>
                            
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                                {product.short_description}
                            </p>
                        </div>

                        <Card className="p-4 sm:p-6 bg-card/50 backdrop-blur border-primary/10 shadow-lg">
                            <div className="flex items-baseline gap-2 mb-4 sm:mb-6">
                                <span className="text-3xl sm:text-4xl font-bold text-primary">{displayPrice}</span>
                                {suffix && <span className="text-base sm:text-lg text-muted-foreground font-medium">{suffix}</span>}
                            </div>

                            <div className="mb-6 sm:mb-8">
                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                    {product.full_description || product.short_description}
                                </p>
                            </div>

                            <ProductActions product={product} />
                        </Card>

                        {/* Quick Specs / Additional Info */}
                        <div className="border-t pt-6 sm:pt-8">
                            <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Product Highlights</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Globe className="h-4 w-4" />
                                    <span>Global Availability</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <BarChart className="h-4 w-4" />
                                    <span>Advanced Analytics Included</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Zap className="h-4 w-4" />
                                    <span>Instant Activation</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Shield className="h-4 w-4" />
                                    <span>Enterprise Grade Security</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
