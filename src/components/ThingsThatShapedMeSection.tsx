'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowDown, 
  Shield, 
  Users, 
  Fingerprint, 
  DownloadCloud, 
  TrendingUp, 
  CheckCircle2, 
  Flame, 
  Heart,
  Zap,
  Activity
} from 'lucide-react';

export const ThingsThatShapedMeSection: React.FC = () => {
  return (
    <section 
      id="things-that-shaped-me" 
      className="relative z-30 w-full py-20 sm:py-28 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#FAFAFC] dark:bg-[#09080F] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-hidden border-t border-zinc-200/60 dark:border-zinc-800/60"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-bold font-mono uppercase tracking-wider mb-4 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Foundational Drivers · Core DNA</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-950 dark:text-white tracking-tight leading-tight"
          >
            Things that shaped me
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            The core philosophies, technical disciplines, and enduring principles that define my approach to building products.
          </motion.p>
        </div>

        {/* 5-Card Bento Grid Layout Matching Screenshot in Pristine White Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">

          {/* ======================================================== */}
          {/* ROW 1 - CARD 1 (Top Left, col-span-2): 100% Customizable */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-white dark:bg-[#12111A] border border-zinc-200/80 dark:border-zinc-800/80 rounded-[30px] p-8 sm:p-10 flex flex-col items-center justify-center text-center shadow-[0_10px_35px_-5px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_35px_-5px_rgba(0,0,0,0.5)] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 min-h-[300px]"
          >
            {/* 100% Badge with Hand-Drawn / Sleek Oval Outline */}
            <div className="relative flex items-center justify-center mb-8">
              <svg className="w-56 h-28 text-zinc-800 dark:text-zinc-200 overflow-visible" viewBox="0 0 200 100" fill="none">
                {/* Hand-drawn effect double ellipse */}
                <ellipse 
                  cx="100" 
                  cy="50" 
                  rx="85" 
                  ry="36" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  className="opacity-75"
                  strokeDasharray="400"
                  strokeDashoffset="10"
                />
                <ellipse 
                  cx="98" 
                  cy="52" 
                  rx="82" 
                  ry="33" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeLinecap="round"
                  className="opacity-35"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl font-black text-zinc-950 dark:text-white tracking-tight font-sans">
                100%
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Customizable
            </h3>
          </motion.div>

          {/* ======================================================== */}
          {/* ROW 1 - CARD 2 (Top Middle, col-span-2): Secure by default */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 bg-white dark:bg-[#12111A] border border-zinc-200/80 dark:border-zinc-800/80 rounded-[30px] p-8 sm:p-10 flex flex-col items-center justify-center text-center shadow-[0_10px_35px_-5px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_35px_-5px_rgba(0,0,0,0.5)] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 min-h-[300px]"
          >
            {/* Circular Fingerprint Icon Container with Laser Scan Line */}
            <div className="w-24 h-24 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center relative overflow-hidden mb-6 shadow-xs">
              <svg className="w-12 h-12 text-zinc-800 dark:text-zinc-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 0 0-10 10c0 3 1.5 6 4 7.5" />
                <path d="M8.5 7.5A5 5 0 0 1 12 6a5 5 0 0 1 5 5c0 2-1 4-2.5 5" />
                <path d="M12 10a2 2 0 0 0-2 2c0 2 1.5 4 4 4" />
                <path d="M5 12a7 7 0 0 1 7-7 7 7 0 0 1 7 7c0 3-1.5 5.5-3.5 7" />
                <path d="M12 14v4" />
              </svg>

              {/* Glowing Scan Line */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight mb-2.5">
              Secure by default
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xs leading-relaxed font-normal">
              Provident fugit and vero voluptate. magnam magni doloribus dolores voluptates a sapiente nisi.
            </p>
          </motion.div>

          {/* ======================================================== */}
          {/* ROW 1 - CARD 3 (Top Right, col-span-2): Faster than light (Download & Wave) */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-white dark:bg-[#12111A] border border-zinc-200/80 dark:border-zinc-800/80 rounded-[30px] p-8 sm:p-10 flex flex-col justify-between text-center shadow-[0_10px_35px_-5px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_35px_-5px_rgba(0,0,0,0.5)] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 min-h-[300px]"
          >
            {/* Top Download Metric & Wave Graphic */}
            <div className="w-full flex flex-col">
              {/* Metric Row */}
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono font-medium mb-3 px-1">
                <div className="flex items-center gap-1.5">
                  <ArrowDown className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                  <span>Download</span>
                </div>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">14,34 mbps</span>
              </div>

              {/* Mountain / Audio Wave Line */}
              <div className="w-full h-14 relative flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full text-zinc-800 dark:text-zinc-200" viewBox="0 0 200 60" fill="none" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M 0 45 Q 15 45 25 35 Q 35 25 45 40 Q 55 55 65 30 Q 75 10 85 45 Q 95 50 105 30 Q 115 15 125 40 Q 135 50 145 20 Q 155 10 165 35 Q 175 48 185 22 Q 195 25 200 35 L 200 60 L 0 60 Z" 
                    fill="url(#waveGradient)" 
                  />
                  <path 
                    d="M 0 45 Q 15 45 25 35 Q 35 25 45 40 Q 55 55 65 30 Q 75 10 85 45 Q 95 50 105 30 Q 115 15 125 40 Q 135 50 145 20 Q 155 10 165 35 Q 175 48 185 22 Q 195 25 200 35" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom Titles */}
            <div className="mt-4">
              <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight mb-2">
                Faster than light
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed font-normal">
                Provident fugit vero voluptate. magnam magni doloribus dolores voluptates inventore nisi.
              </p>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* ROW 2 - CARD 4 (Bottom Left, col-span-3): Faster than light + Stock/Growth Graph */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-3 bg-white dark:bg-[#12111A] border border-zinc-200/80 dark:border-zinc-800/80 rounded-[30px] p-7 sm:p-9 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_35px_-5px_rgba(0,0,0,0.5)] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center w-full">
              
              {/* Left Column: Shield Icon + Text */}
              <div className="sm:col-span-6 flex flex-col justify-center">
                {/* Shield Icon in Circle */}
                <div className="w-11 h-11 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center mb-6 text-zinc-800 dark:text-zinc-200 shadow-xs">
                  <Shield className="w-5 h-5 stroke-[1.8]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight mb-2.5">
                  Faster than light
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  Provident fugit vero voluptate. Voluptates a sapiente inventore nisi.
                </p>
              </div>

              {/* Right Column: Mini Window Container with Stock Graph */}
              <div className="sm:col-span-6 bg-zinc-900 dark:bg-zinc-950 text-white rounded-2xl p-4 border border-zinc-800 flex flex-col justify-between h-44 shadow-md overflow-hidden relative">
                {/* Window Top Controls Dots */}
                <div className="flex items-center gap-1.5 z-10">
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                </div>

                {/* Jagged Upward Trending Vector Graph */}
                <div className="w-full h-28 relative mt-auto flex items-end">
                  <svg className="w-full h-full text-white" viewBox="0 0 160 80" fill="none" preserveAspectRatio="none">
                    <path 
                      d="M 5 65 L 12 70 L 22 55 L 30 62 L 40 40 L 48 52 L 56 46 L 65 60 L 75 35 L 85 48 L 95 30 L 105 45 L 115 25 L 125 38 L 135 18 L 145 24 L 155 8" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* ROW 2 - CARD 5 (Bottom Right, col-span-3): Keep your loved ones safe + Avatar Pills */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 bg-white dark:bg-[#12111A] border border-zinc-200/80 dark:border-zinc-800/80 rounded-[30px] p-7 sm:p-9 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_35px_-5px_rgba(0,0,0,0.5)] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center w-full">
              
              {/* Left Column: Users Icon + Text */}
              <div className="sm:col-span-6 flex flex-col justify-center">
                {/* Users Icon in Circle */}
                <div className="w-11 h-11 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center mb-6 text-zinc-800 dark:text-zinc-200 shadow-xs">
                  <Users className="w-5 h-5 stroke-[1.8]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight mb-2.5">
                  Keep your loved ones safe
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  Voluptate. magnam magni doloribus dolores voluptates a sapiente nisi.
                </p>
              </div>

              {/* Right Column: Floating Avatar Pills in Staggered Layout */}
              <div className="sm:col-span-6 flex flex-col gap-3.5 items-end justify-center py-2 pr-2">
                
                {/* Pill 1 (Top): [Likeur] (Avatar) */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 dark:bg-zinc-800 text-white shadow-sm border border-zinc-800 dark:border-zinc-700/80">
                  <span className="text-xs font-semibold">Likeur</span>
                  <div className="w-6 h-6 rounded-full bg-zinc-700 overflow-hidden flex items-center justify-center text-[10px] font-bold border border-zinc-600">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" 
                      alt="Likeur" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Pill 2 (Middle, Offset Right): (Avatar) [M. Irung] */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 dark:bg-zinc-800 text-white shadow-sm border border-zinc-800 dark:border-zinc-700/80 translate-x-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-700 overflow-hidden flex items-center justify-center text-[10px] font-bold border border-zinc-600">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" 
                      alt="M. Irung" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-semibold">M. Irung</span>
                </div>

                {/* Pill 3 (Bottom): [B. Ng] (Avatar) */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 dark:bg-zinc-800 text-white shadow-sm border border-zinc-800 dark:border-zinc-700/80">
                  <span className="text-xs font-semibold">B. Ng</span>
                  <div className="w-6 h-6 rounded-full bg-zinc-700 overflow-hidden flex items-center justify-center text-[10px] font-bold border border-zinc-600">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80" 
                      alt="B. Ng" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ThingsThatShapedMeSection;
