import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ExternalLink, Play, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link as LinkType } from '@/store/useProfile';
import { toast } from 'sonner';
interface WidgetProps {
  link: LinkType;
  appearance: any;
}
export function CommerceLink({ link, appearance }: WidgetProps) {
  const commerce = link.commerce;
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
        <div className="space-y-1">
          <h3 className="font-bold text-xl tracking-[0.05em] uppercase">{link.title}</h3>
          <p className="text-[10px] uppercase tracking-widest opacity-60 font-medium">{link.subtitle}</p>
        </div>
        <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
          <span className="text-xs font-bold">{commerce.currency} {commerce.price}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 w-full py-3 bg-black/5 rounded-xl border border-white/5 group-hover:bg-black/10 transition-colors">
        <ShoppingCart className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest">{commerce.buttonText}</span>
      </div>
    </motion.button>
  );
}
export function WidgetLink({ link, appearance }: WidgetProps) {
  const widget = link.widget;
  if (!widget) return null;
  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden transition-all duration-500 p-1",
        appearance.buttonShape === 'sharp' ? 'rounded-none' : 'rounded-[2rem]'
      )}
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: `1px solid ${appearance.colors.btnBorder}33`
      }}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Play className="w-4 h-4 opacity-40" />
          <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">{link.title}</span>
        </div>
        <ExternalLink className="w-3 h-3 opacity-20" />
      </div>
      <div className="aspect-video w-full bg-black/40 relative">
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
  if (!featured) return <>{children}</>;
  return (
    <motion.div
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="relative group p-1"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-onyx-gold/40 via-white/20 to-onyx-gold/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}