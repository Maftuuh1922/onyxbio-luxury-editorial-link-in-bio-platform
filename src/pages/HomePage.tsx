import React from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Youtube, 
  Linkedin, 
  Github, 
  Twitter, 
  Globe, 
  ShoppingBag, 
  Mail, 
  ArrowRight,
  Sparkles
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
const PARTICLES: Particle[] = [
  { id: 1, size: 4, top: '10%', left: '15%', duration: 18, delay: 0 },
  { id: 2, size: 2, top: '25%', left: '80%', duration: 22, delay: 2 },
  { id: 3, size: 5, top: '60%', left: '10%', duration: 15, delay: 5 },
  { id: 4, size: 3, top: '85%', left: '75%', duration: 20, delay: 1 },
  { id: 5, size: 4, top: '40%', left: '90%', duration: 17, delay: 3 },
  { id: 6, size: 2, top: '70%', left: '40%', duration: 19, delay: 4 },
];
// --- Components ---
const BackgroundLayer = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Radial Gradients */}
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
    {/* Floating Particles */}
    {PARTICLES.map((p) => (
      <motion.div
        key={p.id}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.15,
          y: [0, -30, 0],
          x: [0, 15, 0],
        }}
        transition={{ 
          opacity: { duration: 2 },
          duration: p.duration, 
          repeat: Infinity, 
          delay: p.delay,
          ease: "easeInOut" 
        }}
        style={{ 
          width: p.size, 
          height: p.size, 
          top: p.top, 
          left: p.left,
          backgroundColor: '#c9a961'
        }}
        className="absolute rounded-full shadow-[0_0_10px_#c9a961]"
      />
    ))}
  </div>
);
export function HomePage() {
  return (
    <div className="relative min-h-screen bg-onyx-dark text-onyx-white selection:bg-onyx-gold selection:text-onyx-dark font-serif overflow-x-hidden">
      <BackgroundLayer />
      <main className="relative z-10 max-w-[680px] mx-auto px-6 py-16 md:py-24 space-y-16">
        {/* Header Section */}
        <header className="flex flex-col items-center text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-ornament text-onyx-gold text-2xl tracking-[0.5em] flex items-center gap-4"
          >
            �� ✦ ✦
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-tr from-onyx-gold-dark via-onyx-gold to-onyx-gold-light rounded-full blur-sm opacity-20 group-hover:opacity-60 transition duration-500" />
            <div className="relative w-[140px] h-[140px] rounded-full p-[2px] bg-white/10 backdrop-blur-md overflow-hidden border border-white/10 group-hover:border-onyx-gold/50 group-hover:scale-105 group-hover:rotate-3 transition-all duration-700">
              <img 
                src={PROFILE.avatar} 
                alt="Profile Avatar" 
                className="w-full h-full object-cover rounded-full grayscale-[0.2] group-hover:grayscale-0 transition duration-700"
              />
            </div>
          </motion.div>
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-display text-4xl md:text-[3.5rem] leading-tight tracking-wider text-gradient-gold uppercase"
            >
              {PROFILE.name}
            </motion.h1>
            <div className="space-y-2">
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-onyx-white italic text-[1.3rem] tracking-wide font-serif"
              >
                {PROFILE.tagline}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="text-onyx-gray text-[1.1rem] tracking-widest uppercase font-ornament font-light"
              >
                {PROFILE.bio}
              </motion.p>
            </div>
          </div>
        </header>
        {/* Links Section */}
        <nav className="space-y-5">
          {LINKS.map((link, idx) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.3 + (idx * 0.1) }}
              className="glass-card shimmer-trigger block p-7 md:px-8 md:py-7 group"
              aria-label={link.title}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-onyx-gold group-hover:scale-110 transition-transform duration-500">
                    {link.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-ornament text-onyx-gold text-[1.4rem] tracking-widest uppercase transition-colors duration-300 group-hover:text-onyx-gold-light">
                      {link.title}
                    </h3>
                    <p className="font-serif text-onyx-gray group-hover:text-onyx-white text-sm tracking-wide transition-colors duration-300">
                      {link.subtitle}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-onyx-gray/40 group-hover:text-onyx-gold group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </motion.a>
          ))}
        </nav>
        {/* Social Dock */}
        <footer className="pt-8 space-y-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="flex items-center justify-center gap-6"
          >
            {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -5, scale: 1.1, rotate: 5 }}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.1] text-onyx-gray hover:text-onyx-gold hover:border-onyx-gold/40 hover:shadow-[0_0_15px_rgba(201,169,97,0.3)] transition-all duration-300"
                aria-label="Social link"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
          {/* Footer Bottom */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.7 }}
            className="text-center space-y-4 pt-8 border-t border-white/[0.05]"
          >
            <div className="font-ornament text-onyx-gold-dark tracking-[0.8em] text-lg">◆</div>
            <p className="text-onyx-gray-dark text-sm tracking-widest font-serif">
              CREATED WITH PASSION © 2025
            </p>
          </motion.div>
        </footer>
      </main>
      {/* Decorative Shimmer Cursor Trail - Optional Interaction Element */}
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-screen opacity-20 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(201,169,97,0.1)_0%,transparent_50%)]" />
    </div>
  );
}