'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, ShieldAlert } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '@/data/mockData';
import { TiltCard } from '../ui/TiltCard';
import { MagneticButton } from '../ui/MagneticButton';

interface MembershipPreviewProps {
  onSelectPlan: (planId: string) => void;
}

export const MembershipPreview: React.FC<MembershipPreviewProps> = ({ onSelectPlan }) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-24 relative z-10 bg-[#0E0E10]/90 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-xs font-black uppercase tracking-widest text-[#FF7A00]"
          >
            Transparent Tiering
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
          >
            Choose Your <span className="text-gradient-red">Membership Tier</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-white/70 font-medium"
          >
            No hidden lock-ins. Flexible studio access, full mobile application telematics, and VIP community privileges.
          </motion.p>

          {/* Monthly / Yearly Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-bold ${!isYearly ? 'text-white' : 'text-white/50'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-8 rounded-full bg-white/10 p-1 transition-colors border border-white/20"
            >
              <motion.div
                animate={{ x: isYearly ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF3B30] to-[#FF7A00] shadow-md"
              />
            </button>
            <span className={`text-xs font-bold flex items-center gap-1.5 ${isYearly ? 'text-white' : 'text-white/50'}`}>
              Yearly Billing
              <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded-full bg-[#FF3B30] text-white animate-pulse">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 items-stretch">
          {MEMBERSHIP_PLANS.map((plan, index) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex"
              >
                <TiltCard
                  glowColor={plan.glowColor}
                  className={`w-full p-8 flex flex-col justify-between ${
                    isPopular ? 'border-glow-red bg-[#18181C]' : 'border-white/10'
                  }`}
                >
                  <div>
                    {/* Badge */}
                    {plan.badge && (
                      <div className="inline-block px-3 py-1 text-[10px] font-black uppercase rounded-full bg-gradient-to-r from-[#FF3B30] to-[#FF7A00] text-white shadow-lg mb-4">
                        {plan.badge}
                      </div>
                    )}

                    <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                    <p className="text-xs text-white/60 mt-1 h-10">{plan.tagline}</p>

                    {/* Price display */}
                    <div className="my-6 flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-white font-mono">${price}</span>
                      <span className="text-xs text-white/50 font-bold uppercase tracking-wider">
                        / month {isYearly && '(billed annually)'}
                      </span>
                    </div>

                    {/* Feature list */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <p className="text-[11px] font-extrabold uppercase tracking-widest text-white/50">
                        Included Privileges:
                      </p>
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-white/90">
                          <Check className="w-4 h-4 text-[#FF3B30] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div className="pt-8 mt-6 border-t border-white/10">
                    <MagneticButton
                      onClick={() => onSelectPlan(plan.id)}
                      variant={isPopular ? 'primary' : 'outline'}
                      size="md"
                      className="w-full"
                    >
                      {plan.ctaText}
                    </MagneticButton>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
