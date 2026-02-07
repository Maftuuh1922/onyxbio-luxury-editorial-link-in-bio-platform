import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
export function LandingCTA() {
  return (
    <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-landing-purple-hero to-indigo-900 rounded-[3rem] p-12 md:p-24 overflow-hidden text-center space-y-12"
        >
          {/* Decorative Floating Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div 
              animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute top-10 left-10 w-32 h-32 bg-white/5 blur-3xl rounded-full" 
            />
            <motion.div 
              animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute bottom-10 right-10 w-48 h-48 bg-onyx-gold/10 blur-3xl rounded-full" 
            />
          </div>
          <div className="relative z-10 space-y-6">
            <h2 className="font-space font-bold text-5xl md:text-8xl text-white tracking-tight">
              Ready to curate <br /> your legacy?
            </h2>
            <p className="font-space text-xl text-white/70 max-w-xl mx-auto">
              Join 50,000+ creators who are building their digital future with OnyxBio.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex-1 max-w-sm w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-2 flex items-center">
              <span className="px-4 text-white/40 font-space text-sm">onyx.bio/</span>
              <input 
                type="text" 
                placeholder="username" 
                className="bg-transparent border-none focus:ring-0 text-white font-space flex-1" 
              />
            </div>
            <Button className="w-full sm:w-auto bg-white text-black hover:bg-white/90 font-space font-bold px-10 py-8 rounded-2xl text-lg">
              Get Started Free
            </Button>
          </div>
          <p className="relative z-10 font-space text-sm text-white/40">
            Secure your unique link before someone else does.
          </p>
        </motion.div>
      </div>
    </div>
  );
}