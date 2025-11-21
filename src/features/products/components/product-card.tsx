import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Product } from "../types";
import { ShoppingCart, ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <Card className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50 hover:border-primary/20 bg-card">
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-muted">
        {product.thumbnail_url ? (
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary/50">
            <ShoppingCart className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
      </Link>

      <CardHeader className="p-4 pb-2">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
      </CardHeader>

      <CardFooter className="p-4 pt-2 flex items-center justify-between gap-4 mt-auto">
        <span className="text-lg font-bold text-foreground">
          {formatPrice(product.price, product.billing_interval)}
        </span>
        <Button asChild size="sm" className="rounded-md px-4">
          <Link href={`/products/${product.slug}`}>
            Buy Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
