import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getServices } from "../api/getServices";

export async function ServiceList() {
    const services = await getServices();

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
                <Card key={service.slug} className="flex flex-col justify-between">
                    <div className="p-6">
                        <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                        <p className="text-muted-foreground">{service.description}</p>
                    </div>
                    <div className="p-6 pt-0">
                        <Link href={`/services/${service.slug}`}>
                            <Button variant="ghost" className="w-full">
                                Learn more
                            </Button>
                        </Link>
                    </div>
                </Card>
            ))}
        </div>
    );
}
