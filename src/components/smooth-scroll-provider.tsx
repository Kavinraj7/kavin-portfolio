'use client';

import React, { useEffect } from 'react';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    let lenisInstance: any = null;
    let reqId: number;

    // Detect if the device is primarily touch/mobile to keep native momentum scrolling
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 1);

    import('lenis').then(({ default: Lenis }) => {
      lenisInstance = new Lenis({
        // Fine-tuned lerp: lower = more inertia, higher = snappier
        lerp: isTouchDevice ? 0.12 : 0.075,
        // Duration controls the max scroll easing time in seconds
        duration: isTouchDevice ? 1.0 : 1.3,
        smoothWheel: true,
        // Multiplier for wheel events
        wheelMultiplier: 1.1,
        // Touch multiplier - set close to 1 for near-native feel
        touchMultiplier: isTouchDevice ? 1.2 : 1.5,
        infinite: false,
        // Use smooth easing
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // Sync to touch for mobile devices
        syncTouch: isTouchDevice,
        syncTouchLerp: 0.1,
      });

      function raf(time: number) {
        lenisInstance.raf(time);
        reqId = requestAnimationFrame(raf);
      }

      reqId = requestAnimationFrame(raf);
    }).catch(() => {
      // Graceful fallback — native scroll remains
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
