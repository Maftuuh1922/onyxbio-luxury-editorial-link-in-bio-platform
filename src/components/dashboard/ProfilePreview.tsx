import React, { useMemo } from 'react';
import { useProfile } from '@/store/useProfile';
import { useShallow } from 'zustand/react/shallow';
import { cn, isLinkVisible } from '@/lib/utils';
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
  const visibleLinks = useMemo(() => {
    return (links || []).filter(isLinkVisible).slice(0, 10);
  }, [links]);
  return (
    <div className="sticky top-24 w-full max-w-[360px] mx-auto group">
      {/* High-Fidelity Phone Frame: iPhone 15 Pro Ratio */}
      <div className="relative w-full aspect-[390/844] bg-[#0f0f0f] rounded-[3.5rem] p-3 border-[12px] border-[#1a1a1a] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10">
        {/* Screen Content Wrapper */}
        <div
          className="w-full h-full rounded-[2.5rem] relative overflow-hidden flex flex-col border border-white/5"
          style={canvasStyle}
        >
          {/* Background Layer - Full edge-to-edge */}
          <div className="absolute inset-0 pointer-events-none">
            <LuxuryBackground
              pattern={appearance.bgPattern}
              palettePrimary={appearance.colors.accent}
              previewMode
            />
          </div>
          {/* Scrolling Content Container */}
          <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide pt-16 pb-12 px-6 flex flex-col items-center">
            {/* Social Icons - Top Area */}
            {(appearance.layout.socialPosition === 'top' || appearance.layout.socialPosition === 'both') && activeSocials.length > 0 && (
               <div className={cn(
                 "mb-8 flex gap-2.5 p-2 rounded-full",
                 iconStyle === 'bold' ? "bg-white shadow-lg" : "bg-black/20 backdrop-blur-md border border-white/10"
               )}>
                  {activeSocials.slice(0, 4).map(([key]) => (
                    <div key={key} className={cn(
                      "w-3.5 h-3.5 rounded-full",
                      iconStyle === 'bold' ? "bg-black/10" : "bg-white/30"
                    )} />
                  ))}
               </div>
            )}
            {/* Avatar Architecture */}
            <div
              className="w-24 h-24 overflow-hidden mb-6 relative shadow-2xl shrink-0 transition-all duration-700"
              style={{
                borderRadius: appearance.layout.avatarShape === 'circle' ? '50%' : appearance.layout.avatarShape === 'rounded' ? '28%' : '0%',
                borderColor: appearance.layout.avatarBorderColor,
                borderWidth: `${appearance.layout.avatarBorderWidth}px`,
                borderStyle: 'solid'
              }}
            >
              <img src={avatar} className="w-full h-full object-cover" alt="Preview" />
            </div>
            {/* Identity Header */}
            <div className="text-center space-y-3 mb-10 w-full" style={{ color: appearance.colors.profileText }}>
              <h2 className="text-3xl font-bold uppercase tracking-tighter leading-none break-words px-2">{name || 'NAME'}</h2>
              <p className="text-[11px] italic font-serif opacity-80 tracking-wide line-clamp-3 leading-relaxed max-w-[200px] mx-auto">{tagline}</p>
            </div>
            {/* Links Ecosystem */}
            <div className="w-full flex flex-col mb-10" style={{
              gap: `${appearance.layout.buttonSpacing / 2}px`
            }}>
              {visibleLinks.map((link) => (
                <motion.div
                  key={link.id}
                  className={cn(
                    "w-full flex items-center justify-center p-4 text-[10px] font-bold uppercase tracking-[0.15em] transition-all relative overflow-hidden text-center",
                    appearance.buttonShape === 'sharp' ? 'rounded-none' :
                    appearance.buttonShape === 'rounded' ? 'rounded-2xl' : 'rounded-full'
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
                    <div className="absolute inset-0 bg-white/20 blur-md pointer-events-none" />
                  )}
                  <div className="flex items-center gap-2 relative z-10 px-2 truncate">
                    {link.type === 'commerce' ? <ShoppingCart className="w-3 h-3" /> : link.type === 'widget' ? <Play className="w-3 h-3" /> : null}
                    <span className="truncate">{link.title}</span>
                  </div>
                </motion.div>
              ))}
              {visibleLinks.length === 0 && (
                <div className="text-[10px] opacity-20 text-center py-4 font-bold uppercase tracking-widest border border-dashed border-white/20 rounded-xl">
                  No modules active
                </div>
              )}
            </div>
            {/* Social Icons - Bottom */}
            {(appearance.layout.socialPosition === 'bottom' || appearance.layout.socialPosition === 'both') && activeSocials.length > 0 && (
              <div className="mt-auto">
                <div className={cn(
                 "flex items-center gap-2.5 p-2 rounded-full backdrop-blur-md",
                 iconStyle === 'bold' ? "bg-white shadow-xl" : "bg-black/30 border border-white/10"
                )}>
                  {activeSocials.slice(0, 4).map(([key]) => (
                    <div key={key} className={cn(
                      "w-3.5 h-3.5 rounded-full",
                      iconStyle === 'bold' ? "bg-black/10" : "bg-white/30"
                    )} />
                  ))}
                </div>
              </div>
            )}
            {/* Branding Indicator */}
            {!appearance.layout.hideBranding && (
              <div className="mt-8 text-[8px] uppercase tracking-[0.5em] opacity-30 text-center font-bold">OnyxBio Pro</div>
            )}
          </div>
        </div>
        {/* Dynamic Island / Hardware Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#0a0a0a] rounded-[1rem] z-30 border border-white/5 shadow-inner flex items-center justify-end px-3">
           <div className="w-2 h-2 rounded-full bg-blue-500/20" />
        </div>
        {/* Home Indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/10 rounded-full z-30" />
      </div>
    </div>
  );
}