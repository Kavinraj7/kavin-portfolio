'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  BarChart3,
  Briefcase,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
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
  Calendar,
  FileText,
  UserPlus,
  Heart,
  Award,
  HeartHandshake,
  MessageCircle,
  LucideIcon,
  ShieldCheck,
  Target,
  TrendingUp,
  X,
} from 'lucide-react';
import { soundFx } from '@/utils/audio';
import ConstellationGrid from './ui/constellation-grid';

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
    roleTitle: 'Full-Stack & Distributed Systems',
    subline: 'Full-Stack & Distributed Systems',
    description: 'High-velocity web apps, reactive micro-frontends, clean modular APIs, and modern UI engineering.',
    direction: 'left-to-right',
    icon: Code2,
    skills: [
      { name: 'React 19', category: 'Frontend', icon: Code2, color: 'text-cyan-400', bgGlow: 'from-cyan-500/20' },
      { name: 'Next.js 15', category: 'Framework', icon: Globe, color: 'text-white', bgGlow: 'from-zinc-500/20' },
      { name: 'TypeScript', category: 'Language', icon: FileCode2, color: 'text-blue-400', bgGlow: 'from-blue-500/20' },
      { name: 'Tailwind CSS', category: 'Styling', icon: Layers, color: 'text-teal-400', bgGlow: 'from-teal-500/20' },
      { name: 'Node.js', category: 'Runtime', icon: Server, color: 'text-emerald-400', bgGlow: 'from-emerald-500/20' },
      { name: 'PostgreSQL', category: 'Database', icon: Database, color: 'text-indigo-400', bgGlow: 'from-indigo-500/20' },
      { name: 'REST & GraphQL', category: 'APIs', icon: Workflow, color: 'text-pink-400', bgGlow: 'from-pink-500/20' },
      { name: 'Three.js / 3D', category: 'Graphics', icon: Cpu, color: 'text-amber-400', bgGlow: 'from-amber-500/20' },
    ],
  },
  {
    key: 'analytics',
    title: 'Data Analytics',
    roleTitle: 'Data Intelligence & Modeling',
    subline: 'Data Intelligence & Modeling',
    description: 'Transforming complex datasets into actionable telemetry, cohort analysis, and automated pipelines.',
    direction: 'right-to-left',
    icon: BarChart3,
    skills: [
      { name: 'Python', category: 'Core', icon: Terminal, color: 'text-yellow-400', bgGlow: 'from-yellow-500/20' },
      { name: 'SQL Optimization', category: 'Query', icon: Database, color: 'text-emerald-400', bgGlow: 'from-emerald-500/20' },
      { name: 'Tableau', category: 'Dashboard', icon: BarChart3, color: 'text-orange-400', bgGlow: 'from-orange-500/20' },
      { name: 'PowerBI', category: 'BI Reports', icon: PieChart, color: 'text-amber-400', bgGlow: 'from-amber-500/20' },
      { name: 'Pandas & NumPy', category: 'Libraries', icon: Layers, color: 'text-blue-400', bgGlow: 'from-blue-500/20' },
      { name: 'Statistical Testing', category: 'Math', icon: TrendingUp, color: 'text-indigo-400', bgGlow: 'from-indigo-500/20' },
      { name: 'ETL Pipelines', category: 'Automation', icon: Workflow, color: 'text-teal-400', bgGlow: 'from-teal-500/20' },
      { name: 'Predictive Models', category: 'ML Models', icon: Cpu, color: 'text-purple-400', bgGlow: 'from-purple-500/20' },
    ],
  },
  {
    key: 'hr',
    title: 'HR Manager',
    roleTitle: 'People Architecture & Culture',
    subline: 'People Architecture & Culture',
    description: 'Cultivating psychological safety, leveling rubrics, high-trust feedback, and career growth tracks.',
    direction: 'right-to-left',
    icon: Users,
    skills: [
      { name: 'Talent Sourcing', category: 'Recruiting', icon: UserPlus, color: 'text-purple-400', bgGlow: 'from-purple-500/20' },
      { name: 'Leveling Rubrics', category: 'Frameworks', icon: Award, color: 'text-pink-400', bgGlow: 'from-pink-500/20' },
      { name: '360° Retrospectives', category: 'Feedback', icon: MessageCircle, color: 'text-indigo-400', bgGlow: 'from-indigo-500/20' },
      { name: 'Engagement', category: 'Retention', icon: Heart, color: 'text-red-400', bgGlow: 'from-red-500/20' },
      { name: 'Mentorship Circles', category: 'Growth', icon: Sparkles, color: 'text-amber-400', bgGlow: 'from-amber-500/20' },
      { name: 'Culture Strategy', category: 'Culture', icon: HeartHandshake, color: 'text-emerald-400', bgGlow: 'from-emerald-500/20' },
      { name: 'People Ops Tools', category: 'HRIS', icon: Briefcase, color: 'text-blue-400', bgGlow: 'from-blue-500/20' },
      { name: 'Onboarding System', category: 'Cadence', icon: RotateCcw, color: 'text-teal-400', bgGlow: 'from-teal-500/20' },
    ],
  },
  {
    key: 'pm',
    title: 'Project Manager',
    roleTitle: 'Operations & Strategic Governance',
    subline: 'Operations & Strategic Governance',
    description: 'Directing sprint velocity, risk registers, cross-team roadmaps, and stakeholder alignment.',
    direction: 'left-to-right',
    icon: Briefcase,
    skills: [
      { name: 'Agile & Scrum', category: 'Process', icon: RotateCcw, color: 'text-amber-400', bgGlow: 'from-amber-500/20' },
      { name: 'Sprint Planning', category: 'Delivery', icon: Calendar, color: 'text-orange-400', bgGlow: 'from-orange-500/20' },
      { name: 'Jira & Linear', category: 'Tooling', icon: Kanban, color: 'text-blue-400', bgGlow: 'from-blue-500/20' },
      { name: 'OKR Architecture', category: 'Goals', icon: Target, color: 'text-red-400', bgGlow: 'from-red-500/20' },
      { name: 'Risk Mitigation', category: 'Governance', icon: ShieldCheck, color: 'text-emerald-400', bgGlow: 'from-emerald-500/20' },
      { name: 'Documentation', category: 'Specs', icon: FileText, color: 'text-purple-400', bgGlow: 'from-purple-500/20' },
      { name: 'Cross-Functional', category: 'Leadership', icon: Users, color: 'text-indigo-400', bgGlow: 'from-indigo-500/20' },
      { name: 'Resource Allocation', category: 'P&L / Budget', icon: Workflow, color: 'text-cyan-400', bgGlow: 'from-cyan-500/20' },
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
      className="relative w-full min-h-screen py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#030407] text-white flex flex-col justify-center items-center overflow-hidden border-t border-zinc-900 select-none"
    >
      {/* Background Interactive Dynamic Constellation Mesh with Kinetic Shockwaves */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <ConstellationGrid showOverlay={false} className="w-full h-full opacity-80" />
      </div>

      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-purple-600/10 via-blue-500/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase font-display text-white"
        >
          My Skills
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-2 text-zinc-400 text-xs sm:text-sm leading-relaxed"
        >
          Click the glowing arrow to reveal the skills spotlight.
        </motion.p>
      </div>

      {/* Main Interactive Stage - Medium balanced dimensions matching both states */}
      <div className="relative z-10 w-full max-w-5xl mx-auto h-[480px] sm:h-[500px] md:h-[520px]">
        <AnimatePresence mode="wait">
          {!isCombined ? (
            /* ============================================================
               IDLE STATE: 4 Boxes sharing the EXACT same width & height as the spotlight box
               - Row 1: Software Developer (Col span 8) + Data Analytics (Col span 4)
               - Row 2: HR Manager (Col span 4) + Project Manager (Col span 8)
               ============================================================ */
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full h-full grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-4 md:gap-5"
            >
              {/* 1. Software Developer: Expanded Width (Col span 8, Row span 1) */}
              <div className="md:col-span-8 h-full p-6 sm:p-7 md:p-8 rounded-3xl bg-[#0D0B14]/90 hover:bg-[#131020] border border-zinc-800/80 hover:border-zinc-600 shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md">
                {/* Clickable White shaded transparent arrow overlay on hover (Right side, pointing Left) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTriggerArrowClick('software');
                  }}
                  className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 flex items-center justify-end"
                  title="Click arrow to open spotlight"
                >
                  <div
                    className="w-full h-full bg-gradient-to-l from-white/35 via-white/15 to-transparent border-r-2 border-white/80 hover:from-white/45 flex items-center justify-center pr-1 transition-all"
                    style={{
                      clipPath: 'polygon(100% 0, 45% 0, 0 50%, 45% 100%, 100% 100%)',
                    }}
                  >
                    <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] sm:text-[10px] font-mono font-black tracking-[0.25em] text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] select-none">
                      CLICK HERE
                    </span>
                  </div>
                </div>

                {/* Translucent White Sweep Wipe from Right to Left when clicked */}
                {animatingDomain === 'software' && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-white/75 backdrop-blur-md z-40 origin-right"
                  />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all">
                    <Code2 className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1 group-hover:text-blue-400 transition-colors font-display">
                    {DOMAINS[0].title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm font-normal">
                    {DOMAINS[0].subline}
                  </p>
                </div>

                {/* Skill Icons Preview (up to 6) */}
                <div className="relative z-10 pt-4 flex flex-wrap items-center gap-2">
                  {DOMAINS[0].skills.slice(0, 6).map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        title={skill.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 shadow-sm"
                      >
                        <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${skill.color}`} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Data Analytics: Square Box (Col span 4, Row span 1) */}
              <div className="md:col-span-4 h-full p-6 sm:p-7 md:p-8 rounded-3xl bg-[#0D0B14]/90 hover:bg-[#131020] border border-zinc-800/80 hover:border-zinc-600 shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md">
                {/* Clickable White shaded transparent arrow overlay on hover (Right side, pointing Left) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTriggerArrowClick('analytics');
                  }}
                  className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 flex items-center justify-end"
                  title="Click arrow to open spotlight"
                >
                  <div
                    className="w-full h-full bg-gradient-to-l from-white/35 via-white/15 to-transparent border-r-2 border-white/80 hover:from-white/45 flex items-center justify-center pr-1 transition-all"
                    style={{
                      clipPath: 'polygon(100% 0, 45% 0, 0 50%, 45% 100%, 100% 100%)',
                    }}
                  >
                    <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] sm:text-[10px] font-mono font-black tracking-[0.25em] text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] select-none">
                      CLICK HERE
                    </span>
                  </div>
                </div>

                {/* Translucent White Sweep Wipe from Right to Left when clicked */}
                {animatingDomain === 'analytics' && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-white/75 backdrop-blur-md z-40 origin-right"
                  />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-all">
                    <BarChart3 className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-black tracking-tight text-white mb-1 group-hover:text-emerald-400 transition-colors font-display">
                    {DOMAINS[1].title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm font-normal">
                    {DOMAINS[1].subline}
                  </p>
                </div>

                {/* Skill Icons Preview (up to 6) */}
                <div className="relative z-10 pt-4 flex flex-wrap items-center gap-2">
                  {DOMAINS[1].skills.slice(0, 6).map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        title={skill.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 shadow-sm"
                      >
                        <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${skill.color}`} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. HR Manager: Square Box (Col span 4, Row span 1) */}
              <div className="md:col-span-4 h-full p-6 sm:p-7 md:p-8 rounded-3xl bg-[#0D0B14]/90 hover:bg-[#131020] border border-zinc-800/80 hover:border-zinc-600 shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md">
                {/* Clickable White shaded transparent arrow overlay on hover (Right side, pointing Left) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTriggerArrowClick('hr');
                  }}
                  className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 flex items-center justify-end"
                  title="Click arrow to open spotlight"
                >
                  <div
                    className="w-full h-full bg-gradient-to-l from-white/35 via-white/15 to-transparent border-r-2 border-white/80 hover:from-white/45 flex items-center justify-center pr-1 transition-all"
                    style={{
                      clipPath: 'polygon(100% 0, 45% 0, 0 50%, 45% 100%, 100% 100%)',
                    }}
                  >
                    <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] sm:text-[10px] font-mono font-black tracking-[0.25em] text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] select-none">
                      CLICK HERE
                    </span>
                  </div>
                </div>

                {/* Translucent White Sweep Wipe from Right to Left when clicked */}
                {animatingDomain === 'hr' && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-white/75 backdrop-blur-md z-40 origin-right"
                  />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-all">
                    <Users className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-black tracking-tight text-white mb-1 group-hover:text-purple-400 transition-colors font-display">
                    {DOMAINS[2].title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm font-normal">
                    {DOMAINS[2].subline}
                  </p>
                </div>

                {/* Skill Icons Preview (up to 6) */}
                <div className="relative z-10 pt-4 flex flex-wrap items-center gap-2">
                  {DOMAINS[2].skills.slice(0, 6).map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        title={skill.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 shadow-sm"
                      >
                        <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${skill.color}`} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Project Manager: Expanded Width (Col span 8, Row span 1) */}
              <div className="md:col-span-8 h-full p-6 sm:p-7 md:p-8 rounded-3xl bg-[#0D0B14]/90 hover:bg-[#131020] border border-zinc-800/80 hover:border-zinc-700 shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md">
                {/* Clickable White shaded transparent arrow overlay on hover (Right side, pointing Left) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTriggerArrowClick('pm');
                  }}
                  className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 flex items-center justify-end"
                  title="Click arrow to open spotlight"
                >
                  <div
                    className="w-full h-full bg-gradient-to-l from-white/35 via-white/15 to-transparent border-r-2 border-white/80 hover:from-white/45 flex items-center justify-center pr-1 transition-all"
                    style={{
                      clipPath: 'polygon(100% 0, 45% 0, 0 50%, 45% 100%, 100% 100%)',
                    }}
                  >
                    <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] sm:text-[10px] font-mono font-black tracking-[0.25em] text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] select-none">
                      CLICK HERE
                    </span>
                  </div>
                </div>

                {/* Translucent White Sweep Wipe from Right to Left when clicked */}
                {animatingDomain === 'pm' && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-white/75 backdrop-blur-md z-40 origin-right"
                  />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-500/20 group-hover:text-amber-400 transition-all">
                    <Briefcase className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1 group-hover:text-amber-400 transition-colors font-display">
                    {DOMAINS[3].title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm font-normal">
                    {DOMAINS[3].subline}
                  </p>
                </div>

                {/* Skill Icons Preview (up to 6) */}
                <div className="relative z-10 pt-4 flex flex-wrap items-center gap-2">
                  {DOMAINS[3].skills.slice(0, 6).map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        title={skill.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 shadow-sm"
                      >
                        <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${skill.color}`} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ============================================================
               COMBINED SPOTLIGHT STATE: Occupies EXACT same outer width & height
               ============================================================ */
            <motion.div
              key="combined-view"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full h-full rounded-3xl bg-[#0D0B14]/95 border border-zinc-700/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] p-6 sm:p-8 md:p-9 flex flex-col justify-between backdrop-blur-2xl"
            >
              {/* Top Navigation Strip */}
              <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {DOMAINS.map((domain) => {
                    const Icon = domain.icon;
                    const isCurrent = domain.key === activeKey;

                    return (
                      <button
                        key={domain.key}
                        onClick={() => handleDomainSelect(domain.key)}
                        className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                          isCurrent
                            ? 'bg-white text-black shadow-lg scale-105'
                            : 'bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700'
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
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-300 hover:text-white bg-zinc-800/90 hover:bg-red-500/20 border border-zinc-700 hover:border-red-500/40 transition-all px-3 py-1.5 rounded-full cursor-pointer shadow-sm"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close Spotlight</span>
                </button>
              </div>

              {/* Combined Body: Active Domain on Left Anchor, Interactive Skill Logos on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center flex-grow py-2">
                {/* Left Column: Domain Spotlight (Col span 4) */}
                <div className="lg:col-span-4 flex flex-col justify-center space-y-4 pr-0 lg:pr-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold text-white mb-2.5 border border-white/20">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                      <span>{activeData.roleTitle}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-1.5 font-display">
                      {activeData.title}
                    </h3>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">
                      {activeData.subline}
                    </div>

                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {activeData.description}
                    </p>
                  </div>
                </div>

                {/* Right Column: Interactive Skill Logos with Names Below (Col span 8) */}
                <div className="lg:col-span-8 flex flex-col justify-center">
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 flex items-center justify-between font-mono">
                    <span>Mastered Skill Technologies</span>
                    <span className="text-zinc-500 text-[11px]">Hover or tap icons</span>
                  </div>

                  {/* Grid of Interactive Skill Tiles (Logo on top, Name below) */}
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
                          className="group relative p-3.5 sm:p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-500 hover:shadow-xl transition-all duration-200 flex flex-col items-center text-center justify-center cursor-pointer"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${skill.bgGlow} to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none`} />

                          {/* Skill Logo / Icon */}
                          <div className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black border border-zinc-800 flex items-center justify-center mb-2 group-hover:scale-110 shadow-sm transition-transform duration-200">
                            <Icon className={`w-5 h-5 ${skill.color}`} />
                          </div>

                          {/* Skill Name Below */}
                          <div className="relative z-10 font-bold text-xs text-white group-hover:text-yellow-400 transition-colors leading-tight">
                            {skill.name}
                          </div>

                          {/* Category Tag */}
                          <div className="relative z-10 text-[9px] font-mono text-zinc-500 mt-1 uppercase tracking-wider">
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
