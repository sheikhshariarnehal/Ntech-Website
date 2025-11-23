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
        <div className={cn("space-y-4 pb-8 pt-4 md:pb-12 md:pt-6 lg:pb-16 lg:pt-8 text-center", className)} {...props}>
            <div className="flex flex-col items-center gap-3">
                {/* Animated title with gradient */}
                <h1 className="font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                        {title}
                    </span>
                </h1>
                
                {/* Animated subtitle */}
                {subtitle && (
                    <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                        {subtitle}
                    </p>
                )}
                
                {/* Animated underline accent */}
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full animate-in fade-in slide-in-from-left duration-700 delay-300" />
            </div>
        </div>
    );
}
