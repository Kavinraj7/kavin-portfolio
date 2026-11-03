'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Copy,
  FileText,
} from 'lucide-react';
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

const EmailIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

export type NavTab = 'home' | 'about' | 'projects' | 'journey';

interface ContactSectionProps {
  onOpenTerminal?: () => void;
  onNavigate?: (tab: NavTab, sectionId?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenTerminal,
  onNavigate,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('itskavinoffc@gmail.com');
    setCopiedEmail(true);
    soundFx.playSelect();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleNavClick = (tab: NavTab, sectionId?: string) => {
    soundFx.playSelect();
    if (onNavigate) {
      onNavigate(tab, sectionId);
    } else {
      // Global event fallback for tab switching across components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('app-navigate', { detail: { tab, sectionId } })
        );
        if (sectionId) {
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 180);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/kavinraj',
      isExternal: true,
      brandBg: 'bg-[#0A66C2]',
      shadow: 'shadow-[#0A66C2]/40',
      hoverColor: 'hover:text-[#0A66C2]',
      icon: LinkedinIcon,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Kavinraj7',
      isExternal: true,
      brandBg: 'bg-zinc-950',
      shadow: 'shadow-black/50',
      hoverColor: 'hover:text-white',
      icon: GithubIcon,
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me',
      isExternal: true,
      brandBg: 'bg-[#25D366]',
      shadow: 'shadow-[#25D366]/40',
      hoverColor: 'hover:text-[#25D366]',
      icon: WhatsappIcon,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      isExternal: true,
      brandBg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      shadow: 'shadow-[#E4405F]/40',
      hoverColor: 'hover:text-[#E4405F]',
      icon: InstagramIcon,
    },
  ];

  return (
    <footer id="contact-section" className="relative z-30 w-full rounded-t-[2.25rem] sm:rounded-t-[2.75rem] bg-[#08070F] text-zinc-100 overflow-hidden pt-12 sm:pt-16 pb-8 sm:pb-10 px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center">

      {/* Ambient Violet / Gold Glow */}
      <div className="absolute -top-20 left-1/3 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-purple-500/15 via-[#FFEE00]/5 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-[1360px] mx-auto flex flex-col gap-8 sm:gap-10">

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT COLUMN: Contact Typography & Meta Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] font-sans">
                Let's connect<br />
                <span className="text-zinc-200">and grow</span>
              </h2>

              {/* Subtitle description */}
              <p className="text-sm sm:text-base text-zinc-400 mt-3 sm:mt-4 leading-relaxed font-normal max-w-md">
                Open to exciting career opportunities, meaningful collaborations, and conversations with people building the future. I'd love to hear from you.
              </p>

              {/* Email Block */}
              <div className="mt-5 sm:mt-6 group">
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Email:
                </div>
                <div className="mt-1 flex items-center gap-3 flex-wrap sm:flex-nowrap">
                  <a
                    href="mailto:itskavinoffc@gmail.com"
                    onClick={() => soundFx.playSelect()}
                    className="flex items-center gap-2.5 text-lg sm:text-xl md:text-2xl font-bold text-white hover:text-[#FFEE00] transition-colors cursor-pointer text-left break-all sm:break-normal group/email"
                    title="Compose email to itskavinoffc@gmail.com"
                  >
                    <span>itskavinoffc@gmail.com</span>
                    <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover/email:text-[#FFEE00] group-hover/email:translate-x-0.5 group-hover/email:-translate-y-0.5 transition-all shrink-0 stroke-[2.2]" />
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 sm:p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-xs font-mono font-normal text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <span className="text-emerald-400 font-sans font-semibold text-xs px-1">Copied!</span>
                    ) : (
                      <Copy className="w-4 h-4 text-zinc-400" />
                    )}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>

          {/* RIGHT COLUMN: Minimalist Typography Sitemap & Social Media Columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col justify-start lg:pl-6 xl:pl-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
              {/* Column 1: SITEMAP */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold tracking-[0.14em] text-zinc-400 uppercase mb-4 sm:mb-5 font-sans">
                  SITEMAP
                </h3>

                <div className="flex flex-col space-y-3 sm:space-y-3.5">
                  <button
                    onClick={() => handleNavClick('projects', 'works-showcase')}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white text-sm sm:text-base font-medium transition-colors cursor-pointer group text-left w-fit"
                  >
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 stroke-[2.2]" />
                    <span>My Works</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('journey', 'experience')}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white text-sm sm:text-base font-medium transition-colors cursor-pointer group text-left w-fit"
                  >
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 stroke-[2.2]" />
                    <span>My Experience</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('about', 'about-details')}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white text-sm sm:text-base font-medium transition-colors cursor-pointer group text-left w-fit"
                  >
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 stroke-[2.2]" />
                    <span>My Skills</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('about', 'my-education')}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white text-sm sm:text-base font-medium transition-colors cursor-pointer group text-left w-fit"
                  >
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 stroke-[2.2]" />
                    <span>My Education</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('journey', 'achievements-section')}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white text-sm sm:text-base font-medium transition-colors cursor-pointer group text-left w-fit"
                  >
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 stroke-[2.2]" />
                    <span>My Achievements</span>
                  </button>

                  {/* My Resume Button */}
                  <div className="pt-2">
                    <motion.a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playSelect()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group active:scale-95"
                      title="View My Resume"
                    >
                      <FileText className="w-4 h-4 text-zinc-900" />
                      <span>My Resume</span>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-900" />
                      </div>
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Column 2: SOCIAL MEDIA */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold tracking-[0.14em] text-zinc-400 uppercase mb-4 sm:mb-5 font-sans">
                  SOCIAL MEDIA
                </h3>

                <div className="flex flex-col space-y-3 sm:space-y-3.5">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;
                    const isHovered = hoveredSocial === item.name;

                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        target={item.isExternal ? '_blank' : undefined}
                        rel={item.isExternal ? 'noopener noreferrer' : undefined}
                        onMouseEnter={() => setHoveredSocial(item.name)}
                        onMouseLeave={() => setHoveredSocial(null)}
                        onClick={() => soundFx.playSelect()}
                        className={`relative flex items-center w-fit text-zinc-300 ${item.hoverColor} text-sm sm:text-base font-medium transition-colors cursor-pointer group text-left py-0.5`}
                      >
                        <div className="flex items-center gap-2">
                          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 stroke-[2.2]" />
                          <span>{item.name}</span>
                        </div>

                        {/* Floating Logo Badge positioned neatly beside the name with a tight, natural gap */}
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 pointer-events-none z-30 flex items-center">
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                key={`popup-${item.name}`}
                                initial={{ opacity: 0, scale: 0.7, x: -6 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.7, x: -4 }}
                                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                                className="flex items-center"
                              >
                                {/* Pointer triangle pointing towards wording */}
                                <div className={`w-2 h-2 rotate-45 -mr-1 z-10 ${item.brandBg}`} />
                                <div
                                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl ${item.brandBg} text-white flex items-center justify-center shadow-xl ${item.shadow} border border-white/20 shrink-0`}
                                >
                                  <Icon className="w-5 h-5 fill-current" />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* BOTTOM ACTION ROW: Scaled Kavinraj M signature with white/yellow swap hover effect */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex items-center justify-start pt-6 sm:pt-8 border-t border-zinc-800/80"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playSelect()}
            className="group cursor-pointer select-none inline-flex items-baseline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-sans"
            title="Kavinraj M"
          >
            <span className="text-white group-hover:text-[#FFEE00] transition-colors duration-300 ease-out">
              Kavinraj
            </span>
            <span className="text-[#FFEE00] group-hover:text-white ml-2 sm:ml-3 transition-colors duration-300 ease-out">
              M
            </span>
          </motion.div>
        </motion.div>

      </div>
    </footer>
  );
};

export default ContactSection;
