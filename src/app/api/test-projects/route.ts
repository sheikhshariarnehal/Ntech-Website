import { createServerClient } from '@/lib/supabase/server-client';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log('=== Test Projects API ===');
        console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log('ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
        
        const supabase = await createServerClient();
        
        const { data, error, count } = await supabase
            .from('projects')
            .select('*', { count: 'exact' })
            .not('published_at', 'is', null);

        console.log('Query results:');
        console.log('- Error:', error);
        console.log('- Count:', count);
        console.log('- Data length:', data?.length);
        
        if (error) {
            return NextResponse.json({ 
                success: false, 
                error: error.message,
                details: error 
            }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            count: data?.length || 0,
            projects: data 
        });
    } catch (err: any) {
        console.error('Exception in test-projects:', err);
        return NextResponse.json({ 
            success: false, 
            error: err.message,
            stack: err.stack 
        }, { status: 500 });
    }
}
