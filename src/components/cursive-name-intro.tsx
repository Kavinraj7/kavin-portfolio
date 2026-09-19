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
                            scale: [1, 1.35, 0.3],
                            rotate: [0, -25, 45],
                            x: [0, 45, 100],
                            filter: ['blur(0px)', 'blur(4px)', 'blur(12px)'],
                          }
                          : { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }
                      }
                      transition={{
                        duration: 0.45,
                        ease: 'easeOut',
                      }}
                      className={`inline-block select-none transition-colors ${isDestroyed ? 'text-amber-600' : 'text-[#1A1715]'
                        }`}
                    >
                      {letter}
                    </motion.span>

                    {/* Punch Impact Smoke Particle 💥 */}
                    {isDestroyed && (
                      <motion.div
                        initial={{ opacity: 1, scale: 0.5 }}
                        animate={{ opacity: 0, scale: 2 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 pointer-events-none flex items-center justify-center text-amber-500 font-bold text-xl"
                      >
                        💥
                      </motion.div>
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
