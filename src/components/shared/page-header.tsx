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
        <div className={cn("space-y-3 pb-4 pt-4 md:pb-6 md:pt-6 lg:pb-8 lg:pt-8", className)} {...props}>
            <div className="flex flex-col gap-2">
                {/* Animated title with gradient */}
                <h1 className="font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                        {title}
                    </span>
                </h1>
                
                {/* Animated subtitle */}
                {subtitle && (
                    <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-[750px] leading-normal animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                        {subtitle}
                    </p>
                )}
                
                {/* Animated underline accent */}
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full animate-in fade-in slide-in-from-left duration-700 delay-300" />
            </div>
        </div>
    );
}
