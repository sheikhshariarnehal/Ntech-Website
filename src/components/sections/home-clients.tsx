import { Database } from "@/types/supabase";
import Image from "next/image";

type TrustedCompany = Database['public']['Tables']['trusted_companies']['Row'];

interface HomeClientsProps {
    companies: TrustedCompany[];
}

export function HomeClients({ companies }: HomeClientsProps) {
    if (companies.length === 0) {
        return null; 
    }

    return (
        <section className="py-8 sm:py-10 md:py-12 bg-background border-y border-border overflow-hidden">
            <div className="container mx-auto text-center mb-6 sm:mb-8 px-4 sm:px-6">
                <p className="text-sm font-medium text-muted-foreground/70 uppercase tracking-widest">Trusted by innovative companies</p>
            </div>
            
            <div className="flex overflow-hidden group relative">
                <div className="flex min-w-full shrink-0 animate-marquee items-center justify-start gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 md:px-8 group-hover:[animation-play-state:paused]">
                    {companies.map((company, index) => (
                        <CompanyItem key={index} company={company} />
                    ))}
                </div>
                <div className="flex min-w-full shrink-0 animate-marquee items-center justify-start gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 md:px-8 group-hover:[animation-play-state:paused]">
                    {companies.map((company, index) => (
                        <CompanyItem key={`clone-${index}`} company={company} />
                    ))}
                </div>
                
                <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
            </div>
        </section>
    );
}

function CompanyItem({ company }: { company: TrustedCompany }) {
    return (
        <a 
            href={company.website_url || "#"} 
            target={company.website_url ? "_blank" : "_self"}
            rel={company.website_url ? "noopener noreferrer" : ""}
            className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group/item"
        >
            {company.logo_url && (
                <div className="relative h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 overflow-hidden rounded-md">
                    <Image 
                        src={company.logo_url} 
                        alt={company.name} 
                        fill 
                        className="object-contain"
                    />
                </div>
            )}
            <span className="text-base sm:text-lg font-semibold font-display text-muted-foreground group-hover/item:text-foreground transition-colors whitespace-nowrap">{company.name}</span>
        </a>
    );
}
