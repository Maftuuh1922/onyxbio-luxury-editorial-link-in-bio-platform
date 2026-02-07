import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
export function SiteNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b",
      isScrolled ? "bg-onyx-dark/80 backdrop-blur-md border-white/5 py-3" : "bg-transparent border-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="font-ornament text-onyx-gold text-2xl tracking-[0.4em] hover:opacity-80 transition-opacity">
          ONYXBIO
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Pricing', 'Curators'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="font-ornament text-[0.7rem] tracking-[0.3em] uppercase text-onyx-gray hover:text-onyx-gold transition-colors">
              {item}
            </a>
          ))}
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <Link to="/login" className="font-ornament text-[0.7rem] tracking-[0.3em] uppercase text-onyx-white hover:text-onyx-gold transition-colors">
            Login
          </Link>
          <Button asChild className="bg-onyx-gold hover:bg-onyx-gold-light text-onyx-dark font-ornament tracking-widest text-xs px-6 py-2 rounded-none">
            <Link to="/register">JOIN NOW</Link>
          </Button>
        </div>
        {/* Mobile Toggle */}
        <button className="md:hidden text-onyx-gold" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-onyx-dark/95 backdrop-blur-xl border-b border-white/5 p-8 flex flex-col items-center gap-8 md:hidden">
          {['Features', 'Pricing', 'Curators'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="font-ornament tracking-[0.3em] uppercase text-onyx-white text-lg">
              {item}
            </a>
          ))}
          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="font-ornament tracking-[0.3em] uppercase text-onyx-gold text-lg">
            Login
          </Link>
          <Button asChild className="w-full bg-onyx-gold text-onyx-dark font-ornament tracking-widest py-6 rounded-none">
            <Link to="/register">JOIN NOW</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}