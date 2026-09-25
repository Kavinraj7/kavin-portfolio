'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, CheckCircle2, RotateCcw, Sparkles, Award } from 'lucide-react';

export interface ZoomSliderItem {
  number: string;
  src: string;
  title: string;
  desc: string;
  category?: string;
  longDesc?: string;
  highlights?: string[];
  tags?: string[];
  link?: string;
}

export const DEFAULT_ACHIEVEMENTS_DATA: ZoomSliderItem[] = [
  {
    number: "01",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
    title: "GLOBAL HACKATHON WINNER",
    desc: "1st Place Winner across 1,200+ global engineering teams",
    category: "AWARDS & RECOGNITIONS",
    longDesc: "Awarded 1st Place Grand Prize for architecting an autonomous, decentralized AI platform with multi-agent orchestration and zero-latency consensus.",
    highlights: [
      "1,200+ Competitor Teams Worldwide",
      "Grand Champion Trophy & Innovation Prize",
      "Production-Ready Architecture"
    ],
    tags: ["Next.js", "TypeScript", "AI Agents", "Solidity"],
  },
  {
    number: "02",
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80",
    title: "ENTERPRISE AT SCALE",
    desc: "Architected systems serving 10M+ daily active transactions",
    category: "SYSTEMS ARCHITECTURE",
    longDesc: "Engineered resilient distributed cloud services processing over 10 million transactions daily with 99.999% SLA uptime and automated failover.",
    highlights: [
      "10M+ Daily Query Throughput",
      "99.999% SLA High Availability",
      "Sub-45ms Average Latency"
    ],
    tags: ["AWS", "Kubernetes", "Redis", "Go"],
  },
  {
    number: "03",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    title: "OPEN SOURCE IMPACT",
    desc: "1,500+ GitHub stars on distributed cloud orchestration tools",
    category: "COMMUNITY & CODE",
    longDesc: "Created developer toolkits and CLI utilities adopted by thousands of developers, with over 250,000 package downloads across npm and crates.io.",
    highlights: [
      "1,500+ GitHub Stars",
      "250k+ Worldwide Package Downloads",
      "50+ Active Contributors"
    ],
    tags: ["Open Source", "CLI Tooling", "Rust", "Node.js"],
  },
  {
    number: "04",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    title: "AI AGENT ARCHITECTURE",
    desc: "Pioneered production multi-agent workflows with sub-100ms latency",
    category: "ARTIFICIAL INTELLIGENCE",
    longDesc: "Implemented Model Context Protocol (MCP) integrations connecting custom LLM reasoning engines with live enterprise datastores and streaming pipelines.",
    highlights: [
      "Sub-100ms Streaming Inference",
      "Multi-Agent Routing Logic",
      "Adaptive Memory Graph"
    ],
    tags: ["LLM Orchestration", "MCP", "Python", "Vector DB"],
  },
  {
    number: "05",
    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&auto=format&fit=crop&q=80",
    title: "PATENT FILED",
    desc: "Novel high-throughput adaptive caching & telemetry protocol",
    category: "INTELLECTUAL PROPERTY",
    longDesc: "Invented an adaptive predictive caching mechanism that dynamically forecasts hot cache nodes, drastically reducing database read pressure during spikes.",
    highlights: [
      "Patent Pending Innovation",
      "40% Database Load Reduction",
      "Zero Downtime Invalidation"
    ],
    tags: ["Algorithms", "Distributed Systems", "Patents"],
  },
  {
    number: "06",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80",
    title: "KEYNOTE SPEAKER",
    desc: "Delivered technical keynote at international developer summits",
    category: "PUBLIC SPEAKING",
    longDesc: "Invited speaker at premier tech conferences sharing insights on the future of full-stack engineering, reactive UI design, and agentic workflows.",
    highlights: [
      "3,000+ Conference Attendees",
      "Top-Rated Technical Session (4.9/5)",
      "Keynote Panelist & Moderator"
    ],
    tags: ["Tech Talks", "Mentorship", "Conference"],
  },
  {
    number: "07",
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
    title: "ENGINEERING LEADERSHIP",
    desc: "Led agile full-stack squads shipping mission-critical platforms",
    category: "TEAM & CULTURE",
    longDesc: "Mentored 15+ senior and junior engineers, established automated CI/CD pipelines, and reduced release cycle times from weeks to hours.",
    highlights: [
      "15+ Engineers Mentored",
      "4x Sprint Delivery Velocity",
      "Zero Production Regressions"
    ],
    tags: ["Engineering Mgmt", "Agile", "DevOps"],
  },
  {
    number: "08",
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    title: "PERFORMANCE APEX",
    desc: "Optimized distributed p99 latency by 65% across multi-region clusters",
    category: "PERFORMANCE TUNING",
    longDesc: "Conducted deep-dive network, database indexing, and runtime profile optimizations, reducing global p99 response times from 350ms to 48ms.",
    highlights: [
      "65% Latency Reduction",
      "Sub-50ms p99 Edge Response",
      "Multi-Region Global Routing"
    ],
    tags: ["Performance", "eBPF", "Database Tuning", "Edge CDN"],
  },
];

const SCROLL_PER_PX = 1.0;
const LERP_FACTOR = 0.08;

const DRAG_LERP_FACTOR = 0.22;
const MOMENTUM_FRICTION = 0.92;
const MIN_MOMENTUM = 0.1;
const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1025;

const REDUCED_MOTION_LERP_FACTOR = 1;
const REDUCED_MOTION_FADE_DURATION = 0.18;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;

const lerp = (a: number, b: number, n: number): number => a + (b - a) * n;

interface ZoomSliderCompProps {
  sliderData?: ZoomSliderItem[];
  title?: string;
  subheading?: string;
  scaleOnHover?: boolean;
  textOnHover?: boolean;
  size?: number;
  easeScrollPercentage?: number;
}

export function ZoomSliderComp({
  sliderData = DEFAULT_ACHIEVEMENTS_DATA,
  title = "My Achievements",
  subheading = "Scroll or drag to explore · Hover & click View Details to flip",
  scaleOnHover = true,
  textOnHover = true,
  size = 1,
  easeScrollPercentage = 100,
}: ZoomSliderCompProps) {
  const images = sliderData;

  const stripRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [viewportWidth, setViewportWidth] = useState(1440);
  const [viewportHeight, setViewportHeight] = useState(900);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isMobile = viewportWidth < MOBILE_BREAKPOINT;
  const isTablet =
    viewportWidth >= MOBILE_BREAKPOINT && viewportWidth < TABLET_BREAKPOINT;

  const resolvedSize = Math.max(0.5, Number(size) || 1);
  const resolvedEaseScrollPercentage = Math.max(20, Number(easeScrollPercentage) || 100);
  
  // Calibrated for a completely uncropped single-viewport fit with minimal bottom space
  const cardWidthMin = (isMobile ? 70 : 180) * resolvedSize;
  const cardWidthMax = (isMobile ? 260 : isTablet ? 480 : 640) * resolvedSize;
  const cardHeightMax = isMobile
    ? Math.min(Math.round(viewportHeight * 0.46 * resolvedSize), 360)
    : isTablet
      ? Math.min(Math.round(viewportHeight * 0.50 * resolvedSize), 440)
      : Math.min(Math.round(viewportHeight * 0.54 * resolvedSize), 500);
  const cardHeightMin = (isMobile ? 60 : 45) * resolvedSize;
  const cardStep = cardWidthMax;

  const stateRef = useRef({
    current: 0,
    target: 0,
    raf: null as number | null,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    velocity: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const announcedIndexRef = useRef(0);

  useEffect(() => {
    const onResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    );

    const syncReducedMotion = (event: MediaQueryList | MediaQueryListEvent) => {
      setReduceMotion(
        'matches' in event ? event.matches : prefersReducedMotion()
      );
    };

    if (!mediaQuery) return;

    syncReducedMotion(mediaQuery);
    mediaQuery.addEventListener('change', syncReducedMotion);
    return () => mediaQuery.removeEventListener('change', syncReducedMotion);
  }, []);

  const positionCards = useCallback(
    (offset: number) => {
      if (!stripRef.current) return;

      const cards = Array.from(stripRef.current.children) as HTMLElement[];
      const count = images.length;

      if (!count) return;

      const loopWidth = count * cardStep;
      const viewportWidthValue = window.innerWidth;
      const viewportHeightValue = window.innerHeight;
      const isMobileSize = viewportWidthValue < MOBILE_BREAKPOINT;
      const isTabletSize = viewportWidthValue >= MOBILE_BREAKPOINT && viewportWidthValue < TABLET_BREAKPOINT;
      // Minimal clearance from bottom edge to minimize black space while remaining completely uncropped
      const bottomClearance = isMobileSize ? 20 : isTabletSize ? 28 : 35;
      const bottom = viewportHeightValue - bottomClearance;
      const easingDistance = 2 * viewportWidthValue * (resolvedEaseScrollPercentage / 100);

      const mapVtoX = (value: number) => {
        if (value <= 0) return 0;
        if (value >= easingDistance) return value - easingDistance / 2;
        return (value * value) / (2 * easingDistance);
      };

      const normalizedOffset =
        ((offset % loopWidth) + loopWidth) % loopWidth;
      const startIndex = Math.floor(normalizedOffset / cardStep);
      const fractionalOffset = (normalizedOffset % cardStep) / cardStep;

      for (let index = 0; index < count; index += 1) {
        const cardIndex = (startIndex + index) % count;
        const visualOffset = (index - fractionalOffset) * cardStep;
        const currentX = mapVtoX(visualOffset);
        const nextX = mapVtoX(visualOffset + cardStep);
        const visualWidth = nextX - currentX;
        const scale = visualWidth / cardWidthMax;
        const cardHeight =
          cardHeightMin + scale * (cardHeightMax - cardHeightMin);
        const y = bottom - cardHeight;

        if (!cards[cardIndex]) continue;

        cards[cardIndex].style.transform = `translate(${currentX}px, ${y}px)`;

        const imageWrap = imageWrapRefs.current[cardIndex];

        if (!imageWrap) continue;

        imageWrap.style.width = `${visualWidth}px`;
        imageWrap.style.height = `${cardHeight}px`;
      }
    },
    [cardHeightMax, cardHeightMin, cardStep, cardWidthMax, images.length, resolvedEaseScrollPercentage]
  );

  useEffect(() => {
    if (!images.length) return;

    const state = stateRef.current;
    const loopWidth = images.length * cardStep;

    const tick = () => {
      if (
        !reduceMotion &&
        !state.isDragging &&
        Math.abs(state.velocity) > MIN_MOMENTUM
      ) {
        state.target += state.velocity;
        state.velocity *= MOMENTUM_FRICTION;
      } else if (!state.isDragging) {
        state.velocity = 0;
      }

      const lerpFactor = reduceMotion
        ? REDUCED_MOTION_LERP_FACTOR
        : state.isDragging
          ? DRAG_LERP_FACTOR
          : LERP_FACTOR;
      state.current = lerp(state.current, state.target, lerpFactor);

      if (Math.abs(state.current - state.target) < 0.01) {
        const shift = Math.round(state.current / loopWidth) * loopWidth;
        state.current -= shift;
        state.target -= shift;
      }

      positionCards(state.current);

      if (images.length) {
        const normalizedOffset =
          ((state.current % loopWidth) + loopWidth) % loopWidth;
        const nextIndex =
          Math.floor(normalizedOffset / cardStep) % images.length;

        if (nextIndex !== announcedIndexRef.current) {
          announcedIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        }
      }

      state.raf = requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      state.target -= event.deltaY * SCROLL_PER_PX;
    };

    const beginDrag = (clientX: number, clientY: number) => {
      state.isDragging = true;
      state.lastX = clientX;
      state.lastY = clientY;
      state.velocity = 0;
    };

    const moveDrag = (clientX: number, clientY: number, direction: number = 1) => {
      if (!state.isDragging) return;

      const deltaX = clientX - state.lastX;
      const deltaY = clientY - state.lastY;
      const rawDelta =
        Math.abs(deltaX) >= Math.abs(deltaY) ? -deltaX : -deltaY;
      const delta = rawDelta * direction;

      state.target += delta;
      state.velocity = lerp(state.velocity, delta, 0.5);
      state.lastX = clientX;
      state.lastY = clientY;
    };

    const endDrag = () => {
      state.isDragging = false;
    };

    const onMouseDown = (event: MouseEvent) => beginDrag(event.clientX, event.clientY);
    const onMouseMove = (event: MouseEvent) => moveDrag(event.clientX, event.clientY);
    const onMouseUp = endDrag;

    const onTouchStart = (event: TouchEvent) =>
      beginDrag(event.touches[0].clientX, event.touches[0].clientY);
    const onTouchMove = (event: TouchEvent) =>
      moveDrag(event.touches[0].clientX, event.touches[0].clientY, -1);
    const onTouchEnd = endDrag;

    const element = stripRef.current;
    if (element) {
      element.addEventListener('wheel', onWheel, { passive: true });
      element.addEventListener('mousedown', onMouseDown);
      element.addEventListener('touchstart', onTouchStart, { passive: true });
      element.addEventListener('touchmove', onTouchMove, { passive: true });
      element.addEventListener('touchend', onTouchEnd);
      element.addEventListener('touchcancel', onTouchEnd);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    state.raf = requestAnimationFrame(tick);

    return () => {
      if (state.raf) cancelAnimationFrame(state.raf);
      if (element) {
        element.removeEventListener('wheel', onWheel);
        element.removeEventListener('mousedown', onMouseDown);
        element.removeEventListener('touchstart', onTouchStart);
        element.removeEventListener('touchmove', onTouchMove);
        element.removeEventListener('touchend', onTouchEnd);
        element.removeEventListener('touchcancel', onTouchEnd);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [cardStep, images, positionCards, reduceMotion]);

  useEffect(() => {
    if (!images.length) return;

    const cleanups: (() => void)[] = [];

    cardRefs.current.forEach((card, index) => {
      const textElement = textRefs.current[index];
      const imageWrap = imageWrapRefs.current[index];

      if (!card || !textElement || !imageWrap) return;

      const pElements = textElement.querySelectorAll('p');

      gsap.set(pElements, { yPercent: 100, opacity: 0 });
      gsap.set(textElement, { autoAlpha: 0 });

      const imageElement = imageWrap.querySelector('img');

      if (imageElement) {
        gsap.set(imageElement, { opacity: 1 });
      }

      const onEnter = () => {
        if (textOnHover) {
          if (reduceMotion) {
            gsap.killTweensOf([textElement, pElements]);
            gsap.set(pElements, { yPercent: 0, opacity: 1 });
            gsap.to(textElement, {
              autoAlpha: 1,
              duration: REDUCED_MOTION_FADE_DURATION,
              ease: 'power2.out',
            });
          } else {
            gsap
              .timeline()
              .set(textElement, { autoAlpha: 1 })
              .to(pElements, {
                yPercent: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power3.out',
              });
          }
        }
      };

      const onLeave = () => {
        if (textOnHover) {
          if (reduceMotion) {
            gsap.killTweensOf([textElement, pElements]);
            gsap.to(textElement, {
              autoAlpha: 0,
              duration: REDUCED_MOTION_FADE_DURATION,
              ease: 'power2.out',
              onComplete: () => gsap.set(pElements, { yPercent: 100, opacity: 0 }),
            });
          } else {
            gsap.to(pElements, {
              yPercent: 100,
              opacity: 0,
              duration: 0.25,
              stagger: 0.03,
              ease: 'power2.in',
              onComplete: () => gsap.set(textElement, { autoAlpha: 0 }),
            });
          }
        } else {
          gsap.killTweensOf([textElement, pElements]);
          gsap.set(textElement, { autoAlpha: 0 });
          gsap.set(pElements, { yPercent: 100, opacity: 0 });
        }
      };

      imageWrap.addEventListener('mouseenter', onEnter);
      imageWrap.addEventListener('mouseleave', onLeave);

      cleanups.push(() => {
        imageWrap.removeEventListener('mouseenter', onEnter);
        imageWrap.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [images, reduceMotion, scaleOnHover, textOnHover]);

  const activeItem = images[activeIndex];
  const slideAnnouncement = images.length
    ? activeItem?.title
      ? `${activeItem.title}, slide ${activeIndex + 1} of ${images.length}`
      : `Slide ${activeIndex + 1} of ${images.length}`
    : '';

  return (
    <div
      className="relative w-full overflow-hidden bg-black select-none"
      style={{ height: '100svh', touchAction: 'none' }}
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {slideAnnouncement}
      </div>
      
      {/* Top Section Header */}
      {title ? (
        <div className="pointer-events-none absolute left-1/2 top-6 sm:top-10 z-20 -translate-x-1/2 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-800/40 text-purple-300 text-xs font-bold font-mono uppercase tracking-wider mb-2 shadow-xs">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>Recognitions & Key Milestones</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h2>
          {subheading ? (
            <p className="mt-1 text-xs sm:text-sm tracking-[0.05em] text-white/65 max-w-md mx-auto">
              {subheading}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Main Draggable / Scrollable Strip */}
      <div ref={stripRef} className="absolute inset-0 cursor-grab active:cursor-grabbing">
        {images.map((item, index) => {
          const isFlipped = !!flippedCards[index];

          return (
            <div
              key={index}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="absolute left-0 top-0"
              style={{ willChange: 'transform' }}
            >
              {/* Floating Top Labels Above Active Card */}
              <div
                ref={(element) => {
                  textRefs.current[index] = element;
                }}
                className="absolute z-10 flex w-full flex-col gap-1"
                style={{
                  bottom: 'calc(100% + 8px)',
                  left: 0,
                  padding: '0 0 2px',
                  visibility: 'hidden',
                }}
              >
                <p
                  data-number
                  className="overflow-hidden select-none text-[11px] font-bold uppercase leading-none tracking-[0.18em] text-purple-400 font-mono"
                >
                  {item.number}
                </p>

                <p
                  data-title
                  className="overflow-hidden select-none text-[13px] sm:text-[15px] font-extrabold uppercase leading-[1.15] tracking-[0.08em] text-white truncate max-w-xs"
                >
                  {item.title}
                </p>

                <p
                  data-desc
                  className="overflow-hidden text-[11px] sm:text-xs select-none font-medium leading-normal tracking-[0.04em] text-zinc-300 max-w-sm truncate"
                >
                  {item.desc}
                </p>
              </div>

              {/* 3D Flippable Card Container */}
              <div
                ref={(element) => {
                  imageWrapRefs.current[index] = element;
                }}
                className="relative"
                style={{
                  width: cardWidthMin,
                  height: cardHeightMax,
                  willChange: 'width, height',
                  perspective: '1400px',
                }}
              >
                <div
                  className="w-full h-full relative transition-transform duration-700 ease-out"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* FRONT FACE: Image + Center "View Details" Button on Hover */}
                  <div
                    className="group absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-zinc-800/90 shadow-2xl bg-zinc-900"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      draggable={false}
                      className="pointer-events-none absolute inset-0 select-none object-cover opacity-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
                      style={{
                        objectPosition: 'center center',
                      }}
                    />

                    {/* Dark gradient overlay on hover */}
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Centered "View Details" Button appearing on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <button
                        type="button"
                        onClick={(e) => toggleFlip(index, e)}
                        className="pointer-events-auto opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-zinc-950 font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center gap-2 hover:bg-zinc-200 active:scale-95 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-4 h-4 text-zinc-950" />
                      </button>
                    </div>

                    {/* Subtle bottom label on front face */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                      <p className="text-white text-xs sm:text-sm font-extrabold truncate">
                        {item.title}
                      </p>
                      <p className="text-zinc-300 text-[10px] sm:text-xs truncate font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* BACK FACE: Pristine White Card with Rich Text Details & Black Cursor */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-5 md:p-6 bg-white text-zinc-900 shadow-2xl border border-zinc-200 flex flex-col justify-between overflow-y-auto no-scrollbar"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      cursor: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z' fill='black' stroke='white' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E") 0 0, default`,
                    }}
                  >
                    {/* Top Header: Number Badge + Category + Flip-back Button */}
                    <div className="flex items-center justify-between gap-2 border-b border-zinc-100 pb-2 sm:pb-3 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-purple-100 text-purple-800 font-mono font-bold text-[11px] sm:text-xs">
                          {item.number}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono">
                          {item.category || 'MILESTONE'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleFlip(index, e)}
                        className="p-1 sm:p-1.5 rounded-full hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950 transition-colors flex items-center gap-1 text-xs font-semibold"
                        style={{
                          cursor: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 2C10 1.44772 10.4477 1 11 1C11.5523 1 12 1.44772 12 2V10.05C12.3168 9.71211 12.7661 9.5 13.25 9.5C14.0784 9.5 14.75 10.1716 14.75 11V11.5C15.0668 11.1621 15.5161 10.95 16 10.95C16.8284 10.95 17.5 11.6216 17.5 12.45V13C17.7761 13 18 13.2239 18 13.5V17C18 20.3137 15.3137 23 12 23C8.68629 23 6 20.3137 6 17V8C6 7.44772 6.44772 7 7 7C7.55228 7 8 7.44772 8 8V10.05C8.31682 9.71211 8.76606 9.5 9.25 9.5C9.66421 9.5 10 9.83579 10 10.25V2Z' fill='black' stroke='white' stroke-width='1.2'/%3E%3C/svg%3E") 6 1, pointer`,
                        }}
                        title="Flip back"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-zinc-800" />
                        <span className="text-[11px] text-zinc-800">Back</span>
                      </button>
                    </div>

                    {/* Middle Content: Title, Long Description & Highlight Bullets */}
                    <div className="my-auto py-2 sm:py-3 space-y-2 sm:space-y-2.5">
                      <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-zinc-950 tracking-tight leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                        {item.longDesc || item.desc}
                      </p>

                      {/* Bullet Highlights */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="space-y-1 sm:space-y-1.5 pt-0.5">
                          {item.highlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Footer: Tech Stack Tags + Close Button */}
                    <div className="pt-2 sm:pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2 shrink-0">
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 max-w-[72%]">
                        {item.tags?.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded bg-zinc-100 text-zinc-800 text-[9px] sm:text-[10px] font-mono font-bold uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleFlip(index, e)}
                        className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-zinc-900 text-white font-bold text-xs hover:bg-zinc-800 transition-colors ml-auto shrink-0"
                        style={{
                          cursor: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 2C10 1.44772 10.4477 1 11 1C11.5523 1 12 1.44772 12 2V10.05C12.3168 9.71211 12.7661 9.5 13.25 9.5C14.0784 9.5 14.75 10.1716 14.75 11V11.5C15.0668 11.1621 15.5161 10.95 16 10.95C16.8284 10.95 17.5 11.6216 17.5 12.45V13C17.7761 13 18 13.2239 18 13.5V17C18 20.3137 15.3137 23 12 23C8.68629 23 6 20.3137 6 17V8C6 7.44772 6.44772 7 7 7C7.55228 7 8 7.44772 8 8V10.05C8.31682 9.71211 8.76606 9.5 9.25 9.5C9.66421 9.5 10 9.83579 10 10.25V2Z' fill='black' stroke='white' stroke-width='1.2'/%3E%3C/svg%3E") 6 1, pointer`,
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export const ZoomSlider = ({
  scaleOnHover = true,
  textOnHover = true,
  size = 1,
  easeScrollPercentage = 100,
}: {
  scaleOnHover?: boolean;
  textOnHover?: boolean;
  size?: number;
  easeScrollPercentage?: number;
} = {}) => (
  <ZoomSliderComp
    title="My Achievements"
    subheading="Scroll or drag to explore · Hover & click View Details to flip"
    sliderData={DEFAULT_ACHIEVEMENTS_DATA}
    scaleOnHover={scaleOnHover}
    textOnHover={textOnHover}
    size={size}
    easeScrollPercentage={easeScrollPercentage}
  />
);

export default ZoomSlider;
