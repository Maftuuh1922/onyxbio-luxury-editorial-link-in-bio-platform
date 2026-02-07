import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
interface Particle {
  id: number;
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
}
const PARTICLES_DATA: Particle[] = [
  { id: 1, size: 4, top: '10%', left: '15%', duration: 18, delay: 0 },
  { id: 2, size: 2, top: '25%', left: '80%', duration: 22, delay: 2 },
  { id: 3, size: 5, top: '60%', left: '10%', duration: 15, delay: 5 },
  { id: 4, size: 3, top: '85%', left: '75%', duration: 20, delay: 1 },
  { id: 5, size: 4, top: '40%', left: '90%', duration: 17, delay: 3 },
  { id: 6, size: 2, top: '70%', left: '40%', duration: 19, delay: 4 },
];
export function LuxuryBackground() {
  const particles = useMemo(() => PARTICLES_DATA, []);
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      {/* Golden Breathing Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -20, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-onyx-gold/5 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-onyx-gold/5 blur-[120px] rounded-full"
      />
      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.15, 0.1],
            y: [0, -30, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: p.top,
            left: p.left,
            backgroundColor: '#c9a961'
          }}
          className="absolute rounded-full shadow-[0_0_10px_#c9a961]"
        />
      ))}
    </div>
  );
}