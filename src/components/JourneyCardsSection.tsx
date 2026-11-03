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
      className="relative w-full min-h-screen py-8 sm:py-12 md:py-14 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#F8FAFC] dark:bg-[#09080F] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-hidden flex flex-col justify-center items-center"
    >

      {/* Background Soft Ambient Light Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#FFEE00]/15 dark:bg-[#FFEE00]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-full my-auto flex flex-col items-center">
        {/* SECTION HEADER */}
        <div className="w-full max-w-[1180px] mx-auto text-center mb-5 sm:mb-6">


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

                    {/* 3x3 Grid Layout of Phases & Center Character */}
                    <div className="relative z-10 w-full h-full grid grid-cols-3 grid-rows-3">

                      {/* Phase 1 */}
                      <div
                        onClick={() => handleSelectPhase(0)}
                        className="relative w-full h-full flex flex-col justify-start items-start p-4 sm:p-6 md:p-7 rounded-tl-[27px] sm:rounded-tl-[35px] group cursor-pointer hover:bg-[#FFEE00]/15 dark:hover:bg-[#FFEE00]/10 transition-colors duration-200"
                      >
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-yellow-600 dark:group-hover:text-[#FFEE00] transition-colors">
                          Phase 1
                        </span>
                        <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                          {JOURNEY_PHASES_DATA[0].category}
                        </span>
                      </div>

                      {/* Phase 2 */}
                      <div
                        onClick={() => handleSelectPhase(1)}
                        className="relative w-full h-full flex flex-col justify-start items-start p-4 sm:p-6 md:p-7 group cursor-pointer hover:bg-[#FFEE00]/15 dark:hover:bg-[#FFEE00]/10 transition-colors duration-200"
                      >
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-yellow-600 dark:group-hover:text-[#FFEE00] transition-colors">
                          Phase 2
                        </span>
                        <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                          {JOURNEY_PHASES_DATA[1].category}
                        </span>
                      </div>

                      {/* Phase 3 */}
                      <div
                        onClick={() => handleSelectPhase(2)}
                        className="relative w-full h-full flex flex-col justify-start items-start p-4 sm:p-6 md:p-7 rounded-tr-[27px] sm:rounded-tr-[35px] group cursor-pointer hover:bg-[#FFEE00]/15 dark:hover:bg-[#FFEE00]/10 transition-colors duration-200"
                      >
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-yellow-600 dark:group-hover:text-[#FFEE00] transition-colors">
                          Phase 3
                        </span>
                        <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                          {JOURNEY_PHASES_DATA[2].category}
                        </span>
                      </div>

                      {/* Phase 8 */}
                      <div
                        onClick={() => handleSelectPhase(7)}
                        className="relative w-full h-full flex flex-col justify-center items-start p-4 sm:p-6 md:p-7 group cursor-pointer hover:bg-[#FFEE00]/15 dark:hover:bg-[#FFEE00]/10 transition-colors duration-200"
                      >
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-yellow-600 dark:group-hover:text-[#FFEE00] transition-colors">
                          Phase 8
                        </span>
                        <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                          {JOURNEY_PHASES_DATA[7].category}
                        </span>
                      </div>

                      {/* CENTER PEEKING CHARACTER WITH ROLLING EYES */}
                      <div className="relative flex items-end justify-center overflow-visible w-full h-full">
                        <PeekingCharacter mouseX={mouseX} mouseY={mouseY} />
                      </div>

                      {/* Phase 4 */}
                      <div
                        onClick={() => handleSelectPhase(3)}
                        className="relative w-full h-full flex flex-col justify-center items-start p-4 sm:p-6 md:p-7 group cursor-pointer hover:bg-[#FFEE00]/15 dark:hover:bg-[#FFEE00]/10 transition-colors duration-200"
                      >
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-yellow-600 dark:group-hover:text-[#FFEE00] transition-colors">
                          Phase 4
                        </span>
                        <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                          {JOURNEY_PHASES_DATA[3].category}
                        </span>
                      </div>

                      {/* Phase 7 */}
                      <div
                        onClick={() => handleSelectPhase(6)}
                        className="relative w-full h-full flex flex-col justify-end items-start p-4 sm:p-6 md:p-7 rounded-bl-[27px] sm:rounded-bl-[35px] group cursor-pointer hover:bg-[#FFEE00]/15 dark:hover:bg-[#FFEE00]/10 transition-colors duration-200"
                      >
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-yellow-600 dark:group-hover:text-[#FFEE00] transition-colors">
                          Phase 7
                        </span>
                        <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                          {JOURNEY_PHASES_DATA[6].category}
                        </span>
                      </div>

                      {/* Phase 6 */}
                      <div
                        onClick={() => handleSelectPhase(5)}
                        className="relative w-full h-full flex flex-col justify-end items-start p-4 sm:p-6 md:p-7 group cursor-pointer hover:bg-[#FFEE00]/15 dark:hover:bg-[#FFEE00]/10 transition-colors duration-200"
                      >
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-yellow-600 dark:group-hover:text-[#FFEE00] transition-colors">
                          Phase 6
                        </span>
                        <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                          {JOURNEY_PHASES_DATA[5].category}
                        </span>
                      </div>

                      {/* Phase 5 */}
                      <div
                        onClick={() => handleSelectPhase(4)}
                        className="relative w-full h-full flex flex-col justify-end items-start p-4 sm:p-6 md:p-7 rounded-br-[27px] sm:rounded-br-[35px] group cursor-pointer hover:bg-[#FFEE00]/15 dark:hover:bg-[#FFEE00]/10 transition-colors duration-200"
                      >
                        <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-yellow-600 dark:group-hover:text-[#FFEE00] transition-colors">
                          Phase 5
                        </span>
                        <span className="text-[11px] sm:text-xs text-zinc-500 font-medium line-clamp-1 mt-0.5">
                          {JOURNEY_PHASES_DATA[4].category}
                        </span>
                      </div>

                    </div>
                  </motion.div>
                </div>

                {/* Click to inspect hint */}
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-5 flex items-center gap-1.5 select-none">

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
                className="relative w-full max-w-[1140px] flex flex-col bg-white dark:bg-[#13111C] rounded-[26px] sm:rounded-[34px] p-4 sm:p-6 md:p-7 lg:p-8 border border-zinc-200/90 dark:border-zinc-800 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
              >
                {/* Soft Ambient Radial Glow */}
                <div
                  className="absolute -top-32 -right-32 w-[440px] h-[440px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[#FFEE00]"
                />

                {/* Top Action Bar: Back to Map Button & Stepper */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 sm:pb-3.5 border-b border-zinc-100 dark:border-zinc-800">
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
                          ? 'bg-[#FFEE00] text-black font-black shadow-sm'
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start mt-3.5 sm:mt-4.5 w-full">

                  {/* LEFT SIDE: Category, Step, Big Headline, Description, Tags */}
                  <div className="lg:col-span-7 flex flex-col justify-center space-y-2 sm:space-y-3">

                    {/* Step Badge & Category */}
                    <div className="flex items-center gap-3">
                      <span className="px-3.5 py-1 rounded-full bg-[#FFEE00] text-black font-mono font-black text-xs uppercase tracking-wider shadow-xs">
                        PHASE {JOURNEY_PHASES_DATA[activePhaseIndex].step}
                      </span>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-yellow-600 dark:text-[#FFEE00]">
                        {JOURNEY_PHASES_DATA[activePhaseIndex].category}
                      </span>
                      {JOURNEY_PHASES_DATA[activePhaseIndex].isLive && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFEE00] animate-pulse" />
                          LIVE
                        </span>
                      )}
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl sm:text-2xl lg:text-[28px] font-black text-zinc-950 dark:text-white tracking-tight leading-snug">
                      {JOURNEY_PHASES_DATA[activePhaseIndex].headline}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base lg:text-[17px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                      {JOURNEY_PHASES_DATA[activePhaseIndex].description}
                    </p>




                  </div>

                  {/* RIGHT SIDE: Floating Glassmorphic "Knowledge Added" Box */}
                  <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full max-w-[380px] bg-white dark:bg-zinc-900 rounded-[20px] p-3.5 sm:p-4.5 shadow-md border border-zinc-200/90 dark:border-zinc-800"
                    >
                      {/* Box Title */}
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="w-3 h-3 rounded-full bg-[#FFEE00] animate-pulse shadow-[0_0_8px_rgba(255,238,0,0.6)]" />
                        <h4 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">
                          Knowledge Added
                        </h4>
                      </div>

                      {/* Bullet Points with Checkmarks */}
                      <ul className="space-y-2 sm:space-y-2.5">
                        {JOURNEY_PHASES_DATA[activePhaseIndex].knowledgeAdded.map((item, kIdx) => (
                          <li key={kIdx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                            <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 bg-[#FFEE00]/25 text-yellow-600 dark:text-[#FFEE00]">
                              <CheckCircle2 className="w-4 h-4 fill-current" />
                            </div>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Progress Indicator */}
                      <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[10.5px] font-mono text-zinc-500 dark:text-zinc-400 font-bold">
                        <span>PHASE {JOURNEY_PHASES_DATA[activePhaseIndex].step} OF 08</span>
                        <span className="text-yellow-600 dark:text-[#FFEE00] font-bold">COMPLETE</span>
                      </div>
                    </motion.div>
                  </div>

                </div>

                {/* Bottom Full-Width Skills & Competencies Across Full Card */}
                <div className="w-full mt-3.5 sm:mt-4.5 pt-3 sm:pt-3.5 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Skills & Competencies Applied
                    </span>
                    <span className="text-[11px] font-mono font-bold text-yellow-600 dark:text-[#FFEE00]">
                      {JOURNEY_PHASES_DATA[activePhaseIndex].tags.length} Key Skills
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 w-full">
                    {JOURNEY_PHASES_DATA[activePhaseIndex].tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="py-2 px-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 text-xs font-semibold border border-zinc-200/80 dark:border-zinc-700/60 shadow-2xs hover:border-[#FFEE00] hover:bg-[#FFEE00]/10 dark:hover:bg-[#FFEE00]/10 transition-all text-center flex items-center justify-center truncate"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

    </section>
  );
};

export default JourneyCardsSection;
