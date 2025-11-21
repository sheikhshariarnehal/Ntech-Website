import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { ServiceList } from "@/features/services/components/service-list";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export const metadata: Metadata = {
    title: "Services | Ntech",
    description: "Explore our comprehensive range of technical services including Web Development, App Development, AI Automation, and more.",
};

export const revalidate = 3600; // Revalidate every hour

export default function ServicesPage() {
    return (
        <div className="container pt-16 md:pt-24 pb-8 md:pb-12 space-y-16">
            <PageHeader
                title="Our Services"
                subtitle="We deliver cutting-edge technical solutions tailored to your business needs. From web and mobile apps to AI automation, we help you scale."
            />
            
            <Suspense 
                fallback={
                    <div className="flex justify-center items-center min-h-[400px]">
                        <LoadingSpinner className="w-10 h-10 text-primary" />
                    </div>
                }
            >
                <ServiceList />
            </Suspense>

            <div className="rounded-2xl bg-muted/50 p-8 md:p-12 text-center space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">Need a Custom Solution?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    Don't see exactly what you're looking for? We specialize in building custom solutions for unique business challenges.
                </p>
                <Link href="/contact">
                    <Button size="lg" className="font-semibold">
                        Contact Us for a Quote
                    </Button>
                </Link>
            </div>
        </div>
    );
}
