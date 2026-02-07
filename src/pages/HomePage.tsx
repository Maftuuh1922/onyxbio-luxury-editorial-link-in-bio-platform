import React from 'react';
import { SiteNavbar } from '@/components/layout/SiteNavbar';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingFeatures } from '@/components/landing/LandingFeatures';
import { LandingShowcase } from '@/components/landing/LandingShowcase';
import { LandingResources } from '@/components/landing/LandingResources';
import { LandingCTA } from '@/components/landing/LandingCTA';
export function HomePage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-landing-purple-hero selection:text-white font-space overflow-x-hidden">
      <SiteNavbar />
      <main>
        <section id="hero">
          <LandingHero />
        </section>
        <section id="features">
          <LandingFeatures />
        </section>
        <section id="showcase">
          <LandingShowcase />
        </section>
        <section id="faq">
          <LandingResources />
        </section>
        <section id="cta">
          <LandingCTA />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}