'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '@/utils/audio';

interface IntroCanvasScreenProps {
  onExplore: () => void;
}

export function IntroCanvasScreen({ onExplore }: IntroCanvasScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [writeProgress, setWriteProgress] = useState(0); // 0 to 1
  const hasProceededRef = useRef(false);

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

  // Smooth, fluid rAF animation for the cursive write-on sweep from 'K' to 'M'
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const WRITE_DURATION = 2800; // 2.8 seconds: natural, fluid cursive handwriting cadence

    const animateWrite = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(1, elapsed / WRITE_DURATION);

      // Custom smooth handwriting cubic-bezier: natural pen start, fluid middle, soft finish
      const eased =
        rawProgress < 0.5
          ? 2 * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

      setWriteProgress(eased);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(animateWrite);
      } else {
        // Writing reached the end of 'M' -> trigger flourish & completion state
        setIsComplete(true);
        try {
          soundFx.playHover();
        } catch {
          // safe
        }

        // Rest pause (~900ms) to admire the complete, perfectly aligned signature at rest before proceeding
        setTimeout(() => {
          handleProceed();
        }, 1100);
      }
    };

    const startDelayTimer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animateWrite);
    }, 200);

    return () => {
      clearTimeout(startDelayTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [handleProceed]);

  // Safety fallback timer to guarantee transition under any browser environment
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      handleProceed();
    }, 6500);

    return () => clearTimeout(safetyTimer);
  }, [handleProceed]);

  // Calculate live pen coordinates for the glowing stylus nib
  // Text starts at x=135 ('K') and ends at x=765 ('M') in a 900-wide viewBox
  const startX = 130;
  const endX = 770;
  const penX = startX + writeProgress * (endX - startX);
  // Natural vertical pen dance tracing ascenders and baseline
  const penY = 135 + Math.sin(writeProgress * Math.PI * 14) * 9;

  // Reveal width for the SVG clip rect
  const clipWidth = Math.max(0, (writeProgress * (endX - startX + 40)));

  return (
    <motion.div
      key="intro-cursive-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      onClick={handleProceed}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-[#FFEE00] select-none overflow-hidden px-4 cursor-pointer"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Deep Obsidian Black Canvas Background */}
      <div className="absolute inset-0 bg-black pointer-events-none" />

      {/* Subtle Warm Amber Glow Centered Behind Signature */}
      <motion.div
        animate={{
          opacity: isComplete ? 0.22 : 0.12,
          scale: isComplete ? 1.08 : 1.0,
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[900px] h-[550px] bg-[#FFEE00] rounded-full blur-[170px] pointer-events-none"
      />

      {/* Main Center Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl mx-auto text-center px-4">
        <div className="relative w-full aspect-[900/250] max-h-[55vh] flex items-center justify-center">
          <svg
            viewBox="0 0 900 250"
            className="w-full h-full overflow-visible"
            style={{
              filter: isComplete
                ? 'drop-shadow(0 0 16px rgba(255, 238, 0, 0.75)) drop-shadow(0 0 38px rgba(255, 238, 0, 0.35))'
                : 'drop-shadow(0 0 10px rgba(255, 238, 0, 0.65)) drop-shadow(0 0 24px rgba(255, 238, 0, 0.25))',
              transition: 'filter 0.8s ease-out',
            }}
          >
            <defs>
              {/* Progressive Cursive Reveal ClipPath */}
              <clipPath id="cursive-reveal-clip">
                <rect
                  x="120"
                  y="0"
                  width={clipWidth}
                  height="250"
                />
              </clipPath>

              {/* Glowing Pen Tip Filter */}
              <filter id="pen-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur1" />
                <feGaussianBlur stdDeviation="7" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* The Fully Aligned, Master Calligraphic Typography "Kavinraj M" */}
            <g clipPath="url(#cursive-reveal-clip)">
              <text
                x="450"
                y="135"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#FFEE00"
                stroke="#FFEE00"
                strokeWidth="1.2"
                style={{
                  fontFamily: "var(--font-cursive), 'Great Vibes', 'Dancing Script', cursive",
                  fontSize: '138px',
                  fontWeight: 400,
                  letterSpacing: '1px',
                }}
              >
                Kavinraj M
              </text>
            </g>

            {/* Glowing Golden Stylus / Pen Tip that writes from 'K' to 'M' */}
            {!isComplete && (
              <g transform={`translate(${penX}, ${penY})`} filter="url(#pen-glow)">
                {/* Outer Radiant Aura */}
                <circle cx="0" cy="0" r="16" fill="#FFEE00" opacity="0.35" />
                {/* Concentrated Golden Glow */}
                <circle cx="0" cy="0" r="7" fill="#FFEE00" opacity="0.9" />
                {/* Intense Diamond White Core Nib */}
                <circle cx="0" cy="0" r="2.8" fill="#FFFFFF" />
              </g>
            )}

            {/* Signature Underline Flourish - sweeps smoothly after 'M' completes */}
            <motion.path
              d="M 160,195 C 320,190 580,198 740,188 C 765,186 778,180 770,172 C 760,164 742,172 748,182"
              fill="none"
              stroke="#FFEE00"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isComplete
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                pathLength: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
                opacity: { duration: 0.1 },
              }}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default IntroCanvasScreen;
