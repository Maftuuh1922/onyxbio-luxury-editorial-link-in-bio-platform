import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
const curators = [
  { name: 'Elena Vance', role: 'Digital Artist', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=600&fit=crop', size: 'lg' },
  { name: 'Mark S.', role: 'Curator', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=400&fit=crop', size: 'sm' },
  { name: 'Julia Roberts', role: 'Producer', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&fit=crop', size: 'sm' },
  { name: 'Onyx Studio', role: 'Design Collective', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&h=400&fit=crop', size: 'wide' },
];
export function LandingShowcase() {
  return (
    <div id="showcase" className="bg-landing-yellow-bento py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="font-space font-bold text-4xl md:text-7xl text-black">Curated by the best.</h2>
          <p className="font-space text-lg text-black/60 max-w-2xl mx-auto">Join a global community of professionals who trust OnyxBio for their primary link in bio.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
          {curators.map((curator, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 0.98 }}
              className={cn(
                "relative rounded-[2rem] overflow-hidden group bg-black/5 border border-black/10",
                curator.size === 'lg' ? 'md:col-span-2 md:row-span-2' : curator.size === 'wide' ? 'md:col-span-2' : ''
              )}
            >
              <img
                src={curator.img}
                alt={curator.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="font-space font-bold text-2xl text-white">{curator.name}</p>
                <p className="font-space text-sm text-white/60">{curator.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}