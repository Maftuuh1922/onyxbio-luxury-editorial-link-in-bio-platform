import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Check, Copy } from 'lucide-react';
import { useProfile } from '@/store/useProfile';
import { ICON_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
export function SocialDock() {
  const socials = useProfile(s => s.socials);
  const accentColor = useProfile(s => s.appearance.colors.accent);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
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
  }, [lastScrollY]);
  const activeSocials = Object.entries(socials).filter(
    ([key, value]) => value && key !== 'position'
  );
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'OnyxBio Profile', url });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    }
  };
  if (activeSocials.length === 0) return null;
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4"
        >
          <div className="flex items-center gap-2 p-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {activeSocials.map(([key], index) => {
              const iconKey = key === 'email' ? 'Mail' : key.charAt(0).toUpperCase() + key.slice(1);
              const IconData = ICON_OPTIONS.find(i => i.id === iconKey) || ICON_OPTIONS[0];
              const Icon = IconData.icon;
              return (
                <motion.a
                  key={key}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.2, y: -4 }}
                  href="#" // In a real app, use getSocialUrl logic
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors relative group"
                >
                  <Icon className="w-5 h-5" />
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 blur-md"
                    style={{ backgroundColor: accentColor }}
                  />
                </motion.a>
              );
            })}
            <div className="w-px h-6 bg-white/10 mx-1" />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}