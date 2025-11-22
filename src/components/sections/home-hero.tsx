"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  Bot, 
  HeadphonesIcon, 
  Code2, 
  Cpu, 
  Cloud,
  ShoppingCart,
  Smartphone,
  Database
} from 'lucide-react';

// --- Sub-Components (Internal helpers for the Hero) ---

// 1. Animated Background
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Moving Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3], 
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 100, 0] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
          y: [0, -50, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[20%] w-[600px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px]" 
      />
    </div>
  );
};

// 2. Floating Tech Badge
const FloatingBadge = ({ icon: Icon, label, color, delay, x, y }) => (
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
      scale: 1.08, 
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    }}
    className={`absolute hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/50 backdrop-blur-lg shadow-2xl hover:shadow-purple-500/20 transition-shadow duration-300 ${x} ${y} z-20`}
  >
    <div className={`p-2 rounded-lg ${color} bg-opacity-20 backdrop-blur-sm`}>
      <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
    </div>
    <span className="text-sm font-semibold text-slate-100 tracking-wide">{label}</span>
  </motion.div>
);

// 3. Stat Item
const StatItem = ({ icon: Icon, value, label }) => (
  <div className="flex flex-col items-center text-center group cursor-default">
    <div className="mb-2 sm:mb-3 p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-900/50 border border-slate-800 group-hover:border-violet-500/30 group-hover:bg-violet-500/10 transition-all">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-violet-400 transition-colors" />
    </div>
    <div className="font-bold text-xl sm:text-2xl text-foreground mb-1">{value}</div>
    <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-slate-400 transition-colors">{label}</div>
  </div>
);

// --- Main Component ---

export function HomeHero() {
  const { scrollY } = useScroll();
  // Optional parallax hooks if you want elements to move on scroll
  // const y1 = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-16 sm:pt-20 pb-8 sm:pb-10 overflow-hidden bg-background">
      
      {/* Replaced <style jsx global> with standard <style> tag.
        'jsx' and 'global' are not valid DOM attributes for the style tag in standard React,
        causing the "received true for non-boolean attribute" warning.
      */}
      <style>{`
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
      <div className="absolute inset-0 w-full pointer-events-none overflow-hidden">
        <div className="relative h-full w-full max-w-7xl mx-auto">
          <FloatingBadge icon={Bot} label="AI Automation" color="bg-emerald-500" delay={0.5} x="-left-8 lg:-left-12 xl:-left-8" y="top-[22%] lg:top-[20%]" />
          <FloatingBadge icon={Code2} label="Full Stack" color="bg-violet-500" delay={0.7} x="-right-8 lg:-right-12 xl:-right-8" y="top-[22%] lg:top-[20%]" />
          <FloatingBadge icon={ShoppingCart} label="Digital Products" color="bg-pink-500" delay={0.6} x="left-0 lg:left-8 xl:left-12" y="top-[38%] lg:top-[36%]" />
          <FloatingBadge icon={Smartphone} label="Android App" color="bg-green-500" delay={0.8} x="right-0 lg:right-8 xl:right-12" y="top-[38%] lg:top-[36%]" />
        </div>
      </div>

      <div className="container mx-auto relative z-10 text-center px-4 sm:px-6">
        
        {/* Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-muted/50 border border-border backdrop-blur-sm mb-6 sm:mb-8 hover:border-violet-500/50 transition-colors cursor-default"
        >
          <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-violet-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-muted-foreground">The Future of Digital Solutions</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-4 sm:mb-6 leading-[1.15] px-2"
        >
          Empowering Your Business <br className="hidden sm:block" />
          <span className="sm:inline block mt-2"></span>
          <span className="relative inline-block mt-2">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-gradient-x">
              with NTech Solutions
            </span>
            {/* Text Glow Effect */}
            <div className="absolute inset-0 blur-2xl bg-violet-600/20 -z-10" />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4"
        >
          We provide full-stack development, custom AI automation, and premium access to the world&apos;s best AI tools to scale your operations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 w-full sm:w-auto"
        >
          {/* You can wrap these buttons in Next.js <Link> if needed */}
          <button className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-violet-600 text-white font-semibold shadow-lg shadow-violet-600/25 overflow-hidden transition-all hover:scale-105 active:scale-95 text-sm sm:text-base">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center gap-2">
              Explore Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-muted/20 text-foreground font-medium border border-border hover:bg-muted/30 transition-all text-sm sm:text-base">
            Get Premium Tools
          </button>
        </motion.div>

        {/* Stats / Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 border-t border-border/60 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto px-4"
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