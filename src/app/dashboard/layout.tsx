import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainHeader } from "@/components/layout/main-header";
import { MainFooter } from "@/components/layout/main-footer";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <MainHeader />
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] py-8">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <nav className="grid items-start gap-2">
                        <Link href="/dashboard">
                            <Button variant="ghost" className="w-full justify-start">
                                Overview
                            </Button>
                        </Link>
                        <Link href="/dashboard/orders">
                            <Button variant="ghost" className="w-full justify-start">
                                Orders
                            </Button>
                        </Link>
                        <Link href="/dashboard/subscriptions">
                            <Button variant="ghost" className="w-full justify-start">
                                Subscriptions
                            </Button>
                        </Link>
                        <Link href="/settings">
                            <Button variant="ghost" className="w-full justify-start">
                                Settings
                            </Button>
                        </Link>
                    </nav>
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
            <MainFooter />
        </div>
    );
}
