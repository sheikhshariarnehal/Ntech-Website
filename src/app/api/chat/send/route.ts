import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface ChatMessageRequest {
    sessionId: string;
    message: string;
    visitorName?: string;
}

/**
 * Sends a chat message notification to Telegram
 */
async function sendChatToTelegram(
    sessionId: string,
    message: string,
    visitorName: string | null
): Promise<{ success: boolean; messageId?: number }> {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.warn("Telegram credentials not configured");
        return { success: false };
    }

    const shortSessionId = sessionId.substring(0, 8);
    const lines = [
        "💬 *New Chat Message*",
        "",
        `👤 *From:* ${escapeMarkdown(visitorName || "Website Visitor")}`,
        `🔗 *Session:* \`${shortSessionId}\``,
        "",
        "📝 *Message:*",
        escapeMarkdown(message),
        "",
        `_Reply to this message to respond_`,
    ];

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: lines.join("\n"),
                parse_mode: "MarkdownV2",
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Telegram API error:", result);
            return { success: false };
        }

        return { success: true, messageId: result.result?.message_id };
    } catch (error) {
        console.error("Failed to send to Telegram:", error);
        return { success: false };
    }
}

function escapeMarkdown(text: string): string {
    return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");
}

export async function POST(request: Request) {
    try {
        const body: ChatMessageRequest = await request.json();

        // Validate required fields
        if (!body.sessionId || !body.message) {
            return NextResponse.json(
                { error: "Session ID and message are required" },
                { status: 400 }
            );
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Verify session exists
        const { data: session, error: sessionError } = await supabase
            .from("chat_sessions")
            .select("id, visitor_name")
            .eq("id", body.sessionId)
            .single();

        if (sessionError || !session) {
            return NextResponse.json(
                { error: "Invalid session" },
                { status: 400 }
            );
        }

        // Save message to database
        const { data: messageData, error: messageError } = await supabase
            .from("chat_messages")
            .insert([{
                session_id: body.sessionId,
                sender: "user",
                message: body.message.trim(),
            }])
            .select()
            .single();

        if (messageError) {
            console.error("Failed to save message:", messageError);
            return NextResponse.json(
                { error: "Failed to save message" },
                { status: 500 }
            );
        }

        // Send to Telegram (non-blocking)
        const telegramResult = await sendChatToTelegram(
            body.sessionId,
            body.message,
            body.visitorName || session.visitor_name
        );

        // Update session with Telegram thread ID if this is the first message
        if (telegramResult.success && telegramResult.messageId) {
            await supabase
                .from("chat_sessions")
                .update({ telegram_thread_id: telegramResult.messageId })
                .eq("id", body.sessionId)
                .is("telegram_thread_id", null);
        }

        return NextResponse.json({
            success: true,
            messageId: messageData.id,
            createdAt: messageData.created_at,
        });
    } catch (error) {
        console.error("Chat send error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
