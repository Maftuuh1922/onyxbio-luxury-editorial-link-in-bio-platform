import React, { useMemo } from 'react';
import { useProfile } from '@/store/useProfile';
import { cn } from '@/lib/utils';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
import { ICON_OPTIONS, SYSTEM_FONTS, GOOGLE_FONTS } from '@/lib/constants';
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
  const buttonStyleObj = useMemo(() => {
    const styles: React.CSSProperties = {
      backgroundColor: appearance.buttonStyle === 'fill' ? appearance.colors.btnFill : 'transparent',
      color: appearance.colors.btnText,
      borderColor: appearance.colors.btnBorder,
      borderWidth: '1px',
      borderStyle: 'solid',
      marginBottom: `${appearance.layout.buttonSpacing}px`,
    };
    if (appearance.buttonShadow === 'soft') {
      styles.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    } else if (appearance.buttonShadow === 'hard') {
      styles.boxShadow = `4px 4px 0px ${appearance.colors.btnBorder}`;
    }
    return styles;
  }, [appearance]);
  const avatarStyles = useMemo(() => ({
    borderWidth: `${appearance.layout.avatarBorderWidth}px`,
    borderColor: appearance.layout.avatarBorderColor,
    borderRadius: appearance.layout.avatarShape === 'circle' ? '50%' : appearance.layout.avatarShape === 'rounded' ? '20%' : '0%',
  }), [appearance.layout]);
  return (
    <div className="sticky top-24 border border-white/10 rounded-[3rem] p-4 bg-onyx-dark shadow-[0_0_50px_-12px_rgba(201,169,97,0.15)] overflow-hidden aspect-[9/18.5] w-full max-w-[320px] mx-auto group">
      <div 
        className="w-full h-full rounded-[2.5rem] relative overflow-y-auto overflow-x-hidden flex flex-col items-center py-10 px-6 border border-white/5 transition-colors"
        style={{ backgroundColor: appearance.bgColor, fontFamily: activeFont.family }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <LuxuryBackground pattern={appearance.bgPattern} palettePrimary={appearance.colors.accent} />
        </div>
        {/* Avatar */}
        <div 
          className="w-20 h-20 overflow-hidden mb-4 relative z-10 transition-all shadow-xl"
          style={avatarStyles}
        >
          <img
            src={avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop"}
            className="w-full h-full object-cover"
            alt="Avatar Preview"
          />
        </div>
        {/* Identity */}
        <div className="text-center relative z-10 space-y-1 mb-8 w-full" style={{ color: appearance.colors.profileText }}>
          <h2 className="text-xl font-bold uppercase tracking-wider">{name || 'NAME'}</h2>
          <p className="text-[10px] italic opacity-80">{tagline || 'Your tagline here'}</p>
          {bio && <p className="text-[7px] tracking-[0.2em] uppercase font-ornament mt-2 leading-relaxed opacity-60">{bio}</p>}
        </div>
        {/* Links */}
        <div className="w-full relative z-10 mb-8">
          {links.filter(l => l.active).slice(0, 5).map((link) => {
            const IconData = ICON_OPTIONS.find(i => i.id === link.icon) || ICON_OPTIONS[0];
            const Icon = IconData.icon;
            return (
              <div
                key={link.id}
                className={cn(
                  "w-full flex items-center p-3 transition-all",
                  appearance.buttonShape === 'sharp' ? 'rounded-none' : 
                  appearance.buttonShape === 'rounded' ? 'rounded-xl' :
                  appearance.buttonShape === 'extra' ? 'rounded-2xl' : 'rounded-full'
                )}
                style={buttonStyleObj}
              >
                <Icon className="w-3 h-3 mr-3 shrink-0" />
                <span className="text-[9px] font-bold uppercase tracking-widest truncate">{link.title}</span>
              </div>
            );
          })}
        </div>
        {/* Social Dock */}
        {(socials.position === 'bottom' || socials.position === 'both') && (
          <div className="mt-auto flex items-center gap-4 relative z-10 pt-4" style={{ color: appearance.colors.profileText }}>
            {Object.entries(socials).filter(([k, v]) => v && k !== 'position').slice(0, 5).map(([k]) => {
              const iconKey = k === 'email' ? 'Mail' : k.charAt(0).toUpperCase() + k.slice(1);
              const IconData = ICON_OPTIONS.find(i => i.id === iconKey) || ICON_OPTIONS[0];
              const Icon = IconData.icon;
              return <Icon key={k} className="w-4 h-4 opacity-70" />
            })}
          </div>
        )}
      </div>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-5 bg-onyx-dark rounded-full border border-white/10 z-20" />
    </div>
  );
}