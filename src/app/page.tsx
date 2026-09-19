'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LuffyPushIntro from '@/components/luffy-push-intro';
import HeroSection from '@/components/hero-section';

export default function Home() {
  const [introCompleted, setIntroCompleted] = useState(false);

  const handleIntroComplete = () => {
    setIntroCompleted(true);
  };

  return (
    <main className="min-h-screen w-full bg-white text-[#1A1715] relative overflow-hidden select-none p-0 m-0">
      <AnimatePresence mode="wait">
        {!introCompleted ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full min-h-screen"
          >
            <LuffyPushIntro onComplete={handleIntroComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="hero"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full min-h-screen"
          >
            <HeroSection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
