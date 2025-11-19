import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
}

export function PageHeader({
    title,
    subtitle,
    className,
    ...props
}: PageHeaderProps) {
    return (
        <div className={cn("grid gap-1 py-4 md:py-8", className)} {...props}>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {title}
            </h1>
            {subtitle && (
                <p className="text-lg text-muted-foreground">{subtitle}</p>
            )}
        </div>
    );
}
