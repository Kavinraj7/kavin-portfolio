import React, { useState } from 'react';
import { X, Send, Mail, MapPin, Clock, CalendarCheck, Check } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface EngagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EngagementModal: React.FC<EngagementModalProps> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState('Full-Time Executive Role');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playConfirm();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div
      id="engagement-modal"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFx.playDismiss();
          onClose();
        }
      }}
    >
      <div className="bg-zinc-100 dark:bg-[#141416] w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-300 dark:border-zinc-800 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-500 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              STATUS: ACCEPTING INQUIRIES
            </span>
            <h2 className="font-display text-2xl font-bold text-zinc-950 dark:text-white mt-1">
              Select Engagements & Roles • Q2 2025
            </h2>
          </div>

          <button
            id="close-engagement-modal"
            type="button"
            onClick={() => {
              soundFx.playDismiss();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-zinc-200 hover:bg-zinc-300 dark:bg-[#222226] dark:hover:bg-[#2a2a2e] flex items-center justify-center text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Telemetry info */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800">
            <Clock className="w-3.5 h-3.5 mx-auto text-zinc-400 mb-1" />
            <div className="text-[10px] uppercase font-mono text-zinc-400">TIMEZONE</div>
            <div className="text-xs font-semibold text-zinc-900 dark:text-white">UTC-05:00 EST</div>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800">
            <CalendarCheck className="w-3.5 h-3.5 mx-auto text-zinc-400 mb-1" />
            <div className="text-[10px] uppercase font-mono text-zinc-400">WINDOW</div>
            <div className="text-xs font-semibold text-zinc-900 dark:text-white">Q2 2025 Start</div>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800">
            <MapPin className="w-3.5 h-3.5 mx-auto text-zinc-400 mb-1" />
            <div className="text-[10px] uppercase font-mono text-zinc-400">BASE</div>
            <div className="text-xs font-semibold text-zinc-900 dark:text-white">New York / Remote</div>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-zinc-950 dark:text-white">
              Transmission Received
            </h3>
            <p className="text-xs text-zinc-500">
              Kavin will review your proposal and respond via email within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-2 font-semibold">
                Engagement Archetype
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'Full-Time Executive Role',
                  'Principal Advisory / Fractional',
                  'Strategic Consultation'
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      soundFx.playHover();
                      setSelectedType(type);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                      selectedType === type
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-white'
                        : 'bg-white text-zinc-700 dark:bg-[#0a0a0a] dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-1 font-semibold">
                Your Contact Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="executive@company.com"
                className="w-full bg-white dark:bg-[#0a0a0a] border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-1 font-semibold">
                Brief Context / Project Brief
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Outline team stage, challenges, or target milestones..."
                className="w-full bg-white dark:bg-[#0a0a0a] border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href="mailto:pocokavin123@gmail.com"
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1.5 font-medium"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>pocokavin123@gmail.com</span>
              </a>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <span>Transmit Brief</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
