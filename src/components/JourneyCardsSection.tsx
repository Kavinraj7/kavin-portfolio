'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  CheckCircle2, 
  Brain, 
  Users, 
  Code2, 
  BarChart3, 
  Cloud, 
  Cpu, 
  Compass,
  Sparkles,
  ArrowDown
} from 'lucide-react';

export interface JourneyCardItem {
  id: string;
  step: string;
  category: string;
  headline: string;
  description: string;
  tags: string[];
  knowledgeAdded: string[];
  annotation?: string;
  accentColor: string;
  icon: React.ElementType;
}

export const JOURNEY_CARDS_DATA: JourneyCardItem[] = [
  {
    id: 'step-1',
    step: '01',
    category: 'PROJECT MANAGEMENT',
    headline: 'Understanding how things come together.',
    description: 'My first step into the tech world was understanding how IT projects actually work — planning, coordination, Agile practices, and cross-functional execution.',
    tags: ['Agile', 'SDLC', 'Jira', 'Team Coordination', 'Sprint Planning'],
    knowledgeAdded: [
      'Project Planning & Scoping',
      'Agile & SDLC Workflows',
      'Team Coordination',
      'Execution Mindset'
    ],
    annotation: 'This becomes the strategic blueprint for all technical execution.',
    accentColor: '#8B5CF6',
    icon: Brain
  },
  {
    id: 'step-2',
    step: '02',
    category: 'HUMAN RESOURCES & TALENT',
    headline: 'Empowering people and team dynamics.',
    description: 'Mastering the human equation behind engineering. Cultivating high-performance engineering culture, conflict resolution, and leadership pipeline growth.',
    tags: ['Talent Acquisition', 'Culture Building', 'Conflict Resolution', 'Performance Coaching'],
    knowledgeAdded: [
      'Organizational Psychology',
      'High-Output Team Structuring',
      'Talent Retainment Strategies',
      'Empathetic Leadership'
    ],
    annotation: 'Great software starts with great team synergy.',
    accentColor: '#EC4899',
    icon: Users
  },
  {
    id: 'step-3',
    step: '03',
    category: 'FULL STACK ENGINEERING',
    headline: 'Architecting scalable, production-grade applications.',
    description: 'Translating design and business logic into high-speed, modern web experiences. Deep proficiency across modern frontend and resilient backend systems.',
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'REST & GraphQL'],
    knowledgeAdded: [
      'Modern Frontend Frameworks',
      'Modular System Design',
      'State & Performance Tuning',
      'Full Stack Architecture'
    ],
    annotation: 'Engineering speed without compromising design fidelity.',
    accentColor: '#3B82F6',
    icon: Code2
  },
  {
    id: 'step-4',
    step: '04',
    category: 'DATA ANALYTICS & INSIGHTS',
    headline: 'Transforming raw telemetry into actionable decisions.',
    description: 'Harnessing quantitative analytics, pipeline modeling, and business intelligence to drive data-informed product decisions and strategic forecasting.',
    tags: ['Python', 'SQL', 'Data Modeling', 'PowerBI', 'Predictive Analysis'],
    knowledgeAdded: [
      'Data-Driven Decision Making',
      'ETL & Telemetry Pipelines',
      'Statistical Analysis',
      'KPI & Growth Metrics'
    ],
    annotation: 'Eliminating guesswork through rigorous empirical data.',
    accentColor: '#10B981',
    icon: BarChart3
  },
  {
    id: 'step-5',
    step: '05',
    category: 'CLOUD & DISTRIBUTED SYSTEMS',
    headline: 'Ensuring resilience, uptime, and automated deployment.',
    description: 'Containerization, cloud infrastructure, and CI/CD pipelines engineered for zero downtime, elastic scalability, and world-class reliability.',
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Microservices'],
    knowledgeAdded: [
      'Cloud Architecture Design',
      'Automated Testing & Releases',
      'Zero-Downtime Deployments',
      'Infrastructure Resilience'
    ],
    annotation: 'Built to gracefully scale from dozens to millions of requests.',
    accentColor: '#06B6D4',
    icon: Cloud
  },
  {
    id: 'step-6',
    step: '06',
    category: 'AI & AGENTIC WORKFLOWS',
    headline: 'Harnessing autonomous agents and intelligent systems.',
    description: 'Integrating LLMs, neural orchestration, and autonomous agent systems to automate high-complexity processes and supercharge user capabilities.',
    tags: ['Agentic Workflows', 'LLM Orchestration', 'Prompt Engineering', 'LangChain', 'Neural Models'],
    knowledgeAdded: [
      'Autonomous Agent Design',
      'Model Context Protocol (MCP)',
      'Intelligent Automation',
      'Next-Gen UX Paradigms'
    ],
    annotation: 'Pioneering AI systems that proactively solve complex challenges.',
    accentColor: '#F59E0B',
    icon: Cpu
  },
  {
    id: 'step-7',
    step: '07',
    category: 'EXECUTIVE STRATEGY & VISION',
    headline: 'Bridging technical depth with business impact.',
    description: 'The convergence of all dimensions: leading cross-functional teams, executing high-stakes roadmaps, and delivering transformative technology solutions.',
    tags: ['Product Vision', 'Stakeholder Alignment', 'ROI Optimization', 'Executive Leadership'],
    knowledgeAdded: [
      'Macro Strategic Vision',
      'Cross-Domain Synthesis',
      'Resource & Budget Optimization',
      'End-to-End Ownership'
    ],
    annotation: 'The full spectrum leader ready for multi-million dollar impact.',
    accentColor: '#8B5CF6',
    icon: Compass
  }
];

interface JourneyCardProps {
  card: JourneyCardItem;
  index: number;
  total: number;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ card, index, total }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track individual card scroll progress for smooth stacking and parallax
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <div 
      ref={cardRef} 
      className="sticky top-20 sm:top-24 md:top-28 mb-16 sm:mb-20 md:mb-28 last:mb-0 w-full flex justify-center"
      style={{
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
        }}
        className="relative w-full max-w-[1380px] min-h-[440px] sm:min-h-[480px] lg:min-h-[540px] flex flex-col justify-center bg-[#F6F6FC] dark:bg-[#161324] rounded-[32px] sm:rounded-[44px] md:rounded-[52px] p-8 sm:p-10 md:p-14 lg:p-16 border border-purple-200/60 dark:border-purple-900/40 shadow-[0_25px_70px_-15px_rgba(124,58,237,0.08)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] overflow-hidden transition-colors duration-300"
      >
        {/* Soft Ambient Radial Background Glow */}
        <div 
          className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-25 dark:opacity-35 pointer-events-none"
          style={{ backgroundColor: card.accentColor }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
          
          {/* LEFT SIDE: Step Number, Category, Headline, Description, Tags */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10 space-y-4 sm:space-y-6">
            
            {/* Step Badge & Category */}
            <div className="flex items-center gap-3.5">
              <span className="flex items-center justify-center px-3.5 py-1.5 rounded-lg bg-[#EDE9FE] dark:bg-purple-950/70 text-[#7C3AED] dark:text-[#A78BFA] font-black text-sm tracking-wider font-mono shadow-xs">
                {card.step}
              </span>
              <span className="text-xs sm:text-sm font-bold text-zinc-500 dark:text-zinc-400 tracking-widest uppercase">
                {card.category}
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.18]">
              {card.headline}
            </h3>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-[18px] text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl font-normal">
              {card.description}
            </p>

            {/* Tags Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {card.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-semibold border border-purple-100 dark:border-purple-900/30 shadow-xs hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE: Concept Graphic + "Knowledge Added" Floating Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[320px] sm:min-h-[380px]">
            
            {/* Background Concept Line Illustration & Neural Glow */}
            <div className="absolute inset-0 flex items-center justify-center opacity-35 dark:opacity-30 pointer-events-none select-none">
              {/* Detailed SVG Brain / Network Diagram */}
              <svg className="w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96 text-purple-600 dark:text-purple-400" viewBox="0 0 200 200" fill="none" stroke="currentColor">
                {/* Brain Outline and Lobes */}
                <path d="M100 30 C70 30, 40 50, 40 85 C40 105, 50 115, 45 135 C40 155, 60 170, 85 170 C100 170, 110 160, 120 160 C135 160, 155 170, 165 150 C175 130, 160 110, 165 90 C170 65, 140 30, 100 30 Z" strokeWidth="1.2" strokeDasharray="3 2" />
                <path d="M70 60 C85 70, 115 55, 130 75 C145 95, 125 125, 140 145" strokeWidth="1" />
                <path d="M55 90 C75 100, 80 120, 75 140" strokeWidth="0.8" />
                <path d="M95 80 C110 95, 105 130, 120 140" strokeWidth="0.8" />
                {/* Highlighted Lobe Area */}
                <path d="M115 85 C135 95, 145 120, 135 140 C120 145, 105 135, 110 110 Z" fill={card.accentColor} fillOpacity="0.25" stroke={card.accentColor} strokeWidth="1.5" />
              </svg>
            </div>

            {/* Floating Glassmorphic "Knowledge Added" Box (Enlarged) */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-[360px] sm:max-w-[380px] bg-white/95 dark:bg-[#1C182A]/95 backdrop-blur-2xl rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-[0_20px_50px_-10px_rgba(124,58,237,0.12)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] border border-white dark:border-purple-800/40"
            >
              {/* Box Title */}
              <div className="flex items-center gap-3 mb-5">
                <div 
                  className="w-3 h-3 rounded-full animate-pulse shadow-sm"
                  style={{ backgroundColor: card.accentColor }}
                />
                <h4 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  Knowledge Added
                </h4>
              </div>

              {/* Bullet Points with Checkmarks */}
              <ul className="space-y-3.5">
                {card.knowledgeAdded.map((item, kIdx) => (
                  <li key={kIdx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    <div 
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 shadow-xs"
                      style={{ 
                        backgroundColor: `${card.accentColor}20`,
                        color: card.accentColor 
                      }}
                    >
                      <CheckCircle2 className="w-4 h-4 fill-current" />
                    </div>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Card Footer Progress Indicator */}
              <div className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 font-bold">
                <span>PHASE {card.step} OF 0{total}</span>
                <span style={{ color: card.accentColor }}>COMPLETE</span>
              </div>
            </motion.div>

            {/* Subtle Annotation Arrow */}
            {card.annotation && (
              <div className="hidden sm:flex items-center gap-1 absolute -bottom-6 right-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 italic max-w-[280px] text-right pointer-events-none select-none font-medium">
                <span>↳</span>
                <span className="truncate">{card.annotation}</span>
              </div>
            )}

          </div>

        </div>
      </motion.div>
    </div>
  );
};

export const JourneyCardsSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#FAFAFC] dark:bg-[#09080F] transition-colors duration-300">
      
      {/* SECTION HEADER */}
      <div className="w-full max-w-[1180px] mx-auto text-center mb-14 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-bold font-mono uppercase tracking-wider mb-4 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Continuous Growth Journey · 7 Key Pillars</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight leading-tight max-w-3xl mx-auto"
        >
          How Multidisciplinary Thinking Came Together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Scroll through the 7 core milestones that evolved my technical mastery, people leadership, and executive problem solving.
        </motion.p>

        {/* Down Indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex justify-center mt-6 text-purple-500"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </div>

      {/* 7 STACKING SCROLL CARDS */}
      <div className="w-full max-w-[1420px] mx-auto relative pb-20">
        {JOURNEY_CARDS_DATA.map((card, index) => (
          <JourneyCard
            key={card.id}
            card={card}
            index={index}
            total={JOURNEY_CARDS_DATA.length}
          />
        ))}
      </div>

    </section>
  );
};
