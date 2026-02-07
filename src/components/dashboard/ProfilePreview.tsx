import React, { useMemo } from 'react';
import { useProfile } from '@/store/useProfile';
import { cn } from '@/lib/utils';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
import { ICON_OPTIONS, SYSTEM_FONTS, GOOGLE_FONTS } from '@/lib/constants';
import { motion } from 'framer-motion';
export function ProfilePreview() {
  const name = useProfile(s => s.name);
  const tagline = useProfile(s => s.tagline);
  const avatar = useProfile(s => s.avatar);
  const bio = useProfile(s => s.bio);
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
          <motion.div 
            className="w-20 h-20 overflow-hidden mb-6 relative z-10 shadow-lg"
            style={{
              borderRadius: appearance.layout.avatarShape === 'circle' ? '50%' : appearance.layout.avatarShape === 'rounded' ? '24%' : '0%',
              borderColor: appearance.layout.avatarBorderColor,
              borderWidth: `${appearance.layout.avatarBorderWidth}px`,
              borderStyle: 'solid'
            }}
          >
            <img src={avatar} className="w-full h-full object-cover" alt="Preview" />
          </motion.div>
          <div className="text-center relative z-10 space-y-2 mb-10 w-full" style={{ color: appearance.colors.profileText }}>
            <h2 className="text-xl font-bold uppercase tracking-tight">{name || 'NAME'}</h2>
            <p className="text-[10px] italic font-serif opacity-80">{tagline}</p>
          </div>
          <div className="w-full relative z-10 space-y-3 mb-12">
            {links.filter(l => l.active).slice(0, 5).map((link) => {
              const IconData = ICON_OPTIONS.find(i => i.id === link.icon) || ICON_OPTIONS[0];
              const Icon = IconData.icon;
              return (
                <div
                  key={link.id}
                  className={cn(
                    "w-full flex items-center p-3 text-[10px] font-bold uppercase tracking-widest",
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
                  <Icon className="w-3 h-3 mr-3" />
                  <span className="truncate">{link.title}</span>
                </div>
              );
            })}
          </div>
          {/* Social Dock Preview */}
          {activeSocials.length > 0 && (
            <div className="mt-auto relative z-10">
              <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
                {activeSocials.slice(0, 4).map(([key]) => {
                  const iconKey = key === 'email' ? 'Mail' : key.charAt(0).toUpperCase() + key.slice(1);
                  const IconData = ICON_OPTIONS.find(i => i.id === iconKey) || ICON_OPTIONS[0];
                  const Icon = IconData.icon;
                  return <Icon key={key} className="w-3 h-3 text-white/60" />;
                })}
              </div>
            </div>
          )}
        </div>
        {/* Dynamic Frame Pulse */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20" />
      </div>
    </div>
  );
}