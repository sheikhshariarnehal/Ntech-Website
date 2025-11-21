"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Product } from "../types";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert("Added to cart! (Checkout not implemented yet)");
  };

  const isOutOfStock = product.stock !== null && product.stock <= 0;

  return (
    <div className="space-y-3">
      <Button 
        size="lg" 
        className="w-full gap-2 text-base sm:text-lg h-12 sm:h-14 shadow-primary/25 shadow-lg"
        onClick={handleAction}
        disabled={isLoading || isOutOfStock}
      >
        {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
        )}
        {isOutOfStock 
            ? "Out of Stock" 
            : product.billing_interval === 'one_time' 
                ? 'Add to Cart' 
                : 'Subscribe Now'}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        30-day money-back guarantee • Cancel anytime
      </p>
    </div>
  );
}
