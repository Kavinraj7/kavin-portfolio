'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  BarChart3,
  Briefcase,
  Users,
  Database,
  Server,
  Layers,
  Globe,
  FileCode2,
  Terminal,
  Cpu,
  PieChart,
  Workflow,
  Kanban,
  RotateCcw,
  CalendarDays,
  FileText,
  UserCheck,
  GraduationCap,
  Award,
  HeartHandshake,
  MessagesSquare,
  LucideIcon,
  ShieldCheck,
  X,
  Brain,
  Eye,
  Scan,
  Cloud,
  Atom,
  Table,
  Binary,
  ClipboardCheck,
  ClipboardList,
  GitBranch,
  Filter,
  Sparkles,
} from 'lucide-react';
import { soundFx } from '@/utils/audio';

type DomainKey = 'software' | 'analytics' | 'pm' | 'hr';

interface SkillLogoItem {
  name: string;
  category: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  color: string;
  bgGlow: string;
}

interface DomainData {
  key: DomainKey;
  title: string;
  roleTitle: string;
  subline: string;
  description: string;
  icon: LucideIcon;
  direction: 'left-to-right' | 'right-to-left';
  skills: SkillLogoItem[];
}

const DOMAINS: DomainData[] = [
  {
    key: 'software',
    title: 'Software Developer',
    roleTitle: 'Full-Stack & Cloud Engineering',
    subline: 'Full-Stack & Cloud Engineering',
    description: 'Building end-to-end digital products across multiple technology stacks, adapting from frontend experiences to backend systems, databases, APIs, and cloud infrastructure.',
    direction: 'left-to-right',
    icon: Code2,
    skills: [
      { name: 'React.js', category: 'Frontend', icon: Atom, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Next.js', category: 'Framework', icon: Globe, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'TypeScript', category: 'Language', icon: FileCode2, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Tailwind CSS', category: 'Styling', icon: Layers, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Node.js', category: 'Backend', icon: Server, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Spring Boot', category: 'Backend', icon: Cpu, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'MySQL', category: 'Database', icon: Database, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'DynamoDB', category: 'NoSQL DB', icon: Database, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'AWS', category: 'Cloud Infra', icon: Cloud, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Python', category: 'Core Language', icon: Terminal, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'GSAP', category: 'Animations', icon: Sparkles, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
    ],
  },
  {
    key: 'analytics',
    title: 'Data Analytics & AI',
    roleTitle: 'Data Intelligence & Modeling',
    subline: 'Data Intelligence & Modeling',
    description: 'Turning data into insights and intelligent solutions through analytics, visualization, machine learning, and computer vision.',
    direction: 'right-to-left',
    icon: BarChart3,
    skills: [
      { name: 'Python', category: 'Core Language', icon: Terminal, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'SQL', category: 'Query & DB', icon: Database, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'PowerBI', category: 'Visualization', icon: PieChart, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Pandas', category: 'Data Analysis', icon: Table, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'NumPy', category: 'Computation', icon: Binary, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Scikit-learn', category: 'Machine Learning', icon: Brain, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'OpenCV', category: 'Computer Vision', icon: Eye, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'MediaPipe', category: 'AI Vision Pipeline', icon: Scan, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
    ],
  },
  {
    key: 'hr',
    title: 'HR Manager',
    roleTitle: 'PEOPLE OPERATIONS & TALENT',
    subline: 'PEOPLE OPERATIONS & TALENT',
    description: 'Supporting hiring and people operations through candidate screening, student communication, coordination, and structured administrative processes.',
    direction: 'right-to-left',
    icon: Users,
    skills: [
      { name: 'Candidate Screening', category: 'Recruitment', icon: UserCheck, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Candidate Filtering', category: 'Talent Sourcing', icon: Filter, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Student Engagement', category: 'Campus Relations', icon: GraduationCap, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'People Management', category: 'Leadership', icon: Users, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Team Coordination', category: 'Team Ops', icon: Award, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Communication', category: 'Interpersonal', icon: MessagesSquare, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Administration', category: 'HR Operations', icon: ClipboardCheck, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Community Management', category: 'Engagement', icon: Sparkles, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Event Coordination', category: 'Events & Logistics', icon: CalendarDays, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Documentation', category: 'Process & Specs', icon: FileText, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Stakeholder Communication', category: 'Collaboration', icon: HeartHandshake, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
    ],
  },
  {
    key: 'pm',
    title: 'Project Manager',
    roleTitle: 'PEOPLE, PROCESS & TECHNOLOGY',
    subline: 'PEOPLE, PROCESS & TECHNOLOGY',
    description: 'Driving projects from requirements to delivery by connecting people, technology, workflows, and stakeholders through structured execution.',
    direction: 'left-to-right',
    icon: Briefcase,
    skills: [
      { name: 'Project Planning', category: 'Roadmapping', icon: CalendarDays, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Requirement Analysis', category: 'Scoping & Specs', icon: ClipboardList, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Agile / Scrum', category: 'Methodology', icon: RotateCcw, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Jira', category: 'Project Tracking', icon: Kanban, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'SDLC', category: 'Lifecycle Governance', icon: GitBranch, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Client Management', category: 'Client Relations', icon: ShieldCheck, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Team Management', category: 'Execution Leadership', icon: Users, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Stakeholder Management', category: 'Executive Sync', icon: HeartHandshake, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
      { name: 'Workflow Management', category: 'Process Automation', icon: Workflow, color: 'text-black', bgGlow: 'from-[#FFEE00]/25' },
    ],
  },
];

export const MySkillsSection: React.FC = () => {
  const [hoveredDomain, setHoveredDomain] = useState<DomainKey | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<DomainKey>('software');
  const [animatingDomain, setAnimatingDomain] = useState<DomainKey | null>(null);

  const isCombined = hoveredDomain !== null;
  const activeKey = hoveredDomain || selectedDomain;
  const activeData = DOMAINS.find((d) => d.key === activeKey) || DOMAINS[0];

  const handleTriggerArrowClick = (key: DomainKey) => {
    soundFx.playConfirm();
    setAnimatingDomain(key);

    setTimeout(() => {
      setHoveredDomain(key);
      setSelectedDomain(key);
      setAnimatingDomain(null);
    }, 380);
  };

  const handleDomainSelect = (key: DomainKey) => {
    soundFx.playSelect();
    setHoveredDomain(key);
    setSelectedDomain(key);
  };

  const handleCloseSpotlight = () => {
    soundFx.playDismiss();
    setHoveredDomain(null);
  };

  return (
    <section
      id="about-details"
      className="relative w-full min-h-screen pt-12 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28 px-4 sm:px-8 md:px-12 lg:px-16 bg-background text-foreground flex flex-col justify-center items-center overflow-hidden border-t border-zinc-200 dark:border-zinc-800 select-none transition-colors duration-300"
    >
      {/* Anchor for My Skills Navigation */}
      <div id="my-skills" className="absolute -top-12 left-0 w-1 h-1 opacity-0 pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase font-display text-zinc-950 dark:text-white"
        >
          My Skills
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-2.5 sm:mt-3 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-xl mx-auto"
        >
          A multidisciplinary toolkit bridging engineering, data intelligence, people operations, and delivery management.
        </motion.p>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 w-full max-w-6xl lg:max-w-7xl mx-auto h-auto min-h-[580px] md:h-[660px] lg:h-[680px]">
        <AnimatePresence mode="wait">
          {!isCombined ? (
            /* ============================================================
               IDLE STATE: 4 Clean Bento Boxes
               - Skill icons inside have #FFEE00 hover
               - Domain cards keep clean neutral hover
               ============================================================ */
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full h-full grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 md:gap-5 lg:gap-6"
            >
              {/* 1. Software Developer: Expanded Width (Col span 8, Row span 1) */}
              <div className="md:col-span-8 h-full p-6 sm:p-7 md:p-8 lg:p-9 rounded-3xl bg-zinc-50/90 dark:bg-zinc-900/80 hover:bg-zinc-100/90 dark:hover:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md">
                {/* Clickable arrow overlay on hover */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTriggerArrowClick('software');
                  }}
                  className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 flex items-center justify-end"
                  title="Click arrow to open spotlight"
                >
                  <div
                    className="w-full h-full bg-gradient-to-l from-zinc-900/15 via-zinc-900/5 to-transparent dark:from-white/35 dark:via-white/15 dark:to-transparent border-r-2 border-zinc-900/40 dark:border-white/80 flex items-center justify-center pr-1 transition-all"
                    style={{
                      clipPath: 'polygon(100% 0, 45% 0, 0 50%, 45% 100%, 100% 100%)',
                    }}
                  >
                    <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] sm:text-[10px] font-mono font-black tracking-[0.25em] text-zinc-950 dark:text-white uppercase select-none">
                      CLICK HERE
                    </span>
                  </div>
                </div>

                {animatingDomain === 'software' && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-zinc-900/10 dark:bg-white/75 backdrop-blur-md z-40 origin-right"
                  />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-black dark:text-white flex items-center justify-center mb-4 group-hover:scale-110 shadow-xs transition-all duration-200">
                    <Code2 className="w-6 h-6 text-black dark:text-white" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white mb-1 transition-colors font-display">
                    {DOMAINS[0].title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm font-normal">
                    {DOMAINS[0].subline}
                  </p>
                </div>

                {/* Skill Icons Preview (up to 6) - #FFEE00 Hover Accent on skill icons */}
                <div className="relative z-10 pt-4 flex flex-wrap items-center gap-2">
                  {DOMAINS[0].skills.slice(0, 6).map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        title={skill.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-black dark:text-white shadow-xs hover:border-[#FFEE00] hover:bg-[#FFEE00]/10 hover:shadow-[0_0_12px_rgba(255,238,0,0.45)] hover:scale-110 transition-all duration-200 cursor-pointer"
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black dark:text-white" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Data Analytics: Square Box (Col span 4, Row span 1) */}
              <div className="md:col-span-4 h-full p-6 sm:p-7 md:p-8 lg:p-9 rounded-3xl bg-zinc-50/90 dark:bg-zinc-900/80 hover:bg-zinc-100/90 dark:hover:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md">
                {/* Clickable arrow overlay on hover */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTriggerArrowClick('analytics');
                  }}
                  className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 flex items-center justify-end"
                  title="Click arrow to open spotlight"
                >
                  <div
                    className="w-full h-full bg-gradient-to-l from-zinc-900/15 via-zinc-900/5 to-transparent dark:from-white/35 dark:via-white/15 dark:to-transparent border-r-2 border-zinc-900/40 dark:border-white/80 flex items-center justify-center pr-1 transition-all"
                    style={{
                      clipPath: 'polygon(100% 0, 45% 0, 0 50%, 45% 100%, 100% 100%)',
                    }}
                  >
                    <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] sm:text-[10px] font-mono font-black tracking-[0.25em] text-zinc-950 dark:text-white uppercase select-none">
                      CLICK HERE
                    </span>
                  </div>
                </div>

                {animatingDomain === 'analytics' && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-zinc-900/10 dark:bg-white/75 backdrop-blur-md z-40 origin-right"
                  />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-black dark:text-white flex items-center justify-center mb-4 group-hover:scale-110 shadow-xs transition-all duration-200">
                    <BarChart3 className="w-6 h-6 text-black dark:text-white" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white mb-1 transition-colors font-display">
                    {DOMAINS[1].title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm font-normal">
                    {DOMAINS[1].subline}
                  </p>
                </div>

                {/* Skill Icons Preview (up to 6) - #FFEE00 Hover Accent on skill icons */}
                <div className="relative z-10 pt-4 flex flex-wrap items-center gap-2">
                  {DOMAINS[1].skills.slice(0, 6).map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        title={skill.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-black dark:text-white shadow-xs hover:border-[#FFEE00] hover:bg-[#FFEE00]/10 hover:shadow-[0_0_12px_rgba(255,238,0,0.45)] hover:scale-110 transition-all duration-200 cursor-pointer"
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black dark:text-white" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. HR Manager: Square Box (Col span 4, Row span 1) */}
              <div className="md:col-span-4 h-full p-6 sm:p-7 md:p-8 lg:p-9 rounded-3xl bg-zinc-50/90 dark:bg-zinc-900/80 hover:bg-zinc-100/90 dark:hover:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md">
                {/* Clickable arrow overlay on hover */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTriggerArrowClick('hr');
                  }}
                  className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 flex items-center justify-end"
                  title="Click arrow to open spotlight"
                >
                  <div
                    className="w-full h-full bg-gradient-to-l from-zinc-900/15 via-zinc-900/5 to-transparent dark:from-white/35 dark:via-white/15 dark:to-transparent border-r-2 border-zinc-900/40 dark:border-white/80 flex items-center justify-center pr-1 transition-all"
                    style={{
                      clipPath: 'polygon(100% 0, 45% 0, 0 50%, 45% 100%, 100% 100%)',
                    }}
                  >
                    <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] sm:text-[10px] font-mono font-black tracking-[0.25em] text-zinc-950 dark:text-white uppercase select-none">
                      CLICK HERE
                    </span>
                  </div>
                </div>

                {animatingDomain === 'hr' && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-zinc-900/10 dark:bg-white/75 backdrop-blur-md z-40 origin-right"
                  />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-black dark:text-white flex items-center justify-center mb-4 group-hover:scale-110 shadow-xs transition-all duration-200">
                    <Users className="w-6 h-6 text-black dark:text-white" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white mb-1 transition-colors font-display">
                    {DOMAINS[2].title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm font-normal">
                    {DOMAINS[2].subline}
                  </p>
                </div>

                {/* Skill Icons Preview (up to 6) - #FFEE00 Hover Accent on skill icons */}
                <div className="relative z-10 pt-4 flex flex-wrap items-center gap-2">
                  {DOMAINS[2].skills.slice(0, 6).map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        title={skill.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-black dark:text-white shadow-xs hover:border-[#FFEE00] hover:bg-[#FFEE00]/10 hover:shadow-[0_0_12px_rgba(255,238,0,0.45)] hover:scale-110 transition-all duration-200 cursor-pointer"
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black dark:text-white" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Project Manager: Expanded Width (Col span 8, Row span 1) */}
              <div className="md:col-span-8 h-full p-6 sm:p-7 md:p-8 lg:p-9 rounded-3xl bg-zinc-50/90 dark:bg-zinc-900/80 hover:bg-zinc-100/90 dark:hover:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md">
                {/* Clickable arrow overlay on hover */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTriggerArrowClick('pm');
                  }}
                  className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 flex items-center justify-end"
                  title="Click arrow to open spotlight"
                >
                  <div
                    className="w-full h-full bg-gradient-to-l from-zinc-900/15 via-zinc-900/5 to-transparent dark:from-white/35 dark:via-white/15 dark:to-transparent border-r-2 border-zinc-900/40 dark:border-white/80 flex items-center justify-center pr-1 transition-all"
                    style={{
                      clipPath: 'polygon(100% 0, 45% 0, 0 50%, 45% 100%, 100% 100%)',
                    }}
                  >
                    <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] sm:text-[10px] font-mono font-black tracking-[0.25em] text-zinc-950 dark:text-white uppercase select-none">
                      CLICK HERE
                    </span>
                  </div>
                </div>

                {animatingDomain === 'pm' && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-zinc-900/10 dark:bg-white/75 backdrop-blur-md z-40 origin-right"
                  />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-black dark:text-white flex items-center justify-center mb-4 group-hover:scale-110 shadow-xs transition-all duration-200">
                    <Briefcase className="w-6 h-6 text-black dark:text-white" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white mb-1 transition-colors font-display">
                    {DOMAINS[3].title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm font-normal">
                    {DOMAINS[3].subline}
                  </p>
                </div>

                {/* Skill Icons Preview (up to 6) - #FFEE00 Hover Accent on skill icons */}
                <div className="relative z-10 pt-4 flex flex-wrap items-center gap-2">
                  {DOMAINS[3].skills.slice(0, 6).map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        title={skill.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-black dark:text-white shadow-xs hover:border-[#FFEE00] hover:bg-[#FFEE00]/10 hover:shadow-[0_0_12px_rgba(255,238,0,0.45)] hover:scale-110 transition-all duration-200 cursor-pointer"
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black dark:text-white" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ============================================================
               COMBINED SPOTLIGHT STATE: Cinematic Spotlight Modal
               1. Domain names at header: #FFEE00 hover & active
               2. Skill cards: #FFEE00 hover & glow
               3. Domain title inside content: default #FFEE00 colour
               ============================================================ */
            <motion.div
              key="combined-view"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full h-auto min-h-[580px] md:h-full rounded-3xl bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] p-5 sm:p-8 md:p-9 flex flex-col justify-between backdrop-blur-2xl overflow-y-auto"
            >
              {/* 1. Top Navigation Strip: Domain names at header with #FFEE00 hover & active */}
              <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {DOMAINS.map((domain) => {
                    const Icon = domain.icon;
                    const isCurrent = domain.key === activeKey;

                    return (
                      <button
                        key={domain.key}
                        onClick={() => handleDomainSelect(domain.key)}
                        className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer border ${
                          isCurrent
                            ? 'bg-[#FFEE00] text-black border-[#FFEE00] shadow-[0_0_18px_rgba(255,238,0,0.35)] scale-105'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700/60 hover:text-black hover:bg-[#FFEE00] hover:border-[#FFEE00] hover:shadow-[0_0_15px_rgba(255,238,0,0.3)]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{domain.title}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleCloseSpotlight}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-600 dark:text-zinc-300 hover:text-black bg-zinc-100 dark:bg-zinc-800 hover:bg-[#FFEE00] border border-zinc-200 dark:border-zinc-700 hover:border-[#FFEE00] hover:shadow-[0_0_15px_rgba(255,238,0,0.25)] transition-all px-3.5 py-1.5 rounded-full cursor-pointer shadow-xs"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close Spotlight</span>
                </button>
              </div>

              {/* Combined Body: Active Domain on Left Anchor, Interactive Skill Logos on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center flex-grow py-2">
                {/* 3. Left Column: Domain Spotlight with Domain name in default #FFEE00 colour */}
                <div className="lg:col-span-4 flex flex-col justify-center space-y-4 pr-0 lg:pr-4">
                  <div>
                    {/* Domain name in default #FFEE00 colour */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#FFEE00] mb-1.5 font-display">
                      {activeData.title}
                    </h3>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-3">
                      {activeData.subline}
                    </div>

                    <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {activeData.description}
                    </p>
                  </div>
                </div>

                {/* 2. Right Column: Skill cards with #FFEE00 Hover effects */}
                <div className="lg:col-span-8 flex flex-col justify-center">
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-3 flex items-center justify-between font-mono">
                    <span>Mastered Skill Technologies</span>
                  </div>

                  {/* Grid of Interactive Skill Tiles with #FFEE00 Hover */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                    {activeData.skills.map((skill, index) => {
                      const Icon = skill.icon;
                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: index * 0.03 }}
                          whileHover={{ y: -5, scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          className="group relative p-3.5 sm:p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/90 dark:border-zinc-700/60 hover:border-[#FFEE00] hover:shadow-[0_0_25px_rgba(255,238,0,0.35)] transition-all duration-200 flex flex-col items-center text-center justify-center cursor-pointer"
                        >
                          {/* Vibrant #FFEE00 hover radial glow */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${skill.bgGlow} to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none`} />

                          {/* Skill Logo / Icon - Pure Black icon on white badge with #FFEE00 border on hover */}
                          <div className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 group-hover:border-[#FFEE00] group-hover:shadow-[0_0_15px_rgba(255,238,0,0.45)] flex items-center justify-center mb-2 group-hover:scale-110 shadow-xs transition-all duration-200">
                            <Icon className="w-5 h-5 text-black dark:text-white" />
                          </div>

                          {/* Skill Name Below */}
                          <div className="relative z-10 font-bold text-xs text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-[#FFEE00] transition-colors leading-tight">
                            {skill.name}
                          </div>

                          {/* Category Tag */}
                          <div className="relative z-10 text-[9px] font-mono text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">
                            {skill.category}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MySkillsSection;
