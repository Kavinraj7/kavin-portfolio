"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  icon?: React.ElementType;
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const VISIBLE_COUNT = 5;

function getItemPosition(index: number, activeIndex: number, total: number) {
  const offset = index - activeIndex;
  const half = Math.floor(VISIBLE_COUNT / 2);
  let adjustedOffset = offset;

  if (offset > half) adjustedOffset = offset - total;
  if (offset < -half) adjustedOffset = offset + total;

  const abs = Math.abs(adjustedOffset);
  if (abs > 2) return null;

  const sign = Math.sign(adjustedOffset);

  // Precision 3D fan-out coordinates
  let x = 0;
  let y = 12;
  let scale = 1;
  let opacity = 1;
  let zIndex = 30;

  if (abs === 1) {
    x = sign * 280;
    y = 0;
    scale = 0.84;
    opacity = 0.72;
    zIndex = 20;
  } else if (abs === 2) {
    x = sign * 490;
    y = -12;
    scale = 0.68;
    opacity = 0.38;
    zIndex = 10;
  }

  return { x, y, scale, opacity, zIndex, adjustedOffset };
}

export function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  autoPlay = true,
  autoPlayInterval = 4000,
  className,
}: CircularCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = controlledIndex ?? internalIndex;
  const total = items.length;

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % total) + total) % total;
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }
      onActiveChange?.(newIndex);
    },
    [total, controlledIndex, onActiveChange],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoPlay || isHovered || isFocused) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, isHovered, isFocused, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handler);
    return () => el?.removeEventListener("keydown", handler);
  }, [next, prev]);

  const activeItem = items[activeIndex];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 outline-none w-full select-none",
        className,
      )}
    >
      {/* Central Stage Track */}
      <div className="relative h-[270px] sm:h-[290px] md:h-[310px] w-full max-w-5xl flex items-center justify-center">
        
        {/* Background Center Perspective Watermark Number & Glow */}
        {activeItem && (
          <motion.div
            key={`center-watermark-${activeItem.id}`}
            initial={{ opacity: 0, scale: 0.85, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 select-none"
          >
            {/* Ambient Radial Violet Glow behind number */}
            <div className="w-72 h-72 rounded-full bg-purple-500/15 dark:bg-purple-600/20 blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />

            {/* Giant Watermark Number positioned above active card */}
            <span className="text-[140px] sm:text-[180px] md:text-[210px] font-black tracking-tighter text-purple-950/[0.12] dark:text-purple-200/[0.16] font-mono select-none leading-none -translate-y-6 sm:-translate-y-8">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            const pos = getItemPosition(i, activeIndex, total);
            if (!pos) return null;

            const isActive = i === activeIndex;
            const IconComponent = item.icon;

            return (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  opacity: pos.opacity,
                  zIndex: pos.zIndex,
                }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => goTo(i)}
                aria-label={item.title}
                aria-selected={isActive}
                role="option"
                className={cn(
                  "absolute left-1/2 top-1/2 flex h-48 sm:h-52 md:h-56 w-[290px] sm:w-[330px] md:w-[370px] lg:w-[390px] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-start justify-between rounded-[24px] sm:rounded-[28px] border p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 text-left",
                  isActive
                    ? "bg-gradient-to-b from-[#1E1932] via-[#141122] to-[#0A0814] text-white border-purple-500/60 shadow-[0_20px_50px_-10px_rgba(124,58,237,0.45)] ring-1 ring-purple-400/60"
                    : "bg-white/95 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 border-zinc-200/90 dark:border-white/10 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] hover:border-purple-300 dark:hover:border-purple-600",
                )}
                style={{ transformOrigin: "center center" }}
              >
                {/* Top Row: Icon + Tag Badge & Category Index */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {IconComponent && (
                      <div
                        className={cn(
                          "w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition-colors",
                          isActive
                            ? "bg-purple-500/25 text-purple-300 border border-purple-400/40"
                            : "bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300",
                        )}
                      >
                        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    )}
                    {item.tag && (
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider font-mono",
                          isActive
                            ? "bg-purple-500/20 text-purple-300 border border-purple-400/30"
                            : "bg-zinc-200/70 dark:bg-white/10 text-zinc-600 dark:text-zinc-400",
                        )}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs sm:text-sm font-mono font-bold",
                      isActive ? "text-purple-300/90" : "text-zinc-400 dark:text-zinc-600",
                    )}
                  >
                    0{i + 1}
                  </span>
                </div>

                {/* Bottom Content: Title & Description */}
                <div className="w-full mt-auto pt-2">
                  <h3
                    className={cn(
                      "font-bold leading-tight tracking-tight transition-colors duration-300 text-base sm:text-lg md:text-xl",
                      isActive ? "text-white" : "text-zinc-900 dark:text-white/90",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1.5 line-clamp-2 sm:line-clamp-3 text-xs sm:text-[13px] leading-relaxed transition-colors duration-300",
                      isActive ? "text-zinc-300" : "text-zinc-500 dark:text-zinc-400",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Controls & Perspective Badge */}
      <div className="flex flex-col items-center gap-2.5 relative z-30 pt-0.5">
        
        {/* Navigation Arrows & Indicators */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={prev}
            aria-label="Previous item"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-zinc-300/80 dark:border-white/10 bg-white/90 dark:bg-white/5 text-zinc-800 dark:text-white/80 backdrop-blur-md transition-colors hover:bg-black hover:text-white dark:hover:bg-white/10 dark:hover:text-white shadow-xs cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </motion.button>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5" role="tablist">
            {items.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeIndex}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  i === activeIndex
                    ? "w-6 bg-purple-600 dark:bg-purple-400"
                    : "w-1.5 bg-zinc-300 dark:bg-white/20 hover:bg-purple-400 dark:hover:bg-white/40",
                )}
                aria-label={`Go to item ${i + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={next}
            aria-label="Next item"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-zinc-300/80 dark:border-white/10 bg-white/90 dark:bg-white/5 text-zinc-800 dark:text-white/80 backdrop-blur-md transition-colors hover:bg-black hover:text-white dark:hover:bg-white/10 dark:hover:text-white shadow-xs cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default CircularCarousel;
