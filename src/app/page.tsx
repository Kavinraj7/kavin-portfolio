'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PerspectiveKey } from '@/types';
import { PERSPECTIVES_DATA } from '@/data/perspectivesData';
import { Header, NavTab } from '@/components/Header';
import { GrowHeroSection } from '@/components/GrowHeroSection';
import { MoreThanOnePerspectiveSection } from '@/components/MoreThanOnePerspectiveSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { BeyondTheScreenSection } from '@/components/BeyondTheScreenSection';
import { WhereDoYouWannaLandSection } from '@/components/WhereDoYouWannaLandSection';
import { ContactSection } from '@/components/ContactSection';
import { JourneyCardsSection } from '@/components/JourneyCardsSection';
import { HeroPerspectiveView } from '@/components/HeroPerspectiveView';
import { AboutSection } from '@/components/AboutSection';
import { TerminalModal } from '@/components/TerminalModal';
import { soundFx } from '@/utils/audio';

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedPerspective, setSelectedPerspective] = useState<PerspectiveKey | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Read tab parameter from URL on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'journey' || tab === 'about') {
        setActiveTab(tab as NavTab);
      }
    }
  }, []);

  // Initialize theme from localStorage on client mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    } catch {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleSetDarkMode = (val: boolean) => {
    setIsDarkMode(val);
    try {
      localStorage.setItem('theme', val ? 'dark' : 'light');
    } catch {}
    if (val) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Top Fixed Header with Home, About, and Journey tabs */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={handleSetDarkMode}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-16 flex flex-col w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'home' ? (
            <motion.div
              key="home-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              {/* Section 1: Home Hero Section */}
              <GrowHeroSection
                onOpenTerminal={() => setIsTerminalOpen(true)}
                onNavigateJourney={() => setActiveTab('journey')}
              />

              {/* Section 2: MORE THAN ONE PERSPECTIVE (Circular Carousel) */}
              <div className="w-full">
                <MoreThanOnePerspectiveSection
                  onExploreJourney={() => setActiveTab('journey')}
                />
              </div>

              {/* Section 3: Projects that made me (Elastic Gallery) */}
              <div className="w-full">
                <ProjectsSection
                  onOpenTerminal={() => setIsTerminalOpen(true)}
                  onExploreJourney={() => setActiveTab('journey')}
                />
              </div>

              {/* Section 4: Beyond the screen (Feature Carousel) */}
              <div className="w-full">
                <BeyondTheScreenSection
                  onOpenTerminal={() => setIsTerminalOpen(true)}
                  onExploreJourney={() => setActiveTab('journey')}
                />
              </div>

              {/* Section 5: Where do you wanna land next? (Liquid Glass Buttons) */}
              <div className="w-full">
                <WhereDoYouWannaLandSection
                  onNavigateJourney={() => setActiveTab('journey')}
                  onNavigateAbout={() => {
                    soundFx.playSelect();
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onNavigateProjects={() => {
                    const el = document.getElementById('projects-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>

              {/* Section 6: Get in Touch with us (Contact Form) */}
              <div className="w-full">
                <ContactSection
                  onOpenTerminal={() => setIsTerminalOpen(true)}
                />
              </div>
            </motion.div>
          ) : activeTab === 'about' ? (
            <motion.div
              key="about-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              <AboutSection
                onNavigateHome={() => {
                  soundFx.playSelect();
                  setActiveTab('home');
                }}
                onNavigateJourney={() => {
                  soundFx.playSelect();
                  setActiveTab('journey');
                }}
                onNavigateProjects={() => {
                  soundFx.playSelect();
                  setActiveTab('home');
                  setTimeout(() => {
                    document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                onOpenTerminal={() => setIsTerminalOpen(true)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="journey-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              {/* Journey Section 1: Interactive Perspectives View */}
              <div className="w-full flex justify-center py-4 sm:py-6">
                <HeroPerspectiveView
                  perspectives={PERSPECTIVES_DATA}
                  selectedKey={selectedPerspective}
                  onSelectPerspective={handleSelectPerspective}
                  onOpenTerminal={() => setIsTerminalOpen(true)}
                  sfxEnabled={sfxEnabled}
                  onToggleSfx={handleToggleSfx}
                />
              </div>

              {/* Journey Section 2: Seven Scroll-Animated Milestone Cards */}
              <div id="journey-milestones" className="w-full">
                <JourneyCardsSection />
              </div>

              {/* Universal Dark Theme Contact Footer */}
              <div className="w-full">
                <ContactSection
                  onOpenTerminal={() => setIsTerminalOpen(true)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Interactive Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
