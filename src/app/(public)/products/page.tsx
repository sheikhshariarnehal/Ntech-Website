import { PageHeader } from "@/components/shared/page-header";
import { ProductList } from "@/features/products/components/product-list";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products",
    description: "Premium digital products and subscriptions.",
};

export default function ProductsPage() {
    return (
        <div className="container py-8 md:py-12">
            <PageHeader
                title="Digital Products"
                subtitle="Premium subscriptions and digital tools at competitive prices."
            />
            <div className="mt-8">
                <ProductList />
            </div>
        </div>
    );
}
