import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProducts } from "../api/getProducts";

export async function ProductList() {
    const products = await getProducts();

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    );
}
