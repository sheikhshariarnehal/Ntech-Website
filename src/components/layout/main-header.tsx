"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    Menu, X, Sparkles, ChevronDown, Code, Bot, ShoppingBag, 
    Briefcase, Zap, Rocket,
    Smartphone, Palette, LineChart, Wand2,
    Video, Image as ImageIcon, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ThemeToggle, ThemeToggleCompact } from "@/components/ui/theme-toggle";

// --- Utility Functions ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface MegaMenuItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
    description: string;
    featured?: boolean;
    badge?: string;
}

interface MegaMenuSection {
    title: string;
    items: MegaMenuItem[];
}

interface MegaMenuCTA {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
    icon: React.ComponentType<{ className?: string }>;
}

interface MegaMenuData {
    title: string;
    sections: MegaMenuSection[];
    cta: MegaMenuCTA;
}

// --- Components ---
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'ghost' | 'outline', size?: 'default' | 'sm' | 'lg' }>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm"
    };
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8"
    };
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export function MainHeader() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
    const [hoveredNav, setHoveredNav] = React.useState<string | null>(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const isScrolled = latest > 20;
        if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
        }
    });

    // Close menu when clicking outside or on a link
    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const megaMenuData: Record<string, MegaMenuData> = {
        services: {
            title: "Services",
            sections: [
                {
                    title: "Development",
                    items: [
                        { 
                            icon: Code, 
                            label: "Web Development", 
                            href: "/services#web-development",
                            description: "Modern web apps & SaaS platforms",
                            featured: true
                        },
                        { 
                            icon: Smartphone, 
                            label: "Mobile Apps", 
                            href: "/services#mobile-app-development",
                            description: "iOS & Android native apps" 
                        },
                        { 
                            icon: Zap, 
                            label: "API Integration", 
                            href: "/services#api-integration",
                            description: "Seamless third-party integrations" 
                        },
                    ]
                },
                {
                    title: "Digital Solutions",
                    items: [
                        { 
                            icon: Bot, 
                            label: "AI Automation", 
                            href: "/services#ai-automation",
                            description: "Intelligent workflow automation",
                            featured: true
                        },
                        { 
                            icon: Palette, 
                            label: "UI/UX Design", 
                            href: "/services#ui-ux-design",
                            description: "Beautiful, user-friendly interfaces" 
                        },
                        { 
                            icon: LineChart, 
                            label: "SEO Optimization", 
                            href: "/services#seo-optimization",
                            description: "Rank higher on search engines" 
                        },
                    ]
                }
            ],
            cta: {
                title: "Need a Custom Solution?",
                description: "Let's discuss your unique project requirements",
                buttonText: "Get a Quote",
                buttonHref: "/contact",
                icon: Briefcase
            }
        },
        shop: {
            title: "Shop",
            sections: [
                {
                    title: "AI Tools",
                    items: [
                        { 
                            icon: Sparkles, 
                            label: "ChatGPT Pro", 
                            href: "/products#chatgpt",
                            description: "$20/mo - Advanced AI assistant",
                            badge: "Popular",
                            featured: true
                        },
                        { 
                            icon: Rocket, 
                            label: "Gemini Advanced", 
                            href: "/products#gemini",
                            description: "$20/mo - Google's powerful AI" 
                        },
                        { 
                            icon: Bot, 
                            label: "Claude Pro", 
                            href: "/products#claude",
                            description: "$20/mo - Anthropic's AI model" 
                        },
                    ]
                },
                {
                    title: "Creative Suite",
                    items: [
                        { 
                            icon: Wand2, 
                            label: "Canva Pro", 
                            href: "/products#canva",
                            description: "Design tool for all creators",
                            badge: "Best Value"
                        },
                        { 
                            icon: Video, 
                            label: "Adobe Creative Cloud", 
                            href: "/products#adobe",
                            description: "Professional design software" 
                        },
                        { 
                            icon: ImageIcon, 
                            label: "Midjourney", 
                            href: "/products#midjourney",
                            description: "AI-powered image generation" 
                        },
                    ]
                }
            ],
            cta: {
                title: "Save Up to 95%",
                description: "Premium tools at unbeatable prices",
                buttonText: "View All Products",
                buttonHref: "/products",
                icon: ShoppingBag
            }
        }
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services", hasMega: true },
        { href: "/products", label: "Shop", hasMega: true },
        { href: "/projects", label: "Projects" },
        { href: "/team", label: "Team" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <>
            <motion.header 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 z-50 w-full transition-all duration-300",
                    scrolled 
                        ? "border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5 supports-[backdrop-filter]:bg-background/60" 
                        : "border-b border-transparent bg-transparent"
                )}
                onMouseLeave={() => setActiveMenu(null)}
            >
                <div className="container flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group relative z-50" onClick={() => setIsMenuOpen(false)}>
                        <motion.div 
                            className="relative w-7 h-7 sm:w-9 sm:h-9"
                            whileHover={{ 
                                scale: 1.1,
                                rotate: [0, -10, 10, -10, 0],
                                transition: { duration: 0.5 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image 
                                src="/icons/LOGO.webp" 
                                alt="Ntech Solutions Logo" 
                                fill
                                className="object-contain drop-shadow-lg"
                                sizes="(max-width: 640px) 28px, 36px"
                                priority
                            />
                            {/* Animated glow effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)'
                                }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>
                        <motion.span 
                            className="text-sm sm:text-base md:text-lg font-bold font-display tracking-tight whitespace-nowrap"
                            initial={{ backgroundSize: '200% 100%' }}
                            animate={{ 
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                backgroundImage: 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 25%, #6366f1 50%, #8b5cf6 75%, #d946ef 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                backgroundSize: '200% 100%'
                            }}
                        >
                            Ntech Solutions
                        </motion.span>
                    </Link>

                    {/* Desktop Nav with Mega Menu */}
                    <nav className="hidden lg:flex items-center gap-1 relative z-50" onMouseLeave={() => setHoveredNav(null)}>
                        {navLinks.map((link) => (
                            <div 
                                key={link.href}
                                className="relative"
                                onMouseEnter={() => {
                                    if (link.hasMega) setActiveMenu(link.label.toLowerCase());
                                    else setActiveMenu(null);
                                    setHoveredNav(link.href);
                                }}
                            >
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full flex items-center gap-1.5",
                                        activeMenu === link.label.toLowerCase() 
                                            ? "text-foreground" 
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {/* Hover Pill Effect */}
                                    {hoveredNav === link.href && (
                                        <motion.div
                                            layoutId="hover-pill"
                                            className="absolute inset-0 bg-secondary/50 rounded-full -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    
                                    {link.label}
                                    {link.hasMega && (
                                        <ChevronDown className={cn(
                                            "w-3.5 h-3.5 transition-transform duration-200",
                                            activeMenu === link.label.toLowerCase() && "rotate-180"
                                        )} />
                                    )}
                                </Link>
                            </div>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3 relative z-50">
                        <ThemeToggle />
                        <Link href="/auth/login">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-medium">
                                Login
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all rounded-full px-6">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className={cn(
                        "flex items-center gap-2 lg:hidden transition-opacity duration-200",
                        isMenuOpen && "opacity-0 pointer-events-none"
                    )}>
                        <ThemeToggleCompact />
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center p-2 hover:bg-secondary/50 rounded-full transition-colors relative z-50"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <Menu className="h-5 w-5 text-foreground" />
                        </motion.button>
                    </div>
                </div>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                    {activeMenu && megaMenuData[activeMenu as keyof typeof megaMenuData] && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 w-full border-t border-border/50 bg-background/95 backdrop-blur-2xl shadow-2xl shadow-black/10"
                            onMouseEnter={() => setActiveMenu(activeMenu)}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <div className="container py-10">
                                <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
                                    {/* Services/Products Sections */}
                                    <div className="col-span-9">
                                        <div className="grid grid-cols-2 gap-8">
                                            {megaMenuData[activeMenu as keyof typeof megaMenuData].sections.map((section, sectionIndex) => (
                                                <div key={sectionIndex}>
                                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 px-4">
                                                        {section.title}
                                                    </h3>
                                                    <div className="space-y-1">
                                                        {section.items.map((item, index) => {
                                                            const ItemIcon = item.icon;
                                                            return (
                                                                <Link
                                                                    key={index}
                                                                    href={item.href}
                                                                    className="group relative flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/80 transition-all duration-200 border border-transparent hover:border-border/50 hover:shadow-md"
                                                                    onClick={() => setActiveMenu(null)}
                                                                >
                                                                    {/* Featured indicator */}
                                                                    {item.featured && (
                                                                        <div className="absolute -top-1.5 -right-1.5">
                                                                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                                                        </div>
                                                                    )}
                                                                    
                                                                    {/* Icon */}
                                                                    <div className="relative flex-shrink-0">
                                                                        <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary/10 to-purple-600/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-purple-600/20 transition-all group-hover:scale-110">
                                                                            <ItemIcon className="w-5 h-5 text-primary" />
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    {/* Content */}
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                                                                {item.label}
                                                                            </h4>
                                                                            {item.badge && (
                                                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
                                                                                    {item.badge}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                                                            {item.description}
                                                                        </p>
                                                                    </div>
                                                                    
                                                                    {/* Arrow indicator */}
                                                                    <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0" />
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* CTA Card */}
                                    <div className="col-span-3">
                                        <div className="sticky top-4">
                                            {(() => {
                                                const CTAIcon = megaMenuData[activeMenu as keyof typeof megaMenuData].cta.icon;
                                                return (
                                                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20 p-6">
                                                        {/* Animated background gradient */}
                                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                        
                                                        <div className="relative z-10 space-y-4">
                                                            {/* Icon */}
                                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                                                                <CTAIcon className="w-6 h-6 text-primary" />
                                                            </div>
                                                            
                                                            {/* Content */}
                                                            <div>
                                                                <h3 className="text-lg font-bold text-foreground mb-2">
                                                                    {megaMenuData[activeMenu as keyof typeof megaMenuData].cta.title}
                                                                </h3>
                                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                                    {megaMenuData[activeMenu as keyof typeof megaMenuData].cta.description}
                                                                </p>
                                                            </div>
                                                            
                                                            {/* CTA Button */}
                                                            <Link
                                                                href={megaMenuData[activeMenu as keyof typeof megaMenuData].cta.buttonHref}
                                                                onClick={() => setActiveMenu(null)}
                                                            >
                                                                <Button 
                                                                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all group"
                                                                >
                                                                    {megaMenuData[activeMenu as keyof typeof megaMenuData].cta.buttonText}
                                                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Mobile Sidebar Backdrop */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="fixed inset-0 z-[45] bg-black/70 backdrop-blur-sm lg:hidden"
                        onClick={() => setIsMenuOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Slide-in Sidebar - Professional & Touch-Optimized */}
            <AnimatePresence>
                {isMenuOpen && (
                    <MobileSidebar 
                        isOpen={isMenuOpen}
                        onClose={() => setIsMenuOpen(false)}
                        navLinks={navLinks}
                        megaMenuData={megaMenuData}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

// Professional Mobile Sidebar Component - Performance Optimized
interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    navLinks: { href: string; label: string; hasMega?: boolean }[];
    megaMenuData: Record<string, MegaMenuData>;
}

// Pre-computed icon mapping to avoid runtime lookups
const NAV_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    Home: Sparkles,
    Services: Briefcase,
    Shop: ShoppingBag,
    Projects: Rocket,
    Team: Bot,
    About: Zap,
    Contact: Code,
};

// Memoized menu item to prevent unnecessary re-renders
const MobileNavItem = React.memo(function MobileNavItem({ 
    link, 
    index, 
    isExpanded, 
    menuData, 
    onToggle, 
    onClose 
}: {
    link: { href: string; label: string; hasMega?: boolean };
    index: number;
    isExpanded: boolean;
    menuData: MegaMenuSection[] | null;
    onToggle: () => void;
    onClose: () => void;
}) {
    const IconComponent = NAV_ICONS[link.label] || Sparkles;
    
    if (link.hasMega) {
        return (
            <li 
                className="transform transition-all duration-200"
                style={{ 
                    animationDelay: `${index * 30}ms`,
                    animation: 'slideInLeft 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                }}
            >
                <button
                    onClick={onToggle}
                    className={cn(
                        "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 touch-manipulation",
                        "active:scale-[0.98] min-h-[48px]",
                        isExpanded 
                            ? "bg-primary/8 text-primary" 
                            : "text-foreground hover:bg-secondary/50 active:bg-secondary/70"
                    )}
                >
                    <div className={cn(
                        "flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-150",
                        isExpanded ? "bg-primary/15 text-primary" : "bg-secondary/60 text-muted-foreground"
                    )}>
                        <IconComponent className="w-[18px] h-[18px]" />
                    </div>
                    <span className="flex-1 text-left text-sm font-medium">
                        {link.label}
                    </span>
                    <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isExpanded ? "rotate-180 text-primary" : "text-muted-foreground/40"
                    )} />
                </button>
                
                {/* Submenu with CSS transitions instead of Framer Motion */}
                <div 
                    className={cn(
                        "overflow-hidden transition-all duration-250 ease-out",
                        isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                >
                    {menuData && (
                        <div className="pt-1.5 pb-1 pl-3 pr-1.5">
                            {menuData.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="mb-2 last:mb-0">
                                    <p className="text-[9px] uppercase tracking-widest font-semibold text-muted-foreground/60 px-2.5 py-1.5">
                                        {section.title}
                                    </p>
                                    <div className="space-y-0.5">
                                        {section.items.map((item, itemIndex) => {
                                            const ItemIcon = item.icon;
                                            return (
                                                <Link
                                                    key={itemIndex}
                                                    href={item.href}
                                                    onClick={onClose}
                                                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/40 active:bg-secondary/60 transition-colors duration-100 touch-manipulation active:scale-[0.98] min-h-[40px]"
                                                >
                                                    <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/8">
                                                        <ItemIcon className="w-3.5 h-3.5 text-primary/70" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-[13px] font-medium truncate">
                                                                {item.label}
                                                            </span>
                                                            {item.badge && (
                                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold bg-primary/12 text-primary">
                                                                    {item.badge}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                            <Link
                                href={link.href}
                                onClick={onClose}
                                className="flex items-center justify-center gap-1.5 px-2.5 py-2 mt-1.5 rounded-lg bg-secondary/30 hover:bg-secondary/50 text-[13px] font-medium text-primary transition-colors duration-100 touch-manipulation active:scale-[0.98]"
                            >
                                View All
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    )}
                </div>
            </li>
        );
    }
    
    return (
        <li 
            style={{ 
                animationDelay: `${index * 40}ms`,
                animation: 'slideInLeft 0.25s ease-out forwards'
            }}
        >
            <Link
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-foreground hover:bg-secondary/50 active:bg-secondary/70 transition-colors duration-150 touch-manipulation active:scale-[0.98] min-h-[48px]"
            >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary/60">
                    <IconComponent className="w-[18px] h-[18px] text-muted-foreground" />
                </div>
                <span className="text-sm font-medium">{link.label}</span>
            </Link>
        </li>
    );
});

function MobileSidebar({ isOpen, onClose, navLinks, megaMenuData }: MobileSidebarProps) {
    const [expandedMenu, setExpandedMenu] = React.useState<string | null>(null);
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const startXRef = React.useRef<number>(0);
    const currentXRef = React.useRef<number>(0);

    // Handle swipe to close with passive event handling
    const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
        startXRef.current = e.touches[0].clientX;
    }, []);

    const handleTouchMove = React.useCallback((e: React.TouchEvent) => {
        currentXRef.current = e.touches[0].clientX;
    }, []);

    const handleTouchEnd = React.useCallback(() => {
        const diff = currentXRef.current - startXRef.current;
        // Swipe LEFT to close (negative diff)
        if (diff < -80) {
            onClose();
        }
    }, [onClose]);

    const toggleSubmenu = React.useCallback((menuKey: string) => {
        setExpandedMenu(prev => prev === menuKey ? null : menuKey);
    }, []);

    return (
        <motion.aside
            ref={sidebarRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 left-0 bottom-0 z-[60] w-[85vw] max-w-[340px] bg-background/95 backdrop-blur-xl border-r border-border/50 shadow-2xl shadow-black/25 lg:hidden flex flex-col will-change-transform"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
                <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10 p-1.5">
                        <Image 
                            src="/icons/LOGO.webp" 
                            alt="Ntech Solutions" 
                            fill
                            className="object-contain"
                            sizes="36px"
                        />
                    </div>
                    <div>
                        <span className="font-bold text-base text-foreground">Ntech</span>
                        <p className="text-[10px] text-muted-foreground -mt-0.5">Solutions</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="flex items-center justify-center w-9 h-9 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors duration-100 touch-manipulation active:scale-95"
                    aria-label="Close menu"
                >
                    <X className="w-4.5 h-4.5 text-muted-foreground" />
                </button>
            </div>

            {/* Scrollable Navigation Area */}
            <nav className="flex-1 overflow-y-auto overscroll-contain py-4 px-3 scrollbar-hide">
                <ul className="space-y-0.5">
                    {navLinks.map((link, index) => {
                        const menuSections = link.hasMega 
                            ? megaMenuData[link.label.toLowerCase() as keyof typeof megaMenuData]?.sections 
                            : null;
                        
                        return (
                            <MobileNavItem
                                key={link.href}
                                link={link}
                                index={index}
                                isExpanded={expandedMenu === link.label.toLowerCase()}
                                menuData={menuSections}
                                onToggle={() => toggleSubmenu(link.label.toLowerCase())}
                                onClose={onClose}
                            />
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-border/40 bg-gradient-to-b from-background to-muted/20 space-y-2.5 pb-safe">
                <div className="grid grid-cols-2 gap-2.5">
                    <Link href="/auth/login" onClick={onClose}>
                        <button className="w-full flex items-center justify-center h-11 rounded-lg border border-border/60 bg-background hover:bg-muted/50 text-foreground font-medium text-[13px] transition-all duration-150 touch-manipulation active:scale-[0.97] shadow-sm hover:shadow">
                            Login
                        </button>
                    </Link>
                    <Link href="/contact" onClick={onClose}>
                        <button className="w-full flex items-center justify-center gap-1.5 h-11 rounded-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-primary-foreground font-semibold text-[13px] shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all duration-150 touch-manipulation active:scale-[0.97]">
                            <Rocket className="w-3.5 h-3.5" />
                            Get Started
                        </button>
                    </Link>
                </div>

                <div className="pt-2 border-t border-border/20">
                    <p className="text-center text-[9px] text-muted-foreground/35 font-medium">
                        © 2026 Ntech Solutions
                    </p>
                </div>
            </div>
            
            {/* CSS Keyframes for lightweight animations */}
            <style jsx global>{`
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translate3d(-12px, 0, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
            `}</style>
        </motion.aside>
    );
}
