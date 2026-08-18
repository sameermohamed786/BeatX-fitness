'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TRANSFORMATION_STORIES } from '@/data/mockData';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { Quote } from 'lucide-react';

export const TransformationGalleryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Fat Loss', 'Muscle Gain', 'Recomp'];

  const filteredStories =
    selectedCategory === 'All'
      ? TRANSFORMATION_STORIES
      : TRANSFORMATION_STORIES.filter((s) => s.category === selectedCategory);

  return (
    <div className="pt-28 pb-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-xs font-black uppercase tracking-widest text-[#FF3B30]">
          Verified Physical Proof
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Transformation <span className="text-gradient-red">Case Gallery</span>
        </h1>
        <p className="text-base text-white/70 font-medium">
          Drag the handles below to reveal real body re-composition progress achieved at BeatX Studio.
        </p>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#FF3B30] to-[#FF7A00] text-white shadow-lg shadow-[#FF3B30]/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {filteredStories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-3xl border border-white/10 space-y-4"
          >
            <BeforeAfterSlider
              beforeImage={story.beforeImg}
              afterImage={story.afterImg}
              metrics={{
                weight: story.weightLost,
                muscle: story.muscleGained,
                time: story.timeFrame,
              }}
            />

            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <h3 className="text-lg font-black text-white">{story.name}, {story.age}</h3>
                <span className="px-2.5 py-0.5 rounded bg-[#FF3B30]/20 text-[#FF3B30] font-black uppercase text-[10px]">
                  {story.category}
                </span>
              </div>
              <p className="text-xs text-white/70 italic leading-relaxed">
                "{story.quote}"
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/50 font-medium">
                <span>Goal: <strong className="text-white">{story.goal}</strong></span>
                <span>Coach: <strong className="text-[#FF7A00]">{story.trainer}</strong></span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
