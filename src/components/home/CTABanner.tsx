'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

interface CTABannerProps {
  onBookClick: () => void;
}

export const CTABanner: React.FC<CTABannerProps> = ({ onBookClick }) => {
  return (
    <section className="py-20 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-16 text-center bg-gradient-to-r from-[#FF3B30] via-[#FF7A00] to-[#FF3B30] shadow-2xl shadow-[#FF3B30]/40">
          {/* Animated Light Beam Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest border border-white/20">
              <Sparkles className="w-4 h-4 text-[#FFD600]" />
              Limited Complimentary Pass Availability
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              Ready To Claim Your First <br className="hidden sm:block" />
              <span className="text-black drop-shadow-md">Rhythm Workout?</span>
            </h2>

            <p className="text-base sm:text-lg text-white/90 font-medium">
              Join BeatX today. Experience 7 days of unlimited studio classes, biometric tracking, and master coaching with zero commitment.
            </p>

            <div className="pt-4 flex justify-center">
              <MagneticButton
                onClick={onBookClick}
                variant="secondary"
                size="lg"
                className="bg-black text-white hover:bg-black/80 shadow-2xl border border-white/20"
                icon={<ArrowRight className="w-5 h-5 text-[#FF3B30]" />}
              >
                Claim Free 7-Day Studio Pass
              </MagneticButton>
            </div>

            <p className="text-xs text-white/70 font-semibold">
              Instant digital access • No credit card required to start
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
