"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-16 h-8 rounded-full p-0.5",
        "bg-secondary/60 hover:bg-secondary/80 border border-border/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "transition-colors duration-200",
        className
      )}
      aria-label={mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
      suppressHydrationWarning
    >
      {/* Track background */}
      <span 
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-300 ease-out",
          mounted && !isDark && "bg-gradient-to-r from-amber-100/30 to-sky-100/30",
          mounted && isDark && "bg-gradient-to-r from-slate-700/30 to-indigo-900/30"
        )}
        suppressHydrationWarning
      />
      
      {/* Toggle knob */}
      <span 
        className={cn(
          "relative z-10 flex items-center justify-center w-7 h-7 rounded-full shadow-md",
          "transition-all duration-300 ease-out transform",
          mounted && isDark && "translate-x-0 bg-gradient-to-br from-indigo-500 to-purple-600",
          mounted && !isDark && "translate-x-[30px] bg-gradient-to-br from-amber-400 to-orange-500",
          !mounted && "translate-x-0 bg-gradient-to-br from-indigo-500 to-purple-600"
        )}
        suppressHydrationWarning
      >
        {/* Icons with CSS transitions */}
        <Sun 
          className={cn(
            "absolute h-4 w-4 text-white transition-all duration-200",
            mounted && !isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
          )}
          suppressHydrationWarning
        />
        <Moon 
          className={cn(
            "absolute h-4 w-4 text-white transition-all duration-200",
            mounted && isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
          )}
          suppressHydrationWarning
        />
      </span>

      {/* Track icons */}
      <span className="absolute inset-y-0 left-1.5 flex items-center pointer-events-none">
        <Moon 
          className={cn(
            "h-3 w-3 transition-opacity duration-200",
            mounted && !isDark ? "opacity-30 text-slate-600" : "opacity-0"
          )}
          suppressHydrationWarning
        />
      </span>
      <span className="absolute inset-y-0 right-1.5 flex items-center pointer-events-none">
        <Sun 
          className={cn(
            "h-3 w-3 transition-opacity duration-200",
            mounted && isDark ? "opacity-30 text-slate-400" : "opacity-0"
          )}
          suppressHydrationWarning
        />
      </span>
    </button>
  );
}

// Compact version for mobile - simpler, faster
export function ThemeToggleCompact({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-9 h-9 rounded-full",
        "bg-secondary/60 hover:bg-secondary/80 border border-border/50",
        "flex items-center justify-center",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "transition-colors duration-200 active:scale-95",
        className
      )}
      aria-label={mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
      suppressHydrationWarning
    >
      <Sun 
        className={cn(
          "absolute h-[18px] w-[18px] text-foreground transition-all duration-200",
          mounted && !isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
        )}
        suppressHydrationWarning
      />
      <Moon 
        className={cn(
          "absolute h-[18px] w-[18px] text-foreground transition-all duration-200",
          mounted && isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
        )}
        suppressHydrationWarning
      />
    </button>
  );
}
