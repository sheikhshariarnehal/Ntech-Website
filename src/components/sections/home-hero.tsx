"use client";

import React, { memo, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { 
  ArrowRight, 
  Code2, 
  Zap,
  Shield,
  Globe,
  Cloud,
  Database,
  Cpu,
  Layers,
  Workflow,
  LucideIcon,
  ChevronRight,
  Star,
  Award,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Lazy load heavy components
const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then(mod => ({ default: mod.DotLottieReact })),
  { 
    ssr: false,
    loading: () => <div className="w-full aspect-square bg-primary/5 animate-pulse rounded-full" />
  }
);

// Animation Variants - Optimized
const fadeInUp = {
  hidden: { opacity: 0, y: 20 }, // Reduced from 30
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] } // Reduced from 0.6
  })
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 } // Reduced stagger
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 }, // Reduced scale difference
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, delay, ease: "easeOut" } // Reduced from 0.5
  })
};

// Optimized Typewriter Effect Hook - Prevents layout shifts
function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 2500) {
  const [text, setText] = useState(words[0]); // Start with first word to prevent shift
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Skip animation for users who prefer reduced motion
    if (shouldReduceMotion) {
      setText(words[0]);
      return;
    }

    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseTime, shouldReduceMotion]);

  return text;
}

// Optimized Animated Counter Component with IntersectionObserver
const AnimatedCounter = memo(({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (hasAnimated) return;

    const element = document.getElementById('stats-section');
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Skip animation for reduced motion preference
          if (shouldReduceMotion) {
            setCount(end);
            return;
          }

          let startTime: number;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3, rootMargin: '50px' }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [end, duration, hasAnimated, shouldReduceMotion]);

  return <span>{count}{suffix}</span>;
});
AnimatedCounter.displayName = 'AnimatedCounter';

// Optimized Tech Icon Grid - Reduced animation complexity
const TechIconGrid = memo(() => {
  const shouldReduceMotion = useReducedMotion();
  const icons = useMemo(() => [
    { Icon: Code2, label: 'Development', delay: 0 },
    { Icon: Cloud, label: 'Cloud', delay: 0.05 },
    { Icon: Database, label: 'Database', delay: 0.1 },
    { Icon: Shield, label: 'Security', delay: 0.15 },
    { Icon: Cpu, label: 'AI/ML', delay: 0.2 },
    { Icon: Globe, label: 'Web', delay: 0.25 },
  ], []);

  return (
    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
      {icons.map(({ Icon, label, delay }) => (
        <motion.div
          key={label}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.3, type: "spring", stiffness: 200 }}
          className="group relative"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center hover:scale-110 hover:border-primary/40 transition-all duration-300 cursor-pointer">
            <Icon className="w-5 h-5 text-primary/80 group-hover:text-primary transition-colors" />
          </div>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
});
TechIconGrid.displayName = 'TechIconGrid';

// Removed FloatingTechCard - not used in current implementation

// Simplified Hexagon Grid - Static to reduce CPU
const HexagonGrid = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
          <polygon 
            points="25,0 50,14.4 50,38.6 25,53 0,38.6 0,14.4" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            className="text-primary/10"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
  </div>
));
HexagonGrid.displayName = 'HexagonGrid';

// Optimized Gradient Orbs - CSS-only animations, reduced complexity
const GradientOrbs = memo(() => {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    return (
      <>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 via-violet-500/15 to-transparent rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/15 via-primary/15 to-transparent rounded-full blur-3xl opacity-30" />
      </>
    );
  }

  return (
    <>
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 via-violet-500/15 to-transparent rounded-full blur-3xl animate-pulse-slow opacity-40" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/15 via-primary/15 to-transparent rounded-full blur-3xl animate-pulse-slower opacity-30" />
    </>
  );
});
GradientOrbs.displayName = 'GradientOrbs';

// Optimized Stats Card
const StatCard = memo(({ icon: Icon, value, label, suffix = '', delay = 0 }: {
  icon: LucideIcon;
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={scaleIn}
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      custom={delay}
      className="group relative p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold text-foreground">
            <AnimatedCounter end={value} suffix={suffix} />
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-tight">{label}</p>
        </div>
      </div>
    </motion.div>
  );
});
StatCard.displayName = 'StatCard';

// --- Main Component ---
export function HomeHero() {
  const typewriterWords = ['Digital Transformation', 'AI Solutions', 'Cloud Architecture', 'Cybersecurity'];
  const currentWord = useTypewriter(typewriterWords, 80, 40, 2500);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section 
      className="relative w-full bg-background overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Background Elements */}
      <HexagonGrid />
      <GradientOrbs />
      
      {/* Grid Pattern - Static */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40 pb-12 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-8 xl:gap-10 items-center">
            
            {/* Left Content - 7 columns */}
            <motion.div 
              className="lg:col-span-7 space-y-6 sm:space-y-7 md:space-y-8"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Top Badge */}
              <motion.div
                variants={fadeInUp}
                initial={shouldReduceMotion ? false : "hidden"}
                animate="visible"
                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-primary/10 to-violet-500/10 border border-primary/20"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs sm:text-sm font-medium text-foreground">Leading IT Solutions Provider</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              </motion.div>

              {/* Main Heading - Fixed width to prevent layout shift */}
              <motion.div
                variants={fadeInUp}
                initial={shouldReduceMotion ? false : "hidden"}
                animate="visible"
                custom={0.1}
                className="space-y-4"
              >
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] sm:leading-[1.1]">
                  <span className="text-foreground">We Engineer</span>
                  <br />
                  {/* Fixed width container to prevent layout shifts */}
                  <span className="relative inline-block min-w-[280px] xs:min-w-[320px] sm:min-w-[400px] md:min-w-[500px]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-500 to-cyan-500">
                      {currentWord}
                    </span>
                    <span className="text-primary animate-pulse">|</span>
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-full sm:max-w-xl lg:max-w-2xl leading-relaxed">
                  Enterprise-grade software development, AI automation, and cloud solutions that 
                  transform businesses and drive measurable growth.
                </p>
              </motion.div>

              {/* Tech Stack Icons */}
              <motion.div
                variants={fadeInUp}
                initial={shouldReduceMotion ? false : "hidden"}
                animate="visible"
                custom={0.2}
                className="pt-2"
              >
                <TechIconGrid />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInUp}
                initial={shouldReduceMotion ? false : "hidden"}
                animate="visible"
                custom={0.3}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"
              >
                <Link 
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-primary text-primary-foreground text-sm sm:text-base font-semibold overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                
                <Link 
                  href="/services"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-background border-2 border-border hover:border-primary/50 text-foreground text-sm sm:text-base font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Explore Services</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={fadeInUp}
                initial={shouldReduceMotion ? false : "hidden"}
                animate="visible"
                custom={0.4}
                className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-4 text-xs sm:text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 border-2 border-background flex items-center justify-center">
                        <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary/70" />
                      </div>
                    ))}
                  </div>
                  <span>500+ Clients Worldwide</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <span>4.9/5 Rating</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Visual Elements - 5 columns */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative flex items-center justify-center overflow-hidden">
                {/* Hero Lottie Animation - Lazy loaded */}
                <div className="relative w-full aspect-square">
                  <div className="absolute inset-0 flex items-center justify-center scale-150">
                    <DotLottieReact
                      src="https://lottie.host/97ba6356-60b1-4fb4-b5d1-672b8597d9c8/3Ls0MrOzQK.lottie"
                      loop
                      autoplay
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Stats Section */}
          <motion.div
            id="stats-section"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16 lg:mt-20 xl:mt-24"
          >
            <StatCard icon={Layers} value={150} suffix="+" label="Projects Delivered" delay={0.6} />
            <StatCard icon={Users} value={500} suffix="+" label="Happy Clients" delay={0.65} />
            <StatCard icon={Globe} value={25} suffix="+" label="Countries Served" delay={0.7} />
            <StatCard icon={Award} value={99} suffix="%" label="Client Satisfaction" delay={0.75} />
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.03); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
