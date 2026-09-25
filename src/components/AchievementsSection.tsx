'use client';

import React from 'react';
import { ZoomSlider } from '@/components/ui/zoom-slider';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="relative z-30 w-full overflow-hidden bg-black border-t border-zinc-900">
      <ZoomSlider
        scaleOnHover
        textOnHover
        size={1}
        easeScrollPercentage={100}
      />
    </section>
  );
};

export default AchievementsSection;
