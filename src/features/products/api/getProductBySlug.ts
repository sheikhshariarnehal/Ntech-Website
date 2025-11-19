import { products } from "./getProducts";

export async function getProductBySlug(slug: string) {
    return products.find((product) => product.slug === slug);
}
