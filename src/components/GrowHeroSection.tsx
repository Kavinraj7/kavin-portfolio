'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Star, Terminal, ArrowRight, Code2, Users } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { InteractiveHeroBackground } from './ui/InteractiveHeroBackground';

interface GrowHeroSectionProps {
  onOpenTerminal?: () => void;
  onNavigateJourney?: () => void;
}

export const GrowHeroSection: React.FC<GrowHeroSectionProps> = ({
  onOpenTerminal,
  onNavigateJourney,
}) => {
  const [techStackAnswered, setTechStackAnswered] = useState(true);
  const [leadershipAnswered, setLeadershipAnswered] = useState(true);

  const handleLaunchTerminal = () => {
    soundFx.playTerminal();
    onOpenTerminal?.();
  };

  const handleJourneyClick = () => {
    soundFx.playSelect();
    onNavigateJourney?.();
  };

  return (
    <section className="relative w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] flex flex-col justify-between bg-[#E5E5E8] dark:bg-[#13111C] text-black dark:text-zinc-100 font-sans selection:bg-black selection:text-white px-4 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-4 overflow-hidden transition-colors duration-300 isolate">
      {/* Interactive Background Layer */}
      <InteractiveHeroBackground />

      {/* HERO MAIN CONTENT GRID - Fits single viewport */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center my-auto w-full max-w-[1440px] mx-auto">

        {/* LEFT COLUMN: Typography & Identity */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center max-w-xl">

          {/* Identity Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 mb-1 sm:mb-2"
          >
            <div className="w-7 h-7 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shrink-0 shadow-sm transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-white dark:text-black" />
            </div>
            <div className="leading-tight">
              <div className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white tracking-tight">Kavinraj | Portfolio</div>
              <div className="text-[11px] sm:text-xs text-zinc-700 dark:text-zinc-300">
                Multidisciplinary Identity · <button onClick={handleJourneyClick} className="underline font-semibold decoration-zinc-900 dark:decoration-white hover:text-black dark:hover:text-white cursor-pointer">Explore My Journey</button>
              </div>
            </div>
          </motion.div>

          {/* Headline "Grow⁺" */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-start select-none"
          >
            <h1
              className="text-[64px] sm:text-[80px] md:text-[96px] lg:text-[104px] xl:text-[114px] font-normal tracking-[-0.035em] text-zinc-950 dark:text-white leading-[0.92] my-1 transition-colors"
              style={{ fontFamily: 'var(--font-serif), "Playfair Display", Georgia, serif' }}
            >
              Kavinraj M
            </h1>
          </motion.div>

          {/* Hairline Divider 1 */}
          <div className="w-full h-[1px] bg-zinc-300/80 dark:bg-zinc-700/80 my-2 sm:my-3" />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-[17px] text-zinc-800 dark:text-zinc-200 font-medium leading-[1.35] tracking-tight max-w-[480px]"
          >
            Driving Software Innovation, Business Leadership, And Data-Powered Solutions — Up To 50× Faster.
          </motion.p>

          {/* Social Proof / Rating */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 my-2.5 sm:my-3"
          >
            <div className="relative">
              <svg className="absolute -top-2 -left-2 w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="4" y1="4" x2="8" y2="8" />
                <line x1="2" y1="12" x2="7" y2="12" />
                <line x1="12" y1="2" x2="12" y2="7" />
              </svg>
              <img
                src="/AI-avatar.png"
                alt="Kavin AI Avatar"
                className="w-8 h-8 rounded-full object-cover border border-white/80 dark:border-zinc-700 shadow-sm"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xs sm:text-[13px] font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">
                Software Engineer & Leader
              </span>
              <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium leading-tight">
                4 Core Disciplines
              </span>
            </div>

            <span className="text-zinc-400 font-light text-sm mx-1">/</span>

            <div className="flex items-center gap-1 text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-white tracking-tight">
              <Star className="w-3.5 h-3.5 fill-black dark:fill-white text-black dark:text-white inline-block -mt-0.5" />
              <span>5.0</span>
            </div>
          </motion.div>

          {/* Hairline Divider 2 */}
          <div className="w-full h-[1px] bg-zinc-300/80 dark:bg-zinc-700/80 my-2 sm:my-3" />

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mt-1"
          >
            <button
              onClick={handleJourneyClick}
              className="bg-black hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white text-xs sm:text-sm font-semibold px-6 py-2.5 sm:py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer active:scale-95 flex items-center gap-2"
            >
              <span>Explore Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleLaunchTerminal}
              className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white hover:text-black dark:hover:text-zinc-300 transition-colors flex items-center gap-1.5 cursor-pointer group"
            >
              <Terminal className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="underline decoration-zinc-900 dark:decoration-white decoration-1 underline-offset-4">Interactive AI Terminal</span>
            </button>
          </motion.div>

          {/* WELCOME TO MY PAGE / LAUNCH TERMINAL BOX - Placed directly below the CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-4 sm:mt-5 max-w-[500px]"
          >
            <button
              onClick={handleLaunchTerminal}
              className="w-full group relative overflow-hidden rounded-2xl bg-zinc-900 dark:bg-[#1A1626] text-white px-4 sm:px-5 py-2.5 sm:py-3 border border-zinc-700/60 dark:border-purple-500/30 shadow-md hover:shadow-xl hover:border-purple-400/80 transition-all duration-300 flex flex-row items-center justify-between gap-3 cursor-pointer text-left"
            >
              {/* Ambient Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/15 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Left: Terminal Icon + Message */}
              <div className="relative z-10 flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-400/50 flex items-center justify-center text-purple-300 shrink-0 group-hover:scale-105 transition-transform">
                  <Terminal className="w-4 h-4 text-purple-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-[13px] font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="truncate">Welcome to my page.</span>
                    <span className="inline-block px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-semibold rounded-full border border-emerald-500/30 shrink-0">ONLINE</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 dark:text-zinc-400 leading-tight mt-0.5 truncate">
                    Click here to Launch <span className="text-purple-300 font-semibold underline underline-offset-2">Kavin AI Terminal</span>
                  </p>
                </div>
              </div>

              {/* Right: Pill Button */}
              <div className="relative z-10 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-black font-semibold text-[11px] sm:text-xs shadow-sm group-hover:bg-purple-300 group-hover:text-black transition-colors shrink-0">
                <span className="font-mono font-bold">&gt;_ Launch</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: AI Avatar with Violet/Black Shaded Backdrop & Questions */}
        <div className="lg:col-span-6 xl:col-span-6 flex justify-center items-center relative py-2 sm:py-4">

          <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[390px] lg:max-w-[410px]">

            {/* Violet and Black Shaded Avatar Card Backdrop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/4.7] rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(76,29,149,0.25)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-gradient-to-b from-[#7C3AED] via-[#3B0764] to-[#0A0518] flex items-center justify-center p-3 border border-purple-400/30 dark:border-purple-500/20"
            >
              {/* Violet Ambient Radial Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(167,139,250,0.35),transparent_70%)] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0518]/90 via-transparent to-purple-400/10 pointer-events-none" />

              <img
                src="/AI-avatar.png"
                alt="Kavin AI Avatar"
                className="w-full h-full object-contain object-bottom transform scale-105 hover:scale-110 transition-transform duration-500 select-none pointer-events-none z-10"
              />

              {/* Central Floating Quick Pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLaunchTerminal}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-black/90 backdrop-blur-md shadow-lg text-zinc-900 dark:text-white font-mono text-[11px] font-bold border border-white/80 dark:border-white/20 hover:bg-white transition-colors cursor-pointer group"
                >
                  <Terminal className="w-3 h-3 text-purple-600 dark:text-purple-400 group-hover:rotate-12 transition-transform" />
                  <span>Talk with Kavin AI</span>
                </motion.button>
              </div>
            </motion.div>

            {/* FLOATING QUESTION 1: "What is my tech stack?" */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 0 }}
              animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                y: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
              }}
              className="absolute top-[16%] -left-3 sm:-left-7 md:-left-10 z-30"
            >
              <button
                onClick={() => setTechStackAnswered(!techStackAnswered)}
                className="flex items-center gap-2 bg-white/95 dark:bg-[#1C182A]/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.12)] border border-white/80 dark:border-purple-500/30 text-xs font-semibold text-zinc-900 dark:text-white cursor-pointer hover:bg-white dark:hover:bg-[#252038] transition-all hover:scale-105"
              >
                <div className={`w-4.5 h-4.5 rounded-md flex items-center justify-center transition-colors ${techStackAnswered ? 'bg-[#8B5CF6] text-white' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'}`}>
                  <Code2 className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-[11px] sm:text-xs">What is my tech stack?</span>
              </button>
            </motion.div>

            {/* FLOATING QUESTION 2: "Explore my leadership role?" */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 0 }}
              animate={{ opacity: 1, x: 0, y: [0, 4, 0] }}
              transition={{
                duration: 0.6,
                delay: 0.45,
                y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }
              }}
              className="absolute top-[38%] -left-4 sm:-left-9 md:-left-14 z-30"
            >
              <button
                onClick={() => setLeadershipAnswered(!leadershipAnswered)}
                className="flex items-center gap-2 bg-white/95 dark:bg-[#1C182A]/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.12)] border border-white/80 dark:border-purple-500/30 text-xs font-semibold text-zinc-900 dark:text-white cursor-pointer hover:bg-white dark:hover:bg-[#252038] transition-all hover:scale-105"
              >
                <div className={`w-4.5 h-4.5 rounded-md flex items-center justify-center transition-colors ${leadershipAnswered ? 'bg-[#3B82F6] text-white' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'}`}>
                  <Users className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-[11px] sm:text-xs">Explore my leadership role?</span>
              </button>
            </motion.div>

          </div>
        </div>
      </div>

      {/* CENTER BOTTOM SOCIAL ICONS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-10 flex items-center justify-center gap-3.5 pt-2 pb-0.5"
      >
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-9 h-9 rounded-full bg-white/80 dark:bg-[#1E1A2D]/80 backdrop-blur-md border border-zinc-300/60 dark:border-purple-500/30 shadow-xs flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] hover:bg-white dark:hover:bg-[#252038] hover:scale-110 hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="w-9 h-9 rounded-full bg-white/80 dark:bg-[#1E1A2D]/80 backdrop-blur-md border border-zinc-300/60 dark:border-purple-500/30 shadow-xs flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-[#252038] hover:scale-110 hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="w-9 h-9 rounded-full bg-white/80 dark:bg-[#1E1A2D]/80 backdrop-blur-md border border-zinc-300/60 dark:border-purple-500/30 shadow-xs flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-[#25D366] dark:hover:text-[#25D366] hover:bg-white dark:hover:bg-[#252038] hover:scale-110 hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.09-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
          </svg>
        </a>
      </motion.div>

    </section>
  );
};
