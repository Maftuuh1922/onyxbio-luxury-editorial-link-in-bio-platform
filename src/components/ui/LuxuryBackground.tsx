import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
interface Particle {
  id: number;
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
  driftX: number;
  opacity: number;
}
const PARTICLES_DATA: Particle[] = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 1,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: 15 + Math.random() * 15,
  delay: Math.random() * 10,
  driftX: (Math.random() - 0.5) * 100,
  opacity: 0.05 + Math.random() * 0.15,
}));
interface LuxuryBackgroundProps {
  pattern?: 'none' | 'dust' | 'grid' | 'constellation';
  palettePrimary?: string;
}
export function LuxuryBackground({ pattern = 'dust', palettePrimary = '#c9a961' }: LuxuryBackgroundProps) {
  const particles = useMemo(() => PARTICLES_DATA, []);
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      {/* Breathing Gradients */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.15, 0.3, 0.15],
          x: [0, 20, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundColor: palettePrimary }}
        className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] blur-[180px] rounded-full mix-blend-screen"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.1, 0.2, 0.1],
          y: [0, -30, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ backgroundColor: palettePrimary }}
        className="absolute bottom-[-30%] right-[-10%] w-[90%] h-[90%] blur-[200px] rounded-full mix-blend-screen"
      />
      {/* Pattern: Grid */}
      {pattern === 'grid' && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${palettePrimary} 1px, transparent 1px), linear-gradient(90deg, ${palettePrimary} 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      )}
      {/* Pattern: Dust */}
      {(pattern === 'dust' || pattern === 'constellation') && particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, p.opacity, p.opacity * 0.5, 0],
            y: [0, -250],
            x: [0, p.driftX],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: p.top,
            left: p.left,
            backgroundColor: palettePrimary,
            boxShadow: `0 0 15px ${palettePrimary}`,
            mixBlendMode: 'plus-lighter'
          }}
          className="absolute rounded-full"
        />
      ))}
      {/* Pattern: Constellation */}
      {pattern === 'constellation' && (
        <svg className="absolute inset-0 w-full h-full opacity-10 mix-blend-screen">
          <motion.path
            d="M 0 200 Q 300 400 600 200 T 1200 400"
            fill="none"
            stroke={palettePrimary}
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      )}
    </div>
  );
}