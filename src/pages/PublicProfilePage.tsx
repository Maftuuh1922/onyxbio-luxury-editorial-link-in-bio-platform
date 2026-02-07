import React, { useMemo, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
import { useProfile } from '@/store/useProfile';
import { cn } from '@/lib/utils';
import { ICON_OPTIONS, SYSTEM_FONTS, GOOGLE_FONTS } from '@/lib/constants';
const getSocialUrl = (platform: string, handle: string) => {
  if (!handle) return '#';
  if (handle.startsWith('http')) return handle;
  const h = handle.replace(/^@/, '');
  switch (platform.toLowerCase()) {
    case 'instagram': return `https://instagram.com/${h}`;
    case 'twitter': return `https://twitter.com/${h}`;
    case 'linkedin': return `https://linkedin.com/in/${h}`;
    case 'youtube': return `https://youtube.com/@${h}`;
    case 'email': return `mailto:${h}`;
    case 'discord': return h.startsWith('https://') ? h : `https://discord.gg/${h}`;
    default: return h;
  }
};
export function PublicProfilePage() {
  const { username } = useParams();
  const name = useProfile(s => s.name);
  const tagline = useProfile(s => s.tagline);
  const bio = useProfile(s => s.bio);
  const avatar = useProfile(s => s.avatar);
  const links = useProfile(s => s.links);
  const socials = useProfile(s => s.socials);
  const appearance = useProfile(s => s.appearance);
  const customCode = useProfile(s => s.customCode);
  useEffect(() => {
    if (customCode.enabled && customCode.js) {
      try {
        const script = document.createElement('script');
        script.text = customCode.js;
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); };
      } catch (e) {
        console.error('Custom JS execution failed', e);
      }
    }
  }, [customCode]);
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
  if (!name && username?.toLowerCase() !== 'alexander') return <Navigate to="/" replace />;
  const buttonClass = cn(
    "relative flex items-center justify-between p-6 transition-all duration-300 group overflow-hidden",
    appearance.buttonShape === 'sharp' ? 'rounded-none' :
    appearance.buttonShape === 'rounded' ? 'rounded-xl' :
    appearance.buttonShape === 'extra' ? 'rounded-2xl' : 'rounded-full'
  );
  return (
    <div
      className="relative min-h-screen overflow-x-hidden flex flex-col items-center py-16 md:py-24"
      style={canvasStyle}
    >
      {customCode.enabled && customCode.css && <style>{customCode.css}</style>}
      {customCode.enabled && customCode.html && <div dangerouslySetInnerHTML={{ __html: customCode.html }} />}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LuxuryBackground pattern={appearance.bgPattern} palettePrimary={appearance.colors.accent} />
      </div>
      <main
        className="relative z-10 w-full px-6 space-y-16"
        style={{ maxWidth: `${appearance.layout.containerWidth}px` }}
      >
        <header className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-40 h-40 shadow-2xl transition-all overflow-hidden"
            style={{
              borderRadius: appearance.layout.avatarShape === 'circle' ? '50%' : appearance.layout.avatarShape === 'rounded' ? '20%' : '0%',
              border: `${appearance.layout.avatarBorderWidth}px solid ${appearance.layout.avatarBorderColor}`
            }}
          >
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4" style={{ color: appearance.colors.profileText }}>
            <h1 className="text-4xl md:text-6xl uppercase font-bold tracking-tight">{name}</h1>
            <p className="italic text-xl md:text-2xl opacity-90">{tagline}</p>
            <p className="text-xs tracking-[0.4em] uppercase font-ornament max-w-sm mx-auto leading-relaxed opacity-60">{bio}</p>
          </motion.div>
        </header>
        <nav style={{ gap: `${appearance.layout.buttonSpacing}px` }} className="flex flex-col">
          {links.filter(l => l.active).map((link, idx) => {
            const IconData = ICON_OPTIONS.find(i => i.id === link.icon) || ICON_OPTIONS[0];
            const Icon = IconData.icon;
            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className={buttonClass}
                style={{
                  backgroundColor: appearance.buttonStyle === 'fill' ? appearance.colors.btnFill : 'transparent',
                  color: appearance.colors.btnText,
                  borderColor: appearance.colors.btnBorder,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  boxShadow: appearance.buttonShadow === 'soft' ? '0 10px 30px rgba(0,0,0,0.1)' :
                             appearance.buttonShadow === 'hard' ? `6px 6px 0px ${appearance.colors.btnBorder}` : 'none'
                }}
              >
                <div className="flex items-center gap-6">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <div className="text-left">
                    <h3 className="font-bold text-lg tracking-widest uppercase">{link.title}</h3>
                    <p className="text-xs opacity-70">{link.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-40 transition-transform group-hover:translate-x-2" />
              </motion.a>
            );
          })}
        </nav>
        {(socials.position === 'bottom' || socials.position === 'both') && (
          <footer className="pt-20 flex flex-wrap justify-center gap-8 pb-20">
            {Object.entries(socials).filter(([k, v]) => v && k !== 'position').map(([key, value]) => {
              const iconKey = key === 'email' ? 'Mail' : key.charAt(0).toUpperCase() + key.slice(1);
              const IconData = ICON_OPTIONS.find(i => i.id === iconKey) || ICON_OPTIONS[0];
              const Icon = IconData.icon;
              return (
                <a
                  key={key}
                  href={getSocialUrl(key, value as string)}
                  target="_blank"
                  className="hover:scale-125 transition-transform"
                  style={{ color: appearance.colors.profileText }}
                >
                  <Icon className="w-6 h-6 opacity-80" />
                </a>
              );
            })}
          </footer>
        )}
      </main>
    </div>
  );
}