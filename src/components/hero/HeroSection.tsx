'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Trophy, Play, Sparkles } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

interface HeroSectionProps {
  onBookClick: () => void;
  onExploreMemberships: () => void;
  onExploreClasses: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookClick,
  onExploreMemberships,
  onExploreClasses,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30; // parallax offset range
      const y = (e.clientY / innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const headlineWords = ['Transform', 'Your', 'Body.', 'Transform', 'Your', 'Life.'];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Cinematic Hero Image Background with Blur-to-Sharp & Parallax */}
      <motion.div
        initial={{ scale: 1.15, filter: 'blur(20px)', opacity: 0 }}
        animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transform: `translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 0)`,
        }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <Image
          src="/images/hero.jpg"
          alt="BeatX Studio Hero Background"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-center filter saturate-120 brightness-75"
        />
        {/* Dark Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-transparent to-[#0B0B0B]/80" />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Staggered Word Reveal & Actions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[#FF3B30]/40 text-xs font-black uppercase tracking-widest text-[#FF3B30] shadow-lg shadow-[#FF3B30]/20"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF3B30] animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
            #1 Rated Rhythm Fitness Studio in 2026
          </motion.div>

          {/* Staggered Word-by-Word Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.05]">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block mr-3 ${
                  word.includes('Body') || word.includes('Life')
                    ? 'text-gradient-red'
                    : ''
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-base sm:text-lg text-white/80 max-w-xl font-medium leading-relaxed"
          >
            High-intensity rhythm spin, technical heavy bag boxing, and sculpt reformer classes. Powered by surround sound sub-woofers and immersive light technology.
          </motion.p>

          {/* CTA Button Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <MagneticButton
              onClick={onBookClick}
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Book Free Trial
            </MagneticButton>

            <MagneticButton
              onClick={onExploreMemberships}
              variant="outline"
              size="lg"
            >
              Explore Memberships
            </MagneticButton>

            <button
              onClick={onExploreClasses}
              className="px-5 py-4 text-xs font-extrabold uppercase tracking-widest text-white/70 hover:text-white flex items-center gap-2 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FF3B30]">
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
              Watch Studio Teaser
            </button>
          </motion.div>

          {/* Social Proof Avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-white/10"
          >
            <div className="flex -space-x-3">
              <div className="w-9 h-9 rounded-full border-2 border-[#0B0B0B] bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-xs font-black text-white">
                SV
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-[#0B0B0B] bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center text-xs font-black text-white">
                MS
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-[#0B0B0B] bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-black text-white">
                ER
              </div>
            </div>
            <div className="text-left text-xs">
              <div className="flex items-center gap-1 text-[#FF7A00] font-black">
                ★★★★★ <span className="text-white font-bold ml-1">4.98 / 5.0</span>
              </div>
              <p className="text-white/60">Over 15,000+ rhythm workouts completed</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Floating Parallax Metric Cards */}
        <div className="lg:col-span-5 relative hidden lg:block h-[500px]">
          {/* Card 1: Live Calorie Pulse Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0)`,
            }}
            className="absolute top-10 right-4 w-72 glass-card p-5 rounded-2xl border-glow-red shadow-2xl z-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FF3B30]/20 flex items-center justify-center text-[#FF3B30] border border-[#FF3B30]/40">
                <Flame className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                  Daily Caloric Burn
                </p>
                <p className="text-2xl font-black text-white font-mono">15,480 kcal</p>
              </div>
            </div>
            <div className="mt-3 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-[#FF3B30] to-[#FF7A00] h-full w-[88%]" />
            </div>
          </motion.div>

          {/* Card 2: Trainer Live Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            style={{
              transform: `translate3d(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px, 0)`,
            }}
            className="absolute bottom-12 left-0 w-80 glass-card p-4 rounded-2xl border-glow-orange shadow-2xl z-30 flex items-center gap-4"
          >
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/20">
              <Image
                src="/images/trainer_alex.jpg"
                alt="Alex Vance"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-[#FF7A00] text-white">
                LIVE NOW
              </span>
              <h4 className="text-sm font-extrabold text-white mt-1">Rhythm Cycle 45</h4>
              <p className="text-xs text-white/60">Coach Alex Vance • Studio A</p>
            </div>
          </motion.div>

          {/* Card 3: Satisfaction Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
            }}
            className="absolute top-1/2 left-1/3 w-52 glass-card p-4 rounded-2xl border border-white/15 shadow-xl z-10"
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#FFD600]" />
              <span className="text-xs font-black text-white uppercase">99.4% Success</span>
            </div>
            <p className="text-[11px] text-white/60 mt-1">Verified member progress rate after 30 days.</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
