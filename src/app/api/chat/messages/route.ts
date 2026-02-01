import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get("sessionId");
        const after = searchParams.get("after"); // ISO timestamp for incremental polling

        if (!sessionId) {
            return NextResponse.json(
                { error: "Session ID is required" },
                { status: 400 }
            );
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Build query
        let query = supabase
            .from("chat_messages")
            .select("id, sender, message, created_at")
            .eq("session_id", sessionId)
            .order("created_at", { ascending: true });

        // If 'after' is provided, only get messages after that timestamp
        if (after) {
            query = query.gt("created_at", after);
        }

        const { data: messages, error } = await query;

        if (error) {
            console.error("Failed to fetch messages:", error);
            return NextResponse.json(
                { error: "Failed to fetch messages" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            messages: messages || [],
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Chat messages error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
