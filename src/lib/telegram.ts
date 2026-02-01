/**
 * Telegram Bot Integration for Contact Form Notifications
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject?: string;
    message: string;
    source_page?: string;
}

/**
 * Formats contact form data into a readable Telegram message
 */
function formatTelegramMessage(data: ContactFormData): string {
    const lines = [
        "📬 *New Contact Form Submission*",
        "",
        `👤 *Name:* ${escapeMarkdown(data.name)}`,
        `📧 *Email:* ${escapeMarkdown(data.email)}`,
    ];

    if (data.phone) {
        lines.push(`📱 *Phone:* ${escapeMarkdown(data.phone)}`);
    }

    if (data.company) {
        lines.push(`🏢 *Company:* ${escapeMarkdown(data.company)}`);
    }

    if (data.subject) {
        lines.push(`📋 *Subject:* ${escapeMarkdown(data.subject)}`);
    }

    lines.push("");
    lines.push("💬 *Message:*");
    lines.push(escapeMarkdown(data.message));
    lines.push("");
    lines.push(`🌐 *Source:* ${data.source_page || "contact"}`);
    lines.push(`🕐 *Time:* ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })}`);

    return lines.join("\n");
}

/**
 * Escapes special characters for Telegram MarkdownV2 format
 */
function escapeMarkdown(text: string): string {
    return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");
}

/**
 * Sends a message to Telegram using the Bot API
 */
export async function sendTelegramNotification(data: ContactFormData): Promise<boolean> {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.warn("Telegram credentials not configured. Skipping notification.");
        return false;
    }

    const message = formatTelegramMessage(data);
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: "MarkdownV2",
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Telegram API error:", errorData);
            return false;
        }

        console.log("Telegram notification sent successfully");
        return true;
    } catch (error) {
        console.error("Failed to send Telegram notification:", error);
        return false;
    }
}
