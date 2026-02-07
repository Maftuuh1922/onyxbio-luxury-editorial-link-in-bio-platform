import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Share2, BarChart3, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
const FeatureSection = ({
  id,
  bg,
  title,
  desc,
  icon: Icon,
  visual,
  reverse = false
}: {
  id: string,
  bg: string,
  title: string,
  desc: string,
  icon: any,
  visual: React.ReactNode,
  reverse?: boolean
}) => (
  <div id={id} className={cn(bg, "py-24 md:py-32")}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={cn("flex flex-col gap-16 md:gap-24 items-center", reverse ? "md:flex-row-reverse" : "md:flex-row")}>
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          className="flex-1 space-y-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white">
            <Icon size={32} />
          </div>
          <h2 className="font-space font-bold text-4xl md:text-6xl text-white leading-tight">
            {title}
          </h2>
          <p className="font-space text-lg md:text-xl text-white/80 leading-relaxed">
            {desc}
          </p>
          <button className="inline-flex items-center gap-2 font-space font-bold text-white group hover:gap-4 transition-all">
            Learn more <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          viewport={{ once: true }}
          className="flex-1 w-full"
        >
          {visual}
        </motion.div>
      </div>
    </div>
  </div>
);
export function LandingFeatures() {
  return (
    <div className="font-space">
      <FeatureSection
        id="customize"
        bg="bg-landing-blue-feat"
        icon={Palette}
        title="Customize your atelier."
        desc="Change themes, fonts, and layouts in real-time. Our editor is built for precision and speed, giving you complete control over your brand's digital identity."
        visual={
          <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-2 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer flex items-center justify-center">
                    <div className={cn("w-8 h-8 rounded-full", i === 1 ? 'bg-[#c9a961]' : i === 2 ? 'bg-[#a8a8a8]' : i === 3 ? 'bg-emerald-700' : 'bg-red-500')} />
                 </div>
               ))}
            </div>
          </div>
        }
      />
      <FeatureSection
        id="share"
        bg="bg-landing-red-share"
        icon={Share2}
        title="Share it everywhere."
        desc="Optimized for every screen. Whether your audience is on mobile, tablet, or desktop, your OnyxBio profile will look stunning and load instantly."
        reverse
        visual={
          <div className="relative h-[400px]">
            <div className="absolute top-0 right-0 w-[200px] h-[350px] bg-black rounded-3xl border-4 border-white/20 z-20 shadow-2xl overflow-hidden">
               <div className="bg-gradient-to-b from-red-500 to-black w-full h-full p-4" />
            </div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[220px] bg-black rounded-2xl border-4 border-white/20 z-10 shadow-2xl overflow-hidden flex items-center justify-center">
               <span className="font-space text-white/20 font-bold uppercase tracking-widest">Atelier Dashboard</span>
            </div>
          </div>
        }
      />
      <FeatureSection
        id="analytics"
        bg="bg-landing-mint-analytics"
        icon={BarChart3}
        title="Analyze with precision."
        desc="Deep insights into your traffic. Know where your visitors come from, what they click, and how they engage with your content."
        visual={
          <div className="bg-white rounded-[2.5rem] p-10 border border-black/5 shadow-2xl space-y-8">
            <div className="flex items-center justify-between">
               <div className="space-y-1">
                 <p className="text-black/40 font-space text-sm uppercase">Total Views</p>
                 <p className="text-4xl font-space font-bold text-black">124,802</p>
               </div>
               <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <BarChart3 />
               </div>
            </div>
            <div className="h-32 w-full flex items-end gap-2">
               {[40, 70, 55, 90, 60, 85, 100].map((h, i) => (
                 <motion.div
                   key={i}
                   initial={{ height: 0 }}
                   whileInView={{ height: `${h}%` }}
                   transition={{ delay: i * 0.1 }}
                   className="flex-1 bg-landing-blue-feat rounded-t-sm"
                 />
               ))}
            </div>
          </div>
        }
      />
    </div>
  );
}