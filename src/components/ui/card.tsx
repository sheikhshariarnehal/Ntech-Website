import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { title?: string }
>(({ className, title, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border bg-card text-card-foreground shadow-sm",
            className
        )}
        {...props}
    >
        {title && (
            <div className="flex flex-col space-y-1.5 p-6 pb-0">
                <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
            </div>
        )}
        <div className="p-6 pt-0 mt-6">{children}</div>
    </div>
));
Card.displayName = "Card";

export { Card };
