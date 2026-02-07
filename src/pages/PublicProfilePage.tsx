import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Linkedin, Mail, Globe, Twitter, ArrowRight } from 'lucide-react';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
import { useAuth } from '@/store/useAuth';
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
  switch (platform.toLowerCase()) {
    case 'instagram': return `https://instagram.com/${handle}`;
    case 'twitter': return `https://twitter.com/${handle}`;
    case 'linkedin': return `https://linkedin.com/in/${handle}`;
    case 'youtube': return `https://youtube.com/@${handle}`;
    case 'email': return `mailto:${handle}`;
    default: return handle;
  }
};
export function PublicProfilePage() {
  const { username } = useParams();
  const currentUserUsername = useAuth((s) => s.user?.username);
  const profileName = useProfile((s) => s.name);
  const profileTagline = useProfile((s) => s.tagline);
  const profileBio = useProfile((s) => s.bio);
  const profileAvatar = useProfile((s) => s.avatar);
  const profileLinks = useProfile((s) => s.links);
  const socials = useProfile((s) => s.socials);
  const appearance = useProfile((s) => s.appearance);
  const isOwnProfile = currentUserUsername?.toLowerCase() === username?.toLowerCase();
  const isDemoProfile = username?.toLowerCase() === 'alexander';
  const profileSlug = profileName.toLowerCase().replace(/\s+/g, '');
  const isMatch = username?.toLowerCase() === profileSlug;
  const displayProfile = (isMatch || isOwnProfile) ? {
    name: profileName,
    tagline: profileTagline,
    bio: profileBio,
    avatar: profileAvatar,
    links: profileLinks.filter(l => l.active),
    socials: socials,
    appearance: appearance
  } : isDemoProfile ? {
    name: "ALEXANDER ONYX",
    tagline: "Visual Storyteller & Digital Architect",
    bio: "CREATIVE • INNOVATOR • DREAMER",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop",
    links: [
        { id: '1', title: 'PORTFOLIO', subtitle: 'View my latest creative projects', url: '#', icon: 'Globe' },
        { id: '2', title: 'INSTAGRAM', subtitle: 'Daily glimpses into my process', url: '#', icon: 'Instagram' },
        { id: '3', title: 'CONTACT', subtitle: 'Let’s build something together', url: '#', icon: 'Mail' },
    ],
    socials: { instagram: 'alexander', twitter: 'alexander', linkedin: 'alexander', email: 'hello@alexander.bio', youtube: '' },
    appearance: { themeId: 'onyx-gold', fontPairId: 'editorial' }
  } : null;
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
      <main className="relative z-10 max-w-[680px] mx-auto px-6 py-16 md:py-24 space-y-16 pb-32">
        <header className="flex flex-col items-center text-center space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("font-ornament text-2xl tracking-[0.5em]", themeClasses)}>✦ ✦ ✦</motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative w-[160px] h-[160px] rounded-full p-[3px] bg-white/10 backdrop-blur-md overflow-hidden border border-white/10">
            <img src={displayProfile.avatar} alt={displayProfile.name} className="w-full h-full object-cover rounded-full grayscale-[0.2]" />
          </motion.div>
          <div className="space-y-4">
            <h1 className={cn("font-display text-4xl md:text-6xl uppercase", themeClasses === 'text-onyx-gold' ? 'text-gradient-gold' : themeClasses)}>{displayProfile.name}</h1>
            <p className="text-onyx-white italic text-xl">{displayProfile.tagline}</p>
            <p className="text-onyx-gray text-[0.8rem] tracking-[0.3em] uppercase font-ornament">{displayProfile.bio}</p>
          </div>
        </header>
        <nav className="space-y-6">
          {displayProfile.links.map((link: any, idx: number) => {
            const Icon = iconMap[link.icon] || Globe;
            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="glass-card shimmer-trigger block p-6 md:p-8 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={cn("group-hover:scale-110 transition-transform duration-500", themeClasses)}><Icon className="w-5 h-5" /></div>
                    <div className="space-y-1">
                      <h3 className={cn("font-ornament text-lg tracking-widest uppercase", themeClasses)}>{link.title}</h3>
                      <p className="text-onyx-gray text-sm line-clamp-1">{link.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-onyx-gray/40 group-hover:text-onyx-gold transition-all duration-300" />
                </div>
              </motion.a>
            );
          })}
        </nav>
        <footer className="pt-12 text-center space-y-8">
            <div className={cn("font-ornament tracking-[0.6em] text-lg opacity-40", themeClasses)}>◆ ONYXBIO ◆</div>
        </footer>
      </main>
      {/* Enhanced Floating Social Dock */}
      <motion.div 
        initial={{ y: 100, x: '-50%' }} 
        animate={{ y: 0, x: '-50%' }} 
        transition={{ delay: 1, duration: 1, type: 'spring' }} 
        className="fixed bottom-8 left-1/2 z-[100]"
      >
        <div className="bg-onyx-dark/60 backdrop-blur-2xl border border-white/10 px-8 py-5 rounded-full flex items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-onyx-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
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
                className={cn("hover:scale-125 transition-all duration-300 hover:text-onyx-gold-light relative z-10", themeClasses)}
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