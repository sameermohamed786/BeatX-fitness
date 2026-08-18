'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What makes BeatX rhythm workouts different from standard gym classes?',
      answer:
        'BeatX classes take place in dark, acoustically-engineered studio vaults with nightclub-grade subwoofers and intelligent laser lighting. Every movement pattern is synchronized to 128-140 BPM soundscapes, allowing you to train harder with reduced perceived fatigue.',
    },
    {
      question: 'I am a beginner. Can I join high-intensity Beat Boxing or Rhythm Cycle?',
      answer:
        'Absolutely! Every bike and boxing bag station features adjustable resistance and kinetic output telemetry. You set your own pace while feeding off the high energy of the room.',
    },
    {
      question: 'What is included in the 7-Day Free Trial?',
      answer:
        'Your free trial includes 2 complimentary studio classes of your choice, full access to our mobile app, biometric calorie telemetry, and a 1-on-1 consultation with an elite master coach.',
    },
    {
      question: 'Do I need specialized clip-in shoes or boxing wraps?',
      answer:
        'We provide complimentary specialized SPD-SL clip-in cycle shoes and premium sanitised boxing wraps for every class visit.',
    },
    {
      question: 'Can I freeze or cancel my membership anytime?',
      answer:
        'Yes! All BeatX memberships feature month-to-month flexibility. You can pause or cancel your subscription directly in the mobile app with zero hidden penalties.',
    },
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-xs font-black uppercase tracking-widest text-[#FF3B30]">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Frequently Asked <span className="text-gradient-red">Questions</span>
          </h2>
        </div>

        {/* Accordion list */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-black text-white flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#FF3B30] shrink-0" />
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full bg-white/5 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#FF3B30] text-white' : 'text-white/60'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
