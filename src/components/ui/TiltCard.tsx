'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'red' | 'orange' | 'white';
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  glowColor = 'red',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // degrees
    const rotateY = ((x - centerX) / centerX) * 10; // degrees

    setRotation({ x: rotateX, y: rotateY });
    setSpotlightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setSpotlightPos({ x: 50, y: 50 });
  };

  const spotlightGlows = {
    red: 'radial-gradient(600px circle at var(--x) var(--y), rgba(255, 59, 48, 0.15), transparent 40%)',
    orange: 'radial-gradient(600px circle at var(--x) var(--y), rgba(255, 122, 0, 0.15), transparent 40%)',
    white: 'radial-gradient(600px circle at var(--x) var(--y), rgba(255, 255, 255, 0.08), transparent 40%)',
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovered ? 1.02 : 1,
        y: isHovered ? -6 : 0,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        ['--x' as string]: `${spotlightPos.x}%`,
        ['--y' as string]: `${spotlightPos.y}%`,
      }}
      className={`relative overflow-hidden rounded-2xl glass-card transition-shadow duration-300 ${className}`}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: spotlightGlows[glowColor],
        }}
      />
      
      {/* Content wrapper with depth translate */}
      <div className="relative z-20" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
};
