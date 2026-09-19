import React from 'react';
import { Volume2, VolumeX, Activity, Compass } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface FooterProps {
  sfxEnabled: boolean;
  onToggleSfx: () => void;
}

export const Footer: React.FC<FooterProps> = ({ sfxEnabled, onToggleSfx }) => {
  return (
    <footer className="w-full bg-[#f6f3f2] dark:bg-[#070708] border-t border-zinc-200 dark:border-zinc-800/80 py-8 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
        {/* Left Telemetry Cluster */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-white" />
            <span>40.7128° N, 74.0060° W</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400 dark:text-zinc-600">UTC-05:00</span>
            <span>EST</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Engine Running</span>
          </div>
        </div>

        {/* Right Controls & Copyright */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onToggleSfx}
            className="hover:text-zinc-900 dark:hover:text-white flex items-center gap-1.5 uppercase tracking-wider transition-colors"
          >
            {sfxEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
            )}
            <span>Audio [{sfxEnabled ? 'On' : 'Off'}]</span>
          </button>

          <div className="flex items-center gap-1.5 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            <span>Haptics [Active]</span>
          </div>

          <span className="text-zinc-400 dark:text-zinc-600">© 2025 Kavin</span>
        </div>
      </div>
    </footer>
  );
};
