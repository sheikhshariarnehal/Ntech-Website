export function HomeClients() {
    const clients = [
        "TechCorp",
        "InnovateX",
        "SaaSify",
        "GlobalScale",
        "FutureNet",
        "AlphaWave",
    ];

    return (
        <section className="border-y bg-muted/30 py-12">
            <div className="container">
                <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
                    Trusted by innovative teams and brands like
                </p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {clients.map((client) => (
                        <div
                            key={client}
                            className="flex items-center justify-center text-xl font-bold text-muted-foreground/50 grayscale transition-all hover:text-foreground hover:grayscale-0"
                        >
                            {client}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
