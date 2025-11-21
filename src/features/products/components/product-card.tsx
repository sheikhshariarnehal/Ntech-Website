import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "../types";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: string, interval: string) => {
    const numPrice = parseFloat(price);
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(numPrice);

    if (interval === 'monthly') return `${formattedPrice}/mo`;
    if (interval === 'yearly') return `${formattedPrice}/yr`;
    return formattedPrice;
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg border hover:border-primary/50 cursor-pointer bg-card">
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          {product.thumbnail_url ? (
            <Image
              src={product.thumbnail_url}
              alt={product.name}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ShoppingCart className="h-20 w-20 text-muted-foreground/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="flex-1 p-4 space-y-2 bg-card">
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors leading-snug min-h-[2.5rem]">
            {product.name}
          </h3>
          
          <div className="pt-1">
            <span className="text-lg font-semibold text-foreground">
              {formatPrice(product.price, product.billing_interval)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
