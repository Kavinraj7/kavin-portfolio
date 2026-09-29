'use client';

import React, { useState } from 'react';
import {
  Home,
  User,
  FolderGit2,
  Compass,
  Sparkles,
  Sun,
  Moon,
  Mail,
  Menu,
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import CircularNavigation, { NavItem } from '@/components/ui/cicular-navigation-bar';
import { Button } from '@/components/ui/button';

export type NavTab = 'home' | 'about' | 'projects' | 'journey';

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
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    soundFx.playSelect();
    setIsNavOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    soundFx.playConfirm();
    setIsDarkMode(!isDarkMode);
  };

  const handleTabClick = (tab: NavTab) => {
    soundFx.playSelect();
    onSelectTab(tab);
  };

  const handleContactClick = () => {
    soundFx.playSelect();
    const contactEl =
      document.getElementById('contact') ||
      document.getElementById('contact-section') ||
      document.querySelector('footer');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const navItems: NavItem[] = [
    {
      name: 'Home',
      icon: Home,
      onClick: () => handleTabClick('home'),
    },
    {
      name: 'About',
      icon: User,
      onClick: () => handleTabClick('about'),
    },
    {
      name: 'Projects',
      icon: FolderGit2,
      onClick: () => handleTabClick('projects'),
    },
    {
      name: 'Journey',
      icon: Compass,
      onClick: () => handleTabClick('journey'),
    },
    {
      name: 'AI Chat',
      icon: Sparkles,
      onClick: () => {
        soundFx.playTerminal();
        onOpenTerminal();
      },
    },
    {
      name: isDarkMode ? 'Light' : 'Dark',
      icon: isDarkMode ? Sun : Moon,
      onClick: toggleTheme,
    },
    {
      name: 'Contact',
      icon: Mail,
      onClick: handleContactClick,
    },
  ];

  return (
    <>
      {/* Floating Top Nav (No background rectangle or border) */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
        <div className="h-16 sm:h-20 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Left: Only User's Name */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => handleTabClick('home')}
              className="group flex items-center gap-1.5 font-display text-xl tracking-tighter uppercase font-black text-black dark:text-white cursor-pointer select-none drop-shadow-sm hover:opacity-80 transition-opacity"
            >
              <span>KAVIN</span>
            </button>
          </div>

          {/* Right: Open Navigation Button */}
          <div className="flex items-center pointer-events-auto">
            <Button
              onClick={toggleNav}
              variant="outline"
              className="rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2 border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md hover:bg-white dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md text-zinc-900 dark:text-zinc-100"
            >
              <Menu className="w-4 h-4" />
              <span>Open Navigation</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Center Circular Navigation Wheel */}
      <CircularNavigation
        navItems={navItems}
        isOpen={isNavOpen}
        toggleMenu={toggleNav}
      />
    </>
  );
};

export default Header;
