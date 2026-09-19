'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LuffyPeekingVideoProps {
  isVisible: boolean;
  onVideoEnd?: () => void;
}

export default function LuffyPeekingVideo({
  isVisible,
  onVideoEnd,
}: LuffyPeekingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const endedCalledRef = useRef(false);

  // Preload video stream on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  // Start playback instantly when isVisible becomes true
  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = 2.0; // Play video at 2x speed
      endedCalledRef.current = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Autoplay handled:', err);
        });
      }
    }
  }, [isVisible]);

  const handleTimeUpdate = () => {
    if (
      videoRef.current &&
      (videoRef.current.ended ||
        (videoRef.current.duration &&
          videoRef.current.currentTime >= videoRef.current.duration - 0.15) ||
        videoRef.current.currentTime >= 9.8) &&
      !endedCalledRef.current
    ) {
      endedCalledRef.current = true;
      if (onVideoEnd) {
        onVideoEnd();
      }
    }
  };

  const handleEnded = () => {
    if (!endedCalledRef.current) {
      endedCalledRef.current = true;
      if (onVideoEnd) {
        onVideoEnd();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.8, originY: 1 }}
      animate={
        isVisible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 25, scale: 0.8 }
      }
      transition={{
        type: 'spring',
        stiffness: 380,
        damping: 22,
        mass: 0.4,
      }}
      style={{
        visibility: isVisible ? 'visible' : 'hidden',
      }}
      /* Positioned directly above 'inr' of Kavinraj M */
      className="absolute bottom-[65%] sm:bottom-[67%] md:bottom-[69%] left-[48.5%] -translate-x-1/2 z-30 pointer-events-none flex justify-center items-end overflow-visible"
    >
      <video
        ref={videoRef}
        src="/luffypopsup.webm"
        preload="auto"
        playsInline
        muted
        loop={false}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="w-auto max-w-[130px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[340px] h-auto object-contain bg-transparent border-none outline-none shadow-none overflow-visible"
      />
    </motion.div>
  );
}

