import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface ContactSubmission {
    name: string;
    email: string;
    phone?: string;
    company?: string;
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

        // Insert contact submission into database
        const { data, error } = await supabase
            .from("contact_submissions")
            .insert([{
                name: body.name.trim(),
                email: body.email.trim().toLowerCase(),
                phone: body.phone?.trim() || null,
                company: body.company?.trim() || null,
                message: body.message.trim(),
                source_page: body.source_page || "contact",
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
