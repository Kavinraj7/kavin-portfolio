'use client';

import React, { useEffect, useState } from 'react';
import PaperCurlCarousel, { type PaperCurlItem } from './ui/paper-curl-carousel';

// Canvas plate painting dimensions matched to widescreen stage aspect ratio
const W = 1440;
const H = 780;

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

// Plate mark header for each methodology print with safe top margin
function plate(c: Ctx, numeral: string, ink: string, subtitle: string) {
  const spaced = c as Ctx & { letterSpacing?: string };
  c.fillStyle = ink;
  c.textBaseline = 'alphabetic';
  c.font = '900 128px "Inter", "Helvetica Neue", Arial, sans-serif';
  spaced.letterSpacing = '-4px';
  c.fillText(numeral, 100, 175);
  spaced.letterSpacing = '0px';
  c.font = '700 20px "Inter", sans-serif';
  c.fillText(subtitle.toUpperCase(), 105, 218);
}

// Subtext and headline with safe bottom margin
function subtext(c: Ctx, headline: string, desc: string, ink: string) {
  c.fillStyle = ink;
  c.font = '800 40px "Inter", sans-serif';
  c.fillText(headline, 100, 610);
  c.font = '500 19px "Inter", sans-serif';
  c.fillStyle = ink;
  c.globalAlpha = 0.85;
  c.fillText(desc, 100, 655);
  c.globalAlpha = 1;
}

const METHODOLOGY_PLATES = [
  {
    item: {
      title: 'Understand First',
      caption: 'Stage 01 • Problem discovery, requirements & stakeholder alignment',
      alt: 'Deep Inquiry & Discovery plate',
    },
    bg: '#F8FAFC',
    paint: (c: Ctx) => {
      // Background base
      rect(c, 0, 0, W, H, '#F1F5F9');
      // Graphic accents
      disc(c, 1050, 390, 240, '#E2E8F0');
      disc(c, 1100, 360, 160, '#0284C7', 0.85);
      disc(c, 920, 440, 80, '#0F172A', 0.9);
      // Grid lines
      c.strokeStyle = 'rgba(15, 23, 42, 0.08)';
      c.lineWidth = 2;
      for (let x = 80; x < W; x += 120) {
        c.beginPath();
        c.moveTo(x, 0);
        c.lineTo(x, H);
        c.stroke();
      }
      plate(c, '01', '#0F172A', 'Phase 01 — UNDERSTAND');
      subtext(
        c,
        'CONTEXT BEFORE CODE',
        'Understand the problem, people, requirements, constraints, and desired outcome before deciding what to build.',
        '#0F172A'
      );
    },
  },
  {
    item: {
      title: 'Strategic Blueprint',
      caption: 'Stage 02 • Architecture, workflows & execution planning',
      alt: 'First Principles Blueprint plate',
    },
    bg: '#0F172A',
    paint: (c: Ctx) => {
      // Dark Blueprint aesthetic
      rect(c, 0, 0, W, H, '#090D16');
      shape(c, 'M400 240 L1350 140 L1250 480 L320 540 Z', '#1E293B', 0.8);
      shape(c, 'M450 280 L1280 190 L1200 440 L380 500 Z', '#06B6D4', 0.15);
      // Schematic blueprint lines
      c.strokeStyle = '#38BDF8';
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(450, 280);
      c.lineTo(1280, 190);
      c.lineTo(1200, 440);
      c.lineTo(380, 500);
      c.closePath();
      c.stroke();
      disc(c, 450, 280, 8, '#38BDF8');
      disc(c, 1280, 190, 8, '#38BDF8');
      disc(c, 1200, 440, 8, '#38BDF8');
      disc(c, 380, 500, 8, '#38BDF8');
      plate(c, '02', '#F8FAFC', 'Phase 02 — PLAN');
      subtext(
        c,
        'BLUEPRINT THE SOLUTION',
        'Break the problem into clear goals, workflows, technologies, responsibilities, and measurable milestones.',
        '#F8FAFC'
      );
    },
  },
  {
    item: {
      title: 'Build & Iterate',
      caption: 'Stage 03 • Development, analysis & collaborative execution',
      alt: 'Agile Velocity & Build plate',
    },
    bg: '#F8FAFC',
    paint: (c: Ctx) => {
      rect(c, 0, 0, W, H, '#FAFAFA');
      disc(c, 1080, 390, 200, '#10B981', 0.12);
      // Velocity light rays
      const rays: [number, number, number, number, string][] = [
        [400, 310, 950, 6, '#10B981'],
        [320, 360, 1080, 8, '#059669'],
        [480, 410, 860, 5, '#34D399'],
        [280, 460, 1140, 10, '#047857'],
      ];
      for (const [x, y, w, h, fill] of rays) {
        rect(c, x, y, w, h, fill, 0.85);
      }
      plate(c, '03', '#0F172A', 'Phase 03 — BUILD');
      subtext(
        c,
        'TURN IDEAS INTO SYSTEMS',
        'Build iteratively, combining the right technologies, data, people, and processes to create a practical solution.',
        '#0F172A'
      );
    },
  },
  {
    item: {
      title: 'Refine & Validate',
      caption: 'Stage 04 • Testing, feedback, analysis & continuous improvement',
      alt: 'Talent & Culture plate',
    },
    bg: '#18181B',
    paint: (c: Ctx) => {
      rect(c, 0, 0, W, H, '#111827');
      disc(c, 1050, 350, 170, '#F43F5E', 0.25);
      disc(c, 1180, 420, 130, '#FB7185', 0.3);
      shape(c, 'M850 500 C 950 360, 1200 360, 1300 500 Z', '#E11D48', 0.7);
      plate(c, '04', '#F9FAFB', 'Phase 04 — VALIDATE');
      subtext(
        c,
        'MAKE IT BETTER',
        'Test assumptions, evaluate outcomes, gather feedback, and refine the solution until it works for both users and objectives.',
        '#F9FAFB'
      );
    },
  },
  {
    item: {
      title: 'Deliver With Purpose',
      caption: 'Stage 05 • Deployment, communication & measurable outcomes',
      alt: 'Measured Impact & Scale plate',
    },
    bg: '#F8FAFC',
    paint: (c: Ctx) => {
      rect(c, 0, 0, W, H, '#F8FAFC');
      // Concentric scale rings
      disc(c, 1100, 390, 260, '#6366F1', 0.08);
      disc(c, 1100, 390, 180, '#6366F1', 0.12);
      disc(c, 1100, 390, 110, '#4F46E5', 0.85);
      disc(c, 1100, 390, 50, '#FFFFFF');
      plate(c, '05', '#0F172A', 'Phase 05 — DELIVER');
      subtext(
        c,
        'FROM WORK TO IMPACT',
        'Bring everything together for delivery, communicate the outcome clearly, and measure what the work achieves.',
        '#0F172A'
      );
    },
  },
];

function paintMethodologyPrints(): PaperCurlItem[] {
  if (typeof document === 'undefined') return [];
  const canvas = document.createElement('canvas');
  canvas.width = W * 2;
  canvas.height = H * 2;
  const c = canvas.getContext('2d');
  if (!c) return [];

  return METHODOLOGY_PLATES.map(({ item, paint }) => {
    c.setTransform(2, 0, 0, 2, 0, 0);
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
    <section
      id="how-i-work"
      className="relative w-full min-h-screen flex flex-col justify-center items-center bg-[#FFFFFF] text-zinc-900 border-t border-zinc-200 py-12 sm:py-16 md:py-20 select-none"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 md:mb-10 w-full">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display font-black tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-zinc-950 uppercase leading-none">
            HOW I WORK
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 max-w-xl">
            I understand what needs to be solved, build with intent, test what matters, and deliver what works.
          </p>
        </div>
      </div>

      {/* Paper Curl Carousel Stage */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
