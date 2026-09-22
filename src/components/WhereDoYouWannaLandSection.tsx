'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, FolderGit2, User, ArrowRight } from 'lucide-react';
import { LiquidTrailCanvas, LiquidGlassButton } from './ui/LiquidGlassButton';

interface WhereDoYouWannaLandSectionProps {
  onNavigateJourney?: () => void;
  onNavigateAbout?: () => void;
  onNavigateProjects?: () => void;
}

export const WhereDoYouWannaLandSection: React.FC<WhereDoYouWannaLandSectionProps> = ({
  onNavigateJourney,
  onNavigateAbout,
  onNavigateProjects,
}) => {
  const handleScrollToProjects = () => {
    if (onNavigateProjects) {
      onNavigateProjects();
    } else {
      const el = document.getElementById('projects-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToAbout = () => {
    if (onNavigateAbout) {
      onNavigateAbout();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-10 sm:py-14 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#F8F8FA] dark:bg-[#07060B] text-black dark:text-zinc-100 transition-colors duration-300 overflow-hidden border-t border-zinc-200/80 dark:border-zinc-800/80">
      
      {/* Interactive Liquid Canvas Layer tracking cursor movement across the entire section */}
      <LiquidTrailCanvas />

      {/* Subtle Background Radial Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-blue-500/10 via-purple-500/8 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Shrunk Heading Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight uppercase leading-tight font-sans"
        >
          Where do you wanna land next?
        </motion.h2>

        {/* 3 Liquid Glass Buttons Grid - Compact spacing */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-4xl"
        >
          {/* Button 1: My Journey */}
          <LiquidGlassButton
            label="My Journey"
            sublabel="Interactive Milestones"
            icon={Sparkles}
            onClick={onNavigateJourney}
          />

          {/* Button 2: About Me */}
          <LiquidGlassButton
            label="About Me"
            sublabel="Identity & Core Disciplines"
            icon={User}
            onClick={handleScrollToAbout}
          />

          {/* Button 3: Projects */}
          <LiquidGlassButton
            label="Projects"
            sublabel="Architectural Case Studies"
            icon={FolderGit2}
            onClick={handleScrollToProjects}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default WhereDoYouWannaLandSection;
