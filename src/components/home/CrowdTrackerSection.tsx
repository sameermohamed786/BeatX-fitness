'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, Flame, Zap, ShieldCheck, Activity, BarChart3, AlertCircle, ArrowUpRight } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import { StatCounter } from '../ui/StatCounter';
import { MagneticButton } from '../ui/MagneticButton';

interface TimeSlotData {
  id: string;
  timeRange: string;
  level: 'Low' | 'Moderate' | 'Peak';
  occupancyPercent: number;
  waitTimeMins: number;
  equipmentAvailPercent: number;
  recommendation: string;
}

export const CrowdTrackerSection: React.FC = () => {
  const timeSlots: TimeSlotData[] = [
    {
      id: 't1',
      timeRange: '6 AM – 8 AM',
      level: 'Peak',
      occupancyPercent: 88,
      waitTimeMins: 8,
      equipmentAvailPercent: 45,
      recommendation: 'Morning rush. High energy, prime spin bikes book fast.',
    },
    {
      id: 't2',
      timeRange: '8 AM – 11 AM',
      level: 'Low',
      occupancyPercent: 32,
      waitTimeMins: 0,
      equipmentAvailPercent: 95,
      recommendation: 'Ideal quiet window. Zero wait for heavy bags & reformer machines.',
    },
    {
      id: 't3',
      timeRange: '11 AM – 4 PM',
      level: 'Low',
      occupancyPercent: 25,
      waitTimeMins: 0,
      equipmentAvailPercent: 98,
      recommendation: 'Mid-day chill. Best time for undisturbed training sessions.',
    },
    {
      id: 't4',
      timeRange: '4 PM – 7 PM',
      level: 'Moderate',
      occupancyPercent: 62,
      waitTimeMins: 3,
      equipmentAvailPercent: 78,
      recommendation: 'Evening warm-up. Steady flow, high studio atmosphere.',
    },
    {
      id: 't5',
      timeRange: '7 PM – 10 PM',
      level: 'Peak',
      occupancyPercent: 92,
      waitTimeMins: 12,
      equipmentAvailPercent: 38,
      recommendation: 'Night party peak. Full acoustic lighting & packed rhythm classes.',
    },
  ];

  // Default selected slot is 11 AM - 4 PM (Optimal low slot)
  const [selectedSlotId, setSelectedSlotId] = useState<string>('t3');

  const selectedSlot = timeSlots.find((s) => s.id === selectedSlotId) || timeSlots[2];

  const getLevelBadgeStyle = (level: 'Low' | 'Moderate' | 'Peak') => {
    switch (level) {
      case 'Low':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Moderate':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Peak':
        return 'bg-[#FF3B30]/20 text-[#FF3B30] border-[#FF3B30]/30 animate-pulse';
    }
  };

  const getBarColor = (level: 'Low' | 'Moderate' | 'Peak') => {
    switch (level) {
      case 'Low':
        return 'bg-gradient-to-r from-emerald-500 to-teal-400';
      case 'Moderate':
        return 'bg-gradient-to-r from-amber-500 to-orange-400';
      case 'Peak':
        return 'bg-gradient-to-r from-[#FF3B30] to-[#FF7A00]';
    }
  };

  return (
    <section className="py-24 relative z-10 bg-[#0E0E10]/90 border-t border-white/10 overflow-hidden">
      {/* Background Glow Accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#FF7A00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-[#FF7A00]"
          >
            <Activity className="w-3.5 h-3.5 text-[#FF3B30]" />
            Live Telemetry Telemetry
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
          >
            Find Your Perfect <span className="text-gradient-red">Workout Time</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-white/70 font-medium max-w-2xl mx-auto"
          >
            Avoid peak hours, reduce equipment wait times, and train more efficiently with BeatX Smart Crowd Tracker.
          </motion.p>
        </div>

        {/* Dashboard Top 5 Quick Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* Metric 1: Current Occupancy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-5 rounded-2xl border border-white/10 space-y-2 text-center"
          >
            <span className="text-[10px] font-extrabold uppercase text-white/50 block tracking-wider">
              Selected Window
            </span>
            <p className="text-2xl sm:text-3xl font-black text-white font-mono">
              {selectedSlot.occupancyPercent}%
            </p>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border ${getLevelBadgeStyle(selectedSlot.level)}`}>
              {selectedSlot.level} Density
            </span>
          </motion.div>

          {/* Metric 2: Estimated Wait Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-card p-5 rounded-2xl border border-white/10 space-y-2 text-center"
          >
            <span className="text-[10px] font-extrabold uppercase text-white/50 block tracking-wider">
              Est. Wait Time
            </span>
            <p className="text-2xl sm:text-3xl font-black text-[#FF7A00] font-mono">
              {selectedSlot.waitTimeMins} <span className="text-xs font-bold text-white/60">Mins</span>
            </p>
            <p className="text-[10px] text-white/50 font-bold">
              {selectedSlot.waitTimeMins === 0 ? 'Instant Access' : 'Minor Queue'}
            </p>
          </motion.div>

          {/* Metric 3: Equipment Availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-5 rounded-2xl border border-white/10 space-y-2 text-center"
          >
            <span className="text-[10px] font-extrabold uppercase text-white/50 block tracking-wider">
              Equipment Free
            </span>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {selectedSlot.equipmentAvailPercent}%
            </p>
            <p className="text-[10px] text-white/50 font-bold">Bikes & Bags Open</p>
          </motion.div>

          {/* Metric 4: Best Time Today */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="glass-card p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-2 text-center col-span-2 sm:col-span-1"
          >
            <span className="text-[10px] font-extrabold uppercase text-emerald-400 block tracking-wider flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 fill-current" />
              Best Time Today
            </span>
            <p className="text-sm font-black text-white">11 AM – 4 PM</p>
            <p className="text-[10px] text-emerald-300 font-bold">Lowest Density (25%)</p>
          </motion.div>

          {/* Metric 5: Peak Hours Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card p-5 rounded-2xl border border-[#FF3B30]/30 bg-[#FF3B30]/5 space-y-2 text-center col-span-2 sm:col-span-1"
          >
            <span className="text-[10px] font-extrabold uppercase text-[#FF3B30] block tracking-wider flex items-center justify-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Peak Windows
            </span>
            <p className="text-xs font-black text-white">6-8 AM & 7-10 PM</p>
            <p className="text-[10px] text-white/50 font-bold">Book classes ahead</p>
          </motion.div>
        </div>

        {/* Dashboard Main Visualizer & Timeline Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Hourly Timeline Bars */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white uppercase flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#FF3B30]" />
                Today's Density Timeline
              </h3>
              <span className="text-xs text-white/50 font-bold">Tap slot to inspect</span>
            </div>

            <div className="space-y-3">
              {timeSlots.map((slot, idx) => {
                const isSelected = selectedSlotId === slot.id;
                return (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`glass-card p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-glow-red bg-[#18181D] scale-[1.02] shadow-xl'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Clock className={`w-4 h-4 ${isSelected ? 'text-[#FF3B30]' : 'text-white/40'}`} />
                        <span className="text-sm font-black text-white">{slot.timeRange}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-white/70">
                          {slot.occupancyPercent}% Occupancy
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${getLevelBadgeStyle(slot.level)}`}>
                          {slot.level}
                        </span>
                      </div>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${slot.occupancyPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + idx * 0.05 }}
                        className={`h-full rounded-full ${getBarColor(slot.level)}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Live Inspector Card */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSlot.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <TiltCard glowColor="orange" className="p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-white/50 tracking-widest block">
                        Inspecting Time Slot
                      </span>
                      <h4 className="text-2xl font-black text-white">{selectedSlot.timeRange}</h4>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${getLevelBadgeStyle(selectedSlot.level)}`}>
                      {selectedSlot.level} Crowd
                    </span>
                  </div>

                  {/* Recommendation Quote */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#FF7A00] block">BeatX AI Coach Tip</span>
                    <p className="text-xs text-white/90 font-medium leading-relaxed">
                      "{selectedSlot.recommendation}"
                    </p>
                  </div>

                  {/* Meter Breakdown */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-white/70">Studio Capacity Load</span>
                        <span className="text-white font-mono">{selectedSlot.occupancyPercent}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div className={`h-full ${getBarColor(selectedSlot.level)}`} style={{ width: `${selectedSlot.occupancyPercent}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-white/70">Equipment Free Rate</span>
                        <span className="text-emerald-400 font-mono">{selectedSlot.equipmentAvailPercent}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-emerald-400" style={{ width: `${selectedSlot.equipmentAvailPercent}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                    <span>Est. Queue: <strong className="text-white font-bold">{selectedSlot.waitTimeMins} Mins</strong></span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Telemetry Verified
                    </span>
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
