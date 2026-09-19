'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Users, BarChart3, Briefcase, ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const roles = [
    {
      title: 'Software Engineering',
      icon: Code,
      desc: 'Building high-performance, scalable web architectures and modern digital products.',
      tag: 'Full-Stack Tech',
    },
    {
      title: 'Data Analytics',
      icon: BarChart3,
      desc: 'Transforming complex datasets into actionable business intelligence and predictive insights.',
      tag: 'Analytics & Models',
    },
    {
      title: 'HR & Talent Strategy',
      icon: Users,
      desc: 'Optimizing human capital, organizational culture, and strategic talent operations.',
      tag: 'People Ops',
    },
    {
      title: 'Administration',
      icon: Briefcase,
      desc: 'Driving operational excellence, cross-functional leadership, and workflow efficiency.',
      tag: 'Operations',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen w-full bg-white text-[#1A1715] flex flex-col justify-center items-center relative overflow-hidden py-16 px-6 sm:px-12 md:px-16"
    >
      {/* Background Accent Subtle Glow */}
      <div className="absolute inset-0 bg-radial from-amber-50/40 via-white to-white pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1715]/5 border border-[#1A1715]/10 text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B] mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Multidisciplinary Professional Identity</span>
        </motion.div>

        {/* Primary Name Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#1A1715] tracking-tight leading-none mb-6 drop-shadow-sm"
        >
          KAVINRAJ M
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="max-w-2xl text-lg sm:text-xl text-[#7A6F66] font-light leading-relaxed mb-12"
        >
          Engineered for impact. Synthesizing software innovation, data analytics, HR strategy, and enterprise administration into a unified vision.
        </motion.p>

        {/* 4 Professional Pillars Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-12"
        >
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                className="group relative bg-[#FDFBF7] p-6 rounded-2xl border border-[#E8DCC4] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left hover:-translate-y-1.5"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100/60 flex items-center justify-center text-[#1A1715] mb-4 group-hover:bg-[#1A1715] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block mb-2">
                    {role.tag}
                  </span>
                  <h3 className="text-xl font-bold text-[#1A1715] mb-2">{role.title}</h3>
                  <p className="text-xs text-[#7A6F66] leading-relaxed">{role.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1A1715] text-white font-bold text-sm hover:bg-[#3D342D] transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <span>Explore Work & Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-[#E8DCC4] text-[#1A1715] font-bold text-sm hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <span>Get in Touch</span>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
