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
    title: 'SOFTWARE ENGINEERING',
    description: 'Building end-to-end products across full-stack development, modern web technologies, and cloud infrastructure.',
    tag: 'Engineering',
    icon: Code2,
  },
  {
    id: '2',
    title: 'Data & Analytics',
    description: 'Turning raw information into dashboards, patterns, and meaningful insights.',
    tag: 'Intelligence',
    icon: BarChart3,
  },
  {
    id: '3',
    title: 'PROJECT MANAGEMENT',
    description: 'Connecting people, requirements, and technology to move ideas from planning to execution.',
    tag: 'Management',
    icon: Users,
  },
  {
    id: '4',
    title: 'HUMAN RESOURCES',
    description: 'Connecting people, processes, and organizational needs to create better ways of working.',
    tag: 'People',
    icon: ShieldCheck,
  },
  {
    id: '5',
    title: 'AI & MACHINE LEARNING',
    description: 'Exploring machine learning, computer vision, and intelligent solutions to real-world problems.',
    tag: 'AI Frontier',
    icon: Bot,
  },
];

export const MoreThanOnePerspectiveSection: React.FC<MoreThanOnePerspectiveSectionProps> = ({
  onExploreJourney,
}) => {
  return (
    <section className="relative w-full py-8 sm:py-10 md:py-12 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#F3F2F6] dark:bg-[#0E0C16] text-black dark:text-zinc-100 transition-colors duration-300 overflow-hidden border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col items-center justify-center gap-4 sm:gap-6">

      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-purple-500/15 via-violet-600/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Top Header Section */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center shrink-0">

        {/* Requested Headline: MORE THAN ONE PERSPECTIVE */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight uppercase leading-tight font-sans"
        >
          MORE THAN ONE PERSPECTIVE
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 mt-1.5 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Different disciplines. One journey — shaped by building, leading, analyzing, and learning.
        </motion.p>
      </div>

      {/* Middle Carousel Area - Positioned tightly between title and CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full flex items-center justify-center my-1 sm:my-2"
      >
        <CircularCarousel
          items={PERSPECTIVES_CAROUSEL_ITEMS}
          autoPlay={true}
          autoPlayInterval={4500}
          className="w-full max-w-5xl"
        />
      </motion.div>

      {/* Bottom Action Footer */}
      <div className="w-full flex items-center justify-center shrink-0 pt-1">
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

