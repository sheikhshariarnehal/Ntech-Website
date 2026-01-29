import { Card } from "@/components/ui/card";

export function ProductCardSkeleton() {
  return (
    <Card className="group relative flex flex-col h-full overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] bg-muted" />
      
      {/* Content Skeleton */}
      <div className="p-4 pb-2">
        <div className="h-5 bg-muted rounded w-3/4" />
      </div>

      {/* Footer Skeleton */}
      <div className="p-4 pt-2 flex items-center justify-between gap-4 mt-auto">
        <div className="h-6 bg-muted rounded w-20" />
        <div className="h-9 bg-muted rounded w-20" />
      </div>
    </Card>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="space-y-6">
      {/* Search and Filter Skeleton */}
      <div className="space-y-4">
        {/* Search Bar and Filter Button Skeleton */}
        <div className="flex gap-3">
          {/* Search Input Skeleton */}
          <div className="relative flex-1 h-12 bg-muted rounded-md animate-pulse" />
          
          {/* Filter Button Skeleton */}
          <div className="h-12 w-28 bg-muted rounded-md animate-pulse" />
        </div>

        {/* Results Count Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 bg-muted rounded w-48 animate-pulse" />
        </div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
