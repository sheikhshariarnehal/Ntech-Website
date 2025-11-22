"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    Menu, X, Sparkles, ChevronDown, Code, Bot, ShoppingBag, 
    Briefcase, Users, Info, Mail, Zap, Rocket, CreditCard 
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility Functions ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

    const megaMenuData = {
        services: {
            title: "Services",
            items: [
                { 
                    icon: Code, 
                    label: "Web Development", 
                    href: "/services#web-development",
                    description: "Custom web applications" 
                },
                { 
                    icon: Bot, 
                    label: "AI Automation", 
                    href: "/services#ai-automation",
                    description: "Intelligent automation solutions" 
                },
                { 
                    icon: Zap, 
                    label: "API Integration", 
                    href: "/services#api-integration",
                    description: "Seamless third-party integrations" 
                },
            ]
        },
        shop: {
            title: "Shop",
            items: [
                { 
                    icon: Rocket, 
                    label: "ChatGPT Pro", 
                    href: "/products#chatgpt",
                    description: "Premium AI subscriptions" 
                },
                { 
                    icon: Sparkles, 
                    label: "Gemini Advanced", 
                    href: "/products#gemini",
                    description: "Google's latest AI model" 
                },
                { 
                    icon: CreditCard, 
                    label: "All Products", 
                    href: "/products",
                    description: "Browse our full catalog" 
                },
            ]
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
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center p-2 lg:hidden hover:bg-secondary/50 rounded-full transition-colors relative z-50"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="h-5 w-5 text-foreground" />
                        ) : (
                            <Menu className="h-5 w-5 text-foreground" />
                        )}
                    </motion.button>
                </div>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                    {activeMenu && megaMenuData[activeMenu as keyof typeof megaMenuData] && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 w-full border-t border-border/50 bg-background/80 backdrop-blur-2xl shadow-2xl"
                            onMouseEnter={() => setActiveMenu(activeMenu)}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <div className="container py-8">
                                <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
                                    {megaMenuData[activeMenu as keyof typeof megaMenuData].items.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className="group p-4 rounded-2xl hover:bg-secondary/50 transition-all duration-200 border border-transparent hover:border-border/50"
                                            onClick={() => setActiveMenu(null)}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-purple-600/20 transition-all">
                                                    <item.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                                        {item.label}
                                                    </h3>
                                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
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
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                        onClick={() => setIsMenuOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Slide-in Sidebar */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm bg-background/95 backdrop-blur-2xl border-l border-border shadow-2xl lg:hidden"
                    >
                        <div className="flex flex-col h-full pt-20">
                            {/* Sidebar Navigation */}
                            <nav className="flex-1 overflow-y-auto px-6 py-4">
                                <ul className="space-y-2">
                                    {navLinks.map((link, index) => (
                                        <motion.li
                                            key={link.href}
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 + index * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="flex items-center justify-between px-5 py-4 text-lg font-medium text-muted-foreground rounded-2xl transition-all hover:bg-secondary/50 hover:text-foreground active:scale-95 group"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <span>{link.label}</span>
                                                {link.hasMega && (
                                                    <ChevronDown className="w-5 h-5 text-muted-foreground/50" />
                                                )}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Sidebar Footer - CTA Buttons */}
                            <div className="p-6 border-t border-border/50 bg-muted/30 space-y-4">
                                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)} className="block">
                                    <Button variant="outline" size="lg" className="w-full rounded-xl h-12 text-base">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block">
                                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium shadow-lg shadow-primary/25 rounded-xl h-12 text-base">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
