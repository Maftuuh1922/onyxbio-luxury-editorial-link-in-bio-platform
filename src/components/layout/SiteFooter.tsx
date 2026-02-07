import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';
const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' },
    ]
  },
  {
    title: 'Community',
    links: [
      { name: 'Curators', href: '#' },
      { name: 'Showcase', href: '#' },
      { name: 'Partners', href: '#' },
      { name: 'Events', href: '#' },
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
    ]
  },
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Templates', href: '#' },
      { name: 'Analytics', href: '#' },
    ]
  },
];
export function SiteFooter() {
  return (
    <footer className="bg-landing-dark-footer py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 space-y-8">
            <Link to="/" className="font-space font-bold text-white text-3xl tracking-tight">
              Onyx<span className="text-landing-purple-hero">Bio</span>
            </Link>
            <p className="font-space text-white/40 max-w-xs leading-relaxed">
              Empowering the world's creators with high-end, editorial digital identities.
            </p>
            <div className="flex items-center gap-6">
              {[Instagram, Twitter, Linkedin, Github].map((Icon, idx) => (
                <a key={idx} href="#" className="text-white/40 hover:text-white transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          {footerLinks.map((col) => (
            <div key={col.title} className="space-y-6">
              <h4 className="font-space font-bold text-white text-sm uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="font-space text-white/40 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-space text-white/20 text-xs uppercase tracking-widest">
            © 2025 ONYXBIO INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
             <a href="#" className="font-space text-white/20 hover:text-white text-xs uppercase tracking-widest transition-colors">Cookie Policy</a>
             <a href="#" className="font-space text-white/20 hover:text-white text-xs uppercase tracking-widest transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}