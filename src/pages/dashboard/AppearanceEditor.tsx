import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useProfile } from '@/store/useProfile';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ProfilePreview } from '@/components/dashboard/ProfilePreview';
import { ColorPicker, FontSelector, ButtonStyleSelector, PatternPicker, GradientSelector } from '@/components/dashboard/StylePickers';
import { ThemeGallery } from '@/components/dashboard/ThemeGallery';
import { CodeEditor } from '@/components/dashboard/CodeEditor';
import { UserCircle, Palette, Type, Layers, LayoutGrid, Crown, Maximize2, Code, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BUTTON_SHAPES, SOCIAL_STYLES } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
export function AppearanceEditor() {
  const name = useProfile(s => s.name);
  const tagline = useProfile(s => s.tagline);
  const bio = useProfile(s => s.bio);
  const appearance = useProfile(useShallow(s => s.appearance));
  const updateProfile = useProfile(s => s.updateProfile);
  const updateAppearance = useProfile(s => s.updateAppearance);
  const handleColorChange = (key: string, value: string) => {
    updateAppearance((prev) => ({
      ...prev,
      colors: { ...prev.colors, [key]: value }
    }));
  };
  const handleLayoutChange = (key: string, value: any) => {
    updateAppearance((prev) => ({
      ...prev,
      layout: { ...prev.layout, [key]: value }
    }));
  };
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-8 md:py-10 lg:py-16 font-karla">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Configuration Column */}
        <div className="lg:col-span-7 space-y-10">
          <Tabs defaultValue="library" className="space-y-10">
            <TabsList className="w-full justify-start bg-white border border-brand-border p-1.5 rounded-2xl h-auto gap-1.5 overflow-x-auto shadow-sm sticky top-2 z-30">
              {[
                { id: 'library', icon: LayoutGrid, label: 'Library' },
                { id: 'profile', icon: UserCircle, label: 'Profile' },
                { id: 'appearance', icon: Palette, label: 'Styles' },
                { id: 'layout', icon: Maximize2, label: 'Layout' },
                { id: 'code', icon: Code, label: 'Pro Code' },
              ].map(tab => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-brand-purple data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-all text-brand-muted hover:text-brand-text relative"
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <AnimatePresence mode="wait">
              <TabsContent value="library" className="animate-in fade-in slide-in-from-bottom-2 duration-500 outline-none">
                <ThemeGallery />
              </TabsContent>
              <TabsContent value="profile" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 outline-none">
                <section className="bg-white border border-brand-border p-10 rounded-3xl shadow-xl shadow-brand-purple/5 space-y-8">
                  <div className="space-y-3">
                    <Label className="text-[11px] uppercase tracking-[0.2em] text-brand-muted font-bold">Identity Title</Label>
                    <Input value={name} onChange={(e) => updateProfile({ name: e.target.value })} className="bg-brand-bg border-brand-border rounded-xl h-14 font-bold text-base focus:ring-brand-purple/20" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[11px] uppercase tracking-[0.2em] text-brand-muted font-bold">Curated Tagline</Label>
                    <Input value={tagline} onChange={(e) => updateProfile({ tagline: e.target.value })} className="bg-brand-bg border-brand-border rounded-xl h-14 italic focus:ring-brand-purple/20" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[11px] uppercase tracking-[0.2em] text-brand-muted font-bold">Editorial Bio</Label>
                    <Textarea value={bio} onChange={(e) => updateProfile({ bio: e.target.value })} className="bg-brand-bg border-brand-border rounded-xl min-h-[140px] focus:ring-brand-purple/20 leading-relaxed" />
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="appearance" className="space-y-14 animate-in fade-in slide-in-from-bottom-2 duration-500 outline-none">
                <div className="space-y-8">
                  <Label className="text-[11px] uppercase tracking-[0.25em] text-brand-purple font-bold flex items-center gap-3">
                    <Layers className="w-4 h-4" /> Canvas Foundations
                  </Label>
                  <div className="bg-white border border-brand-border p-8 rounded-3xl shadow-xl shadow-brand-purple/5 space-y-10">
                    <div className="flex gap-2 bg-brand-bg p-1.5 rounded-2xl border border-brand-border w-fit">
                      {(['color', 'gradient'] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => updateAppearance({ bgType: type })}
                          className={cn(
                            "px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                            appearance.bgType === type ? "bg-white text-brand-purple shadow-md" : "text-brand-muted hover:text-brand-text"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    {appearance.bgType === 'color' ? (
                      <ColorPicker label="Background Architecture" value={appearance.bgColor} onChange={(v) => updateAppearance({ bgColor: v })} />
                    ) : (
                      <GradientSelector
                        selected={appearance.bgGradient}
                        onSelect={(stops) => updateAppearance({ bgGradient: { ...appearance.bgGradient, stops } })}
                      />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <PatternPicker
                        selected={appearance.bgPattern}
                        onSelect={(id) => updateAppearance({ bgPattern: id as any })}
                      />
                      <ColorPicker label="Accent Highlight" value={appearance.colors.accent} onChange={(v) => handleColorChange('accent', v)} />
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <Label className="text-[11px] uppercase tracking-[0.25em] text-brand-purple font-bold flex items-center gap-3">
                    <Type className="w-4 h-4" /> Typographic Pairings
                  </Label>
                  <div className="bg-white border border-brand-border p-8 rounded-3xl shadow-xl shadow-brand-purple/5">
                    <FontSelector selected={appearance.fontPairId} onSelect={(id) => updateAppearance({ fontPairId: id })} />
                  </div>
                </div>
                <div className="space-y-8">
                  <Label className="text-[11px] uppercase tracking-[0.25em] text-brand-purple font-bold">Element Stylings</Label>
                  <div className="bg-white border border-brand-border p-8 rounded-3xl shadow-xl shadow-brand-purple/5 space-y-10">
                    <div className="grid grid-cols-3 gap-3">
                      {BUTTON_SHAPES.map(shape => (
                        <button
                          key={shape.id}
                          onClick={() => updateAppearance({ buttonShape: shape.id as any })}
                          className={cn(
                            "p-5 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all",
                            appearance.buttonShape === shape.id ? "bg-brand-purple text-white border-brand-purple shadow-lg" : "bg-white border-brand-border text-brand-text hover:bg-brand-bg"
                          )}
                        >
                          {shape.name}
                        </button>
                      ))}
                    </div>
                    <ButtonStyleSelector
                      style={appearance.buttonStyle}
                      shadow={appearance.buttonShadow}
                      onStyleChange={(v) => updateAppearance({ buttonStyle: v })}
                      onShadowChange={(v) => updateAppearance({ buttonShadow: v })}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="layout" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 outline-none">
                <section className="bg-white border border-brand-border p-10 rounded-3xl shadow-xl shadow-brand-purple/5 space-y-12">
                  <div className="space-y-6">
                    <Label className="text-[11px] uppercase tracking-[0.2em] text-brand-muted font-bold flex items-center gap-3">
                      <Share2 className="w-4 h-4" /> Social Connection Aesthetics
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {SOCIAL_STYLES.map(style => (
                        <button
                          key={style.id}
                          onClick={() => handleLayoutChange('socialIconStyle', style.id)}
                          className={cn(
                            "px-5 py-4 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all",
                            appearance.layout.socialIconStyle === style.id ? "bg-brand-purple text-white border-brand-purple shadow-lg" : "bg-brand-bg border-brand-border text-brand-muted hover:text-brand-text"
                          )}
                        >
                          {style.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-10 border-t border-brand-border pt-12">
                    <Label className="text-[11px] uppercase tracking-[0.2em] text-brand-muted font-bold">Avatar Composition</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <ColorPicker label="Avatar Frame" value={appearance.layout.avatarBorderColor} onChange={(v) => handleLayoutChange('avatarBorderColor', v)} />
                      <div className="space-y-6">
                        <div className="flex justify-between items-end">
                          <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Frame Depth</Label>
                          <span className="text-sm font-bold text-brand-purple font-mono">{appearance.layout.avatarBorderWidth}px</span>
                        </div>
                        <Slider
                          value={[appearance.layout.avatarBorderWidth]}
                          max={12}
                          step={1}
                          onValueChange={([v]) => handleLayoutChange('avatarBorderWidth', v)}
                          className="py-4"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8 border-t border-brand-border pt-12">
                    <div className="flex justify-between items-end">
                      <Label className="text-[11px] uppercase tracking-[0.2em] text-brand-muted font-bold">Editorial Canvas Breadth</Label>
                      <span className="text-sm text-brand-purple font-bold font-mono">{appearance.layout.containerWidth}px</span>
                    </div>
                    <Slider
                      value={[appearance.layout.containerWidth]}
                      min={400}
                      max={840}
                      step={20}
                      onValueChange={([v]) => handleLayoutChange('containerWidth', v)}
                      className="py-4"
                    />
                  </div>
                  <div className="flex items-center justify-between p-8 bg-brand-purple/5 border border-brand-purple/10 rounded-3xl">
                    <div className="space-y-1">
                       <p className="font-bold text-base text-brand-text flex items-center gap-3">White-Label Professional <Crown className="w-4 h-4 text-brand-purple" /></p>
                       <p className="text-[11px] text-brand-muted uppercase tracking-widest font-medium">Remove global OnyxBio branding</p>
                    </div>
                    <Switch
                      checked={appearance.layout.hideBranding}
                      onCheckedChange={(v) => handleLayoutChange('hideBranding', v)}
                      className="data-[state=checked]:bg-brand-purple"
                    />
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="code" className="animate-in fade-in slide-in-from-bottom-2 duration-500 min-h-[600px] outline-none">
                <CodeEditor />
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
        {/* Preview Column */}
        <div className="hidden lg:block lg:col-span-5 relative">
          <ProfilePreview />
        </div>
      </div>
    </div>
  );
}