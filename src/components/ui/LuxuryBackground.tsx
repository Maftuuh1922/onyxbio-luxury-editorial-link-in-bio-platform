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
}
const PARTICLES_DATA: Particle[] = [
  { id: 1, size: 4, top: '10%', left: '15%', duration: 18, delay: 0, driftX: 40 },
  { id: 2, size: 2, top: '25%', left: '80%', duration: 22, delay: 2, driftX: -30 },
  { id: 3, size: 5, top: '60%', left: '10%', duration: 15, delay: 5, driftX: 50 },
  { id: 4, size: 3, top: '85%', left: '75%', duration: 20, delay: 1, driftX: -20 },
  { id: 5, size: 4, top: '40%', left: '90%', duration: 17, delay: 3, driftX: -60 },
  { id: 6, size: 2, top: '70%', left: '40%', duration: 19, delay: 4, driftX: 30 },
  { id: 7, size: 3, top: '15%', left: '45%', duration: 25, delay: 6, driftX: -40 },
  { id: 8, size: 2, top: '45%', left: '20%', duration: 21, delay: 2, driftX: 25 },
  { id: 9, size: 4, top: '55%', left: '65%', duration: 19, delay: 8, driftX: 15 },
  { id: 10, size: 3, top: '80%', left: '30%', duration: 23, delay: 1, driftX: -35 },
];
interface LuxuryBackgroundProps {
  pattern?: 'dust' | 'grid' | 'constellation';
  palettePrimary?: string;
}
export function LuxuryBackground({ pattern = 'dust', palettePrimary = '#c9a961' }: LuxuryBackgroundProps) {
  const particles = useMemo(() => PARTICLES_DATA, []);
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      {/* Dynamic Gradients */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 15, repeat: Infinity }}
        style={{ backgroundColor: palettePrimary }}
        className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] blur-[160px] rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{ backgroundColor: palettePrimary }}
        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] blur-[160px] rounded-full"
      />
      {/* Pattern: Grid */}
      {pattern === 'grid' && (
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(${palettePrimary} 0.5px, transparent 0.5px), linear-gradient(90deg, ${palettePrimary} 0.5px, transparent 0.5px)`,
            backgroundSize: '60px 60px'
          }}
        />
      )}
      {/* Pattern: Dust */}
      {(pattern === 'dust' || pattern === 'constellation') && particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.15, 0.1, 0],
            y: [0, -100, -200],
            x: [0, p.driftX, p.driftX * 1.5],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: p.top,
            left: p.left,
            backgroundColor: palettePrimary,
            boxShadow: `0 0 12px ${palettePrimary}`
          }}
          className="absolute rounded-full"
        />
      ))}
      {/* Pattern: Constellation Connections */}
      {pattern === 'constellation' && (
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.path
            d="M 50 100 Q 250 250 450 100 T 850 300"
            fill="none"
            stroke={palettePrimary}
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.3, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 100 800 Q 400 600 700 850 T 1100 700"
            fill="none"
            stroke={palettePrimary}
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.2, 0.1] }}
            transition={{ duration: 18, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          />
        </svg>
      )}
    </div>
  );
}