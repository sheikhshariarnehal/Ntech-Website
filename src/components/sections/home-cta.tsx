import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeCTA() {
    return (
        <section className="container py-20 lg:py-28">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                    Ready to automate and scale your business?
                </h2>
                <p className="mb-8 text-lg text-muted-foreground">
                    Book a free consultation today and let&apos;s discuss how we can help
                    you achieve your digital goals.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href="/contact">
                        <Button size="lg" className="w-full sm:w-auto font-semibold">
                            Let&apos;s talk
                        </Button>
                    </Link>
                    <Link href="/services">
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto"
                        >
                            View pricing & services
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
