import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/store/useAuth';
import { LuxuryBackground } from '@/components/ui/LuxuryBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
interface AuthPageProps {
  mode: 'login' | 'register';
}
export function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);
  const register = useAuth((s) => s.register);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));
    const mockUser = {
      id: 'u1',
      username: 'alexander',
      email: 'alex@example.com',
      fullName: 'Alexander Onyx'
    };
    if (mode === 'login') login(mockUser);
    else register(mockUser);
    setIsLoading(false);
    navigate('/dashboard/overview');
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-onyx-dark">
      <LuxuryBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-10 text-center space-y-2">
          <Link to="/" className="font-ornament text-onyx-gold text-2xl tracking-[0.4em]">ONYXBIO</Link>
          <h2 className="font-display text-3xl text-onyx-white uppercase tracking-wider">
            {mode === 'login' ? 'Welcome Back' : 'Join The Collective'}
          </h2>
        </div>
        <Card className="glass-card bg-white/[0.03] border-white/10 p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label className="text-onyx-gold-light font-ornament tracking-widest text-xs uppercase">Full Name</Label>
                <Input required className="bg-white/5 border-white/10 text-onyx-white placeholder:text-onyx-gray/30 rounded-none focus-visible:ring-onyx-gold/50" placeholder="Alexander Onyx" />
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-onyx-gold-light font-ornament tracking-widest text-xs uppercase">Email Address</Label>
              <Input required type="email" className="bg-white/5 border-white/10 text-onyx-white placeholder:text-onyx-gray/30 rounded-none focus-visible:ring-onyx-gold/50" placeholder="alexander@onyx.bio" />
            </div>
            <div className="space-y-2">
              <Label className="text-onyx-gold-light font-ornament tracking-widest text-xs uppercase">Password</Label>
              <Input required type="password" className="bg-white/5 border-white/10 text-onyx-white placeholder:text-onyx-gray/30 rounded-none focus-visible:ring-onyx-gold/50" placeholder="••••••••" />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-onyx-gold hover:bg-onyx-gold-light text-onyx-dark font-ornament tracking-[0.2em] py-6 rounded-none mt-6">
              {isLoading ? 'PROCESSING...' : (mode === 'login' ? 'ENTER ATELIER' : 'CREATE ACCOUNT')}
            </Button>
          </form>
          <div className="text-center pt-4 border-t border-white/5">
            <p className="text-onyx-gray text-sm font-serif italic">
              {mode === 'login' ? "Don't have an account?" : "Already a member?"}{' '}
              <Link to={mode === 'login' ? '/register' : '/login'} className="text-onyx-gold hover:text-onyx-gold-light underline underline-offset-4 transition-colors">
                {mode === 'login' ? 'Register now' : 'Login instead'}
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}