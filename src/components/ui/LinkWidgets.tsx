import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ExternalLink, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link as LinkType } from '@/store/useProfile';
import { toast } from 'sonner';
interface WidgetProps {
  link: LinkType;
  appearance: any;
}
export function CommerceLink({ link, appearance }: WidgetProps) {
  const commerce = link.commerce;
  const accentColor = appearance.colors.accent;
  if (!commerce) return null;
  const handlePurchase = () => {
    toast.info(`Simulated checkout via ${commerce.provider}`, {
      description: `Processing ${commerce.price} ${commerce.currency}`,
      className: "font-karla font-bold"
    });
  };
  return (
    <motion.button
      onClick={handlePurchase}
      className={cn(
        "relative group w-full flex flex-col p-6 transition-all duration-500 overflow-hidden text-left",
        appearance.buttonShape === 'sharp' ? 'rounded-none' :
        appearance.buttonShape === 'rounded' ? 'rounded-2xl' :
        appearance.buttonShape === 'pill' ? 'rounded-full' : 'rounded-3xl'
      )}
      style={{
        backgroundColor: appearance.buttonStyle === 'fill' ? appearance.colors.btnFill : 'transparent',
        color: appearance.colors.btnText,
        borderColor: appearance.colors.btnBorder,
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      <div className="flex items-start justify-between w-full relative z-10 mb-4">
        <div className="space-y-1 pr-4">
          <h3 className="font-bold text-xl tracking-[0.05em] uppercase line-clamp-1">{link.title}</h3>
          <p className="text-[10px] uppercase tracking-widest opacity-60 font-medium line-clamp-1">{link.subtitle}</p>
        </div>
        <div 
          className="px-3 py-1 rounded-full border border-current/10 shrink-0"
          style={{ backgroundColor: `${appearance.colors.btnText}10` }}
        >
          <span className="text-xs font-bold">{commerce.currency} {commerce.price}</span>
        </div>
      </div>
      <div 
        className="flex items-center justify-center gap-3 w-full py-3 rounded-xl border border-current/5 group-hover:bg-black/10 transition-colors"
        style={{ backgroundColor: `${appearance.colors.btnText}05` }}
      >
        <ShoppingCart className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest">{commerce.buttonText}</span>
      </div>
      <div 
        className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />
    </motion.button>
  );
}
export function WidgetLink({ link, appearance }: WidgetProps) {
  const widget = link.widget;
  if (!widget) return null;
  const cornerRadius = 
    appearance.buttonShape === 'sharp' ? 'rounded-none' : 
    appearance.buttonShape === 'rounded' ? 'rounded-[1.5rem]' : 'rounded-[2rem]';
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden transition-all duration-500 p-1 bg-white/[0.03] border border-white/10",
        cornerRadius
      )}
      style={{
        borderColor: `${appearance.colors.btnBorder}33`
      }}
    >
      <div className="p-4 flex items-center justify-between" style={{ color: appearance.colors.profileText }}>
        <div className="flex items-center gap-3">
          <Play className="w-4 h-4 opacity-40" />
          <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 line-clamp-1">{link.title}</span>
        </div>
        <ExternalLink className="w-3 h-3 opacity-20" />
      </div>
      <div className={cn("aspect-video w-full bg-black/40 relative overflow-hidden", cornerRadius)}>
         <iframe
            src={widget.embedUrl}
            className="absolute inset-0 w-full h-full border-0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
         />
      </div>
    </div>
  );
}
export function FeaturedWrapper({ children, featured }: { children: React.ReactNode; featured?: boolean }) {
  const accentColor = useProfile(s => s.appearance.colors.accent);
  if (!featured) return <>{children}</>;
  return (
    <motion.div
      animate={{ scale: [1, 1.015, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative group p-0.5"
    >
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 blur-xl z-0 rounded-[2rem]"
        style={{ backgroundColor: accentColor }}
      />
      <div className="relative z-10">{children}</div>
      {/* Dynamic Sheen Effect */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-20 pointer-events-none"
      />
    </motion.div>
  );
}