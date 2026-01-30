"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

interface FormData {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export function ContactForm() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errors, setErrors] = React.useState<FormErrors>({});
    const [formData, setFormData] = React.useState<FormData>({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
    });
    const { toast } = useToast();

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!validateForm()) {
            toast({
                title: "Validation Error",
                description: "Please check the form for errors and try again.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        setIsSuccess(false);

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

            setIsSuccess(true);
            toast({
                title: "Message Sent!",
                description: "We'll get back to you within 24 hours.",
            });

            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                subject: "",
                message: "",
            });

            setTimeout(() => setIsSuccess(false), 5000);
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
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 lg:p-10">
            {/* Form Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                    Send us a Message
                </h2>
                <p className="text-muted-foreground">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
            </div>

            {/* Success State */}
            {isSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <div>
                            <p className="font-medium text-green-600 dark:text-green-400">Message sent successfully!</p>
                            <p className="text-sm text-muted-foreground">We&apos;ll respond within 24 hours.</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                            Full Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isLoading}
                            className={`h-12 px-4 rounded-lg bg-background border ${
                                errors.name 
                                    ? "border-destructive focus-visible:ring-destructive/20" 
                                    : "border-border focus-visible:ring-primary/20"
                            }`}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                            Email Address <span className="text-destructive">*</span>
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLoading}
                            className={`h-12 px-4 rounded-lg bg-background border ${
                                errors.email 
                                    ? "border-destructive focus-visible:ring-destructive/20" 
                                    : "border-border focus-visible:ring-primary/20"
                            }`}
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                    </div>
                </div>

                {/* Phone & Company Row */}
                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-foreground">
                            Phone Number <span className="text-muted-foreground text-xs">(Optional)</span>
                        </label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={isLoading}
                            className="h-12 px-4 rounded-lg bg-background border border-border focus-visible:ring-primary/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium text-foreground">
                            Company <span className="text-muted-foreground text-xs">(Optional)</span>
                        </label>
                        <Input
                            id="company"
                            name="company"
                            placeholder="Your Company"
                            value={formData.company}
                            onChange={handleChange}
                            disabled={isLoading}
                            className="h-12 px-4 rounded-lg bg-background border border-border focus-visible:ring-primary/20"
                        />
                    </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Subject <span className="text-destructive">*</span>
                    </label>
                    <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={isLoading}
                        className={`h-12 px-4 rounded-lg bg-background border ${
                            errors.subject 
                                ? "border-destructive focus-visible:ring-destructive/20" 
                                : "border-border focus-visible:ring-primary/20"
                        }`}
                    />
                    {errors.subject && (
                        <p className="text-sm text-destructive">{errors.subject}</p>
                    )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your project or inquiry..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        disabled={isLoading}
                        className={`p-4 rounded-lg bg-background border resize-none ${
                            errors.message 
                                ? "border-destructive focus-visible:ring-destructive/20" 
                                : "border-border focus-visible:ring-primary/20"
                        }`}
                    />
                    <div className="flex items-center justify-between">
                        {errors.message ? (
                            <p className="text-sm text-destructive">{errors.message}</p>
                        ) : (
                            <span />
                        )}
                        <span className="text-xs text-muted-foreground">
                            {formData.message.length}/1000
                        </span>
                    </div>
                </div>

                {/* Submit Button */}
                <Button 
                    type="submit" 
                    disabled={isLoading || isSuccess}
                    className="w-full h-12 text-base font-medium rounded-lg"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                        </>
                    )}
                </Button>

                {/* Privacy Notice */}
                <p className="text-xs text-center text-muted-foreground leading-relaxed">
                    By submitting this form, you agree to our{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                    </a>
                    {" "}and consent to being contacted regarding your inquiry.
                </p>
            </form>
        </div>
    );
}
