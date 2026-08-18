'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Award, Share2, Globe, Music, X, Calendar, CheckCircle2 } from 'lucide-react';
import { TRAINERS_DATA } from '@/data/mockData';
import { TrainerItem } from '@/types';
import { TiltCard } from '../ui/TiltCard';
import { MagneticButton } from '../ui/MagneticButton';

interface TrainersViewProps {
  onBookTrainerClass: (trainerName: string) => void;
}

export const TrainersView: React.FC<TrainersViewProps> = ({ onBookTrainerClass }) => {
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerItem | null>(null);

  return (
    <div className="pt-28 pb-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-xs font-black uppercase tracking-widest text-[#FF3B30]">
          World-Class Faculty
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Master <span className="text-gradient-red">Coaches & Instructors</span>
        </h1>
        <p className="text-base text-white/70 font-medium">
          Former Olympic athletes, professional fight coaches, and movement specialists dedicated to your physical breakthroughs.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TRAINERS_DATA.map((trainer, index) => (
          <motion.div
            key={trainer.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TiltCard glowColor="red" className="h-full flex flex-col justify-between group">
              <div>
                <div className="relative h-96 w-full overflow-hidden rounded-t-2xl">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-black/30" />

                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-white flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#FF7A00] text-[#FF7A00]" />
                    {trainer.rating}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF3B30]">
                    {trainer.role}
                  </span>
                  <h3 className="text-2xl font-black text-white group-hover:text-[#FF3B30] transition-colors">
                    {trainer.name}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">{trainer.bio}</p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {trainer.certs.map((cert, cIdx) => (
                      <span key={cIdx} className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-white/10 text-white/80">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <MagneticButton
                  onClick={() => setSelectedTrainer(trainer)}
                  variant="secondary"
                  size="md"
                  className="w-full"
                >
                  View Full Bio & Certifications
                </MagneticButton>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Trainer Bio Modal */}
      <AnimatePresence>
        {selectedTrainer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrainer(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl glass-card border border-white/20 p-6 sm:p-8 bg-[#141416]/95 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setSelectedTrainer(null)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white rounded-full bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-[#FF3B30]">
                  <Image src={selectedTrainer.image} alt={selectedTrainer.name} fill sizes="128px" className="object-cover" />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-black uppercase text-[#FF3B30] tracking-widest">{selectedTrainer.role}</span>
                  <h2 className="text-3xl font-black text-white">{selectedTrainer.name}</h2>
                  <p className="text-xs text-[#FF7A00] font-bold">{selectedTrainer.specialization}</p>
                </div>
              </div>

              <div className="text-xs text-white/80 space-y-3 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                <h4 className="font-extrabold text-white uppercase tracking-wider text-xs">Full Coaching Philosophy</h4>
                <p>{selectedTrainer.bio}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="glass-card p-3 rounded-xl">
                  <span className="block text-white/40 font-bold uppercase text-[9px]">Classes Taught</span>
                  <span className="text-lg font-black text-white">{selectedTrainer.totalClasses}</span>
                </div>
                <div className="glass-card p-3 rounded-xl">
                  <span className="block text-white/40 font-bold uppercase text-[9px]">Member Rating</span>
                  <span className="text-lg font-black text-[#FF7A00]">{selectedTrainer.rating} / 5.0</span>
                </div>
                <div className="glass-card p-3 rounded-xl">
                  <span className="block text-white/40 font-bold uppercase text-[9px]">Success Rate</span>
                  <span className="text-lg font-black text-[#FF3B30]">{selectedTrainer.successRate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <a href={selectedTrainer.instagram} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 text-white hover:bg-[#FF3B30]" aria-label="Instagram">
                    <Share2 className="w-4 h-4" />
                  </a>
                  <a href={selectedTrainer.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 text-white hover:bg-[#FF3B30]" aria-label="Twitter">
                    <Globe className="w-4 h-4" />
                  </a>
                  <a href={selectedTrainer.spotify} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 text-white hover:bg-[#FF7A00]" aria-label="Spotify">
                    <Music className="w-4 h-4" />
                  </a>
                </div>

                <MagneticButton
                  onClick={() => {
                    const name = selectedTrainer.name;
                    setSelectedTrainer(null);
                    onBookTrainerClass(name);
                  }}
                  variant="primary"
                  size="md"
                >
                  Book Class with {selectedTrainer.name.split(' ')[0]}
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
