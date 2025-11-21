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

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('en-BD').format(numPrice);
  };

  return (
    <Card className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl border-border hover:border-primary/30 bg-card">
      {/* Product Image/Logo with Badge Overlay */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-muted dark:to-background">
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
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ShoppingCart className="h-12 sm:h-16 md:h-20 w-12 sm:w-16 md:w-20 text-muted-foreground/20" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col gap-2.5 sm:gap-3 md:gap-4 flex-1">
        {/* Product Name */}
        <h3 className="font-semibold text-sm sm:text-base md:text-lg leading-tight line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem] group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="flex items-baseline gap-1.5 sm:gap-2 mt-auto">
          <span className="text-xl sm:text-2xl font-bold text-foreground">
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
          className="w-full text-sm sm:text-base"
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
