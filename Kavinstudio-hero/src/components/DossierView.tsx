import React from 'react';
import {
  ArrowLeft,
  Terminal,
  Zap,
  CheckCircle2,
  Share2,
  Calendar,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Building2,
  Users,
  Code2,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { PerspectiveKey, PerspectiveItem } from '../types';
import { soundFx } from '../utils/audio';

interface DossierViewProps {
  perspectives: PerspectiveItem[];
  currentKey: PerspectiveKey;
  onSelectPerspective: (key: PerspectiveKey) => void;
  onBackToHero: () => void;
  onOpenTerminal: () => void;
  onOpenFastPath: () => void;
  onOpenEngagement: () => void;
}

export const DossierView: React.FC<DossierViewProps> = ({
  perspectives,
  currentKey,
  onSelectPerspective,
  onBackToHero,
  onOpenTerminal,
  onOpenFastPath,
  onOpenEngagement
}) => {
  const item = perspectives.find((p) => p.key === currentKey) || perspectives[0];

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
    <div className="w-full min-h-screen bg-[#fcf8f8] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 py-6 md:py-10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 space-y-8 md:space-y-12">
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <button
              id="dossier-back-btn"
              type="button"
              onClick={() => {
                soundFx.playDismiss();
                onBackToHero();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-[#18181b] dark:hover:bg-[#222226] border border-zinc-200 dark:border-zinc-800 text-xs uppercase tracking-wider font-semibold text-zinc-800 dark:text-zinc-200 transition-all hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Editorial Hero</span>
              <span className="text-[10px] text-zinc-400 font-mono px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">
                ESC
              </span>
            </button>

            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">/</span>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase">
              <span>PERSPECTIVE DOSSIER</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-900 dark:text-white font-semibold">
                {item.title}
              </span>
            </div>
          </div>

          {/* Action Hub */}
          <div className="flex items-center gap-2">
            <button
              id="dossier-terminal-btn"
              onClick={() => {
                soundFx.playTerminal();
                onOpenTerminal();
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-[#18181b] dark:hover:bg-[#222226] border border-zinc-200 dark:border-zinc-800 text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              <span className="hidden md:inline">Query AI Terminal</span>
            </button>

            <button
              id="dossier-fastpath-btn"
              onClick={() => {
                soundFx.playConfirm();
                onOpenFastPath();
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Recruiter Fast Track</span>
            </button>
          </div>
        </div>

        {/* Perspective Quick Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {perspectives.map((p) => {
            const isActive = p.key === currentKey;
            return (
              <button
                key={p.key}
                id={`dossier-tab-${p.key}`}
                onClick={() => {
                  soundFx.playHover();
                  onSelectPerspective(p.key);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-white shadow-md'
                    : 'bg-zinc-100 text-zinc-600 dark:bg-[#141416] dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-[#1c1c1f]'
                }`}
              >
                <span className="font-mono text-[10px] opacity-70">{p.id}</span>
                <span>{p.title}</span>
                {p.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-zinc-700 text-white dark:bg-zinc-200 dark:text-zinc-900 font-mono">
                    {p.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Header Hero for Perspective */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-zinc-200 dark:bg-[#18181b] border border-zinc-300 dark:border-zinc-700 flex items-center justify-center">
                {getPerspectiveIcon(item.key)}
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                ARCHETYPE RECORD // {item.id}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {item.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-light max-w-3xl leading-relaxed">
              {item.summary}
            </p>
          </div>

          <div className="lg:col-span-4 bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 space-y-4">
            <span className="text-xs uppercase tracking-wider font-mono text-zinc-500 font-semibold block">
              OPERATIONAL CADENCE
            </span>
            <p className="font-display font-medium text-sm text-zinc-800 dark:text-zinc-200 italic">
              "{item.speechMain}"
            </p>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-500">Ready for Consultation</span>
              <button
                id="dossier-book-cta"
                onClick={onOpenEngagement}
                className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white hover:underline flex items-center gap-1"
              >
                Book Discussion →
              </button>
            </div>
          </div>
        </div>

        {/* Quantified Metrics Ledger */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-zinc-500" />
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
              QUANTIFIED IMPACT TELEMETRY
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {item.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-5 bg-zinc-100/90 dark:bg-[#141416] border border-zinc-200/80 dark:border-zinc-800/80 transition-all hover:border-zinc-400 dark:hover:border-zinc-600"
              >
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mt-1">
                  {metric.label}
                </div>
                {metric.detail && (
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                    {metric.detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Highlights & Core Competencies */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
            KEY CAPABILITIES & LEADERSHIP PROOFS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {item.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-100/70 dark:bg-[#141416] border border-zinc-200/60 dark:border-zinc-800/80 flex items-start gap-3.5"
              >
                <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Dive Case Studies */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
              FIELD CASE STUDIES & DELIVERABLES
            </h2>
            <span className="text-xs text-zinc-400 font-mono">2 PRODUCTION BRIEFS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {item.caseStudies.map((cs, idx) => (
              <div
                key={idx}
                className="rounded-3xl p-6 sm:p-8 bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-200 dark:bg-[#222226] text-zinc-800 dark:text-zinc-300 font-mono text-[10px] uppercase font-semibold">
                      {cs.domain}
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                      MEASURABLE OUTCOME
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-zinc-950 dark:text-white">
                    {cs.title}
                  </h3>

                  <div className="p-3.5 rounded-xl bg-zinc-200/60 dark:bg-[#1e1e22] border border-zinc-300/40 dark:border-zinc-700/50 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-zinc-500 block mb-0.5">
                      PRIMARY IMPACT
                    </span>
                    {cs.impact}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {cs.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-zinc-400 block">
                    METHODOLOGY & STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.technologiesOrFrameworks.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-mono text-[10px] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guiding Operating Philosophies */}
        <div className="rounded-3xl p-6 sm:p-8 bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold block">
            OPERATING PRINCIPLES
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {item.philosophies.map((philo, idx) => (
              <div key={idx} className="space-y-2">
                <span className="font-mono text-xs text-zinc-400 font-bold">
                  RULE 0{idx + 1}
                </span>
                <p className="text-sm font-display font-medium text-zinc-800 dark:text-zinc-200 leading-snug">
                  "{philo}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation CTA */}
        <div className="pt-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800">
          <button
            id="dossier-bottom-back-btn"
            onClick={() => {
              soundFx.playDismiss();
              onBackToHero();
            }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Hero Perspectives</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              id="dossier-bottom-terminal-btn"
              onClick={onOpenTerminal}
              className="px-5 py-2 rounded-full bg-zinc-200 dark:bg-[#222226] hover:bg-zinc-300 dark:hover:bg-[#2a2a2e] text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-white transition-colors"
            >
              Ask AI About This Perspective
            </button>

            <button
              id="dossier-bottom-engagement-btn"
              onClick={onOpenEngagement}
              className="px-6 py-2 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 text-xs font-bold uppercase tracking-wider transition-opacity shadow-md"
            >
              Initiate Dialogue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
