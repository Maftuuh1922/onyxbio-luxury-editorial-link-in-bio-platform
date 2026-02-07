import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layout, BarChart3, ShieldCheck, Zap, Globe } from 'lucide-react';
import { SiteNavbar } from '@/components/layout/SiteNavbar';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
const features = [
  { icon: <Layout className="w-6 h-6" />, title: "Editorial Design", desc: "Sophisticated layouts inspired by high-end print magazines." },
  { icon: <Sparkles className="w-6 h-6" />, title: "Cinematic Motion", desc: "Smooth, staggered animations that breathe life into your profile." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Deep Analytics", desc: "Track every click, view, and referral with granular precision." },
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Privacy First", desc: "Your data is yours. We respect user privacy and security." },
  { icon: <Zap className="w-6 h-6" />, title: "Zero Latency", desc: "Built on Cloudflare's global edge for instant worldwide loading." },
  { icon: <Globe className="w-6 h-6" />, title: "Custom Domains", desc: "Connect your own premium URL for ultimate brand ownership." },
];
export function HomePage() {
  return (
    <div className="relative min-h-screen bg-onyx-dark text-onyx-white selection:bg-onyx-gold selection:text-onyx-dark font-serif">
      <LuxuryBackground />
      <SiteNavbar />
      <main className="relative z-10 pt-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="font-ornament text-onyx-gold tracking-[0.4em] text-sm uppercase">✦ The Digital Atelier ✦</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-gradient-gold uppercase leading-[1.1]">
              Elevate Your <br /> Digital Presence
            </h1>
            <p className="max-w-2xl mx-auto text-onyx-gray text-xl md:text-2xl italic">
              The luxury link-in-bio platform for curators, creators, and the visionaries of tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button asChild className="bg-onyx-gold hover:bg-onyx-gold-light text-onyx-dark font-ornament tracking-widest px-8 py-6 text-lg rounded-none transition-all duration-500">
                <Link to="/register">GET STARTED <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button variant="outline" asChild className="border-onyx-gold/30 text-onyx-gold hover:bg-onyx-gold/5 font-ornament tracking-widest px-8 py-6 text-lg rounded-none">
                <Link to="/login">MEMBER LOGIN</Link>
              </Button>
            </div>
          </motion.div>
        </section>
        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-onyx-dark/50 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 group border-white/5"
              >
                <div className="text-onyx-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                  {f.icon}
                </div>
                <h3 className="font-ornament text-onyx-gold-light text-xl tracking-widest uppercase mb-3">{f.title}</h3>
                <p className="text-onyx-gray leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
        {/* Pricing Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="space-y-4 mb-16">
            <h2 className="font-display text-4xl text-onyx-white uppercase tracking-wider">Curated Tiers</h2>
            <div className="w-24 h-px bg-onyx-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['FREE', 'PRO', 'BUSINESS'].map((plan, i) => (
              <Card key={plan} className="glass-card bg-white/[0.02] border-white/5 p-10 flex flex-col items-center gap-6">
                <span className="font-ornament text-onyx-gold text-xs tracking-[0.3em] uppercase">{plan}</span>
                <div className="space-y-2">
                  <span className="text-4xl font-display text-onyx-white">${[0, 12, 49][i]}</span>
                  <span className="text-onyx-gray text-sm ml-1">/mo</span>
                </div>
                <ul className="text-onyx-gray text-sm space-y-3 font-serif py-6">
                  <li>Standard Profile Design</li>
                  <li>Basic Analytics</li>
                  {i > 0 && <li>Custom Themes & Fonts</li>}
                  {i > 1 && <li>Priority Support</li>}
                </ul>
                <Button variant={i === 1 ? 'default' : 'outline'} className={i === 1 ? 'bg-onyx-gold text-onyx-dark' : 'border-onyx-gold/20 text-onyx-gold'}>
                  Select Plan
                </Button>
              </Card>
            ))}
          </div>
        </section>
        {/* Footer */}
        <footer className="border-t border-white/5 py-12 text-center space-y-6">
           <div className="font-ornament text-onyx-gold-dark tracking-[0.8em] text-xl opacity-40">
              �� ONYXBIO ◆
            </div>
            <p className="text-onyx-gray-dark text-[0.7rem] tracking-[0.3em] font-serif uppercase leading-relaxed">
              Designed for digital excellence<br />
              © 2025 ALL RIGHTS RESERVED
            </p>
        </footer>
      </main>
    </div>
  );
}