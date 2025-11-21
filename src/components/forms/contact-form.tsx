"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FormData {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
}

export function ContactForm() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [formData, setFormData] = React.useState<FormData>({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
    });
    const { toast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    source_page: "contact",
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to send message");
            }

            toast({
                title: "Success!",
                description: "Your message has been sent successfully. We'll get back to you soon.",
            });

            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                message: "",
            });
        } catch (error) {
            console.error("Contact form error:", error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="p-6">
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                        Phone
                    </label>
                    <Input
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="company" className="text-sm font-medium">
                        Company
                    </label>
                    <Input
                        id="company"
                        name="company"
                        placeholder="Your Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="message" className="text-sm font-medium">
                        Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your project..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        required
                        disabled={isLoading}
                    />
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Message"}
                </Button>
            </form>
        </Card>
    );
}
