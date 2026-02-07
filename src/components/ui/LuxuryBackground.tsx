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
  { id: 11, size: 2, top: '35%', left: '55%', duration: 16, delay: 4, driftX: 45 },
  { id: 12, size: 5, top: '90%', left: '15%', duration: 28, delay: 0, driftX: -25 },
];
export function LuxuryBackground() {
  const particles = useMemo(() => PARTICLES_DATA, []);
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      {/* Golden Breathing Gradients - Softened for luxury mystery */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-30%] left-[-20%] w-[100%] h-[100%] bg-onyx-gold/5 blur-[160px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 60, 0],
          y: [0, -60, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-30%] right-[-20%] w-[90%] h-[90%] bg-onyx-gold/5 blur-[160px] rounded-full"
      />
      {/* Floating Particles - Cinematic "Dust in the light" effect */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.2, 0.1, 0],
            y: [0, -60, -120],
            x: [0, p.driftX, p.driftX * 1.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: p.top,
            left: p.left,
            backgroundColor: '#c9a961'
          }}
          className="absolute rounded-full shadow-[0_0_12px_#c9a961]"
        />
      ))}
    </div>
  );
}