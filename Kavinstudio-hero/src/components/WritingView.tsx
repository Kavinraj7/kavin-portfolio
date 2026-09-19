import React from 'react';
import { ArrowLeft, BookOpen, Clock, ArrowUpRight } from 'lucide-react';
import { WRITING_ARTICLES } from '../data/perspectivesData';
import { soundFx } from '../utils/audio';

interface WritingViewProps {
  onBackToHero: () => void;
}

export const WritingView: React.FC<WritingViewProps> = ({ onBackToHero }) => {
  return (
    <div className="w-full min-h-screen bg-[#fcf8f8] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 py-6 md:py-10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 space-y-8 md:space-y-12">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => {
              soundFx.playDismiss();
              onBackToHero();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-[#18181b] dark:hover:bg-[#222226] border border-zinc-200 dark:border-zinc-800 text-xs uppercase tracking-wider font-semibold text-zinc-800 dark:text-zinc-200 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Hero</span>
          </button>

          <span className="font-mono text-xs text-zinc-500 uppercase">
            ESSAYS & TECHNICAL THOUGHTS // 2024 — 2025
          </span>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>ESSAYS & ARCHITECTURAL MANIFESTOS</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Writings & Observations
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Reflections on organizational velocity, engineering ethics, distributed systems simplicity, and talent cultivation.
          </p>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {WRITING_ARTICLES.map((art, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 space-y-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {art.tags.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 font-mono text-[10px] uppercase font-semibold text-zinc-800 dark:text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {art.readTime}
                  </span>
                </div>
              </div>

              <h2 className="font-display text-2xl font-bold text-zinc-950 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex items-center justify-between">
                <span>{art.title}</span>
                <ArrowUpRight className="w-5 h-5 text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h2>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
                {art.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
