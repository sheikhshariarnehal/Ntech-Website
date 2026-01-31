import { createClient } from "@/lib/supabase/server";
import { HomeServicesClient } from "./home-services-client";

export async function HomeServices() {
    const supabase = await createClient();
    
    // Fetch services from Supabase
    const { data: services, error } = await supabase
        .from('services')
        .select('id, name, short_description, icon, features, slug')
        .eq('is_active', true)
        .order('created_at', { ascending: true })
        .limit(3);

    if (error) {
        console.error('Error fetching services:', error);
        return null;
    }

    // If no services found, return null
    if (!services || services.length === 0) {
        return null;
    }

    return <HomeServicesClient services={services} />;
}
