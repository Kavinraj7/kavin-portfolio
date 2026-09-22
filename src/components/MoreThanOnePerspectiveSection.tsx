'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, ArrowRight, Code2, BarChart3, Users, ShieldCheck, Bot } from 'lucide-react';
import { CircularCarousel, CarouselItem } from './ui/circular-carousel';

interface MoreThanOnePerspectiveSectionProps {
  onExploreJourney?: () => void;
}

const PERSPECTIVES_CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: '1',
    title: 'Software Engineering',
    description: 'Architecting high-performance full stack web platforms, clean systems, and scalable modern UIs.',
    tag: 'Engineering',
    icon: Code2,
  },
  {
    id: '2',
    title: 'Data Analytics',
    description: 'Transforming complex datasets and telemetry into high-impact strategic business roadmaps.',
    tag: 'Intelligence',
    icon: BarChart3,
  },
  {
    id: '3',
    title: 'HR & People Ops',
    description: 'Cultivating high-trust engineering culture, talent coaching, and empathetic team alignment.',
    tag: 'People',
    icon: Users,
  },
  {
    id: '4',
    title: 'Administration',
    description: 'Governance, operational scaling, resource allocation, and frictionless team execution.',
    tag: 'Operations',
    icon: ShieldCheck,
  },
  {
    id: '5',
    title: 'AI & Autonomous Agents',
    description: 'Orchestrating intelligent agentic workflows, LLM tools, and automated reasoning pipelines.',
    tag: 'AI Frontier',
    icon: Bot,
  },
];

export const MoreThanOnePerspectiveSection: React.FC<MoreThanOnePerspectiveSectionProps> = ({
  onExploreJourney,
}) => {
  return (
    <section className="relative w-full h-[calc(100vh-4rem)] min-h-[640px] max-h-[100vh] px-4 sm:px-8 md:px-12 lg:px-16 bg-[#F3F2F6] dark:bg-[#0E0C16] text-black dark:text-zinc-100 transition-colors duration-300 overflow-hidden border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col justify-between py-6 sm:py-8">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-purple-500/15 via-violet-600/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Top Header Section */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center shrink-0">
        
        {/* Section Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800/50 text-purple-700 dark:text-purple-300 text-[11px] font-bold font-mono uppercase tracking-wider mb-2 sm:mb-3 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multidisciplinary Matrix</span>
        </motion.div>

        {/* Requested Headline: MORE THAN ONE PERSPECTIVE */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight uppercase leading-tight font-sans"
        >
          MORE THAN ONE PERSPECTIVE
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          A seamless intersection of technical depth, empirical data analytics, organizational strategy, and empathetic people leadership.
        </motion.p>
      </div>

      {/* Middle Carousel Area - Fills Space Wisely in Viewport */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full flex-1 flex items-center justify-center my-auto min-h-0"
      >
        <CircularCarousel
          items={PERSPECTIVES_CAROUSEL_ITEMS}
          autoPlay={true}
          autoPlayInterval={4500}
          className="w-full max-w-5xl"
        />
      </motion.div>

      {/* Bottom Action Footer */}
      <div className="w-full flex items-center justify-center shrink-0 pt-2 pb-1">
        {onExploreJourney && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <button
              onClick={onExploreJourney}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs sm:text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-95"
            >
              <Layers className="w-4 h-4" />
              <span>Explore All Perspectives in Detail</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>

    </section>
  );
};

