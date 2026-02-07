import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
import { useProfile } from '@/store/useProfile';
import { cn } from '@/lib/utils';
import { COLOR_PALETTES, ICON_OPTIONS, FONT_FAMILIES, BUTTON_SHAPES } from '@/lib/constants';
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
    default: return h;
  }
};
export function PublicProfilePage() {
  const { username } = useParams();
  const profileName = useProfile(s => s.name);
  const profileTagline = useProfile(s => s.tagline);
  const profileBio = useProfile(s => s.bio);
  const profileAvatar = useProfile(s => s.avatar);
  const profileLinks = useProfile(s => s.links);
  const socials = useProfile(s => s.socials);
  const appearance = useProfile(s => s.appearance);
  const displayProfile = useMemo(() => {
    if (username?.toLowerCase() === 'alexander') {
      return {
        name: "ALEXANDER ONYX",
        tagline: "Visual Storyteller & Digital Architect",
        bio: "ESTABLISHED IN • CREATIVE CURATION • DESIGNED TO INSPIRE",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop",
        links: [
          { id: '1', title: 'PORTFOLIO', subtitle: 'A collection of visual experiences', url: '#', icon: 'Globe', active: true },
          { id: '2', title: 'INSTAGRAM', subtitle: 'Behind the lens', url: '#', icon: 'Instagram', active: true },
          { id: '3', title: 'GET IN TOUCH', subtitle: 'Collaborative inquiries', url: '#', icon: 'Mail', active: true },
        ],
        socials: { instagram: 'alexander', twitter: 'alexander', linkedin: 'alexander', email: 'hello@alexander.bio', youtube: '' },
        appearance: { paletteId: 'imperial-gold', fontPairId: 'editorial', buttonShape: 'sharp', bgPattern: 'dust' }
      };
    }
    if (profileName) {
      return {
        name: profileName,
        tagline: profileTagline,
        bio: profileBio,
        avatar: profileAvatar,
        links: profileLinks.filter(l => l.active),
        socials: socials,
        appearance: appearance
      };
    }
    return null;
  }, [username, profileName, profileTagline, profileBio, profileAvatar, profileLinks, socials, appearance]);
  if (!displayProfile) return <Navigate to="/" replace />;
  const palette = COLOR_PALETTES.find(p => p.id === displayProfile.appearance.paletteId) || COLOR_PALETTES[0];
  const font = FONT_FAMILIES.find(f => f.id === displayProfile.appearance.fontPairId) || FONT_FAMILIES[0];
  const shape = BUTTON_SHAPES.find(b => b.id === displayProfile.appearance.buttonShape) || BUTTON_SHAPES[0];
  return (
    <div className={cn("relative min-h-screen bg-onyx-dark text-onyx-white selection:bg-onyx-gold selection:text-onyx-dark overflow-x-hidden", font.class)}>
      <LuxuryBackground pattern={displayProfile.appearance.bgPattern as any} palettePrimary={palette.primary} />
      <main className="relative z-10 max-w-[680px] mx-auto px-6 py-16 md:py-24 space-y-16 pb-40">
        <header className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-ornament text-2xl tracking-[0.5em]"
            style={{ color: palette.primary }}
          >
            ✦ ✦ ✦
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-[160px] h-[160px] rounded-full p-[3px] bg-white/10 backdrop-blur-md overflow-hidden border border-white/10"
          >
            <img src={displayProfile.avatar} alt={displayProfile.name} className="w-full h-full object-cover rounded-full grayscale-[0.2]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
            <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight" style={{ color: palette.primary }}>
              {displayProfile.name}
            </h1>
            <p className="text-onyx-white italic text-xl md:text-2xl font-serif">{displayProfile.tagline}</p>
            <p className="text-onyx-gray text-[0.8rem] tracking-[0.4em] uppercase font-ornament max-w-sm mx-auto leading-relaxed">{displayProfile.bio}</p>
          </motion.div>
        </header>
        <nav className="space-y-5">
          {displayProfile.links.map((link: any, idx: number) => {
            const IconData = ICON_OPTIONS.find(i => i.id === link.icon) || ICON_OPTIONS[0];
            const Icon = IconData.icon;
            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (idx * 0.1) }}
                className={cn("glass-card shimmer-trigger block p-6 md:p-8 group", shape.class)}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" style={{ color: palette.primary }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 text-left">
                      <h3 className="font-ornament text-lg tracking-widest uppercase transition-colors" style={{ color: palette.primary }}>{link.title}</h3>
                      <p className="text-onyx-gray text-xs md:text-sm line-clamp-1 opacity-70 group-hover:opacity-100">{link.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-onyx-gray/20 group-hover:translate-x-2 transition-all duration-300" style={{ color: palette.primary }} />
                </div>
              </motion.a>
            );
          })}
        </nav>
        <footer className="pt-20 text-center space-y-8 pb-10">
            <div className="font-ornament tracking-[0.8em] text-sm opacity-30 select-none" style={{ color: palette.primary }}>✦ ONYXBIO ◆</div>
        </footer>
      </main>
      {/* Floating Social Dock */}
      <motion.div
        initial={{ y: 100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="fixed bottom-10 left-1/2 z-[100]"
      >
        <div className={cn(
          "bg-onyx-dark/80 backdrop-blur-3xl border border-white/10 px-8 py-5 flex items-center gap-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden group",
          shape.class
        )}>
          {Object.entries(displayProfile.socials).map(([key, value]) => {
            if (!value) return null;
            const iconKey = key === 'email' ? 'Mail' : key.charAt(0).toUpperCase() + key.slice(1);
            const IconData = ICON_OPTIONS.find(i => i.id === iconKey) || ICON_OPTIONS[0];
            const Icon = IconData.icon;
            return (
              <a
                key={key}
                href={getSocialUrl(key, value as string)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 transition-all duration-300 hover:text-white relative z-10"
                style={{ color: palette.primary }}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}