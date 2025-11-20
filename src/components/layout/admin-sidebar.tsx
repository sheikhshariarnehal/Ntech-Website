"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import {
  LayoutDashboard,
  Briefcase,
  Package,
  FolderKanban,
  ShoppingCart,
  Users,
  FileText,
  MessageSquare,
  Settings,
  Globe,
} from "lucide-react";

const sidebarItems = [
  {
    section: "Main",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    section: "Content",
    items: [
      { href: "/admin/services", label: "Services", icon: Briefcase },
      { href: "/admin/products", label: "Products", icon: Package },
      { href: "/admin/projects", label: "Projects", icon: FolderKanban },
      { href: "/admin/blog", label: "Blog", icon: FileText },
    ],
  },
  {
    section: "Business",
    items: [
      { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
      { href: "/admin/customers", label: "Customers", icon: Users },
      { href: "/admin/leads", label: "Leads", icon: MessageSquare },
    ],
  },
  {
    section: "Configuration",
    items: [
      { href: "/admin/team", label: "Team", icon: Users },
      { href: "/admin/seo", label: "SEO", icon: Globe },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
        <Link href="/admin" className="flex items-center gap-2 font-semibold" onClick={onLinkClick}>
          <LayoutDashboard className="h-5 w-5" />
          <span>{siteConfig.name} Admin</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-6 px-3">
          {sidebarItems.map((section) => (
            <div key={section.section}>
              <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.section}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onLinkClick}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-muted",
                          isActive
                            ? "bg-muted text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}

export function AdminSidebar() {
  return (
    <aside className="hidden border-r bg-background md:flex md:flex-col md:w-[220px] lg:w-[280px] sticky top-0 h-screen">
      <SidebarContent />
    </aside>
  );
}