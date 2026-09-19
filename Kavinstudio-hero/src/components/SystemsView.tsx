import React from 'react';
import { ArrowLeft, Cpu, Shield, Activity, Layers, Terminal } from 'lucide-react';
import { SYSTEMS_OVERVIEW } from '../data/perspectivesData';
import { soundFx } from '../utils/audio';

interface SystemsViewProps {
  onBackToHero: () => void;
  onOpenTerminal: () => void;
}

export const SystemsView: React.FC<SystemsViewProps> = ({ onBackToHero, onOpenTerminal }) => {
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

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ALL SYSTEMS OPERATIONAL // TELEMETRY STABLE</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest font-semibold">
            <Cpu className="w-4 h-4" />
            <span>SYSTEMS ARCHITECTURE & METHODOLOGIES</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Production Frameworks
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            The foundational technologies, distributed topologies, and visual operating systems authored and maintained across enterprise engagements.
          </p>
        </div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SYSTEMS_OVERVIEW.map((sys, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-6 sm:p-7 bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 font-mono text-[10px] uppercase font-bold text-zinc-800 dark:text-zinc-300">
                    {sys.tag}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    {sys.status}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-zinc-950 dark:text-white">
                  {sys.name}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {sys.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="text-[10px] uppercase font-mono text-zinc-400 font-semibold block">
                  TECHNICAL ATTRIBUTES
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {sys.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2 rounded-xl bg-zinc-200/50 dark:bg-[#1c1c1f] text-[11px] font-mono text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-500" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal CTA */}
        <div className="p-6 rounded-3xl bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-bold text-zinc-950 dark:text-white">
              Want to probe the architectural decision logs?
            </h4>
            <p className="text-xs text-zinc-500">
              Launch Kavin AI to query distributed system benchmarks, RFCs, and design trade-offs.
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playTerminal();
              onOpenTerminal();
            }}
            className="px-6 py-2.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch AI Terminal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
