'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, CheckCircle2, Circle, Award, Shield, Sparkles, Star } from 'lucide-react';
import { CHALLENGE_TASKS } from '@/data/mockData';
import { ChallengeTask } from '@/types';
import confetti from 'canvas-confetti';
import { MagneticButton } from '../ui/MagneticButton';

export const Challenge30Day: React.FC = () => {
  const [tasks, setTasks] = useState<ChallengeTask[]>(CHALLENGE_TASKS);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalPoints = tasks.reduce((sum, t) => (t.completed ? sum + t.points : sum), 0);
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          if (nextCompleted) {
            confetti({
              particleCount: 50,
              spread: 50,
              origin: { y: 0.7 },
              colors: ['#FF3B30', '#FF7A00', '#FFFFFF'],
            });
          }
          return { ...t, completed: nextCompleted };
        }
        return t;
      })
    );
  };

  const badges = [
    { title: 'Rhythm Pioneer', desc: 'Completed Day 1 Assessment', unlocked: true },
    { title: 'Heavy Bag Warrior', desc: 'Burned >500 kcal in Boxing HIIT', unlocked: completedCount >= 2 },
    { title: 'Electrolyte Master', desc: 'Log 3.5L hydration target', unlocked: completedCount >= 3 },
    { title: '7-Day Champion', desc: 'Complete all 7 Week 1 milestones', unlocked: completedCount === 7 },
  ];

  return (
    <div className="pt-28 pb-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-xs font-black uppercase tracking-widest text-[#FF3B30] flex items-center justify-center gap-1.5 w-max mx-auto">
          <Trophy className="w-3.5 h-3.5" />
          Gamified Member Arena
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          30-Day <span className="text-gradient-fire">Transformation Challenge</span>
        </h1>
        <p className="text-base text-white/70 font-medium">
          Check off daily studio milestones, maintain your streak, and earn physical achievement badges.
        </p>
      </div>

      {/* Gamified Stat Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card 1: Streak */}
        <div className="glass-card p-6 rounded-2xl border border-glow-red text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#FF3B30]/20 flex items-center justify-center text-[#FF3B30] mx-auto">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[10px] font-extrabold uppercase text-white/50 block">Current Streak</span>
          <p className="text-3xl font-black text-white font-mono">{completedCount} DAYS</p>
        </div>

        {/* Card 2: Total Points */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#FF7A00]/20 flex items-center justify-center text-[#FF7A00] mx-auto">
            <Star className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold uppercase text-white/50 block">Total Points</span>
          <p className="text-3xl font-black text-[#FF7A00] font-mono">{totalPoints} PTS</p>
        </div>

        {/* Card 3: Completion Ring */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold uppercase text-white/50 block">Week 1 Progress</span>
          <p className="text-3xl font-black text-white font-mono">{progressPercent}%</p>
        </div>

        {/* Card 4: Unlocked Badges */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold uppercase text-white/50 block">Badges Unlocked</span>
          <p className="text-3xl font-black text-purple-400 font-mono">
            {badges.filter((b) => b.unlocked).length} / {badges.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Interactive Milestone Checklist */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-2xl font-black text-white uppercase">Week 1 Milestone Tasks</h3>

          <div className="space-y-3">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => handleToggleTask(task.id)}
                className={`glass-card p-5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                  task.completed
                    ? 'border-[#FF3B30]/50 bg-[#FF3B30]/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-[#FF3B30]" />
                    ) : (
                      <Circle className="w-6 h-6 text-white/40" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-black uppercase text-white">
                        Day {task.day}
                      </span>
                      <span className="text-[10px] text-[#FF7A00] font-bold uppercase">{task.category}</span>
                    </div>
                    <h4 className={`text-base font-bold ${task.completed ? 'line-through text-white/60' : 'text-white'}`}>
                      {task.title}
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed">{task.description}</p>
                  </div>
                </div>

                <span className="text-xs font-mono font-black text-[#FF3B30] bg-black/40 px-3 py-1 rounded-lg shrink-0">
                  +{task.points} PTS
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Badges Collection Showcase */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-2xl font-black text-white uppercase">Achievement Badges</h3>

          <div className="space-y-3">
            {badges.map((badge, idx) => (
              <div
                key={idx}
                className={`glass-card p-4 rounded-2xl border flex items-center gap-4 ${
                  badge.unlocked
                    ? 'border-glow-orange bg-[#18181C]'
                    : 'border-white/5 opacity-50 filter grayscale'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FF3B30] to-[#FF7A00] flex items-center justify-center text-white shrink-0 shadow-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">{badge.title}</h4>
                  <p className="text-[11px] text-white/60">{badge.desc}</p>
                  <span className="text-[9px] font-black uppercase text-[#FF7A00] mt-1 block">
                    {badge.unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
