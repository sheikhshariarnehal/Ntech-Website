import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendTelegramNotification } from "@/lib/telegram";

interface ContactSubmission {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject?: string;
    message: string;
    source_page?: string;
}

export async function POST(request: Request) {
    try {
        const body: ContactSubmission = await request.json();

        // Validate required fields
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { error: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Create Supabase client with anon key (RLS is disabled for contact_submissions)
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Prepare sanitized data for Telegram
        const sanitizedData = {
            name: body.name.trim(),
            email: body.email.trim().toLowerCase(),
            phone: body.phone?.trim() || null,
            company: body.company?.trim() || null,
            subject: body.subject?.trim() || null,
            message: body.message.trim(),
            source_page: body.source_page || "contact",
        };

        // Insert contact submission into database (excluding subject as it's not in the table)
        const { data, error } = await supabase
            .from("contact_submissions")
            .insert([{
                name: sanitizedData.name,
                email: sanitizedData.email,
                phone: sanitizedData.phone,
                company: sanitizedData.company,
                message: sanitizedData.message,
                source_page: sanitizedData.source_page,
                status: "new",
            }])
            .select()
            .single();

        if (error) {
            console.error("Database error:", error);
            return NextResponse.json(
                { error: "Failed to save contact submission" },
                { status: 500 }
            );
        }

        console.log("Contact submission saved:", data.id);

        // Send Telegram notification (non-blocking)
        sendTelegramNotification({
            name: sanitizedData.name,
            email: sanitizedData.email,
            phone: sanitizedData.phone || undefined,
            company: sanitizedData.company || undefined,
            subject: sanitizedData.subject || undefined,
            message: sanitizedData.message,
            source_page: sanitizedData.source_page,
        }).catch((err) => {
            console.error("Telegram notification failed:", err);
        });

        return NextResponse.json(
            {
                message: "Message sent successfully",
                id: data.id
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}

