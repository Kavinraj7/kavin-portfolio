import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Volume2,
  VolumeX,
  ArrowRight,
  ArrowUpRight,
  Brain,
  Sliders,
  Sparkles,
  Building2,
  Users,
  Code2,
  BarChart3,
  Layers,
  Terminal,
  MousePointerClick
} from 'lucide-react';
import { PerspectiveKey, PerspectiveItem } from '../types';
import { soundFx } from '../utils/audio';

interface HeroPerspectiveViewProps {
  perspectives: PerspectiveItem[];
  selectedKey: PerspectiveKey | null;
  onSelectPerspective: (key: PerspectiveKey) => void;
  onProceedToDossier: (key: PerspectiveKey) => void;
  onOpenTerminal: () => void;
  onOpenFastPath: () => void;
  sfxEnabled: boolean;
  onToggleSfx: () => void;
}

export const HeroPerspectiveView: React.FC<HeroPerspectiveViewProps> = ({
  perspectives,
  selectedKey,
  onSelectPerspective,
  onProceedToDossier,
  onOpenTerminal,
  onOpenFastPath,
  sfxEnabled,
  onToggleSfx
}) => {
  const [hoveredKey, setHoveredKey] = useState<PerspectiveKey | null>(null);
  const [pulseActive, setPulseActive] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);

  const defaultSpeechMain = 'Choose how you want to see me.';
  const defaultSpeechSub = 'I recommend exploring my complete story.';

  // Determine current active or hovered speech
  const activeItem = perspectives.find((p) => p.key === (hoveredKey || selectedKey));
  const currentSpeechMain = activeItem ? activeItem.speechMain : defaultSpeechMain;
  const currentSpeechSub = activeItem ? activeItem.speechSub : defaultSpeechSub;

  // Selected item object
  const currentSelectedItem = perspectives.find((p) => p.key === selectedKey);

  // Parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 14;
      const y = ((e.clientY / innerHeight) - 0.5) * 14;
      setParallaxOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    setTimeout(() => setPulseActive(false), 700);
  };

  const handleDismissPreview = () => {
    soundFx.playDismiss();
    onSelectPerspective(null as unknown as PerspectiveKey);
  };

  const getPerspectiveIcon = (key: PerspectiveKey) => {
    switch (key) {
      case 'admin':
        return <Building2 className="w-5 h-5 text-indigo-400" />;
      case 'hr':
        return <Users className="w-5 h-5 text-emerald-400" />;
      case 'software':
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'data':
        return <BarChart3 className="w-5 h-5 text-amber-400" />;
      case 'holistic':
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section className="relative w-full overflow-hidden select-none transition-colors duration-300 bg-[#fcf8f8] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 min-h-[calc(100vh-4rem)] pt-2 md:pt-4 pb-12">
      {/* Subtle Technical Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06] overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(#71717a 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />
      </div>

      {/* Blueprint Coordinates Notations */}
      <div className="absolute top-6 left-12 text-[10px] tracking-widest text-zinc-400 dark:text-zinc-600 font-mono hidden xl:block pointer-events-none uppercase">
        POS_REF: 40.7128N // 74.0060W [STABLE]
      </div>
      <div className="absolute top-6 right-12 text-[10px] tracking-widest text-zinc-400 dark:text-zinc-600 font-mono hidden xl:block pointer-events-none uppercase">
        SYS_MODE: DUAL_INTERFACE // Q2_CORE
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-12 flex flex-col justify-between relative z-10">
        {/* Top Protocol Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 md:py-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
          <div className="inline-flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white animate-pulse" />
            <span className="font-mono text-[11px] tracking-widest text-zinc-800 dark:text-zinc-300 uppercase font-semibold">
              PORTFOLIO PROTOCOL // PERSPECTIVE SELECTION
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Recruiter Fast Path Button */}
            <button
              id="recruiter-fast-path"
              type="button"
              onClick={() => {
                soundFx.playConfirm();
                onOpenFastPath();
              }}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-[#18181b] dark:hover:bg-[#222226] border border-zinc-200/60 dark:border-zinc-800 transition-all duration-200"
            >
              <Zap className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400 group-hover:text-amber-500 transition-colors" />
              <span className="text-[11px] tracking-wider uppercase font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                Recruiter Fast Path
              </span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono px-1.5 py-0.5 rounded-full bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800">
                ESC
              </span>
            </button>

            {/* Audio Feedback Toggle */}
            <button
              id="audio-cue-toggle"
              type="button"
              onClick={onToggleSfx}
              title="Toggle audio feedback"
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-[#18181b] dark:hover:bg-[#222226] border border-zinc-200/60 dark:border-zinc-800 transition-all duration-200"
            >
              {sfxEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
              )}
              <span className="text-[11px] tracking-wider uppercase font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                {sfxEnabled ? 'SFX ON' : 'SFX MUTED'}
              </span>
            </button>
          </div>
        </div>

        {/* Central Split Canvas: Left AI Interactive Stage | Right Dynamic Perspectives */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center flex-1 my-4 md:my-8">
          {/* LEFT COLUMN: AI Avatar Guided Experience (Cols 1-5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-4 md:py-6">
            {/* Interactive Bubble 1: Upper Floating Trigger */}
            <div
              id="bubble-ai-trigger"
              onClick={() => {
                soundFx.playTerminal();
                onOpenTerminal();
              }}
              className="mb-4 z-20 cursor-pointer group transition-transform duration-300 hover:scale-[1.03]"
            >
              <div className="bg-zinc-100/95 dark:bg-[#18181b]/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-xl border border-zinc-200/80 dark:border-zinc-800 flex items-center gap-3 max-w-[280px]">
                <div className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-white shrink-0 animate-ping" />
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-900 dark:text-white leading-tight font-semibold">
                    Welcome to my page.
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug group-hover:text-zinc-900 dark:group-hover:text-zinc-200 flex items-center gap-1 font-medium transition-colors">
                    Click to launch Kavin AI Terminal →
                  </span>
                </div>
              </div>
            </div>

            {/* Avatar Housing Stage */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center my-2">
              {/* Concentric Orbit Ring Indicators */}
              <div className="absolute inset-0 rounded-full border border-dashed border-zinc-300/70 dark:border-zinc-700/50 animate-spin-slow" />
              <div
                className="absolute inset-2 rounded-full bg-gradient-to-tr from-zinc-300/30 via-zinc-400/20 to-transparent dark:from-zinc-800 dark:via-zinc-800/40 dark:to-transparent p-[1px] animate-spin-slow"
                style={{ animationDirection: 'reverse' }}
              />

              <div className="absolute inset-4 rounded-full bg-zinc-200 dark:bg-[#18181b] flex items-center justify-center overflow-hidden shadow-2xl border border-zinc-300/50 dark:border-zinc-800">
                {/* Stylized Photorealistic Avatar Container */}
                <div
                  ref={avatarRef}
                  id="avatar-container"
                  className="relative w-full h-full transition-transform duration-300 ease-out"
                  style={{
                    transform: `scale(${hoveredKey ? 1.04 : 1}) translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`
                  }}
                >
                  <img
                    id="avatar-img"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAswY1sl9AcagtmMfd2spGQ_5OlEQhnm1NFrb3b83pZln5HYT1UCy5pJz9bIHlGfI7gZCTbHoithrvaVULkb9SM8GzUNcypLbZX_ucmixoXcPAigbW4XPA-FuBQHzZ99zg5Zg0zMN4l7Hhfd9mpaLt3wISSEmyf1FERtN1tKG3nhahmt2gSG6t0i_XAgc-EWIW65_nZ8BmKf2cQoB9iunwq4GaHZM6OTlg6m9oeX3kll7s1hv23JA3dgg"
                    alt="Kavin Studio Portrait"
                    className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                </div>

                {/* Interactive Soundwave Pulse overlay */}
                <div
                  id="avatar-pulse"
                  className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-300 ${
                    pulseActive ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-white/20 dark:bg-white/15 animate-ping" />
                </div>
              </div>

              {/* Avatar Status Tag Pill */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 px-3.5 py-1 rounded-full shadow-lg flex items-center gap-2 z-10 border border-zinc-700/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="font-mono text-[10px] tracking-widest font-semibold uppercase">
                  KAVIN_AI v2.4 // READY
                </span>
              </div>
            </div>

            {/* Interactive Bubble 2: Reactive Dynamic Dialogue Bubble */}
            <div className="relative mt-7 max-w-sm w-full">
              <div className="bg-zinc-100 dark:bg-[#18181b] rounded-2xl p-4 shadow-lg border border-zinc-200/80 dark:border-zinc-800 transition-all duration-300 relative overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200/40 dark:border-zinc-800/40">
                  <span className="text-[11px] tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-semibold flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
                    SYSTEM RESPONSE
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 dark:bg-zinc-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 dark:bg-zinc-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 dark:bg-zinc-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>

                <p
                  id="avatar-dialogue-main"
                  className="font-display font-semibold text-sm md:text-base text-zinc-900 dark:text-zinc-100 mt-2 transition-all duration-200"
                >
                  {currentSpeechMain}
                </p>
                <p
                  id="avatar-dialogue-sub"
                  className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed transition-all duration-200"
                >
                  {currentSpeechSub}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Title & 5 Interactive Perspectives (Cols 6-12) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 lg:pl-4">
            {/* Typography Introduction Header */}
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-zinc-800 dark:text-zinc-300 tracking-widest uppercase font-semibold">
                  CATALOGUE // 2025
                </span>
                <span className="h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-zinc-950 dark:text-white uppercase leading-none">
                WELCOME
              </h1>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 italic font-light">
                  How would you like to see me?
                </span>
                <span className="inline-block w-2.5 h-4 bg-zinc-900 dark:bg-white animate-pulse" />
              </div>
            </div>

            {/* The 5 Bespoke Perspective Selectors */}
            <div className="flex flex-col space-y-2 w-full pt-2" id="perspective-list">
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
                    style={{ opacity: isDimmed ? 0.35 : 1 }}
                    className={`group cursor-pointer rounded-2xl transition-all duration-300 p-3.5 sm:p-4 relative overflow-hidden border ${
                      isSelected
                        ? 'bg-zinc-200/90 dark:bg-[#222226] border-zinc-400 dark:border-zinc-600 shadow-md translate-x-1'
                        : 'bg-zinc-100/80 hover:bg-zinc-200/70 dark:bg-[#141416] dark:hover:bg-[#1c1c1f] border-zinc-200/60 dark:border-zinc-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white tracking-widest font-semibold transition-colors">
                          {item.id}
                        </span>

                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-display font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 tracking-tight group-hover:translate-x-1 transition-transform truncate">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-mono text-[9px] uppercase font-bold tracking-wider">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 pl-3">
                        {isSelected && (
                          <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-mono text-[10px] uppercase font-bold tracking-wider animate-in fade-in">
                            SELECTED
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Perspective Micro-Dashboard Teaser / Expandable Card */}
        {currentSelectedItem && (
          <div
            id="perspective-preview-panel"
            className="w-full bg-zinc-100 dark:bg-[#18181b] border border-zinc-300 dark:border-zinc-700/80 rounded-3xl p-5 md:p-6 shadow-2xl transition-all duration-500 mt-4 relative overflow-hidden animate-in fade-in slide-in-from-bottom-3"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0">
                  {getPerspectiveIcon(currentSelectedItem.key)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold">
                      MODE LOADED
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                      {currentSelectedItem.title}
                    </span>
                  </div>

                  <h3 className="font-display text-lg md:text-xl text-zinc-950 dark:text-white font-bold mt-1">
                    {currentSelectedItem.title} Focus Initialized
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                    {currentSelectedItem.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  id="close-preview"
                  type="button"
                  onClick={handleDismissPreview}
                  className="px-4 py-2 rounded-full bg-zinc-200 dark:bg-[#222226] text-zinc-800 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-[#2c2c30] text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Dismiss
                </button>

                <button
                  id="preview-launch-link"
                  type="button"
                  onClick={() => {
                    soundFx.playConfirm();
                    onProceedToDossier(currentSelectedItem.key);
                  }}
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:scale-[1.02] active:scale-[0.98] text-xs uppercase tracking-wider font-bold transition-all shadow-lg"
                >
                  <span>Proceed to Dossier</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Guide Marker: Scroll Cue & Operational Telemetry */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-200/40 dark:border-zinc-800/40 text-zinc-400 dark:text-zinc-500">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>LATENCY: 14MS // CLOUD REGION: US-EAST</span>
          </div>

          <div
            onClick={() => {
              if (currentSelectedItem) {
                onProceedToDossier(currentSelectedItem.key);
              } else {
                window.scrollBy({ top: 400, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors font-medium">
              SCROLL TO EXPLORE // OR SELECT A PERSPECTIVE
            </span>
            <div className="w-4 h-6 rounded-full border border-zinc-300 dark:border-zinc-700 flex justify-center p-1">
              <span className="w-1 h-1.5 rounded-full bg-zinc-900 dark:bg-white animate-pulse" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
            <span>INTERACTION: REFINED 2025</span>
          </div>
        </div>
      </div>
    </section>
  );
};
