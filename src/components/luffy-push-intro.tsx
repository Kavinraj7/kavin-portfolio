'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import CursiveNameIntro from './cursive-name-intro';
import LuffyRig from './LuffyRig';

interface LuffyPushIntroProps {
  onComplete: () => void;
}

const NAME_LETTERS = ['K', 'a', 'v', 'i', 'n', 'r', 'a', 'j', 'M'];

export default function LuffyPushIntro({ onComplete }: LuffyPushIntroProps) {
  const [videoDone, setVideoDone] = useState(false);
  const [showRig, setShowRig] = useState(false);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [destroyedLetters, setDestroyedLetters] = useState<Set<number>>(new Set());
  const [isFinalPunched, setIsFinalPunched] = useState(false);
  const [isWelcomeStage, setIsWelcomeStage] = useState(false);

  const handleVideoEnd = () => {
    setVideoDone(true);
    setShowRig(true);
  };

  // Dynamic badge message displayed at center where video played
  let badgeMessage = '';
  if (destroyedLetters.has(9)) {
    // Letter 'M' done
    badgeMessage = '';
  } else if (destroyedLetters.has(5)) {
    // Letter 'r' or 'v' reached
    badgeMessage = 'Almost There! →';
  } else if (destroyedLetters.size > 0 && destroyedLetters.size <= 5) {
    badgeMessage = 'Keep going! →';
  } else if (destroyedLetters.size === 0) {
    badgeMessage = 'Drag the fist → to explore';
  }

  const destroyedLettersRef = useRef(destroyedLetters);
  useEffect(() => {
    destroyedLettersRef.current = destroyedLetters;
  }, [destroyedLetters]);

  const isFinalPunchedRef = useRef(isFinalPunched);
  useEffect(() => {
    isFinalPunchedRef.current = isFinalPunched;
  }, [isFinalPunched]);

  // Collision detection between Luffy's fist and target letters
  const handleFistMove = useCallback(
    (fistImpactX: number) => {
      const newlyHit: number[] = [];
      letterRefs.current.forEach((ref, index) => {
        if (ref && !destroyedLettersRef.current.has(index)) {
          const letterBounds = ref.getBoundingClientRect();
          if (fistImpactX >= letterBounds.left + 5) {
            newlyHit.push(index);
          }
        }
      });

      if (newlyHit.length > 0) {
        setDestroyedLetters((prev) => {
          const next = new Set(prev);
          newlyHit.forEach((idx) => next.add(idx));
          return next;
        });

        if (newlyHit.includes(NAME_LETTERS.length - 1) && !isFinalPunchedRef.current) {
          setIsFinalPunched(true);
          setTimeout(() => {
            setIsWelcomeStage(true);
            setTimeout(() => {
              onComplete();
            }, 1800);
          }, 400);
        }
      }
    },
    [onComplete]
  );

  return (
    <div className="relative w-full min-h-screen bg-white text-[#1A1715] flex flex-col items-center justify-center overflow-hidden select-none py-12">
      {!isWelcomeStage ? (
        <>
          {/* 1 & 2: Handwriting animation -> Peeking Video plays full 10s -> Video disappears -> Quoted text appears at center */}
          <CursiveNameIntro
            onVideoEnd={handleVideoEnd}
            videoDone={videoDone}
            badgeMessage={badgeMessage}
            destroyedLetters={destroyedLetters}
            letterRefs={letterRefs}
          />

          {/* 3: Once video completes at 10s, LuffyRig appears at middle-left of name */}
          {showRig && (
            <LuffyRig
              isVisible={true}
              onFistMove={handleFistMove}
              onComplete={onComplete}
            />
          )}
        </>
      ) : (
        /* Classic Welcome screen transition */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center select-none p-4"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 15, letterSpacing: '0.05em' }}
            animate={{ opacity: 1, scale: 1, y: 0, letterSpacing: '0.22em' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#1A1715] font-light text-center drop-shadow-sm"
          >
            Welcome
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, width: '0px' }}
            animate={{ opacity: 0.35, width: '140px' }}
            transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
            className="h-[1px] bg-[#1A1715] mt-6"
          />
        </motion.div>
      )}
    </div>
  );
}



