import React, { useMemo } from 'react';
import { useProfile } from '@/store/useProfile';
import { cn } from '@/lib/utils';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
import { ICON_OPTIONS, SYSTEM_FONTS, GOOGLE_FONTS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { ShoppingCart, Play, Lock } from 'lucide-react';
export function ProfilePreview() {
  const name = useProfile(s => s.name);
  const tagline = useProfile(s => s.tagline);
  const avatar = useProfile(s => s.avatar);
  const links = useProfile(s => s.links);
  const socials = useProfile(s => s.socials);
  const appearance = useProfile(s => s.appearance);
  const activeFont = useMemo(() => {
    const all = [...SYSTEM_FONTS, ...GOOGLE_FONTS];
    return all.find(f => f.id === appearance.fontPairId) || all[0];
  }, [appearance.fontPairId]);
  const canvasStyle = useMemo(() => {
    const style: React.CSSProperties = {
      backgroundColor: appearance.bgColor,
      fontFamily: activeFont.family
    };
    if (appearance.bgType === 'gradient') {
      const stops = appearance.bgGradient.stops.map(s => `${s.color} ${s.offset}%`).join(', ');
      style.background = `linear-gradient(${appearance.bgGradient.angle}deg, ${stops})`;
    }
    return style;
  }, [appearance, activeFont]);
  const activeSocials = Object.entries(socials).filter(([k, v]) => v && k !== 'position');
  return (
    <div className="sticky top-24 w-full max-w-[320px] mx-auto group">
      <div className="relative aspect-[9/19] bg-onyx-dark rounded-[3rem] p-3 border-[8px] border-black shadow-2xl overflow-hidden">
        <div
          className="w-full h-full rounded-[2.2rem] relative overflow-y-auto overflow-x-hidden py-10 px-5 flex flex-col items-center border border-white/5 scrollbar-hide"
          style={canvasStyle}
        >
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <LuxuryBackground pattern={appearance.bgPattern} palettePrimary={appearance.colors.accent} />
          </div>
          {/* Top Socials Preview */}
          {(appearance.layout.socialPosition === 'top' || appearance.layout.socialPosition === 'both') && activeSocials.length > 0 && (
             <div className="mb-6 flex gap-2 p-1.5 rounded-full bg-black/20 border border-white/10 z-10">
                {activeSocials.slice(0, 3).map(([key]) => <div key={key} className="w-2.5 h-2.5 rounded-full bg-white/40" />)}
             </div>
          )}
          <div
            className="w-20 h-20 overflow-hidden mb-6 relative z-10 shadow-lg shrink-0"
            style={{
              borderRadius: appearance.layout.avatarShape === 'circle' ? '50%' : appearance.layout.avatarShape === 'rounded' ? '24%' : '0%',
              borderColor: appearance.layout.avatarBorderColor,
              borderWidth: `${appearance.layout.avatarBorderWidth}px`,
              borderStyle: 'solid'
            }}
          >
            <img src={avatar} className="w-full h-full object-cover" alt="Preview" />
          </div>
          <div className="text-center relative z-10 space-y-1 mb-8 w-full" style={{ color: appearance.colors.profileText }}>
            <h2 className="text-xl font-bold uppercase tracking-tight leading-tight">{name || 'NAME'}</h2>
            <p className="text-[9px] italic font-serif opacity-70">{tagline}</p>
          </div>
          <div className="w-full relative z-10 flex flex-col mb-10" style={{ gap: `${appearance.layout.buttonSpacing / 4}px` }}>
            {links.filter(l => l.active).slice(0, 6).map((link) => (
              <div
                key={link.id}
                className={cn(
                  "w-full flex items-center p-2.5 text-[9px] font-bold uppercase tracking-widest transition-all",
                  appearance.buttonShape === 'sharp' ? 'rounded-none' :
                  appearance.buttonShape === 'rounded' ? 'rounded-xl' : 'rounded-full'
                )}
                style={{
                  backgroundColor: appearance.buttonStyle === 'fill' ? appearance.colors.btnFill : 'transparent',
                  color: appearance.colors.btnText,
                  borderColor: appearance.colors.btnBorder,
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              >
                {link.type === 'commerce' ? <ShoppingCart className="w-2.5 h-2.5 mr-2" /> : link.type === 'widget' ? <Play className="w-2.5 h-2.5 mr-2" /> : <div className="w-2.5 h-2.5 bg-current/20 rounded-full mr-2" />}
                <span className="truncate">{link.title}</span>
              </div>
            ))}
          </div>
          {/* Bottom Socials Preview */}
          {(appearance.layout.socialPosition === 'bottom' || appearance.layout.socialPosition === 'both') && activeSocials.length > 0 && (
            <div className="mt-auto relative z-10 pb-4">
              <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
                {activeSocials.slice(0, 4).map(([key]) => <div key={key} className="w-2.5 h-2.5 rounded-full bg-white/40" />)}
              </div>
            </div>
          )}
          {!appearance.layout.hideBranding && (
            <div className="mt-4 text-[7px] uppercase tracking-widest opacity-20 text-center font-bold relative z-10">OnyxBio Pro</div>
          )}
        </div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20" />
      </div>
    </div>
  );
}