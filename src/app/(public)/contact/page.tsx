import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with our team.",
};

export default function ContactPage() {
    return (
        <div className="container py-8 md:py-12">
            <PageHeader
                title="Contact Us"
                subtitle="Have a project in mind? We'd love to hear from you."
            />
            <div className="mt-8 max-w-xl mx-auto">
                <ContactForm />
            </div>
        </div>
    );
}
