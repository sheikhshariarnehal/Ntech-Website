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
        <section className="py-12 bg-slate-950 border-y border-slate-900 overflow-hidden">
            <div className="container mx-auto px-6 text-center mb-8">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Trusted by innovative companies</p>
            </div>
            
            <div className="relative flex overflow-x-hidden group">
                <div className="flex animate-marquee whitespace-nowrap">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-16 mx-8">
                            {LOGOS.map((logo, index) => (
                                <div key={index} className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                                    <div className={`w-8 h-8 rounded-md ${logo.color} opacity-80`} />
                                    <span className="text-xl font-bold font-display text-slate-300">{logo.name}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
            </div>
        </section>
    );
}
