import { Button } from "@/components/ui/button";

export function AdminHeader() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 lg:h-[60px]">
            <div className="w-full flex-1">
                <h1 className="font-semibold text-lg">Dashboard</h1>
            </div>
            <Button variant="ghost" size="sm">
                Logout
            </Button>
        </header>
    );
}
