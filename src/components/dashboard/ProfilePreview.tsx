import React, { useMemo } from 'react';
import { useProfile } from '@/store/useProfile';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
import { SYSTEM_FONTS, GOOGLE_FONTS } from '@/lib/constants';
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
    <div className="sticky top-24 w-full max-w-[340px] mx-auto group">
      {/* Phone Frame Container */}
      <div className="relative w-full aspect-[9/18.5] max-h-[720px] bg-[#0f0f0f] rounded-[3.2rem] p-3 border-[10px] border-[#1a1a1a] shadow-2xl overflow-hidden ring-1 ring-white/5">
        {/* Screen Content */}
        <div
          className="w-full h-full rounded-[2.2rem] relative overflow-y-auto overflow-x-hidden pt-12 pb-8 px-6 flex flex-col items-center border border-white/5 scrollbar-hide"
          style={canvasStyle}
        >
          {/* Background Layer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <LuxuryBackground 
              pattern={appearance.bgPattern} 
              palettePrimary={appearance.colors.accent} 
              previewMode 
            />
          </div>
          {/* Social Icons - Top */}
          {(appearance.layout.socialPosition === 'top' || appearance.layout.socialPosition === 'both') && activeSocials.length > 0 && (
             <div className={cn(
               "mb-8 flex gap-2 p-2 rounded-full z-10",
               iconStyle === 'bold' ? "bg-white shadow-sm" : "bg-black/20 backdrop-blur-md border border-white/10"
             )}>
                {activeSocials.slice(0, 4).map(([key]) => (
                  <div key={key} className={cn(
                    "w-3 h-3 rounded-full",
                    iconStyle === 'bold' ? "bg-black/20" : "bg-white/40"
                  )} />
                ))}
             </div>
          )}
          {/* Avatar Area */}
          <div
            className="w-24 h-24 overflow-hidden mb-6 relative z-10 shadow-xl shrink-0 transition-all duration-500"
            style={{
              borderRadius: appearance.layout.avatarShape === 'circle' ? '50%' : appearance.layout.avatarShape === 'rounded' ? '24%' : '0%',
              borderColor: appearance.layout.avatarBorderColor,
              borderWidth: `${appearance.layout.avatarBorderWidth}px`,
              borderStyle: 'solid'
            }}
          >
            <img src={avatar} className="w-full h-full object-cover" alt="Preview" />
          </div>
          {/* Identity Header */}
          <div className="text-center relative z-10 space-y-2 mb-10 w-full" style={{ color: appearance.colors.profileText }}>
            <h2 className="text-2xl font-bold uppercase tracking-tight leading-none break-words px-2">{name || 'NAME'}</h2>
            <p className="text-[10px] italic font-serif opacity-70 tracking-wide line-clamp-2">{tagline}</p>
          </div>
          {/* Links Nav */}
          <div className="w-full relative z-10 flex flex-col mb-12" style={{
            gap: `${appearance.layout.buttonSpacing / 3}px`
          }}>
            {links.filter(l => l.active).slice(0, 8).map((link) => (
              <motion.div
                key={link.id}
                animate={link.featured ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn(
                  "w-full flex items-center justify-center p-3 text-[10px] font-bold uppercase tracking-widest transition-all relative overflow-hidden text-center",
                  appearance.buttonShape === 'sharp' ? 'rounded-none' :
                  appearance.buttonShape === 'rounded' ? 'rounded-xl' : 'rounded-full'
                )}
                style={{
                  backgroundColor: appearance.buttonStyle === 'fill' ? appearance.colors.btnFill : 'transparent',
                  color: appearance.colors.btnText,
                  borderColor: appearance.colors.btnBorder,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  boxShadow: appearance.buttonShadow === 'hard' ? `4px 4px 0px ${appearance.colors.btnBorder}` : 'none'
                }}
              >
                {link.featured && (
                  <div className="absolute inset-0 bg-white/10 blur-sm pointer-events-none" />
                )}
                {link.type === 'commerce' ? (
                  <ShoppingCart className="w-3 h-3 mr-2" />
                ) : link.type === 'widget' ? (
                  <Play className="w-3 h-3 mr-2" />
                ) : (
                  <div className="w-1.5 h-1.5 bg-current/40 rounded-full mr-2" />
                )}
                <span className="truncate relative z-10 px-1">{link.title}</span>
              </motion.div>
            ))}
          </div>
          {/* Social Icons - Bottom */}
          {(appearance.layout.socialPosition === 'bottom' || appearance.layout.socialPosition === 'both') && activeSocials.length > 0 && (
            <div className="mt-auto relative z-10 pb-6">
              <div className={cn(
               "flex items-center gap-2 p-2 rounded-full backdrop-blur-md",
               iconStyle === 'bold' ? "bg-white shadow-sm" : "bg-black/30 border border-white/10"
              )}>
                {activeSocials.slice(0, 4).map(([key]) => (
                  <div key={key} className={cn(
                    "w-3 h-3 rounded-full",
                    iconStyle === 'bold' ? "bg-black/20" : "bg-white/40"
                  )} />
                ))}
              </div>
            </div>
          )}
          {/* Branding */}
          {!appearance.layout.hideBranding && (
            <div className="mt-2 text-[8px] uppercase tracking-[0.3em] opacity-30 text-center font-bold relative z-10">OnyxBio Pro</div>
          )}
        </div>
        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#0a0a0a] rounded-full z-20 border border-white/5 shadow-inner" />
      </div>
    </div>
  );
}