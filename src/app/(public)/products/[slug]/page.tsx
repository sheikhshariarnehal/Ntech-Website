import { notFound } from "next/navigation";
import { getProductBySlug } from "@/features/products/api/getProductBySlug";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingCart, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Zap,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

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

    const getBillingText = (interval: string) => {
        if (interval === 'one_time') return 'One-time purchase';
        if (interval === 'monthly') return 'Billed monthly';
        return 'Billed annually';
    };

    return (
        <div className="container py-8 md:py-12 px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link 
                href="/products" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 md:mb-8 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Products
            </Link>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                {/* Product Image */}
                <div className="space-y-4">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border">
                        {product.thumbnail_url ? (
                            <Image
                                src={product.thumbnail_url}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <ShoppingCart className="h-32 w-32 text-muted-foreground/20" />
                            </div>
                        )}
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        <Card className="border-border/50">
                            <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4 text-center">
                                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-1 sm:mb-2" />
                                <p className="text-[10px] sm:text-xs font-medium">Secure Payment</p>
                            </CardContent>
                        </Card>
                        <Card className="border-border/50">
                            <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4 text-center">
                                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-1 sm:mb-2" />
                                <p className="text-[10px] sm:text-xs font-medium">Instant Delivery</p>
                            </CardContent>
                        </Card>
                        <Card className="border-border/50">
                            <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4 text-center">
                                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-1 sm:mb-2" />
                                <p className="text-[10px] sm:text-xs font-medium">24/7 Support</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 flex-wrap">
                            {product.category && (
                                <Badge variant="secondary" className="text-xs sm:text-sm">
                                    {product.category}
                                </Badge>
                            )}
                            <Badge 
                                variant={product.billing_interval === 'one_time' ? 'default' : 'outline'}
                                className="text-xs sm:text-sm"
                            >
                                {product.billing_interval === 'one_time' 
                                    ? 'One-Time Purchase' 
                                    : product.billing_interval === 'monthly' 
                                    ? 'Subscription' 
                                    : 'Annual Plan'}
                            </Badge>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                            {product.name}
                        </h1>

                        <p className="text-lg sm:text-xl text-muted-foreground">
                            {product.short_description}
                        </p>
                    </div>

                    {/* Pricing */}
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 sm:p-6 border border-primary/20">
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-4xl sm:text-5xl font-bold text-primary">
                                {displayPrice}
                            </span>
                            {suffix && (
                                <span className="text-xl sm:text-2xl text-muted-foreground">
                                    {suffix}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            {getBillingText(product.billing_interval)}
                        </p>
                        
                        <Button size="lg" className="w-full gap-2 text-base sm:text-lg h-12 sm:h-14">
                            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                            Add to Cart
                        </Button>
                    </div>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">What's Included</h2>
                            <div className="space-y-3">
                                {product.features.map((feature, index) => (
                                    <div 
                                        key={index} 
                                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-base">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {product.full_description && (
                        <div className="space-y-4 pt-6 border-t">
                            <h2 className="text-2xl font-bold">Description</h2>
                            <div className="prose prose-neutral dark:prose-invert max-w-none">
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {product.full_description}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
