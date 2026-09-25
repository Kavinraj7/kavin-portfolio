'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Flame, Star } from 'lucide-react';

export const NeverGiveUpMarquee: React.FC = () => {
  const marqueeItems = [
    { text: "NEVER GIVE UP", filled: true, icon: Sparkles },
    { text: "NEVER GIVE UP", filled: false, icon: Zap },
    { text: "NEVER GIVE UP", filled: true, icon: Star },
    { text: "NEVER GIVE UP", filled: false, icon: Flame },
    { text: "NEVER GIVE UP", filled: true, icon: Sparkles },
    { text: "NEVER GIVE UP", filled: false, icon: Zap },
    { text: "NEVER GIVE UP", filled: true, icon: Star },
    { text: "NEVER GIVE UP", filled: false, icon: Flame },
  ];

  return (
    <div className="relative z-20 w-full py-6 sm:py-8 overflow-hidden bg-background border-y border-zinc-200/60 dark:border-zinc-800/60 select-none">
      
      {/* Ambient background glow behind marquee */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-purple-500/10 dark:bg-purple-600/15 blur-3xl rounded-full pointer-events-none" />

      {/* Edge Gradient Mask for seamless fade */}
      <div className="pointer-events-none absolute left-0 inset-y-0 w-24 sm:w-44 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 inset-y-0 w-24 sm:w-44 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

      {/* Left-to-Right Moving Track */}
      <div className="flex w-fit">
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            ease: 'linear',
            duration: 22,
            repeat: Infinity,
          }}
          className="flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12"
        >
          {/* Loop Set 1 & 2 for infinite seamless motion */}
          {[...marqueeItems, ...marqueeItems].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="flex items-center gap-8 sm:gap-12 shrink-0">
                <span
                  className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter transition-all duration-300 ${
                    item.filled
                      ? 'text-zinc-950 dark:text-white drop-shadow-xs'
                      : 'text-transparent [-webkit-text-stroke:1.5px_#71717A] dark:[-webkit-text-stroke:1.5px_#52525B] hover:text-zinc-950 dark:hover:text-white'
                  }`}
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                  }}
                >
                  {item.text}
                </span>

                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800/60 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 shadow-xs">
                  <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 fill-current animate-pulse" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

    </div>
  );
};

export default NeverGiveUpMarquee;
