'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LuffyPeekingVideo from './luffy-peeking-video';

interface CursiveNameIntroProps {
  onWritingComplete?: () => void;
  onVideoEnd?: () => void;
  videoDone?: boolean;
  badgeMessage?: string;
  isCompleted?: boolean;
  destroyedLetters?: Set<number>;
  letterRefs?: React.MutableRefObject<(HTMLSpanElement | null)[]>;
}

const NAME_LETTERS = ['K', 'a', 'v', 'i', 'n', 'r', 'a', 'j', 'M'];

// Character breakdown pieces falling downwards under gravity
const SHARDS = [
  { x: -8, y: [0, 25, 60], r: -25, w: 10, h: 14, clip: 'polygon(0% 0%, 100% 10%, 80% 100%, 0% 90%)' },
  { x: 8, y: [0, 35, 75], r: 35, w: 12, h: 16, clip: 'polygon(15% 0%, 100% 0%, 85% 90%, 0% 100%)' },
  { x: -16, y: [0, 20, 50], r: -40, w: 9, h: 12, clip: 'polygon(0% 20%, 90% 0%, 100% 80%, 10% 100%)' },
  { x: 18, y: [0, 42, 85], r: 45, w: 14, h: 18, clip: 'polygon(30% 0%, 100% 30%, 70% 100%, 0% 70%)' },
  { x: -22, y: [0, 30, 65], r: -30, w: 11, h: 15, clip: 'polygon(10% 0%, 100% 40%, 60% 100%, 0% 60%)' },
  { x: 28, y: [0, 45, 92], r: 50, w: 10, h: 14, clip: 'polygon(0% 0%, 80% 20%, 100% 100%, 20% 80%)' },
  { x: -12, y: [0, 26, 58], r: -20, w: 13, h: 12, clip: 'polygon(40% 0%, 100% 20%, 60% 100%, 0% 80%)' },
  { x: 32, y: [0, 50, 98], r: 60, w: 8, h: 16, clip: 'polygon(10% 10%, 90% 0%, 100% 90%, 0% 100%)' },
];

// Sand & dust particles dropping downwards down the character and vanishing into dust
const DUST_PARTICLES = [
  { x: [0, 6, 12], y: [0, 35, 75], size: 26, delay: 0.0, blur: 'blur(5px)' },
  { x: [0, -8, -16], y: [0, 45, 95], size: 32, delay: 0.04, blur: 'blur(7px)' },
  { x: [0, 14, 25], y: [0, 28, 65], size: 22, delay: 0.02, blur: 'blur(4px)' },
  { x: [0, 4, 10], y: [0, 55, 110], size: 38, delay: 0.07, blur: 'blur(9px)' },
  { x: [0, -12, -22], y: [0, 38, 80], size: 28, delay: 0.03, blur: 'blur(6px)' },
  { x: [0, 20, 35], y: [0, 48, 100], size: 34, delay: 0.06, blur: 'blur(8px)' },
  { x: [0, 2, 5], y: [0, 60, 120], size: 24, delay: 0.08, blur: 'blur(5px)' },
  { x: [0, -6, -12], y: [0, 30, 70], size: 30, delay: 0.01, blur: 'blur(6px)' },
];

export default function CursiveNameIntro({
  onWritingComplete,
  onVideoEnd,
  videoDone,
  badgeMessage,
  isCompleted,
  destroyedLetters,
  letterRefs,
}: CursiveNameIntroProps) {
  const [writingDone, setWritingDone] = useState(isCompleted || false);
  const writingDurationSeconds = 3.2; // Smooth real-time handwriting stroke duration

  useEffect(() => {
    if (isCompleted) {
      setWritingDone(true);
      return;
    }

    // Trigger video playback immediately when handwriting finishes
    const timer = setTimeout(() => {
      setWritingDone(true);
      if (onWritingComplete) {
        onWritingComplete();
      }
    }, writingDurationSeconds * 1000);

    return () => clearTimeout(timer);
  }, [onWritingComplete, isCompleted]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none overflow-visible py-0 my-0">
      {/* Outer container wrapping both video and cursive text */}
      <div className="relative inline-block w-full text-center px-2 sm:px-4 md:px-8 overflow-visible">
        {/* Luffy Video positioned directly over top of 'inr' (plays while !videoDone) */}
        {!videoDone && (
          <LuffyPeekingVideo
            isVisible={writingDone}
            onVideoEnd={onVideoEnd}
          />
        )}

        {/* Quoted instruction statement displayed at center top of the page with smooth fade-in after Luffy entrance */}
        {writingDone && videoDone && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 80 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.65 }}
            className="fixed top-4 sm:top-8 md:top-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex justify-center items-center overflow-visible whitespace-nowrap px-4 text-center"
          >
            <span className="font-serif italic text-base sm:text-2xl md:text-3xl font-medium text-[#1A1715] tracking-wide text-center block opacity-90 drop-shadow-sm select-none">
              &ldquo;{badgeMessage || 'Drag the fist → to explore'}&rdquo;
            </span>
          </motion.div>
        )}

        {/* Pure Handwriting-Style Text Animation (drawn stroke-by-stroke from left to right) */}
        <div className="relative inline-flex items-center justify-center w-full overflow-visible py-2">
          {!writingDone ? (
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: writingDurationSeconds, ease: [0.37, 0, 0.63, 1] }}
              className="font-cursive text-[12vw] sm:text-[13vw] md:text-[13.5vw] font-bold text-[#1A1715] tracking-normal leading-normal whitespace-nowrap select-none drop-shadow-sm text-center overflow-visible py-2 pointer-events-none"
              style={{
                fontFamily: "var(--font-cursive), 'Dancing Script', 'Great Vibes', cursive",
              }}
            >
              Kavinraj M
            </motion.h1>
          ) : (
            <h1
              className="font-cursive text-[12vw] sm:text-[13vw] md:text-[13.5vw] font-bold text-[#1A1715] tracking-normal leading-normal whitespace-nowrap select-none drop-shadow-sm text-center overflow-visible py-2 pointer-events-none"
              style={{
                fontFamily: "var(--font-cursive), 'Dancing Script', 'Great Vibes', cursive",
              }}
            >
              {NAME_LETTERS.map((letter, index) => {
                const isDestroyed = destroyedLetters?.has(index);
                const isM = letter === 'M';

                return (
                  <span
                    key={`${letter}-${index}`}
                    className={`relative inline-block overflow-visible ${isM ? 'ml-[0.25em]' : ''}`}
                  >
                    <motion.span
                      ref={(el) => {
                        if (letterRefs) {
                          letterRefs.current[index] = el;
                        }
                      }}
                      initial={{ opacity: 1, scale: 1, rotate: 0 }}
                      animate={
                        isDestroyed
                          ? {
                            opacity: 0,
                            scale: [1, 1.2, 0],
                            rotate: [0, -15, 30],
                            filter: ['blur(0px)', 'blur(3px)', 'blur(10px)'],
                          }
                          : { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }
                      }
                      transition={{
                        duration: 0.35,
                        ease: 'easeOut',
                      }}
                      className={`inline-block select-none transition-colors ${
                        isDestroyed ? 'text-stone-700' : 'text-[#1A1715]'
                      }`}
                    >
                      {letter}
                    </motion.span>

                    {/* High Quality Letter Shatter & Dust Cloud Disintegration Effect */}
                    {isDestroyed && (
                      <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center">
                        {/* Expanding Shockwave Ring */}
                        <motion.div
                          initial={{ scale: 0.2, opacity: 0.8 }}
                          animate={{ scale: 2.0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          className="absolute w-12 h-12 rounded-full border border-amber-800/40 shadow-[0_0_12px_rgba(180,83,9,0.3)]"
                        />

                        {/* Character Breakdown Pieces Crumbling & Falling Downwards */}
                        {SHARDS.map((shard, sIdx) => (
                          <motion.div
                            key={`shard-${sIdx}`}
                            initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                            animate={{
                              opacity: [1, 0.8, 0],
                              scale: [1, 0.7, 0],
                              x: shard.x,
                              y: shard.y,
                              rotate: shard.r,
                            }}
                            transition={{ duration: 0.52, ease: [0.33, 1, 0.68, 1] }}
                            style={{
                              width: `${shard.w}px`,
                              height: `${shard.h}px`,
                              clipPath: shard.clip,
                            }}
                            className="absolute bg-gradient-to-b from-[#1A1715] via-[#4A423D] to-[#7C7067] shadow-sm"
                          />
                        ))}

                        {/* Dust Particles Dropping Downwards down the character and vanishing */}
                        {DUST_PARTICLES.map((dust, dIdx) => (
                          <motion.div
                            key={`dust-${dIdx}`}
                            initial={{ opacity: 0.9, scale: 0.4, x: 0, y: 0 }}
                            animate={{
                              opacity: [0.9, 0.5, 0],
                              scale: [0.4, 1.4, 2.2],
                              x: dust.x,
                              y: dust.y,
                            }}
                            transition={{ duration: 0.6, delay: dust.delay, ease: 'easeOut' }}
                            style={{
                              width: `${dust.size}px`,
                              height: `${dust.size}px`,
                              filter: dust.blur,
                            }}
                            className="absolute rounded-full bg-gradient-to-b from-[#2A2421]/70 via-[#6B6056]/40 to-transparent"
                          />
                        ))}
                      </div>
                    )}
                  </span>
                );
              })}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
