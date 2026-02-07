import React, { useMemo, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
import { SocialDock } from '@/components/ui/SocialDock';
import { useProfile } from '@/store/useProfile';
import { cn } from '@/lib/utils';
import { ICON_OPTIONS, SYSTEM_FONTS, GOOGLE_FONTS } from '@/lib/constants';
export function PublicProfilePage() {
  const { username } = useParams();
  const name = useProfile(s => s.name);
  const tagline = useProfile(s => s.tagline);
  const bio = useProfile(s => s.bio);
  const avatar = useProfile(s => s.avatar);
  const links = useProfile(s => s.links);
  const appearance = useProfile(s => s.appearance);
  const customCode = useProfile(s => s.customCode);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  useEffect(() => {
    if (name) document.title = `${name} | OnyxBio`;
  }, [name]);
  useEffect(() => {
    if (customCode.enabled && customCode.js) {
      try {
        const script = document.createElement('script');
        script.text = customCode.js;
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); };
      } catch (e) { console.error('JS Execution failed', e); }
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
  // Ensure mock data displays for demonstration if profile state is fresh/matching demo
  const isDemo = username?.toLowerCase() === 'alexander' || !name;
  if (!name && username?.toLowerCase() !== 'alexander') return <Navigate to="/" replace />;
  return (
    <div className="relative min-h-screen selection:bg-white/20 overflow-x-hidden" style={canvasStyle}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 z-[100] origin-left shadow-lg"
        style={{ scaleX, backgroundColor: appearance.colors.accent }}
      />
      {customCode.enabled && customCode.css && <style>{customCode.css}</style>}
      <div className="fixed inset-0 z-0">
        <LuxuryBackground pattern={appearance.bgPattern} palettePrimary={appearance.colors.accent} />
      </div>
      <main className="relative z-10 mx-auto px-6 py-24 flex flex-col items-center" style={{ maxWidth: `${appearance.layout.containerWidth}px` }}>
        <motion.header
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
          }}
          className="flex flex-col items-center text-center mb-20"
        >
          <div
            className="w-36 h-36 md:w-44 md:h-44 shadow-2xl overflow-hidden mb-12 ring-offset-8 ring-offset-transparent ring-1"
            style={{
              borderRadius: appearance.layout.avatarShape === 'circle' ? '50%' : appearance.layout.avatarShape === 'rounded' ? '24%' : '0%',
              borderColor: appearance.layout.avatarBorderColor,
              borderWidth: `${appearance.layout.avatarBorderWidth}px`,
              borderStyle: 'solid'
            }}
          >
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6" style={{ color: appearance.colors.profileText }}>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase leading-none">
              {name}
            </h1>
            <p className="text-xl md:text-2xl font-serif italic opacity-80">
              {tagline}
            </p>
            <div className="w-16 h-px bg-current mx-auto opacity-30 my-8" />
            <p className="text-xs md:text-sm font-ornament uppercase tracking-[0.4em] max-w-sm mx-auto leading-relaxed opacity-60">
              {bio}
            </p>
          </div>
        </motion.header>
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
          }}
          className="w-full flex flex-col"
          style={{ gap: `${appearance.layout.buttonSpacing}px` }}
        >
          {links.filter(l => l.active).map((link) => {
            const IconData = ICON_OPTIONS.find(i => i.id === link.icon) || ICON_OPTIONS[0];
            const Icon = IconData.icon;
            return (
              <motion.a
                key={link.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "relative group flex items-center justify-between p-6 transition-all duration-500 overflow-hidden",
                  appearance.buttonShape === 'sharp' ? 'rounded-none' :
                  appearance.buttonShape === 'rounded' ? 'rounded-2xl' :
                  appearance.buttonShape === 'pill' ? 'rounded-full' : 'rounded-3xl'
                )}
                style={{
                  backgroundColor: appearance.buttonStyle === 'fill' ? appearance.colors.btnFill : 'transparent',
                  color: appearance.colors.btnText,
                  borderColor: appearance.colors.btnBorder,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  boxShadow: appearance.buttonShadow === 'soft' ? '0 10px 30px -5px rgba(0,0,0,0.1)' :
                             appearance.buttonShadow === 'hard' ? `8px 8px 0px ${appearance.colors.btnBorder}` : 'none'
                }}
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-6 relative z-10">
                  <Icon className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
                  <div className="text-left">
                    <h3 className="font-bold text-lg tracking-[0.1em] uppercase">{link.title}</h3>
                    <p className="text-[10px] uppercase tracking-widest opacity-60 font-medium">{link.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-20 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100" />
              </motion.a>
            );
          })}
        </motion.nav>
        <SocialDock />
        <footer className="mt-40 mb-20 text-center opacity-30">
          <p className="text-[9px] font-ornament uppercase tracking-[0.4em]">OnyxBio Editorial Experience</p>
        </footer>
      </main>
    </div>
  );
}