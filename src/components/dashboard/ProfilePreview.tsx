import React from 'react';
import { motion } from 'framer-motion';

import { Instagram, Youtube, Linkedin, Mail, Globe, Twitter } from 'lucide-react';
import { useProfile } from '@/store/useProfile';
import { cn } from '@/lib/utils';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
const iconMap: Record<string, any> = { 
  Globe, 
  Instagram, 
  Mail, 
  Twitter, 
  Youtube, 
  Linkedin,
  Email: Mail 
};
export function ProfilePreview() {
  const name = useProfile(s => s.name);
  const tagline = useProfile(s => s.tagline);
  const avatar = useProfile(s => s.avatar);
  const bio = useProfile(s => s.bio);
  const links = useProfile(s => s.links);
  const socials = useProfile(s => s.socials);
  const appearanceTheme = useProfile(s => s.appearance.themeId);
  const appearanceFont = useProfile(s => s.appearance.fontPairId);
  const themeColorClass = {
    'onyx-gold': 'text-onyx-gold',
    'silver-noir': 'text-onyx-gray',
    'royal-emerald': 'text-emerald-400'
  }[appearanceTheme] || 'text-onyx-gold';
  const previewFontClass = {
    'editorial': 'font-serif',
    'modern': 'font-sans',
    'classic': 'font-serif'
  }[appearanceFont] || 'font-serif';
  return (
    <div className="sticky top-24 border border-white/10 rounded-[3rem] p-4 bg-onyx-dark shadow-[0_0_50px_-12px_rgba(201,169,97,0.15)] overflow-hidden aspect-[9/18.5] w-full max-w-[320px] mx-auto group">
      <div className={cn("w-full h-full rounded-[2.5rem] bg-onyx-dark relative overflow-y-auto overflow-x-hidden flex flex-col items-center py-10 px-6 border border-white/5", previewFontClass)}>
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <LuxuryBackground />
        </div>
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full border border-white/20 p-1 mb-4 relative z-10 bg-white/5 backdrop-blur-sm">
          <div className="w-full h-full bg-onyx-secondary rounded-full overflow-hidden">
            <img 
              src={avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop"} 
              className="w-full h-full object-cover grayscale-[0.2]" 
              alt="Avatar Preview" 
            />
          </div>
        </div>
        {/* Identity */}
        <div className="text-center relative z-10 space-y-2 mb-8">
          <div className={cn("font-ornament text-[8px] tracking-[0.4em] mb-1 opacity-60", themeColorClass)}>✦ ✦ ✦</div>
          <h2 className={cn("text-xl font-display uppercase tracking-wider", themeColorClass)}>{name || 'NAME'}</h2>
          <p className="text-[10px] italic text-onyx-white/90">{tagline || 'Your tagline here'}</p>
          {bio && <p className="text-[7px] tracking-[0.2em] uppercase font-ornament text-onyx-gray mt-2">{bio}</p>}
        </div>
        {/* Links */}
        <div className="w-full space-y-3 relative z-10 mb-8">
          {links.filter(l => l.active).slice(0, 6).map((link) => {
            const Icon = iconMap[link.icon] || Globe;
            return (
              <div 
                key={link.id} 
                className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 flex items-center p-3 rounded-none transition-colors hover:bg-white/[0.08]"
              >
                <Icon className={cn("w-3 h-3 mr-3", themeColorClass)} />
                <span className="text-[9px] font-ornament uppercase tracking-widest text-onyx-white truncate">{link.title}</span>
              </div>
            );
          })}
        </div>
        {/* Socials & Brand */}
        <div className="flex gap-4 relative z-10 mt-auto pb-4">
          {Object.entries(socials).filter(([_, v]) => v).slice(0, 5).map(([k]) => {
            const platformIconName = k === 'email' ? 'Mail' : k.charAt(0).toUpperCase() + k.slice(1);
            const Icon = iconMap[platformIconName] || Globe;
            return <Icon key={k} className={cn("w-4 h-4 opacity-40 hover:opacity-100 transition-opacity", themeColorClass)} />
          })}
        </div>
        <div className="text-[8px] tracking-[0.4em] text-onyx-gold-dark opacity-30 uppercase relative z-10">◆ ONYXBIO ◆</div>
      </div>
      {/* Device Notch */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-5 bg-onyx-dark rounded-full border border-white/10 z-20" />
    </div>
  );
}