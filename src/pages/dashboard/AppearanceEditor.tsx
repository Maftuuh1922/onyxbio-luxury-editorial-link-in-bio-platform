import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, UserCircle, Check, Share2, Instagram, Twitter, Linkedin, Youtube, Mail, Globe, ArrowRight } from 'lucide-react';
import { useProfile } from '@/store/useProfile';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
const themes = [
  { id: 'onyx-gold', name: 'Onyx Gold', color: 'bg-[#c9a961]', desc: 'The signature luxury aesthetic.' },
  { id: 'silver-noir', name: 'Silver Noir', color: 'bg-[#a8a8a8]', desc: 'Minimalist monochrome elegance.' },
  { id: 'royal-emerald', name: 'Royal Emerald', color: 'bg-emerald-700', desc: 'Deep greens and vibrant accents.' },
] as const;
const iconMap: Record<string, any> = { Globe, Instagram, Mail, Twitter, Youtube, Linkedin };
export function AppearanceEditor() {
  const name = useProfile((s) => s.name);
  const tagline = useProfile((s) => s.tagline);
  const bio = useProfile((s) => s.bio);
  const links = useProfile((s) => s.links);
  const socials = useProfile((s) => s.socials);
  const appearance = useProfile((s) => s.appearance);
  const updateProfile = useProfile((s) => s.updateProfile);
  const updateAppearance = useProfile((s) => s.updateAppearance);
  const updateSocials = useProfile((s) => s.updateSocials);
  const themeColorClass = {
    'onyx-gold': 'text-onyx-gold',
    'silver-noir': 'text-onyx-gray',
    'royal-emerald': 'text-emerald-400'
  }[appearance.themeId] || 'text-onyx-gold';
  const previewFontClass = {
    'editorial': 'font-serif',
    'modern': 'font-sans',
    'classic': 'font-serif'
  }[appearance.fontPairId] || 'font-serif';
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-12">
          <header>
            <h1 className="font-display text-3xl text-onyx-white uppercase tracking-wider">Appearance</h1>
            <p className="text-onyx-gray font-serif italic">Refine your digital fingerprint.</p>
          </header>
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-onyx-gold mb-2">
              <UserCircle className="w-5 h-5" />
              <h3 className="font-ornament text-xs tracking-[0.3em] uppercase">Profile Identity</h3>
            </div>
            <div className="grid grid-cols-1 gap-6 glass-card p-6 border-white/5">
              <div className="space-y-2"><Label className="text-[10px] uppercase tracking-widest text-onyx-gray">Name</Label><Input value={name} onChange={(e) => updateProfile({ name: e.target.value })} className="bg-white/5 border-white/10 rounded-none focus:ring-onyx-gold/40" /></div>
              <div className="space-y-2"><Label className="text-[10px] uppercase tracking-widest text-onyx-gray">Tagline</Label><Input value={tagline} onChange={(e) => updateProfile({ tagline: e.target.value })} className="bg-white/5 border-white/10 rounded-none focus:ring-onyx-gold/40" /></div>
              <div className="space-y-2"><Label className="text-[10px] uppercase tracking-widest text-onyx-gray">Bio</Label><Textarea value={bio} onChange={(e) => updateProfile({ bio: e.target.value })} className="bg-white/5 border-white/10 rounded-none min-h-[100px] focus:ring-onyx-gold/40" /></div>
            </div>
          </section>
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-onyx-gold mb-2">
              <Share2 className="w-5 h-5" />
              <h3 className="font-ornament text-xs tracking-[0.3em] uppercase">Social Connections</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 glass-card p-6 border-white/5">
              {Object.entries(socials).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-onyx-gray capitalize">{key}</Label>
                  <Input value={value} onChange={(e) => updateSocials({ [key]: e.target.value })} placeholder={`@${key}`} className="bg-white/5 border-white/10 rounded-none focus:ring-onyx-gold/40" />
                </div>
              ))}
            </div>
          </section>
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-onyx-gold mb-2">
              <Palette className="w-5 h-5" />
              <h3 className="font-ornament text-xs tracking-[0.3em] uppercase">Themes</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <button key={theme.id} onClick={() => updateAppearance({ themeId: theme.id })} className={cn("glass-card p-4 border-white/5 text-left transition-all", appearance.themeId === theme.id ? "ring-2 ring-onyx-gold bg-onyx-gold/5 border-onyx-gold/40" : "hover:border-white/20")}>
                  <div className={cn("w-full h-16 mb-4 rounded border border-white/10", theme.color)} />
                  <div className="flex items-center justify-between">
                    <span className="font-ornament text-[10px] tracking-widest uppercase text-onyx-white block">{theme.name}</span>
                    {appearance.themeId === theme.id && <Check className="w-3 h-3 text-onyx-gold" />}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
        <div className="hidden lg:block lg:col-span-5 relative">
          <div className="sticky top-24 border border-white/10 rounded-[3rem] p-4 bg-onyx-dark shadow-[0_0_50px_-12px_rgba(201,169,97,0.15)] overflow-hidden aspect-[9/18.5]">
            <div className={cn("w-full h-full rounded-[2.5rem] bg-onyx-dark relative overflow-y-auto overflow-x-hidden flex flex-col items-center py-10 px-6 border border-white/5", previewFontClass)}>
                <div className="absolute inset-0 bg-onyx-gold/5 blur-[80px]" />
                <div className="w-20 h-20 rounded-full border border-white/20 p-1 mb-4 relative z-10"><div className="w-full h-full bg-onyx-secondary rounded-full overflow-hidden"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop" className="w-full h-full object-cover" /></div></div>
                <h2 className={cn("text-lg font-display uppercase text-center relative z-10", themeColorClass)}>{name || 'NAME'}</h2>
                <p className="text-[10px] italic text-onyx-white/80 text-center relative z-10 mb-6">{tagline || 'Your tagline here'}</p>
                <div className="w-full space-y-3 relative z-10 mb-8">
                  {links.filter(l => l.active).slice(0, 4).map((link) => {
                    const Icon = iconMap[link.icon] || Globe;
                    return (
                      <div key={link.id} className="w-full bg-white/5 border border-white/10 flex items-center p-3 rounded-none">
                        <Icon className={cn("w-3 h-3 mr-3", themeColorClass)} />
                        <span className="text-[9px] font-ornament uppercase tracking-widest text-onyx-white truncate">{link.title}</span>
                      </div>
                    );
                  })}
                  {links.filter(l => l.active).length === 0 && <div className="text-[8px] text-onyx-gray text-center italic py-4">No links active</div>}
                </div>
                <div className="flex gap-4 relative z-10 mt-auto pb-4">
                   {Object.entries(socials).filter(([_, v]) => v).slice(0, 4).map(([k]) => {
                     const platformIconName = k === 'email' ? 'Mail' : k.charAt(0).toUpperCase() + k.slice(1);
                     const Icon = iconMap[platformIconName] || Globe;
                     return <Icon key={k} className={cn("w-4 h-4 opacity-40", themeColorClass)} />
                   })}
                </div>
                <div className="text-[8px] tracking-[0.4em] text-onyx-gold-dark opacity-40 uppercase">◆ ONYXBIO ◆</div>
            </div>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-5 bg-onyx-dark rounded-full border border-white/5 z-20" />
          </div>
        </div>
      </div>
    </div>
  );
}