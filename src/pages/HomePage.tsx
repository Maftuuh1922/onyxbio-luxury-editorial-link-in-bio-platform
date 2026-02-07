import React from 'react';
import { motion } from 'framer-motion';
import { SiteNavbar } from '@/components/layout/SiteNavbar';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingFeatures } from '@/components/landing/LandingFeatures';
import { LandingShowcase } from '@/components/landing/LandingShowcase';
import { LandingResources } from '@/components/landing/LandingResources';
import { LandingCTA } from '@/components/landing/LandingCTA';
export function HomePage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-landing-purple-hero selection:text-white font-sans overflow-x-hidden">
      <SiteNavbar />
      <main>
        {/* Section 1: Hero (Purple) */}
        <section id="hero">
          <LandingHero />
        </section>
        {/* Sections 2, 3, 4: Features (Blue, Red, Mint) */}
        <section id="features">
          <LandingFeatures />
        </section>
        {/* Section 6: Showcase (Yellow Bento) */}
        <section id="showcase">
          <LandingShowcase />
        </section>
        {/* Sections 7, 8: Testimonials & FAQ (White, Maroon) */}
        <section id="faq">
          <LandingResources />
        </section>
        {/* Section 9: Final CTA (Purple Gradient) */}
        <section id="cta">
          <LandingCTA />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}