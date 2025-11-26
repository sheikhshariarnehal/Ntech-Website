import { createServerClient } from '@/lib/supabase/server-client';
import { NextResponse } from 'next/server';

// Admin routes should always be dynamic
export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createServerClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createServerClient();
  const body = await request.json();
  
  const { data, error } = await supabase
    .from('products')
    .update(body)
    .eq('id', params.id)
    .select()
    .single();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createServerClient();
  
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', params.id);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true });
}
