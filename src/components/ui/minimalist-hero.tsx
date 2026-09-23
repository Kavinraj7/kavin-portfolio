'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type IconComponent = React.ComponentType<{ className?: string }> | LucideIcon;

export interface MinimalistHeroProps {
  logoText?: string;
  navLinks?: { label: string; href: string; onClick?: () => void }[];
  showHeader?: boolean;
  mainText: string;
  readMoreLink?: string;
  onReadMore?: () => void;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: IconComponent; href: string; label?: string }[];
  locationText: string;
  className?: string;
}

const SocialIcon = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: IconComponent;
  label?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label || 'Social link'}
    className="text-foreground/70 transition-all hover:text-foreground hover:scale-110 active:scale-95 duration-200"
  >
    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
  </a>
);

export const MinimalistHero = ({
  mainText,
  readMoreLink = '#',
  onReadMore,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex h-[calc(100vh-4rem)] min-h-[600px] w-full flex-col justify-between overflow-hidden bg-background px-6 sm:px-10 md:px-14 lg:px-20 font-sans transition-colors duration-300 select-none',
        className
      )}
    >
      {/* Main 3-Column Content Layout */}
      <div className="relative grid w-full max-w-7xl mx-auto h-full grid-cols-1 md:grid-cols-12 items-center">
        
        {/* Left Column: Description & Read More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="z-20 order-2 md:order-1 md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left self-center my-auto py-4"
        >
          <p className="max-w-[260px] sm:max-w-[300px] text-sm sm:text-base leading-relaxed text-foreground/80 font-normal">
            {mainText}
          </p>
          <a
            href={readMoreLink}
            onClick={(e) => {
              if (onReadMore) {
                e.preventDefault();
                onReadMore();
              }
            }}
            className="mt-4 sm:mt-5 inline-block text-sm font-bold text-foreground underline underline-offset-4 decoration-2 hover:text-purple-600 dark:hover:text-yellow-400 transition-colors cursor-pointer"
          >
            Read More
          </a>
        </motion.div>

        {/* Center Column: Full-Height Portrait starting from bottom + Centered Yellow Circle */}
        <div className="relative order-1 md:order-2 md:col-span-5 h-full w-full flex items-end justify-center overflow-visible">
          {/* Vibrant Yellow Circle Backdrop */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="absolute z-0 top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[460px] md:h-[460px] lg:w-[540px] lg:h-[540px] rounded-full bg-[#FACC15] dark:bg-[#FACC15] shadow-2xl pointer-events-none"
          />

          {/* Profile Silhouette Image rising tall from bottom */}
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="relative z-10 h-[75vh] sm:h-[82vh] md:h-[86vh] lg:h-[88vh] max-h-[880px] w-auto max-w-none object-contain object-bottom drop-shadow-2xl pointer-events-none mb-0 pb-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `https://cdn.21st.dev/assets/mirror/21/2172cd84238bbee1a57a87b64322655b09c2ffa4ea89acaef7e9989c3abd272d.png`;
            }}
          />
        </div>

        {/* Right Column: Massive "less is more." Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="z-20 order-3 md:order-3 md:col-span-4 flex items-center justify-center md:justify-start text-center md:text-left self-center my-auto py-4 pl-0 md:pl-2"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.75rem] font-black text-foreground tracking-tighter leading-[0.86] select-none">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      {/* Floating Bottom Row: Social Icons (Bottom-Left) and Location (Bottom-Right) */}
      <footer className="absolute bottom-4 sm:bottom-6 left-6 sm:left-10 md:left-14 lg:left-20 right-6 sm:right-10 md:right-14 lg:right-20 z-30 flex items-center justify-between pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex items-center space-x-4 sm:space-x-5"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon
              key={index}
              href={link.href}
              icon={link.icon}
              label={link.label}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xs sm:text-sm font-medium tracking-wide text-foreground/80"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};

export default MinimalistHero;
