'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { SlidersHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  metrics?: {
    weight?: string;
    muscle?: string;
    time?: string;
  };
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER (BEATX)',
  className = '',
  metrics,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let position = (x / rect.width) * 100;
      if (position < 0) position = 0;
      if (position > 100) position = 100;
      setSliderPosition(position);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    },
    [isDragging, handleMove]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl select-none group border border-white/10 ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After Image (Background layer) */}
      <div className="relative w-full h-[400px] md:h-[480px]">
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center filter saturate-110 contrast-105"
        />
        <div className="absolute top-4 right-4 bg-[#FF3B30] text-white px-3 py-1 text-xs font-black rounded-full shadow-lg z-10 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Clipped layer) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center filter grayscale contrast-90"
        />
        <div className="absolute top-4 left-4 bg-black/80 text-white/80 border border-white/20 px-3 py-1 text-xs font-bold rounded-full z-10">
          {beforeLabel}
        </div>
      </div>

      {/* Vertical Slider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF3B30] via-white to-[#FF7A00] cursor-ew-resize z-20 shadow-[0_0_15px_rgba(255,59,48,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-[#FF3B30] flex items-center justify-center text-white shadow-xl shadow-[#FF3B30]/50 group-hover:scale-110 transition-transform duration-150">
          <SlidersHorizontal className="w-4 h-4 text-[#FF3B30]" />
        </div>
      </div>

      {/* Optional Metrics Card Overlay */}
      {metrics && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-3 z-10 flex items-center justify-around text-center text-xs">
          {metrics.weight && (
            <div>
              <p className="text-white/60 uppercase font-medium">Weight Shift</p>
              <p className="text-[#FF3B30] font-black text-sm">{metrics.weight}</p>
            </div>
          )}
          {metrics.muscle && (
            <div>
              <p className="text-white/60 uppercase font-medium">Muscle Gain</p>
              <p className="text-[#FF7A00] font-black text-sm">{metrics.muscle}</p>
            </div>
          )}
          {metrics.time && (
            <div>
              <p className="text-white/60 uppercase font-medium">Timeline</p>
              <p className="text-white font-bold text-sm">{metrics.time}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
