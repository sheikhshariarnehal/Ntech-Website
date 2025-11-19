import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { getServiceBySlug } from "@/features/services/api/getServiceBySlug";
import { Metadata } from "next";

interface ServicePageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({
    params,
}: ServicePageProps): Promise<Metadata> {
    const service = await getServiceBySlug(params.slug);

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: service.title,
        description: service.description,
    };
}

export default async function ServicePage({ params }: ServicePageProps) {
    const service = await getServiceBySlug(params.slug);

    if (!service) {
        notFound();
    }

    return (
        <div className="container py-8 md:py-12">
            <PageHeader title={service.title} subtitle={service.description} />
            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
                <div className="prose max-w-none dark:prose-invert">
                    {/* Placeholder for rich content */}
                    <p className="text-lg leading-relaxed">
                        Detailed description for {service.title}. This service includes comprehensive solutions tailored to your needs.
                    </p>
                    <h3>What&apos;s Included</h3>
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                        <h3 className="font-semibold leading-none tracking-tight mb-4">
                            Get Started
                        </h3>
                        <div className="text-2xl font-bold mb-4">
                            Starting at $999
                        </div>
                        <Link href="/contact">
                            <Button className="w-full">Request this service</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
