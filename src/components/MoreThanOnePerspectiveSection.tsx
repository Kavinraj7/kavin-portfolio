'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Layers, Sparkles, Code2, BarChart3, Users, ShieldCheck } from 'lucide-react';

interface MoreThanOnePerspectiveSectionProps {
  onExploreJourney?: () => void;
}

interface PerspectiveCardData {
  id: string;
  row: 'top' | 'bottom';
  position: 'left' | 'right';
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  icon: React.ElementType;
}

const PERSPECTIVES: PerspectiveCardData[] = [
  // Top Row
  {
    id: 'software',
    row: 'top',
    position: 'left',
    title: 'SOFTWARE ENGINEERING',
    subtitle: 'Full-Stack & Cloud Architecture',
    description: 'ARCHITECTING END-TO-END DIGITAL PLATFORMS, DISTRIBUTED APIS, MODERN REACT INTERFACES, AND RESILIENT CLOUD INFRASTRUCTURE.',
    tag: 'Engineering',
    icon: Code2,
  },
  {
    id: 'analytics',
    row: 'top',
    position: 'right',
    title: 'DATA & ANALYTICS',
    subtitle: 'Data Intelligence & Modeling',
    description: 'TURNING COMPLEX TELEMETRY AND DATASETS INTO COHORT MODELS, AUTOMATED PIPELINES, AND CLEAR STRATEGIC REPORTING.',
    tag: 'Intelligence',
    icon: BarChart3,
  },

  // Bottom Row
  {
    id: 'pm',
    row: 'bottom',
    position: 'left',
    title: 'PROJECT MANAGEMENT',
    subtitle: 'Agile Delivery & Governance',
    description: 'CONNECTING BUSINESS PREREQUISITES, CROSS-TEAM ROADMAPS, RISK MITIGATION, AND SPRINT VELOCITY FROM SPEC TO PRODUCTION.',
    tag: 'Delivery',
    icon: Users,
  },
  {
    id: 'people',
    row: 'bottom',
    position: 'right',
    title: 'PEOPLE & OPERATIONS',
    subtitle: 'Culture & Talent Systems',
    description: 'CULTIVATING PSYCHOLOGICAL SAFETY, STRUCTURED TALENT SCREENING, HIGH-TRUST FEEDBACK, AND NURTURING TEAM COLLABORATION.',
    tag: 'Operations',
    icon: ShieldCheck,
  },
];

export const MoreThanOnePerspectiveSection: React.FC<MoreThanOnePerspectiveSectionProps> = ({
  onExploreJourney,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Enhanced smooth scroll-driven horizontal parallax as section scrolls naturally through view
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Increased gliding motion for a more dynamic and engaging scroll feel
  const topRowX = useTransform(smoothProgress, [0, 0.5, 1], [80, 0, -80]);
  const bottomRowX = useTransform(smoothProgress, [0, 0.5, 1], [-80, 0, 80]);

  return (
    <section
      ref={containerRef}
      id="more-than-one-perspective"
      className="relative w-full min-h-screen py-12 sm:py-16 px-4 sm:px-6 md:px-8 bg-white text-black select-none border-t border-b border-zinc-200 flex flex-col items-center justify-center gap-6 sm:gap-7 md:gap-8 overflow-hidden"
    >
      {/* Ambient Subtle Warm Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-yellow-300/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* ── Top Header ── */}
      <div className="relative z-20 flex flex-col items-center text-center shrink-0 max-w-2xl xl:max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black uppercase tracking-tight text-black font-display leading-tight">
          MORE THAN ONE PERSPECTIVE
        </h2>

        <p className="text-xs sm:text-[13px] xl:text-base text-zinc-600 font-semibold mt-1 max-w-lg xl:max-w-xl leading-relaxed">
          Different disciplines. One journey — shaped by building, leading, analyzing, and learning.
        </p>
      </div>

      {/* ── Interactive 4-Card Stage with Center Circle Hub ── */}
      <div className="relative w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col items-center justify-center">

        {/* Central Circular Hub (Placed at center intersection with equal overlap) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40 rounded-full bg-white text-black flex items-center justify-center shadow-[0_6px_25px_rgba(0,0,0,0.12)] border-2 sm:border-4 border-black cursor-pointer group"
          >
            {/* Rotating SVG Perimeter Text */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_24s_linear_infinite]" viewBox="0 0 140 140">
              <path
                id="perspectivePath"
                d="M 70, 70 m -54, 0 a 54,54 0 1,1 108,0 a 54,54 0 1,1 -108,0"
                fill="none"
              />
              <text className="text-[6.8px] font-mono font-bold tracking-[0.16em] uppercase fill-black">
                <textPath href="#perspectivePath" startOffset="0%">
                  • Developer • Project Manager • HR • Analyst • Developer • Project Manager • HR • Analyst
                </textPath>
              </text>
            </svg>

            {/* Center Core Badge */}
            <div className="text-center z-10 flex flex-col items-center justify-center select-none px-2">
              <span className="font-mono font-black text-[7.5px] sm:text-xs xl:text-sm tracking-wider uppercase text-black group-hover:text-yellow-600 transition-colors">
                PERSPECTIVES
              </span>
            </div>
          </motion.div>
        </div>

        {/* 2-Row Horizontal Stage with Uniform Horizontal & Vertical Spacing */}
        <div className="w-full flex flex-col gap-4 sm:gap-6 md:gap-8 xl:gap-10 2xl:gap-12 items-center justify-center">

          {/* ── TOP ROW: (Software Engineering & Data Analytics) ── */}
          <motion.div
            style={{ x: topRowX }}
            className="flex flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 xl:gap-10 2xl:gap-12 w-full"
          >
            {PERSPECTIVES.filter((p) => p.row === 'top').map((card) => {
              const Icon = card.icon;
              const isHovered = hoveredCardId === card.id;

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className={`relative w-[calc(50%-8px)] sm:w-[285px] md:w-[330px] lg:w-[375px] xl:w-[425px] 2xl:w-[465px] min-h-[142px] sm:min-h-[154px] md:min-h-[165px] lg:min-h-[175px] xl:min-h-[182px] 2xl:min-h-[192px] p-2.5 sm:p-4 lg:p-4.5 xl:p-5 2xl:p-5.5 rounded-2xl sm:rounded-3xl bg-white border-2 transition-all duration-300 flex flex-col justify-start group cursor-pointer ${isHovered
                    ? 'border-yellow-400 shadow-[0_12px_28px_rgba(0,0,0,0.08)] scale-[1.02] z-30'
                    : 'border-black shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-yellow-400 z-10'
                    }`}
                >
                  {/* Title Header with Icon */}
                  <div className="flex items-start justify-between gap-1.5 sm:gap-2 mb-1">
                    <h3 className="text-[11px] sm:text-sm lg:text-base xl:text-lg font-black uppercase tracking-tight text-black font-display group-hover:text-yellow-600 transition-colors leading-tight">
                      {card.title}
                    </h3>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-md sm:rounded-lg bg-yellow-400 border border-black flex items-center justify-center text-black shrink-0 group-hover:rotate-12 transition-all shadow-xs">
                      <Icon className="w-3 sm:w-3.5 xl:w-4 h-3 sm:h-3.5 xl:h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Subline / Category */}
                  <p className="text-[8px] sm:text-[9px] lg:text-[10px] xl:text-xs font-mono font-bold uppercase tracking-wider text-yellow-600 mb-1.5 sm:mb-2">
                    {card.subtitle}
                  </p>

                  {/* Description Text */}
                  <p className="text-[9.5px] sm:text-[10.5px] md:text-[11px] lg:text-[12px] xl:text-[12.5px] 2xl:text-[13.5px] text-zinc-800 font-semibold leading-normal sm:leading-relaxed uppercase tracking-wide">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* ── BOTTOM ROW: (Project Management & People Operations) ── */}
          <motion.div
            style={{ x: bottomRowX }}
            className="flex flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 xl:gap-10 2xl:gap-12 w-full"
          >
            {PERSPECTIVES.filter((p) => p.row === 'bottom').map((card) => {
              const Icon = card.icon;
              const isHovered = hoveredCardId === card.id;

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className={`relative w-[calc(50%-8px)] sm:w-[285px] md:w-[330px] lg:w-[375px] xl:w-[425px] 2xl:w-[465px] min-h-[142px] sm:min-h-[154px] md:min-h-[165px] lg:min-h-[175px] xl:min-h-[182px] 2xl:min-h-[192px] p-2.5 sm:p-4 lg:p-4.5 xl:p-5 2xl:p-5.5 rounded-2xl sm:rounded-3xl bg-white border-2 transition-all duration-300 flex flex-col justify-start group cursor-pointer ${isHovered
                    ? 'border-yellow-400 shadow-[0_12px_28px_rgba(0,0,0,0.08)] scale-[1.02] z-30'
                    : 'border-black shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-yellow-400 z-10'
                    }`}
                >
                  {/* Title Header with Icon */}
                  <div className="flex items-start justify-between gap-1.5 sm:gap-2 mb-1">
                    <h3 className="text-[11px] sm:text-sm lg:text-base xl:text-lg font-black uppercase tracking-tight text-black font-display group-hover:text-yellow-600 transition-colors leading-tight">
                      {card.title}
                    </h3>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-md sm:rounded-lg bg-yellow-400 border border-black flex items-center justify-center text-black shrink-0 group-hover:rotate-12 transition-all shadow-xs">
                      <Icon className="w-3 sm:w-3.5 xl:w-4 h-3 sm:h-3.5 xl:h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Subline / Category */}
                  <p className="text-[8px] sm:text-[9px] lg:text-[10px] xl:text-xs font-mono font-bold uppercase tracking-wider text-yellow-600 mb-1.5 sm:mb-2">
                    {card.subtitle}
                  </p>

                  {/* Description Text */}
                  <p className="text-[9.5px] sm:text-[10.5px] md:text-[11px] lg:text-[12px] xl:text-[12.5px] 2xl:text-[13.5px] text-zinc-800 font-semibold leading-normal sm:leading-relaxed uppercase tracking-wide">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>

      {/* ── Bottom Interactive Trigger ── */}
      <div className="relative z-20 flex items-center justify-center shrink-0">
        {onExploreJourney && (
          <button
            onClick={onExploreJourney}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black border-2 border-black text-xs sm:text-sm font-black tracking-wide transition-all shadow-sm hover:shadow-lg cursor-pointer active:scale-95 group"
          >
            <Layers className="w-3.5 h-3.5 text-yellow-400 group-hover:text-black transition-colors" />
            <span>Know About Me</span>
            <ArrowRight className="w-3.5 h-3.5 text-yellow-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
          </button>
        )}
      </div>
    </section>
  );
};

export default MoreThanOnePerspectiveSection;
