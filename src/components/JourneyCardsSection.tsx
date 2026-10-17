'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  Brain,
  Users,
  Code2,
  BarChart3,
  Cloud,
  Cpu,
  Compass,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  MapPin,
  Flame,
  Rocket,
  ChartNoAxesCombined
} from 'lucide-react';
import { soundFx } from '@/utils/audio';

export interface JourneyPhaseItem {
  id: string;
  phaseNumber: number;
  step: string;
  category: string;
  headline: string;
  description: string;
  tags: string[];
  knowledgeAdded: string[];
  annotation: string;
  accentColor: string;
  isLive?: boolean;
  icon: React.ElementType;
}

export const JOURNEY_PHASES_DATA: JourneyPhaseItem[] = [
  {
    id: 'phase-1',
    phaseNumber: 1,
    step: '01',
    category: 'CAREER REALIZATION',
    headline: 'Discovering where my strengths naturally belonged.',
    description: 'From school activities to college club leadership, I discovered my strengths in communication, coordination, and management — making project management a natural career direction.',
    tags: ['Communication', 'Leadership', 'Planning', 'Coordination', 'Event Management'],
    knowledgeAdded: [
      'Communication & People Management',
      'Team Coordination & Leadership',
      'Planning & Organizing Activities',
      'Recognizing My Career Direction'
    ],
    annotation: 'The foundation of my management journey.',
    accentColor: '#10B981',
    icon: Brain,
  },
  {
    id: 'phase-2',
    phaseNumber: 2,
    step: '02',
    category: 'TECHNICAL AWARENESS',
    headline: 'Realizing that management needs technical depth.',
    description: 'Through research and a project management internship, I explored how companies plan, track, and execute projects using structured workflows and Jira — realizing I needed technical knowledge to manage technology teams effectively.',
    tags: ['Jira', 'Project Workflows', 'SDLC', 'Research', 'Planning'],
    knowledgeAdded: [
      'Project Lifecycle & Execution',
      'Jira & Workflow Tracking',
      'Planning & Progress Monitoring',
      'Technical Knowledge for Managers'
    ],
    annotation: 'Understanding the process behind successful projects.',
    accentColor: '#6366F1',
    icon: Compass,
  },
  {
    id: 'phase-3',
    phaseNumber: 3,
    step: '03',
    category: 'DATA & AI EXPLORATION',
    headline: 'Taking my first steps into the technical world.',
    description: 'With coding completely new to me, I started with data analytics and AI/ML, learning Python through data-driven projects while exploring Java fundamentals alongside — building my confidence in programming and logical thinking.',
    tags: ['Python', 'SQL', 'Power BI', 'Machine Learning', 'Java Basics'],
    knowledgeAdded: [
      'Python Programming Fundamentals',
      'Data Analysis & Visualization',
      'Machine Learning Fundamentals',
      'Logical Thinking & Problem Solving'
    ],
    annotation: 'My first step into programming and intelligent systems.',
    accentColor: '#8B5CF6',
    icon: ChartNoAxesCombined,
  },
  {
    id: 'phase-4',
    phaseNumber: 4,
    step: '04',
    category: 'FULL-STACK FOUNDATIONS',
    headline: 'Learning how complete applications come together.',
    description: 'Building on my programming fundamentals, I began learning Java full-stack development, exploring frontend interfaces, backend logic, databases, and how these components communicate to create complete applications.',
    tags: ['Java', 'React', 'JavaScript', 'MySQL', 'Spring Boot'],
    knowledgeAdded: [
      'Frontend & Backend Fundamentals',
      'Database Connectivity & SQL',
      'Application Architecture',
      'Full-Stack Integration'
    ],
    annotation: 'Connecting frontend, backend, and databases.',
    accentColor: '#3B82F6',
    icon: Code2,
  },
  {
    id: 'phase-5',
    phaseNumber: 5,
    step: '05',
    category: 'FULL-STACK & CLOUD',
    headline: 'Discovering what lies beyond basic full-stack development.',
    description: 'As application development became clearer, I pushed into advanced full-stack concepts, modern frameworks, APIs, and AWS — exploring how applications are deployed, connected, scaled, and supported by cloud infrastructure.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'AWS'],
    knowledgeAdded: [
      'Advanced Full-Stack Concepts',
      'API Design & Integration',
      'Cloud Infrastructure & Deployment',
      'Scalability & Distributed Systems'
    ],
    annotation: 'Building beyond applications into cloud infrastructure.',
    accentColor: '#06B6D4',
    icon: Cloud,
  },
  {
    id: 'phase-6',
    phaseNumber: 6,
    step: '06',
    category: 'REAL-WORLD ENGINEERING',
    headline: 'Turning technical knowledge into working solutions.',
    description: 'Joining Praskla Technology as an intern brought me into real projects built around business and client needs, exposing me to practical challenges involving scalability, concurrent users, performance, testing, and application reliability.',
    tags: ['Client Projects', 'Scalability', 'Testing', 'Performance', 'Debugging'],
    knowledgeAdded: [
      'Real-World Application Development',
      'Scalability & Concurrent Users',
      'Testing & Application Reliability',
      'Client Requirements & Delivery'
    ],
    annotation: 'Turning technical concepts into reliable solutions.',
    accentColor: '#F59E0B',
    icon: Rocket,
  },
  {
    id: 'phase-7',
    phaseNumber: 7,
    step: '07',
    category: 'PROJECTS & PEOPLE',
    headline: 'Taking ownership of projects, people, and delivery.',
    description: 'After being promoted to Project Manager at Praskla Technology, I successfully managed projects while handling client coordination and workflows; my startup experience also opened doors to HR, where I contributed to candidate screening and student communication.',
    tags: ['Project Management', 'Client Management', 'Jira', 'Recruitment', 'HR Operations'],
    knowledgeAdded: [
      'Project Planning & Successful Delivery',
      'Client & Team Management',
      'Candidate Screening & Hiring',
      'People Operations & Coordination'
    ],
    annotation: 'Bringing projects, clients, and people together.',
    accentColor: '#EC4899',
    icon: Users,
  },
  {
    id: 'phase-8',
    phaseNumber: 8,
    step: '08',
    category: 'CONTINUOUS EVOLUTION',
    headline: 'Looking beyond what I know to discover what comes next.',
    description: 'Having explored technology, data, AI, project management, and HR, I want to challenge myself in new environments, build meaningful connections, take on tougher responsibilities, and grow alongside an organization’s ambitions.',
    tags: ['Continuous Learning', 'New Challenges', 'Networking', 'Adaptability', 'Growth'],
    knowledgeAdded: [
      'Exploring New Technical Challenges',
      'Building Professional Connections',
      'Cross-Functional Problem Solving',
      'Growing Alongside an Organization'
    ],
    annotation: 'The next chapter begins beyond my comfort zone.',
    accentColor: '#F97316',
    icon: Sparkles,
  },
];

// ─── Peeking Character Image (peak.png) with Interactive Rolling Eyes ──────────
const PeekingCharacter: React.FC<{
  mouseX: any;
  mouseY: any;
}> = ({ mouseX, mouseY }) => {
  const pupilX = useTransform(mouseX, [-450, 450], [-2.5, 2.5]);
  const pupilY = useTransform(mouseY, [-350, 350], [-2.5, 2.5]);
  const smoothPupilX = useSpring(pupilX, { stiffness: 500, damping: 30 });
  const smoothPupilY = useSpring(pupilY, { stiffness: 500, damping: 30 });

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className="relative flex items-end justify-center w-full h-full pb-0 cursor-pointer select-none overflow-visible"
    >
      <div className="relative w-full flex items-end justify-center">
        {/* Scaled Aspect-Ratio Wrapper containing image + pupil overlays */}
        <div className="relative w-full aspect-[1024/525] flex items-end justify-center scale-125 sm:scale-135 md:scale-145 origin-bottom">
          <Image
            src="/peak.png"
            alt="Peeking Character"
            width={1024}
            height={525}
            className="w-full h-auto object-contain object-bottom select-none pointer-events-none drop-shadow-sm"
            priority
          />

          {/* Left Eye Socket & Interactive Pupil */}
          <div
            className="absolute rounded-full pointer-events-none overflow-hidden flex items-center justify-center"
            style={{
              left: '46.70%',
              top: '79.33%',
              width: '4.37%',
              height: '8.00%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#FAF8F5',
              border: '1.2px solid #27272A',
            }}
          >
            <motion.div
              style={{
                x: smoothPupilX,
                y: smoothPupilY,
              }}
              className="relative w-[55%] h-[55%] rounded-full bg-[#18181B] flex items-start justify-start p-[12%]"
            >
              <div className="w-[35%] h-[35%] rounded-full bg-white" />
            </motion.div>
          </div>

          {/* Right Eye Socket & Interactive Pupil */}
          <div
            className="absolute rounded-full pointer-events-none overflow-hidden flex items-center justify-center"
            style={{
              left: '52.70%',
              top: '79.33%',
              width: '4.37%',
              height: '8.00%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#FAF8F5',
              border: '1.2px solid #27272A',
            }}
          >
            <motion.div
              style={{
                x: smoothPupilX,
                y: smoothPupilY,
              }}
              className="relative w-[55%] h-[55%] rounded-full bg-[#18181B] flex items-start justify-start p-[12%]"
            >
              <div className="w-[35%] h-[35%] rounded-full bg-white" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const JourneyCardsSection: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Parallax Tilt Physics on the Map Container (Instant, zero-lag responsive physics)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-240, 240], [12, -12]);
  const rotateY = useTransform(mouseX, [-380, 380], [-12, 12]);

  const springRotateX = useSpring(rotateX, { stiffness: 450, damping: 32, mass: 0.1 });
  const springRotateY = useSpring(rotateY, { stiffness: 450, damping: 32, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSelectPhase = (index: number) => {
    try {
      soundFx.playSelect();
    } catch { }
    setActivePhaseIndex(index);
  };

  const handleNextPhase = () => {
    if (activePhaseIndex === null) return;
    const next = (activePhaseIndex + 1) % JOURNEY_PHASES_DATA.length;
    try {
      soundFx.playSelect();
    } catch { }
    setActivePhaseIndex(next);
  };

  const handlePrevPhase = () => {
    if (activePhaseIndex === null) return;
    const prev = (activePhaseIndex - 1 + JOURNEY_PHASES_DATA.length) % JOURNEY_PHASES_DATA.length;
    try {
      soundFx.playSelect();
    } catch { }
    setActivePhaseIndex(prev);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhaseIndex === null) return;
      if (e.key === 'Escape') setActivePhaseIndex(null);
      if (e.key === 'ArrowRight') handleNextPhase();
      if (e.key === 'ArrowLeft') handlePrevPhase();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhaseIndex]);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#F8FAFC] dark:bg-[#09080F] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-hidden"
    >

      {/* Background Soft Ambient Light Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-100/35 dark:bg-emerald-950/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* SECTION HEADER */}
      <div className="w-full max-w-[1180px] mx-auto text-center mb-10 sm:mb-14">


        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight max-w-3xl mx-auto font-display"
        >
          EIGHT PHASES. ONE JOURNEY.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Discover how management, technology, data, and real-world challenges shaped the person behind the portfolio.        </motion.p>
      </div>

      {/* ─── MAIN DYNAMIC CONTAINER: MAP VIEW OR EXPANDED PHASE CARD ─── */}
      <div className="w-full max-w-[1180px] mx-auto flex flex-col items-center justify-center min-h-[520px]">
        <AnimatePresence mode="wait">

          {/* ============================================================ */}
          {/* VIEW A: 3x3 PHASES MAP CARD (Smooth 3D Spring Tilt Physics)  */}
          {/* ============================================================ */}
          {activePhaseIndex === null ? (
            <motion.div
              key="phases-map-view"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[880px] flex flex-col items-center"
            >
              <div
                ref={containerRef}
                style={{ perspective: 1200 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full cursor-pointer select-none"
              >
                <motion.div
                  style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[580px] bg-white dark:bg-zinc-900/90 rounded-[28px] sm:rounded-[36px] border border-zinc-200/90 dark:border-zinc-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] overflow-hidden transition-colors duration-200"
                >
                  {/* Background Grid Lines Pattern */}
                  <div className="absolute inset-0 pointer-events-none opacity-40">
                    <svg width="100%" height="100%" className="absolute inset-0">
                      <defs>
                        <pattern id="journey-map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-zinc-200 dark:text-zinc-800" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#journey-map-grid)" />
                    </svg>
                  </div>

                  {/* Main Road Crossings (3x3 Grid Highways) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    {/* Horizontal Main Road 1 */}
                    <line x1="0%" y1="33.33%" x2="100%" y2="33.33%" stroke="#E4E4E7" strokeWidth="5" />
                    {/* Horizontal Main Road 2 */}
                    <line x1="0%" y1="66.66%" x2="100%" y2="66.66%" stroke="#E4E4E7" strokeWidth="5" />

                    {/* Vertical Main Road 1 */}
                    <line x1="33.33%" y1="0%" x2="33.33%" y2="100%" stroke="#E4E4E7" strokeWidth="5" />
                    {/* Vertical Main Road 2 */}
                    <line x1="66.66%" y1="0%" x2="66.66%" y2="100%" stroke="#E4E4E7" strokeWidth="5" />
                  </svg>

                  {/* Translucent Building Blocks */}
                  {/* Phase 2 building block */}
                  <div className="absolute top-[16%] left-[37%] w-[12%] h-[14%] rounded-xl bg-zinc-300/40 dark:bg-zinc-700/30 border border-zinc-300/60 dark:border-zinc-700/50 pointer-events-none" />
                  {/* Phase 3 & 4 vertical building pill */}
                  <div className="absolute top-[20%] right-[11%] w-[9%] h-[24%] rounded-2xl bg-zinc-300/40 dark:bg-zinc-700/30 border border-zinc-300/60 dark:border-zinc-700/50 pointer-events-none" />
                  {/* Phase 8 overlapping building block */}
                  <div className="absolute top-[38%] left-[12%] w-[13%] h-[18%] rounded-xl bg-zinc-300/40 dark:bg-zinc-700/30 border border-zinc-300/60 dark:border-zinc-700/50 pointer-events-none" />
                  <div className="absolute top-[52%] left-[8%] w-[7%] h-[12%] rounded-lg bg-zinc-300/35 dark:bg-zinc-700/25 border border-zinc-300/50 pointer-events-none" />
                  {/* Phase 5 building block */}
                  <div className="absolute bottom-[16%] right-[10%] w-[15%] h-[16%] rounded-2xl bg-zinc-300/40 dark:bg-zinc-700/30 border border-zinc-300/60 dark:border-zinc-700/50 pointer-events-none" />

                  {/* 3x3 Grid Layout of Phases & Center Character */}
                  <div className="relative z-10 w-full h-full grid grid-cols-3 grid-rows-3 p-4 sm:p-6 md:p-8">

                    {/* Phase 1 */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelectPhase(0)}
                      className="relative flex flex-col justify-start items-start p-3 sm:p-4 rounded-2xl group cursor-pointer hover:bg-emerald-500/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          Phase 1
                        </span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                        {JOURNEY_PHASES_DATA[0].category}
                      </span>
                    </motion.div>

                    {/* Phase 2 */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelectPhase(1)}
                      className="relative flex flex-col justify-start items-start p-3 sm:p-4 rounded-2xl group cursor-pointer hover:bg-emerald-500/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          Phase 2
                        </span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                        {JOURNEY_PHASES_DATA[1].category}
                      </span>
                    </motion.div>

                    {/* Phase 3 (with LIVE badge) */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelectPhase(2)}
                      className="relative flex flex-col justify-start items-start p-3 sm:p-4 rounded-2xl group cursor-pointer hover:bg-emerald-500/5 transition-colors"
                    >
                      <div className="w-full flex items-center justify-between">
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          Phase 3
                        </span>
                        {/* LIVE Status Badge */}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase">LIVE</span>
                        </div>
                      </div>
                      <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                        {JOURNEY_PHASES_DATA[2].category}
                      </span>
                    </motion.div>

                    {/* Phase 8 */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelectPhase(7)}
                      className="relative flex flex-col justify-center items-start p-3 sm:p-4 rounded-2xl group cursor-pointer hover:bg-emerald-500/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          Phase 8
                        </span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                        {JOURNEY_PHASES_DATA[7].category}
                      </span>
                    </motion.div>

                    {/* CENTER PEEKING CHARACTER WITH ROLLING EYES */}
                    <div className="relative flex items-end justify-center overflow-visible w-full h-full">
                      <PeekingCharacter mouseX={mouseX} mouseY={mouseY} />
                    </div>

                    {/* Phase 4 */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelectPhase(3)}
                      className="relative flex flex-col justify-center items-start p-3 sm:p-4 rounded-2xl group cursor-pointer hover:bg-emerald-500/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          Phase 4
                        </span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                        {JOURNEY_PHASES_DATA[3].category}
                      </span>
                    </motion.div>

                    {/* Phase 7 */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelectPhase(6)}
                      className="relative flex flex-col justify-end items-start p-3 sm:p-4 rounded-2xl group cursor-pointer hover:bg-emerald-500/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          Phase 7
                        </span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                        {JOURNEY_PHASES_DATA[6].category}
                      </span>
                    </motion.div>

                    {/* Phase 6 */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelectPhase(5)}
                      className="relative flex flex-col justify-end items-start p-3 sm:p-4 rounded-2xl group cursor-pointer hover:bg-emerald-500/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          Phase 6
                        </span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                        {JOURNEY_PHASES_DATA[5].category}
                      </span>
                    </motion.div>

                    {/* Phase 5 */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelectPhase(4)}
                      className="relative flex flex-col justify-end items-start p-3 sm:p-4 rounded-2xl group cursor-pointer hover:bg-emerald-500/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          Phase 5
                        </span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                        {JOURNEY_PHASES_DATA[4].category}
                      </span>
                    </motion.div>

                  </div>
                </motion.div>
              </div>

              {/* Click to inspect hint */}
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-5 flex items-center gap-1.5 select-none">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>Click any phase to explore that milestone</span>
              </p>
            </motion.div>
          ) : (

            /* ============================================================ */
            /* VIEW B: FULL IN-PLACE MILESTONE CARD (Matches prompt theme)  */
            /* ============================================================ */
            <motion.div
              key={`phase-card-${activePhaseIndex}`}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[1140px] flex flex-col bg-white dark:bg-[#13111C] rounded-[32px] sm:rounded-[44px] p-6 sm:p-10 md:p-12 lg:p-14 border border-zinc-200/90 dark:border-zinc-800 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
            >
              {/* Soft Ambient Radial Glow */}
              <div
                className="absolute -top-32 -right-32 w-[440px] h-[440px] rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: JOURNEY_PHASES_DATA[activePhaseIndex].accentColor }}
              />

              {/* Top Action Bar: Back to Map Button & Stepper */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                <button
                  onClick={() => {
                    try { soundFx.playSelect(); } catch { }
                    setActivePhaseIndex(null);
                  }}
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 transition-all cursor-pointer shadow-xs hover:-translate-x-0.5"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back to Journey Map</span>
                </button>

                {/* Phase Stepper Pills (Click any phase to jump) */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {JOURNEY_PHASES_DATA.map((p, pIdx) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPhase(pIdx)}
                      className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${pIdx === activePhaseIndex
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                        }`}
                    >
                      P{p.phaseNumber}
                    </button>
                  ))}
                </div>

                {/* Prev / Next Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevPhase}
                    aria-label="Previous Phase"
                    className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextPhase}
                    aria-label="Next Phase"
                    className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Content Grid: 2 Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8 w-full">

                {/* LEFT SIDE: Category, Step, Big Headline, Description, Tags */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6">

                  {/* Step Badge & Category */}
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs uppercase tracking-wider shadow-xs">
                      PHASE {JOURNEY_PHASES_DATA[activePhaseIndex].step}
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {JOURNEY_PHASES_DATA[activePhaseIndex].category}
                    </span>
                    {JOURNEY_PHASES_DATA[activePhaseIndex].isLive && (
                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </div>

                  {/* Headline */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
                    {JOURNEY_PHASES_DATA[activePhaseIndex].headline}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base lg:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                    {JOURNEY_PHASES_DATA[activePhaseIndex].description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {JOURNEY_PHASES_DATA[activePhaseIndex].tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold border border-zinc-200/80 dark:border-zinc-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Strategic Annotation */}
                  {JOURNEY_PHASES_DATA[activePhaseIndex].annotation && (
                    <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm font-mono flex items-start gap-2.5 mt-4">
                      <span className="text-emerald-600 font-bold">↳</span>
                      <span className="leading-relaxed font-medium">
                        {JOURNEY_PHASES_DATA[activePhaseIndex].annotation}
                      </span>
                    </div>
                  )}
                </div>

                {/* RIGHT SIDE: Floating Glassmorphic "Knowledge Added" Box */}
                <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-[380px] bg-white dark:bg-zinc-900 rounded-[28px] p-6 sm:p-7 shadow-lg border border-zinc-200/90 dark:border-zinc-800"
                  >
                    {/* Box Title */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-sm" />
                      <h4 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Knowledge Added
                      </h4>
                    </div>

                    {/* Bullet Points with Checkmarks */}
                    <ul className="space-y-3.5">
                      {JOURNEY_PHASES_DATA[activePhaseIndex].knowledgeAdded.map((item, kIdx) => (
                        <li key={kIdx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                          <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                            <CheckCircle2 className="w-4 h-4 fill-current" />
                          </div>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Progress Indicator */}
                    <div className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 font-bold">
                      <span>PHASE {JOURNEY_PHASES_DATA[activePhaseIndex].step} OF 08</span>
                      <span className="text-emerald-600 dark:text-emerald-400">COMPLETE</span>
                    </div>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </section>
  );
};

export default JourneyCardsSection;
