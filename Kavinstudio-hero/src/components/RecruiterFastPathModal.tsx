import React from 'react';
import { X, Zap, Download, Mail, ExternalLink, Calendar, CheckCircle, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface RecruiterFastPathModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToHolistic: () => void;
  onOpenEngagement: () => void;
}

export const RecruiterFastPathModal: React.FC<RecruiterFastPathModalProps> = ({
  isOpen,
  onClose,
  onProceedToHolistic,
  onOpenEngagement
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="recruiter-modal"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFx.playDismiss();
          onClose();
        }
      }}
    >
      <div className="bg-zinc-100 dark:bg-[#141416] w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-300 dark:border-zinc-800 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                90-SECOND EXECUTIVE DOSSIER
              </span>
              <span className="font-mono text-xs text-zinc-400">TARGET: HIRING DIRECTORS & FOUNDERS</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white mt-1">
              Kavin — Executive Fast Track
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
              Multi-disciplinary technical leader operating at the nexus of distributed systems, operational rigor, and people architecture.
            </p>
          </div>

          <button
            id="close-recruiter-modal"
            type="button"
            onClick={() => {
              soundFx.playDismiss();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-zinc-200 hover:bg-zinc-300 dark:bg-[#222226] dark:hover:bg-[#2a2a2e] flex items-center justify-center text-zinc-700 dark:text-zinc-300 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Core Metric Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Pipeline Influenced', val: '$42M+' },
            { label: 'System Availability', val: '99.99%' },
            { label: 'Staff Scaled', val: '45+ Heads' },
            { label: 'Regrettable Attrition', val: '1.4%' }
          ].map((m, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800">
              <div className="font-display text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white">
                {m.val}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Fast Track Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 space-y-3">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Target Roles & Engagements
            </h3>
            <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" />
                <span>Head of Engineering / VP Technology</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" />
                <span>Principal Distributed Systems Architect</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" />
                <span>Fractional Technical Advisor (Seed to Series B)</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 space-y-3">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              Availability & Work Terms
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <strong>Window:</strong> Open for Q2 2025 starts.<br />
              <strong>Location:</strong> Hybrid (New York / EST Hubs) or high-sync Remote.<br />
              <strong>Compensation Structure:</strong> Competitive base + equity alignment or advisory retainer.
            </p>
          </div>
        </div>

        {/* Direct Action Hub */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              soundFx.playConfirm();
              onProceedToHolistic();
              onClose();
            }}
            className="text-xs font-semibold uppercase tracking-wider text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            Explore Complete Story Dossier →
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href="mailto:pocokavin123@gmail.com?subject=Inquiry%20from%20Recruiter%20Fast%20Path"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-zinc-200 hover:bg-zinc-300 dark:bg-[#222226] dark:hover:bg-[#2c2c30] text-zinc-900 dark:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Kavin</span>
            </a>

            <button
              type="button"
              onClick={() => {
                soundFx.playConfirm();
                onClose();
                onOpenEngagement();
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 text-xs font-bold uppercase tracking-wider transition-opacity shadow-md"
            >
              <span>Schedule 20-Min Call</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
