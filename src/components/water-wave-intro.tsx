'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface WaterWaveIntroProps {
  onComplete: () => void;
}

// ─── STAGE DEFINITIONS ────────────────────────────────────────────────────────
// 1. 'writing'  – cursive "Kavinraj M." hand-writes itself left→right (3.5s)
// 2. 'orbiting' – name shrinks small and orbits a circular path as a loader (2s)
// 3. 'exiting'  – fade to white (0.5s) then call onComplete()

export default function WaterWaveIntro({ onComplete }: WaterWaveIntroProps) {
  const shouldReduce = useReducedMotion();
  const [stage, setStage] = useState<'writing' | 'orbiting' | 'exiting' | 'done'>('writing');
  const [orbitAngle, setOrbitAngle] = useState(0);
  const rafRef = useRef<number>(0);
  const angleRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Immediately skip if user prefers reduced motion
  useEffect(() => {
    if (shouldReduce) { onComplete(); return; }
  }, [shouldReduce, onComplete]);

  // Orbit rAF loop — smooth 60fps rotation
  const startOrbit = () => {
    const SPEED = 200; // degrees per second
    let lastTs: number | null = null;
    const tick = (ts: number) => {
      if (!mountedRef.current) return;
      if (!lastTs) lastTs = ts;
      angleRef.current += SPEED * ((ts - lastTs) / 1000);
      setOrbitAngle(angleRef.current % 360);
      lastTs = ts;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  // Main sequence
  useEffect(() => {
    if (shouldReduce) return;
    const t1 = setTimeout(() => {
      setStage('orbiting');
      startOrbit();
    }, 3600); // writing done at 3.6s

    const t2 = setTimeout(() => {
      cancelAnimationFrame(rafRef.current);
      setStage('exiting');
    }, 5800); // orbit for ~2.2s

    const t3 = setTimeout(() => {
      setStage('done');
      onComplete();
    }, 6400); // fade out 0.6s

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReduce, onComplete]);

  if (shouldReduce || stage === 'done') return null;

  const isWriting  = stage === 'writing';
  const isOrbiting = stage === 'orbiting';
  const isExiting  = stage === 'exiting';

  // Orbit: name sits at radius 72px, counter-rotated to stay upright
  const R = 72;
  const rad = (orbitAngle * Math.PI) / 180;
  const ox  = R * Math.cos(rad);
  const oy  = R * Math.sin(rad);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: '#ffffff' }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Subtle vignette / atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(226,240,255,0.5) 0%, transparent 75%)',
        }}
      />

      {/* ── WRITING STAGE ── */}
      <AnimatePresence>
        {isWriting && (
          <motion.div
            key="writing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
            className="relative flex flex-col items-center gap-4 select-none"
          >
            {/* Ink line that sweeps below the text */}
            <div className="relative">
              {/* The name — cursive, revealed left-to-right via clip-path */}
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{
                  duration: 3.2,
                  ease: [0.12, 0.0, 0.3, 1.0], // slow start, slight rush, ease off
                }}
                style={{ willChange: 'clip-path' }}
              >
                <h1
                  className="text-black leading-none"
                  style={{
                    fontFamily: "'Dancing Script', 'Pacifico', cursive",
                    fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                  }}
                >
                  Kavinraj M.
                </h1>
              </motion.div>

              {/* Moving pen-tip cursor — tracks the right edge of the reveal */}
              <motion.div
                initial={{ left: '0%' }}
                animate={{ left: '100%' }}
                transition={{
                  duration: 3.2,
                  ease: [0.12, 0.0, 0.3, 1.0],
                }}
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                {/* Pen nib shape */}
                <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
                  <path d="M9 0 L18 20 L9 28 L0 20 Z" fill="#111" opacity="0.85" />
                  <path d="M9 20 L9 28" stroke="#111" strokeWidth="1.5" opacity="0.5" />
                </svg>
              </motion.div>
            </div>

            {/* Underline that draws after the name finishes */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 3.0, duration: 0.5, ease: 'easeOut' }}
              className="h-[2px] bg-black w-full"
              style={{ transformOrigin: 'left center' }}
            />

            {/* Subtitle that fades in after underline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.45, y: 0 }}
              transition={{ delay: 3.3, duration: 0.5 }}
              className="text-black text-sm uppercase tracking-[0.32em] font-medium"
            >
              Portfolio
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ORBITING LOADER STAGE ── */}
      <AnimatePresence>
        {isOrbiting && (
          <motion.div
            key="orbit"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.35 } }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
            style={{ width: (R * 2 + 80) + 'px', height: (R * 2 + 80) + 'px' }}
          >
            {/* Circular track ring */}
            <svg
              className="absolute inset-0"
              width={R * 2 + 80}
              height={R * 2 + 80}
              viewBox={`0 0 ${R * 2 + 80} ${R * 2 + 80}`}
            >
              {/* Faint full ring */}
              <circle
                cx={(R * 2 + 80) / 2}
                cy={(R * 2 + 80) / 2}
                r={R}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1.5"
              />
              {/* Spinning arc — partial stroke that rotates */}
              <circle
                cx={(R * 2 + 80) / 2}
                cy={(R * 2 + 80) / 2}
                r={R}
                fill="none"
                stroke="#111"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`${R * 0.7} ${R * 2 * Math.PI - R * 0.7}`}
                strokeDashoffset={0}
                style={{
                  transformOrigin: '50% 50%',
                  transform: `rotate(${orbitAngle}deg)`,
                }}
              />
            </svg>

            {/* Orbiting name — small, counter-rotated to stay upright */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${ox}px, ${oy}px)`,
              }}
            >
              <span
                className="block whitespace-nowrap text-black font-semibold"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 'clamp(0.7rem, 1.8vw, 1.1rem)',
                  letterSpacing: '0.05em',
                  // Keep text readable as it orbits
                  transform: `rotate(${-orbitAngle}deg)`,
                  transformOrigin: 'center',
                  display: 'inline-block',
                }}
              >
                Kavinraj M.
              </span>
            </div>

            {/* Loading label in center */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 text-center select-none"
              style={{ fontSize: '10px' }}
            >
              Loading
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
