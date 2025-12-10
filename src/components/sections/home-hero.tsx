"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  Bot, 
  Code2, 
  Zap,
  Shield,
  TrendingUp,
  CheckCircle2,
  Play,
  BarChart3,
  Globe,
  Layers,
  LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Floating Icon Component
interface FloatingIconProps {
  icon: LucideIcon;
  className?: string;
  delay?: number;
  duration?: number;
}

const FloatingIcon = ({ icon: Icon, className, delay = 0, duration = 3 }: FloatingIconProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [0, -15, 0],
    }}
    transition={{
      opacity: { duration: 0.5, delay },
      scale: { duration: 0.5, delay },
      y: { duration, repeat: Infinity, ease: "easeInOut", delay }
    }}
    className={cn(
      "absolute p-3 rounded-2xl bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-xl border border-border/50 shadow-2xl",
      className
    )}
  >
    <Icon className="w-5 h-5 text-primary" />
  </motion.div>
);

// Stats Card Component
interface StatsCardProps {
  value: string;
  label: string;
  delay?: number;
}

const StatsCard = ({ value, label, delay = 0 }: StatsCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50"
  >
    <div className="flex flex-col">
      <span className="text-xl font-bold text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  </motion.div>
);

// Feature Item Component
interface FeatureItemProps {
  text: string;
  delay?: number;
}

const FeatureItem = ({ text, delay = 0 }: FeatureItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex items-center gap-3"
  >
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
    </div>
    <span className="text-sm text-muted-foreground">{text}</span>
  </motion.div>
);

// Dashboard Mockup Component
const DashboardMockup = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="relative"
  >
    {/* Main Dashboard Card */}
    <div className="relative bg-gradient-to-br from-background via-background to-secondary/30 rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-secondary/20">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">NTech Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <Users className="w-3 h-3 text-primary" />
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-500/5 border border-violet-500/20"
          >
            <TrendingUp className="w-5 h-5 text-violet-500 mb-2" />
            <div className="text-lg font-bold text-foreground">+127%</div>
            <div className="text-xs text-muted-foreground">Growth</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20"
          >
            <Zap className="w-5 h-5 text-emerald-500 mb-2" />
            <div className="text-lg font-bold text-foreground">99.9%</div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20"
          >
            <Shield className="w-5 h-5 text-blue-500 mb-2" />
            <div className="text-lg font-bold text-foreground">256-bit</div>
            <div className="text-xs text-muted-foreground">Encrypted</div>
          </motion.div>
        </div>

        {/* Chart Mockup */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-4 rounded-xl bg-secondary/30 border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-foreground">Performance Analytics</span>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-end gap-2 h-24">
            {[40, 70, 45, 90, 65, 80, 95, 75, 85, 100, 70, 88].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.9 + i * 0.05, duration: 0.5 }}
                className={cn(
                  "flex-1 rounded-t-sm",
                  i === 9 ? "bg-primary" : "bg-primary/30"
                )}
              />
            ))}
          </div>
        </motion.div>

        {/* Activity List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="space-y-2"
        >
          {[
            { icon: Globe, text: "Website deployed successfully", time: "2m ago", color: "text-emerald-500" },
            { icon: Bot, text: "AI automation task completed", time: "5m ago", color: "text-violet-500" },
            { icon: Layers, text: "New feature integration", time: "12m ago", color: "text-blue-500" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30"
            >
              <div className={cn("p-1.5 rounded-lg bg-secondary/50", item.color)}>
                <item.icon className="w-3.5 h-3.5" />
              </div>
              <span className="flex-1 text-sm text-foreground">{item.text}</span>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>

    {/* Floating Elements around Dashboard */}
    <FloatingIcon icon={Code2} className="top-4 -left-6 lg:-left-10" delay={0.5} duration={4} />
    <FloatingIcon icon={Bot} className="top-1/4 -right-6 lg:-right-10" delay={0.7} duration={3.5} />
    <FloatingIcon icon={Zap} className="bottom-1/4 -left-6 lg:-left-10" delay={0.9} duration={4.5} />
    <FloatingIcon icon={Globe} className="bottom-8 -right-6 lg:-right-10" delay={1.1} duration={3} />

    {/* Glow Effect */}
    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-violet-500/20 to-primary/20 blur-3xl -z-10 opacity-50" />
  </motion.div>
);

// --- Main Component ---

export function HomeHero() {
  return (
    <section className="relative w-full bg-background overflow-hidden" aria-label="Hero Section">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="container mx-auto relative z-10 px-4 sm:px-6 pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Innovating Digital Excellence</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]"
            >
              Transform Your
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-500 to-primary bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
                  Digital Future
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary via-violet-500 to-primary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed"
            >
              NTech Solutions delivers cutting-edge web development, AI automation, and premium digital tools to accelerate your business growth.
            </motion.p>

            {/* Feature List */}
            <div className="space-y-3 mb-8">
              <FeatureItem text="Enterprise-grade AI automation solutions" delay={0.3} />
              <FeatureItem text="Custom full-stack web development" delay={0.35} />
              <FeatureItem text="Premium access to top AI tools" delay={0.4} />
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link 
                href="/services"
                className="group relative px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="relative flex items-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link 
                href="/projects"
                className="group flex items-center gap-3 px-6 py-4 rounded-full bg-secondary/50 hover:bg-secondary text-foreground font-medium border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Play className="w-4 h-4 text-primary ml-0.5" />
                </div>
                View Our Work
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <StatsCard value="50+" label="Projects Delivered" delay={0.65} />
              <StatsCard value="99%" label="Client Satisfaction" delay={0.7} />
              <StatsCard value="24/7" label="Support Available" delay={0.75} />
            </motion.div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="relative lg:pl-8">
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Animated gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* CSS Animation for gradient text */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}