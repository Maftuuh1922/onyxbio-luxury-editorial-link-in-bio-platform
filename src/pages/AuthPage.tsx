import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/store/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, Eye, EyeOff, Github, Chrome, Apple } from 'lucide-react';
import { cn } from '@/lib/utils';
interface AuthPageProps {
  mode: 'login' | 'register' | 'forgot-password';
}
export function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);
  const register = useAuth((s) => s.register);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [password, setPassword] = useState('');
  const passwordStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    if (pass.length < 6) return 1;
    if (pass.length < 10) return 2;
    return 3;
  };
  useEffect(() => {
    if (mode === 'register' && username.length > 2) {
      setUsernameStatus('checking');
      const timer = setTimeout(() => setUsernameStatus(Math.random() > 0.3 ? 'available' : 'taken'), 600);
      return () => clearTimeout(timer);
    } else {
      setUsernameStatus('idle');
    }
  }, [username, mode]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    if (mode !== 'forgot-password') {
      const mockUser = {
        id: 'u1',
        username: username || 'alexander',
        email: 'user@example.com',
        fullName: 'New User'
      };
      if (mode === 'login') login(mockUser);
      else register(mockUser);
      navigate('/dashboard/overview');
    }
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-brand-bg font-karla">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-purple/5 to-transparent pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <div className="mb-8 text-center">
          <Link to="/" className="font-space font-bold text-3xl tracking-tight text-brand-text">
            Onyx<span className="text-brand-purple">Bio</span>
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-brand-text">
            {mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Join the collective' : 'Reset password'}
          </h2>
          <p className="text-brand-muted mt-2">
            {mode === 'login' ? 'Enter your details to access your atelier.' : mode === 'register' ? 'Claim your unique link in seconds.' : 'We\'ll send a link to your email.'}
          </p>
        </div>
        <Card className="bg-white border-none shadow-xl p-8 rounded-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label className="text-brand-text font-bold">Username</Label>
                <div className="relative">
                  <Input 
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    placeholder="yourname"
                    className="pl-4 h-12 rounded-xl border-gray-200 focus:ring-brand-purple"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {usernameStatus === 'checking' && <div className="w-4 h-4 border-2 border-brand-purple border-t-transparent animate-spin rounded-full" />}
                    {usernameStatus === 'available' && <CheckCircle2 className="w-4 h-4 text-brand-lime" />}
                    {usernameStatus === 'taken' && <AlertCircle className="w-4 h-4 text-red-500" />}
                  </div>
                </div>
                {usernameStatus === 'available' && <p className="text-[11px] text-brand-lime font-bold">onyx.bio/{username} is available!</p>}
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-brand-text font-bold">Email Address</Label>
              <Input type="email" required placeholder="alex@example.com" className="h-12 rounded-xl border-gray-200" />
            </div>
            {mode !== 'forgot-password' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-brand-text font-bold">Password</Label>
                  {mode === 'login' && <Link to="/forgot-password" size="sm" className="text-xs text-brand-purple font-bold hover:underline">Forgot?</Link>}
                </div>
                <div className="relative">
                  <Input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="h-12 rounded-xl border-gray-200 pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {mode === 'register' && password.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={cn("h-1 flex-1 rounded-full transition-colors", i <= passwordStrength(password) ? (i === 1 ? 'bg-red-400' : i === 2 ? 'bg-yellow-400' : 'bg-brand-lime') : 'bg-gray-100')} />
                    ))}
                  </div>
                )}
              </div>
            )}
            <Button type="submit" disabled={isLoading} className="w-full h-12 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-purple/20">
              {isLoading ? 'Processing...' : mode === 'login' ? 'Login' : mode === 'register' ? 'Create Account' : 'Send Link'}
            </Button>
          </form>
          {mode !== 'forgot-password' && (
            <>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 rounded-xl border-gray-200 hover:bg-gray-50"><Chrome className="w-4 h-4 mr-2 text-brand-text" /> Google</Button>
                <Button variant="outline" className="h-12 rounded-xl border-gray-200 hover:bg-gray-50"><Apple className="w-4 h-4 mr-2 text-brand-text" /> Apple</Button>
              </div>
            </>
          )}
          <div className="text-center pt-2">
            <p className="text-sm text-brand-muted">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
              <Link to={mode === 'login' ? '/register' : '/login'} className="text-brand-purple font-bold hover:underline">
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}