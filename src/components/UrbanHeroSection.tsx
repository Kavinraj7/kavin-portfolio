'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { soundFx } from '@/utils/audio';

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

  const socialLinks = [
    { name: 'Linkedin', href: 'https://instagram.com' },
    { name: 'Github', href: 'https://facebook.com' },
    { name: 'Whatsapp', href: 'https://youtube.com' },

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
              className="text-[54px] sm:text-[84px] md:text-[116px] lg:text-[144px] xl:text-[168px] font-black text-[#FFEE00] uppercase font-sans drop-shadow-[0_2px_18px_rgba(0,0,0,0.15)] pb-1"
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
              className="text-[54px] sm:text-[84px] md:text-[116px] lg:text-[144px] xl:text-[168px] font-black text-[#FFEE00] uppercase font-sans drop-shadow-[0_2px_18px_rgba(0,0,0,0.15)] pb-1"
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
      {/* 5. BOTTOM FOOTER BAR (Socials on Left, Privacy on Right)     */}
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
        {/* Social Links on Left */}
        <div className="flex items-center gap-6 sm:gap-10 md:gap-14">
          {socialLinks.map((social, idx) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isCurtainWiped ? 1 : 0,
                y: isCurtainWiped ? 0 : 10,
              }}
              transition={{ duration: 0.4, delay: 0.55 + idx * 0.05 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => soundFx.playSelect()}
              className="cursor-pointer hover:text-black transition-colors duration-200"
            >
              {social.name}
            </motion.a>
          ))}
        </div>

        {/* Privacy Policy on Right */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isCurtainWiped ? 1 : 0,
            y: isCurtainWiped ? 0 : 10,
          }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
        </motion.div>
      </motion.footer>

    </section>
  );
};

export default UrbanHeroSection;
