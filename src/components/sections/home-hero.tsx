"use client";

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  Bot, 
  HeadphonesIcon, 
  Code2, 
  Smartphone,
  ShoppingCart,
  LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Sub-Components (Internal helpers for the Hero) ---

// 1. Animated Background
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Moving Orbs - Optimized with will-change-transform */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3], 
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] will-change-transform" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 100, 0] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] will-change-transform" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
          y: [0, -50, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[20%] w-[600px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] will-change-transform" 
      />
    </div>
  );
};

interface FloatingBadgeProps {
  icon: LucideIcon;
  label: string;
  color: string;
  delay: number;
  x: string;
  y: string;
}

// 2. Floating Tech Badge
const FloatingBadge = ({ icon: Icon, label, color, delay, x, y }: FloatingBadgeProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ 
      opacity: 1,
      scale: 1,
      y: [0, -10, 0],
    }}
    transition={{ 
      opacity: { duration: 0.8, delay, ease: "easeOut" },
      scale: { duration: 0.8, delay, ease: "easeOut" },
      y: { 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: delay,
        repeatType: "reverse"
      }
    }}
    whileHover={{ 
      scale: 1.05, 
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" }
    }}
    className={cn(
      "absolute hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-background/80 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 z-20",
      x,
      y
    )}
  >
    <div className={cn("p-2 rounded-xl shadow-sm", color)}>
      <Icon className="w-4 h-4 text-white" />
    </div>
    <span className="text-sm font-semibold text-foreground/90 tracking-wide">{label}</span>
  </motion.div>
);

interface StatItemProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

// 3. Stat Item
const StatItem = ({ icon: Icon, value, label }: StatItemProps) => (
  <div className="flex flex-col items-center text-center group cursor-default">
    <div className="mb-3 p-3 rounded-2xl bg-secondary/30 border border-border/50 backdrop-blur-sm group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300">
      <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
    </div>
    <div className="font-bold text-xl sm:text-2xl text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{value}</div>
    <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{label}</div>
  </div>
);

// --- Main Component ---

export function HomeHero() {
  const { scrollY } = useScroll();
  
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden bg-background" aria-label="Hero Section">
      
      <style jsx global>{`
        @keyframes gradient-x {
          0% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
          100% { background-size: 200% 200%; background-position: left center; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>

      <AnimatedBackground />

      {/* Floating Elements (Parallax feel) */}
      <div className="absolute inset-0 w-full pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="relative h-full w-full max-w-7xl mx-auto">
          <FloatingBadge icon={Bot} label="AI Automation" color="bg-emerald-500" delay={0.5} x="-left-4 lg:-left-8 xl:-left-12" y="top-[30%] lg:top-[33%]" />
          <FloatingBadge icon={Code2} label="Web Development" color="bg-violet-500" delay={0.7} x="-right-4 lg:-right-8 xl:-right-12" y="top-[30%] lg:top-[33%]" />
          <FloatingBadge icon={ShoppingCart} label="Digital Products" color="bg-pink-500" delay={0.6} x="left-2 lg:left-12 xl:left-16" y="top-[45%] lg:top-[47%]" />
          <FloatingBadge icon={Smartphone} label="App Development" color="bg-blue-500" delay={0.8} x="right-2 lg:right-12 xl:right-16" y="top-[45%] lg:top-[47%]" />
        </div>
      </div>

      <div className="container mx-auto relative z-10 text-center px-4 sm:px-6">
        
        {/* Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm mb-8 hover:border-primary/30 transition-colors cursor-default"
        >
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">The Future of Digital Solutions</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1] px-2"
        >
          Empowering Your Business <br className="hidden sm:block" />
          <span className="sm:inline block mt-2"></span>
          <span className="relative inline-block mt-1 sm:mt-2">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 animate-gradient-x pb-2">
              with NTech Solutions
            </span>
            {/* Text Glow Effect */}
            <div className="absolute inset-0 blur-3xl bg-violet-500/20 -z-10" />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed px-4"
        >
          We provide full-stack development, custom AI automation, and premium access to the world&apos;s best AI tools to scale your operations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4 w-full sm:w-auto"
        >
          <Link 
            href="/services"
            className="group relative w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 overflow-hidden transition-all hover:scale-105 active:scale-95 text-base sm:text-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center gap-2">
              Explore Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          
          <Link 
            href="/products"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-background/50 backdrop-blur-sm text-foreground font-medium border border-border hover:bg-secondary/50 hover:border-primary/30 transition-all text-base sm:text-lg shadow-sm hover:shadow-md flex items-center justify-center"
          >
            Get Premium Tools
          </Link>
        </motion.div>

        {/* Stats / Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 sm:mt-20 md:mt-24 pt-8 sm:pt-10 border-t border-border/40 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4"
        >
          <StatItem icon={Users} value="20+" label="Happy Clients" />
          <StatItem icon={Bot} value="AI-Powered" label="Automation" />
          <div className="col-span-2 md:col-span-1 flex justify-center">
            <StatItem icon={HeadphonesIcon} value="24/7" label="Dedicated Support" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}