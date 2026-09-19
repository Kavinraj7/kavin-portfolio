import React from 'react';
import { ArrowLeft, UserCheck, Award, MapPin, Mail, Calendar } from 'lucide-react';
import { BIOGRAPHY_MILESTONES } from '../data/perspectivesData';
import { soundFx } from '../utils/audio';

interface BiographyViewProps {
  onBackToHero: () => void;
  onOpenEngagement: () => void;
}

export const BiographyView: React.FC<BiographyViewProps> = ({ onBackToHero, onOpenEngagement }) => {
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
            CHRONICLE // CAREER ARC
          </span>
        </div>

        {/* Top Profile Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-56 h-56 rounded-3xl overflow-hidden border border-zinc-300 dark:border-zinc-800 shadow-xl bg-zinc-200 dark:bg-[#18181b]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAswY1sl9AcagtmMfd2spGQ_5OlEQhnm1NFrb3b83pZln5HYT1UCy5pJz9bIHlGfI7gZCTbHoithrvaVULkb9SM8GzUNcypLbZX_ucmixoXcPAigbW4XPA-FuBQHzZ99zg5Zg0zMN4l7Hhfd9mpaLt3wISSEmyf1FERtN1tKG3nhahmt2gSG6t0i_XAgc-EWIW65_nZ8BmKf2cQoB9iunwq4GaHZM6OTlg6m9oeX3kll7s1hv23JA3dgg"
                alt="Kavin Studio Portrait"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest font-semibold">
              <UserCheck className="w-4 h-4 text-emerald-500" />
              <span>PRINCIPAL TECHNOLOGIST & OPERATIONS LEADER</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Kavin
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-light max-w-2xl">
              An engineer and strategist with nearly a decade of experience navigating the full spectrum of modern digital software development: from writing high-performance low-level concurrent code to guiding multi-million dollar corporate P&L and cross-functional teams.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                <MapPin className="w-3.5 h-3.5" />
                <span>New York, NY (UTC-05:00 EST)</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                <Mail className="w-3.5 h-3.5" />
                <span>pocokavin123@gmail.com</span>
              </div>
              <button
                onClick={onOpenEngagement}
                className="px-4 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Inquire for Q2 2025
              </button>
            </div>
          </div>
        </div>

        {/* Chronological Timeline */}
        <div className="space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
            CAREER CHRONOLOGY
          </h2>

          <div className="space-y-4">
            {BIOGRAPHY_MILESTONES.map((m, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-purple-600 dark:text-purple-400 font-bold">
                    {m.period}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    {m.organization}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-zinc-950 dark:text-white">
                  {m.role}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
