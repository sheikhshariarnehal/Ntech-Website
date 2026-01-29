import { createServerClient } from '@/lib/supabase/server-client';
import { NextRequest, NextResponse } from 'next/server';

// This route requires cookies for authentication
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Valid email is required' },
                { status: 400 }
            );
        }

        const supabase = await createServerClient();

        const { data: existing } = await supabase
            .from('newsletter_subscribers')
            .select('id, status')
            .eq('email', email.toLowerCase())
            .single();

        if (existing) {
            if (existing.status === 'active') {
                return NextResponse.json(
                    { message: 'You are already subscribed!' },
                    { status: 200 }
                );
            } else {
                // Reactivate subscription
                const { error } = await supabase
                    .from('newsletter_subscribers')
                    .update({ 
                        status: 'active', 
                        subscribed_at: new Date().toISOString(),
                        unsubscribed_at: null 
                    })
                    .eq('id', existing.id);

                if (error) throw error;

                return NextResponse.json(
                    { message: 'Welcome back! Your subscription has been reactivated.' },
                    { status: 200 }
                );
            }
        }

        // Insert new subscriber
        const { error } = await supabase
            .from('newsletter_subscribers')
            .insert([{ email: email.toLowerCase() }]);

        if (error) throw error;

        return NextResponse.json(
            { message: 'Successfully subscribed to newsletter!' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { error: 'Failed to subscribe. Please try again.' },
            { status: 500 }
        );
    }
}
