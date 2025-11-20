'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server-client';

export async function login(formData: FormData) {
  const supabase = await createServerClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (!data.user) {
    return { error: 'No user data returned' };
  }

  // Check if user is admin
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();

  if (profileError || !profile) {
    return { error: 'Failed to load user profile' };
  }

  // Revalidate and redirect
  revalidatePath('/', 'layout');
  
  const userRole = (profile as { role: string }).role;
  if (userRole === 'admin') {
    redirect('/admin');
  } else {
    redirect('/dashboard');
  }
}
