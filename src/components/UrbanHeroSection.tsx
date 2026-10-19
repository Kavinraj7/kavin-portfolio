'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { soundFx } from '@/utils/audio';

const LinkedinIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const GithubIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const WhatsappIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.09-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

interface UrbanHeroSectionProps {
  onOpenTerminal?: () => void;
  onNavigateJourney?: () => void;
  onNavigateProjects?: () => void;
  onNavigateAbout?: () => void;
  heroImageSrc?: string;
  insetThumbnailSrc?: string;
}

export const UrbanHeroSection: React.FC<UrbanHeroSectionProps> = ({
  onOpenTerminal,
  onNavigateJourney,
  onNavigateProjects,
  onNavigateAbout,
  heroImageSrc = '/kavin1.png',
  insetThumbnailSrc = '/images/urban_sunglasses_inset.jpg',
}) => {
  const [mounted, setMounted] = useState(false);
  const [isHoveringView, setIsHoveringView] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isCurtainWiped, setIsCurtainWiped] = useState(false);
  const [curtainRemoved, setCurtainRemoved] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter states matching Frame 00:01 -> 00:03 of hani.mp4
  const [typedTitle, setTypedTitle] = useState('');
  const [typedTagline, setTypedTagline] = useState('');
  const fullTitle = 'HEY THERE';
  const fullTagline = "I'M KAVIN";

  // 1. Percentage Counter (00% -> 100%) - Frame 00:00
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 14) + 6;
      if (current >= 100) {
        current = 100;
        setLoadingPercent(100);
        clearInterval(interval);
        // Curtain wipe begins at 100%
        setTimeout(() => {
          setIsCurtainWiped(true);
          soundFx.playConfirm();
          setTimeout(() => {
            setCurtainRemoved(true);
          }, 1100);
        }, 150);
      } else {
        setLoadingPercent(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // 2. Typewriter Effect for Title & Tagline as curtain wipes (Frame 00:01 -> 00:03)
  useEffect(() => {
    if (!isCurtainWiped) return;

    let titleIdx = 0;
    const titleInterval = setInterval(() => {
      if (titleIdx <= fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, titleIdx));
        titleIdx++;
      } else {
        clearInterval(titleInterval);
        // Start typing tagline
        let tagIdx = 0;
        const tagInterval = setInterval(() => {
          if (tagIdx <= fullTagline.length) {
            setTypedTagline(fullTagline.slice(0, tagIdx));
            tagIdx++;
          } else {
            clearInterval(tagInterval);
          }
        }, 28);
      }
    }, 45);

    return () => clearInterval(titleInterval);
  }, [isCurtainWiped]);

  // Mouse Parallax Physics for tactile float
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Subtle 3D parallax shifts for hero model & floating elements
  const imageX = useTransform(smoothMouseX, [-600, 600], [-14, 14]);
  const imageY = useTransform(smoothMouseY, [-600, 600], [-10, 10]);
  const textX = useTransform(smoothMouseX, [-600, 600], [6, -6]);
  const textY = useTransform(smoothMouseY, [-600, 600], [4, -4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const leftSocialLinks = [
    {
      name: 'Linkedin',
      href: 'https://linkedin.com/in/kavinraj',
      icon: LinkedinIcon,
      brandBg: 'bg-[#0A66C2]',
      shadow: 'shadow-[#0A66C2]/40',
      hoverColor: 'hover:text-[#0A66C2]',
    },
    {
      name: 'Github',
      href: 'https://github.com/Kavinraj7',
      icon: GithubIcon,
      brandBg: 'bg-zinc-950',
      shadow: 'shadow-black/40',
      hoverColor: 'hover:text-black',
    },
  ];

  const rightSocialLinks = [
    {
      name: 'Whatsapp',
      href: 'https://wa.me',
      icon: WhatsappIcon,
      brandBg: 'bg-[#25D366]',
      shadow: 'shadow-[#25D366]/40',
      hoverColor: 'hover:text-[#25D366]',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: InstagramIcon,
      brandBg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      shadow: 'shadow-[#E4405F]/40',
      hoverColor: 'hover:text-[#E4405F]',
    },
  ];

  return (
    <section
      id="urban-hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen min-h-[700px] bg-white dark:bg-white text-zinc-950 font-sans selection:bg-[#FFEE00] selection:text-black overflow-hidden isolate transition-colors duration-300"
    >
      {/* ============================================================ */}
      {/* 0. YELLOW PRELOADER CURTAIN WITH 00% -> 100% WIPE (Frame 00) */}
      {/* ============================================================ */}
      {mounted && !curtainRemoved && createPortal(
        <motion.div
          initial={{ x: '0%' }}
          animate={{ x: isCurtainWiped ? '100%' : '0%' }}
          transition={{
            duration: 0.85,
            ease: [0.76, 0, 0.24, 1], // Exact slick curtain wipe curve
          }}
          className="fixed inset-0 z-[999] bg-[#FFEE00] flex flex-col justify-end p-8 sm:p-12 md:p-16 pointer-events-none shadow-[20px_0_50px_rgba(0,0,0,0.25)]"
        >
          {/* Counter at Bottom-Left: 00% -> 100% */}
          <div className="font-black text-6xl sm:text-8xl md:text-9xl text-black font-sans tracking-tight select-none flex items-baseline">
            <span>{loadingPercent < 10 ? `0${loadingPercent}` : loadingPercent}</span>
            <span className="text-4xl sm:text-6xl md:text-7xl ml-1">%</span>
          </div>
        </motion.div>,
        document.body
      )}

      {/* Subtle Ambient Studio Light Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isCurtainWiped ? 1 : 0 }}
        transition={{ duration: 1.0 }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,238,0,0.04)_0%,transparent_70%)] z-0"
      />

      {/* ============================================================ */}
      {/* 1. LEFT COLUMN: SKU #202525, 1. SUNCTRL_, Tagline           */}
      {/* ============================================================ */}
      <div
        style={{ transform: 'none' }}
        className="absolute left-8 sm:left-12 md:left-16 lg:left-20 xl:left-24 top-20 sm:top-24 md:top-28 z-20 flex flex-col items-start select-none pointer-events-auto"
      >
        <motion.div style={{ x: textX, y: textY }} className="flex flex-col items-start">
          {/* SKU Number */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{
              opacity: isCurtainWiped ? 1 : 0,
              x: isCurtainWiped ? 0 : -30,
            }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase"
          >
            KAVINRAJ M. / 2026
          </motion.div>

          {/* HEY THERE with Typewriter reveal + active blinking cursor */}
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={{
              opacity: isCurtainWiped ? 1 : 0,
              x: isCurtainWiped ? 0 : -30,
            }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl lg:text-[26px] font-black text-zinc-950 tracking-tight mt-1 flex items-center min-h-[32px]"
          >
            <span>{typedTitle || 'HEY'}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              className="inline-block text-[#E5C800] ml-0.5 font-black"
            >
              _
            </motion.span>
          </motion.h3>

          {/* Tagline: Typewriter reveal */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{
              opacity: isCurtainWiped ? 1 : 0,
            }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xs sm:text-[13px] text-zinc-600 font-medium tracking-normal mt-0.5 min-h-[18px]"
          >
            {typedTagline}
          </motion.p>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 2. CENTER HERO SUBJECT (Frame 00:01 - Scales up and glides) */}
      {/* ============================================================ */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 sm:-bottom-16 md:-bottom-20 lg:-bottom-24 h-[86%] sm:h-[92%] lg:h-[98%] max-h-[940px] w-full max-w-[780px] lg:max-w-[920px] xl:max-w-[1040px] z-10 flex items-end justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 50 }}
          animate={{
            opacity: isCurtainWiped ? 1 : 0,
            scale: isCurtainWiped ? 1 : 0.88,
            y: isCurtainWiped ? 0 : 50,
          }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: imageX, y: imageY }}
          className="relative w-full h-full flex items-end justify-center"
        >
          {/* Subtle Warm Glow behind head */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: isCurtainWiped ? 1 : 0,
              scale: isCurtainWiped ? 1 : 0.6,
            }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[560px] md:w-[680px] h-[420px] sm:h-[560px] md:h-[680px] bg-[#FFEE00]/22 rounded-full blur-[100px] -z-10"
          />

          {/* Portrait Image */}
          <div className="relative w-full h-full flex items-end justify-center overflow-visible scale-105 sm:scale-110 lg:scale-115 origin-bottom">
            <Image
              src={heroImageSrc}
              alt="Urban Hero Subject"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              className="object-contain object-bottom drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 3. RIGHT COLUMN: #2, Description, Inset Card & VIEW Circle   */}
      {/* ============================================================ */}
      <div
        style={{ transform: 'none' }}
        className="absolute right-8 sm:right-12 md:right-16 lg:right-20 xl:right-24 top-20 sm:top-24 md:top-28 z-20 flex flex-col items-start max-w-[240px] sm:max-w-[270px] md:max-w-[290px] select-none pointer-events-auto"
      >
        <motion.div style={{ x: textX, y: textY }} className="flex flex-col items-start w-full">
          {/* #2 Badge - Pop in with bounce (Frame 00:02) */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{
              opacity: isCurtainWiped ? 1 : 0,
              scale: isCurtainWiped ? 1 : 0,
              rotate: isCurtainWiped ? 0 : -20,
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.25 }}
            whileHover={{ scale: 1.08, rotate: 3 }}
            className="bg-[#FFEE00] text-black font-black text-lg sm:text-xl px-2.5 py-0.5 tracking-tight shadow-sm inline-block cursor-default"
          >
            KAVIN-AI
          </motion.div>

          {/* Description text - Fade & slide in */}
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{
              opacity: isCurtainWiped ? 1 : 0,
              x: isCurtainWiped ? 0 : 30,
            }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] sm:text-[12px] md:text-[12.5px] text-zinc-700 font-medium leading-[1.42] tracking-normal mt-3"
          >
            Click VIEW and meet Kavin-AI — an interactive way to explore my journey, skills, projects, experience, and everything that shaped me.
          </motion.p>

          {/* Inset Model Thumbnail Card with VIEW Circle (Frame 00:02 -> 00:03) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 25 }}
            animate={{
              opacity: isCurtainWiped ? 1 : 0,
              scale: isCurtainWiped ? 1 : 0.7,
              y: isCurtainWiped ? 0 : 25,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.45 }}
            className="relative mt-4 sm:mt-5 w-[105px] sm:w-[120px] h-[135px] sm:h-[155px] overflow-visible shadow-lg group cursor-pointer"
            onClick={() => {
              soundFx.playSelect();
              onNavigateProjects?.();
            }}
          >
            {/* Thumbnail Box */}
            <div className="relative w-full h-full overflow-hidden border border-zinc-300 bg-zinc-100 shadow-md">
              <Image
                src={insetThumbnailSrc}
                alt="Fashion Sunglasses Inset"
                fill
                sizes="120px"
                className="object-cover object-top group-hover:scale-108 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
              />
            </div>

            {/* Circular VIEW Badge Button Overlaid on Right Edge - Spins into place */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={{
                opacity: isCurtainWiped ? 1 : 0,
                scale: isCurtainWiped ? 1 : 0,
                rotate: isCurtainWiped ? 0 : -90,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.55 }}
              onMouseEnter={() => setIsHoveringView(true)}
              onMouseLeave={() => setIsHoveringView(false)}
              whileHover={{
                scale: 1.15,
                rotate: 10,
              }}
              className="absolute -right-5 top-1/2 -translate-y-1/2 w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-[#E5C800] bg-white/95 backdrop-blur-xs flex items-center justify-center text-zinc-950 font-black text-[11px] sm:text-xs tracking-widest shadow-md group-hover:bg-[#FFEE00] group-hover:text-black transition-colors duration-300"
            >
              <span>VIEW</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 4. MASSIVE DISPLAY TYPOGRAPHY: "MANY SIDES ONE STORY" (CENTER) */}
      {/* ============================================================ */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[4.7%] sm:bottom-[6.7%] md:bottom-[7.7%] z-20 w-full max-w-[1440px] px-4 text-center flex flex-col items-center justify-center select-none pointer-events-none">
        <div className="flex flex-col items-center leading-[0.88] tracking-[-0.035em]">

          {/* Row 1: MANY SIDES - Upward Mask Reveal with clearance */}
          <div className="overflow-hidden py-1 sm:py-2">
            <motion.h1
              initial={{ y: '120%', opacity: 0 }}
              animate={{
                y: isCurtainWiped ? '0%' : '120%',
                opacity: isCurtainWiped ? 1 : 0,
              }}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-[54px] sm:text-[84px] md:text-[116px] lg:text-[144px] xl:text-[168px] font-black text-[#FFEE00] uppercase font-sans pb-1"
              style={{
                WebkitTextStroke: '1.5px rgba(0,0,0,0.08)',
              }}
            >
              MANY SIDES
            </motion.h1>
          </div>

          {/* Row 2: ONE STORY - Staggered Upward Mask Reveal with clearance */}
          <div className="overflow-hidden relative flex items-baseline justify-center py-1 sm:py-2">
            <motion.h2
              initial={{ y: '120%', opacity: 0 }}
              animate={{
                y: isCurtainWiped ? '0%' : '120%',
                opacity: isCurtainWiped ? 1 : 0,
              }}
              transition={{ duration: 0.85, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="text-[54px] sm:text-[84px] md:text-[116px] lg:text-[144px] xl:text-[168px] font-black text-[#FFEE00] uppercase font-sans pb-1"
              style={{
                WebkitTextStroke: '1.5px rgba(0,0,0,0.08)',
              }}
            >
              ONE STORY
            </motion.h2>

            {/* VIEW action link: positioned to the right of ONE STORY */}
            <motion.button
              initial={{ opacity: 0, x: 25 }}
              animate={{
                opacity: isCurtainWiped ? 1 : 0,
                x: isCurtainWiped ? 0 : 25,
              }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                soundFx.playSelect();
                onNavigateProjects?.();
              }}
              className="absolute -right-12 sm:-right-16 bottom-3 sm:bottom-4 z-25 pointer-events-auto hidden sm:flex items-center text-xs sm:text-[13px] font-bold tracking-widest text-zinc-900 hover:text-black uppercase cursor-pointer transition-colors"
            >
              <span>VIEW</span>
            </motion.button>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. BOTTOM FOOTER BAR (Linkedin & Github on Left, Whatsapp & Instagram on Right) */}
      {/* ============================================================ */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isCurtainWiped ? 1 : 0,
          y: isCurtainWiped ? 0 : 20,
        }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 pb-4 sm:pb-6 z-30 flex items-center justify-between pointer-events-auto text-xs sm:text-[13px] font-bold tracking-wide text-zinc-800"
      >
        {/* Left Social Links: Linkedin & Github */}
        <div className="flex items-center gap-6 sm:gap-10 md:gap-14">
          {leftSocialLinks.map((social, idx) => {
            const Icon = social.icon;
            const isHovered = hoveredSocial === social.name;

            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredSocial(social.name)}
                onMouseLeave={() => setHoveredSocial(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isCurtainWiped ? 1 : 0,
                  y: isCurtainWiped ? 0 : 10,
                }}
                transition={{ duration: 0.4, delay: 0.55 + idx * 0.05 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => soundFx.playSelect()}
                className={`relative inline-flex items-center cursor-pointer transition-colors duration-200 ${social.hoverColor}`}
              >
                {/* Floating Logo Badge appearing over the link on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      key={`popup-${social.name}`}
                      initial={{ opacity: 0, y: 8, scale: 0.7 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.7 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 pointer-events-none z-50 flex flex-col items-center"
                    >
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${social.brandBg} text-white flex items-center justify-center shadow-xl ${social.shadow} border border-white/20`}
                      >
                        <Icon className="w-5 h-5 fill-current" />
                      </div>
                      {/* Pointer triangle */}
                      <div className={`w-2.5 h-2.5 rotate-45 -mt-1 ${social.brandBg}`} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <span className="relative z-10">{social.name}</span>
              </motion.a>
            );
          })}
        </div>

        {/* Right Social Links: Whatsapp & Instagram */}
        <div className="flex items-center gap-6 sm:gap-10 md:gap-14">
          {rightSocialLinks.map((social, idx) => {
            const Icon = social.icon;
            const isHovered = hoveredSocial === social.name;

            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredSocial(social.name)}
                onMouseLeave={() => setHoveredSocial(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isCurtainWiped ? 1 : 0,
                  y: isCurtainWiped ? 0 : 10,
                }}
                transition={{ duration: 0.4, delay: 0.55 + idx * 0.05 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => soundFx.playSelect()}
                className={`relative inline-flex items-center cursor-pointer transition-colors duration-200 ${social.hoverColor}`}
              >
                {/* Floating Logo Badge appearing over the link on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      key={`popup-${social.name}`}
                      initial={{ opacity: 0, y: 8, scale: 0.7 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.7 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 pointer-events-none z-50 flex flex-col items-center"
                    >
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${social.brandBg} text-white flex items-center justify-center shadow-xl ${social.shadow} border border-white/20`}
                      >
                        <Icon className="w-5 h-5 fill-current" />
                      </div>
                      {/* Pointer triangle */}
                      <div className={`w-2.5 h-2.5 rotate-45 -mt-1 ${social.brandBg}`} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <span className="relative z-10">{social.name}</span>
              </motion.a>
            );
          })}
        </div>
      </motion.footer>

    </section>
  );
};

export default UrbanHeroSection;
