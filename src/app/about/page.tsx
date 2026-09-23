'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, NavTab } from '@/components/Header';
import { AboutSection } from '@/components/AboutSection';
import { TerminalModal } from '@/components/TerminalModal';

export default function AboutPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NavTab>('about');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const handleSelectTab = (tab: NavTab) => {
    if (tab === 'home') {
      router.push('/');
    } else if (tab === 'journey') {
      router.push('/?tab=journey');
    } else {
      setActiveTab('about');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Fixed Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={handleSetDarkMode}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-16 flex flex-col w-full">
        <AboutSection
          onNavigateHome={() => router.push('/')}
          onNavigateJourney={() => router.push('/?tab=journey')}
          onNavigateProjects={() => router.push('/#projects')}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />
      </main>

      {/* Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
