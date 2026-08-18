'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

interface FitnessChallengePreviewProps {
  onJoinChallenge: () => void;
}

export const FitnessChallengePreview: React.FC<FitnessChallengePreviewProps> = ({
  onJoinChallenge,
}) => {
  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl glass-card border border-glow-red p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-[#141418] via-[#1A1A22] to-[#141418]">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF3B30]/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF3B30] text-white text-xs font-black uppercase tracking-widest">
                <Trophy className="w-3.5 h-3.5" />
                Gamified Studio Program
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                The BeatX <span className="text-gradient-fire">30-Day Challenge</span>
              </h2>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
                Unlock daily streak multipliers, earn physical achievement badges, and log verified studio workouts for your chance to win a free 6-month VIP membership!
              </p>

              {/* Checklist Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-bold text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF3B30]" />
                  <span>30 Daily Guided Studio Tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7A00]" />
                  <span>Streak Counter & Milestone Badges</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7A00]" />
                  <span>Personal Trainer Accountability</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF3B30]" />
                  <span>Exclusive BeatX Apparel Drops</span>
                </div>
              </div>

              <div className="pt-4">
                <MagneticButton onClick={onJoinChallenge} variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Enter Challenge Portal Now
                </MagneticButton>
              </div>
            </div>

            {/* Right Card Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm glass-card p-6 rounded-2xl border border-white/20 bg-black/60 shadow-2xl space-y-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF3B30] to-[#FF7A00] mx-auto flex items-center justify-center text-white shadow-xl shadow-[#FF3B30]/40">
                  <Flame className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00]">
                    STREAK STATUS
                  </span>
                  <h3 className="text-3xl font-black text-white font-mono mt-1">7 DAYS ACTIVE</h3>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#FF3B30] to-[#FF7A00] h-full w-[23%]" />
                </div>
                <div className="flex items-center justify-around text-xs pt-2 text-white/70 border-t border-white/10">
                  <div>
                    <span className="block font-black text-white text-base">950</span>
                    <span className="text-[9px] uppercase font-bold text-white/40">Total Points</span>
                  </div>
                  <div>
                    <span className="block font-black text-[#FF3B30] text-base">3 / 8</span>
                    <span className="text-[9px] uppercase font-bold text-white/40">Badges</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
