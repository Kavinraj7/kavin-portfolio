"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface RoleDetail {
  role: string;
  period: string;
  description: string;
}

export interface TimelineItem {
  year: string;
  company: string;
  companySubtitle?: string;
  tags: string[];
  viewLink?: string;
  logoSvg?: React.ReactNode;
  logoImage?: string;
  roles: RoleDetail[];
}

interface TimelineProps {
  items?: TimelineItem[];
  className?: string;
}

const defaultItems: TimelineItem[] = [
  {
    year: "2026",
    company: "Praskla",
    companySubtitle: "Technology",
    logoImage: "/praskla.jpg",
    tags: [
      "ADMINISTRATION",
      "MANAGEMENT OPERATIONS",
      "WORKFLOW OPTIMIZATION",
      "TEAM COORDINATION",
      "ORGANIZATIONAL LEADERSHIP"
    ],
    viewLink: "https://prasklatechnology.com/",
    roles: [
      {
        role: "Technical Project Manager",
        period: "November 2025 – Present",
        description:
          "Managing technical projects taught me to connect business needs with engineering execution. I coordinated client requirements, team workflows, project progress, and delivery to keep projects aligned with their goals."
      }
    ],
    logoSvg: (
      <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="0 0 160 160" fill="none">
        {/* Stylized Praskla Symbol matching reference */}
        <path
          d="M30 42 C60 30, 100 30, 138 25 C132 35, 120 40, 105 42 C125 55, 135 90, 132 135 C122 138, 110 120, 112 95 C115 65, 100 52, 85 52 C70 52, 55 65, 58 95 C60 120, 48 138, 38 135 C35 90, 45 55, 65 42 C50 40, 38 35, 30 42 Z"
          fill="#3B1254"
        />
        {/* Silver Ring Intersect */}
        <ellipse
          cx="85"
          cy="85"
          rx="48"
          ry="15"
          fill="none"
          stroke="#D1D5DB"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <ellipse
          cx="85"
          cy="85"
          rx="46"
          ry="13"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="2"
        />
      </svg>
    )
  },
  {
    year: "2025",
    company: "Praskla",
    companySubtitle: "Technology",
    logoImage: "/praskla.jpg",
    tags: [
      "TECHNICAL LEADERSHIP",
      "PROJECT MANAGEMENT",
      "CLIENT COLLABORATION",
      "SOFTWARE DEVELOPMENT",
      "TEAM COORDINATION"
    ],
    viewLink: "https://prasklatechnology.com/",
    roles: [
      {
        role: "Technical Team Lead",
        period: "June 2025 – September 2025",
        description:
          "Taking responsibility for the team helped me grow beyond individual development. I guided technical work, coordinated tasks, supported management activities, and helped keep the team aligned with project goals."
      },
      {
        role: "Software Developer & Management Associate",
        period: "March 2025 – May 2025",
        description:
          "Building software while assisting with management activities gave me a broader view of the business. I contributed to development tasks while supporting coordination, workflows, and day-to-day operational needs."
      }
    ],
    logoSvg: (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 text-indigo-600" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="55" stroke="currentColor" strokeWidth="6" strokeDasharray="6 4" />
        <circle cx="80" cy="80" r="28" fill="#4F46E5" />
        <circle cx="80" cy="40" r="10" fill="#7C3AED" />
        <circle cx="120" cy="80" r="10" fill="#7C3AED" />
        <circle cx="80" cy="120" r="10" fill="#7C3AED" />
        <circle cx="40" cy="80" r="10" fill="#7C3AED" />
        <path d="M80 40 L80 120 M40 80 L120 80" stroke="currentColor" strokeWidth="3" />
      </svg>
    )
  },
  {
    year: "2025",
    company: "CubeAI",
    companySubtitle: "Solutions",
    logoImage: "/cubeai.jpg",
    tags: [
      "DATA ANALYTICS",
      "PYTHON",
      "SQL",
      "POWER BI",
      "DATA VISUALIZATION"
    ],
    viewLink: "https://www.cubeaisolutions.com/",
    roles: [
      {
        role: "Data Analytics Intern",
        period: "January 2025 – March 2025",
        description:
          "Working with data introduced me to the process of turning raw information into useful insights. I explored data preparation, analysis, querying, and visualization to support clearer reporting and data-driven decisions."
      }
    ],
    logoSvg: (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 text-blue-600" viewBox="0 0 160 160" fill="none">
        <path d="M45 105 C32 105 22 95 22 82 C22 70 30 60 42 59 C47 42 62 30 80 30 C101 30 118 45 120 65 C130 67 138 76 138 87 C138 98 129 105 118 105 Z" fill="#2563EB" fillOpacity="0.85" />
        <path d="M50 105 L110 105" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <circle cx="80" cy="75" r="12" fill="white" />
      </svg>
    )
  },
  {
    year: "2024",
    company: "Object Automation",
    companySubtitle: "System Solutions Pvt. Ltd.",
    logoImage: "/objectautomation.jpg",
    tags: [
      "ARTIFICIAL INTELLIGENCE",
      "MACHINE LEARNING",
      "PYTHON",
      "DATA PREPROCESSING",
      "MODEL EVALUATION"
    ],
    viewLink: "https://object-automation.com/",
    roles: [
      {
        role: "AIML Intern",
        period: "July 2024 – August 2024",
        description:
          "My introduction to AI and machine learning helped me understand how data becomes a predictive model. I explored programming, data preparation, machine learning concepts, and the fundamentals of developing and evaluating models."
      }
    ],
    logoSvg: (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 text-pink-600" viewBox="0 0 160 160" fill="none">
        <rect x="35" y="35" width="90" height="90" rx="22" stroke="#DB2777" strokeWidth="6" />
        <path d="M55 80 L72 98 L105 62" stroke="#DB2777" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    year: "2023",
    company: "ATmega Software",
    companySubtitle: "Technologies LLP",
    logoImage: "/atmega.jpg",
    tags: [
      "PROJECT MANAGEMENT",
      "JIRA",
      "KANBAN",
      "TASK TRACKING",
      "PROJECT COORDINATION"
    ],
    viewLink: "https://www.atmega.in/",
    roles: [
      {
        role: "Project Management Intern",
        period: "April 2023 – May 2023",
        description:
          "This internship introduced me to structured project execution and team workflows. I explored Jira, task tracking, Kanban boards, and project coordination, building an early understanding of how teams plan and manage work."
      }
    ],
    logoSvg: (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 text-emerald-600" viewBox="0 0 160 160" fill="none">
        <polygon points="80,25 135,115 25,115" stroke="#059669" strokeWidth="6" fill="#10B981" fillOpacity="0.2" strokeLinejoin="round" />
        <circle cx="80" cy="78" r="16" fill="#059669" />
      </svg>
    )
  }
];

export const Timeline = ({
  items = defaultItems,
  className,
}: TimelineProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] || items[0];
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillsListRef = useRef<HTMLDivElement>(null);
  const gridAreaRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  // Sync scroll position of active button strictly inside its own container without moving the browser viewport
  useEffect(() => {
    const activeBtn = buttonRefs.current[activeIndex];
    const listEl = pillsListRef.current;
    if (activeBtn && listEl) {
      if (window.innerWidth >= 1024) {
        // Vertical pill list
        const targetTop = activeBtn.offsetTop - listEl.clientHeight / 2 + activeBtn.clientHeight / 2;
        listEl.scrollTo({ top: targetTop, behavior: "smooth" });
      } else {
        // Horizontal pill list
        const targetLeft = activeBtn.offsetLeft - listEl.clientWidth / 2 + activeBtn.clientWidth / 2;
        listEl.scrollTo({ left: targetLeft, behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Native non-passive wheel & touch listeners
  useEffect(() => {
    const el = gridAreaRef.current;
    if (!el) return;

    let wheelDeltaAccumulator = 0;
    let resetAccumulatorTimer: ReturnType<typeof setTimeout> | null = null;
    let touchStartX = 0;
    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      const currentIdx = activeIndexRef.current;
      const delta = e.deltaY;
      const now = Date.now();

      // If scrolling DOWN and there is a next milestone:
      if (delta > 0 && currentIdx < items.length - 1) {
        e.preventDefault();
        e.stopPropagation();

        wheelDeltaAccumulator += delta;
        if (wheelDeltaAccumulator > 25 && now - lastScrollTime.current > 240) {
          lastScrollTime.current = now;
          wheelDeltaAccumulator = 0;
          setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
        }

        if (resetAccumulatorTimer) clearTimeout(resetAccumulatorTimer);
        resetAccumulatorTimer = setTimeout(() => {
          wheelDeltaAccumulator = 0;
        }, 150);
      }
      // If scrolling UP and there is a previous milestone:
      else if (delta < 0 && currentIdx > 0) {
        e.preventDefault();
        e.stopPropagation();

        wheelDeltaAccumulator += delta;
        if (wheelDeltaAccumulator < -25 && now - lastScrollTime.current > 240) {
          lastScrollTime.current = now;
          wheelDeltaAccumulator = 0;
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }

        if (resetAccumulatorTimer) clearTimeout(resetAccumulatorTimer);
        resetAccumulatorTimer = setTimeout(() => {
          wheelDeltaAccumulator = 0;
        }, 150);
      }
      // At boundary: scrolling up at index 0 or scrolling down at last index -> let default page scroll happen
      else {
        wheelDeltaAccumulator = 0;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;
      const diffX = touchStartX - touchCurrentX;
      const diffY = touchStartY - touchCurrentY;

      // Allow natural vertical page scrolling on mobile!
      // Only switch milestones on clear horizontal swipe without calling preventDefault.
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        const currentIdx = activeIndexRef.current;
        const now = Date.now();

        if (diffX > 0 && currentIdx < items.length - 1) {
          if (now - lastScrollTime.current > 260) {
            lastScrollTime.current = now;
            touchStartX = touchCurrentX;
            touchStartY = touchCurrentY;
            setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
          }
        } else if (diffX < 0 && currentIdx > 0) {
          if (now - lastScrollTime.current > 260) {
            lastScrollTime.current = now;
            touchStartX = touchCurrentX;
            touchStartY = touchCurrentY;
            setActiveIndex((prev) => Math.max(prev - 1, 0));
          }
        }
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      if (resetAccumulatorTimer) clearTimeout(resetAccumulatorTimer);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [items.length]);

  return (
    <div className={cn("w-full select-none", className)}>
      {/* Shaded Area: Left Year Strip + Right Milestone Card */}
      <div
        ref={gridAreaRef}
        className="grid grid-cols-12 gap-6 lg:gap-8 items-center transition-colors"
      >
        {/* LEFT COLUMN: Year Pills List */}
        <div className="relative flex flex-col items-center shrink-0 w-full lg:w-auto lg:col-span-2 col-span-12">
          {/* Top/Bottom Arrow Controls for quick navigation on desktop */}
          <div className="hidden lg:flex flex-col gap-2 mb-3">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous milestone"
              className={cn(
                "p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 transition-colors flex items-center justify-center cursor-pointer",
                activeIndex === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              )}
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>

          <div
            ref={pillsListRef}
            className="flex flex-row lg:flex-col gap-3 sm:gap-4 lg:h-[380px] overflow-auto no-scrollbar md:snap-y snap-x lg:py-16 lg:px-0 px-6 sm:px-16 snap-mandatory w-full items-center justify-start lg:justify-center"
            style={{ scrollBehavior: "smooth" }}
          >
            {items.map((item, index) => (
              <Button
                variant={activeIndex === index ? "default" : "outline"}
                key={item.year}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "rounded-full px-4 py-2 transition-all duration-300 shrink-0 snap-center font-mono font-bold cursor-pointer text-xs sm:text-sm shadow-xs",
                  activeIndex === index
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md scale-105 border-zinc-900 dark:border-white"
                    : "hover:border-zinc-400 dark:hover:border-zinc-600 bg-background/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                )}
              >
                <span>{item.year}</span>
              </Button>
            ))}
          </div>

          <div className="hidden lg:flex flex-col gap-2 mt-3">
            <button
              onClick={handleNext}
              disabled={activeIndex === items.length - 1}
              aria-label="Next milestone"
              className={cn(
                "p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 transition-colors flex items-center justify-center cursor-pointer",
                activeIndex === items.length - 1
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              )}
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Gradient Overlays on Left Strip */}
          <div className="absolute inset-x-0 top-10 h-20 bg-linear-to-b from-background to-transparent pointer-events-none z-10 lg:block hidden" />
          <div className="absolute inset-x-0 bottom-10 h-20 bg-linear-to-t from-background to-transparent pointer-events-none z-10 lg:block hidden" />
        </div>

        {/* RIGHT COLUMN: Matching Card Structure as per reference */}
        <div className="flex-1 w-full overflow-visible py-4 -my-4 px-1 -mx-1 lg:col-span-10 col-span-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.year}
              initial={{ opacity: 0, x: 25, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -25, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full bg-[#18181B] dark:bg-[#151419] text-white border border-zinc-800/90 rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 lg:p-8 shadow-2xl shadow-black/30 dark:shadow-black/70 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full">

                {/* LEFT CONTENT AREA: Company Header & Role Timeline List */}
                <div className="lg:col-span-7 flex flex-col">
                  {/* Company Name Header */}
                  <div className="mb-4 sm:mb-5">
                    <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-none">
                      {activeItem.company}
                    </h2>
                    {activeItem.companySubtitle && (
                      <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-none mt-1">
                        {activeItem.companySubtitle}
                      </h2>
                    )}
                  </div>

                  {/* Role Stepper / Timeline Nodes */}
                  <div className="relative space-y-4 sm:space-y-5">
                    {/* Continuous Vertical Connecting Line */}
                    <div className="absolute left-[7px] top-2 bottom-3 w-0.5 -translate-x-1/2 bg-zinc-700 pointer-events-none" />

                    {activeItem.roles.map((roleItem, rIdx) => (
                      <div key={rIdx} className="relative pl-7 group">
                        {/* Stepper Circle Indicator (exact horizontal center lock with line) */}
                        <div className="absolute left-[7px] top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-zinc-400 bg-[#18181B] dark:bg-[#151419] shadow-xs group-hover:border-white transition-colors z-10" />

                        {/* Role Title */}
                        <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                          {roleItem.role}
                        </h4>

                        {/* Period */}
                        <p className="text-[11px] sm:text-xs text-zinc-400 font-medium mb-1 mt-0.5">
                          {roleItem.period}
                        </p>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal max-w-xl">
                          {roleItem.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT CONTENT AREA: Centered Logo Box on Top, View Button & Skill Tags Below */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center text-center gap-4 w-full lg:pl-4">

                  {/* 1. Square Logo Box (Centered) */}
                  {activeItem.viewLink ? (
                    <a
                      href={activeItem.viewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-32 h-32 sm:w-36 sm:h-36 lg:w-36 lg:h-36 shrink-0 bg-white rounded-2xl p-3 flex items-center justify-center shadow-xl border border-zinc-200/20 mx-auto overflow-hidden hover:scale-105 transition-all duration-300 group/logo cursor-pointer"
                      title={`Visit ${activeItem.company} Website`}
                    >
                      {activeItem.logoImage ? (
                        <img
                          src={activeItem.logoImage}
                          alt={activeItem.company}
                          className="w-full h-full object-contain rounded-xl p-1 group-hover/logo:scale-105 transition-transform duration-300"
                        />
                      ) : activeItem.logoSvg ? (
                        activeItem.logoSvg
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-zinc-900 flex items-center justify-center text-white font-black text-xl">
                          {activeItem.company.charAt(0)}
                        </div>
                      )}
                    </a>
                  ) : (
                    <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-36 lg:h-36 shrink-0 bg-white rounded-2xl p-3 flex items-center justify-center shadow-xl border border-zinc-200/20 mx-auto overflow-hidden">
                      {activeItem.logoImage ? (
                        <img
                          src={activeItem.logoImage}
                          alt={activeItem.company}
                          className="w-full h-full object-contain rounded-xl p-1"
                        />
                      ) : activeItem.logoSvg ? (
                        activeItem.logoSvg
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-zinc-900 flex items-center justify-center text-white font-black text-xl">
                          {activeItem.company.charAt(0)}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 2. Action Button & Skills Tags (Centered Below Logo Area) */}
                  <div className="w-full flex flex-col items-center justify-center text-center gap-3">
                    {/* View Button */}
                    <div>
                      {activeItem.viewLink ? (
                        <a
                          href={activeItem.viewLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-zinc-950 font-bold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors shadow-sm group cursor-pointer"
                        >
                          <span>VIEW</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-zinc-950 font-bold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors shadow-sm group cursor-pointer"
                        >
                          <span>VIEW</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      )}
                    </div>

                    {/* Skill Tags Pills */}
                    <div className="flex flex-wrap gap-1.5 justify-center items-center max-w-xs">
                      {activeItem.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-[#27272A] border border-zinc-700/60 text-zinc-300 text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Navigation Control Bar */}
              <div className="mt-5 pt-3.5 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                <span className="font-mono tracking-wider font-semibold text-[11px] sm:text-xs">
                  MILESTONE {activeIndex + 1} OF {items.length} ({activeItem.year})
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className={cn(
                      "flex items-center gap-1 px-3 py-1 rounded-full border border-zinc-700 text-zinc-300 text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer",
                      activeIndex === 0 && "opacity-40 cursor-not-allowed hover:bg-transparent"
                    )}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={activeIndex === items.length - 1}
                    className={cn(
                      "flex items-center gap-1 px-3 py-1 rounded-full border border-zinc-700 text-zinc-300 text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer",
                      activeIndex === items.length - 1 && "opacity-40 cursor-not-allowed hover:bg-transparent"
                    )}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
