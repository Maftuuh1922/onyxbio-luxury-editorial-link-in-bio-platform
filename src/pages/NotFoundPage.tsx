import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
export function NotFoundPage() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-6 text-center",
      isDashboard ? "bg-brand-bg font-karla" : "bg-onyx-dark text-onyx-white font-space"
    )}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md space-y-8"
      >
        <div className="space-y-4">
          <h1 className={cn(
            "text-9xl font-bold opacity-10 select-none",
            isDashboard ? "text-brand-purple" : "text-onyx-gold"
          )}>
            404
          </h1>
          <h2 className="text-3xl font-bold">Lost in the Atelier</h2>
          <p className={cn(
            "text-lg",
            isDashboard ? "text-brand-muted" : "text-onyx-gray"
          )}>
            The page you are looking for has been moved or doesn't exist.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="outline" className="w-full sm:w-auto rounded-xl h-12 border-gray-200">
            <Link to={isDashboard ? "/dashboard" : "/"}><ArrowLeft className="w-4 h-4 mr-2" /> Go Back</Link>
          </Button>
          <Button asChild className={cn(
            "w-full sm:w-auto h-12 rounded-xl text-white font-bold",
            isDashboard ? "bg-brand-purple hover:bg-brand-purple/90" : "bg-onyx-gold text-onyx-dark hover:bg-onyx-gold-light"
          )}>
            <Link to="/"><Home className="w-4 h-4 mr-2" /> Home Page</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}