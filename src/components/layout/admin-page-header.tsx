import { cn } from "@/lib/utils";

interface AdminPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
}

export function AdminPageHeader({
    title,
    subtitle,
    className,
    ...props
}: AdminPageHeaderProps) {
    return (
        <div className={cn("space-y-1", className)} {...props}>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {title}
            </h1>
            {subtitle && (
                <p className="text-sm text-muted-foreground md:text-base">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
