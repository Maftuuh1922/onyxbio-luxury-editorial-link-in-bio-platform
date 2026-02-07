import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { useProfile } from '@/store/useProfile';
import { ICON_OPTIONS } from '@/lib/constants';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useShallow } from 'zustand/react/shallow';
interface SocialDockProps {
  forceVisible?: boolean;
}
export function SocialDock({ forceVisible = false }: SocialDockProps) {
  const socials = useProfile(useShallow(s => s.socials));
  const appearance = useProfile(useShallow(s => s.appearance));
  const accentColor = appearance.colors.accent;
  const iconStyle = appearance.layout.socialIconStyle || 'minimal';
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    if (forceVisible) {
      setIsVisible(true);
      return;
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, forceVisible]);
  const activeSocials = Object.entries(socials).filter(
    ([key, value]) => value && key !== 'position'
  );
  const getSocialUrl = (platform: string, handle: string) => {
    const maps: Record<string, string> = {
      instagram: `https://instagram.com/${handle}`,
      twitter: `https://twitter.com/${handle}`,
      tiktok: `https://tiktok.com/@${handle}`,
      youtube: `https://youtube.com/@${handle}`,
      linkedin: `https://linkedin.com/in/${handle}`,
      threads: `https://threads.net/@${handle}`,
      snapchat: `https://snapchat.com/add/${handle}`,
      discord: `https://discord.com/users/${handle}`,
      email: `mailto:${handle}`,
    };
    return maps[platform] || '#';
  };
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'OnyxBio Profile',
          text: 'Check out this curated digital space on OnyxBio.',
          url
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed', err);
        }
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard', {
        className: "font-karla font-bold"
      });
    }
  };
  if (activeSocials.length === 0) return null;
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={forceVisible ? { opacity: 0 } : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={forceVisible ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className={cn(
            "z-50 px-4",
            !forceVisible && "fixed bottom-8 left-1/2 -translate-x-1/2"
          )}
        >
          <div className={cn(
            "flex items-center gap-1 p-2 rounded-full transition-all duration-300",
            iconStyle === 'minimal' && "bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl",
            iconStyle === 'glass' && "bg-white/5 backdrop-blur-md border border-white/20 shadow-xl",
            iconStyle === 'bold' && "bg-white border border-white shadow-2xl"
          )}>
            {activeSocials.map(([key, handle], index) => {
              let iconId = key.charAt(0).toUpperCase() + key.slice(1);
              if (key === 'email') iconId = 'Mail';
              if (key === 'tiktok') iconId = 'TikTok';
              const IconData = ICON_OPTIONS.find(i => i.id === iconId) || ICON_OPTIONS.find(i => i.id === 'Globe');
              const Icon = IconData?.icon || Share2;
              return (
                <motion.a
                  key={key}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  href={getSocialUrl(key, handle as string)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all relative group",
                    iconStyle === 'bold' ? "text-black hover:text-black/70" : "text-white/70 hover:text-white"
                  )}
                  aria-label={key}
                >
                  <Icon className="w-5 h-5 relative z-10" />
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 blur-md z-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  {iconStyle === 'glass' && (
                    <div className="absolute inset-0 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors" />
                  )}
                </motion.a>
              );
            })}
            <div className={cn(
              "w-px h-6 mx-2",
              iconStyle === 'bold' ? "bg-black/10" : "bg-white/10"
            )} />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                iconStyle === 'bold' ? "bg-black/5 text-black hover:bg-black/10" : "bg-white/5 text-white hover:bg-white/10"
              )}
              aria-label="Share Profile"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}