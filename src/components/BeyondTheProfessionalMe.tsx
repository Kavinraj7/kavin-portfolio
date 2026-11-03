'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Carousel_003, type SkiperImageItem } from './ui/skiper49';

const BEYOND_CARDS: SkiperImageItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
    alt: 'Movies & Cinema Screen',
    title: 'Movies & Cinema',
    category: 'Entertainment',
  },
  {
    src: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop',
    alt: 'Anime & Manga Culture',
    title: 'Anime',
    category: 'Entertainment',
  },
  {
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    alt: 'Fitness & Gym Training',
    title: 'Fitness & Gym',
    category: 'Lifestyle',
  },
  {
    src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
    alt: 'Travel & Scenic Exploration',
    title: 'Travel & Exploration',
    category: 'Adventure',
  },
  {
    src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop',
    alt: 'Art & Pencil Drawing',
    title: 'Drawing',
    category: 'Creative',
  },
  {
    src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
    alt: 'Music, Headphones & Playlists',
    title: 'Music & Playlists',
    category: 'Entertainment',
  },
];

export const BeyondTheProfessionalMe: React.FC = () => {
  return (
    <section id="beyond-me" className="relative w-full min-h-screen bg-[#FFFFFF] text-zinc-900 border-t border-zinc-200 py-12 sm:py-16 md:py-20 overflow-hidden flex flex-col justify-center items-center">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-100/60 via-pink-100/50 to-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="w-full my-auto flex flex-col items-center">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >


            <h2 className="font-display font-black tracking-tight text-4xl sm:text-6xl md:text-7xl text-zinc-950 uppercase leading-none">
              Beyond the Professional Me
            </h2>

            <p className="mt-4 text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
              Beyond projects and deadlines — the interests, curiosities, and little obsessions that make up the person behind the work.
            </p>
          </motion.div>
        </div>

        {/* 3D Coverflow Swiper Carousel */}
        <div className="w-full max-w-6xl mx-auto">
          <Carousel_003
            images={BEYOND_CARDS}
            showPagination={true}
            showNavigation={true}
            loop={true}
            autoplay={true}
          />
        </div>
      </div>
    </section>
  );
};

export default BeyondTheProfessionalMe;
