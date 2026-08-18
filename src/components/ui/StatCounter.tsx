'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView, motion } from 'framer-motion';

interface StatCounterProps {
  value: number;
  duration?: number; // seconds
  prefix?: string;
  suffix?: string;
  label: string;
  description?: string;
  className?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  label,
  description,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Ease out expo formula
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easedProgress * value);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(value);
        setIsCompleted(true);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className={`text-center group ${className}`}>
      <div className="relative inline-block">
        <motion.span
          animate={{ scale: isCompleted ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white font-mono"
        >
          {prefix}
          {count.toLocaleString()}
          <span className="text-[#FF3B30]">{suffix}</span>
        </motion.span>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-1 -right-4 w-3 h-3 rounded-full bg-[#FF3B30] filter blur-sm pointer-events-none"
          />
        )}
      </div>
      <p className="mt-2 text-sm md:text-base font-extrabold uppercase tracking-widest text-white/90">
        {label}
      </p>
      {description && (
        <p className="mt-1 text-xs text-white/50 max-w-[200px] mx-auto font-medium">
          {description}
        </p>
      )}
    </div>
  );
};
