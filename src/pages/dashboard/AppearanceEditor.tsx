import React from 'react';
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
export function AppearanceEditor() {
  const name = useProfile(s => s.name);
  const tagline = useProfile(s => s.tagline);
  const bio = useProfile(s => s.bio);
  const appearance = useProfile(s => s.appearance);
  const updateProfile = useProfile(s => s.updateProfile);
  const updateAppearance = useProfile(s => s.updateAppearance);
  const handleColorChange = (key: keyof typeof appearance.colors, value: string) => {
    updateAppearance({ colors: { ...appearance.colors, [key]: value } });
  };
  const handleLayoutChange = (key: keyof typeof appearance.layout, value: any) => {
    updateAppearance({ layout: { ...appearance.layout, [key]: value } });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <Tabs defaultValue="library" className="space-y-8">
            <TabsList className="w-full justify-start bg-brand-bg border border-brand-border p-1 rounded-xl h-auto gap-1 overflow-x-auto">
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
                  className="data-[state=active]:bg-white data-[state=active]:text-brand-purple data-[state=active]:shadow-sm rounded-lg px-4 py-2 text-xs font-bold uppercase transition-all text-brand-muted hover:text-brand-text"
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="library" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <ThemeGallery />
            </TabsContent>
            <TabsContent value="profile" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section className="bg-white border border-brand-border p-8 rounded-2xl shadow-sm space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Display Name</Label>
                  <Input value={name} onChange={(e) => updateProfile({ name: e.target.value })} className="bg-brand-bg border-brand-border rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Professional Tagline</Label>
                  <Input value={tagline} onChange={(e) => updateProfile({ tagline: e.target.value })} className="bg-brand-bg border-brand-border rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Biography</Label>
                  <Textarea value={bio} onChange={(e) => updateProfile({ bio: e.target.value })} className="bg-brand-bg border-brand-border rounded-xl min-h-[100px]" />
                </div>
              </section>
            </TabsContent>
            <TabsContent value="appearance" className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-6">
                <Label className="text-[10px] uppercase tracking-widest text-brand-purple font-bold flex items-center gap-2">
                  <Layers className="w-3 h-3" /> Canvas Architecture
                </Label>
                <div className="flex gap-2 mb-4 bg-brand-bg p-1 rounded-xl border border-brand-border w-fit">
                  {(['color', 'gradient'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => updateAppearance({ bgType: type })}
                      className={cn(
                        "px-6 py-2 rounded-lg text-[10px] font-bold uppercase transition-all",
                        appearance.bgType === type ? "bg-white text-brand-purple shadow-sm" : "text-brand-muted hover:text-brand-text"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {appearance.bgType === 'color' ? (
                  <ColorPicker label="Canvas Color" value={appearance.bgColor} onChange={(v) => updateAppearance({ bgColor: v })} />
                ) : (
                  <GradientSelector
                    selected={appearance.bgGradient}
                    onSelect={(stops) => updateAppearance({ bgGradient: { ...appearance.bgGradient, stops } })}
                  />
                )}
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-[10px] uppercase tracking-widest text-brand-muted mb-4 block font-bold">Atmospheric Overlay</Label>
                    <PatternPicker
                      selected={appearance.bgPattern}
                      onSelect={(id) => updateAppearance({ bgPattern: id as any })}
                    />
                  </div>
                  <div className="space-y-4">
                    <ColorPicker label="Accent Color (Widgets)" value={appearance.colors.accent} onChange={(v) => handleColorChange('accent', v)} />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-[10px] uppercase tracking-widest text-brand-purple font-bold flex items-center gap-2">
                  <Type className="w-3 h-3" /> Typography Pairing
                </Label>
                <FontSelector selected={appearance.fontPairId} onSelect={(id) => updateAppearance({ fontPairId: id })} />
              </div>
              <div className="space-y-6">
                <Label className="text-[10px] uppercase tracking-widest text-brand-purple font-bold">Button & Component Styles</Label>
                <div className="grid grid-cols-3 gap-2">
                  {BUTTON_SHAPES.map(shape => (
                    <button
                      key={shape.id}
                      onClick={() => updateAppearance({ buttonShape: shape.id as any })}
                      className={cn(
                        "p-4 rounded-xl border text-[10px] font-bold uppercase transition-all",
                        appearance.buttonShape === shape.id ? "bg-brand-purple text-white border-brand-purple" : "bg-white border-brand-border text-brand-text hover:bg-brand-bg"
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
            </TabsContent>
            <TabsContent value="layout" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <section className="bg-white border border-brand-border p-8 rounded-2xl shadow-sm space-y-10">
                  <div className="space-y-4">
                    <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold block flex items-center gap-2">
                      <Share2 className="w-3 h-3" /> Social Connection Style
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {SOCIAL_STYLES.map(style => (
                        <button
                          key={style.id}
                          onClick={() => handleLayoutChange('socialIconStyle', style.id)}
                          className={cn(
                            "px-4 py-3 rounded-xl border text-[10px] font-bold uppercase transition-all",
                            appearance.layout.socialIconStyle === style.id ? "bg-brand-purple text-white border-brand-purple" : "bg-brand-bg border-brand-border text-brand-muted hover:text-brand-text"
                          )}
                        >
                          {style.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6 border-t border-brand-border pt-8">
                    <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold block">Avatar Architecture</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <ColorPicker label="Avatar Border Color" value={appearance.layout.avatarBorderColor} onChange={(v) => handleLayoutChange('avatarBorderColor', v)} />
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Border Width</Label>
                          <span className="text-xs font-bold text-brand-purple">{appearance.layout.avatarBorderWidth}px</span>
                        </div>
                        <Slider
                          value={[appearance.layout.avatarBorderWidth]}
                          max={8}
                          step={1}
                          onValueChange={([v]) => handleLayoutChange('avatarBorderWidth', v)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 border-t border-brand-border pt-8">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Editorial Canvas Width</Label>
                        <span className="text-xs text-brand-purple font-bold">{appearance.layout.containerWidth}px</span>
                      </div>
                      <Slider
                        value={[appearance.layout.containerWidth]}
                        min={400}
                        max={800}
                        step={20}
                        onValueChange={([v]) => handleLayoutChange('containerWidth', v)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-brand-purple/5 border border-brand-purple/10 rounded-2xl">
                    <div className="space-y-1">
                       <p className="font-bold text-sm text-brand-text flex items-center gap-2">White-Label Mode <Crown className="w-3 h-3 text-brand-purple" /></p>
                       <p className="text-[10px] text-brand-muted uppercase">Remove OnyxBio watermark</p>
                    </div>
                    <Switch
                      checked={appearance.layout.hideBranding}
                      onCheckedChange={(v) => handleLayoutChange('hideBranding', v)}
                    />
                  </div>
               </section>
            </TabsContent>
            <TabsContent value="code" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <CodeEditor />
            </TabsContent>
          </Tabs>
        </div>
        <div className="lg:col-span-5 relative">
          <ProfilePreview />
        </div>
      </div>
    </div>
  );
}