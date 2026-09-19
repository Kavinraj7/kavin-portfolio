'use client';

import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  Briefcase,
  Users,
  Code2,
  BarChart3,
  BookOpen,
  Terminal,
  Brain,
} from 'lucide-react';
import { PerspectiveKey, PerspectiveItem } from '../types';
import { soundFx } from '../utils/audio';

interface HeroPerspectiveViewProps {
  perspectives: PerspectiveItem[];
  selectedKey: PerspectiveKey | null;
  onSelectPerspective: (key: PerspectiveKey) => void;
  onOpenTerminal: () => void;
  sfxEnabled: boolean;
  onToggleSfx: () => void;
}

export const HeroPerspectiveView: React.FC<HeroPerspectiveViewProps> = ({
  perspectives,
  selectedKey,
  onSelectPerspective,
  onOpenTerminal,
  sfxEnabled,
  onToggleSfx
}) => {
  const [hoveredKey, setHoveredKey] = useState<PerspectiveKey | null>(null);
  const [pulseActive, setPulseActive] = useState(false);

  const avatarHousingRef = useRef<HTMLDivElement>(null);
  const avatarImgRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);

  const defaultSpeechMain = 'Choose how you want to see me.';
  const defaultSpeechSub = 'I recommend exploring my complete story.';

  // Determine current active or hovered speech
  const activeItem = perspectives.find((p) => p.key === (hoveredKey || selectedKey));
  const currentSpeechMain = activeItem ? activeItem.speechMain : defaultSpeechMain;
  const currentSpeechSub = activeItem ? activeItem.speechSub : defaultSpeechSub;

  // Selected item object
  const currentSelectedItem = perspectives.find((p) => p.key === selectedKey);

  // Smooth 3D tilt & rotation interaction on avatar circle hover
  const handleAvatarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!avatarHousingRef.current || !avatarImgRef.current) return;
    const rect = avatarHousingRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    const rotateY = normX * 16;
    const rotateX = -normY * 16;
    const transX = normX * 8;
    const transY = normY * 8;

    avatarImgRef.current.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${transX}px, ${transY}px, 12px) scale(1.05)`;
    if (outerRingRef.current) {
      outerRingRef.current.style.transform = `rotate(${normX * 20}deg) scale(1.02)`;
    }
  };

  const handleAvatarMouseLeave = () => {
    if (avatarImgRef.current) {
      avatarImgRef.current.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px) scale(1)`;
    }
    if (outerRingRef.current) {
      outerRingRef.current.style.transform = `rotate(0deg) scale(1)`;
    }
  };

  const handleItemHover = (key: PerspectiveKey) => {
    soundFx.playHover();
    setHoveredKey(key);
  };

  const handleItemLeave = () => {
    setHoveredKey(null);
  };

  const handleItemClick = (key: PerspectiveKey) => {
    soundFx.playSelect();
    onSelectPerspective(key);
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 500);
  };

  const handleDismissPreview = () => {
    soundFx.playDismiss();
    onSelectPerspective(null as unknown as PerspectiveKey);
  };

  // Custom icon mapping with vibrant purple styling matching reference image
  const getPerspectiveIcon = (key: PerspectiveKey, isSelected: boolean = false) => {
    const iconClass = `w-5 h-5 stroke-[1.8] ${isSelected ? 'text-[#C4B5FD] dark:text-white' : 'text-[#7C3AED] dark:text-[#A78BFA]'}`;
    switch (key) {
      case 'admin':
        return <Briefcase className={iconClass} />;
      case 'hr':
        return <Users className={iconClass} />;
      case 'software':
        return <Code2 className={iconClass} />;
      case 'data':
        return <BarChart3 className={iconClass} />;
      case 'holistic':
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden select-none transition-colors duration-300 bg-[#FAFAFC] dark:bg-[#09080F] text-black dark:text-zinc-100 px-6 sm:px-10 lg:px-16 pt-4 pb-6">
      {/* Subtle Technical Dot Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-10 overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(#94A3B8 1.1px, transparent 1.1px)',
            backgroundSize: '22px 22px'
          }}
        />
      </div>

      {/* Main Single Section Split Canvas */}
      <div className="max-w-[1440px] mx-auto w-full flex-1 flex items-center justify-center relative z-10 my-auto py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-16 items-center w-full">
          {/* LEFT COLUMN: AI Avatar Guided Experience (Cols 1-5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Interactive Bubble 1: Upper Floating Trigger with Purple Dot */}
            <div
              id="bubble-ai-trigger"
              onClick={() => {
                soundFx.playTerminal();
                onOpenTerminal();
              }}
              className="mb-3 z-20 cursor-pointer group transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="bg-white dark:bg-[#141120] rounded-2xl px-4 py-2.5 shadow-[0_4px_24px_rgba(124,58,237,0.06)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.1)] border border-[#EBE8F5] dark:border-purple-900/40 flex items-center gap-3 max-w-[310px] transition-all">
                <div className="flex flex-col">
                  <span className="text-xs text-black dark:text-white leading-tight font-bold">
                    Welcome to my page.
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA] flex items-center gap-1 font-medium transition-colors">
                    Click to launch Kavin AI Terminal →
                  </span>
                </div>
              </div>
            </div>

            {/* Avatar Housing Stage with Soft Violet Aura and Handwritten Annotations */}
            <div className="relative flex items-center justify-center my-2">
              {/* Soft Ambient Violet Aura Glow behind Avatar */}
              <div className="absolute -inset-8 bg-[radial-gradient(circle,rgba(168,85,247,0.18)_0%,rgba(139,92,246,0.07)_50%,transparent_72%)] rounded-full blur-xl pointer-events-none" />

              {/* Left Handwritten Note with Curved Arrow */}
              <div
                className="hidden xl:flex absolute -left-20 top-1/2 -translate-y-1/2 flex-col items-end pointer-events-none select-none text-zinc-600 dark:text-zinc-400"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                <div className="text-right text-base leading-tight font-semibold">
                  <span>Ideas</span><br />
                  <span>People</span><br />
                  <span>Systems</span><br />
                  <span>Growth</span>
                </div>
                <svg width="42" height="32" viewBox="0 0 42 32" fill="none" className="mt-1 rotate-12 text-zinc-400 dark:text-zinc-500">
                  <path d="M4 8 C18 12, 30 20, 36 28 M36 28 L30 26 M36 28 L34 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Avatar Housing Circle with 3D Tilt Interaction */}
              <div
                ref={avatarHousingRef}
                onMouseMove={handleAvatarMouseMove}
                onMouseLeave={handleAvatarMouseLeave}
                className="relative w-56 h-56 sm:w-68 sm:h-68 md:w-80 md:h-80 lg:w-84 lg:h-84 flex items-center justify-center cursor-pointer group"
              >
                {/* Concentric Orbit Ring Indicators with Soft Lavender Border */}
                <div
                  ref={outerRingRef}
                  className="absolute inset-0 rounded-full border border-dashed border-purple-300/70 dark:border-purple-700/50 animate-spin-slow pointer-events-none transition-transform duration-300 ease-out"
                />
                <div
                  className="absolute inset-2.5 rounded-full bg-gradient-to-tr from-purple-200/50 via-violet-100/30 to-transparent dark:from-purple-900/40 dark:via-violet-900/20 dark:to-transparent p-[1px] animate-spin-slow pointer-events-none"
                  style={{ animationDirection: 'reverse' }}
                />

                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-purple-100/60 via-violet-50/40 to-blue-50/30 dark:from-[#17122A] dark:via-[#130F24] dark:to-[#0E0C1A] flex items-center justify-center overflow-hidden shadow-[0_12px_36px_rgba(124,58,237,0.1)] border border-[#EBE8F5] dark:border-purple-900/40">
                  {/* 3D Interactive Photorealistic Avatar Container */}
                  <div
                    ref={avatarImgRef}
                    id="avatar-container"
                    className="relative w-full h-full flex items-center justify-center transition-transform duration-150 ease-out"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <img
                      id="avatar-img"
                      src="/AI-avatar.png"
                      alt="Kavin AI Avatar"
                      className="w-full h-full object-cover object-top filter grayscale contrast-110 brightness-105 pointer-events-none select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 pointer-events-none" />
                  </div>

                  {/* Soundwave Pulse overlay */}
                  <div
                    id="avatar-pulse"
                    className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-300 ${pulseActive ? 'opacity-100' : 'opacity-0'
                      }`}
                  >
                    <div className="w-full h-full rounded-full bg-purple-500/20 dark:bg-purple-400/25 animate-ping" />
                  </div>
                </div>

                {/* Avatar Status Tag Pill */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white dark:bg-[#18132B] text-black dark:text-white px-3.5 py-1 rounded-full shadow-[0_4px_16px_rgba(124,58,237,0.08)] flex items-center gap-2 z-10 border border-[#EBE8F5] dark:border-purple-900/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
                  <span className="font-mono text-[10px] tracking-widest font-bold uppercase">
                    KAVIN_AI v2.4 // READY
                  </span>
                </div>
              </div>

              {/* Right Handwritten Note with Curved Arrow */}
              <div
                className="hidden xl:flex absolute -right-20 top-1/2 -translate-y-1/2 flex-col items-start pointer-events-none select-none text-zinc-600 dark:text-zinc-400"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                <div className="text-left text-base leading-tight font-semibold">
                  <span>Same</span><br />
                  <span>Person</span><br />
                  <span>Different</span><br />
                  <span>Perspectives</span>
                </div>
                <svg width="42" height="32" viewBox="0 0 42 32" fill="none" className="mt-1 -rotate-12 text-zinc-400 dark:text-zinc-500">
                  <path d="M38 8 C24 12, 12 20, 6 28 M6 28 L12 26 M6 28 L8 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Interactive Bubble 2: Fixed-Height Dynamic Dialogue Bubble */}
            <div className="relative mt-6 w-full max-w-[360px]">
              <div className="bg-white dark:bg-[#141120] rounded-2xl p-4 shadow-[0_6px_24px_rgba(124,58,237,0.06)] border border-[#EBE8F5] dark:border-purple-900/40 h-[116px] min-h-[116px] max-h-[116px] flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100 dark:border-purple-950">
                  <span className="text-[10px] tracking-wider uppercase text-zinc-600 dark:text-zinc-400 font-bold flex items-center gap-1.5 font-mono">
                    <Brain className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#A78BFA]" />
                    SYSTEM RESPONSE
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center pt-1 overflow-hidden">
                  <p
                    id="avatar-dialogue-main"
                    className="font-display font-bold text-xs sm:text-sm text-black dark:text-zinc-100 truncate leading-snug"
                  >
                    {currentSpeechMain}
                  </p>
                  <p
                    id="avatar-dialogue-sub"
                    className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2 leading-relaxed font-normal"
                  >
                    {currentSpeechSub}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Title & 5 Interactive Perspectives (Cols 6-12) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 lg:pl-4">
            {/* Typography Introduction Header with Purple Gradient Glow on WELCOME */}
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none text-black dark:text-white select-none">
                <span>WELCOM</span>
                <span className="inline-block bg-gradient-to-b from-black from-40% via-[#4C1D95] via-70% to-[#8B5CF6] dark:from-white dark:from-40% dark:via-[#7C3AED] dark:via-70% dark:to-[#C4B5FD] bg-clip-text text-transparent drop-shadow-[0_4px_14px_rgba(139,92,246,0.65)]">
                  E
                </span>
              </h1>

              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 italic font-light">
                  How would you like to see me?
                </span>
                <span className="inline-block w-2.5 h-4 bg-black dark:bg-[#A78BFA] animate-pulse" />
              </div>
            </div>

            {/* The 5 Bespoke Perspective Selectors */}
            <div className="flex flex-col space-y-2.5 w-full pt-1" id="perspective-list">
              {perspectives.map((item) => {
                const isSelected = selectedKey === item.key;
                const isHovered = hoveredKey === item.key;
                const isAnyHovered = hoveredKey !== null;
                const isDimmed = isAnyHovered && !isHovered;

                return (
                  <div
                    key={item.key}
                    id={`perspective-${item.id}`}
                    data-key={item.key}
                    onMouseEnter={() => handleItemHover(item.key)}
                    onMouseLeave={handleItemLeave}
                    onClick={() => handleItemClick(item.key)}
                    style={{
                      opacity: isDimmed ? 0.45 : 1,
                      transform: isHovered ? 'translateX(4px)' : isSelected ? 'translateX(3px)' : 'translateX(0px)',
                    }}
                    className={`group cursor-pointer rounded-2xl transition-all duration-200 p-3.5 sm:p-4 relative overflow-hidden border ${isSelected
                      ? 'bg-gradient-to-r from-[#17112E] via-[#1E163B] to-[#251B4A] text-white border-purple-500/40 shadow-[0_12px_32px_rgba(124,58,237,0.22)] dark:bg-gradient-to-r dark:from-[#1D153B] dark:to-[#2B1F54] dark:border-purple-400/50'
                      : 'bg-white text-black hover:bg-[#FAF8FF] border-[#EBE8F5] hover:border-purple-300 shadow-[0_2px_12px_rgba(124,58,237,0.02)] hover:shadow-[0_8px_24px_rgba(124,58,237,0.08)] dark:bg-[#141120] dark:text-zinc-100 dark:hover:bg-[#1C182B] dark:border-purple-950 dark:hover:border-purple-800'
                      }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                        {/* Dedicated Icon with Violet/Purple tones */}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0`}>
                          {getPerspectiveIcon(item.key, isSelected)}
                        </div>

                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-display font-bold text-sm sm:text-base tracking-tight transition-transform truncate ${isSelected ? 'text-white' : 'text-black dark:text-zinc-100'
                                }`}
                            >
                              {item.title}
                            </span>
                            {item.badge && (
                              <span
                                className={`hidden sm:inline-block px-2 py-0.5 rounded-full font-mono text-[9px] uppercase font-bold tracking-wider ${isSelected
                                  ? 'bg-purple-900/60 text-purple-200 border border-purple-500/40'
                                  : 'bg-[#EDE9FE] text-[#6D28D9] dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                                  }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span
                            className={`text-xs line-clamp-1 transition-colors mt-0.5 ${isSelected
                              ? 'text-purple-200/90'
                              : 'text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200'
                              }`}
                          >
                            {item.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 pl-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isSelected
                          ? 'bg-[#8B5CF6] text-white shadow-md'
                          : 'bg-[#FAF8FF] dark:bg-[#1E1930] border border-[#EBE8F5] dark:border-purple-900/40 text-zinc-600 dark:text-zinc-300 group-hover:bg-[#8B5CF6] group-hover:text-white group-hover:border-[#8B5CF6]'
                          }`}>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Perspective Micro-Dashboard Teaser / Expandable Card with Soft Lavender Styling */}
            {currentSelectedItem && (
              <div
                id="perspective-preview-panel"
                className="w-full bg-white dark:bg-[#141120] border border-[#DDD6FE] dark:border-purple-800/60 rounded-2xl p-4 sm:p-5 shadow-[0_8px_28px_rgba(124,58,237,0.08)] transition-all duration-300 relative overflow-hidden animate-in fade-in"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-xl bg-[#EDE9FE] dark:bg-[#251B4A] border border-[#DDD6FE] dark:border-purple-800/40 flex items-center justify-center shrink-0">
                      {getPerspectiveIcon(currentSelectedItem.key, false)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#7C3AED] text-white font-bold shrink-0 shadow-sm">
                          MODE ACTIVE
                        </span>
                        <span className="text-[11px] text-[#7C3AED] dark:text-purple-300 uppercase tracking-wider font-semibold truncate font-mono">
                          {currentSelectedItem.title}
                        </span>
                      </div>

                      <h3 className="font-display text-sm sm:text-base text-black dark:text-white font-bold mt-1 truncate">
                        {currentSelectedItem.title} Focus Ready
                      </h3>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5 font-normal">
                        {currentSelectedItem.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                    <button
                      id="preview-launch-link"
                      type="button"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#18132B] hover:bg-[#261B48] text-white dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED] dark:text-white text-xs uppercase tracking-wider font-bold transition-all shadow-md cursor-pointer whitespace-nowrap"
                    >
                      <span>Narrate</span>
                    </button>

                    <button
                      id="close-preview"
                      type="button"
                      onClick={handleDismissPreview}
                      className="px-3.5 py-2 rounded-full bg-[#EDE9FE] text-[#6D28D9] hover:bg-[#DDD6FE] dark:bg-[#251B4A] dark:text-purple-200 dark:hover:bg-[#322363] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-[#DDD6FE] dark:border-purple-800/40"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
