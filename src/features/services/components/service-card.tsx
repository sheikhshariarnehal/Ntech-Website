import Link from "next/link";
import { ArrowRight, Code, Smartphone, Bot, Globe, Database, Cloud, Shield, Zap, Palette, LineChart, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Service } from "../types";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  service: Service;
}

const iconMap: Record<string, any> = {
  "web-development": Code,
  "mobile-app-development": Smartphone,
  "app-development": Smartphone,
  "ai-automation": Bot,
  "google-gemini-pro": Sparkles,
  "seo-optimization": LineChart,
  "seo": LineChart,
  "ui-ux-design": Palette,
  "database": Database,
  "cloud": Cloud,
  "security": Shield,
  "consulting": Zap,
};

export function ServiceCard({ service }: ServiceCardProps) {
  // Check if the icon field contains a URL
  const isIconUrl = service.icon?.startsWith("http") || service.icon?.startsWith("/");
  
  // Fallback to Code icon if specific icon not found or mapped
  const Icon = iconMap[service.slug] || iconMap[service.icon || ""] || Code;

  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-muted/60">
      <CardHeader>
        <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
          {isIconUrl && service.icon ? (
            // Using img tag for external URLs to avoid Next.js Image config requirements for arbitrary domains
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={service.icon} 
              alt={service.name} 
              className="w-6 h-6 object-contain" 
            />
          ) : (
            <Icon className="w-6 h-6" />
          )}
        </div>
        <CardTitle className="text-xl">{service.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">
          {service.short_description || service.full_description}
        </p>
        {service.starting_price && (
            <div className="mt-4">
                <Badge variant="secondary" className="text-xs font-normal">
                    Starts at ${service.starting_price}
                </Badge>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/services/${service.slug}`} className="w-full">
          <Button className="w-full group">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
