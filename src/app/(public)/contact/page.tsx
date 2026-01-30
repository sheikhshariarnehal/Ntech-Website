import { ContactForm } from "@/components/forms/contact-form";
import { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Send, Headphones, Globe } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us | Get In Touch",
    description: "Get in touch with our team. We're here to help you with your project needs.",
    keywords: ["contact", "get in touch", "support", "inquiry"],
};

const contactMethods = [
    {
        icon: Mail,
        title: "Email",
        value: "support@ntech.com",
        link: "mailto:support@ntech.com",
        description: "We'll respond within 24 hours",
    },
    {
        icon: Phone,
        title: "Phone",
        value: "+1 (555) 123-4567",
        link: "tel:+15551234567",
        description: "Mon-Fri, 9am to 6pm EST",
    },
    {
        icon: MapPin,
        title: "Office",
        value: "123 Business St, Suite 100",
        link: null,
        description: "City, State 12345",
    },
];

const features = [
    {
        icon: Clock,
        title: "Quick Response",
        description: "We respond to all inquiries within 24 hours",
    },
    {
        icon: Headphones,
        title: "Dedicated Support",
        description: "Get personalized assistance from our team",
    },
    {
        icon: Globe,
        title: "Global Reach",
        description: "Serving clients worldwide across time zones",
    },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-16 sm:py-20 lg:py-24">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
                            Contact Us
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Have a question or want to work together? We'd love to hear from you. 
                            Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="pb-16 sm:pb-20 lg:pb-24">
                <div className="container">
                    <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
                            {/* Left Column - Contact Info */}
                            <div className="lg:col-span-2 space-y-10">
                                {/* Contact Methods */}
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground mb-6">
                                        Contact Information
                                    </h2>
                                    <div className="space-y-6">
                                        {contactMethods.map((method, index) => {
                                            const Icon = method.icon;
                                            const content = (
                                                <div className="flex items-start gap-4 group">
                                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                        <Icon className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-foreground mb-1">
                                                            {method.title}
                                                        </h3>
                                                        <p className="text-foreground font-medium">
                                                            {method.value}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground mt-0.5">
                                                            {method.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            );

                                            return method.link ? (
                                                <a 
                                                    key={index} 
                                                    href={method.link} 
                                                    className="block hover:opacity-80 transition-opacity"
                                                >
                                                    {content}
                                                </a>
                                            ) : (
                                                <div key={index}>{content}</div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-border" />

                                {/* Features */}
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground mb-6">
                                        Why Choose Us
                                    </h2>
                                    <div className="space-y-5">
                                        {features.map((feature, index) => {
                                            const Icon = feature.icon;
                                            return (
                                                <div key={index} className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                                        <Icon className="w-4 h-4 text-foreground" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-foreground">
                                                            {feature.title}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground mt-0.5">
                                                            {feature.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Office Hours */}
                                <div className="p-6 rounded-2xl bg-muted/50 border border-border">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Clock className="w-5 h-5 text-primary" />
                                        <h3 className="font-semibold text-foreground">Office Hours</h3>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Monday - Friday</span>
                                            <span className="text-foreground font-medium">9:00 AM - 6:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Saturday</span>
                                            <span className="text-foreground font-medium">10:00 AM - 4:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Sunday</span>
                                            <span className="text-foreground font-medium">Closed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Form */}
                            <div className="lg:col-span-3">
                                <ContactForm />
                            </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="border-t border-border bg-muted/30">
                <div className="container py-16 sm:py-20">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                                Visit Our Office
                            </h2>
                            <p className="text-muted-foreground">
                                We'd love to meet you in person. Drop by our office anytime during business hours.
                            </p>
                        </div>
                        <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-muted border border-border">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1706604888619!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-500"
                            />
                    </div>
                </div>
            </section>
        </div>
    );
}
