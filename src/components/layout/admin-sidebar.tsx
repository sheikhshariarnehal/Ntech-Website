"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const sidebarItems = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/services", label: "Services" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/blog", label: "Blog" },
    { href: "/admin/team", label: "Team" },
    { href: "/admin/settings", label: "Settings" },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
            <div className="flex h-14 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <span>{siteConfig.name} Admin</span>
                </Link>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="grid gap-1 px-2">
                    {sidebarItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                                    pathname === item.href
                                        ? "bg-muted text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
