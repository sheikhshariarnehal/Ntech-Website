import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className="relative aspect-video bg-muted" />
      
      <CardContent className="p-6 space-y-3">
        <div className="space-y-2">
          <div className="h-6 bg-muted rounded w-3/4" />
          <div className="h-8 bg-muted rounded w-1/2" />
        </div>
        <div className="space-y-1">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>
        <div className="space-y-1.5 pt-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-4/5" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 gap-3">
        <div className="flex-1 h-10 bg-muted rounded" />
        <div className="flex-1 h-10 bg-muted rounded" />
      </CardFooter>
    </Card>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-16 bg-muted rounded-lg animate-pulse" />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <div className="h-12 bg-muted rounded animate-pulse" />
            <div className="space-y-3">
              <div className="h-8 bg-muted rounded animate-pulse" />
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-muted rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
