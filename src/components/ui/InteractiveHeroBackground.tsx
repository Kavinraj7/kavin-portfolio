'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const InteractiveHeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position state with smooth springs
  const mouseX = useMotionValue(700);
  const mouseY = useMotionValue(350);

  const springConfig = { damping: 20, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax transforms
  const parallaxX = useTransform(smoothMouseX, [0, 1440], [-50, 50]);
  const parallaxY = useTransform(smoothMouseY, [0, 900], [-35, 35]);

  const inverseParallaxX = useTransform(smoothMouseX, [0, 1440], [45, -45]);
  const inverseParallaxY = useTransform(smoothMouseY, [0, 900], [30, -30]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10"
      aria-hidden="true"
    >
      {/* 1. Direct Interactive Cursor Glow Spotlight (Softer & Lighter) */}
      <motion.div
        style={{
          left: smoothMouseX,
          top: smoothMouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18)_0%,rgba(99,102,241,0.08)_40%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(168,85,247,0.28)_0%,rgba(99,102,241,0.12)_45%,transparent_75%)] blur-3xl transition-opacity duration-300 pointer-events-none"
      />

      {/* Secondary Ambient Corner Glows for Depth */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute -top-24 -left-20 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.14)_0%,rgba(168,85,247,0.05)_50%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(139,92,246,0.22)_0%,rgba(76,29,149,0.08)_50%,transparent_75%)] blur-3xl"
      />

      <motion.div
        style={{ x: inverseParallaxX, y: inverseParallaxY }}
        className="absolute -bottom-24 -right-16 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,rgba(147,51,234,0.06)_50%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(124,58,237,0.2)_0%,rgba(37,99,235,0.08)_50%,transparent_75%)] blur-3xl"
      />

      {/* 2. Floating SVG Flowing Wave Paths (Soft & Balanced) */}
      <motion.svg
        style={{
          x: parallaxX,
          y: parallaxY,
        }}
        className="absolute inset-0 w-full h-full opacity-50 dark:opacity-55"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="vibrantViolet1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#A855F7" stopOpacity="0.55" />
            <stop offset="75%" stopColor="#6366F1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="vibrantBlueViolet2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#C084FC" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="vibrantAmberViolet3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#EC4899" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
          </linearGradient>

          <pattern id="interactiveGridPattern" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="fill-zinc-400/25 dark:fill-purple-400/20" />
          </pattern>
        </defs>

        {/* Subtle Dotted Grid Background */}
        <rect width="100%" height="100%" fill="url(#interactiveGridPattern)" opacity="0.45" />

        {/* Wave Path 1 (Top Sweep) */}
        <motion.path
          d="M -120 220 C 280 90, 620 420, 1080 180 C 1280 80, 1480 260, 1620 200"
          stroke="url(#vibrantViolet1)"
          strokeWidth="1.75"
          strokeDasharray="10 12"
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: [0, 1] }}
          transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
        />

        {/* Wave Path 2 (Middle Cross Sweep) */}
        <motion.path
          d="M -160 460 C 260 620, 780 280, 1180 520 C 1380 620, 1520 460, 1680 490"
          stroke="url(#vibrantBlueViolet2)"
          strokeWidth="2"
          strokeDasharray="12 14"
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: [1, 0] }}
          transition={{ repeat: Infinity, duration: 26, ease: 'linear' }}
        />

        {/* Wave Path 3 (Bottom Ambient Sweep) */}
        <motion.path
          d="M -60 700 C 380 540, 820 780, 1220 650 C 1420 590, 1580 720, 1680 670"
          stroke="url(#vibrantAmberViolet3)"
          strokeWidth="1.5"
          strokeDasharray="8 10"
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: [0, 1] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        />

        {/* Wave Path 4 (Diagonal Accent Flow) */}
        <motion.path
          d="M 100 -50 C 400 350, 700 200, 1300 750"
          stroke="url(#vibrantViolet1)"
          strokeWidth="1.25"
          strokeDasharray="6 10"
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: [0, 1] }}
          transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
        />
      </motion.svg>

      {/* 3. Luminous Floating Node Sparks (Soft & Subtle) */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: '16%', left: '18%', size: 'w-2 h-2', delay: 0, duration: 3.5, color: 'bg-purple-400' },
          { top: '32%', left: '78%', size: 'w-2 h-2', delay: 0.8, duration: 4.2, color: 'bg-indigo-400' },
          { top: '62%', left: '12%', size: 'w-1.5 h-1.5', delay: 1.5, duration: 3.8, color: 'bg-violet-400' },
          { top: '74%', left: '88%', size: 'w-2 h-2', delay: 0.3, duration: 4.8, color: 'bg-pink-400' },
          { top: '22%', left: '48%', size: 'w-1.5 h-1.5', delay: 1.2, duration: 3.2, color: 'bg-blue-400' },
          { top: '82%', left: '42%', size: 'w-2 h-2', delay: 2.1, duration: 4.5, color: 'bg-purple-300' },
        ].map((spark, idx) => (
          <motion.div
            key={idx}
            style={{ top: spark.top, left: spark.left }}
            animate={{
              y: [0, -12, 0],
              x: [0, (idx % 2 === 0 ? 6 : -6), 0],
              opacity: [0.3, 0.75, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: spark.duration,
              delay: spark.delay,
              ease: 'easeInOut',
            }}
            className={`absolute ${spark.size} rounded-full ${spark.color} shadow-[0_0_8px_rgba(168,85,247,0.5)] dark:shadow-[0_0_10px_rgba(192,132,252,0.6)]`}
          />
        ))}
      </div>
    </div>
  );
};
