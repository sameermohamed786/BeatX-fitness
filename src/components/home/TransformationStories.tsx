'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, ArrowRight } from 'lucide-react';
import { TRANSFORMATION_STORIES } from '@/data/mockData';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { MagneticButton } from '../ui/MagneticButton';

interface TransformationStoriesProps {
  onViewAllTransformations: () => void;
}

export const TransformationStories: React.FC<TransformationStoriesProps> = ({
  onViewAllTransformations,
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const story = TRANSFORMATION_STORIES[activeStoryIndex];

  return (
    <section className="py-24 relative z-10 bg-[#0E0E10]/90 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-xs font-black uppercase tracking-widest text-[#FF3B30]"
          >
            Real Member Results
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
          >
            Proven Athletic <span className="text-gradient-red">Transformations</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-white/70 font-medium"
          >
            Drag the interactive slider below to reveal before and after physical conditioning.
          </motion.p>
        </div>

        {/* Interactive Before/After Showcase */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Slider Column */}
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              beforeImage={story.beforeImg}
              afterImage={story.afterImg}
              metrics={{
                weight: story.weightLost,
                muscle: story.muscleGained,
                time: story.timeFrame,
              }}
            />
          </div>

          {/* Testimonial & Data Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Story Switcher Tabs */}
            <div className="flex items-center gap-2">
              {TRANSFORMATION_STORIES.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveStoryIndex(idx)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    activeStoryIndex === idx
                      ? 'bg-[#FF3B30] text-white shadow-lg shadow-[#FF3B30]/30'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Testimonial Quote */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <Quote className="w-8 h-8 text-[#FF3B30] opacity-60" />
              <p className="text-sm text-white/90 font-medium leading-relaxed italic">
                "{story.quote}"
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-black text-white text-base">{story.name}, {story.age}</h4>
                  <p className="text-white/50">{story.goal}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-white/40 block">Coached By</span>
                  <span className="font-extrabold text-[#FF7A00]">{story.trainer}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <MagneticButton onClick={onViewAllTransformations} variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                View Full Gallery & Case Studies
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
