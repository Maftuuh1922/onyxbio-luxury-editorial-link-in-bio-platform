import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Instagram,
  Youtube,
  Linkedin,
  Github,
  Twitter,
  Globe,
  ShoppingBag,
  Mail,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
// --- Types ---
interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: React.ReactNode;
}
interface Particle {
  id: number;
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
}
// --- Data ---
const PROFILE = {
  name: "ALEXANDER ONYX",
  tagline: "Visual Storyteller & Digital Architect",
  bio: "Creative • Innovator • Dreamer",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop",
};
const LINKS: LinkItem[] = [
  { id: '1', title: 'PORTFOLIO', subtitle: 'View my latest creative projects', url: '#', icon: <Globe className="w-5 h-5" /> },
  { id: '2', title: 'INSTAGRAM', subtitle: 'Daily glimpses into my process', url: '#', icon: <Instagram className="w-5 h-5" /> },
  { id: '3', title: 'YOUTUBE', subtitle: 'Long-form cinematic experiences', url: '#', icon: <Youtube className="w-5 h-5" /> },
  { id: '4', title: 'LINKEDIN', subtitle: 'Professional network & collaborations', url: '#', icon: <Linkedin className="w-5 h-5" /> },
  { id: '5', title: 'CONTACT', subtitle: 'Let’s build something together', url: '#', icon: <Mail className="w-5 h-5" /> },
  { id: '6', title: 'SHOP', subtitle: 'Curated presets & digital assets', url: '#', icon: <ShoppingBag className="w-5 h-5" /> },
];
const PARTICLES_DATA: Particle[] = [
  { id: 1, size: 4, top: '10%', left: '15%', duration: 18, delay: 0 },
  { id: 2, size: 2, top: '25%', left: '80%', duration: 22, delay: 2 },
  { id: 3, size: 5, top: '60%', left: '10%', duration: 15, delay: 5 },
  { id: 4, size: 3, top: '85%', left: '75%', duration: 20, delay: 1 },
  { id: 5, size: 4, top: '40%', left: '90%', duration: 17, delay: 3 },
  { id: 6, size: 2, top: '70%', left: '40%', duration: 19, delay: 4 },
];
// --- Sub-components ---
// Moved into function component style to ensure proper hook context propagation
const BackgroundLayer: React.FC = () => {
  const particles = useMemo(() => PARTICLES_DATA, []);
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
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
};
export function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate percentage for CSS variables
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
      // Update CSS variables for the global shimmer trail
      document.documentElement.style.setProperty('--x', `${x}%`);
      document.documentElement.style.setProperty('--y', `${y}%`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <div className="relative min-h-screen bg-onyx-dark text-onyx-white selection:bg-onyx-gold selection:text-onyx-dark font-serif overflow-x-hidden">
      <BackgroundLayer />
      {/* Editorial Shimmer Cursor Trail */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 mix-blend-screen opacity-20 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(201,169,97,0.15) 0%, transparent 40%)`
        }}
      />
      <main className="relative z-10 max-w-[680px] mx-auto px-6 py-16 md:py-24 space-y-16">
        {/* Header Section */}
        <header className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-ornament text-onyx-gold text-2xl tracking-[0.5em] flex items-center gap-4"
          >
            ✦ ✦ ✦
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-tr from-onyx-gold-dark/20 via-onyx-gold/20 to-onyx-gold-light/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
            <div className="relative w-[160px] h-[160px] rounded-full p-[3px] bg-white/10 backdrop-blur-md overflow-hidden border border-white/10 group-hover:border-onyx-gold/50 group-hover:scale-105 group-hover:rotate-2 transition-all duration-700">
              <img
                src={PROFILE.avatar}
                alt={PROFILE.name}
                className="w-full h-full object-cover rounded-full grayscale-[0.2] group-hover:grayscale-0 transition duration-1000 ease-in-out"
              />
            </div>
          </motion.div>
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-display text-4xl md:text-[3.5rem] leading-tight tracking-wider text-gradient-gold uppercase"
            >
              {PROFILE.name}
            </motion.h1>
            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-onyx-white italic text-[1.4rem] tracking-wide font-serif"
              >
                {PROFILE.tagline}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="text-onyx-gray text-[0.9rem] tracking-[0.3em] uppercase font-ornament font-light"
              >
                {PROFILE.bio}
              </motion.p>
            </div>
          </div>
        </header>
        {/* Links Section */}
        <nav className="space-y-6">
          <AnimatePresence mode="popLayout">
            {LINKS.map((link, idx) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8 + (idx * 0.12),
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="glass-card shimmer-trigger block p-6 md:px-8 md:py-7 group"
                aria-label={link.title}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-onyx-gold group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                      {link.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-ornament text-onyx-gold text-[1.25rem] tracking-widest uppercase transition-colors duration-300 group-hover:text-onyx-gold-light">
                        {link.title}
                      </h3>
                      <p className="font-serif text-onyx-gray group-hover:text-onyx-white text-sm tracking-wide transition-colors duration-300 line-clamp-1">
                        {link.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-onyx-gray/40 group-hover:text-onyx-gold group-hover:translate-x-2 transition-all duration-300" />
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </nav>
        {/* Social Dock */}
        <footer className="pt-12 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="flex items-center justify-center gap-8"
          >
            {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
              <motion.a
                key={`social-${i}`}
                href="#"
                whileHover={{ y: -8, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.08] text-onyx-gray hover:text-onyx-gold hover:border-onyx-gold/40 hover:bg-onyx-gold/5 hover:shadow-[0_0_25px_rgba(201,169,97,0.25)] transition-all duration-500"
                aria-label={`Social link ${i + 1}`}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
          {/* Footer Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2 }}
            className="text-center space-y-6 pt-10 border-t border-white/[0.05]"
          >
            <div className="font-ornament text-onyx-gold-dark tracking-[1em] text-xl opacity-60">
              ◆
            </div>
            <p className="text-onyx-gray-dark text-[0.75rem] tracking-[0.4em] font-serif uppercase leading-relaxed">
              Designed for digital excellence<br />
              ONYXBIO EDITORIAL © 2025
            </p>
          </motion.div>
        </footer>
      </main>
    </div>
  );
}