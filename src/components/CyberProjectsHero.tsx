"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Code2, Users, BarChart3, LucideIcon } from "lucide-react";
import Image from "next/image";

export interface DomainItem {
  id: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  icon: LucideIcon;
}

const DOMAINS: DomainItem[] = [
  {
    id: "pm",
    titleLine1: "Project",
    titleLine2: "Manager",
    description: "The Essence of Modern Delivery & Strategy",
    icon: Briefcase,
  },
  {
    id: "dev",
    titleLine1: "Software",
    titleLine2: "Developer",
    description: "Where clean architecture meets scalable engineering.",
    icon: Code2,
  },
  {
    id: "hr",
    titleLine1: "HR",
    titleLine2: "Manager",
    description: "People operations, talent culture & growth.",
    icon: Users,
  },
  {
    id: "data",
    titleLine1: "Data",
    titleLine2: "Analyst",
    description: "Minimal design, maximum insights & AI modeling.",
    icon: BarChart3,
  },
];

interface CyberProjectsHeroProps {
  onSelectDomain?: (domainId: string) => void;
  onOpenTerminal?: () => void;
  onNavigateHome?: () => void;
  onNavigateJourney?: () => void;
}

export const CyberProjectsHero: React.FC<CyberProjectsHeroProps> = ({
  onSelectDomain,
}) => {
  return (
    <div className="relative w-full h-full bg-[#dce4e6] dark:bg-[#0c1015] text-[#111417] dark:text-[#f2f6f9] overflow-hidden flex flex-col justify-between pt-2 sm:pt-4 pb-4 sm:pb-5 px-4 sm:px-8 md:px-12 lg:px-16 font-sans select-none">

      {/* 1. TOP VERTICAL RADIANT LIGHT BEAM */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] sm:w-[200px] md:w-[260px] h-[300px] sm:h-[360px] bg-gradient-to-b from-[#ff6200] via-[#ff7700]/75 to-transparent blur-[28px] pointer-events-none z-0"
      />

      {/* Subtle Ambient Radial Highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.45)_0%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_75%)] pointer-events-none z-0" />

      {/* 2. CENTER SEAMLESS AVATAR BACKGROUND — hidden on very small screens */}
      <div className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-center pointer-events-none z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative
            w-[280px] h-[62vh]
            sm:w-[520px] sm:h-[82vh]
            md:w-[700px] md:h-[92vh]
            lg:w-[840px] lg:h-[94vh]
            xl:w-[940px] xl:h-[96vh]
            max-h-[640px]
            flex items-end justify-center"
        >
          <Image
            src="/images/av1-cropped.png"
            alt="Kavin 3D Avatar"
            fill
            priority
            unoptimized
            className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
      </div>

      {/* 3. CENTER HERO MAIN CONTENT LAYER */}
      <div className="relative z-20 w-full max-w-[1700px] mx-auto flex-1 flex flex-col justify-center my-auto">

        {/* ── MOBILE LAYOUT (< sm) ── */}
        <div className="flex flex-col items-center text-center gap-2 sm:hidden mt-6">
          {/* MEET MY SIDES */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[3.2rem] font-black tracking-[-0.065em] text-black dark:text-white uppercase leading-[0.85]"
            >
              MEET MY
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="text-[3.2rem] font-black tracking-[-0.065em] text-black dark:text-white uppercase leading-[0.85]"
            >
              SIDES
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-[11px] font-medium text-black/60 dark:text-white/60 leading-relaxed max-w-[200px] mt-2"
          >
            Step into effortless style with our refined and comfortable essentials
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 w-fit cursor-pointer group mt-1"
            onClick={() => {
              const target = document.getElementById("works-showcase");
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full font-bold text-xs tracking-tight shadow-lg">
              Explore Works
            </div>
            <div className="w-9 h-9 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </motion.div>
        </div>

        {/* ── DESKTOP LAYOUT (≥ sm) ── */}
        <div className="relative hidden sm:flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0 w-full -translate-y-4 sm:-translate-y-6 md:-translate-y-8">

          {/* LEFT SIDE: "MEET MY SIDES" */}
          <div className="flex flex-col justify-center z-20">

            {/* Title Line 1: MEET */}
            <div className="overflow-hidden pr-2 -translate-y-14 sm:-translate-y-15 md:-translate-y-16">
              <motion.h1
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[8.5rem] font-black tracking-[-0.07em] text-black dark:text-white uppercase leading-[0.82] select-none pr-1"
              >
                MEE T
              </motion.h1>
            </div>

            {/* Title Line 2: MY SIDES */}
            <div className="overflow-hidden flex items-center gap-2 sm:gap-3 mt-[-0.08em] pr-3 -translate-y-14 sm:-translate-y-15 md:-translate-y-16">
              <motion.span
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[8.5rem] font-black tracking-[-0.07em] text-black dark:text-white uppercase leading-[0.82] select-none"
              >
                MY
              </motion.span>

              <motion.span
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[8.5rem] font-black tracking-[-0.07em] text-black dark:text-white uppercase leading-[0.82] select-none pr-3"
              >
                SIDES
              </motion.span>
            </div>

            {/* Subtext & CTA */}
            <div className="mt-8 sm:mt-12 md:mt-16 flex flex-col items-start gap-3.5">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="max-w-[260px] sm:max-w-xs text-xs sm:text-[13px] font-medium text-black/70 dark:text-white/70 leading-relaxed"
              >
                Step into effortless style with our refined and comfortable essentials
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 w-fit cursor-pointer group"
                onClick={() => {
                  const target = document.getElementById("works-showcase");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="bg-black dark:bg-white text-white dark:text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm tracking-tight shadow-lg group-hover:bg-black/90 transition-all">
                  Explore Our Store
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-all">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            </div>

          </div>

          {/* RIGHT SIDE: "CHOOSE YOUR VIEW" */}
          <div className="flex flex-col justify-center lg:items-end z-20">

            <div className="overflow-hidden pr-2">
              <motion.h1
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[8.5rem] font-black tracking-[-0.07em] text-black dark:text-white uppercase leading-[0.82] select-none pr-1"
              >
                CHOOSE
              </motion.h1>
            </div>

            <div className="overflow-hidden flex items-center lg:justify-end gap-2 sm:gap-3 mt-[-0.08em] pr-3">
              <motion.span
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[8.5rem] font-black tracking-[-0.07em] text-black dark:text-white uppercase leading-[0.82] select-none"
              >
                YOUR
              </motion.span>
              <motion.span
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[8.5rem] font-black tracking-[-0.07em] text-black dark:text-white uppercase leading-[0.82] select-none pr-3"
              >
                VIEW
              </motion.span>
            </div>

          </div>

        </div>
      </div>

      {/* 4. DOMAIN CARDS */}
      {/* Mobile: horizontal scroll row pinned to bottom, full width */}
      <div className="sm:hidden absolute bottom-4 left-0 right-0 z-30 pointer-events-auto overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2.5 px-4 py-2 w-max">
          {DOMAINS.map((domain, index) => {
            const IconComponent = domain.icon;
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectDomain && onSelectDomain(domain.id)}
                className="relative flex items-center gap-2.5 p-2 rounded-[16px] bg-white dark:bg-white text-black shadow-[0_8px_24px_rgba(0,0,0,0.10)] border border-black/5 cursor-pointer w-[185px] shrink-0 group"
              >
                <div className="w-9 h-9 rounded-[12px] bg-[#dbe4e6] flex items-center justify-center shrink-0 shadow-inner">
                  <IconComponent className="w-4.5 h-4.5 text-black stroke-[1.75]" />
                </div>
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-start justify-between gap-1 mb-0.5">
                    <div className="flex flex-col leading-tight">
                      <span className="font-extrabold text-[11px] text-black tracking-tight">{domain.titleLine1}</span>
                      <span className="font-medium text-[10px] text-black/70 tracking-tight">{domain.titleLine2}</span>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-black shrink-0" />
                  </div>
                  <p className="text-[9.5px] text-black/55 font-medium leading-tight line-clamp-1">
                    {domain.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Desktop: pinned to bottom-right */}
      <div
        id="hero-domain-cards"
        className="hidden sm:block absolute bottom-5 sm:bottom-7 md:bottom-9 right-4 sm:right-6 md:right-10 lg:right-14 z-30 pointer-events-auto max-w-[calc(100%-3rem)] overflow-x-auto scrollbar-none py-4 px-2"
      >
        <div className="flex items-center justify-end gap-3 sm:gap-3.5 md:gap-4 py-1">
          {DOMAINS.map((domain, index) => {
            const IconComponent = domain.icon;
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.55,
                  delay: 0.75 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectDomain && onSelectDomain(domain.id)}
                className="relative flex items-center gap-3 sm:gap-3.5 p-2.5 sm:p-3 rounded-[20px] sm:rounded-[24px] bg-white dark:bg-white text-black shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-black/5 cursor-pointer transition-all duration-300 w-[225px] sm:w-[245px] md:w-[260px] shrink-0 group"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[15px] sm:rounded-[17px] bg-[#dbe4e6] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <IconComponent className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-black stroke-[1.75]" />
                </div>
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-start justify-between gap-1 mb-0.5">
                    <div className="flex flex-col leading-tight">
                      <span className="font-extrabold text-xs sm:text-[13px] text-black tracking-tight">
                        {domain.titleLine1}
                      </span>
                      <span className="font-medium text-[11px] text-black/70 tracking-tight">
                        {domain.titleLine2}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-black shrink-0 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-[10px] sm:text-[10.5px] text-black/55 font-medium leading-tight line-clamp-2">
                    {domain.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default CyberProjectsHero;
