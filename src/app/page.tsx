'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { BookingModal } from '@/components/ui/BookingModal';

// Views
import { HeroSection } from '@/components/hero/HeroSection';
import { WhyChooseBeatX } from '@/components/home/WhyChooseBeatX';
import { StatsSection } from '@/components/home/StatsSection';
import { FeaturedClasses } from '@/components/home/FeaturedClasses';
import { CrowdTrackerSection } from '@/components/home/CrowdTrackerSection';
import { MembershipPreview } from '@/components/home/MembershipPreview';
import { TrainerShowcase } from '@/components/home/TrainerShowcase';
import { TransformationStories } from '@/components/home/TransformationStories';
import { FitnessChallengePreview } from '@/components/home/FitnessChallengePreview';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQSection } from '@/components/home/FAQSection';
import { CTABanner } from '@/components/home/CTABanner';

import { ClassesScheduleView } from '@/components/classes/ClassesScheduleView';
import { MembershipPlansView } from '@/components/memberships/MembershipPlansView';
import { TrainersView } from '@/components/trainers/TrainersView';
import { TransformationGalleryView } from '@/components/gallery/TransformationGalleryView';
import { BlogView } from '@/components/blog/BlogView';
import { ContactView } from '@/components/contact/ContactView';
import { AIFitnessPlanner } from '@/components/features/AIFitnessPlanner';
import { Challenge30Day } from '@/components/features/Challenge30Day';

import { CLASSES_DATA, TRAINERS_DATA } from '@/data/mockData';
import { ClassItem, TrainerItem } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);

  const handleOpenBooking = (classItem?: ClassItem) => {
    if (classItem) {
      setSelectedClass(classItem);
    } else {
      setSelectedClass(CLASSES_DATA[0]);
    }
    setBookingModalOpen(true);
  };

  const handleBookTrainerClass = (trainerName: string) => {
    const matchedClass = CLASSES_DATA.find((c) => c.trainer.includes(trainerName)) || CLASSES_DATA[0];
    setSelectedClass(matchedClass);
    setBookingModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0B0B0B] text-white selection:bg-[#FF3B30] selection:text-white">
      {/* Fixed UI Components */}
      <ScrollProgress />
      <AmbientBackground />

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBookClick={() => handleOpenBooking()}
      />

      {/* Main View Router with Framer Motion Page Crossfades */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <HeroSection
                onBookClick={() => handleOpenBooking()}
                onExploreMemberships={() => {
                  setActiveTab('memberships');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExploreClasses={() => {
                  setActiveTab('classes');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              <WhyChooseBeatX />
              <StatsSection />
              <FeaturedClasses
                onBookClass={(item) => handleOpenBooking(item)}
                onViewAllClasses={() => {
                  setActiveTab('classes');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              <CrowdTrackerSection />
              <MembershipPreview
                onSelectPlan={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              <TrainerShowcase
                onViewAllTrainers={() => {
                  setActiveTab('trainers');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectTrainer={(trainer) => {
                  setActiveTab('trainers');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              <TransformationStories
                onViewAllTransformations={() => {
                  setActiveTab('gallery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              <FitnessChallengePreview
                onJoinChallenge={() => {
                  setActiveTab('challenge');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              <Testimonials />
              <FAQSection />
              <CTABanner onBookClick={() => handleOpenBooking()} />
            </motion.div>
          )}

          {activeTab === 'classes' && (
            <motion.div
              key="classes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ClassesScheduleView onBookClass={(item) => handleOpenBooking(item)} />
            </motion.div>
          )}

          {activeTab === 'memberships' && (
            <motion.div
              key="memberships"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <MembershipPlansView
                onSelectPlan={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          {activeTab === 'trainers' && (
            <motion.div
              key="trainers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <TrainersView onBookTrainerClass={handleBookTrainerClass} />
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <TransformationGalleryView />
            </motion.div>
          )}

          {activeTab === 'ai-planner' && (
            <motion.div
              key="ai-planner"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <AIFitnessPlanner />
            </motion.div>
          )}

          {activeTab === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Challenge30Day />
            </motion.div>
          )}

          {activeTab === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <BlogView />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Booking Dialog Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        classData={selectedClass}
      />
    </div>
  );
}
