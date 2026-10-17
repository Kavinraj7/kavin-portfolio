'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CanvasText } from '@/components/ui/canvas-text';
import { soundFx } from '@/utils/audio';

interface IntroCanvasScreenProps {
  onExplore: () => void;
}

export function IntroCanvasScreen({ onExplore }: IntroCanvasScreenProps) {
  const [showButton, setShowButton] = useState(false);
  const [fontSize, setFontSize] = useState(150);

  useEffect(() => {
    const updateFontSize = () => {
      if (typeof window !== 'undefined') {
        const w = window.innerWidth;
        if (w < 440) {
          setFontSize(58);
        } else if (w < 640) {
          setFontSize(80);
        } else if (w < 1024) {
          setFontSize(115);
        } else if (w < 1440) {
          setFontSize(155);
        } else {
          setFontSize(195);
        }
      }
    };

    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  // Show the EXPLORE button once the animation of the name is completely finished (loadDuration 1.0s + morphDuration 1.4s = 2.4s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const handleExplore = () => {
    try {
      soundFx.playSelect();
    } catch {
      // Audio engine fallback safe
    }
    onExplore();
  };

  return (
    <motion.div
      key="intro-canvas-screen"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.01,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-black select-none overflow-hidden px-4"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Clean White Light-Theme Background */}
      <div className="absolute inset-0 bg-white pointer-events-none" />

      {/* Main Center Container spanning screen width */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[98vw] mx-auto text-center">
        {/* Massive Screen-Filling Particle Canvas Headline for Kavinraj M */}
        <div className="w-full flex items-center justify-center min-h-[140px] sm:min-h-[180px] md:min-h-[240px] lg:min-h-[280px]">
          <CanvasText
            text="Kavinraj M"
            color="#000000"
            fontSize={fontSize}
            fontWeight={900}
            particleSize={2.4}
            density={2}
            scatter={76}
            loadDuration={1.0}
            morphDuration={1.4}
            magnetic={0.5}
            magneticRadius={180}
            drift={0.6}
            className="w-full max-w-[98vw] h-[140px] sm:h-[180px] md:h-[240px] lg:h-[280px] flex items-center justify-center"
          />
        </div>

        {/* Compact EXPLORE Button placed close below the name - Appears once name animation finishes */}
        <div className="min-h-[44px] mt-1 sm:mt-2 md:mt-3 flex items-center justify-center">
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  id="explore-portfolio-btn"
                  onClick={handleExplore}
                  aria-label="Explore Portfolio"
                  className="group relative inline-flex items-center justify-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#FFEE00] hover:bg-[#E5C800] active:bg-[#D4B800] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-black/10"
                >
                  <span>EXPLORE</span>
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default IntroCanvasScreen;
