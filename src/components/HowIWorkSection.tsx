'use client';

import React, { useEffect, useState } from 'react';
import PaperCurlCarousel, { type PaperCurlItem } from './ui/paper-curl-carousel';

// Canvas plate painting dimensions
const W = 1440;
const H = 840;
const SHEET_H = 1080;
const INSET = (SHEET_H - H) / 2;

type Ctx = CanvasRenderingContext2D;

const rect = (c: Ctx, x: number, y: number, w: number, h: number, fill: string, alpha = 1) => {
  c.globalAlpha = alpha;
  c.fillStyle = fill;
  c.fillRect(x, y, w, h);
  c.globalAlpha = 1;
};

const shape = (c: Ctx, d: string, fill: string, alpha = 1) => {
  c.globalAlpha = alpha;
  c.fillStyle = fill;
  c.fill(new Path2D(d));
  c.globalAlpha = 1;
};

const disc = (c: Ctx, x: number, y: number, r: number, fill: string, alpha = 1) => {
  c.globalAlpha = alpha;
  c.fillStyle = fill;
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.fill();
  c.globalAlpha = 1;
};

// Plate mark header for each methodology print
function plate(c: Ctx, numeral: string, ink: string, subtitle: string) {
  const spaced = c as Ctx & { letterSpacing?: string };
  c.fillStyle = ink;
  c.textBaseline = 'alphabetic';
  c.font = '900 160px "Inter", "Helvetica Neue", Arial, sans-serif';
  spaced.letterSpacing = '-6px';
  c.fillText(numeral, 80, 200);
  spaced.letterSpacing = '0px';
  c.font = '700 22px "Inter", sans-serif';
  c.fillText(subtitle.toUpperCase(), 90, 245);
}

function subtext(c: Ctx, headline: string, desc: string, ink: string) {
  c.fillStyle = ink;
  c.font = '800 48px "Inter", sans-serif';
  c.fillText(headline, 80, 710);
  c.font = '500 22px "Inter", sans-serif';
  c.fillStyle = ink;
  c.globalAlpha = 0.75;
  c.fillText(desc, 80, 755);
  c.globalAlpha = 1;
}

const METHODOLOGY_PLATES = [
  {
    item: {
      title: 'Deep Inquiry & Discovery',
      caption: 'Stage 01 • Problem framing, technical constraints & stakeholder alignment',
      alt: 'Deep Inquiry & Discovery plate',
    },
    bg: '#F8FAFC',
    paint: (c: Ctx) => {
      // Background base
      rect(c, 0, 0, W, H, '#F1F5F9');
      // Graphic accents
      disc(c, 1050, 420, 260, '#E2E8F0');
      disc(c, 1100, 390, 180, '#0284C7', 0.85);
      disc(c, 920, 480, 90, '#0F172A', 0.9);
      // Grid lines
      c.strokeStyle = 'rgba(15, 23, 42, 0.08)';
      c.lineWidth = 2;
      for (let x = 80; x < W; x += 120) {
        c.beginPath();
        c.moveTo(x, 0);
        c.lineTo(x, H);
        c.stroke();
      }
      plate(c, '01', '#0F172A', 'Phase 01 — Inquiry & Research');
      subtext(
        c,
        'DISCOVERY & MAPPING',
        'Deconstruct complex domain challenges into fundamental architectural prerequisites.',
        '#0F172A'
      );
    },
  },
  {
    item: {
      title: 'First Principles Blueprint',
      caption: 'Stage 02 • System topology, schema architecture & interface design',
      alt: 'First Principles Blueprint plate',
    },
    bg: '#0F172A',
    paint: (c: Ctx) => {
      // Dark Blueprint aesthetic
      rect(c, 0, 0, W, H, '#090D16');
      shape(c, 'M400 280 L1350 160 L1250 560 L320 620 Z', '#1E293B', 0.8);
      shape(c, 'M450 320 L1280 220 L1200 520 L380 580 Z', '#06B6D4', 0.15);
      // Schematic blueprint lines
      c.strokeStyle = '#38BDF8';
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(450, 320);
      c.lineTo(1280, 220);
      c.lineTo(1200, 520);
      c.lineTo(380, 580);
      c.closePath();
      c.stroke();
      disc(c, 450, 320, 8, '#38BDF8');
      disc(c, 1280, 220, 8, '#38BDF8');
      disc(c, 1200, 520, 8, '#38BDF8');
      disc(c, 380, 580, 8, '#38BDF8');
      plate(c, '02', '#F8FAFC', 'Phase 02 — System Architecture');
      subtext(
        c,
        'BLUEPRINT & PRINCIPLES',
        'Model scalable schemas, decoupling dependencies for high reliability and throughput.',
        '#F8FAFC'
      );
    },
  },
  {
    item: {
      title: 'Agile Velocity & Build',
      caption: 'Stage 03 • Fast feedback loops, continuous delivery & clean code',
      alt: 'Agile Velocity & Build plate',
    },
    bg: '#F8FAFC',
    paint: (c: Ctx) => {
      rect(c, 0, 0, W, H, '#FAFAFA');
      disc(c, 1080, 420, 220, '#10B981', 0.12);
      // Velocity light rays
      const rays: [number, number, number, number, string][] = [
        [400, 340, 950, 6, '#10B981'],
        [320, 390, 1080, 8, '#059669'],
        [480, 440, 860, 5, '#34D399'],
        [280, 490, 1140, 10, '#047857'],
      ];
      for (const [x, y, w, h, fill] of rays) {
        rect(c, x, y, w, h, fill, 0.85);
      }
      plate(c, '03', '#0F172A', 'Phase 03 — Agile Engineering');
      subtext(
        c,
        'EXECUTION & VELOCITY',
        'Iterative delivery with automated testing, CI/CD pipelines, and zero-defect focus.',
        '#0F172A'
      );
    },
  },
  {
    item: {
      title: 'Talent, Culture & Governance',
      caption: 'Stage 04 • Cross-team synergy, rigorous code reviews & developer growth',
      alt: 'Talent & Culture plate',
    },
    bg: '#18181B',
    paint: (c: Ctx) => {
      rect(c, 0, 0, W, H, '#111827');
      disc(c, 1050, 380, 190, '#F43F5E', 0.25);
      disc(c, 1180, 460, 140, '#FB7185', 0.3);
      shape(c, 'M850 560 C 950 420, 1200 420, 1300 560 Z', '#E11D48', 0.7);
      plate(c, '04', '#F9FAFB', 'Phase 04 — Team Culture');
      subtext(
        c,
        'COLLABORATION & GOVERNANCE',
        'Fostering high-trust team environments with structured RFCs and actionable mentorship.',
        '#F9FAFB'
      );
    },
  },
  {
    item: {
      title: 'Measured Impact & Scaling',
      caption: 'Stage 05 • Telemetry monitoring, performance tuning & resilient scale',
      alt: 'Measured Impact & Scale plate',
    },
    bg: '#F8FAFC',
    paint: (c: Ctx) => {
      rect(c, 0, 0, W, H, '#F8FAFC');
      // Concentric scale rings
      disc(c, 1100, 420, 320, '#6366F1', 0.08);
      disc(c, 1100, 420, 220, '#6366F1', 0.12);
      disc(c, 1100, 420, 130, '#4F46E5', 0.85);
      disc(c, 1100, 420, 60, '#FFFFFF');
      plate(c, '05', '#0F172A', 'Phase 05 — Scale & Impact');
      subtext(
        c,
        'OPTIMIZATION & SCALE',
        'Continuous telemetry, bottleneck elimination, and resilient infrastructure growth.',
        '#0F172A'
      );
    },
  },
];

function paintMethodologyPrints(): PaperCurlItem[] {
  if (typeof document === 'undefined') return [];
  const canvas = document.createElement('canvas');
  canvas.width = W * 2;
  canvas.height = SHEET_H * 2;
  const c = canvas.getContext('2d');
  if (!c) return [];

  return METHODOLOGY_PLATES.map(({ item, bg, paint }) => {
    c.setTransform(2, 0, 0, 2, 0, 0);
    rect(c, 0, 0, W, INSET + 1, bg);
    rect(c, 0, INSET + H - 1, W, INSET + 1, bg);
    c.translate(0, INSET);
    paint(c);
    return { ...item, src: canvas.toDataURL('image/png') };
  });
}

export const HowIWorkSection: React.FC = () => {
  const [items, setItems] = useState<PaperCurlItem[]>([]);

  useEffect(() => {
    setItems(paintMethodologyPrints());
  }, []);

  return (
    <section id="how-i-work" className="relative w-full bg-[#FFFFFF] text-zinc-900 border-t border-zinc-200 py-16 sm:py-24">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-zinc-500 font-bold mb-3 uppercase">
            Execution &bull; Engineering Process
          </span>
          <h2 className="font-display font-black tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-zinc-950 uppercase leading-none">
            HOW I WORK
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 max-w-xl">
            Drag the edge or flick each sheet to explore the 5 core phases of my product & engineering methodology.
          </p>
        </div>
      </div>

      {/* Paper Curl Carousel Stage */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/80 bg-zinc-50">
          {items.length > 0 ? (
            <PaperCurlCarousel
              items={items}
              height="650px"
              autoplay={4000}
              loop={true}
              paper="#EDEEE9"
              rail={true}
            />
          ) : (
            <div className="w-full h-[650px] flex items-center justify-center text-zinc-400 font-mono text-sm">
              Loading methodology sheets...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HowIWorkSection;
