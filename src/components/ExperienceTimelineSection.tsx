'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Timeline } from '@/components/ui/timeline-02';
import { Briefcase, Sparkles } from 'lucide-react';

export const ExperienceTimelineSection: React.FC = () => {
  return (
    <section id="experience-section" className="relative z-30 w-full min-h-screen lg:h-screen flex flex-col justify-center py-4 sm:py-6 lg:py-8 px-4 sm:px-8 md:px-12 lg:px-16 bg-background text-foreground transition-colors duration-300 overflow-hidden border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-2 sm:mb-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight"
          >
            My Experience
          </motion.h2>
        </div>

        {/* Interactive Timeline Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <Timeline />
        </motion.div>
      </div>
    </section>
  );
};
