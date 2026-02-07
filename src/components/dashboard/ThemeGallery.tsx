import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Check, Crown, Star, Heart } from 'lucide-react';
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
          <Input 
            placeholder="Search designer themes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-12 bg-white border-brand-border rounded-xl focus:ring-brand-purple/20" 
          />
        </div>
        <div className="flex gap-1 overflow-x-auto pb-2 md:pb-0">
          {(['All', 'Editorial', 'Minimal', 'Vibrant', 'Dark', 'Creative'] as const).map(cat => (
            <Button
              key={cat}
              variant={filter === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full px-4 h-12 font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredThemes.map((theme, i) => (
            <motion.div
              layout
              key={theme.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "group relative bg-white border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer",
                currentThemeId === theme.appearance.themeId ? "border-brand-purple ring-2 ring-brand-purple/20" : "border-brand-border"
              )}
              onClick={() => handleApply(theme)}
            >
              {/* Theme Preview Card */}
              <div 
                className="h-40 relative flex items-center justify-center p-4"
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
                <div className="relative z-10 w-full max-w-[160px] space-y-2">
                  <div className="h-6 w-full rounded-full shadow-sm flex items-center px-3" 
                    style={{ backgroundColor: theme.appearance.colors.btnFill, color: theme.appearance.colors.btnText }}>
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: theme.appearance.colors.accent }} />
                    <div className="h-1 w-12 bg-current opacity-40 rounded-full" />
                  </div>
                  <div className="h-6 w-full rounded-full shadow-sm flex items-center px-3 opacity-60" 
                    style={{ backgroundColor: theme.appearance.colors.btnFill, color: theme.appearance.colors.btnText }}>
                    <div className="h-1 w-16 bg-current opacity-40 rounded-full" />
                  </div>
                </div>
                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={(e) => toggleFavorite(theme.id, e)}
                    className={cn(
                      "p-2 rounded-full backdrop-blur-md transition-all",
                      favorites.includes(theme.id) ? "bg-red-500 text-white" : "bg-black/10 text-white hover:bg-black/20"
                    )}
                  >
                    <Heart className={cn("w-3 h-3", favorites.includes(theme.id) && "fill-current")} />
                  </button>
                </div>
              </div>
              {/* Theme Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-brand-text group-hover:text-brand-purple transition-colors">{theme.name}</h3>
                    <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest">{theme.category}</p>
                  </div>
                  {theme.isPro && (
                    <Badge className="bg-onyx-gold text-onyx-dark font-bold text-[8px] uppercase px-2">
                      <Crown className="w-2 h-2 mr-1" /> Pro
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: theme.appearance.bgColor }} />
                    <div className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: theme.appearance.colors.btnFill }} />
                    <div className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: theme.appearance.colors.accent }} />
                  </div>
                  <span className="text-[10px] text-brand-muted font-medium ml-1">Palette curated for mobile</span>
                </div>
                <Button 
                  className={cn(
                    "w-full h-10 rounded-xl font-bold text-xs transition-all",
                    currentThemeId === theme.appearance.themeId 
                      ? "bg-brand-lime text-brand-text" 
                      : "bg-brand-bg text-brand-text hover:bg-brand-purple hover:text-white"
                  )}
                >
                  {currentThemeId === theme.appearance.themeId ? (
                    <><Check className="w-3 h-3 mr-2" /> Currently Applied</>
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
        <div className="text-center py-20 bg-brand-bg rounded-[3rem] border border-dashed border-brand-border">
          <p className="text-brand-muted font-serif italic text-lg">No themes match your current search.</p>
          <Button variant="link" onClick={() => { setSearch(''); setFilter('All'); }} className="text-brand-purple font-bold">Clear Filters</Button>
        </div>
      )}
    </div>
  );
}