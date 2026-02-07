import React, { useMemo } from 'react';
import { useProfile } from '@/store/useProfile';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
import { ICON_OPTIONS, SYSTEM_FONTS, GOOGLE_FONTS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { ShoppingCart, Play } from 'lucide-react';
export function ProfilePreview() {
  const name = useProfile(s => s.name);
  const tagline = useProfile(s => s.tagline);
  const avatar = useProfile(s => s.avatar);
  const links = useProfile(useShallow(s => s.links));
  const socials = useProfile(useShallow(s => s.socials));
  const appearance = useProfile(useShallow(s => s.appearance));
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
  const iconStyle = appearance.layout.socialIconStyle || 'minimal';
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
          {(appearance.layout.socialPosition === 'top' || appearance.layout.socialPosition === 'both') && activeSocials.length > 0 && (
             <div className={cn(
               "mb-6 flex gap-1.5 p-1.5 rounded-full z-10",
               iconStyle === 'bold' ? "bg-black/10" : "bg-black/20 border border-white/10"
             )}>
                {activeSocials.slice(0, 4).map(([key]) => (
                  <div key={key} className={cn(
                    "w-2.5 h-2.5 rounded-full",
                    iconStyle === 'bold' ? "bg-black/40" : "bg-white/40"
                  )} />
                ))}
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
          <div className="w-full relative z-10 flex flex-col mb-10" style={{
            gap: `${appearance.layout.buttonSpacing / 4}px`,
            maxWidth: `${(appearance.layout.containerWidth / 600) * 100}%`
          }}>
            {links.filter(l => l.active).slice(0, 8).map((link) => (
              <motion.div
                key={link.id}
                animate={link.featured ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn(
                  "w-full flex items-center p-2.5 text-[9px] font-bold uppercase tracking-widest transition-all relative overflow-hidden",
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
                {link.featured && (
                  <div className="absolute inset-0 bg-white/10 blur-sm pointer-events-none" />
                )}
                {link.type === 'commerce' ? <ShoppingCart className="w-2.5 h-2.5 mr-2" /> : link.type === 'widget' ? <Play className="w-2.5 h-2.5 mr-2" /> : <div className="w-2.5 h-2.5 bg-current/20 rounded-full mr-2" />}
                <span className="truncate relative z-10">{link.title}</span>
              </motion.div>
            ))}
          </div>
          {(appearance.layout.socialPosition === 'bottom' || appearance.layout.socialPosition === 'both') && activeSocials.length > 0 && (
            <div className="mt-auto relative z-10 pb-4">
              <div className={cn(
               "flex items-center gap-1.5 p-1.5 rounded-full backdrop-blur-md",
               iconStyle === 'bold' ? "bg-white/80" : "bg-black/20 border border-white/10"
              )}>
                {activeSocials.slice(0, 4).map(([key]) => (
                  <div key={key} className={cn(
                    "w-2.5 h-2.5 rounded-full",
                    iconStyle === 'bold' ? "bg-black/20" : "bg-white/40"
                  )} />
                ))}
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