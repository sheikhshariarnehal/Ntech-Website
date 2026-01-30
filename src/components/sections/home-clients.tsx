import { Database } from "@/types/supabase";
import Image from "next/image";

type TrustedCompany = Database['public']['Tables']['trusted_companies']['Row'];

interface HomeClientsProps {
    companies: Pick<TrustedCompany, 'id' | 'name' | 'logo_url' | 'website_url'>[];
}

export function HomeClients({ companies }: HomeClientsProps) {
    if (companies.length === 0) {
        return null; 
    }

    return (
        <section className="py-8 sm:py-10 md:py-12 bg-background border-y border-border overflow-hidden" aria-label="Trusted Companies">
            <div className="container text-center mb-6 sm:mb-8">
                <p className="text-sm font-medium text-muted-foreground/70 uppercase tracking-widest">Trusted by innovative companies</p>
            </div>
            
            <div className="flex overflow-hidden group relative" role="region" aria-label="Company logos marquee">
                <ul className="flex min-w-full shrink-0 animate-marquee items-center justify-start gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 md:px-8 group-hover:[animation-play-state:paused] will-change-transform">
                    {companies.map((company) => (
                        <li key={company.id}>
                            <CompanyItem company={company} />
                        </li>
                    ))}
                </ul>
                <ul className="flex min-w-full shrink-0 animate-marquee items-center justify-start gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 md:px-8 group-hover:[animation-play-state:paused] will-change-transform" aria-hidden="true">
                    {companies.map((company) => (
                        <li key={`clone-${company.id}`}>
                            <CompanyItem company={company} />
                        </li>
                    ))}
                </ul>
                
                <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
            </div>
        </section>
    );
}

function CompanyItem({ company }: { company: Pick<TrustedCompany, 'name' | 'logo_url' | 'website_url'> }) {
    return (
        <a 
            href={company.website_url || "#"} 
            target={company.website_url ? "_blank" : "_self"}
            rel={company.website_url ? "noopener noreferrer" : ""}
            className="flex items-center gap-3 opacity-100 hover:opacity-100 transition-all duration-500 cursor-pointer group/item"
            tabIndex={company.website_url ? 0 : -1}
        >
            {company.logo_url && (
                <div className="relative h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 overflow-hidden rounded-md">
                    <Image 
                        src={company.logo_url} 
                        alt={company.name} 
                        fill 
                        sizes="(max-width: 640px) 20px, 24px"
                        className="object-contain"
                    />
                </div>
            )}
            <span className="text-base sm:text-lg font-semibold font-display text-muted-foreground group-hover/item:text-foreground transition-colors whitespace-nowrap">{company.name}</span>
        </a>
    );
}
