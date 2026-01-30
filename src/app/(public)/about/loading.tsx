export default function AboutLoading() {
    return (
        <div className="min-h-screen animate-pulse">
            {/* Hero Section Skeleton */}
            <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b">
                <div className="container px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
                    <div className="max-w-4xl mx-auto text-center space-y-4">
                        <div className="inline-flex h-8 w-48 rounded-full bg-muted/50 mb-4" />
                        <div className="h-12 sm:h-16 bg-muted/50 rounded-lg w-full max-w-3xl mx-auto" />
                        <div className="h-6 bg-muted/50 rounded-lg w-full max-w-2xl mx-auto" />
                    </div>
                </div>
            </section>

            {/* What We Do Section Skeleton */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-3">
                        <div className="h-10 bg-muted/50 rounded-lg w-64 mx-auto" />
                        <div className="h-6 bg-muted/50 rounded-lg w-96 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                        {[1, 2].map((i) => (
                            <div key={i} className="rounded-xl sm:rounded-2xl border bg-card p-6 sm:p-8 space-y-4">
                                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-muted/50" />
                                <div className="h-8 bg-muted/50 rounded-lg w-3/4" />
                                <div className="h-4 bg-muted/50 rounded-lg w-full" />
                                <div className="space-y-3">
                                    {[1, 2, 3].map((j) => (
                                        <div key={j} className="flex gap-3">
                                            <div className="h-5 w-5 rounded bg-muted/50 flex-shrink-0" />
                                            <div className="h-4 bg-muted/50 rounded-lg w-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section Skeleton */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/50">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 sm:mb-12 space-y-3">
                            <div className="h-10 bg-muted/50 rounded-lg w-64 mx-auto" />
                            <div className="h-6 bg-muted/50 rounded-lg w-96 mx-auto" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="text-center p-5 sm:p-6 rounded-xl bg-background border space-y-3">
                                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-muted/50 mx-auto" />
                                    <div className="h-6 bg-muted/50 rounded-lg w-32 mx-auto" />
                                    <div className="h-4 bg-muted/50 rounded-lg w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Section Skeleton */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 sm:mb-12 space-y-3">
                            <div className="h-10 bg-muted/50 rounded-lg w-64 mx-auto" />
                            <div className="h-6 bg-muted/50 rounded-lg w-96 mx-auto" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex gap-3 sm:gap-4">
                                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-muted/50 flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-6 bg-muted/50 rounded-lg w-32" />
                                        <div className="h-4 bg-muted/50 rounded-lg w-full" />
                                        <div className="h-4 bg-muted/50 rounded-lg w-3/4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section Skeleton */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <div className="h-10 bg-muted/50 rounded-lg w-96 mx-auto" />
                        <div className="h-6 bg-muted/50 rounded-lg w-full max-w-2xl mx-auto" />
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <div className="h-12 bg-muted/50 rounded-lg w-full sm:w-40" />
                            <div className="h-12 bg-muted/50 rounded-lg w-full sm:w-40" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
