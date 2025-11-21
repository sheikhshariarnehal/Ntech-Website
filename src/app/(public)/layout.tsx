import { MainHeader } from "@/components/layout/main-header";
import { MainFooter } from "@/components/layout/main-footer";
import { ScrollToTop } from "@/components/shared/scroll-to-top";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <MainHeader />
            <main className="flex-1">{children}</main>
            <MainFooter />
            <ScrollToTop />
        </div>
    );
}
