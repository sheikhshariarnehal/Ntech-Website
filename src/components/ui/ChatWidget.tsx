"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
    id: string;
    sender: "user" | "admin";
    message: string;
    created_at: string;
}

const POLLING_INTERVAL = 3000; // 3 seconds

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

    // Scroll to bottom when messages change
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // Load session from sessionStorage
    useEffect(() => {
        const savedSession = sessionStorage.getItem("chat_session_id");
        if (savedSession) {
            setSessionId(savedSession);
        }
    }, []);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Start a new session
    const startSession = async () => {
        try {
            const response = await fetch("/api/chat/start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });
            const data = await response.json();
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

    // Poll for new messages
    const pollMessages = useCallback(async () => {
        if (!sessionId) return;

        try {
            const url = lastTimestamp
                ? `/api/chat/messages?sessionId=${sessionId}&after=${encodeURIComponent(lastTimestamp)}`
                : `/api/chat/messages?sessionId=${sessionId}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.messages && data.messages.length > 0) {
                setMessages(prev => {
                    const newMessages = data.messages.filter(
                        (msg: Message) => !prev.some(p => p.id === msg.id)
                    );
                    return [...prev, ...newMessages];
                });
                // Update last timestamp to the newest message
                const newestMessage = data.messages[data.messages.length - 1];
                setLastTimestamp(newestMessage.created_at);
            }
        } catch (error) {
            console.error("Failed to poll messages:", error);
        }
    }, [sessionId, lastTimestamp]);

    // Set up polling when chat is open and session exists
    useEffect(() => {
        if (!isOpen || !sessionId) return;

        // Initial fetch
        pollMessages();

        // Poll every 3 seconds
        const interval = setInterval(pollMessages, POLLING_INTERVAL);
        return () => clearInterval(interval);
    }, [isOpen, sessionId, pollMessages]);

    // Load existing messages when session is restored
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
                .catch(console.error)
                .finally(() => setIsLoading(false));
        }
    }, [sessionId, isOpen]);

    // Send a message
    const sendMessage = async () => {
        if (!inputValue.trim() || isSending) return;

        const messageText = inputValue.trim();
        setInputValue("");
        setIsSending(true);

        try {
            let currentSessionId = sessionId;
            if (!currentSessionId) {
                currentSessionId = await startSession();
                if (!currentSessionId) {
                    throw new Error("Failed to create session");
                }
            }

            // Optimistically add message
            const tempId = `temp-${Date.now()}`;
            const tempMessage: Message = {
                id: tempId,
                sender: "user",
                message: messageText,
                created_at: new Date().toISOString(),
            };
            setMessages(prev => [...prev, tempMessage]);

            const response = await fetch("/api/chat/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId: currentSessionId,
                    message: messageText,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Update temp message with real ID
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === tempId
                            ? { ...msg, id: data.messageId, created_at: data.createdAt }
                            : msg
                    )
                );
                setLastTimestamp(data.createdAt);
            } else {
                // Remove optimistic message on failure
                setMessages(prev => prev.filter(msg => msg.id !== tempId));
                console.error("Failed to send message:", data.error);
            }
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    fixed bottom-6 right-6 z-50 
                    w-14 h-14 rounded-full 
                    bg-gradient-to-r from-blue-600 to-purple-600 
                    text-white shadow-lg 
                    hover:shadow-xl hover:scale-110 
                    transition-all duration-300 
                    flex items-center justify-center
                    ${isOpen ? "rotate-90" : ""}
                `}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageCircle className="w-6 h-6" />
                )}
            </button>

            {/* Chat Panel */}
            <div
                className={`
                    fixed bottom-24 right-6 z-50
                    w-[360px] max-w-[calc(100vw-48px)]
                    bg-white dark:bg-gray-900
                    rounded-2xl shadow-2xl
                    border border-gray-200 dark:border-gray-700
                    flex flex-col
                    transition-all duration-300 ease-out
                    ${isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }
                `}
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
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                            <MessageCircle className="w-12 h-12 mb-2 opacity-50" />
                            <p className="text-sm">Send a message to start the conversation</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`
                                        max-w-[80%] px-4 py-2 rounded-2xl
                                        ${msg.sender === "user"
                                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md"
                                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md"
                                        }
                                    `}
                                >
                                    <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                                    <p
                                        className={`text-xs mt-1 ${msg.sender === "user"
                                            ? "text-blue-100"
                                            : "text-gray-500 dark:text-gray-400"
                                            }`}
                                    >
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
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="
                                flex-1 px-4 py-2 
                                bg-gray-100 dark:bg-gray-800 
                                border border-gray-200 dark:border-gray-700
                                rounded-full 
                                text-gray-900 dark:text-gray-100
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                text-sm
                            "
                            disabled={isSending}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!inputValue.trim() || isSending}
                            className="
                                w-10 h-10 rounded-full
                                bg-gradient-to-r from-blue-600 to-purple-600
                                text-white
                                flex items-center justify-center
                                hover:shadow-lg hover:scale-105
                                transition-all duration-200
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                            "
                            aria-label="Send message"
                        >
                            {isSending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Send className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
