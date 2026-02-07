import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Linkedin, Mail, Globe, ArrowRight } from 'lucide-react';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
const MOCK_PROFILES: Record<string, any> = {
  alexander: {
    name: "ALEXANDER ONYX",
    tagline: "Visual Storyteller & Digital Architect",
    bio: "Creative • Innovator • Dreamer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop",
    links: [
      { id: '1', title: 'PORTFOLIO', subtitle: 'View my latest creative projects', url: '#', icon: <Globe className="w-5 h-5" /> },
      { id: '2', title: 'INSTAGRAM', subtitle: 'Daily glimpses into my process', url: '#', icon: <Instagram className="w-5 h-5" /> },
      { id: '5', title: 'CONTACT', subtitle: 'Let’s build something together', url: '#', icon: <Mail className="w-5 h-5" /> },
    ]
  }
};
export function PublicProfilePage() {
  const { username } = useParams();
  const profile = username ? MOCK_PROFILES[username.toLowerCase()] : null;
  if (!profile && username !== 'alexander') {
    return <Navigate to="/" replace />;
  }
  const activeProfile = profile || MOCK_PROFILES['alexander'];
  return (
    <div className="relative min-h-screen bg-onyx-dark text-onyx-white selection:bg-onyx-gold selection:text-onyx-dark font-serif overflow-x-hidden">
      <LuxuryBackground />
      <main className="relative z-10 max-w-[680px] mx-auto px-6 py-16 md:py-24 space-y-16">
        <header className="flex flex-col items-center text-center space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-ornament text-onyx-gold text-2xl tracking-[0.5em]">✦ ✦ ✦</motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative w-[160px] h-[160px] rounded-full p-[3px] bg-white/10 backdrop-blur-md overflow-hidden border border-white/10">
            <img src={activeProfile.avatar} alt={activeProfile.name} className="w-full h-full object-cover rounded-full grayscale-[0.2]" />
          </motion.div>
          <div className="space-y-4">
            <h1 className="font-display text-4xl md:text-6xl text-gradient-gold uppercase">{activeProfile.name}</h1>
            <p className="text-onyx-white italic text-xl">{activeProfile.tagline}</p>
            <p className="text-onyx-gray text-[0.8rem] tracking-[0.3em] uppercase font-ornament">{activeProfile.bio}</p>
          </div>
        </header>
        <nav className="space-y-6">
          {activeProfile.links.map((link: any, idx: number) => (
            <motion.a
              key={link.id}
              href={link.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className="glass-card shimmer-trigger block p-6 md:p-8 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-onyx-gold group-hover:scale-110 transition-transform duration-500">{link.icon}</div>
                  <div className="space-y-1">
                    <h3 className="font-ornament text-onyx-gold text-lg tracking-widest uppercase">{link.title}</h3>
                    <p className="text-onyx-gray text-sm line-clamp-1">{link.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-onyx-gray/40 group-hover:text-onyx-gold transition-all duration-300" />
              </div>
            </motion.a>
          ))}
        </nav>
        <footer className="pt-12 text-center space-y-8">
            <div className="font-ornament text-onyx-gold-dark tracking-[0.6em] text-lg opacity-40">◆ ONYXBIO ◆</div>
        </footer>
      </main>
    </div>
  );
}