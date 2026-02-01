# Chat Widget with Telegram Integration

A complete guide to implementing a floating chat widget with bidirectional Telegram messaging for Next.js websites.

## Features

- 💬 Floating chat widget with modern UI
- 📱 Instant notifications to Telegram when users send messages
- ↩️ Reply from Telegram, users see it in real-time
- 🌙 Dark mode support
- 💾 Session persistence (survives page refresh)
- ⚡ Polling-based updates (serverless-friendly)

---

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌────────────┐
│  Website User   │────▶│  Next.js API │────▶│  Supabase  │
│  (ChatWidget)   │◀────│   Routes     │◀────│  Database  │
└─────────────────┘     └──────────────┘     └────────────┘
                              │
                              ▼
                        ┌──────────────┐
                        │  Telegram    │
                        │  Bot API     │
                        └──────────────┘
                              │
                              ▼
                        ┌──────────────┐
                        │  Admin on    │
                        │  Telegram    │
                        └──────────────┘
```

---

## Prerequisites

- Next.js 14+ with App Router
- Supabase account
- Telegram Bot (create via [@BotFather](https://t.me/BotFather))
- Vercel (or any serverless hosting)

---

## Step 1: Create Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` and follow the prompts
3. Save the **Bot Token** (looks like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)
4. Start a chat with your bot and send any message
5. Get your Chat ID by visiting: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Look for `"chat":{"id":123456789}` - that's your Chat ID

---

## Step 2: Set Up Supabase Database

Run this SQL in your Supabase SQL Editor:

```sql
-- Chat Sessions Table
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_name TEXT,
    visitor_email TEXT,
    telegram_thread_id BIGINT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'admin')),
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_status ON chat_sessions(status);

-- Row Level Security
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies for public access
CREATE POLICY "Allow public to create sessions" ON chat_sessions
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public to read sessions" ON chat_sessions
    FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public to update sessions" ON chat_sessions
    FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow public to insert messages" ON chat_messages
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public to read messages" ON chat_messages
    FOR SELECT TO anon USING (true);

-- Auto-update session timestamp when message is added
CREATE OR REPLACE FUNCTION update_chat_session_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE chat_sessions SET updated_at = NOW() WHERE id = NEW.session_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_chat_session_updated_at ON chat_messages;
CREATE TRIGGER trigger_update_chat_session_updated_at
    AFTER INSERT ON chat_messages
    FOR EACH ROW EXECUTE FUNCTION update_chat_session_updated_at();
```

---

## Step 3: Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

> **Important:** Add these same variables to your Vercel project settings!

---

## Step 4: Create API Routes

### `/app/api/chat/start/route.ts`

```typescript
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}));
        
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

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
            return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
        }

        return NextResponse.json({ sessionId: data.id });
    } catch (error) {
        console.error("Chat start error:", error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
```

### `/app/api/chat/send/route.ts`

```typescript
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function escapeMarkdown(text: string): string {
    return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");
}

async function sendChatToTelegram(sessionId: string, message: string, visitorName: string | null) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return { success: false };

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

    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: lines.join("\n"),
                parse_mode: "MarkdownV2",
            }),
        });

        const result = await response.json();
        return { success: response.ok, messageId: result.result?.message_id };
    } catch (error) {
        console.error("Failed to send to Telegram:", error);
        return { success: false };
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.sessionId || !body.message) {
            return NextResponse.json({ error: "Session ID and message required" }, { status: 400 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Verify session
        const { data: session } = await supabase
            .from("chat_sessions")
            .select("id, visitor_name")
            .eq("id", body.sessionId)
            .single();

        if (!session) {
            return NextResponse.json({ error: "Invalid session" }, { status: 400 });
        }

        // Save message
        const { data: messageData, error } = await supabase
            .from("chat_messages")
            .insert([{ session_id: body.sessionId, sender: "user", message: body.message.trim() }])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
        }

        // Send to Telegram
        await sendChatToTelegram(body.sessionId, body.message, session.visitor_name);

        return NextResponse.json({
            success: true,
            messageId: messageData.id,
            createdAt: messageData.created_at,
        });
    } catch (error) {
        console.error("Chat send error:", error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
```

### `/app/api/chat/messages/route.ts`

```typescript
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get("sessionId");
        const after = searchParams.get("after");

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        let query = supabase
            .from("chat_messages")
            .select("id, sender, message, created_at")
            .eq("session_id", sessionId)
            .order("created_at", { ascending: true });

        if (after) {
            query = query.gt("created_at", after);
        }

        const { data: messages, error } = await query;

        if (error) {
            return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
        }

        return NextResponse.json({ messages: messages || [], timestamp: new Date().toISOString() });
    } catch (error) {
        console.error("Chat messages error:", error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
```

### `/app/api/telegram/webhook/route.ts`

```typescript
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface TelegramUpdate {
    update_id: number;
    message?: {
        message_id: number;
        from: { id: number; first_name: string };
        chat: { id: number };
        text?: string;
        reply_to_message?: { message_id: number; text?: string };
    };
}

function extractSessionId(text: string): string | null {
    // Try multiple patterns for different markdown formats
    let match = text.match(/Session:\s*\\?`([a-f0-9]+)\\?`/i);
    if (match) return match[1];
    
    match = text.match(/Session:\s*([a-f0-9]{8})/i);
    if (match) return match[1];
    
    match = text.match(/Session:\*?\s*\\?`?([a-f0-9]{8})\\?`?/i);
    if (match) return match[1];
    
    return null;
}

export async function POST(request: Request) {
    try {
        const body: TelegramUpdate = await request.json();

        // Only process replies to bot messages
        if (!body.message?.reply_to_message?.text || !body.message.text) {
            return NextResponse.json({ ok: true });
        }

        const replyText = body.message.text;
        const originalMessage = body.message.reply_to_message.text;
        const shortSessionId = extractSessionId(originalMessage);

        if (!shortSessionId) {
            console.log("No session ID found in replied message");
            return NextResponse.json({ ok: true });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Get recent active sessions
        const { data: sessions, error: sessionError } = await supabase
            .from("chat_sessions")
            .select("id")
            .eq("status", "active")
            .order("created_at", { ascending: false })
            .limit(50);

        if (sessionError || !sessions?.length) {
            console.error("No active sessions found");
            return NextResponse.json({ ok: true });
        }

        // Find matching session by prefix
        const matchingSession = sessions.find(s => 
            s.id.toLowerCase().startsWith(shortSessionId.toLowerCase())
        );

        if (!matchingSession) {
            console.error("No matching session for:", shortSessionId);
            return NextResponse.json({ ok: true });
        }

        // Save admin reply
        const { error: messageError } = await supabase
            .from("chat_messages")
            .insert([{ session_id: matchingSession.id, sender: "admin", message: replyText.trim() }]);

        if (messageError) {
            console.error("Failed to save reply:", messageError);
            return NextResponse.json({ error: "Failed to save reply" }, { status: 500 });
        }

        console.log(`Reply saved for session ${shortSessionId}`);
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Telegram webhook error:", error);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ status: "Telegram webhook is active" });
}
```

---

## Step 5: Create ChatWidget Component

Create `/components/ui/ChatWidget.tsx`:

```typescript
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
    id: string;
    sender: "user" | "admin";
    message: string;
    created_at: string;
}

const POLLING_INTERVAL = 3000;

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [lastTimestamp, setLastTimestamp] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

    useEffect(() => {
        const saved = sessionStorage.getItem("chat_session_id");
        if (saved) setSessionId(saved);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) inputRef.current.focus();
    }, [isOpen]);

    const startSession = async () => {
        try {
            const res = await fetch("/api/chat/start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });
            const data = await res.json();
            if (data.sessionId) {
                setSessionId(data.sessionId);
                sessionStorage.setItem("chat_session_id", data.sessionId);
                return data.sessionId;
            }
        } catch (error) {
            console.error("Failed to start session:", error);
        }
        return null;
    };

    const pollMessages = useCallback(async () => {
        if (!sessionId) return;
        try {
            const url = lastTimestamp
                ? `/api/chat/messages?sessionId=${sessionId}&after=${encodeURIComponent(lastTimestamp)}`
                : `/api/chat/messages?sessionId=${sessionId}`;

            const res = await fetch(url);
            const data = await res.json();

            if (data.messages?.length > 0) {
                setMessages(prev => {
                    const newMsgs = data.messages.filter((m: Message) => !prev.some(p => p.id === m.id));
                    return [...prev, ...newMsgs];
                });
                setLastTimestamp(data.messages[data.messages.length - 1].created_at);
            }
        } catch (error) {
            console.error("Failed to poll messages:", error);
        }
    }, [sessionId, lastTimestamp]);

    useEffect(() => {
        if (!isOpen || !sessionId) return;
        pollMessages();
        const interval = setInterval(pollMessages, POLLING_INTERVAL);
        return () => clearInterval(interval);
    }, [isOpen, sessionId, pollMessages]);

    useEffect(() => {
        if (sessionId && isOpen) {
            setIsLoading(true);
            fetch(`/api/chat/messages?sessionId=${sessionId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.messages) {
                        setMessages(data.messages);
                        if (data.messages.length > 0) {
                            setLastTimestamp(data.messages[data.messages.length - 1].created_at);
                        }
                    }
                })
                .finally(() => setIsLoading(false));
        }
    }, [sessionId, isOpen]);

    const sendMessage = async () => {
        if (!inputValue.trim() || isSending) return;
        const messageText = inputValue.trim();
        setInputValue("");
        setIsSending(true);

        try {
            let currentSessionId = sessionId;
            if (!currentSessionId) {
                currentSessionId = await startSession();
                if (!currentSessionId) throw new Error("Failed to create session");
            }

            const tempId = `temp-${Date.now()}`;
            const tempMessage: Message = {
                id: tempId,
                sender: "user",
                message: messageText,
                created_at: new Date().toISOString(),
            };
            setMessages(prev => [...prev, tempMessage]);

            const res = await fetch("/api/chat/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId: currentSessionId, message: messageText }),
            });
            const data = await res.json();

            if (data.success) {
                setMessages(prev => prev.map(m => m.id === tempId ? { ...m, id: data.messageId, created_at: data.createdAt } : m));
                setLastTimestamp(data.createdAt);
            } else {
                setMessages(prev => prev.filter(m => m.id !== tempId));
            }
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setIsSending(false);
        }
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center ${isOpen ? "rotate-90" : ""}`}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>

            {/* Chat Panel */}
            <div
                className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-out ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
                style={{ height: "480px" }}
            >
                {/* Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
                    <h3 className="text-white font-semibold text-lg">Chat with Us</h3>
                    <p className="text-blue-100 text-sm">We typically reply within minutes</p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <MessageCircle className="w-12 h-12 mb-2 opacity-50" />
                            <p className="text-sm">Send a message to start</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.sender === "user" 
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md" 
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md"}`}
                                >
                                    <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                                    <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                                        {formatTime(msg.created_at)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            disabled={isSending}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!inputValue.trim() || isSending}
                            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
```

---

## Step 6: Add to Layout

In your `/app/layout.tsx`:

```tsx
import { ChatWidget } from "@/components/ui/ChatWidget";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
                <ChatWidget />
            </body>
        </html>
    );
}
```

---

## Step 7: Deploy & Set Webhook

1. **Deploy to Vercel** (or push to trigger auto-deploy)

2. **Set Telegram Webhook** - Open this URL in your browser:

```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://your-domain.com/api/telegram/webhook
```

You should see: `{"ok": true, "result": true, "description": "Webhook was set"}`

---

## Usage

1. **User** visits your website and clicks the chat button
2. **User** sends a message → You receive it on Telegram instantly
3. **You** reply to the Telegram message (use reply/quote feature)
4. **User** sees your reply in the chat widget (within 3 seconds)

---

## Customization

### Change Colors
Edit the gradient classes in `ChatWidget.tsx`:
- `from-blue-600 to-purple-600` → Your brand colors

### Change Polling Interval
Edit `POLLING_INTERVAL` in `ChatWidget.tsx` (in milliseconds)

### Add Sound Notifications
Add to the pollMessages function when new admin messages arrive

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Messages not sending | Check Supabase tables exist and env vars are set |
| No Telegram notification | Verify `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in Vercel |
| Replies not appearing | Ensure webhook is set, use reply feature in Telegram |
| Widget not showing | Check ChatWidget is imported in layout.tsx |

---

## Dependencies

```bash
npm install @supabase/supabase-js lucide-react
```

---

## License

MIT - Use freely on any project!
