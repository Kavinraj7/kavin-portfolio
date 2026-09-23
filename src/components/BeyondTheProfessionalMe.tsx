'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Compass, Heart } from 'lucide-react';
import CardFanCarousel, { type CardItem } from './ui/card-fan-carousel';

const BEYOND_CARDS: CardItem[] = [
  {
    imgUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
    alt: 'Analog Street Photography',
    title: 'Analog 35mm Chronicles',
    category: 'Visual & Street',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1200&auto=format&fit=crop',
    alt: 'Custom Mechanical Keyboards',
    title: 'Custom Keyboard Crafting',
    category: 'Hardware & Tactile',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    alt: 'High Altitude Mountain Trekking',
    title: 'Alpine Trails & Peaks',
    category: 'Endurance & Nature',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop',
    alt: 'Deep Night Sky & Astrophotography',
    title: 'Astrophotography & Cosmos',
    category: 'Stargazing & Space',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
    alt: 'Specialty Pour-over Coffee',
    title: 'Specialty Coffee Rituals',
    category: 'Brewing & Craft',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
    alt: 'Acoustic Guitar & Music',
    title: 'Fingerstyle Acoustics',
    category: 'Rhythm & Sound',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    alt: 'Minimalist Workspace Architecture',
    title: 'Minimalist Spatial Design',
    category: 'Interior & Space',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    alt: 'Architectural Urban Exploration',
    title: 'Brutalist Urban Geometry',
    category: 'Architecture & Cities',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop',
    alt: 'Sci-Fi and Tech Philosophy Books',
    title: 'Hard Sci-Fi & Philosophy',
    category: 'Literature & Mind',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
    alt: 'Artisanal Sourdough & Fermentation',
    title: 'Artisanal Fermentation',
    category: 'Culinary & Science',
  },
];

export const BeyondTheProfessionalMe: React.FC = () => {
  return (
    <section id="beyond-me" className="relative w-full bg-[#FFFFFF] text-zinc-900 border-t border-zinc-200 py-16 sm:py-24 overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-100/60 via-pink-100/50 to-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 font-mono text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
            <span>Passions &bull; Creative Pursuits</span>
          </div>

          <h2 className="font-display font-black tracking-tight text-4xl sm:text-6xl md:text-7xl text-zinc-950 uppercase leading-none">
            Beyond the Professional Me
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
            Beyond code commits, database schemas, and terminal sessions — a visual look into my world of analog photography, mechanical hardware, high-altitude trails, and creative rituals.
          </p>
        </motion.div>
      </div>

      {/* Interactive Card Fan Carousel */}
      <div className="w-full max-w-[96rem] mx-auto">
        <CardFanCarousel cards={BEYOND_CARDS} />
      </div>

      {/* Bottom Subtle Navigation Hint */}
      <div className="mt-6 text-center">
        <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Hover or drag cards to interact &bull; Use arrows to cycle</span>
        </p>
      </div>
    </section>
  );
};

export default BeyondTheProfessionalMe;
