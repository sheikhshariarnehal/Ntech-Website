import { PageHeader } from "@/components/shared/page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn more about our company and mission.",
};

export default function AboutPage() {
    return (
        <div className="container py-8 md:py-12">
            <PageHeader
                title="About Us"
                subtitle="We are a team of passionate developers and designers."
            />
            <div className="mt-8 prose max-w-none dark:prose-invert">
                <p className="text-lg leading-relaxed">
                    Ntech is a leading provider of technical solutions for modern businesses.
                    We specialize in web and app development, AI automation, and digital
                    products. Our mission is to empower businesses with the tools they need
                    to succeed in the digital age.
                </p>
                <h3>Our Story</h3>
                <p>
                    Founded in 2023, Ntech started as a small team of freelancers passionate
                    about technology. Today, we have grown into a full-service agency with
                    clients from all over the world.
                </p>
                <h3>Our Team</h3>
                <p>
                    We are a diverse team of experts in various fields, including software
                    engineering, design, and data science. We work together to deliver
                    exceptional results for our clients.
                </p>
            </div>
        </div>
    );
}
