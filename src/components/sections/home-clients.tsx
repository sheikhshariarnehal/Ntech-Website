"use client";

const LOGOS = [
    { name: "Acme Corp", color: "bg-red-500" },
    { name: "TechGlobal", color: "bg-blue-500" },
    { name: "InnovateX", color: "bg-green-500" },
    { name: "FutureSystems", color: "bg-purple-500" },
    { name: "AI Solutions", color: "bg-orange-500" },
    { name: "DataFlow", color: "bg-cyan-500" },
];

export function HomeClients() {
    return (
        <section className="py-8 sm:py-10 md:py-12 bg-background border-y border-border overflow-hidden">
            <div className="container mx-auto text-center mb-6 sm:mb-8 px-4 sm:px-6">
                <p className="text-sm font-medium text-muted-foreground/70 uppercase tracking-widest">Trusted by innovative companies</p>
            </div>
            
            <div className="relative flex overflow-x-hidden group">
                <div className="flex animate-marquee whitespace-nowrap">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-8 sm:gap-12 md:gap-16 mx-4 sm:mx-6 md:mx-8">
                            {LOGOS.map((logo, index) => (
                                <div key={index} className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md ${logo.color} opacity-80`} />
                                    <span className="text-base sm:text-lg md:text-xl font-bold font-display text-muted-foreground">{logo.name}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                
                <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
            </div>
        </section>
    );
}
