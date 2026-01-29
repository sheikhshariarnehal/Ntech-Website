import { createServerClient } from "@/lib/supabase/server-client";
import { NextRequest, NextResponse } from "next/server";

// Admin routes should always be dynamic
export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Fetch a single blog post
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const supabase = await createServerClient();
    
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:profiles(full_name, email)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Update a blog post
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const supabase = await createServerClient();
    const body = await request.json();

    // Set published_at if publishing for the first time
    if (body.is_published && !body.published_at) {
      // Check if already published
      const { data: existing } = await supabase
        .from('posts')
        .select('published_at')
        .eq('id', id)
        .single();

      if (existing && !existing.published_at) {
        body.published_at = new Date().toISOString();
      }
    }

    // Update updated_at
    body.updated_at = new Date().toISOString();

    const { data: post, error } = await supabase
      .from('posts')
      .update(body)
      .eq('id', id)
      .select(`
        *,
        author:profiles(full_name, email)
      `)
      .single();

    if (error) {
      console.error('Error updating post:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to update post' },
        { status: 400 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const supabase = await createServerClient();

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      return NextResponse.json(
        { error: 'Failed to delete post' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
