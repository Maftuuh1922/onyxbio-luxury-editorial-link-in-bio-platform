import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, UserCircle, Check } from 'lucide-react';
import { useProfile } from '@/store/useProfile';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
const themes = [
  { id: 'onyx-gold', name: 'Onyx Gold', color: 'bg-[#c9a961]', desc: 'The signature luxury aesthetic.' },
  { id: 'silver-noir', name: 'Silver Noir', color: 'bg-onyx-gray', desc: 'Minimalist monochrome elegance.' },
  { id: 'royal-emerald', name: 'Royal Emerald', color: 'bg-emerald-700', desc: 'Deep greens and vibrant accents.' },
] as const;
const fontPairs = [
  { id: 'editorial', name: 'Editorial', desc: 'Cinzel + Playfair + Cormorant' },
  { id: 'modern', name: 'Modern', desc: 'Inter + Playfair' },
  { id: 'classic', name: 'Classic', desc: 'Serif Focus' },
] as const;
export function AppearanceEditor() {
  const name = useProfile((s) => s.name);
  const tagline = useProfile((s) => s.tagline);
  const bio = useProfile((s) => s.bio);
  const appearance = useProfile((s) => s.appearance);
  const updateProfile = useProfile((s) => s.updateProfile);
  const updateAppearance = useProfile((s) => s.updateAppearance);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Editor Controls */}
        <div className="lg:col-span-7 space-y-12">
          <header>
            <h1 className="font-display text-3xl text-onyx-white uppercase tracking-wider">Appearance</h1>
            <p className="text-onyx-gray font-serif italic">Refine your digital fingerprint.</p>
          </header>
          {/* Profile Branding */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-onyx-gold mb-2">
              <UserCircle className="w-5 h-5" />
              <h3 className="font-ornament text-xs tracking-[0.3em] uppercase">Profile Identity</h3>
            </div>
            <div className="grid grid-cols-1 gap-6 glass-card p-6 border-white/5">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-onyx-gray">Display Name</Label>
                <Input 
                  value={name} 
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  className="bg-white/5 border-white/10 rounded-none focus-visible:ring-onyx-gold/50" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-onyx-gray">Tagline</Label>
                <Input 
                  value={tagline} 
                  onChange={(e) => updateProfile({ tagline: e.target.value })}
                  className="bg-white/5 border-white/10 rounded-none focus-visible:ring-onyx-gold/50" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-onyx-gray">Short Bio</Label>
                <Textarea 
                  value={bio} 
                  onChange={(e) => updateProfile({ bio: e.target.value })}
                  className="bg-white/5 border-white/10 rounded-none focus-visible:ring-onyx-gold/50 min-h-[80px]" 
                />
              </div>
            </div>
          </section>
          {/* Theme Gallery */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-onyx-gold mb-2">
              <Palette className="w-5 h-5" />
              <h3 className="font-ornament text-xs tracking-[0.3em] uppercase">Visual Themes</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => updateAppearance({ themeId: theme.id })}
                  className={cn(
                    "glass-card p-4 border-white/5 text-left transition-all",
                    appearance.themeId === theme.id ? "ring-2 ring-onyx-gold bg-onyx-gold/5 border-onyx-gold/40" : "hover:border-white/20"
                  )}
                >
                  <div className={cn("w-full h-24 mb-4 rounded border border-white/10", theme.color)} />
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-ornament text-[10px] tracking-widest uppercase text-onyx-white">{theme.name}</span>
                    {appearance.themeId === theme.id && <Check className="w-3 h-3 text-onyx-gold" />}
                  </div>
                  <p className="text-[10px] text-onyx-gray leading-relaxed font-serif italic">{theme.desc}</p>
                </button>
              ))}
            </div>
          </section>
          {/* Typography */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-onyx-gold mb-2">
              <Type className="w-5 h-5" />
              <h3 className="font-ornament text-xs tracking-[0.3em] uppercase">Typography Pairs</h3>
            </div>
            <div className="space-y-3">
              {fontPairs.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => updateAppearance({ fontPairId: pair.id })}
                  className={cn(
                    "w-full glass-card p-4 border-white/5 flex items-center justify-between transition-all",
                    appearance.fontPairId === pair.id ? "border-onyx-gold/40 bg-onyx-gold/5" : "hover:border-white/10"
                  )}
                >
                  <div>
                    <span className="font-ornament text-xs tracking-widest uppercase text-onyx-white">{pair.name}</span>
                    <p className="text-[10px] text-onyx-gray font-serif">{pair.desc}</p>
                  </div>
                  {appearance.fontPairId === pair.id && <Check className="w-4 h-4 text-onyx-gold" />}
                </button>
              ))}
            </div>
          </section>
        </div>
        {/* Live Preview (Simple Mock) */}
        <div className="hidden lg:block lg:col-span-5 relative">
          <div className="sticky top-24 border border-white/10 rounded-[2.5rem] p-4 bg-onyx-dark shadow-2xl overflow-hidden aspect-[9/19]">
            <div className="w-full h-full rounded-[1.8rem] bg-onyx-dark relative overflow-hidden flex flex-col items-center py-10 px-6 border border-white/5">
                <div className="absolute inset-0 bg-onyx-gold/5 blur-[80px]" />
                <div className="w-20 h-20 rounded-full border border-white/20 p-1 mb-6 relative z-10">
                   <div className="w-full h-full bg-onyx-secondary rounded-full" />
                </div>
                <h2 className="text-xl font-display text-onyx-gold uppercase text-center relative z-10 mb-2">{name || 'NAME'}</h2>
                <p className="text-xs italic text-onyx-white/80 text-center relative z-10 mb-8">{tagline || 'Tagline here'}</p>
                <div className="w-full space-y-3 relative z-10">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-full h-12 bg-white/5 border border-white/10 flex items-center px-4 rounded-sm">
                        <div className="w-4 h-4 bg-onyx-gold/20 mr-4" />
                        <div className="w-24 h-2 bg-white/10" />
                    </div>
                  ))}
                </div>
                <div className="mt-auto text-[8px] tracking-[0.4em] text-onyx-gold-dark opacity-40 uppercase">◆ ONYXBIO ◆</div>
            </div>
            {/* Phone Notch Mock */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-onyx-dark rounded-full border border-white/5 z-20" />
          </div>
        </div>
      </div>
    </div>
  );
}