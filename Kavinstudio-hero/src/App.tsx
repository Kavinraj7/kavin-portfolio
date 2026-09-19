import React, { useState, useEffect } from 'react';
import { PerspectiveKey, MainNavView } from './types';
import { PERSPECTIVES_DATA } from './data/perspectivesData';
import { Header } from './components/Header';
import { HeroPerspectiveView } from './components/HeroPerspectiveView';
import { DossierView } from './components/DossierView';
import { SystemsView } from './components/SystemsView';
import { WritingView } from './components/WritingView';
import { BiographyView } from './components/BiographyView';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { RecruiterFastPathModal } from './components/RecruiterFastPathModal';
import { EngagementModal } from './components/EngagementModal';
import { soundFx } from './utils/audio';

export default function App() {
  const [activeView, setActiveView] = useState<MainNavView>('hero');
  const [selectedPerspective, setSelectedPerspective] = useState<PerspectiveKey | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isFastPathOpen, setIsFastPathOpen] = useState(false);
  const [isEngagementModalOpen, setIsEngagementModalOpen] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  // Global Keyboard Shortcuts (Escape triggers navigation or modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isTerminalOpen) {
          setIsTerminalOpen(false);
          soundFx.playDismiss();
          return;
        }
        if (isFastPathOpen) {
          setIsFastPathOpen(false);
          soundFx.playDismiss();
          return;
        }
        if (isEngagementModalOpen) {
          setIsEngagementModalOpen(false);
          soundFx.playDismiss();
          return;
        }
        if (activeView !== 'hero') {
          setActiveView('hero');
          soundFx.playDismiss();
          return;
        }
        // In Hero view, ESC activates Recruiter Fast Path
        setIsFastPathOpen((prev) => {
          soundFx.playConfirm();
          return !prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen, isFastPathOpen, isEngagementModalOpen, activeView]);

  const handleSelectPerspective = (key: PerspectiveKey) => {
    setSelectedPerspective(key);
  };

  const handleProceedToDossier = (key: PerspectiveKey) => {
    setSelectedPerspective(key);
    setActiveView('dossier');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSfx = () => {
    setSfxEnabled(!sfxEnabled);
    if (!sfxEnabled) {
      soundFx.enabled = true;
      soundFx.playConfirm();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf8f8] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Top Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenEngagement={() => setIsEngagementModalOpen(true)}
        onOpenProfile={() => setActiveView('biography')}
      />

      {/* Main Content Stage */}
      <main className="flex-1 pt-16">
        {activeView === 'hero' && (
          <HeroPerspectiveView
            perspectives={PERSPECTIVES_DATA}
            selectedKey={selectedPerspective}
            onSelectPerspective={handleSelectPerspective}
            onProceedToDossier={handleProceedToDossier}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onOpenFastPath={() => setIsFastPathOpen(true)}
            sfxEnabled={sfxEnabled}
            onToggleSfx={handleToggleSfx}
          />
        )}

        {activeView === 'dossier' && (
          <DossierView
            perspectives={PERSPECTIVES_DATA}
            currentKey={selectedPerspective || 'holistic'}
            onSelectPerspective={(key) => setSelectedPerspective(key)}
            onBackToHero={() => {
              setActiveView('hero');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onOpenFastPath={() => setIsFastPathOpen(true)}
            onOpenEngagement={() => setIsEngagementModalOpen(true)}
          />
        )}

        {activeView === 'systems' && (
          <SystemsView
            onBackToHero={() => setActiveView('hero')}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />
        )}

        {activeView === 'writing' && (
          <WritingView onBackToHero={() => setActiveView('hero')} />
        )}

        {activeView === 'biography' && (
          <BiographyView
            onBackToHero={() => setActiveView('hero')}
            onOpenEngagement={() => setIsEngagementModalOpen(true)}
          />
        )}
      </main>

      {/* Persistent Technical Footer */}
      <Footer sfxEnabled={sfxEnabled} onToggleSfx={handleToggleSfx} />

      {/* Modals */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onSelectPerspective={(key) => handleProceedToDossier(key as PerspectiveKey)}
      />

      <RecruiterFastPathModal
        isOpen={isFastPathOpen}
        onClose={() => setIsFastPathOpen(false)}
        onProceedToHolistic={() => handleProceedToDossier('holistic')}
        onOpenEngagement={() => setIsEngagementModalOpen(true)}
      />

      <EngagementModal
        isOpen={isEngagementModalOpen}
        onClose={() => setIsEngagementModalOpen(false)}
      />
    </div>
  );
}
