import React from 'react';
import { Sun, Moon, Sparkles, User, Contrast } from 'lucide-react';
import { MainNavView } from '../types';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  activeView: MainNavView;
  setActiveView: (view: MainNavView) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenEngagement: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  isDarkMode,
  setIsDarkMode,
  onOpenEngagement,
  onOpenProfile
}) => {
  const handleNavClick = (view: MainNavView) => {
    soundFx.playHover();
    setActiveView(view);
  };

  const toggleTheme = () => {
    soundFx.playConfirm();
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-colors duration-300 backdrop-blur-xl border-b border-zinc-200/40 dark:border-zinc-800/60 bg-[#fcf8f8]/90 dark:bg-[#0a0a0a]/90">
      <div className="h-16 max-w-[1440px] mx-auto px-5 md:px-12 flex items-center justify-between gap-6">
        {/* Left: Brand Identity & Nav Links */}
        <div className="flex items-center gap-8 md:gap-10">
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('hero')}
            className="group flex items-center gap-1.5 font-display text-xl tracking-tighter uppercase font-bold text-zinc-900 dark:text-white transition-transform hover:scale-[1.02]"
            title="Return to Hero Stage"
          >
            <span>Kavin</span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-white group-hover:opacity-40 transition-opacity"></span>
          </button>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
            {[
              { key: 'hero' as MainNavView, label: 'Work', target: 'dossier' as MainNavView },
              { key: 'systems' as MainNavView, label: 'Systems', target: 'systems' as MainNavView },
              { key: 'writing' as MainNavView, label: 'Writing', target: 'writing' as MainNavView },
              { key: 'biography' as MainNavView, label: 'Biography', target: 'biography' as MainNavView }
            ].map((nav) => {
              const isActive = activeView === nav.target || (nav.label === 'Work' && (activeView === 'hero' || activeView === 'dossier'));
              return (
                <button
                  key={nav.label}
                  id={`nav-link-${nav.label.toLowerCase()}`}
                  onClick={() => handleNavClick(nav.target)}
                  className={`text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-zinc-950 dark:text-white underline underline-offset-8 decoration-2 decoration-zinc-950 dark:decoration-white'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  {nav.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center: Live Availability Pill */}
        <div className="hidden md:flex items-center">
          <button
            id="availability-pill-btn"
            onClick={() => {
              soundFx.playHover();
              onOpenEngagement();
            }}
            className="group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] text-zinc-800 dark:text-zinc-200 tracking-wider uppercase font-medium group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
              Available for select engagements & roles • Q2 2025
            </span>
          </button>
        </div>

        {/* Right: Theme Toggle & Profile Button */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Theme Pill Toggle Switch */}
          <button
            id="theme-toggle-btn"
            aria-label="Toggle theme"
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-between w-14 h-8 p-1 rounded-full bg-zinc-200 dark:bg-[#18181b] border border-zinc-300 dark:border-zinc-700/60 transition-colors focus:outline-none"
          >
            <Sun className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400 ml-1 transition-transform dark:scale-75" />
            <div
              className={`w-6 h-6 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center transition-transform duration-300 ${
                isDarkMode ? 'translate-x-0' : '-translate-x-6'
              }`}
            >
              <Contrast className="w-3.5 h-3.5 text-white dark:text-zinc-900" />
            </div>
            <Moon className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400 mr-1 transition-transform dark:scale-100" />
          </button>

          {/* Quick Profile Icon */}
          <button
            id="quick-profile-btn"
            onClick={() => {
              soundFx.playHover();
              onOpenProfile();
            }}
            aria-label="Open author profile"
            className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-200 text-white dark:text-zinc-900 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
