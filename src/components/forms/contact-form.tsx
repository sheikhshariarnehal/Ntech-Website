"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export function ContactForm() {
    const [isLoading, setIsLoading] = React.useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        // TODO: Implement actual form submission
        setTimeout(() => {
            setIsLoading(false);
            alert("Message sent! (This is a placeholder)");
        }, 1000);
    }

    return (
        <Card className="p-6">
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                        Name
                    </label>
                    <Input id="name" placeholder="John Doe" required disabled={isLoading} />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
                    </label>
                    <Input
                        id="email"
                        placeholder="john@example.com"
                        type="email"
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                    </label>
                    <Input
                        id="subject"
                        placeholder="Project Inquiry"
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="message" className="text-sm font-medium">
                        Message
                    </label>
                    <Textarea
                        id="message"
                        placeholder="Tell us about your project..."
                        required
                        disabled={isLoading}
                    />
                </div>
                <Button className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Message"}
                </Button>
            </form>
        </Card>
    );
}
