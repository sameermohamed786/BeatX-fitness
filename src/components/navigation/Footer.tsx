'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Share2, Globe, Radio, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="relative bg-[#08080A] border-t border-white/10 pt-16 pb-12 overflow-hidden z-10">
      {/* Glow background accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF3B30]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF3B30] to-[#FF7A00] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#FF3B30]/30">
                B
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                BEAT<span className="text-[#FF3B30]">X</span> STUDIO
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              Transforming bodies and lives through rhythm-driven high-intensity athletic training, immersive lightscapes, and elite master coaching.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Join BeatX Insider Drops
              </p>
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF3B30] transition-colors"
                  />
                  <MagneticButton variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Join
                  </MagneticButton>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-xs font-bold text-[#FF3B30] bg-[#FF3B30]/10 p-2.5 rounded-xl border border-[#FF3B30]/30 max-w-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  You are officially locked into the BeatX inner circle!
                </motion.div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-extrabold uppercase tracking-widest text-white mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <button onClick={() => setActiveTab('classes')} className="hover:text-[#FF3B30] transition-colors">
                  Class Schedule
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('memberships')} className="hover:text-[#FF3B30] transition-colors">
                  Membership Plans
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('trainers')} className="hover:text-[#FF3B30] transition-colors">
                  Master Trainers
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gallery')} className="hover:text-[#FF3B30] transition-colors">
                  Transformation Stories
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-[#FF3B30] transition-colors">
                  Fitness & Science Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Special Experience */}
          <div>
            <p className="text-sm font-extrabold uppercase tracking-widest text-white mb-4">
              Labs & Tools
            </p>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <button onClick={() => setActiveTab('ai-planner')} className="hover:text-[#FF7A00] transition-colors flex items-center gap-1 font-bold text-white/80">
                  <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-ping" />
                  AI Goal Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('challenge')} className="hover:text-[#FF3B30] transition-colors flex items-center gap-1 font-bold text-white/80">
                  <span className="w-2 h-2 rounded-full bg-[#FF3B30]" />
                  30-Day Challenge
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-[#FF3B30] transition-colors">
                  Book Studio Tour
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div>
            <p className="text-sm font-extrabold uppercase tracking-widest text-white mb-4">
              Studio Flagship
            </p>
            <ul className="space-y-3 text-xs text-white/60">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF3B30] shrink-0 mt-0.5" />
                <span>450 Rhythm Blvd, Suite 100, Innovation District</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <span>+1 (800) 555-BEATX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF3B30] shrink-0" />
                <span>vip@beatxstudio.com</span>
              </li>
              <li className="pt-2 text-white/40 text-[11px]">
                Mon - Fri: 5:00 AM - 10:00 PM<br />
                Sat - Sun: 6:00 AM - 8:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Socials */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2026 BeatX Fitness Studio Inc. All Rights Reserved. Portfolio Design System.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors" aria-label="Instagram">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors" aria-label="Twitter">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors" aria-label="Youtube">
              <Radio className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
