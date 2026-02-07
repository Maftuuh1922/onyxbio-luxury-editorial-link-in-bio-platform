import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
const faqs = [
  { q: "Is OnyxBio really free?", a: "Yes, our 'Atelier' plan is free forever. It includes everything you need to start your curated journey." },
  { q: "Can I use my own domain?", a: "Absolutely. Pro and Business members can connect their custom URLs like links.yourname.com." },
  { q: "How do I track my analytics?", a: "Every link click and profile view is tracked automatically. You can view deep insights in your private dashboard." },
  { q: "Do you offer priority support?", a: "Yes, Business members get 24/7 priority access to our support concierge team." },
  { q: "Is my data secure?", a: "We use enterprise-grade encryption and Cloudflare's edge security to ensure your data and your visitors' privacy are protected." },
  { q: "Can I cancel anytime?", a: "There are no contracts. You can downgrade or cancel your subscription with a single click." },
  { q: "What integrations do you support?", a: "We support over 50+ integrations including Mailchimp, Shopify, Substack, and more." },
  { q: "Do you have a mobile app?", a: "OnyxBio is a progressive web app. You can manage your entire profile directly from your mobile browser with zero friction." },
];
export function LandingResources() {
  return (
    <div className="bg-white">
      {/* Testimonial Section */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }}
            className="w-20 h-20 rounded-full mx-auto overflow-hidden ring-4 ring-landing-purple-hero/10"
          >
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop" alt="User" />
          </motion.div>
          <blockquote className="font-display italic text-3xl md:text-5xl text-black leading-tight">
            "OnyxBio changed the way I present my work. It's not just a link in bio, it's my digital storefront. The design is incomparable."
          </blockquote>
          <div className="space-y-1">
            <p className="font-space font-bold text-lg text-black">Sarah Jenkins</p>
            <p className="font-space text-black/40 uppercase tracking-widest text-sm">Founder of Studio Lux</p>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="bg-landing-maroon-faq py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-space font-bold text-4xl md:text-6xl text-white text-center mb-16">Commonly asked questions.</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-white/10 px-6 py-2 bg-white/5 rounded-2xl">
                <AccordionTrigger className="font-space font-bold text-left text-white hover:no-underline hover:text-onyx-gold transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-space text-white/60 text-lg pt-2 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}