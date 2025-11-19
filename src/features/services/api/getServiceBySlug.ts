import { services } from "./getServices";

export async function getServiceBySlug(slug: string) {
    return services.find((service) => service.slug === slug);
}
