'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calculator, Flame, Dumbbell, User, Award, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { AIGoalInput, AIGoalResult } from '@/types';
import { MagneticButton } from '../ui/MagneticButton';
import confetti from 'canvas-confetti';

export const AIFitnessPlanner: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<AIGoalInput>({
    age: 28,
    weightKg: 74,
    heightCm: 178,
    gender: 'female',
    goal: 'Fat Loss',
    activityLevel: 'Moderate',
  });

  const [result, setResult] = useState<AIGoalResult | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // Biometric calculations
    const heightM = formData.heightCm / 100;
    const bmi = parseFloat((formData.weightKg / (heightM * heightM)).toFixed(1));

    let bmiCategory = 'Normal Weight';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi >= 25 && bmi < 30) bmiCategory = 'Overweight';
    else if (bmi >= 30) bmiCategory = 'Obese';

    // BMR formula (Mifflin-St Jeor)
    let bmr = 10 * formData.weightKg + 6.25 * formData.heightCm - 5 * formData.age;
    bmr += formData.gender === 'male' ? 5 : -161;

    let multiplier = 1.375;
    if (formData.activityLevel === 'High') multiplier = 1.55;

    let dailyCalories = Math.round(bmr * multiplier);

    if (formData.goal === 'Fat Loss') dailyCalories -= 450;
    if (formData.goal === 'Muscle Gain') dailyCalories += 350;

    const proteinGrams = Math.round(formData.weightKg * 2.2);
    const fatsGrams = Math.round((dailyCalories * 0.25) / 9);
    const carbsGrams = Math.round((dailyCalories - (proteinGrams * 4 + fatsGrams * 9)) / 4);

    let recommendedPlan = 'BeatX Pro';
    if (formData.goal === 'Muscle Gain' || formData.goal === 'Athletic Conditioning') {
      recommendedPlan = 'Elite VIP Access';
    }

    let recommendedTrainer = 'Alex Vance';
    let recommendedClasses = ['Rhythm Cycle 45', 'Sculpt & Core Reformer'];

    if (formData.goal === 'Fat Loss') {
      recommendedTrainer = 'Alex Vance';
      recommendedClasses = ['Rhythm Cycle 45', 'Zumba Beat Explosion'];
    } else if (formData.goal === 'Muscle Gain') {
      recommendedTrainer = 'Marcus Steele';
      recommendedClasses = ['Beat Boxing HIIT', 'Metabolic Conditioning 60'];
    } else if (formData.goal === 'Endurance & Mobility') {
      recommendedTrainer = 'Elena Rostova';
      recommendedClasses = ['Infrared Power Flow Yoga', 'Sculpt & Core Reformer'];
    }

    setResult({
      dailyCalories,
      proteinGrams,
      carbsGrams,
      fatsGrams,
      recommendedPlan,
      recommendedTrainer,
      recommendedClasses,
      weeklySessions: formData.goal === 'Fat Loss' ? 4 : 5,
      bmi,
      bmiCategory,
    });

    setStep(2);
    confetti({
      particleCount: 90,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FF3B30', '#FF7A00', '#FFFFFF'],
    });
  };

  return (
    <div className="pt-28 pb-24 relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-xs font-black uppercase tracking-widest text-[#FF7A00] flex items-center justify-center gap-1.5 w-max mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          AI Kinetic Telemetry
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          AI Fitness <span className="text-gradient-red">Goal Planner</span>
        </h1>
        <p className="text-base text-white/70 font-medium">
          Input your biometric telemetry to calculate customized daily macronutrients and targeted studio class protocols.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          /* Step 1: Input Form */
          <motion.div
            key="input"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6 shadow-2xl"
          >
            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Age */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-white/80">Age (Years)</label>
                  <input
                    type="number"
                    min={14}
                    max={80}
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF3B30]"
                    required
                  />
                </div>

                {/* Weight */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-white/80">Weight (kg)</label>
                  <input
                    type="number"
                    min={40}
                    max={200}
                    value={formData.weightKg}
                    onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF3B30]"
                    required
                  />
                </div>

                {/* Height */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-white/80">Height (cm)</label>
                  <input
                    type="number"
                    min={120}
                    max={230}
                    value={formData.heightCm}
                    onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF3B30]"
                    required
                  />
                </div>
              </div>

              {/* Goal Select */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-white/80">Primary Athletic Target</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Fat Loss', 'Muscle Gain', 'Athletic Conditioning', 'Endurance & Mobility'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, goal: g })}
                      className={`p-3 rounded-xl text-xs font-bold transition-all border ${
                        formData.goal === g
                          ? 'bg-gradient-to-r from-[#FF3B30] to-[#FF7A00] text-white border-transparent shadow-lg shadow-[#FF3B30]/30'
                          : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender & Activity Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-white/80">Biological Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-4 py-3 bg-[#1C1C20] border border-white/10 rounded-xl text-xs text-white"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-white/80">Activity Level</label>
                  <select
                    value={formData.activityLevel}
                    onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value as any })}
                    className="w-full px-4 py-3 bg-[#1C1C20] border border-white/10 rounded-xl text-xs text-white"
                  >
                    <option value="Sedentary">Sedentary (Office job)</option>
                    <option value="Moderate">Moderate (1-3 workouts/wk)</option>
                    <option value="High">High (4+ intense workouts/wk)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <MagneticButton variant="primary" size="lg" className="w-full" icon={<Calculator className="w-5 h-5" />}>
                  Generate AI Kinetic Protocol
                </MagneticButton>
              </div>
            </form>
          </motion.div>
        ) : (
          /* Step 2: AI Dashboard Results */
          result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-8"
            >
              {/* Top Banner */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-glow-red bg-gradient-to-r from-[#141418] via-[#1A1A22] to-[#141418] flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="px-3 py-1 rounded bg-[#FF3B30] text-white text-[10px] font-black uppercase">
                    AI PROTOCOL GENERATED
                  </span>
                  <h3 className="text-3xl font-black text-white uppercase mt-2">
                    Target: {formData.goal}
                  </h3>
                  <p className="text-xs text-white/70">
                    BMI Index: <strong className="text-white">{result.bmi} ({result.bmiCategory})</strong>
                  </p>
                </div>

                <div className="text-center md:text-right bg-black/60 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold uppercase text-white/50 block">Daily Calorie Target</span>
                  <span className="text-4xl font-black text-white font-mono">{result.dailyCalories} <span className="text-sm text-[#FF3B30]">kcal</span></span>
                </div>
              </div>

              {/* Macro Breakdown Gauges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-2">
                  <span className="text-xs font-black uppercase text-[#FF3B30]">Protein Protocol</span>
                  <p className="text-3xl font-black text-white font-mono">{result.proteinGrams}g</p>
                  <p className="text-[10px] text-white/50">Supports muscular recovery & synthesis</p>
                </div>
                <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-2">
                  <span className="text-xs font-black uppercase text-[#FF7A00]">Carbohydrate Energy</span>
                  <p className="text-3xl font-black text-white font-mono">{result.carbsGrams}g</p>
                  <p className="text-[10px] text-white/50">Glycogen fuel for high BPM rhythm spin</p>
                </div>
                <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-2">
                  <span className="text-xs font-black uppercase text-white">Essential Lipids</span>
                  <p className="text-3xl font-black text-white font-mono">{result.fatsGrams}g</p>
                  <p className="text-[10px] text-white/50">Hormonal balance & joint lubrication</p>
                </div>
              </div>

              {/* Recommended Protocol */}
              <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
                <h4 className="text-xl font-black text-white uppercase flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FF3B30]" />
                  Recommended Studio Prescription
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  <div className="space-y-1">
                    <span className="text-white/50 font-bold uppercase text-[10px]">Recommended Membership</span>
                    <p className="text-lg font-black text-[#FF3B30]">{result.recommendedPlan}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white/50 font-bold uppercase text-[10px]">Lead Master Coach</span>
                    <p className="text-lg font-black text-[#FF7A00]">{result.recommendedTrainer}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white/50 font-bold uppercase text-[10px]">Frequency</span>
                    <p className="text-lg font-black text-white">{result.weeklySessions} Sessions / Week</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-xs font-bold uppercase text-white block mb-2">Targeted Classes:</span>
                  <div className="flex flex-wrap gap-2">
                    {result.recommendedClasses.map((cls, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 text-white rounded-lg text-xs font-bold flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#FF7A00]" />
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs font-bold text-white/60 hover:text-white"
                  >
                    ← Recalculate
                  </button>
                </div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};
