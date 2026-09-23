'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles, Compass, User, ChevronDown, ChevronUp } from 'lucide-react';
import { soundFx } from '../utils/audio';

export type NavTab = 'home' | 'about' | 'journey';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenTerminal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  isDarkMode,
  setIsDarkMode,
  onOpenTerminal,
}) => {
  const [isInSkillsSection, setIsInSkillsSection] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userManuallyOpened, setUserManuallyOpened] = useState(false);

  // Real-time bounding box and scroll tracking to auto-hide navbar only at My Skills (#about-details)
  useEffect(() => {
    let wasInView = false;

    const checkSkillsSection = () => {
      const skillsEl = document.getElementById('about-details');
      if (!skillsEl) {
        if (wasInView) {
          setIsInSkillsSection(false);
          setIsCollapsed(false);
          setUserManuallyOpened(false);
          wasInView = false;
        }
        return;
      }

      const rect = skillsEl.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // When the top of the skills section enters upper viewport and bottom is still visible
      const inView = rect.top <= 120 && rect.bottom >= 160;

      if (inView !== wasInView) {
        wasInView = inView;
        setIsInSkillsSection(inView);
        if (inView) {
          // Entering skills section: auto-hide header
          setIsCollapsed(true);
          setUserManuallyOpened(false);
        } else {
          // Leaving skills section: restore header
          setIsCollapsed(false);
          setUserManuallyOpened(false);
        }
      }
    };

    // Initial check and listeners for scroll, resize, and Lenis updates
    checkSkillsSection();
    window.addEventListener('scroll', checkSkillsSection, { passive: true });
    window.addEventListener('resize', checkSkillsSection);
    const interval = setInterval(checkSkillsSection, 200);

    return () => {
      window.removeEventListener('scroll', checkSkillsSection);
      window.removeEventListener('resize', checkSkillsSection);
      clearInterval(interval);
    };
  }, [activeTab]);

  const toggleTheme = () => {
    soundFx.playConfirm();
    setIsDarkMode(!isDarkMode);
  };

  const handleTabClick = (tab: NavTab) => {
    soundFx.playSelect();
    onSelectTab(tab);
  };

  const handlePullDown = () => {
    soundFx.playSelect();
    setIsCollapsed(false);
    setUserManuallyOpened(true);
  };

  const handleHideNavbar = () => {
    soundFx.playSelect();
    setIsCollapsed(true);
    setUserManuallyOpened(false);
  };

  // Header is hidden if we are in the skills section AND isCollapsed is true (and not manually opened)
  const isHeaderHidden = isInSkillsSection && isCollapsed && !userManuallyOpened;

  return (
    <>
      {/* Floating Pull-Down Arrow on Top Right ONLY when in My Skills section and navbar is hidden */}
      <div
        className={`fixed top-3 right-4 sm:right-6 z-50 transition-all duration-300 ${
          isHeaderHidden
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={handlePullDown}
          aria-label="Pull navigation bar down"
          title="Pull down Navigation Bar"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/90 dark:bg-white/95 text-white dark:text-black shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs font-mono font-bold border border-white/20 dark:border-black/20"
        >
          <span>Menu</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out backdrop-blur-md border-b border-[#EBE8F5] dark:border-zinc-800/80 bg-white/80 dark:bg-[#09080F]/80 ${
          isHeaderHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="h-16 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTabClick('home')}
              className="group flex items-center gap-1.5 font-display text-xl tracking-tighter uppercase font-black text-black dark:text-white cursor-pointer select-none"
            >
              <span>KAVIN</span>
            </button>
          </div>

          {/* Center: Navigation Tabs (Home, About, Journey) */}
          <nav className="flex items-center gap-1 sm:gap-1.5 p-1 bg-zinc-200/60 dark:bg-zinc-800/60 backdrop-blur-md rounded-full border border-zinc-300/40 dark:border-zinc-700/50">
            <button
              onClick={() => handleTabClick('home')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm scale-100'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-white/40 dark:hover:bg-zinc-700/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => handleTabClick('about')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm scale-100'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-white/40 dark:hover:bg-zinc-700/40'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>About</span>
            </button>

            <button
              onClick={() => handleTabClick('journey')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                activeTab === 'journey'
                  ? 'bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm scale-100'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-white/40 dark:hover:bg-zinc-700/40'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Journey</span>
            </button>
          </nav>

          {/* Right: Theme Toggle, AI Terminal, and Hide Nav Arrow ONLY in Skills section */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Pill Toggle Switch */}
            <div className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
              <button
                id="theme-toggle-btn"
                aria-label="Toggle theme"
                type="button"
                onClick={toggleTheme}
                className="relative w-11 h-6 rounded-full bg-[#8B5CF6] dark:bg-[#7C3AED] p-0.5 transition-colors focus:outline-none cursor-pointer shadow-sm"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                    isDarkMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <Moon className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-400" />
            </div>

            {/* Launch Terminal Button (>_) */}
            <button
              id="quick-terminal-btn"
              onClick={() => {
                soundFx.playTerminal();
                onOpenTerminal();
              }}
              aria-label="Launch AI Terminal"
              title="Launch Kavin AI Terminal"
              className="w-8 h-8 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer font-mono font-bold text-xs shadow-sm"
            >
              <span>&gt;_</span>
            </button>

            {/* Hide Nav Bar Button (Up Arrow) - ONLY shown when inside the Skills Section */}
            {isInSkillsSection && !isHeaderHidden && (
              <button
                onClick={handleHideNavbar}
                aria-label="Hide navigation bar"
                title="Hide Navigation Bar"
                className="w-8 h-8 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-sm ml-0.5"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
