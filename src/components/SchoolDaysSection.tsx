'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, GraduationCap, X, Award, BookOpen, Star, Trophy } from 'lucide-react';
import { soundFx } from '@/utils/audio';

// Custom SVG Binder Clip Icon matching the reference image aesthetic
const BinderClipIcon = ({ className = "w-10 h-10 text-zinc-900" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Clip Body / Clamp */}
    <path d="M18 36 L46 36 L44 54 L20 54 Z" fill="#18181B" stroke="#18181B" />
    <line x1="22" y1="36" x2="42" y2="36" stroke="#FFFFFF" strokeWidth="1.5" />
    {/* Silver Wire Handles */}
    <path d="M26 36 C24 24, 26 12, 32 12 C38 12, 40 24, 38 36" stroke="#27272A" strokeWidth="2.5" fill="none" />
    <path d="M29 36 C28 26, 30 18, 32 18 C34 18, 36 26, 35 36" stroke="#52525B" strokeWidth="1.8" fill="none" />
  </svg>
);

// Mini clip for top of badges
const MiniBadgeClip = () => (
  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
    <div className="w-5 h-4 border-2 border-zinc-900 rounded-t-sm bg-transparent" />
    <div className="w-8 h-3.5 bg-zinc-900 rounded-sm shadow-sm flex items-center justify-center">
      <div className="w-5 h-0.5 bg-zinc-400" />
    </div>
  </div>
);

export const SchoolDaysSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    soundFx.playSelect();
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    if (willOpen) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  };

  return (
    <div ref={sectionRef} className="w-full bg-[#FFFFFF] border-t border-zinc-200">
      {/* 1. Mini Prompt Bar - Full Width */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border border-zinc-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center flex-shrink-0 text-2xl">
              🎒
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start text-xs font-mono font-bold tracking-widest text-purple-700 uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Memories &bull; Formative Years</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
                Wanna have a glance at my school days??
              </h3>
            </div>
          </div>

          <button
            onClick={toggleOpen}
            className="group px-7 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm tracking-wide flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-lg cursor-pointer flex-shrink-0"
            aria-expanded={isOpen}
          >
            <span>{isOpen ? 'Close Memories' : 'Dropdown'}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* 2. Single-Viewport Expandable Template "My School Achievements" - Full Width */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-[#FAFAFA] border-t border-b border-zinc-200"
          >
            <div className="w-full h-screen min-h-[600px] max-h-[1080px] px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 flex flex-col justify-between overflow-hidden">
              {/* Compact Header */}
              <div className="flex items-center justify-between relative mb-4 sm:mb-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-mono text-[11px] font-bold tracking-widest uppercase">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Early Foundation</span>
                  </div>
                  <h2 className="font-display font-black tracking-tight text-2xl sm:text-4xl md:text-5xl text-zinc-950 uppercase leading-none">
                    My School Achievements
                  </h2>
                </div>

                {/* Close button */}
                <button
                  onClick={toggleOpen}
                  className="p-2.5 rounded-full bg-zinc-200 hover:bg-zinc-300 text-zinc-800 transition-transform active:scale-95 cursor-pointer shadow-sm flex items-center gap-1 text-xs font-bold"
                  title="Close Section"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>

              {/* Exact Bento / Collage Grid Fitting the Single Viewport */}
              <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-4 sm:gap-5 items-stretch">
                {/* 1. Top-Left: Pastel Pink Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="md:col-span-3 row-span-1 rounded-[1.75rem] bg-[#F7A8B4] p-5 sm:p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[11px] font-extrabold tracking-widest text-zinc-900 uppercase opacity-85">
                      HONORS
                    </span>
                    <Star className="w-5 h-5 text-zinc-900 fill-zinc-900/20" />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight leading-none mb-1.5">
                      TOP 1%
                    </div>
                    <p className="text-xs sm:text-[13px] font-bold text-zinc-900/90 leading-tight">
                      Board Academic Distinction &amp; School Topper in STEM Subjects.
                    </p>
                  </div>
                </motion.div>

                {/* 2. Top-Middle: White Minimalist Card with Binder Clip Graphic */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="md:col-span-3 row-span-1 rounded-[1.75rem] bg-[#FFFFFF] border border-zinc-200/90 p-4 sm:p-5 flex flex-col items-center justify-center relative overflow-hidden group shadow-sm hover:shadow-md transition-all text-center"
                >
                  <div className="relative mb-2 flex flex-col items-center">
                    <BinderClipIcon className="w-12 sm:w-14 h-12 sm:h-14 text-zinc-900 drop-shadow-sm group-hover:scale-105 transition-transform" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                    NOTEBOOK &bull; ARCHIVE
                  </span>
                  <p className="text-xs font-semibold text-zinc-700 leading-snug px-1">
                    Science Fair 1st Prize &bull; Algorithmic Logic &amp; Robotics Prototype
                  </p>
                </motion.div>

                {/* 3. Top-Right: Wide Pastel Lavender Card with "HELLO!" Clipped Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  className="md:col-span-6 row-span-1 rounded-[1.75rem] bg-[#B2B8DB] p-5 sm:p-6 flex items-center justify-center relative shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Clipped White Frame */}
                  <div className="relative bg-[#FFFFFF] border-2 border-zinc-950 px-8 sm:px-12 py-4 sm:py-5 rounded-md shadow-md flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-transform">
                    <MiniBadgeClip />
                    <h3 className="font-black text-3xl sm:text-5xl md:text-6xl text-zinc-950 tracking-wider select-none font-display leading-none">
                      HELLO!
                    </h3>
                    <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-600 mt-2">
                      Head Boy &bull; Student Council Leader
                    </span>
                  </div>
                </motion.div>

                {/* 4. Bottom-Left: Wide Pastel Mint Green Card with "K" Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  className="md:col-span-6 row-span-1 rounded-[1.75rem] bg-[#A3D9C9] p-5 sm:p-6 flex items-center justify-center relative shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Framed White Square Badge */}
                  <div className="bg-[#FFFFFF] border-2 border-zinc-950 w-44 sm:w-52 h-44 sm:h-52 rounded-md shadow-md p-3 sm:p-4 flex flex-col items-center justify-between text-center group hover:scale-[1.02] transition-transform">
                    <div />
                    <div className="relative">
                      <span className="text-6xl sm:text-7xl md:text-8xl font-black text-zinc-950 leading-none select-none tracking-tighter block font-display">
                        K
                      </span>
                    </div>
                    <div>
                      <div className="font-black text-xs sm:text-sm text-zinc-950 tracking-widest uppercase">
                        KAVINRAJ
                      </div>
                      <div className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                        Class of Excellence
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 5 & 6. Bottom-Middle Column: Peach and Yellow Clip Cards */}
                <div className="md:col-span-3 row-span-1 grid grid-rows-2 gap-3 sm:gap-4 h-full">
                  {/* 5. Peach Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.25 }}
                    className="rounded-2xl sm:rounded-[1.25rem] bg-[#F9BA8D] flex flex-col items-center justify-center p-3 shadow-sm hover:shadow-md transition-all group"
                  >
                    <BinderClipIcon className="w-9 sm:w-10 h-9 sm:h-10 text-zinc-950 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-zinc-900 mt-1">
                      OLYMPIAD 100/100
                    </span>
                  </motion.div>

                  {/* 6. Yellow Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.3 }}
                    className="rounded-2xl sm:rounded-[1.25rem] bg-[#F6DE8F] flex flex-col items-center justify-center p-3 shadow-sm hover:shadow-md transition-all group"
                  >
                    <BinderClipIcon className="w-9 sm:w-10 h-9 sm:h-10 text-zinc-950 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-zinc-900 mt-1">
                      QUIZ CHAMPION
                    </span>
                  </motion.div>
                </div>

                {/* 7. Bottom-Right: Pastel Powder Blue Card with Framed Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.35 }}
                  className="md:col-span-3 row-span-1 rounded-[1.75rem] bg-[#AEC2D6] p-4 sm:p-5 flex items-center justify-center relative shadow-sm hover:shadow-md transition-all"
                >
                  {/* Framed Quote Box */}
                  <div className="bg-[#FFFFFF] border-2 border-zinc-950 p-4 sm:p-5 rounded-md shadow-md text-center group hover:scale-[1.02] transition-transform w-full">
                    <p className="font-extrabold text-xs sm:text-sm text-zinc-950 leading-snug">
                      When a problem comes along you must <span className="underline decoration-2 underline-offset-4 decoration-purple-600">CLIP</span> it!
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-zinc-200 flex items-center justify-center gap-1 text-[10px] font-mono font-bold text-zinc-500 uppercase">
                      <Trophy className="w-3 h-3 text-yellow-600" />
                      <span>Best All-Rounder</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Minimal Bottom Footer */}
              <div className="mt-3 text-center flex-shrink-0">
                <p className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest font-semibold">
                  Curiosity &bull; Tenacity &bull; Formative Roots &bull; Lifelong Learning
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SchoolDaysSection;
