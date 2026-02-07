import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function LandingHero() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-onyx-gold/5 via-black to-black font-space">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm">
              <Sparkles className="w-4 h-4 text-onyx-gold" />
              <span>Version 2.0 is now live</span>
            </div>
            <h1 className="font-bold text-5xl md:text-7xl leading-tight tracking-tight text-white">
              A link in bio that <br />
              <span className="text-onyx-gold">actually sells.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-lg leading-relaxed">
              Elevate your digital presence with OnyxBio. A premium, high-energy platform for curators, creators, and visionaries.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10 max-w-md">
              <div className="flex-1 w-full px-4 text-white/40 text-sm">
                onyx.bio/<span className="text-white">yourname</span>
              </div>
              <Button className="w-full sm:w-auto bg-onyx-gold hover:bg-onyx-gold/90 text-onyx-dark font-bold px-8 py-6 rounded-xl transition-all hover:scale-105">
                Claim Now
              </Button>
            </div>
            <p className="text-xs text-white/40 italic">
              ✦ No credit card required. Cancel anytime.
            </p>
          </motion.div>
          {/* Right Column: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 mx-auto w-[280px] h-[580px] bg-onyx-dark border-[8px] border-white/10 rounded-[3rem] overflow-hidden shadow-2xl animate-float-slow">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop"
                className="w-full h-32 object-cover grayscale-[0.5]"
                alt="preview"
              />
              <div className="p-6 space-y-4">
                <div className="w-24 h-24 rounded-full bg-white/5 mx-auto border border-white/10 -mt-16 relative overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop" alt="avatar" />
                </div>
                <div className="h-4 w-32 bg-onyx-gold/20 mx-auto rounded-full" />
                <div className="h-2 w-48 bg-white/5 mx-auto rounded-full" />
                <div className="space-y-2 pt-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-12 w-full bg-white/5 border border-white/10 rounded-lg flex items-center px-4 gap-3">
                      <div className="w-4 h-4 rounded bg-onyx-gold/40" />
                      <div className="h-2 w-24 bg-white/10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Parallax Floating Shapes */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute -top-10 -right-10 w-32 h-32 bg-onyx-gold/10 blur-3xl rounded-full" />
            <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/2 -left-10 w-24 h-24 bg-white/5 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}