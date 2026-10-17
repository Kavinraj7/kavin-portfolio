// components/MyEducationSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { GradientCard } from '@/components/ui/gradient-card';

export const MyEducationSection: React.FC = () => {
  return (
    <section
      id="my-education"
      className="relative w-full min-h-[90vh] lg:h-screen max-h-[950px] flex flex-col justify-center bg-[#FFFFFF] text-zinc-900 border-t border-zinc-200 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-hidden"
    >
      {/* Background Subtle Dot Matrix */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      <div className="relative max-w-6xl mx-auto w-full flex flex-col justify-center h-full">
        {/* Compact Section Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-zinc-600 uppercase mb-2 shadow-2xs"
          >
            <GraduationCap className="w-3.5 h-3.5 text-zinc-800" />
            <span>Academic Background</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="font-display font-black tracking-tight text-3xl sm:text-5xl md:text-6xl text-zinc-950 uppercase leading-none"
          >
            MY EDUCATION
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-2 text-xs sm:text-sm text-zinc-600 max-w-xl"
          >
            The academic chapters behind my journey.
          </motion.p>
        </div>

        {/* 2-Row Grid: Row 1 Combined 2 Columns, Row 2 Split 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {/* ── ROW 1: COMBINED FIRST TWO BOXES (College / Degree) ── */}
          <div className="md:col-span-2">
            <GradientCard
              gradient="orange"
              badgeText="Undergraduate"
              badgeColor="#EA580C"
              institution="KSR Institute For Engineering And Technology"
              standard="B.Tech — Information Technology"
              year="2022 — 2026"
              score="CGPA: 8.166 / 10"
              description="My foundation in Information Technology, strengthened through software development, data, AI, project work, and hands-on technical exploration."
              imageUrl="/KSR.jpg"
              imageWrapperClassName="w-3/5 md:w-3/4 [mask-image:linear-gradient(to_right,transparent,black_30%)]"
              className="p-5 sm:p-6"
            />
          </div>

          {/* ── ROW 2: BOX 1 (Higher Secondary - 12th) ── */}
          <div className="md:col-span-1">
            <GradientCard
              gradient="green"
              badgeText="Higher Secondary"
              badgeColor="#059669"
              institution="KLN Vidyalaya CBSE School"
              standard="HSC (12th Grade) — Bio-Maths / Science"
              year="2021 — 2022"
              score="76.7%"
              description="A science-focused foundation across mathematics, physics, and chemistry that strengthened my analytical thinking."
              imageUrl="/KLN.jpg"
              className="p-5 sm:p-6"
            />
          </div>

          {/* ── ROW 2: BOX 2 (Secondary School - 10th) ── */}
          <div className="md:col-span-1">
            <GradientCard
              gradient="purple"
              badgeText="Secondary School"
              badgeColor="#7C3AED"
              institution="KLN Vidyalaya CBSE School"
              standard="SSLC (10th Grade) — General Science & Maths"
              year="2019 — 2020"
              score="86%"
              description="Built my early foundation in science and mathematics while developing curiosity through academics and extracurricular activities."
              imageUrl="/KLN.jpg"
              className="p-5 sm:p-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyEducationSection;
