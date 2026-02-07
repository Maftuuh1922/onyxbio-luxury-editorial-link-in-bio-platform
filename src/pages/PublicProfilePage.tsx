import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Linkedin, Mail, Globe, Twitter, ArrowRight } from 'lucide-react';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
import { useAuth } from '@/store/useAuth';
import { useProfile } from '@/store/useProfile';
import { cn } from '@/lib/utils';
const iconMap: Record<string, any> = { Globe, Instagram, Mail, Twitter, Youtube, Linkedin };
export function PublicProfilePage() {
  const { username } = useParams();
  const currentUser = useAuth((s) => s.user);
  // Profile state from store
  const profileName = useProfile((s) => s.name);
  const profileTagline = useProfile((s) => s.tagline);
  const profileBio = useProfile((s) => s.bio);
  const profileAvatar = useProfile((s) => s.avatar);
  const profileLinks = useProfile((s) => s.links);
  const appearance = useProfile((s) => s.appearance);
  const isOwnProfile = currentUser?.username?.toLowerCase() === username?.toLowerCase();
  // If viewing own profile or specifically 'alexander' (mocked)
  // In a real app, you'd fetch by username
  const activeProfile = isOwnProfile ? {
    name: profileName,
    tagline: profileTagline,
    bio: profileBio,
    avatar: profileAvatar,
    links: profileLinks.filter(l => l.active),
    appearance: appearance
  } : null;
  if (!activeProfile && username !== 'alexander') {
    return <Navigate to="/" replace />;
  }
  // Fallback to static mock if not own profile
  const displayProfile = activeProfile || {
    name: "ALEXANDER ONYX",
    tagline: "Visual Storyteller & Digital Architect",
    bio: "CREATIVE • INNOVATOR • DREAMER",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop",
    links: [
        { id: '1', title: 'PORTFOLIO', subtitle: 'View my latest creative projects', url: '#', icon: 'Globe' },
        { id: '2', title: 'INSTAGRAM', subtitle: 'Daily glimpses into my process', url: '#', icon: 'Instagram' },
        { id: '3', title: 'CONTACT', subtitle: 'Let’s build something together', url: '#', icon: 'Mail' },
    ],
    appearance: { themeId: 'onyx-gold', fontPairId: 'editorial' }
  };
  const themeClasses = {
    'onyx-gold': 'text-onyx-gold',
    'silver-noir': 'text-onyx-gray',
    'royal-emerald': 'text-emerald-400'
  }[displayProfile.appearance.themeId as 'onyx-gold' | 'silver-noir' | 'royal-emerald'];
  const fontClasses = {
    'editorial': 'font-serif',
    'modern': 'font-sans',
    'classic': 'font-serif'
  }[displayProfile.appearance.fontPairId as 'editorial' | 'modern' | 'classic'];
  return (
    <div className={cn("relative min-h-screen bg-onyx-dark text-onyx-white selection:bg-onyx-gold selection:text-onyx-dark overflow-x-hidden", fontClasses)}>
      <LuxuryBackground />
      <main className="relative z-10 max-w-[680px] mx-auto px-6 py-16 md:py-24 space-y-16">
        <header className="flex flex-col items-center text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className={cn("font-ornament text-2xl tracking-[0.5em]", themeClasses)}
          >
            ✦ ✦ ✦
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="relative w-[160px] h-[160px] rounded-full p-[3px] bg-white/10 backdrop-blur-md overflow-hidden border border-white/10"
          >
            <img 
                src={displayProfile.avatar} 
                alt={displayProfile.name} 
                className="w-full h-full object-cover rounded-full grayscale-[0.2]" 
            />
          </motion.div>
          <div className="space-y-4">
            <h1 className={cn("font-display text-4xl md:text-6xl uppercase", themeClasses === 'text-onyx-gold' ? 'text-gradient-gold' : themeClasses)}>
                {displayProfile.name}
            </h1>
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="glass-card shimmer-trigger block p-6 md:p-8 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={cn("group-hover:scale-110 transition-transform duration-500", themeClasses)}>
                        <Icon className="w-5 h-5" />
                    </div>
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
    </div>
  );
}