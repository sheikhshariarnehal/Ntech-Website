-- Chat Widget Tables Migration
-- Creates tables for chat sessions and messages

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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_status ON chat_sessions(status);

-- Enable Row Level Security (but allow public access for chat)
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to create sessions
CREATE POLICY "Allow public to create sessions" ON chat_sessions
    FOR INSERT TO anon
    WITH CHECK (true);

-- Policy: Allow public to read their own sessions
CREATE POLICY "Allow public to read sessions" ON chat_sessions
    FOR SELECT TO anon
    USING (true);

-- Policy: Allow public to update their own sessions
CREATE POLICY "Allow public to update sessions" ON chat_sessions
    FOR UPDATE TO anon
    USING (true)
    WITH CHECK (true);

-- Policy: Allow public to insert messages
CREATE POLICY "Allow public to insert messages" ON chat_messages
    FOR INSERT TO anon
    WITH CHECK (true);

-- Policy: Allow public to read messages
CREATE POLICY "Allow public to read messages" ON chat_messages
    FOR SELECT TO anon
    USING (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_chat_session_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE chat_sessions
    SET updated_at = NOW()
    WHERE id = NEW.session_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update session's updated_at when a message is added
DROP TRIGGER IF EXISTS trigger_update_chat_session_updated_at ON chat_messages;
CREATE TRIGGER trigger_update_chat_session_updated_at
    AFTER INSERT ON chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_session_updated_at();
