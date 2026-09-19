'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PerspectiveKey } from '@/types';
import { PERSPECTIVES_DATA } from '@/data/perspectivesData';
import { Header } from '@/components/Header';
import { HeroPerspectiveView } from '@/components/HeroPerspectiveView';
import { TerminalModal } from '@/components/TerminalModal';
import { soundFx } from '@/utils/audio';
import WaterWaveIntro from '@/components/water-wave-intro';

export default function Home() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [selectedPerspective, setSelectedPerspective] = useState<PerspectiveKey | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // Light mode by default

  // Sync dark mode class on <html> element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync SFX state with audio engine
  useEffect(() => {
    soundFx.enabled = sfxEnabled;
  }, [sfxEnabled]);

  // Global Keyboard Shortcuts (Escape triggers Terminal toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isTerminalOpen) {
          setIsTerminalOpen(false);
          soundFx.playDismiss();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen]);

  const handleSelectPerspective = (key: PerspectiveKey) => {
    setSelectedPerspective(key);
  };

  const handleToggleSfx = () => {
    setSfxEnabled(!sfxEnabled);
    if (!sfxEnabled) {
      soundFx.enabled = true;
      soundFx.playConfirm();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] dark:bg-[#09090B] text-black dark:text-zinc-100 transition-colors duration-300">
      <AnimatePresence mode="wait">
        {!introCompleted ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-50"
          >
            <WaterWaveIntro onComplete={() => setIntroCompleted(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex-1 flex flex-col w-full"
          >
            {/* Top Header */}
            <Header
              selectedPerspective={selectedPerspective}
              onSelectPerspective={handleSelectPerspective}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              onOpenTerminal={() => setIsTerminalOpen(true)}
            />

            {/* Main Hero Stage */}
            <main className="flex-1 pt-16">
              <HeroPerspectiveView
                perspectives={PERSPECTIVES_DATA}
                selectedKey={selectedPerspective}
                onSelectPerspective={handleSelectPerspective}
                onOpenTerminal={() => setIsTerminalOpen(true)}
                sfxEnabled={sfxEnabled}
                onToggleSfx={handleToggleSfx}
              />
            </main>

            {/* Interactive Terminal Modal */}
            <TerminalModal
              isOpen={isTerminalOpen}
              onClose={() => setIsTerminalOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
