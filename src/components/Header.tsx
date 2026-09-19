'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Terminal, ChevronDown, Check } from 'lucide-react';
import { PerspectiveKey } from '../types';
import { PERSPECTIVES_DATA } from '../data/perspectivesData';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  selectedPerspective: PerspectiveKey | null;
  onSelectPerspective: (key: PerspectiveKey) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenTerminal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedPerspective,
  onSelectPerspective,
  isDarkMode,
  setIsDarkMode,
  onOpenTerminal
}) => {
  const [isPathDropdownOpen, setIsPathDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentItem = PERSPECTIVES_DATA.find((p) => p.key === selectedPerspective);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsPathDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    soundFx.playConfirm();
    setIsDarkMode(!isDarkMode);
  };

  const handlePathSelect = (key: PerspectiveKey) => {
    soundFx.playSelect();
    onSelectPerspective(key);
    setIsPathDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-colors duration-300 backdrop-blur-md border-b border-[#EBE8F5] dark:border-zinc-800/80 bg-[#FAFAFC]/90 dark:bg-[#09080F]/90">
      <div className="h-16 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playHover();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-1.5 font-display text-xl tracking-tighter uppercase font-black text-black dark:text-white cursor-pointer select-none"
          >
            <span>KAVIN</span>

          </button>
        </div>

        {/* Center: Interactive Path Selector Pill */}
        <div className="relative flex items-center" ref={dropdownRef}>
          <button
            id="availability-pill-btn"
            onClick={() => {
              soundFx.playHover();
              setIsPathDropdownOpen(!isPathDropdownOpen);
            }}
            className="group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white hover:bg-[#FAF8FF] dark:bg-[#171424] dark:hover:bg-[#201B34] border border-[#EBE8F5] dark:border-purple-900/40 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 cursor-pointer shadow-[0_2px_10px_rgba(124,58,237,0.03)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] shrink-0" />
            <span className="text-[11px] font-bold text-black dark:text-zinc-200 tracking-wider uppercase font-mono">
              {currentItem ? `CHOOSE PATH • ${currentItem.title}` : 'CHOOSE PATH • 5 PERSPECTIVES AVAILABLE'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${isPathDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Paths Dropdown Menu */}
          {isPathDropdownOpen && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-80 bg-white dark:bg-[#141120] border border-[#EBE8F5] dark:border-purple-900/50 rounded-2xl p-2.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 text-[10px] font-mono text-zinc-500 uppercase font-bold border-b border-zinc-100 dark:border-zinc-800 mb-1.5 flex items-center justify-between">
                <span>Select Perspective Path</span>
                <span className="text-[#8B5CF6] font-semibold">5 Active</span>
              </div>
              <div className="space-y-1">
                {PERSPECTIVES_DATA.map((p) => {
                  const isSelected = selectedPerspective === p.key;
                  return (
                    <button
                      key={p.key}
                      onClick={() => handlePathSelect(p.key)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all cursor-pointer ${isSelected
                        ? 'bg-[#18132B] text-white dark:bg-[#8B5CF6] dark:text-white font-bold'
                        : 'hover:bg-[#FAF8FF] dark:hover:bg-purple-950/40 text-zinc-800 dark:text-zinc-200'
                        }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="truncate text-[11px] font-semibold">{p.title}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: Theme Toggle & AI Terminal Trigger */}
        <div className="flex items-center gap-3">
          {/* Theme Pill Toggle Switch (Violet / Purple track from mockup) */}
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
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'
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
