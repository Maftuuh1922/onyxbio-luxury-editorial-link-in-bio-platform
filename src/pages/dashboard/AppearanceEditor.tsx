import React from 'react';
import { motion } from 'framer-motion';
import { Palette, UserCircle, Check, Share2 } from 'lucide-react';
import { useProfile } from '@/store/useProfile';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProfilePreview } from '@/components/dashboard/ProfilePreview';
import { cn } from '@/lib/utils';
const themes = [
  { id: 'onyx-gold', name: 'Onyx Gold', color: 'bg-[#c9a961]', desc: 'The signature luxury aesthetic.' },
  { id: 'silver-noir', name: 'Silver Noir', color: 'bg-[#a8a8a8]', desc: 'Minimalist monochrome elegance.' },
  { id: 'royal-emerald', name: 'Royal Emerald', color: 'bg-emerald-700', desc: 'Deep greens and vibrant accents.' },
] as const;
export function AppearanceEditor() {
  const name = useProfile((s) => s.name);
  const tagline = useProfile((s) => s.tagline);
  const bio = useProfile((s) => s.bio);
  const socials = useProfile((s) => s.socials);
  const appearanceTheme = useProfile((s) => s.appearance.themeId);
  const updateProfile = useProfile((s) => s.updateProfile);
  const updateAppearance = useProfile((s) => s.updateAppearance);
  const updateSocials = useProfile((s) => s.updateSocials);
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
                <button key={theme.id} onClick={() => updateAppearance({ themeId: theme.id })} className={cn("glass-card p-4 border-white/5 text-left transition-all", appearanceTheme === theme.id ? "ring-2 ring-onyx-gold bg-onyx-gold/5 border-onyx-gold/40" : "hover:border-white/20")}>
                  <div className={cn("w-full h-16 mb-4 rounded border border-white/10", theme.color)} />
                  <div className="flex items-center justify-between">
                    <span className="font-ornament text-[10px] tracking-widest uppercase text-onyx-white block">{theme.name}</span>
                    {appearanceTheme === theme.id && <Check className="w-3 h-3 text-onyx-gold" />}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
        <div className="hidden lg:block lg:col-span-5 relative">
          <ProfilePreview />
        </div>
      </div>
    </div>
  );
}