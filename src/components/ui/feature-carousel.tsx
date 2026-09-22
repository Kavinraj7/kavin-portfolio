"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  Users,
  ShieldCheck,
  Zap,
  Globe2,
  Mic2,
  GitBranch,
  Bot,
  HeartHandshake,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  id: string;
  label: string;
  icon: LucideIcon;
  image: string;
  description: string;
  metric?: string;
}

export const DEFAULT_ACHIEVEMENTS: FeatureItem[] = [
  {
    id: "impact",
    label: "Enterprise Impact",
    icon: Trophy,
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    description: "$42M+ in cumulative career impact through high-velocity software engineering and platform scalability.",
    metric: "$42M+ Impact",
  },
  {
    id: "hackathon",
    label: "Hackathon Winner",
    icon: Award,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
    description: "1st Place Global Systems & AI Hackathon building autonomous agentic reasoning pipelines.",
    metric: "1st Place Global",
  },
  {
    id: "leadership",
    label: "Scaled 65+ Engineers",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    description: "Directed distributed engineering pods from 8 to 65+ engineers across multiple international hubs.",
    metric: "65+ Headcount",
  },
  {
    id: "reliability",
    label: "99.99% Availability",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    description: "Architected fault-tolerant cloud backbones exceeding strict enterprise SLA requirements over 3+ years.",
    metric: "99.99% SLA",
  },
  {
    id: "performance",
    label: "Sub-15ms Latency",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    description: "Built high-frequency streaming engine handling 120k+ concurrent WebSocket connections globally.",
    metric: "120k Streams",
  },
  {
    id: "speaking",
    label: "Keynote Speaker",
    icon: Mic2,
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    description: "Invited speaker at international developer conferences on modern web architectures and AI agents.",
    metric: "15+ Talks",
  },
  {
    id: "opensource",
    label: "Open Source Craft",
    icon: GitBranch,
    image:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop",
    description: "Creator and maintainer of open-source UI libraries and utility frameworks with 5,000+ GitHub stars.",
    metric: "5k+ Stars",
  },
  {
    id: "culture",
    label: "Zero Attrition",
    icon: HeartHandshake,
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    description: "Achieved 0% regrettable attrition across core technical leads over a sustained 24-month horizon.",
    metric: "96.2% Retention",
  },
  {
    id: "ai-patent",
    label: "Autonomous AI Engine",
    icon: Bot,
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    description: "Engineered context-aware self-grounding agentic workflows saving 1,200 quarterly engineering hours.",
    metric: "60% Task Automation",
  },
  {
    id: "mentorship",
    label: "Community Mentor",
    icon: Globe2,
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    description: "Coached 500+ aspiring software engineers and students through workshops, hackathons, and 1:1 mentorship.",
    metric: "500+ Mentees",
  },
];

const AUTO_PLAY_INTERVAL = 3400;
const ITEM_HEIGHT = 64;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export interface FeatureCarouselProps {
  features?: FeatureItem[];
  className?: string;
}

export function FeatureCarousel({
  features = DEFAULT_ACHIEVEMENTS,
  className,
}: FeatureCarouselProps) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = features.length;
  const currentIndex = ((step % total) + total) % total;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + total) % total;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    let normalizedDiff = diff;
    if (diff > total / 2) normalizedDiff -= total;
    if (diff < -total / 2) normalizedDiff += total;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className={cn("w-full max-w-7xl mx-auto md:p-4 lg:p-6", className)}>
      <div className="relative overflow-hidden rounded-[2.2rem] lg:rounded-[3.5rem] flex flex-col lg:flex-row min-h-[560px] lg:min-h-[600px] border border-zinc-200/90 dark:border-white/10 shadow-2xl bg-zinc-950">
        
        {/* Left Column: Vertical Floating Carousel Menu */}
        <div className="w-full lg:w-[42%] min-h-[340px] md:min-h-[420px] lg:h-auto relative z-30 flex flex-col items-start justify-center overflow-hidden px-6 sm:px-10 md:px-14 lg:pl-14 bg-gradient-to-br from-[#7C3AED] via-[#6366F1] to-[#4F46E5] dark:from-[#5B21B6] dark:via-[#4338CA] dark:to-[#312E81]">
          {/* Top & Bottom Vignette Mask */}
          <div className="absolute inset-x-0 top-0 h-14 md:h-20 lg:h-18 bg-gradient-to-b from-[#7C3AED] dark:from-[#5B21B6] via-[#7C3AED]/80 dark:via-[#5B21B6]/80 to-transparent z-40 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-14 md:h-20 lg:h-18 bg-gradient-to-t from-[#4F46E5] dark:from-[#312E81] via-[#4F46E5]/80 dark:via-[#312E81]/80 to-transparent z-40 pointer-events-none" />
          
          {/* Menu Title Pill */}
          <div className="absolute top-5 left-6 sm:left-10 lg:left-14 z-50">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-[10px] font-bold uppercase tracking-widest border border-white/30 shadow-xs">
              <Sparkles className="w-3 h-3" />
              <span>Milestone Explorer</span>
            </span>
          </div>

          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20 py-12">
            {features.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(total / 2),
                total / 2,
                distance
              );

              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.28,
                    scale: isActive ? 1 : 0.94,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 95,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-3.5 px-5 sm:px-7 md:px-8 py-3 rounded-full transition-all duration-500 text-left group border cursor-pointer shadow-xs",
                      isActive
                        ? "bg-white text-[#5B21B6] border-white z-10 shadow-lg scale-105"
                        : "bg-white/10 text-white/70 border-white/20 hover:border-white/50 hover:text-white hover:bg-white/15"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-300",
                        isActive ? "text-[#7C3AED]" : "text-white/60 group-hover:text-white"
                      )}
                    >
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                    </div>

                    <span className="font-bold text-xs sm:text-sm tracking-tight whitespace-nowrap uppercase font-mono">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 3D Animated Card Showcase */}
        <div className="flex-1 min-h-[460px] md:min-h-[540px] lg:h-auto relative bg-[#0E0C16] dark:bg-[#07060B] flex items-center justify-center py-12 md:py-16 lg:py-12 px-4 sm:px-8 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-zinc-800/80">
          
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-purple-600/15 blur-3xl rounded-full pointer-events-none" />

          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.86 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.45 : 0,
                    rotate: isPrev ? -4 : isNext ? 4 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 24,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-4 md:border-6 border-zinc-900 dark:border-zinc-800 bg-zinc-950 origin-center shadow-2xl"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0 scale-100"
                        : "grayscale blur-[2px] brightness-70 scale-105"
                    )}
                  />

                  {/* Gradient Overlay for Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                  {/* Top Live Milestone Badge */}
                  <div
                    className={cn(
                      "absolute top-6 left-6 flex items-center gap-2.5 transition-opacity duration-300 z-10",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse" />
                    <span className="text-zinc-300 text-[10px] font-mono font-bold uppercase tracking-[0.25em]">
                      ACHIEVEMENT {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Active Card Bottom Overlay Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="absolute inset-x-0 bottom-0 p-6 sm:p-8 pt-24 flex flex-col justify-end pointer-events-none z-10"
                      >
                        {feature.metric && (
                          <div className="bg-purple-500/80 text-white px-3.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider w-fit shadow-md mb-2.5 border border-purple-300/40 backdrop-blur-md">
                            {feature.metric}
                          </div>
                        )}

                        <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-sans leading-tight">
                          {feature.label}
                        </h4>

                        <p className="text-zinc-300 font-normal text-xs sm:text-sm leading-relaxed mt-2 drop-shadow-sm max-w-sm">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
