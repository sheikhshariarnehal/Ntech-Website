import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { getProductBySlug } from "@/features/products/api/getProductBySlug";
import { Metadata } from "next";

interface ProductPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({
    params,
}: ProductPageProps): Promise<Metadata> {
    const product = await getProductBySlug(params.slug);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    return {
        title: product.title,
        description: product.description,
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await getProductBySlug(params.slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="container py-8 md:py-12">
            <PageHeader title={product.title} subtitle={product.description} />
            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
                <div className="prose max-w-none dark:prose-invert">
                    <p className="text-lg leading-relaxed">
                        Get full access to {product.title}. Enhance your workflow with premium features.
                    </p>
                    <h3>Key Features</h3>
                    <ul>
                        {product.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-6">
                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                        <h3 className="font-semibold leading-none tracking-tight mb-4">
                            Purchase
                        </h3>
                        <div className="text-3xl font-bold mb-4">{product.price}</div>
                        <Button className="w-full">Buy Now</Button>
                        <p className="text-xs text-muted-foreground mt-4 text-center">
                            Secure checkout via Stripe (Coming soon)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
