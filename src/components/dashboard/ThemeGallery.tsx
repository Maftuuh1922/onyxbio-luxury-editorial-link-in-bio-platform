import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Check, Crown, Heart } from 'lucide-react';
import { ONYX_THEMES, ThemePreset } from '@/lib/constants';
import { useProfile } from '@/store/useProfile';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
export function ThemeGallery() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Editorial' | 'Vibrant' | 'Minimal' | 'Dark' | 'Creative'>('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const applyTheme = useProfile(s => s.applyTheme);
  const currentThemeId = useProfile(s => s.appearance.themeId);
  const filteredThemes = ONYX_THEMES.filter(theme => {
    const matchesSearch = theme.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || theme.category === filter;
    return matchesSearch && matchesFilter;
  });
  const handleApply = (theme: ThemePreset) => {
    applyTheme(theme.appearance);
    toast.success(`Atmosphere Synchronized`, {
      description: `The ${theme.name} aesthetic is now live.`,
      className: "font-karla font-bold"
    });
  };
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-muted" />
          <Input
            placeholder="Search our designer archives..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-14 h-14 bg-white border-brand-border rounded-2xl focus:ring-brand-purple/20 transition-all shadow-sm text-base"
          />
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-4 md:pb-0 scrollbar-hide px-1">
          {(['All', 'Editorial', 'Minimal', 'Vibrant', 'Dark', 'Creative'] as const).map(cat => (
            <Button
              key={cat}
              variant={filter === cat ? 'default' : 'outline'}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-2xl px-6 h-14 font-bold text-[11px] uppercase tracking-[0.15em] transition-all whitespace-nowrap",
                filter === cat
                  ? "bg-brand-purple text-white shadow-xl shadow-brand-purple/20 border-brand-purple scale-105"
                  : "bg-white border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-purple/30 shadow-sm"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredThemes.map((theme, i) => (
            <motion.div
              layout
              key={theme.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className={cn(
                "group relative bg-white border rounded-[2.5rem] overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(129,41,217,0.15)] transition-all duration-700 cursor-pointer flex flex-col",
                currentThemeId === theme.appearance.themeId ? "border-brand-purple ring-4 ring-brand-purple/5" : "border-brand-border shadow-md"
              )}
              onClick={() => handleApply(theme)}
            >
              {/* Higher-Fidelity Preview Container */}
              <div
                className="h-56 relative flex items-center justify-center p-12 overflow-hidden bg-slate-100"
                style={{ backgroundColor: theme.appearance.bgColor }}
              >
                {theme.appearance.bgType === 'gradient' && (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(${theme.appearance.bgGradient.angle}deg, ${theme.appearance.bgGradient.stops.map(s => `${s.color} ${s.offset}%`).join(', ')})`
                    }}
                  />
                )}
                {/* Abstract UI Elements Preview */}
                <div className="relative z-10 w-full max-w-[160px] space-y-4">
                  <div className="h-9 w-full rounded-2xl shadow-xl flex items-center px-4 transition-transform group-hover:scale-105 duration-500"
                    style={{ backgroundColor: theme.appearance.colors.btnFill, color: theme.appearance.colors.btnText }}>
                    <div className="w-2.5 h-2.5 rounded-full mr-3 shrink-0" style={{ backgroundColor: theme.appearance.colors.accent }} />
                    <div className="h-1.5 flex-1 bg-current opacity-20 rounded-full" />
                  </div>
                  <div className="h-9 w-full rounded-2xl shadow-xl flex items-center px-4 opacity-40 translate-x-4 transition-transform group-hover:translate-x-6 duration-500"
                    style={{ backgroundColor: theme.appearance.colors.btnFill, color: theme.appearance.colors.btnText }}>
                    <div className="h-1.5 flex-1 bg-current opacity-20 rounded-full" />
                  </div>
                </div>
                {/* Tactical Status Badges */}
                <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                  {theme.isPro && (
                    <Badge className="bg-onyx-gold text-onyx-dark font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 border-none shadow-lg">
                      <Crown className="w-3 h-3 mr-2" /> Tier Pro
                    </Badge>
                  )}
                  {currentThemeId === theme.appearance.themeId && (
                    <Badge className="bg-brand-lime text-brand-text font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 border-none shadow-lg">
                      <Check className="w-3 h-3 mr-2" /> Active
                    </Badge>
                  )}
                </div>
                {/* Action Corner */}
                <div className="absolute top-6 right-6 z-20">
                  <button
                    onClick={(e) => toggleFavorite(theme.id, e)}
                    className={cn(
                      "p-3 rounded-2xl backdrop-blur-xl transition-all shadow-xl border border-white/20",
                      favorites.includes(theme.id) ? "bg-red-500 text-white" : "bg-black/10 text-white hover:bg-black/20"
                    )}
                  >
                    <Heart className={cn("w-4 h-4", favorites.includes(theme.id) && "fill-current")} />
                  </button>
                </div>
              </div>
              {/* Theme Metadata & Application */}
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between bg-white relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-bold text-xl text-brand-text tracking-tight group-hover:text-brand-purple transition-colors">{theme.name}</h3>
                      <p className="text-[10px] text-brand-muted font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                        {theme.category} Collection <span className="w-1 h-1 rounded-full bg-brand-border" /> 2025 Edition
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 py-1">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full border-2 border-white shadow-md z-30" style={{ backgroundColor: theme.appearance.bgColor }} />
                      <div className="w-7 h-7 rounded-full border-2 border-white shadow-md z-20" style={{ backgroundColor: theme.appearance.colors.btnFill }} />
                      <div className="w-7 h-7 rounded-full border-2 border-white shadow-md z-10" style={{ backgroundColor: theme.appearance.colors.accent }} />
                    </div>
                    <span className="text-[11px] text-brand-muted font-bold uppercase tracking-widest opacity-60 italic">Architectural Palette</span>
                  </div>
                </div>
                <Button
                  className={cn(
                    "w-full h-14 rounded-2xl font-bold text-[11px] uppercase tracking-[0.25em] transition-all shadow-md group-hover:shadow-xl",
                    currentThemeId === theme.appearance.themeId
                      ? "bg-brand-lime text-brand-text border border-brand-lime-dark/10 cursor-default"
                      : "bg-brand-bg text-brand-text hover:bg-brand-purple hover:text-white border border-brand-border"
                  )}
                >
                  {currentThemeId === theme.appearance.themeId ? 'Currently Live' : 'Apply Aesthetic'}
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {filteredThemes.length === 0 && (
        <div className="text-center py-32 bg-brand-bg/40 rounded-[3.5rem] border-2 border-dashed border-brand-border/60 flex flex-col items-center justify-center space-y-6">
          <div className="w-20 h-20 bg-brand-bg flex items-center justify-center rounded-full border border-brand-border">
            <Search className="w-8 h-8 text-brand-muted opacity-40" />
          </div>
          <div className="space-y-2">
            <p className="text-brand-muted font-serif italic text-2xl">The designer archives are empty for "{search}"</p>
            <p className="text-brand-muted text-sm font-medium">Try broadening your aesthetic filters.</p>
          </div>
          <Button 
            variant="link" 
            onClick={() => { setSearch(''); setFilter('All'); }} 
            className="text-brand-purple font-bold uppercase tracking-[0.25em] text-xs underline decoration-brand-purple/30 underline-offset-8 decoration-2 hover:decoration-brand-purple"
          >
            Reset Master Filters
          </Button>
        </div>
      )}
    </div>
  );
}