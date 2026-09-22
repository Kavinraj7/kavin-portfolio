'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, Terminal, ArrowRight } from 'lucide-react';
import { FeatureCarousel, DEFAULT_ACHIEVEMENTS } from './ui/feature-carousel';

interface BeyondTheScreenSectionProps {
  onOpenTerminal?: () => void;
  onExploreJourney?: () => void;
}

export const BeyondTheScreenSection: React.FC<BeyondTheScreenSectionProps> = ({
  onOpenTerminal,
  onExploreJourney,
}) => {
  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#F3F2F6] dark:bg-[#0E0C16] text-black dark:text-zinc-100 transition-colors duration-300 overflow-hidden border-t border-zinc-200/80 dark:border-zinc-800/80">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-purple-500/12 via-indigo-600/8 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-8 sm:mb-12">
          
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/90 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800/50 text-purple-700 dark:text-purple-300 text-[11px] font-bold font-mono uppercase tracking-wider mb-3 shadow-2xs"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Milestones</span>
          </motion.div>

          {/* Requested Headline: Beyond the screen */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-950 dark:text-white tracking-tight uppercase leading-tight font-sans"
          >
            Beyond the screen
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Key career milestones, global hackathon victories, high-impact organizational leadership, and community mentorship beyond day-to-day code.
          </motion.p>
        </div>

        {/* Feature Carousel Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <FeatureCarousel features={DEFAULT_ACHIEVEMENTS} />
        </motion.div>

        {/* Bottom CTA / Terminal Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          {onExploreJourney && (
            <button
              onClick={onExploreJourney}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs sm:text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore My Full Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Ask Kavin AI About Achievements</span>
            </button>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default BeyondTheScreenSection;
