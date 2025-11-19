import { PageHeader } from "@/components/shared/page-header";
import { ServiceList } from "@/features/services/components/service-list";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services",
    description: "Explore our technical services and solutions.",
};

export default function ServicesPage() {
    return (
        <div className="container py-8 md:py-12">
            <PageHeader
                title="Our Services"
                subtitle="We offer a wide range of technical services to help your business grow."
            />
            <div className="mt-8">
                <ServiceList />
            </div>
        </div>
    );
}
