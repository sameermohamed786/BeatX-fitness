'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Share2, Globe, Music, Star, Award, ShieldCheck } from 'lucide-react';
import { TRAINERS_DATA } from '@/data/mockData';
import { TrainerItem } from '@/types';
import { TiltCard } from '../ui/TiltCard';
import { MagneticButton } from '../ui/MagneticButton';

interface TrainerShowcaseProps {
  onViewAllTrainers: () => void;
  onSelectTrainer: (trainer: TrainerItem) => void;
}

export const TrainerShowcase: React.FC<TrainerShowcaseProps> = ({
  onViewAllTrainers,
  onSelectTrainer,
}) => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-[#FF7A00]"
            >
              Elite Roster
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
            >
              Meet Our <span className="text-gradient-red">Master Coaches</span>
            </motion.h2>
          </div>

          <MagneticButton onClick={onViewAllTrainers} variant="secondary" size="md">
            View All Instructors
          </MagneticButton>
        </div>

        {/* 3 Trainers 3D Tilt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {TRAINERS_DATA.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <TiltCard glowColor="red" className="h-full flex flex-col justify-between group">
                <div>
                  {/* Portrait Image */}
                  <div className="relative h-80 w-full overflow-hidden rounded-t-2xl">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-black/30" />

                    {/* Rating pill */}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-white flex items-center gap-1 border border-white/10">
                      <Star className="w-3.5 h-3.5 fill-[#FF7A00] text-[#FF7A00]" />
                      {trainer.rating}
                    </div>

                    {/* Certifications Row */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                      {trainer.certs.slice(0, 2).map((cert, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded bg-black/80 backdrop-blur-md text-white/90 border border-white/10"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FF3B30]">
                      {trainer.role}
                    </span>
                    <h3 className="text-2xl font-black text-white group-hover:text-[#FF3B30] transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                      {trainer.bio}
                    </p>

                    {/* Stats metrics */}
                    <div className="pt-3 grid grid-cols-2 gap-2 text-xs border-t border-white/5">
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase font-bold">Experience</span>
                        <span className="text-white font-extrabold">{trainer.experience}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase font-bold">Success Rate</span>
                        <span className="text-[#FF7A00] font-extrabold">{trainer.successRate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Staggered Social Links & Profile Trigger */}
                <div className="p-6 pt-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <a
                      href={trainer.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-[#FF3B30] text-white/80 hover:text-white transition-colors"
                      aria-label="Instagram profile"
                    >
                      <Share2 className="w-4 h-4" />
                    </a>
                    <a
                      href={trainer.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-[#FF3B30] text-white/80 hover:text-white transition-colors"
                      aria-label="Twitter profile"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                    <a
                      href={trainer.spotify}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-[#FF7A00] text-white/80 hover:text-white transition-colors"
                      aria-label="Spotify playlist"
                    >
                      <Music className="w-4 h-4" />
                    </a>
                  </div>

                  <button
                    onClick={() => onSelectTrainer(trainer)}
                    className="text-xs font-black uppercase text-white hover:text-[#FF3B30] transition-colors"
                  >
                    View Profile →
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
