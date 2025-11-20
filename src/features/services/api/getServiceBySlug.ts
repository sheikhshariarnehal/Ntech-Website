import { createServerClient } from "@/lib/supabase/server-client";
import { Service } from "../types";

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await createServerClient();
  
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching service with slug ${slug}:`, error);
    return null;
  }

  return data as Service;
}

