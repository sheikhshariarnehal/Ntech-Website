import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}));

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Create a new chat session
        const { data, error } = await supabase
            .from("chat_sessions")
            .insert([{
                visitor_name: body.name || null,
                visitor_email: body.email || null,
                status: "active",
            }])
            .select()
            .single();

        if (error) {
            console.error("Failed to create chat session:", error);
            return NextResponse.json(
                { error: "Failed to create chat session" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            sessionId: data.id,
            message: "Chat session created successfully"
        });
    } catch (error) {
        console.error("Chat start error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
