import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
    {
        title: "ChatGPT Pro",
        price: "$20/mo",
        description: "Access to GPT-4, faster response times, and priority access.",
        slug: "chatgpt-pro",
    },
    {
        title: "Gemini Pro",
        price: "$19.99/mo",
        description: "Google's most capable AI model for complex tasks.",
        slug: "gemini-pro",
    },
    {
        title: "Canva Pro",
        price: "$12.99/mo",
        description: "Design anything with premium content and tools.",
        slug: "canva-pro",
    },
];

export function HomeProducts() {
    return (
        <section id="products" className="container py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                    Digital Products
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Premium subscriptions and digital tools at competitive prices.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-8">
                {products.map((product) => (
                    <Card key={product.slug} className="flex flex-col justify-between">
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-1">{product.title}</h3>
                            <p className="text-lg font-semibold text-primary mb-2">
                                {product.price}
                            </p>
                            <p className="text-muted-foreground">{product.description}</p>
                        </div>
                        <div className="p-6 pt-0">
                            <Link href={`/products/${product.slug}`}>
                                <Button className="w-full">View Product</Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
