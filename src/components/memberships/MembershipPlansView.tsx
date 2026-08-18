'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, ShieldCheck } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '@/data/mockData';
import { TiltCard } from '../ui/TiltCard';
import { MagneticButton } from '../ui/MagneticButton';

interface MembershipPlansViewProps {
  onSelectPlan: (planId: string) => void;
}

export const MembershipPlansView: React.FC<MembershipPlansViewProps> = ({ onSelectPlan }) => {
  const [isYearly, setIsYearly] = useState(false);

  const comparisonRows = [
    { feature: 'Monthly Class Allowance', starter: '8 Classes', pro: 'Unlimited', elite: 'Unlimited + Priority' },
    { feature: 'Booking Advance Window', starter: '3 Days', pro: '7 Days', elite: '14 Days + Reserved Spot' },
    { feature: 'AI Goal Planner Access', starter: 'Basic', pro: 'Full Protocol', elite: 'Full + 1-on-1 Trainer Review' },
    { feature: '30-Day Challenge Access', starter: false, pro: true, elite: true },
    { feature: 'Guest Passes Included', starter: '1 / Month', pro: '4 / Month', elite: 'Unlimited (1 per visit)' },
    { feature: 'Personal Training Session', starter: false, pro: false, elite: '1 Monthly Session' },
    { feature: 'Permanent Locker & Laundry', starter: false, pro: false, elite: true },
    { feature: 'Apparel & Supplement Discount', starter: 'None', pro: '15% Off', elite: '25% Off' },
  ];

  return (
    <div className="pt-28 pb-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-xs font-black uppercase tracking-widest text-[#FF7A00]">
          Unlimited Rhythm Access
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Membership <span className="text-gradient-red">Plans & Pricing</span>
        </h1>
        <p className="text-base text-white/70 font-medium">
          Invest in your physical evolution. Choose the tier that matches your athletic goals.
        </p>

        {/* Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-bold ${!isYearly ? 'text-white' : 'text-white/50'}`}>Monthly Billing</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-8 rounded-full bg-white/10 p-1 transition-colors border border-white/20"
          >
            <motion.div
              animate={{ x: isYearly ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF3B30] to-[#FF7A00]"
            />
          </button>
          <span className={`text-xs font-bold flex items-center gap-1.5 ${isYearly ? 'text-white' : 'text-white/50'}`}>
            Yearly Billing <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-[#FF3B30] text-white">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {MEMBERSHIP_PLANS.map((plan, index) => {
          const price = isYearly ? plan.priceYearly : plan.priceMonthly;
          const isPopular = plan.popular;

          return (
            <TiltCard key={plan.id} glowColor={plan.glowColor} className="p-8 flex flex-col justify-between h-full">
              <div>
                {plan.badge && (
                  <span className="inline-block px-3 py-1 text-[10px] font-black uppercase rounded-full bg-gradient-to-r from-[#FF3B30] to-[#FF7A00] text-white mb-4">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                <p className="text-xs text-white/60 mt-1">{plan.tagline}</p>
                <div className="my-6 flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white font-mono">${price}</span>
                  <span className="text-xs text-white/50 font-bold">/ month</span>
                </div>
                <div className="space-y-3 pt-4 border-t border-white/10">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-white/90">
                      <Check className="w-4 h-4 text-[#FF3B30] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8">
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
          );
        })}
      </div>

      {/* Detailed Feature Comparison Table */}
      <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
        <h3 className="text-2xl font-black text-white uppercase text-center">Feature Matrix Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white/80">
            <thead>
              <tr className="border-b border-white/10 text-white font-black uppercase text-sm">
                <th className="py-4 px-4">Feature Privilege</th>
                <th className="py-4 px-4 text-center">Starter Flex</th>
                <th className="py-4 px-4 text-center text-[#FF3B30]">BeatX Pro</th>
                <th className="py-4 px-4 text-center text-[#FF7A00]">Elite VIP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-white">{row.feature}</td>
                  <td className="py-4 px-4 text-center">
                    {typeof row.starter === 'boolean' ? (
                      row.starter ? <Check className="w-4 h-4 text-green-400 mx-auto" /> : <X className="w-4 h-4 text-white/20 mx-auto" />
                    ) : (
                      row.starter
                    )}
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-white">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? <Check className="w-4 h-4 text-[#FF3B30] mx-auto" /> : <X className="w-4 h-4 text-white/20 mx-auto" />
                    ) : (
                      row.pro
                    )}
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-[#FF7A00]">
                    {typeof row.elite === 'boolean' ? (
                      row.elite ? <Check className="w-4 h-4 text-[#FF7A00] mx-auto" /> : <X className="w-4 h-4 text-white/20 mx-auto" />
                    ) : (
                      row.elite
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
