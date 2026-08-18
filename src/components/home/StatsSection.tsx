'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StatCounter } from '../ui/StatCounter';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-20 relative z-10 bg-[#0E0E10]/80 border-y border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StatCounter
            value={15480}
            suffix=" kcal"
            label="Daily Caloric Burn"
            description="Tracked live across all studio arenas"
          />
          <StatCounter
            value={99}
            suffix=".4%"
            label="Satisfaction Rate"
            description="Verified 30-day member completion data"
          />
          <StatCounter
            value={45}
            suffix="+"
            label="Weekly Rhythm Sessions"
            description="Cycle, Boxing, HIIT, Reformer & Yoga"
          />
          <StatCounter
            value={12}
            prefix=""
            suffix=""
            label="Master Coaches"
            description="Pro athletes & movement specialists"
          />
        </div>
      </div>
    </section>
  );
};
