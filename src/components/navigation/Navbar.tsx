'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, Dumbbell, Sparkles, Trophy, Calendar, Users, LayoutGrid, BookOpen, Mail } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Zap className="w-4 h-4" /> },
    { id: 'classes', label: 'Classes & Schedule', icon: <Calendar className="w-4 h-4" /> },
    { id: 'memberships', label: 'Memberships', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'trainers', label: 'Trainers', icon: <Users className="w-4 h-4" /> },
    { id: 'gallery', label: 'Transformations', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'ai-planner', label: 'AI Planner', icon: <Sparkles className="w-4 h-4 text-[#FF7A00]" /> },
    { id: 'challenge', label: '30-Day Challenge', icon: <Trophy className="w-4 h-4 text-[#FF3B30]" /> },
    { id: 'blog', label: 'Blog', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 glass-nav border-b border-white/10 shadow-2xl shadow-black/50'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF3B30] to-[#FF7A00] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#FF3B30]/30 group-hover:scale-105 transition-transform duration-200">
            B
          </div>
          <div>
            <span className="text-xl font-black tracking-tighter text-white uppercase flex items-center gap-1">
              BEAT<span className="text-[#FF3B30]">X</span>
            </span>
            <span className="block text-[9px] font-bold text-white/50 tracking-widest uppercase -mt-1">
              FITNESS STUDIO
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-bold rounded-full transition-colors duration-200 flex items-center gap-1.5 ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-gradient-to-r from-[#FF3B30] to-[#FF7A00] rounded-full shadow-md shadow-[#FF3B30]/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {item.icon}
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Action Button & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <MagneticButton
            onClick={onBookClick}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Book Free Trial
          </MagneticButton>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden glass-nav border-b border-white/10 overflow-hidden px-4 py-6"
          >
            <div className="grid grid-cols-1 gap-2">
              {navItems.map((item, index) => {
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FF3B30] to-[#FF7A00] text-white shadow-lg'
                        : 'bg-white/5 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </motion.button>
                );
              })}
              <div className="pt-3">
                <MagneticButton
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookClick();
                  }}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Book Free Trial
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
