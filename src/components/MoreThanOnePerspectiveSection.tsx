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

  // Track scroll progress as this single viewport section scrolls through view
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth spring physics for fluid horizontal movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Horizontal parallax motion on scroll:
  // Top row glides right-to-left
  // Bottom row glides left-to-right
  // Center is perfectly balanced at 0.5 (when centered in viewport)
  const topRowX = useTransform(smoothProgress, [0, 0.5, 1], [100, 0, -100]);
  const bottomRowX = useTransform(smoothProgress, [0, 0.5, 1], [-100, 0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[640px] max-h-screen bg-white text-black select-none border-t border-b border-zinc-200 flex flex-col justify-between items-center py-5 sm:py-6 md:py-7 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Ambient Subtle Warm Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-yellow-300/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* ── Top Header ── */}
      <div className="relative z-20 flex flex-col items-center text-center shrink-0 max-w-2xl mx-auto pt-4 sm:pt-6 md:pt-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-black font-display leading-tight">
          MORE THAN ONE PERSPECTIVE
        </h2>

        <p className="text-xs sm:text-[13px] text-black font-semibold mt-1 max-w-lg leading-relaxed">
          Different disciplines. One journey — shaped by building, leading, analyzing, and learning.
        </p>
      </div>

      {/* ── Interactive 4-Card Stage with Center Circle Hub (Replicating Reference Design) ── */}
      <div className="relative w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center my-auto min-h-0 scale-[0.80] sm:scale-[0.88] md:scale-[0.95] lg:scale-100 transition-transform origin-center">

        {/* Central Circular Hub (Placed at center intersection without lines or dots) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white text-black flex items-center justify-center shadow-[0_6px_25px_rgba(0,0,0,0.12)] border-4 border-black cursor-pointer group"
          >
            {/* Rotating SVG Perimeter Text - close to the margin of the circle */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_24s_linear_infinite]" viewBox="0 0 140 140">
              <path
                id="perspectivePath"
                d="M 70, 70 m -58, 0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
                fill="none"
              />
              <text className="text-[6.8px] font-mono font-bold tracking-[0.16em] uppercase fill-black">
                <textPath href="#perspectivePath" startOffset="0%">
                  • Developer • Project Manager • HR • Analyst • Developer • Project Manager • HR • Analyst
                </textPath>
              </text>
            </svg>

            {/* Center Core Badge - inside the rotating words */}
            <div className="text-center z-10 flex flex-col items-center justify-center select-none px-2">
              <span className="font-mono font-black text-[11px] sm:text-xs tracking-wider uppercase text-black group-hover:text-yellow-600 transition-colors">
                PERSPECTIVES
              </span>
            </div>
          </motion.div>
        </div>

        {/* 2-Row Horizontal Stage with Scroll-Driven Horizontal Parallax */}
        <div className="w-full flex flex-col gap-8 sm:gap-10 lg:gap-12 items-center justify-center">

          {/* ── TOP ROW: (Software Engineering & Data Analytics) ── */}
          <motion.div
            style={{ x: topRowX }}
            className="flex flex-row items-center justify-center gap-8 sm:gap-14 lg:gap-20 w-full"
          >
            {PERSPECTIVES.filter((p) => p.row === 'top').map((card) => {
              const Icon = card.icon;
              const isHovered = hoveredCardId === card.id;

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className={`relative w-[280px] sm:w-[320px] lg:w-[360px] h-[180px] sm:h-[195px] lg:h-[205px] p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white border-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer ${isHovered
                    ? 'border-yellow-400 shadow-[0_16px_36px_rgba(234,179,8,0.22)] scale-[1.03]'
                    : 'border-black shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-yellow-400'
                    }`}
                >
                  <div>
                    {/* Title Header with Icon */}
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h3 className="text-sm sm:text-base lg:text-lg font-black uppercase tracking-tight text-black font-display group-hover:text-yellow-600 transition-colors leading-tight">
                        {card.title}
                      </h3>
                      <div className="w-7 h-7 rounded-lg bg-yellow-400 border border-black flex items-center justify-center text-black shrink-0 group-hover:rotate-12 transition-all shadow-xs">
                        <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Subline / Category */}
                    <p className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider text-yellow-600 mb-1.5">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Description Text */}
                  <p className="text-[11px] sm:text-xs text-black font-bold leading-relaxed uppercase tracking-wide">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* ── BOTTOM ROW: (Project Management & People Operations) ── */}
          <motion.div
            style={{ x: bottomRowX }}
            className="flex flex-row items-center justify-center gap-8 sm:gap-14 lg:gap-20 w-full"
          >
            {PERSPECTIVES.filter((p) => p.row === 'bottom').map((card) => {
              const Icon = card.icon;
              const isHovered = hoveredCardId === card.id;

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className={`relative w-[280px] sm:w-[320px] lg:w-[360px] h-[180px] sm:h-[195px] lg:h-[205px] p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white border-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer ${isHovered
                    ? 'border-yellow-400 shadow-[0_16px_36px_rgba(234,179,8,0.22)] scale-[1.03]'
                    : 'border-black shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-yellow-400'
                    }`}
                >
                  <div>
                    {/* Title Header with Icon */}
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h3 className="text-sm sm:text-base lg:text-lg font-black uppercase tracking-tight text-black font-display group-hover:text-yellow-600 transition-colors leading-tight">
                        {card.title}
                      </h3>
                      <div className="w-7 h-7 rounded-lg bg-yellow-400 border border-black flex items-center justify-center text-black shrink-0 group-hover:rotate-12 transition-all shadow-xs">
                        <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Subline / Category */}
                    <p className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider text-yellow-600 mb-1.5">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Description Text */}
                  <p className="text-[11px] sm:text-xs text-black font-bold leading-relaxed uppercase tracking-wide">
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
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black border-2 border-black text-xs sm:text-sm font-black tracking-wide transition-all shadow-sm hover:shadow-lg cursor-pointer active:scale-95 group"
          >
            <Layers className="w-3.5 h-3.5 text-yellow-400 group-hover:text-black transition-colors" />
            <span>Explore My Full Journey</span>
            <ArrowRight className="w-3.5 h-3.5 text-yellow-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
          </button>
        )}
      </div>
    </section>
  );
};

export default MoreThanOnePerspectiveSection;
