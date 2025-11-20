import { createServerClient } from "@/lib/supabase/server-client";
import { Service } from "../types";

export async function getServices(): Promise<Service[]> {
  const supabase = await createServerClient();
  
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return data as Service[];
}

