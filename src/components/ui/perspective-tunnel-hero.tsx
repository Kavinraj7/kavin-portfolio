"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useScroll,
  MotionValue,
} from "framer-motion";
import {
  Atom,
  Globe,
  FileCode2,
  Layers,
  Server,
  Cpu,
  Database,
  Cloud,
  Terminal,
  Sparkles,
  ArrowRight,
  LucideIcon,
  RotateCcw,
  Kanban,
  CalendarDays,
  ClipboardList,
  GitBranch,
  ShieldCheck,
  Users,
  HeartHandshake,
  Workflow,
} from "lucide-react";

export interface SkillItem {
  name: string;
  category: string;
  icon: LucideIcon;
}

const TUNNEL_SKILLS: SkillItem[] = [
  // Interleaved Software Engineering & Project Management
  { name: "React.js", category: "Frontend", icon: Atom },
  { name: "Agile / Scrum", category: "Methodology", icon: RotateCcw },
  { name: "Next.js", category: "Framework", icon: Globe },
  { name: "Jira", category: "Project Tracking", icon: Kanban },
  { name: "TypeScript", category: "Language", icon: FileCode2 },
  { name: "Project Planning", category: "Roadmapping", icon: CalendarDays },
  { name: "Node.js", category: "Backend", icon: Server },
  { name: "Requirement Analysis", category: "Scoping", icon: ClipboardList },
  { name: "Tailwind CSS", category: "Styling", icon: Layers },
  { name: "SDLC", category: "Governance", icon: GitBranch },
  { name: "Spring Boot", category: "Backend", icon: Cpu },
  { name: "Team Management", category: "Leadership", icon: Users },
  { name: "MySQL", category: "Database", icon: Database },
  { name: "Stakeholder Management", category: "Executive Sync", icon: HeartHandshake },
  { name: "AWS Cloud", category: "Cloud", icon: Cloud },
  { name: "Workflow Management", category: "Process", icon: Workflow },
  { name: "Python", category: "Language", icon: Terminal },
  { name: "Client Management", category: "Relations", icon: ShieldCheck },
  { name: "DynamoDB", category: "Database", icon: Database },
  { name: "GSAP", category: "Animations", icon: Sparkles },
];

interface TunnelCardData {
  item: SkillItem;
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
}

const TUNNEL_CARDS: TunnelCardData[] = TUNNEL_SKILLS.map((item, i) => {
  const goldenAngle = i * 137.5 * (Math.PI / 180);
  const radiusFactorX = 0.28 + (i % 3) * 0.08;
  const radiusFactorY = 0.26 + (i % 2) * 0.09;

  return {
    item,
    angleCos: Math.cos(goldenAngle),
    angleSin: Math.sin(goldenAngle),
    radiusFactorX,
    radiusFactorY,
    rotationZ: (i % 2 === 0 ? 1 : -1) * (2 + (i % 4) * 2),
    index: i,
  };
});

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

interface TunnelCardProps {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
}

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
  // Stagger all 11 skills so they all fly past camera and exit before progress reaches 0.75
  const staggerSpan = 0.38;
  const maxStart = 0.75 - staggerSpan;
  const start = (card.index / total) * maxStart;
  const end = start + staggerSpan;

  const localProgress = useTransform(progress, [start, end], [0, 1]);

  const farZ = stage.isMobile ? -1400 : -1900;
  const nearZ = stage.isMobile ? 550 : 800;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

  // Fade in as it emerges, stay crisp, then quickly fade out right as it flies past the camera viewport
  const opacity = useTransform(localProgress, [0, 0.12, 0.82, 0.98], [0, 1, 1, 0]);

  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 18 : 38;

  const transform = useTransform(
    [z, pointer.x, pointer.y],
    ([currZ, px, py]: number[]) => {
      const offsetX = baseX - px * panStrength;
      const offsetY = baseY - py * panStrength;
      return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
    }
  );

  const Icon = card.item.icon;

  return (
    <motion.div
      style={{
        transform,
        opacity,
        zIndex: card.index + 1,
      }}
      className="pointer-events-auto absolute left-1/2 top-1/2 will-change-transform select-none cursor-pointer flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
    >
      <div className="group relative flex flex-col items-center justify-center gap-2 sm:gap-2.5">
        {/* Floating Skill Icon Circle */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-zinc-900/95 border-2 border-zinc-300/70 dark:border-zinc-700/80 flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:border-zinc-900 dark:group-hover:border-white group-hover:shadow-2xl transition-all duration-300 backdrop-blur-md">
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 group-hover:rotate-6" />
        </div>

        {/* Skill Name Pill */}
        <div className="px-3 sm:px-3.5 py-1 rounded-full bg-zinc-950/85 dark:bg-zinc-900/90 border border-white/15 text-white backdrop-blur-md shadow-md group-hover:border-white/40 transition-colors duration-300">
          <span className="text-[11px] sm:text-xs md:text-sm font-black font-sans uppercase tracking-wider whitespace-nowrap">
            {card.item.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface PerspectiveTunnelHeroProps {
  onViewAllSkills?: () => void;
}

export default function PerspectiveTunnelHero({ onViewAllSkills }: PerspectiveTunnelHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [stage, setStage] = useState<StageDimensions>({
    width: 1440,
    height: 900,
    isMobile: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setStage({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Smooth scroll-driven animation bound naturally to page scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 28,
    restDelta: 0.0001,
  });

  const pointer = useCameraParallax(!reduce);

  // Central Anchor Typography animation
  const titleScale = useTransform(smoothProgress, [0, 0.45, 0.75, 1], [0.8, 1, 1.05, 1.1]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.1, 0.85, 1], [0.4, 1, 1, 1]);
  const promptOpacity = useTransform(smoothProgress, [0, 0.15, 0.75], [1, 0, 0]);

  // CTA button emerges once all skill icons have flown out and only the text remains
  const ctaOpacity = useTransform(smoothProgress, [0.72, 0.82], [0, 1]);
  const ctaScale = useTransform(smoothProgress, [0.72, 0.82], [0.85, 1]);
  const ctaY = useTransform(smoothProgress, [0.72, 0.82], [20, 0]);

  return (
    <div
      ref={containerRef}
      id="skills-tunnel-section"
      className="relative h-[260vh] w-full"
    >
      {/* Sticky 100vh Viewport Stage */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#FAFAFC] dark:bg-[#09080F] text-neutral-900 dark:text-white select-none flex items-center justify-center border-t border-zinc-200/60 dark:border-zinc-800/60"
        style={{
          perspective: stage.isMobile ? "900px" : "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Background Grid & Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,238,0,0.06)_0%,transparent_70%)]" />

        {/* Depth Ring Guides */}
        <div className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-yellow-400/20 dark:border-yellow-400/15" />
        <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-neutral-300/60 dark:border-white/10" />

        {/* Central Anchor Typography */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="z-10 flex flex-col items-center text-center px-6 max-w-2xl pointer-events-none"
        >

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.92] text-neutral-950 dark:text-white font-sans">
            BEYOND
            <br />
            THE STACK
          </h2>

          <p className="mt-4 max-w-[42ch] text-xs sm:text-sm md:text-base font-medium text-neutral-600 dark:text-neutral-400">
            Explore the technologies, tools, and capabilities that shape how I build, analyze, and deliver solutions.
          </p>

          {/* CTA Button: View all my skills (Appears when all skills have flown out) */}
          <motion.div
            style={{
              opacity: ctaOpacity,
              scale: ctaScale,
              y: ctaY,
            }}
            className="mt-6 sm:mt-7 z-30 pointer-events-auto"
          >
            {onViewAllSkills && (
              <button
                onClick={onViewAllSkills}
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-black text-[#FFEE00] hover:bg-[#FFEE00] hover:text-black border-2 border-black text-xs sm:text-sm md:text-base font-black tracking-wide uppercase transition-all shadow-xl hover:shadow-[0_0_30px_rgba(255,238,0,0.4)] cursor-pointer active:scale-95 group"
              >
                <span>View all my skills</span>
                <ArrowRight className="w-4 h-4 text-[#FFEE00] group-hover:text-black group-hover:translate-x-1 transition-all" />
              </button>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll Prompt (Visible only at the beginning) */}
        <motion.div
          style={{ opacity: promptOpacity }}
          className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400"
        >
          <span>Scroll to Explore Stack</span>
          <div className="h-6 w-px bg-gradient-to-b from-[#FFEE00] to-transparent" />
        </motion.div>

        {/* 3D Z-Space Plane with Floating Skill Icons & Names */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {TUNNEL_CARDS.map((card, i) => (
            <TunnelCard
              key={i}
              card={card}
              progress={smoothProgress}
              pointer={pointer}
              total={TUNNEL_CARDS.length}
              stage={stage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
