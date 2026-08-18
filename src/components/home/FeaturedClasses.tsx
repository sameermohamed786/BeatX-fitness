'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Flame, Clock, Calendar, ArrowRight, User } from 'lucide-react';
import { CLASSES_DATA } from '@/data/mockData';
import { ClassItem, ClassCategory } from '@/types';
import { TiltCard } from '../ui/TiltCard';
import { MagneticButton } from '../ui/MagneticButton';

interface FeaturedClassesProps {
  onBookClass: (item: ClassItem) => void;
  onViewAllClasses: () => void;
}

export const FeaturedClasses: React.FC<FeaturedClassesProps> = ({
  onBookClass,
  onViewAllClasses,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ClassCategory>('All');

  const categories: ClassCategory[] = ['All', 'HIIT', 'Strength', 'Cardio', 'Yoga', 'Zumba'];

  const filteredClasses =
    selectedCategory === 'All'
      ? CLASSES_DATA
      : CLASSES_DATA.filter((item) => item.category === selectedCategory);

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
              className="px-3.5 py-1 rounded-full bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-xs font-black uppercase tracking-widest text-[#FF3B30]"
            >
              High-Energy Programming
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
            >
              Featured <span className="text-gradient-red">Studio Classes</span>
            </motion.h2>
          </div>

          <MagneticButton onClick={onViewAllClasses} variant="secondary" size="md">
            View Full Schedule Grid
          </MagneticButton>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mt-8 no-scrollbar">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#FF3B30] to-[#FF7A00] text-white shadow-lg shadow-[#FF3B30]/30 scale-105'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Classes Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredClasses.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <TiltCard glowColor="red" className="h-full flex flex-col justify-between group">
                <div>
                  {/* Class Image Preview */}
                  <div className="relative h-52 w-full overflow-hidden rounded-t-2xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-black/30" />
                    
                    {/* Intensity & Category Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-3 py-1 text-[10px] font-black uppercase rounded-full bg-[#FF3B30] text-white shadow-md">
                        {item.category}
                      </span>
                      <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-full bg-black/60 backdrop-blur-md text-white/90 border border-white/20">
                        {item.intensity}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 border border-white/10">
                      <Flame className="w-3.5 h-3.5 text-[#FF7A00]" />
                      {item.calories} kcal
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-black text-white group-hover:text-[#FF3B30] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Trainer & Session Meta */}
                    <div className="pt-2 flex items-center justify-between text-xs text-white/70">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden relative border border-white/20">
                          <Image
                            src={item.trainerAvatar}
                            alt={item.trainer}
                            fill
                            sizes="24px"
                            className="object-cover"
                          />
                        </div>
                        <span className="font-bold text-white">{item.trainer}</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-white/60">
                        <Clock className="w-3.5 h-3.5 text-[#FF7A00]" />
                        {item.duration}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onBookClass(item)}
                    className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#FF3B30] hover:border-[#FF3B30] text-white text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#FF3B30]/30"
                  >
                    Reserve Spot ({item.bookedSeats}/{item.maxCapacity})
                    <ArrowRight className="w-4 h-4" />
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
