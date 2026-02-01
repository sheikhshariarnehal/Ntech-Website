import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface TelegramUpdate {
    update_id: number;
    message?: {
        message_id: number;
        from: {
            id: number;
            first_name: string;
        };
        chat: {
            id: number;
        };
        text?: string;
        reply_to_message?: {
            message_id: number;
            text?: string;
        };
    };
}

/**
 * Extract session ID from the original message text
 */
function extractSessionId(text: string): string | null {
    // Look for "Session: `XXXXXXXX`" pattern
    const match = text.match(/Session:\s*`([a-f0-9-]+)`/i);
    return match ? match[1] : null;
}

export async function POST(request: Request) {
    try {
        // Optional: Verify the request is from Telegram using secret token
        // const secretToken = process.env.TELEGRAM_WEBHOOK_SECRET;
        // const authHeader = request.headers.get("X-Telegram-Bot-Api-Secret-Token");
        // if (secretToken && authHeader !== secretToken) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        const body: TelegramUpdate = await request.json();

        // Only process messages that are replies to our bot messages
        if (!body.message?.reply_to_message?.text || !body.message.text) {
            return NextResponse.json({ ok: true });
        }

        const replyText = body.message.text;
        const originalMessage = body.message.reply_to_message.text;

        // Extract session ID from the original message
        const shortSessionId = extractSessionId(originalMessage);

        if (!shortSessionId) {
            console.log("No session ID found in replied message");
            return NextResponse.json({ ok: true });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Find the session that starts with this short ID
        const { data: sessions, error: sessionError } = await supabase
            .from("chat_sessions")
            .select("id")
            .ilike("id", `${shortSessionId}%`)
            .eq("status", "active")
            .limit(1);

        if (sessionError || !sessions || sessions.length === 0) {
            console.error("Session not found for shortId:", shortSessionId);
            return NextResponse.json({ ok: true });
        }

        const sessionId = sessions[0].id;

        // Save admin reply to database
        const { error: messageError } = await supabase
            .from("chat_messages")
            .insert([{
                session_id: sessionId,
                sender: "admin",
                message: replyText.trim(),
            }]);

        if (messageError) {
            console.error("Failed to save admin reply:", messageError);
            return NextResponse.json(
                { error: "Failed to save reply" },
                { status: 500 }
            );
        }

        console.log(`Admin reply saved for session ${shortSessionId}`);
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Telegram webhook error:", error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}

// Telegram sends GET request to verify the webhook
export async function GET() {
    return NextResponse.json({
        status: "Telegram webhook is active",
        timestamp: new Date().toISOString()
    });
}
