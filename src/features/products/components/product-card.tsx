import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Product } from "../types";
import { ShoppingCart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatBillingType = (interval: string) => {
    if (interval === 'monthly') return 'Monthly';
    if (interval === 'yearly') return 'Yearly';
    return 'One-time';
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-BD').format(numPrice);
  };

  return (
    <Card className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl border border-border/60 hover:border-primary/50 bg-card shadow-md hover:-translate-y-1">
      {/* Product Image/Logo with Badge Overlay */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-muted dark:to-background border-b border-border/40">
        {/* Category Badge - Top Left */}
        {product.category && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md bg-primary dark:bg-primary text-primary-foreground font-semibold border-0 shadow-lg"
          >
            {product.category}
          </Badge>
        )}

        {product.thumbnail_url ? (
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ShoppingCart className="h-12 sm:h-16 md:h-20 w-12 sm:w-16 md:w-20 text-muted-foreground/20" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-3.5 md:p-4 flex flex-col gap-2 sm:gap-2.5 md:gap-3 flex-1 bg-card">
        {/* Product Name */}
        <h3 className="font-bold text-sm sm:text-base md:text-lg leading-tight line-clamp-2 min-h-[2.5rem] sm:min-h-[2.8rem] md:min-h-[3.2rem] text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="flex items-baseline gap-1.5 sm:gap-2 mt-auto">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            ৳{formatPrice(product.price)}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground font-medium">
            {product.billing_interval === 'monthly' && '/ Monthly'}
            {product.billing_interval === 'yearly' && '/ Yearly'}
            {product.billing_interval === 'one_time' && '/ One-time'}
          </span>
        </div>

        {/* Buy Now Button */}
        <Button 
          asChild 
          size="lg"
          className="w-full text-sm sm:text-base h-9 sm:h-10 md:h-11 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 font-semibold shadow-sm"
        >
          <Link href={`/products/${product.slug}`} className="flex items-center justify-center gap-2">
            <ShoppingBag className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
            Order Now
          </Link>
        </Button>
      </div>
    </Card>
  );
}
