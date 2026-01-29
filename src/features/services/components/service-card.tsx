import Link from "next/link";
import { ArrowRight, Code, Smartphone, Bot, Database, Cloud, Shield, Zap, Palette, LineChart, Sparkles, Check, Laptop, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Service } from "../types";

interface ServiceCardProps {
  service: Service;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "web-development": Laptop,
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
  "premium-subscriptions": ShoppingCart,
};

// Feature mapping for services
const serviceFeatures: Record<string, string[]> = {
  "web-development": [
    "Custom Web Apps",
    "Mobile Development",
    "SaaS Platforms",
    "API Integration"
  ],
  "ai-automation": [
    "Custom Chatbots",
    "Workflow Automation",
    "Data Analysis",
    "AI Integration"
  ],
  "premium-subscriptions": [
    "Instant Delivery",
    "24/7 Support",
    "Competitive Pricing",
    "Secure Payment"
  ],
};

export function ServiceCard({ service }: ServiceCardProps) {
  // Check if the icon field contains a URL
  const isIconUrl = service.icon?.startsWith("http") || service.icon?.startsWith("/");
  
  // Fallback to Code icon if specific icon not found or mapped
  const Icon = iconMap[service.slug] || iconMap[service.icon || ""] || Code;
  
  // Get features - use database features if available, otherwise use defaults
  const features = service.features && service.features.length > 0 
    ? service.features 
    : (serviceFeatures[service.slug] || [
        "Professional Quality",
        "Expert Support",
        "Scalable Solutions",
        "Best Practices"
      ]);

  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="space-y-6 pb-6">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary overflow-hidden flex-shrink-0">
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
        <h3 className="text-2xl font-semibold tracking-tight">{service.name}</h3>
      </CardHeader>

      <CardContent className="flex-grow space-y-6 pb-6">
        <p className="text-muted-foreground leading-relaxed">
          {service.short_description || service.full_description}
        </p>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Link 
          href={`/services/${service.slug}`} 
          className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          Learn More
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
