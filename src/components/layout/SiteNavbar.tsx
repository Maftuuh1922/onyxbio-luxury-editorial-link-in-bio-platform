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
  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'FAQ', href: '#faq' },
  ];
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
      isScrolled 
        ? "bg-black/40 backdrop-blur-xl border-b border-white/10 py-4" 
        : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="font-space font-bold text-white text-2xl tracking-tight hover:opacity-80 transition-opacity">
          Onyx<span className="text-landing-purple-hero">Bio</span>
        </Link>
        {/* Center: Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="font-space text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        {/* Right: Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="font-space text-sm font-medium text-white/70 hover:text-white px-4 py-2 transition-colors">
            Login
          </Link>
          <Button asChild className="bg-white text-black hover:bg-white/90 font-space font-bold text-sm px-6 py-2 rounded-full transition-all hover:scale-105 active:scale-95">
            <Link to="/register">Sign Up Free</Link>
          </Button>
        </div>
        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-0 left-0 right-0 h-screen bg-landing-purple-hero z-[-1] p-8 pt-24 flex flex-col gap-8 md:hidden animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)} 
              className="font-space font-bold text-3xl text-white"
            >
              {link.name}
            </a>
          ))}
          <div className="mt-auto flex flex-col gap-4">
            <Link 
              to="/login" 
              onClick={() => setMobileMenuOpen(false)} 
              className="font-space font-bold text-2xl text-white/80"
            >
              Login
            </Link>
            <Button asChild className="w-full bg-white text-black font-space font-bold text-lg py-8 rounded-2xl">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}