'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, Flame, Filter, ArrowRight, User } from 'lucide-react';
import { CLASSES_DATA } from '@/data/mockData';
import { ClassItem, ClassCategory } from '@/types';
import { TiltCard } from '../ui/TiltCard';

interface ClassesScheduleViewProps {
  onBookClass: (item: ClassItem) => void;
}

export const ClassesScheduleView: React.FC<ClassesScheduleViewProps> = ({ onBookClass }) => {
  const [selectedDay, setSelectedDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'>('Mon');
  const [selectedCategory, setSelectedCategory] = useState<ClassCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const days: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const categories: ClassCategory[] = ['All', 'HIIT', 'Strength', 'Cardio', 'Yoga', 'Zumba'];

  const filteredClasses = CLASSES_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.trainer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-xs font-black uppercase tracking-widest text-[#FF3B30]">
          Live Studio Timetable
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Classes & <span className="text-gradient-red">Weekly Schedule</span>
        </h1>
        <p className="text-base text-white/70 font-medium">
          Filter by day, athletic discipline, or master trainer. Reserve your spot in real time.
        </p>
      </div>

      {/* Controls Bar: Search & Day Tabs */}
      <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Day Selector */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {days.map((day) => {
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 text-xs font-black rounded-xl transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#FF3B30] to-[#FF7A00] text-white shadow-lg shadow-[#FF3B30]/30'
                      : 'bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search class or trainer..."
              className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF3B30] transition-colors"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/5 no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-white/40 shrink-0 mr-1" />
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-white text-black font-extrabold'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <TiltCard glowColor="red" className="h-full flex flex-col justify-between group">
                <div>
                  <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                    <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-black/40" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 text-[9px] font-black uppercase rounded bg-[#FF3B30] text-white">
                        {item.category}
                      </span>
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-black/60 text-white border border-white/20">
                        {item.intensity}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-[#FF7A00]" />
                      {item.calories} kcal
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#FF7A00] font-mono font-bold">
                      <span>{item.day} • {item.time}</span>
                      <span>{item.duration}</span>
                    </div>
                    <h3 className="text-xl font-black text-white group-hover:text-[#FF3B30] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2">{item.description}</p>
                    
                    <div className="pt-2 flex items-center gap-2 text-xs text-white/80">
                      <User className="w-3.5 h-3.5 text-[#FF3B30]" />
                      <span className="font-bold">{item.trainer}</span>
                      <span className="text-white/40 text-[10px]">({item.trainerRole})</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onBookClass(item)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF3B30] to-[#FF7A00] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-[#FF3B30]/30 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Reserve Spot ({item.bookedSeats}/{item.maxCapacity})
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 glass-card rounded-2xl">
            <p className="text-white/60 text-sm">No classes found matching your current filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
