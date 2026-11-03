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
    title: 'Event Management System',
    category: 'Software Development',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
    alt: 'Event Management System Platform',
    description:
      'A full-stack event management platform where clients share requirements and budgets, managers assign teams, and members track tasks through completion.',
  },
  {
    id: '02',
    title: 'ERP System',
    category: 'Software Development',
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    alt: 'Startup ERP Platform',
    description:
      'A startup-focused ERP platform for team onboarding, task assignment, daily progress tracking, leave management, notifications, and project status monitoring.',
  },
  {
    id: '03',
    title: 'Sibling Shoes',
    category: 'Software Development',
    src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
    alt: 'Sibling Shoes E-Commerce Platform',
    description:
      'An online shoe shopping platform where customers can explore footwear, manage their cart, and move through a streamlined e-commerce shopping experience.',
  },
  {
    id: '04',
    title: 'Hospital Nurse Shift Management',
    category: 'Project Management',
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    alt: 'Hospital Nurse Shift Management Platform',
    description:
      'A German-market SaaS platform for hospital nurse scheduling, shift swapping, leave requests, and workforce coordination across mobile and web dashboards.',
  },
  {
    id: '05',
    title: 'Fabric Production Management',
    category: 'Project Management',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop',
    alt: 'Fabric Production Management Desktop Application',
    description:
      'A desktop production management system covering fabric design, dyeing, weaving, wrapping, order tracking, client management, and delivery invoicing.',
  },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenTerminal,
  onExploreJourney,
}) => {
  const handleNavigateToProjects = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('app-navigate', { detail: { tab: 'projects', sectionId: 'works-showcase' } })
      );
    }
  };

  return (
    <section
      id="projects-section"
      className="relative w-full min-h-screen flex flex-col justify-center py-6 sm:py-8 md:py-10 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#FAFAFC] dark:bg-[#09080F] text-black dark:text-zinc-100 transition-colors duration-300 overflow-hidden border-t border-zinc-200/80 dark:border-zinc-800/80"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-[#FFEE00]/15 via-[#FFEE00]/5 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center my-auto">
        {/* Section Header */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-4 sm:mb-5 lg:mb-6">
          {/* Headline: Projects that made me */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight uppercase leading-tight font-sans"
          >
            Projects that made me
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            A curated showcase of full-stack platforms, ERP workflows, e-commerce architectures, and enterprise workforce management systems built for scale.
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
          <ElasticGallery items={PROJECTS_LIST} defaultActiveId="01" className="py-0 sm:py-1" />
        </motion.div>

        {/* Bottom CTA / Terminal Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-7 sm:mt-8 lg:mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={handleNavigateToProjects}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#FFEE00] text-black text-xs sm:text-sm font-bold hover:bg-[#ffe600] transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-95"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Explore All Projects & Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onExploreJourney && (
            <button
              onClick={onExploreJourney}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs sm:text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-95"
            >
              <Layers className="w-4 h-4" />
              <span>Explore Milestones & Deep Dive</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;