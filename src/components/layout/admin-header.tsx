import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";

export async function AdminHeader() {
  const currentUser = await getCurrentUser();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-6 lg:h-[60px]">
      <MobileNav />
      <div className="w-full flex-1"></div>
      <div className="flex items-center gap-4">
        {currentUser && (
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {currentUser.profile?.full_name || currentUser.user.email}
            </span>
          </div>
        )}
        <form action="/auth/logout" method="post">
          <Button variant="ghost" size="sm" type="submit">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </form>
      </div>
    </header>
  );
}
