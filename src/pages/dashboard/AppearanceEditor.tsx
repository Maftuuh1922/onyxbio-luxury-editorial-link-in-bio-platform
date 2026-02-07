import React from 'react';
import { motion } from 'framer-motion';
import { Palette, UserCircle, Check, Share2, Type, Box, Wind } from 'lucide-react';
import { useProfile } from '@/store/useProfile';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProfilePreview } from '@/components/dashboard/ProfilePreview';
import { cn } from '@/lib/utils';
import { COLOR_PALETTES, FONT_FAMILIES, BUTTON_SHAPES, BG_PATTERNS } from '@/lib/constants';
export function AppearanceEditor() {
  const name = useProfile(s => s.name);
  const tagline = useProfile(s => s.tagline);
  const bio = useProfile(s => s.bio);
  const appearance = useProfile(s => s.appearance);
  const socials = useProfile(s => s.socials);
  const updateProfile = useProfile(s => s.updateProfile);
  const updateAppearance = useProfile(s => s.updateAppearance);
  const updateSocials = useProfile(s => s.updateSocials);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Editor Side */}
          <div className="lg:col-span-7 space-y-12">
            <header>
              <h1 className="font-display text-4xl text-onyx-white uppercase tracking-wider">Atmosphere</h1>
              <p className="text-onyx-gray font-serif italic text-lg">Curate your digital fingerprint.</p>
            </header>
            {/* Profile Identity */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-onyx-gold mb-2">
                <UserCircle className="w-5 h-5" />
                <h3 className="font-ornament text-xs tracking-[0.3em] uppercase">Identity</h3>
              </div>
              <div className="grid grid-cols-1 gap-6 glass-card p-8 border-white/5">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-onyx-gray">Name</Label>
                  <Input value={name} onChange={(e) => updateProfile({ name: e.target.value })} className="bg-white/5 border-white/10 rounded-none h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-onyx-gray">Tagline</Label>
                  <Input value={tagline} onChange={(e) => updateProfile({ tagline: e.target.value })} className="bg-white/5 border-white/10 rounded-none h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-onyx-gray">Bio</Label>
                  <Textarea value={bio} onChange={(e) => updateProfile({ bio: e.target.value })} className="bg-white/5 border-white/10 rounded-none min-h-[100px]" />
                </div>
              </div>
            </section>
            {/* Typography */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-onyx-gold mb-2">
                <Type className="w-5 h-5" />
                <h3 className="font-ornament text-xs tracking-[0.3em] uppercase">Typography</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {FONT_FAMILIES.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => updateAppearance({ fontPairId: font.id as any })}
                    className={cn(
                      "glass-card p-6 border-white/5 text-left transition-all",
                      appearance.fontPairId === font.id ? "ring-2 ring-onyx-gold bg-onyx-gold/5 border-onyx-gold/40" : "hover:border-white/20"
                    )}
                  >
                    <span className={cn("block text-xl mb-1", font.class)}>Aa</span>
                    <span className="font-ornament text-[10px] tracking-widest uppercase text-onyx-white block">{font.name}</span>
                    <span className="text-[8px] text-onyx-gray uppercase mt-1">{font.desc}</span>
                  </button>
                ))}
              </div>
            </section>
            {/* Button Architecture */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-onyx-gold mb-2">
                <Box className="w-5 h-5" />
                <h3 className="font-ornament text-xs tracking-[0.3em] uppercase">Architecture</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {BUTTON_SHAPES.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => updateAppearance({ buttonShape: shape.id as any })}
                    className={cn(
                      "glass-card p-6 border-white/5 text-center transition-all",
                      appearance.buttonShape === shape.id ? "ring-2 ring-onyx-gold bg-onyx-gold/5 border-onyx-gold/40" : "hover:border-white/20"
                    )}
                  >
                    <div className={cn("w-full h-10 border border-white/20 mb-4 bg-white/5 flex items-center justify-center", shape.class)}>
                      <span className="text-[8px] uppercase tracking-widest">Sample</span>
                    </div>
                    <span className="font-ornament text-[10px] tracking-widest uppercase text-onyx-white">{shape.name}</span>
                  </button>
                ))}
              </div>
            </section>
            {/* Color Palette */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-onyx-gold mb-2">
                <Palette className="w-5 h-5" />
                <h3 className="font-ornament text-xs tracking-[0.3em] uppercase">Palettes</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {COLOR_PALETTES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => updateAppearance({ paletteId: p.id })}
                    className={cn(
                      "group flex flex-col items-center gap-3 transition-all",
                      appearance.paletteId === p.id ? "scale-105" : "opacity-60 hover:opacity-100"
                    )}
                  >
                    <div className="w-full aspect-square relative p-1 rounded-full border border-white/10 group-hover:border-white/30 transition-colors">
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: p.primary }} />
                      {appearance.paletteId === p.id && <div className="absolute inset-0 flex items-center justify-center"><Check className="w-4 h-4 text-black" /></div>}
                    </div>
                    <span className="text-[8px] uppercase tracking-tighter text-onyx-gray font-bold">{p.name}</span>
                  </button>
                ))}
              </div>
            </section>
            {/* Atmosphere (Background Pattern) */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-onyx-gold mb-2">
                <Wind className="w-5 h-5" />
                <h3 className="font-ornament text-xs tracking-[0.3em] uppercase">Atmosphere</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {BG_PATTERNS.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => updateAppearance({ bgPattern: pattern.id as any })}
                    className={cn(
                      "glass-card p-6 border-white/5 text-left transition-all",
                      appearance.bgPattern === pattern.id ? "ring-2 ring-onyx-gold bg-onyx-gold/5 border-onyx-gold/40" : "hover:border-white/20"
                    )}
                  >
                    <span className="font-ornament text-[10px] tracking-widest uppercase text-onyx-white block mb-1">{pattern.name}</span>
                    <span className="text-[9px] text-onyx-gray leading-tight block">{pattern.desc}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
          {/* Preview Side */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <ProfilePreview />
          </div>
        </div>
      </div>
    </div>
  );
}