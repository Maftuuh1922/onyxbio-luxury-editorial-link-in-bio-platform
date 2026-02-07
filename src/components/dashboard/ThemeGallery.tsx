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
    toast.success(`Applied ${theme.name}`, {
      description: "Your live preview has been updated.",
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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
          <Input
            placeholder="Search designer themes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 bg-white border-brand-border rounded-xl focus:ring-brand-purple/20 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {(['All', 'Editorial', 'Minimal', 'Vibrant', 'Dark', 'Creative'] as const).map(cat => (
            <Button
              key={cat}
              variant={filter === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full px-5 h-12 font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap",
                filter === cat
                  ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/20"
                  : "bg-white border-brand-border text-brand-muted hover:text-brand-text"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredThemes.map((theme, i) => (
            <motion.div
              layout
              key={theme.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "group relative bg-white border rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col",
                currentThemeId === theme.appearance.themeId ? "border-brand-purple ring-2 ring-brand-purple/10" : "border-brand-border shadow-sm"
              )}
              onClick={() => handleApply(theme)}
            >
              {/* Theme Preview Card */}
              <div
                className="h-48 relative flex items-center justify-center p-8 overflow-hidden"
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
                {/* Mini UI Elements Preview */}
                <div className="relative z-10 w-full max-w-[140px] space-y-3">
                  <div className="h-7 w-full rounded-full shadow-lg flex items-center px-4"
                    style={{ backgroundColor: theme.appearance.colors.btnFill, color: theme.appearance.colors.btnText }}>
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: theme.appearance.colors.accent }} />
                    <div className="h-1 flex-1 bg-current opacity-30 rounded-full" />
                  </div>
                  <div className="h-7 w-full rounded-full shadow-lg flex items-center px-4 opacity-50"
                    style={{ backgroundColor: theme.appearance.colors.btnFill, color: theme.appearance.colors.btnText }}>
                    <div className="h-1 flex-1 bg-current opacity-30 rounded-full" />
                  </div>
                </div>
                {/* Badges & Actions */}
                <div className="absolute top-4 left-4 z-20">
                  {theme.isPro && (
                    <Badge className="bg-onyx-gold text-onyx-dark font-bold text-[8px] uppercase tracking-widest px-2.5 py-1 border-none">
                      <Crown className="w-2.5 h-2.5 mr-1.5" /> Pro
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                  <button
                    onClick={(e) => toggleFavorite(theme.id, e)}
                    className={cn(
                      "p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm",
                      favorites.includes(theme.id) ? "bg-red-500 text-white" : "bg-black/10 text-white hover:bg-black/20"
                    )}
                  >
                    <Heart className={cn("w-3 h-3", favorites.includes(theme.id) && "fill-current")} />
                  </button>
                </div>
              </div>
              {/* Theme Info */}
              <div className="p-7 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-bold text-base text-brand-text truncate max-w-[180px]">{theme.name}</h3>
                      <p className="text-[10px] text-brand-muted font-bold uppercase tracking-[0.2em]">{theme.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1.5">
                      <div className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.appearance.bgColor }} />
                      <div className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.appearance.colors.btnFill }} />
                      <div className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.appearance.colors.accent }} />
                    </div>
                    <span className="text-[10px] text-brand-muted font-medium tracking-tight">Handcrafted Palette</span>
                  </div>
                </div>
                <Button
                  className={cn(
                    "w-full h-12 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all",
                    currentThemeId === theme.appearance.themeId
                      ? "bg-brand-lime text-brand-text border border-brand-lime-dark/10"
                      : "bg-brand-bg text-brand-text hover:bg-brand-purple hover:text-white border border-brand-border"
                  )}
                >
                  {currentThemeId === theme.appearance.themeId ? (
                    <><Check className="w-3.5 h-3.5 mr-2" /> Current Active</>
                  ) : (
                    'Apply Aesthetic'
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {filteredThemes.length === 0 && (
        <div className="text-center py-24 bg-brand-bg/50 rounded-[3rem] border-2 border-dashed border-brand-border flex flex-col items-center justify-center space-y-4">
          <p className="text-brand-muted font-serif italic text-xl">No themes match your criteria.</p>
          <Button variant="link" onClick={() => { setSearch(''); setFilter('All'); }} className="text-brand-purple font-bold uppercase tracking-widest text-xs">Clear Search Filters</Button>
        </div>
      )}
    </div>
  );
}