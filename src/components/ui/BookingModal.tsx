'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Calendar, Clock, MapPin, User, Flame } from 'lucide-react';
import { ClassItem } from '@/types';
import confetti from 'canvas-confetti';
import { MagneticButton } from './MagneticButton';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: ClassItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, classData }) => {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !classData) return null;

  const totalSeats = classData.maxCapacity;

  const handleSeatClick = (seatNum: number) => {
    setSelectedSeat(seatNum);
  };

  const handleConfirmBooking = () => {
    if (!selectedSeat) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF3B30', '#FF7A00', '#FFFFFF'],
      });
    }, 1200);
  };

  const handleModalClose = () => {
    setIsSuccess(false);
    setSelectedSeat(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleModalClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl glass-card border border-white/20 p-6 md:p-8 bg-[#141416]/95 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={handleModalClose}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSuccess ? (
            <div>
              {/* Header */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-black uppercase rounded-full bg-[#FF3B30]/20 text-[#FF3B30] border border-[#FF3B30]/30">
                  {classData.category}
                </span>
                <span className="text-xs text-white/60 font-medium flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#FF7A00]" />
                  {classData.calories} kcal
                </span>
              </div>

              <h2 className="text-2xl font-black text-white mt-2">{classData.name}</h2>

              {/* Class Info Meta */}
              <div className="grid grid-cols-2 gap-3 mt-4 text-xs text-white/80 bg-white/5 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#FF3B30]" />
                  <span>{classData.trainer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF7A00]" />
                  <span>{classData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#FF3B30]" />
                  <span>{classData.day} at {classData.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF7A00]" />
                  <span>{classData.room}</span>
                </div>
              </div>

              {/* Interactive Seat Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-white uppercase tracking-wider">Select Your Spot</span>
                  <span className="text-white/60">{classData.bookedSeats} / {totalSeats} Booked</span>
                </div>
                <div className="grid grid-cols-6 gap-2 p-3 bg-black/40 rounded-xl border border-white/5 max-h-36 overflow-y-auto">
                  {Array.from({ length: totalSeats }).map((_, index) => {
                    const seatNum = index + 1;
                    const isTaken = seatNum <= classData.bookedSeats;
                    const isSelected = selectedSeat === seatNum;

                    return (
                      <button
                        key={seatNum}
                        disabled={isTaken}
                        onClick={() => handleSeatClick(seatNum)}
                        className={`h-9 rounded-lg font-bold text-xs transition-all flex items-center justify-center ${
                          isTaken
                            ? 'bg-white/5 text-white/20 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-[#FF3B30] text-white shadow-lg shadow-[#FF3B30]/50 scale-105'
                            : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        {seatNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2.5 text-xs font-bold text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <MagneticButton
                  onClick={handleConfirmBooking}
                  variant="primary"
                  size="md"
                  className={!selectedSeat || isSubmitting ? 'opacity-50 pointer-events-none' : ''}
                >
                  {isSubmitting ? 'Confirming Spot...' : selectedSeat ? `Book Spot #${selectedSeat}` : 'Select a Spot'}
                </MagneticButton>
              </div>
            </div>
          ) : (
            /* Success State */
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#FF3B30]/20 text-[#FF3B30] mx-auto flex items-center justify-center border border-[#FF3B30]/40 mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-[#FF3B30]" />
              </div>
              <h3 className="text-2xl font-black text-white">Booking Confirmed!</h3>
              <p className="text-xs text-white/70 mt-2 max-w-xs mx-auto">
                You are booked for <span className="text-[#FF3B30] font-bold">{classData.name}</span> on{' '}
                <span className="text-white font-bold">{classData.day} at {classData.time}</span>. Spot #{selectedSeat}.
              </p>
              <div className="mt-6">
                <MagneticButton onClick={handleModalClose} variant="secondary" size="md">
                  Done & View Schedule
                </MagneticButton>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
