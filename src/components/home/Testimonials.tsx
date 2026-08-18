'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Victoria Vance',
      role: 'Tech Executive & Marathon Runner',
      quote:
        'BeatX is hands down the most captivating workout space I have ever experienced in London or NYC. The rhythm spin tracks push you into a flow state where 45 minutes pass in a heartbeat.',
      rating: 5,
      avatar: '/images/trainer_alex.jpg',
      discipline: 'Rhythm Cycle & Reformer',
    },
    {
      name: 'Jason Thorne',
      role: 'Creative Director',
      quote:
        'The Boxing HIIT sessions with Coach Marcus are brutal in the best possible way. The lights, sub-bass, and kinetic telemetry make it feel like an athletic video game.',
      rating: 5,
      avatar: '/images/trainer_marcus.jpg',
      discipline: 'Beat Boxing HIIT',
    },
    {
      name: 'Claire & Amanda',
      role: 'Architectural Designers',
      quote:
        'The Infrared Yoga and Sculpt Reformer classes have changed our posture and mobility completely. High-end luxury equipment and extremely warm staff.',
      rating: 5,
      avatar: '/images/hero.jpg',
      discipline: 'Infrared Yoga & Recovery',
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[currentIndex];

  return (
    <section className="py-24 relative z-10 bg-[#0E0E10]/90 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-[#FF7A00]">
            Member Reviews
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            What Our <span className="text-gradient-red">Community Says</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="mt-16 max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 sm:p-12 rounded-3xl border border-white/15 text-center space-y-6 shadow-2xl relative"
            >
              <Quote className="w-12 h-12 text-[#FF3B30] opacity-40 mx-auto" />

              <p className="text-lg sm:text-2xl font-medium text-white/90 leading-relaxed max-w-2xl mx-auto italic">
                "{t.quote}"
              </p>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 text-[#FF7A00]">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Author */}
              <div>
                <h4 className="text-xl font-black text-white uppercase">{t.name}</h4>
                <p className="text-xs text-white/50">{t.role} • <span className="text-[#FF3B30] font-bold">{t.discipline}</span></p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 hover:bg-[#FF3B30] text-white transition-colors border border-white/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-[#FF3B30]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 hover:bg-[#FF3B30] text-white transition-colors border border-white/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
