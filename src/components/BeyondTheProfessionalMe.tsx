'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Compass, Heart } from 'lucide-react';
import CardFanCarousel, { type CardItem } from './ui/card-fan-carousel';

const BEYOND_CARDS: CardItem[] = [
  {
    imgUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
    alt: 'Movies & Cinema Screen',
    title: 'Movies & Cinema',
    category: 'Entertainment',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop',
    alt: 'Anime & Manga Culture',
    title: 'Anime',
    category: 'Entertainment',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    alt: 'Fitness & Gym Training',
    title: 'Fitness & Gym',
    category: 'Lifestyle',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
    alt: 'Travel & Scenic Exploration',
    title: 'Travel & Exploration',
    category: 'Adventure',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop',
    alt: 'Story Writing & Journaling',
    title: 'Story Writing',
    category: 'Creative',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop',
    alt: 'Art & Pencil Drawing',
    title: 'Drawing',
    category: 'Creative',
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
    alt: 'Music, Headphones & Playlists',
    title: 'Music & Playlists',
    category: 'Entertainment',
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
            Beyond projects and deadlines — the interests, curiosities, and little obsessions that make up the person behind the work.
          </p>
        </motion.div>
      </div>

      {/* Interactive Card Fan Carousel */}
      <div className="w-full max-w-[96rem] mx-auto">
        <CardFanCarousel cards={BEYOND_CARDS} />
      </div>


    </section>
  );
};

export default BeyondTheProfessionalMe;
