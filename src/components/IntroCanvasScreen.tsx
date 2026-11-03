'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { CanvasText } from '@/components/ui/canvas-text';
import { soundFx } from '@/utils/audio';

interface IntroCanvasScreenProps {
  onExplore: () => void;
}

export function IntroCanvasScreen({ onExplore }: IntroCanvasScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [fontSize, setFontSize] = useState(150);
  const hasProceededRef = useRef(false);

  // Responsive font size calculation for the particle dot pattern headline
  useEffect(() => {
    const updateFontSize = () => {
      if (typeof window !== 'undefined') {
        const w = window.innerWidth;
        if (w < 440) {
          setFontSize(56);
        } else if (w < 640) {
          setFontSize(78);
        } else if (w < 1024) {
          setFontSize(112);
        } else if (w < 1440) {
          setFontSize(152);
        } else {
          setFontSize(188);
        }
      }
    };

    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  const handleProceed = useCallback(() => {
    if (hasProceededRef.current) return;
    hasProceededRef.current = true;
    setIsExiting(true);

    try {
      soundFx.playSelect();
    } catch {
      // Audio safe fallback
    }

    setTimeout(() => {
      onExplore();
    }, 450);
  }, [onExplore]);

  // When the automated hover wave ripples across each character and settles
  const handleWaveComplete = useCallback(() => {
    // Graceful pause (650ms) to admire the complete, crisp dot pattern at rest before proceeding
    setTimeout(() => {
      handleProceed();
    }, 650);
  }, [handleProceed]);

  // Safety fallback timer to ensure the intro advances smoothly under all system conditions
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      handleProceed();
    }, 8500);

    return () => clearTimeout(fallbackTimer);
  }, [handleProceed]);

  return (
    <motion.div
      key="intro-canvas-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-zinc-950 select-none overflow-hidden px-4 pointer-events-none"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Clean White Light-Theme Background */}
      <div className="absolute inset-0 bg-white pointer-events-none" />

      {/* Subtle Warm Amber Glow Behind Headline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FFEE00]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Center Container spanning screen width */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[98vw] mx-auto text-center pointer-events-none">
        {/* Massive Screen-Filling Particle Canvas Headline for Kavinraj M */}
        <div className="w-full flex items-center justify-center min-h-[140px] sm:min-h-[180px] md:min-h-[240px] lg:min-h-[280px] pointer-events-none">
          <CanvasText
            text="Kavinraj M"
            color="#121214"
            fontSize={fontSize}
            fontWeight={750}
            particleSize={2.1}
            density={3.0}
            scatter={76}
            loadDuration={1.2}
            morphDuration={1.6}
            autoWave={true}
            autoWaveDelay={0.8}
            autoWaveDuration={2.6}
            autoWaveRadius={26}
            disableMouse={true}
            magnetic={0}
            drift={0}
            onWaveComplete={handleWaveComplete}
            className="w-full max-w-[98vw] h-[140px] sm:h-[180px] md:h-[240px] lg:h-[280px] flex items-center justify-center pointer-events-none"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default IntroCanvasScreen;
