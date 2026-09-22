'use client';

import React from 'react';
import { Sun, Moon, Sparkles, Compass } from 'lucide-react';
import { soundFx } from '../utils/audio';

export type NavTab = 'home' | 'journey';

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
  const toggleTheme = () => {
    soundFx.playConfirm();
    setIsDarkMode(!isDarkMode);
  };

  const handleTabClick = (tab: NavTab) => {
    soundFx.playSelect();
    onSelectTab(tab);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-md border-b border-[#EBE8F5] dark:border-zinc-800/80 bg-white/80 dark:bg-[#09080F]/80">
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

        {/* Center: Navigation Tabs (Home & Journey) */}
        <nav className="flex items-center gap-1.5 p-1 bg-zinc-200/60 dark:bg-zinc-800/60 backdrop-blur-md rounded-full border border-zinc-300/40 dark:border-zinc-700/50">
          <button
            onClick={() => handleTabClick('home')}
            className={`flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer ${
              activeTab === 'home'
                ? 'bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm scale-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-white/40 dark:hover:bg-zinc-700/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleTabClick('journey')}
            className={`flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer ${
              activeTab === 'journey'
                ? 'bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm scale-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-white/40 dark:hover:bg-zinc-700/40'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Journey</span>
          </button>
        </nav>

        {/* Right: Theme Toggle & AI Terminal Trigger */}
        <div className="flex items-center gap-3">
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
        </div>
      </div>
    </header>
  );
};
