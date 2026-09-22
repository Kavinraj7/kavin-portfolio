'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { ElasticGallery, ElasticItemProps } from './ui/elastic-gallery';

interface ProjectsSectionProps {
  onOpenTerminal?: () => void;
  onExploreJourney?: () => void;
}

const PROJECTS_LIST: ElasticItemProps[] = [
  {
    id: '01',
    title: 'Neon Cyber Telemetry',
    category: 'Distributed Systems',
    src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    alt: 'High Frequency Telemetry Engine',
    description: 'High-frequency streaming engine processing 45k events/sec with sub-15ms latency using Rust, TypeScript, and Redis Streams.',
  },
  {
    id: '02',
    title: 'Neural Agent Matrix',
    category: 'AI & Autonomous Agents',
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    alt: 'Neural Autonomous Agent Fabric',
    description: 'Self-orchestrating agentic workflows connecting internal knowledge bases with LLMs, vector grounding, and automated tool-calling.',
  },
  {
    id: '03',
    title: 'Enterprise Core OS',
    category: 'Cloud Architecture',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    alt: 'Enterprise Platform Architecture',
    description: 'Complete enterprise modernization from legacy monolith to cloud-native microservices, scaling revenue 3.2x with 99.99% uptime.',
  },
  {
    id: '04',
    title: 'Predictive Intelligence',
    category: 'Data Analytics',
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    alt: 'Data Analytics & Predictive Modeling',
    description: 'Automated churn prediction engine with Bayesian experimentation guardrails, linking product analytics with executive telemetry.',
  },
  {
    id: '05',
    title: 'Radical Design System',
    category: 'Frontend Craft',
    src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    alt: 'Design System & Component Architecture',
    description: 'Accessible, themeable design system adopted by 24 squads, cutting design-to-production turnaround by 70%.',
  },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenTerminal,
  onExploreJourney,
}) => {
  return (
    <section id="projects-section" className="relative w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#FAFAFC] dark:bg-[#09080F] text-black dark:text-zinc-100 transition-colors duration-300 overflow-hidden border-t border-zinc-200/80 dark:border-zinc-800/80">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-purple-500/10 via-violet-600/5 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

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
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Case Studies & Builds</span>
          </motion.div>

          {/* Headline: Projects that made me */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-950 dark:text-white tracking-tight uppercase leading-tight font-sans"
          >
            Projects that made me
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            A curated showcase of high-concurrency systems, AI agentic pipelines, enterprise overhauls, and analytical architectures built for measurable scale.
          </motion.p>
        </div>

        {/* Elastic Gallery Accordion Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <ElasticGallery items={PROJECTS_LIST} defaultActiveId="03" />
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
              <Layers className="w-4 h-4" />
              <span>Explore Milestones & Deep Dive</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Query Projects via Kavin AI</span>
            </button>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectsSection;
