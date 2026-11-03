'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PerspectiveKey } from '@/types';
import { PERSPECTIVES_DATA } from '@/data/perspectivesData';
import { Header, NavTab } from '@/components/Header';
import { UrbanHeroSection } from '@/components/UrbanHeroSection';
import { GrowHeroSection } from '@/components/GrowHeroSection';
import { MoreThanOnePerspectiveSection } from '@/components/MoreThanOnePerspectiveSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { JourneyCardsSection } from '@/components/JourneyCardsSection';
import { NeverGiveUpMarquee } from '@/components/NeverGiveUpMarquee';
import { ExperienceTimelineSection } from '@/components/ExperienceTimelineSection';
import PerspectiveTunnelHero from '@/components/ui/perspective-tunnel-hero';
import { AchievementsSection } from '@/components/AchievementsSection';
import { ThingsThatShapedMeSection } from '@/components/ThingsThatShapedMeSection';
import { HorizonHeroSection } from '@/components/ui/horizon-hero-section';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsTab } from '@/components/ProjectsTab';
import { TerminalModal } from '@/components/TerminalModal';
import { IntroCanvasScreen } from '@/components/IntroCanvasScreen';
import { soundFx } from '@/utils/audio';
import { scrollToTop, scrollToTarget } from '@/utils/scroll';

export default function Home() {
  const [hasExplored, setHasExplored] = useState(false);
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
      if (tab === 'journey' || tab === 'about' || tab === 'projects' || tab === 'home') {
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

  const handleNavigateTo = (tab: NavTab, sectionId?: string) => {
    soundFx.playSelect();
    if (sectionId) {
      if (activeTab !== tab) {
        setActiveTab(tab);
        setTimeout(() => {
          scrollToTarget(sectionId);
        }, 120);
        setTimeout(() => {
          scrollToTarget(sectionId);
        }, 320);
      } else {
        scrollToTarget(sectionId);
      }
    } else {
      if (activeTab !== tab) {
        setActiveTab(tab);
      }
      scrollToTop();
    }
  };

  useEffect(() => {
    const handleAppNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab: NavTab; sectionId?: string }>;
      if (customEvent.detail) {
        handleNavigateTo(customEvent.detail.tab, customEvent.detail.sectionId);
      }
    };
    window.addEventListener('app-navigate', handleAppNavigate);
    return () => window.removeEventListener('app-navigate', handleAppNavigate);
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Intro Canvas Starting Screen */}
      <AnimatePresence>
        {!hasExplored && (
          <IntroCanvasScreen onExplore={() => setHasExplored(true)} />
        )}
      </AnimatePresence>

      {/* Top Fixed Header with Home, About, Projects, and Journey tabs */}
      {hasExplored && (
        <>
          <Header
            activeTab={activeTab}
            onSelectTab={(tab) => {
              setActiveTab(tab);
              scrollToTop();
            }}
            isDarkMode={isDarkMode}
            setIsDarkMode={handleSetDarkMode}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col w-full">
            <AnimatePresence mode="wait">
              {activeTab === 'home' ? (
                <motion.div
                  key="home-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'opacity' }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Section 1: Home Hero Section (Urban / Built for the Bold Editorial) */}
                  <UrbanHeroSection
                    onOpenTerminal={() => setIsTerminalOpen(true)}
                    onNavigateJourney={() => {
                      soundFx.playSelect();
                      setActiveTab('journey');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onNavigateProjects={() => {
                      soundFx.playSelect();
                      setActiveTab('projects');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onNavigateAbout={() => {
                      soundFx.playSelect();
                      setActiveTab('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />

                  {/* Section 2: MORE THAN ONE PERSPECTIVE (Circular Carousel) */}
                  <div className="w-full">
                    <MoreThanOnePerspectiveSection
                      onExploreJourney={() => setActiveTab('journey')}
                    />
                  </div>

                  {/* Section 2.5: My Experience (Interactive Timeline) */}
                  <div id="experience" className="w-full relative z-20 bg-background">
                    <ExperienceTimelineSection />
                  </div>

                  {/* Section 2.6: My Skills (Software Developer Spatial Tunnel) */}
                  <div id="skills-tunnel" className="w-full relative z-20">
                    <PerspectiveTunnelHero
                      onViewAllSkills={() => {
                        soundFx.playSelect();
                        setActiveTab('about');
                        setTimeout(() => {
                          const el = document.getElementById('about-details');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }, 120);
                      }}
                    />
                  </div>

                  {/* Section 3: Projects that made me (Elastic Gallery) */}
                  <div className="w-full">
                    <ProjectsSection
                      onOpenTerminal={() => setIsTerminalOpen(true)}
                      onExploreJourney={() => setActiveTab('journey')}
                    />
                  </div>

                  {/* Section 4: Get in Touch with us (Navigation & Contact Footer) */}
                  <div className="w-full bg-[#FAFAFC] dark:bg-[#09080F]">
                    <ContactSection
                      onOpenTerminal={() => setIsTerminalOpen(true)}
                      onNavigate={handleNavigateTo}
                    />
                  </div>
                </motion.div>
              ) : activeTab === 'about' ? (
                <motion.div
                  key="about-section"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'opacity, transform' }}
                  className="w-full flex flex-col items-center"
                >
                  <AboutSection
                    onNavigate={handleNavigateTo}
                    onNavigateHome={() => handleNavigateTo('home')}
                    onNavigateJourney={() => handleNavigateTo('journey')}
                    onNavigateProjects={() => handleNavigateTo('projects')}
                    onOpenTerminal={() => setIsTerminalOpen(true)}
                  />
                </motion.div>
              ) : activeTab === 'projects' ? (
                <motion.div
                  key="projects-tab-section"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'opacity, transform' }}
                  className="w-full flex flex-col items-center"
                >
                  <ProjectsTab
                    onNavigate={handleNavigateTo}
                    onOpenTerminal={() => setIsTerminalOpen(true)}
                    onNavigateJourney={() => handleNavigateTo('journey')}
                    onNavigateHome={() => handleNavigateTo('home')}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="journey-section"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'opacity, transform' }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Journey Section 1: 3D Horizon / Cosmos Hero Section */}
                  <div className="w-full -mt-16">
                    <HorizonHeroSection />
                  </div>

                  {/* Journey Section 2: Seven Scroll-Animated Milestone Cards (How Multidisciplinary Thinking Came Together) */}
                  <div id="journey-milestones" className="w-full relative z-10">
                    <JourneyCardsSection />
                  </div>

                  {/* Dynamic Typography Marquee: NEVER GIVE UP (Left-to-Right) */}
                  <div className="w-full relative z-20">
                    <NeverGiveUpMarquee />
                  </div>

                  {/* Journey Section 3: My Experience Interactive Timeline */}
                  <div id="experience" className="w-full relative z-30 bg-background">
                    <ExperienceTimelineSection />
                  </div>

                  {/* Journey Section 4: My Achievements Zoom Slider */}
                  <div id="achievements-section" className="w-full relative z-30">
                    <AchievementsSection />
                  </div>

                  {/* Journey Section 5: Things That Shaped Me Bento Grid */}
                  <div id="things-shaped-me" className="w-full relative z-30">
                    <ThingsThatShapedMeSection />
                  </div>

                  {/* Universal Dark Theme Contact Footer */}
                  <div className="w-full bg-[#FAFAFC] dark:bg-[#08070F]">
                    <ContactSection
                      onOpenTerminal={() => setIsTerminalOpen(true)}
                      onNavigate={handleNavigateTo}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </>
      )}

      {/* Interactive Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
