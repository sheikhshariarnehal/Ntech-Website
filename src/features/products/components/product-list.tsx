import { Suspense } from "react";
import { getProducts } from "../api/getProducts";
import { ProductGrid } from "./product-grid";
import { ProductGridSkeleton } from "./product-skeleton";

async function ProductData() {
    const products = await getProducts();
    return <ProductGrid initialProducts={products} />;
}

export function ProductList() {
    return (
        <Suspense fallback={<ProductGridSkeleton />}>
            <ProductData />
        </Suspense>
    );
}
