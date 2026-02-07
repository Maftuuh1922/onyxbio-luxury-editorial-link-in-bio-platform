import React, { useMemo, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring, Variants } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
import { SocialDock } from '@/components/ui/SocialDock';
import { CommerceLink, WidgetLink, FeaturedWrapper } from '@/components/ui/LinkWidgets';
import { useProfile } from '@/store/useProfile';
import { cn, isLinkVisible } from '@/lib/utils';
import { Appearance } from '@/store/useProfile';
import { ICON_OPTIONS, SYSTEM_FONTS, GOOGLE_FONTS } from '@/lib/constants';
import { useShallow } from 'zustand/react/shallow';
export function PublicProfilePage() {
  const { username } = useParams();
  const name = useProfile(s => s.name);
  const tagline = useProfile(s => s.tagline);
  const bio = useProfile(s => s.bio);
  const avatar = useProfile(s => s.avatar);
  const links = useProfile(useShallow(s => s.links));
  const appearance = useProfile(useShallow(s => s.appearance)) as Appearance | undefined;
  const customCode = useProfile(useShallow(s => s.customCode));
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  useEffect(() => {
    if (name) document.title = `${name} | OnyxBio Pro`;
  }, [name]);
  const activeFont = useMemo(() => {
    if (!appearance?.fontPairId) return { family: 'serif' };
    const all = [...SYSTEM_FONTS, ...GOOGLE_FONTS];
    return all.find(f => f.id === appearance.fontPairId) || all[0];
  }, [appearance?.fontPairId]);
  const canvasStyle = useMemo(() => {
    if (!appearance || !activeFont) return { backgroundColor: 'transparent' };
    const style: React.CSSProperties = {
      backgroundColor: appearance.bgColor || 'transparent',
      fontFamily: activeFont.family || 'serif'
    };
    if (appearance.bgType === 'gradient' && appearance.bgGradient?.stops) {
      const stops = appearance.bgGradient.stops.map((s: any) => `${s.color || '#000'} ${s.offset || 0}%`).join(', ');
      style.background = `linear-gradient(${appearance.bgGradient?.angle || 0}deg, ${stops})`;
    }
    return style;
  }, [appearance, activeFont]);
  if (!name && username?.toLowerCase() !== 'alexander') return <Navigate to="/" replace />;
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4
      }
    }
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  const visibleLinks = useMemo(() => {
    return (links || []).filter(isLinkVisible);
  }, [links]);
  const accentColor = appearance?.colors?.accent || '#c9a961';
  return (
    <div className="relative min-h-screen selection:bg-white/20 overflow-x-hidden" style={canvasStyle}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 z-[100] origin-left shadow-lg"
        style={{ scaleX, backgroundColor: accentColor }}
      />
      {customCode?.enabled && customCode?.css && <style>{customCode.css}</style>}
      <div className="fixed inset-0 z-0">
        <LuxuryBackground
          pattern={appearance?.bgPattern}
          palettePrimary={accentColor}
        />
      </div>
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto px-6 py-24 md:py-32 flex flex-col items-center"
        style={{ maxWidth: `${appearance?.layout?.containerWidth || 680}px` }}
      >
        {(appearance?.layout?.socialPosition === 'top' || appearance?.layout?.socialPosition === 'both') && (
           <motion.div variants={itemVariants} className="mb-16">
             <SocialDock forceVisible />
           </motion.div>
        )}
        <motion.header
          variants={itemVariants}
          className="flex flex-col items-center text-center mb-24 w-full"
        >
          <div
            className="w-36 h-36 md:w-48 md:h-48 shadow-2xl overflow-hidden mb-12 ring-offset-8 ring-offset-transparent ring-1 transition-all duration-1000"
            style={{
              borderRadius: appearance?.layout?.avatarShape === 'circle' ? '50%' : appearance?.layout?.avatarShape === 'rounded' ? '24%' : '0%',
              borderColor: appearance?.layout?.avatarBorderColor || 'transparent',
              borderWidth: `${appearance?.layout?.avatarBorderWidth || 0}px`,
              borderStyle: 'solid'
            }}
          >
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-8 w-full px-4" style={{ color: appearance?.colors?.profileText || '#e8e8e8' }}>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none break-words">
              {name}
            </h1>
            <p className="text-xl md:text-2xl italic opacity-80 font-serif tracking-wide">
              {tagline}
            </p>
            <div className="w-20 h-px bg-current mx-auto opacity-30 my-10" />
            <p className="text-[11px] font-bold uppercase tracking-[0.5em] max-w-lg mx-auto leading-relaxed opacity-60">
              {bio}
            </p>
          </div>
        </motion.header>
        <motion.nav
          variants={containerVariants}
          className="w-full flex flex-col"
          style={{ gap: `${appearance?.layout?.buttonSpacing || 20}px` }}
        >
          {visibleLinks.map((link) => (
            <motion.div key={link.id} variants={itemVariants}>
              <FeaturedWrapper featured={link.featured}>
                {link.type === 'commerce' ? (
                  <CommerceLink link={link} appearance={appearance} />
                ) : link.type === 'widget' ? (
                  <WidgetLink link={link} appearance={appearance} />
                ) : (
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "relative group flex items-center justify-between p-7 transition-all duration-500 overflow-hidden",
                      appearance?.buttonShape === 'sharp' ? 'rounded-none' :
                      appearance?.buttonShape === 'rounded' ? 'rounded-2xl' : 'rounded-full'
                    )}
                    style={{
                      backgroundColor: appearance?.buttonStyle === 'fill' ? appearance?.colors?.btnFill : 'transparent',
                      color: appearance?.colors?.btnText || '#e8e8e8',
                      borderColor: appearance?.colors?.btnBorder || 'transparent',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      boxShadow: appearance?.buttonShadow === 'hard' ? `8px 8px 0px ${appearance?.colors?.btnBorder || 'transparent'}` : 'none'
                    }}
                  >
                    <div className="flex items-center gap-6 relative z-10">
                      <div className="w-6 h-6 flex items-center justify-center opacity-80">
                        {(() => {
                          const iconOption = ICON_OPTIONS.find(i => i.id === link.icon) ?? ICON_OPTIONS[0] ?? { icon: () => null };
                          const Icon = iconOption.icon;
                          return typeof Icon === 'function'
                            ? <Icon className="w-full h-full" />
                            : <Globe className="w-full h-full" />;
                        })()}
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-xl tracking-[0.1em] uppercase">{link.title}</h3>
                        <p className="text-[10px] uppercase tracking-widest opacity-60 font-medium mt-0.5">{link.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-20 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100" />
                  </motion.a>
                )}
              </FeaturedWrapper>
            </motion.div>
          ))}
        </motion.nav>
        {(appearance?.layout?.socialPosition === 'bottom' || appearance?.layout?.socialPosition === 'both') && (
           <motion.div variants={itemVariants} className="mt-16">
             <SocialDock />
           </motion.div>
        )}
        {!(appearance?.layout?.hideBranding ?? false) && (
          <motion.footer variants={itemVariants} className="mt-48 mb-24 text-center opacity-30">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] pointer-events-none">OnyxBio Pro Editorial</p>
          </motion.footer>
        )}
      </motion.main>
    </div>
  );
}