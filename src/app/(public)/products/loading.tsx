import { ProductGridSkeleton } from "@/features/products/components/product-skeleton";

export default function ProductsLoading() {
    return (
        <div className="min-h-screen">
            {/* Hero Header Skeleton */}
            <div className="mt-16 sm:mt-20 md:mt-24 animate-pulse">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
                    <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 max-w-4xl mx-auto">
                        {/* Badge Skeleton */}
                        <div className="h-7 sm:h-8 w-40 sm:w-48 rounded-full bg-muted/50" />
                        
                        {/* Title Skeleton */}
                        <div className="h-10 sm:h-12 md:h-14 lg:h-16 w-64 sm:w-80 md:w-96 rounded-lg bg-muted/50" />
                        
                        {/* Description Skeleton */}
                        <div className="space-y-2 w-full max-w-2xl">
                            <div className="h-4 sm:h-5 rounded bg-muted/50 w-full" />
                            <div className="h-4 sm:h-5 rounded bg-muted/50 w-3/4 mx-auto" />
                        </div>
                        
                        {/* Features Skeleton */}
                        <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 pt-1 sm:pt-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-muted/50" />
                                    <div className="h-4 w-20 sm:w-24 rounded bg-muted/50" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Section Skeleton */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                <ProductGridSkeleton />
            </div>
        </div>
    );
}
