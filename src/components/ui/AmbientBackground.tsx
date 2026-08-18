'use client';

import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Floating Red Gradient Orb Top-Right */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#FF3B30]/15 via-[#FF7A00]/5 to-transparent blur-[120px] animate-float-orb" />

      {/* Floating Orange Gradient Orb Bottom-Left */}
      <div className="absolute top-1/2 -left-40 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#FF7A00]/10 via-[#FF3B30]/5 to-transparent blur-[140px] animate-float-orb [animation-delay:4s]" />

      {/* Dark Ambient Mesh Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
};
