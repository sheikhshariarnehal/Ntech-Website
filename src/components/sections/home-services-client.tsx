"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
    Globe, 
    Smartphone, 
    Bot, 
    Search, 
    Palette, 
    ShoppingCart, 
    ArrowRight, 
    Check,
    Code2,
    Database,
    Cloud,
    Cpu,
    Layers,
    Megaphone,
    LineChart,
    Zap,
    Shield,
    Settings
} from "lucide-react";
import Image from "next/image";

interface Service {
    id: string;
    name: string;
    short_description: string | null;
    icon: string | null;
    features: string[] | null;
    slug: string;
}

interface HomeServicesClientProps {
    services: Service[];
}

// Comprehensive icon and style mapping for services
const SERVICE_STYLES: Record<string, { 
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
    borderColor: string;
    gradientFrom: string;
    gradientTo: string;
}> = {
    'web-development': {
        icon: Globe,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        gradientFrom: 'from-blue-500/20',
        gradientTo: 'to-blue-600/5'
    },
    'mobile-app-development': {
        icon: Smartphone,
        color: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
        borderColor: 'border-violet-500/20',
        gradientFrom: 'from-violet-500/20',
        gradientTo: 'to-violet-600/5'
    },
    'app-development': {
        icon: Smartphone,
        color: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
        borderColor: 'border-violet-500/20',
        gradientFrom: 'from-violet-500/20',
        gradientTo: 'to-violet-600/5'
    },
    'ai-automation': {
        icon: Bot,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/20',
        gradientFrom: 'from-purple-500/20',
        gradientTo: 'to-purple-600/5'
    },
    'seo-optimization': {
        icon: Search,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
        gradientFrom: 'from-green-500/20',
        gradientTo: 'to-green-600/5'
    },
    'seo': {
        icon: LineChart,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
        gradientFrom: 'from-green-500/20',
        gradientTo: 'to-green-600/5'
    },
    'ui-ux-design': {
        icon: Palette,
        color: 'text-pink-500',
        bgColor: 'bg-pink-500/10',
        borderColor: 'border-pink-500/20',
        gradientFrom: 'from-pink-500/20',
        gradientTo: 'to-pink-600/5'
    },
    'premium-subscriptions': {
        icon: ShoppingCart,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/20',
        gradientFrom: 'from-amber-500/20',
        gradientTo: 'to-amber-600/5'
    },
    'database': {
        icon: Database,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/20',
        gradientFrom: 'from-cyan-500/20',
        gradientTo: 'to-cyan-600/5'
    },
    'cloud': {
        icon: Cloud,
        color: 'text-sky-500',
        bgColor: 'bg-sky-500/10',
        borderColor: 'border-sky-500/20',
        gradientFrom: 'from-sky-500/20',
        gradientTo: 'to-sky-600/5'
    },
    'api-development': {
        icon: Code2,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/20',
        gradientFrom: 'from-orange-500/20',
        gradientTo: 'to-orange-600/5'
    },
    'consulting': {
        icon: Settings,
        color: 'text-slate-500',
        bgColor: 'bg-slate-500/10',
        borderColor: 'border-slate-500/20',
        gradientFrom: 'from-slate-500/20',
        gradientTo: 'to-slate-600/5'
    },
    'security': {
        icon: Shield,
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/20',
        gradientFrom: 'from-red-500/20',
        gradientTo: 'to-red-600/5'
    },
    'digital-marketing': {
        icon: Megaphone,
        color: 'text-rose-500',
        bgColor: 'bg-rose-500/10',
        borderColor: 'border-rose-500/20',
        gradientFrom: 'from-rose-500/20',
        gradientTo: 'to-rose-600/5'
    },
    'google-gemini-pro': {
        icon: Cpu,
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-500/10',
        borderColor: 'border-indigo-500/20',
        gradientFrom: 'from-indigo-500/20',
        gradientTo: 'to-indigo-600/5'
    },
    'saas': {
        icon: Layers,
        color: 'text-teal-500',
        bgColor: 'bg-teal-500/10',
        borderColor: 'border-teal-500/20',
        gradientFrom: 'from-teal-500/20',
        gradientTo: 'to-teal-600/5'
    },
    'default': {
        icon: Zap,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/20',
        gradientFrom: 'from-emerald-500/20',
        gradientTo: 'to-emerald-600/5'
    }
};

// Animation variants for staggered children
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12
        }
    }
};

export function HomeServicesClient({ services }: HomeServicesClientProps) {
    return (
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background relative overflow-hidden" id="services">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,hsl(var(--muted)/0.03)_49%,hsl(var(--muted)/0.03)_51%,transparent_51%,transparent_100%)] bg-[length:80px_80px] pointer-events-none" />
            
            <div className="container relative px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-12 sm:mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block px-4 py-1.5 mb-4 text-xs sm:text-sm font-medium tracking-wide text-primary bg-primary/10 rounded-full border border-primary/20">
                        What We Do
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground mb-4 sm:mb-6 tracking-tight">
                        Our Expertise
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
                        Bridging the gap between complex technology and accessible solutions for your business.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {services.map((service) => {
                        const style = SERVICE_STYLES[service.slug] || SERVICE_STYLES.default;
                        const IconComponent = style.icon;
                        
                        return (
                            <motion.div
                                key={service.id}
                                variants={itemVariants}
                                className="group"
                            >
                                <Link 
                                    href={`/services/${service.slug}`}
                                    className="block h-full"
                                >
                                    <article className={`
                                        relative h-full p-5 sm:p-6 lg:p-7
                                        bg-card/60 backdrop-blur-sm
                                        rounded-2xl sm:rounded-3xl
                                        border border-border/50
                                        transition-all duration-300 ease-out
                                        hover:border-border
                                        hover:shadow-xl hover:shadow-black/5
                                        active:scale-[0.98]
                                        touch-manipulation
                                        overflow-hidden
                                    `}>
                                        {/* Gradient overlay on hover */}
                                        <div className={`
                                            absolute inset-0 bg-gradient-to-br ${style.gradientFrom} ${style.gradientTo}
                                            opacity-0 group-hover:opacity-100
                                            transition-opacity duration-500
                                            pointer-events-none
                                        `} />
                                        
                                        {/* Content */}
                                        <div className="relative z-10">
                                            {/* Icon */}
                                            <div className={`
                                                w-12 h-12 sm:w-14 sm:h-14
                                                rounded-xl sm:rounded-2xl
                                                ${style.bgColor} ${style.borderColor}
                                                border
                                                flex items-center justify-center
                                                mb-4 sm:mb-5
                                                transition-transform duration-300 ease-out
                                                group-hover:scale-110 group-hover:rotate-3
                                            `}>
                                                {service.icon?.startsWith('http') || service.icon?.startsWith('/') ? (
                                                    <Image 
                                                        src={service.icon} 
                                                        alt=""
                                                        width={28}
                                                        height={28}
                                                        className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                                                    />
                                                ) : (
                                                    <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 ${style.color}`} />
                                                )}
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-2 sm:mb-3 tracking-tight group-hover:text-foreground/90 transition-colors">
                                                {service.name}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-5 line-clamp-2">
                                                {service.short_description || 'Professional solutions tailored to your needs.'}
                                            </p>

                                            {/* Features */}
                                            {service.features && service.features.length > 0 && (
                                                <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6">
                                                    {service.features.slice(0, 4).map((feature, i) => (
                                                        <li 
                                                            key={i} 
                                                            className="flex items-start gap-2.5 sm:gap-3 text-sm text-foreground/80"
                                                        >
                                                            <span className={`
                                                                flex-shrink-0 w-5 h-5 sm:w-5 sm:h-5
                                                                rounded-full ${style.bgColor}
                                                                flex items-center justify-center
                                                                mt-0.5
                                                            `}>
                                                                <Check className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${style.color}`} />
                                                            </span>
                                                            <span className="leading-snug">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* CTA */}
                                            <div className={`
                                                inline-flex items-center gap-2
                                                text-sm sm:text-base font-medium
                                                ${style.color}
                                                transition-all duration-300
                                                group-hover:gap-3
                                            `}>
                                                <span>Learn More</span>
                                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* View All Services Link */}
                <motion.div 
                    className="text-center mt-10 sm:mt-12 md:mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link 
                        href="/services"
                        className="
                            inline-flex items-center gap-2
                            px-6 sm:px-8 py-3 sm:py-4
                            text-sm sm:text-base font-medium
                            bg-primary text-primary-foreground
                            rounded-full
                            transition-all duration-300
                            hover:bg-primary/90 hover:gap-3
                            hover:shadow-lg hover:shadow-primary/25
                            active:scale-[0.98]
                            touch-manipulation
                        "
                    >
                        <span>View All Services</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
