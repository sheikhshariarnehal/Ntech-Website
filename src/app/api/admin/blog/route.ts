import { createServerClient } from "@/lib/supabase/server-client";
import { NextRequest, NextResponse } from "next/server";

// Admin routes should always be dynamic
export const dynamic = 'force-dynamic';

// GET - Fetch all blog posts
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:profiles(full_name, email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: 500 }
      );
    }

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const body = await request.json();

    // Generate slug from title if not provided
    let slug = body.slug;
    if (!slug && body.title) {
      slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Set published_at if publishing
    const published_at = body.is_published && !body.published_at 
      ? new Date().toISOString() 
      : body.published_at;

    const postData = {
      title: body.title,
      content: body.content,
      slug: slug,
      excerpt: body.excerpt || null,
      author_id: body.author_id || null,
      cover_image_url: body.cover_image_url || null,
      tags: body.tags || null,
      is_published: body.is_published || false,
      published_at: published_at || null,
      seo_title: body.seo_title || null,
      seo_description: body.seo_description || null,
      seo_keywords: body.seo_keywords || null,
    };

    const { data: post, error } = await (supabase
      .from('posts') as any)
      .insert(postData)
      .select(`
        *,
        author:profiles(full_name, email)
      `)
      .single();

    if (error) {
      console.error('Error creating post:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to create post' },
        { status: 400 }
      );
    }

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete multiple posts
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids')?.split(',');

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { error: 'No post IDs provided' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .in('id', ids);

    if (error) {
      console.error('Error deleting posts:', error);
      return NextResponse.json(
        { error: 'Failed to delete posts' },
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
