'use client';

import React, { useEffect } from 'react';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    let lenisInstance: any = null;
    let reqId: number;

    import('lenis').then(({ default: Lenis }) => {
      lenisInstance = new Lenis({
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.5,
        infinite: false,
      });

      function raf(time: number) {
        lenisInstance.raf(time);
        reqId = requestAnimationFrame(raf);
      }

      reqId = requestAnimationFrame(raf);
    }).catch(() => {
      // Graceful fallback
    });

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
