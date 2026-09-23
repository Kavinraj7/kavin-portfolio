'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Copy, MessageSquare, Phone, Mail, Sparkles, Send, Terminal } from 'lucide-react';
import { soundFx } from '@/utils/audio';

interface ContactSectionProps {
  onOpenTerminal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenTerminal }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) return;

    soundFx.playConfirm();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kavinraj.dev@gmail.com');
    setCopiedEmail(true);
    soundFx.playSelect();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleLiveChat = () => {
    soundFx.playTerminal();
    onOpenTerminal?.();
  };

  return (
    <footer id="contact-section" className="relative w-full pt-12 sm:pt-16 pb-8 sm:pb-10 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#08070F] text-zinc-100 overflow-hidden border-t border-zinc-800/80">
      
      {/* Ambient Violet Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-gradient-to-tr from-purple-500/15 via-violet-600/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-[1360px] mx-auto flex flex-col gap-8">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Contact Typography & Meta Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] font-sans">
                Get in —<br />
                <span className="text-zinc-200">touch with us</span>
              </h2>

              {/* Subtitle description */}
              <p className="text-base sm:text-lg text-zinc-400 mt-4 leading-relaxed font-normal max-w-md">
                We&apos;re here to help! Whether you have a question about our systems, need assistance with your architecture, or want to discuss a new venture, our team is ready to assist you.
              </p>

              {/* Email Block */}
              <div className="mt-6 sm:mt-7 group">
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Email:
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="mt-1 flex items-center gap-2.5 text-2xl sm:text-3xl font-bold text-white hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  <span>kavinraj.dev@gmail.com</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-zinc-800 text-xs font-mono font-normal text-zinc-300">
                    {copiedEmail ? 'Copied!' : <Copy className="w-4 h-4" />}
                  </span>
                </button>
              </div>

              {/* Phone & Availability Block */}
              <div className="mt-4 sm:mt-5">
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Phone:
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  +91 98765 43210
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-0.5 font-medium">
                  Available Monday to Friday, 9 AM - 6 PM GMT
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 bg-[#13111C] rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 lg:p-9 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] border border-zinc-800/90 relative"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
              
              {/* Top Row: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* First Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs sm:text-sm font-semibold text-zinc-200">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your first name..."
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl bg-[#1A1626] border border-zinc-700/80 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/80 focus:bg-[#201B30] transition-all"
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs sm:text-sm font-semibold text-zinc-200">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name..."
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl bg-[#1A1626] border border-zinc-700/80 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/80 focus:bg-[#201B30] transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-zinc-200">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3 rounded-2xl bg-[#1A1626] border border-zinc-700/80 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/80 focus:bg-[#201B30] transition-all"
                />
              </div>

              {/* Message Textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-zinc-200">
                  How can we help you?
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-3 rounded-2xl bg-[#1A1626] border border-zinc-700/80 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/80 focus:bg-[#201B30] transition-all resize-none"
                />
              </div>

              {/* Bottom Row with Send Message Pill Button */}
              <div className="flex items-center justify-between mt-1">
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-semibold"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Message received! We will reply within 24 hours.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="ml-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group disabled:opacity-70 active:scale-95"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </motion.button>
                </div>
              </div>

            </form>
          </motion.div>

        </div>

        {/* BOTTOM ACTION ROW: Live Chat on Left + Social Logos to the Right below the form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-zinc-800/80"
        >
          {/* Live Chat Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleLiveChat}
            className="inline-flex items-center gap-3 px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group active:scale-95"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Chat</span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </motion.button>

          {/* Social Logos */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1E1A2D] border border-zinc-800 shadow-sm flex items-center justify-center text-zinc-300 hover:text-[#25D366] hover:border-[#25D366]/40 hover:scale-110 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.09-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1E1A2D] border border-zinc-800 shadow-sm flex items-center justify-center text-zinc-300 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:scale-110 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1E1A2D] border border-zinc-800 shadow-sm flex items-center justify-center text-zinc-300 hover:text-[#E4405F] hover:border-[#E4405F]/40 hover:scale-110 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1E1A2D] border border-zinc-800 shadow-sm flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/40 hover:scale-110 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* Gmail */}
            <a
              href="mailto:kavinraj.dev@gmail.com"
              aria-label="Gmail"
              title="Gmail"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1E1A2D] border border-zinc-800 shadow-sm flex items-center justify-center text-zinc-300 hover:text-[#EA4335] hover:border-[#EA4335]/40 hover:scale-110 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default ContactSection;
