import { getServices } from "../api/getServices";
import { ServiceCard } from "./service-card";

export async function ServiceList() {
    const services = await getServices();

    if (services.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No services available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
            ))}
        </div>
    );
}

