'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import confetti from 'canvas-confetti';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredClass: 'Rhythm Cycle 45',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF3B30', '#FF7A00', '#FFFFFF'],
      });
    }, 1200);
  };

  return (
    <div className="pt-28 pb-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-xs font-black uppercase tracking-widest text-[#FF3B30]">
          Connect & Book
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Join <span className="text-gradient-red">BeatX Studio</span>
        </h1>
        <p className="text-base text-white/70 font-medium">
          Fill out the form below to claim your complimentary 7-Day Studio Pass or contact our concierge team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-black text-white uppercase">Claim Free Pass / Send Query</h3>

                {/* Full Name Input */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-white/80">Full Name *</label>
                  <motion.div animate={errors.fullName ? { x: [-8, 8, -6, 6, 0] } : {}}>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Connor"
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-xs text-white placeholder-white/40 focus:outline-none transition-all ${
                        errors.fullName ? 'border-[#FF3B30] bg-[#FF3B30]/10' : 'border-white/10 focus:border-[#FF3B30] focus:shadow-[0_0_15px_rgba(255,59,48,0.3)]'
                      }`}
                    />
                  </motion.div>
                  {errors.fullName && <p className="text-[10px] text-[#FF3B30] font-bold flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-white/80">Email Address *</label>
                    <motion.div animate={errors.email ? { x: [-8, 8, -6, 6, 0] } : {}}>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sarah@example.com"
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-xs text-white placeholder-white/40 focus:outline-none transition-all ${
                          errors.email ? 'border-[#FF3B30] bg-[#FF3B30]/10' : 'border-white/10 focus:border-[#FF3B30] focus:shadow-[0_0_15px_rgba(255,59,48,0.3)]'
                        }`}
                      />
                    </motion.div>
                    {errors.email && <p className="text-[10px] text-[#FF3B30] font-bold flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-white/80">Phone Number *</label>
                    <motion.div animate={errors.phone ? { x: [-8, 8, -6, 6, 0] } : {}}>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-xs text-white placeholder-white/40 focus:outline-none transition-all ${
                          errors.phone ? 'border-[#FF3B30] bg-[#FF3B30]/10' : 'border-white/10 focus:border-[#FF3B30] focus:shadow-[0_0_15px_rgba(255,59,48,0.3)]'
                        }`}
                      />
                    </motion.div>
                    {errors.phone && <p className="text-[10px] text-[#FF3B30] font-bold flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                  </div>
                </div>

                {/* Preferred Discipline */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-white/80">Preferred Trial Class</label>
                  <select
                    name="preferredClass"
                    value={formData.preferredClass}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1C1C20] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF3B30]"
                  >
                    <option value="Rhythm Cycle 45">Rhythm Cycle 45 (Spin)</option>
                    <option value="Beat Boxing HIIT">Beat Boxing HIIT (Heavy Bag)</option>
                    <option value="Sculpt & Core Reformer">Sculpt & Core Reformer (Pilates)</option>
                    <option value="Infrared Power Flow Yoga">Infrared Power Flow Yoga</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-white/80">Message / Goals (Optional)</label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your fitness targets..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF3B30]"
                  />
                </div>

                <div className="pt-2">
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                    icon={<Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Sending Request...' : 'Claim 7-Day Free Pass'}
                  </MagneticButton>
                </div>
              </form>
            ) : (
              /* Success confirmation */
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#FF3B30]/20 text-[#FF3B30] mx-auto flex items-center justify-center border border-[#FF3B30]/40">
                  <CheckCircle2 className="w-12 h-12 text-[#FF3B30]" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase">Pass Activated!</h3>
                <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.fullName}</strong>. Your complimentary 7-day studio pass has been registered under <strong className="text-[#FF7A00]">{formData.email}</strong>. Check your inbox for booking instructions.
                </p>
                <div className="pt-4">
                  <MagneticButton onClick={() => setIsSuccess(false)} variant="secondary" size="md">
                    Submit Another Request
                  </MagneticButton>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Column: Studio Information & Simulated Map */}
        <div className="lg:col-span-5 space-y-6">
          {/* Flagship details */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xl font-black text-white uppercase">BeatX Flagship Studio</h3>
            
            <ul className="space-y-4 text-xs text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF3B30] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Location Address</strong>
                  <span>450 Rhythm Blvd, Suite 100, Innovation District</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Concierge Line</strong>
                  <span>+1 (800) 555-BEATX</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#FF3B30] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Studio Hours</strong>
                  <span>Mon - Fri: 5:00 AM - 10:00 PM</span>
                  <span className="block text-white/50">Sat - Sun: 6:00 AM - 8:00 PM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Interactive Simulated Map Card */}
          <div className="relative h-64 rounded-3xl overflow-hidden glass-card border border-white/10 bg-[#0E0E12] flex items-center justify-center p-6 text-center group">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#FF3B30_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FF3B30] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#FF3B30]/50 animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-white">Innovation District Studio</h4>
              <p className="text-xs text-white/60">Tap to open live turn-by-turn directions in Google Maps</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
