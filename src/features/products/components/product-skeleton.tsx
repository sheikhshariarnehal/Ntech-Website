import { Card } from "@/components/ui/card";

export function ProductCardSkeleton() {
  return (
    <Card className="group relative flex flex-col h-full overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] bg-muted" />
      
      {/* Content Skeleton */}
      <div className="p-2 xs:p-2.5 sm:p-3.5 md:p-4 space-y-2 xs:space-y-2.5 sm:space-y-3">
        <div className="h-4 xs:h-5 bg-muted rounded w-3/4" />
        <div className="h-3 xs:h-4 bg-muted rounded w-1/2" />
      </div>

      {/* Footer Skeleton */}
      <div className="p-2 xs:p-2.5 sm:p-3.5 md:p-4 pt-0 flex items-center justify-between gap-2 xs:gap-3 sm:gap-4 mt-auto">
        <div className="h-5 xs:h-6 bg-muted rounded w-16 xs:w-20" />
        <div className="h-7 xs:h-8 sm:h-9 bg-muted rounded w-16 xs:w-20" />
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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {[...Array(10)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
