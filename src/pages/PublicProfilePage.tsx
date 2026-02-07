import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Linkedin, Mail, Globe, Twitter, ArrowRight } from 'lucide-react';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
import { useProfile } from '@/store/useProfile';
import { cn } from '@/lib/utils';
const iconMap: Record<string, any> = {
  Globe,
  Instagram,
  Mail,
  Twitter,
  Youtube,
  Linkedin,
  Email: Mail
};
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
  // ZUSTAND COMPLIANCE: One primitive per selector
  const profileName = useProfile(s => s.name);
  const profileTagline = useProfile(s => s.tagline);
  const profileBio = useProfile(s => s.bio);
  const profileAvatar = useProfile(s => s.avatar);
  const profileLinks = useProfile(s => s.links);
  const socials = useProfile(s => s.socials);
  const appearance = useProfile(s => s.appearance);
  const displayProfile = useMemo(() => {
    const isDemoProfile = username?.toLowerCase() === 'alexander';
    // If it's the demo profile "alexander", show pre-defined content
    if (isDemoProfile) {
      return {
        name: "ALEXANDER ONYX",
        tagline: "Visual Storyteller & Digital Architect",
        bio: "CREATIVE • INNOVATOR • DREAMER",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop",
        links: [
            { id: '1', title: 'PORTFOLIO', subtitle: 'View my latest creative projects', url: '#', icon: 'Globe', active: true },
            { id: '2', title: 'INSTAGRAM', subtitle: 'Daily glimpses into my process', url: '#', icon: 'Instagram', active: true },
            { id: '3', title: 'CONTACT', subtitle: 'Let’s build something together', url: '#', icon: 'Mail', active: true },
        ],
        socials: { instagram: 'alexander', twitter: 'alexander', linkedin: 'alexander', email: 'hello@alexander.bio', youtube: '' },
        appearance: { themeId: 'onyx-gold', fontPairId: 'editorial' }
      };
    }
    // Otherwise, show current store profile if it exists
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
  if (!displayProfile) {
    return <Navigate to="/" replace />;
  }
  const themeClasses = {
    'onyx-gold': 'text-onyx-gold',
    'silver-noir': 'text-onyx-gray',
    'royal-emerald': 'text-emerald-400'
  }[displayProfile.appearance.themeId as 'onyx-gold' | 'silver-noir' | 'royal-emerald'] ?? 'text-onyx-gold';
  const fontClasses = {
    'editorial': 'font-serif',
    'modern': 'font-sans',
    'classic': 'font-serif'
  }[displayProfile.appearance.fontPairId as 'editorial' | 'modern' | 'classic'] ?? 'font-serif';
  return (
    <div className={cn("relative min-h-screen bg-onyx-dark text-onyx-white selection:bg-onyx-gold selection:text-onyx-dark overflow-x-hidden", fontClasses)}>
      <LuxuryBackground />
      <main className="relative z-10 max-w-[680px] mx-auto px-6 py-16 md:py-24 space-y-16 pb-40">
        <header className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={cn("font-ornament text-2xl tracking-[0.5em]", themeClasses)}
          >
            ✦ ✦ ✦
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: 'spring' }}
            className="relative w-[160px] h-[160px] rounded-full p-[3px] bg-white/10 backdrop-blur-md overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            <img src={displayProfile.avatar} alt={displayProfile.name} className="w-full h-full object-cover rounded-full grayscale-[0.2]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className={cn("font-display text-4xl md:text-6xl uppercase tracking-tight", themeClasses === 'text-onyx-gold' ? 'text-gradient-gold' : themeClasses)}>
              {displayProfile.name}
            </h1>
            <p className="text-onyx-white italic text-xl md:text-2xl font-serif">{displayProfile.tagline}</p>
            <p className="text-onyx-gray text-[0.8rem] tracking-[0.4em] uppercase font-ornament max-w-sm mx-auto leading-relaxed">{displayProfile.bio}</p>
          </motion.div>
        </header>
        <nav className="space-y-5">
          {displayProfile.links.map((link: any, idx: number) => {
            const Icon = iconMap[link.icon] || Globe;
            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (idx * 0.1), duration: 0.5 }}
                className="glass-card shimmer-trigger block p-6 md:p-8 group hover:border-onyx-gold/40"
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-6">
                    <div className={cn("group-hover:scale-110 group-hover:rotate-6 transition-all duration-500", themeClasses)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className={cn("font-ornament text-lg tracking-widest uppercase transition-colors", themeClasses)}>{link.title}</h3>
                      <p className="text-onyx-gray text-xs md:text-sm line-clamp-1 opacity-70 group-hover:opacity-100">{link.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-onyx-gray/20 group-hover:text-onyx-gold group-hover:translate-x-2 transition-all duration-300" />
                </div>
              </motion.a>
            );
          })}
        </nav>
        <footer className="pt-20 text-center space-y-8 pb-10">
            <div className={cn("font-ornament tracking-[0.8em] text-sm opacity-30 select-none", themeClasses)}>✦ ONYXBIO ◆</div>
        </footer>
      </main>
      {/* Floating Social Dock */}
      <motion.div
        initial={{ y: 100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{
          delay: 1.2,
          duration: 1.2,
          type: 'spring',
          stiffness: 100,
          damping: 20
        }}
        className="fixed bottom-10 left-1/2 z-[100]"
      >
        <div className="bg-onyx-dark/80 backdrop-blur-3xl border border-white/10 px-8 py-5 rounded-full flex items-center gap-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-onyx-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          {Object.entries(displayProfile.socials).map(([key, value]) => {
            if (!value) return null;
            const platformIconName = key === 'email' ? 'Mail' : key.charAt(0).toUpperCase() + key.slice(1);
            const Icon = iconMap[platformIconName] || Globe;
            return (
              <a
                key={key}
                href={getSocialUrl(key, value as string)}
                target="_blank"
                rel="noopener noreferrer"
                title={key}
                className={cn("hover:scale-125 transition-all duration-300 hover:text-onyx-gold-light relative z-10 active:scale-95", themeClasses)}
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