'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, Sparkles, ShieldCheck, Cpu } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';

export const WhyChooseBeatX: React.FC = () => {
  const pillars = [
    {
      icon: <Volume2 className="w-7 h-7 text-[#FF3B30]" />,
      title: 'Bass-Driven Acoustic Engineering',
      description:
        'Custom 128-140 BPM acoustic soundtracks engineered specifically to decrease perceived exertion and trigger maximum adrenaline flow.',
      glowColor: 'red' as const,
    },
    {
      icon: <Sparkles className="w-7 h-7 text-[#FF7A00]" />,
      title: 'Immersive Lightscapes',
      description:
        'Synchronized laser arrays and warm far-infrared ambiance designed to remove distraction and place you into pure flow state.',
      glowColor: 'orange' as const,
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#FF3B30]" />,
      title: 'Master-Level Athletic Coaching',
      description:
        'Every class is programmed and coached by elite Olympic-level movement specialists, sports scientists, and rhythm choreographers.',
      glowColor: 'red' as const,
    },
    {
      icon: <Cpu className="w-7 h-7 text-white" />,
      title: 'AI Kinetic Analytics & Tracking',
      description:
        'Real-time heart rate telemetry, power output RPM metrics, and post-session biometric summaries delivered directly to your app.',
      glowColor: 'white' as const,
    },
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-[#FF7A00]"
          >
            The BeatX Advantage
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
          >
            Why We Are <span className="text-gradient-red">Redefining Fitness</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-white/70 font-medium"
          >
            We combine high-intensity physical conditioning with sensory audio-visual immersion to create workouts you look forward to every single day.
          </motion.p>
        </div>

        {/* 4 Pillars Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            >
              <TiltCard glowColor={pillar.glowColor} className="h-full p-8 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-extrabold text-white leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-xs text-white/60 leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-bold text-white/40 uppercase tracking-widest">
                  <span>Pillar 0{index + 1}</span>
                  <span className="text-[#FF3B30]">BeatX Engine</span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
