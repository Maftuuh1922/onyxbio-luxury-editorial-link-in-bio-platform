import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useProfile } from '@/store/useProfile';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { ProfilePreview } from '@/components/dashboard/ProfilePreview';
import { ColorPicker, FontSelector, ButtonStyleSelector, PatternPicker, GradientSelector } from '@/components/dashboard/StylePickers';
import { CodeEditor } from '@/components/dashboard/CodeEditor';
import { UserCircle, Palette, Type, Layout, Code, Settings as SettingsIcon, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BUTTON_SHAPES } from '@/lib/constants';
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
          <Tabs defaultValue="appearance" className="space-y-8">
            <TabsList className="w-full justify-start bg-brand-bg border border-brand-border p-1 rounded-xl h-auto gap-1 overflow-x-auto">
              {[
                { id: 'profile', icon: UserCircle, label: 'Profile' },
                { id: 'appearance', icon: Palette, label: 'Styles' },
                { id: 'links', icon: Layout, label: 'Links' },
                { id: 'code', icon: Code, label: 'Code' },
                { id: 'settings', icon: SettingsIcon, label: 'Settings' }
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
            <TabsContent value="profile" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section className="bg-white border border-brand-border p-8 rounded-2xl shadow-sm space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Display Name</Label>
                  <Input value={name} onChange={(e) => updateProfile({ name: e.target.value })} className="bg-brand-bg border-brand-border rounded-xl h-12 text-brand-text focus:ring-brand-purple/20" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Tagline</Label>
                  <Input value={tagline} onChange={(e) => updateProfile({ tagline: e.target.value })} className="bg-brand-bg border-brand-border rounded-xl h-12 text-brand-text focus:ring-brand-purple/20" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Bio</Label>
                  <Textarea value={bio} onChange={(e) => updateProfile({ bio: e.target.value })} className="bg-brand-bg border-brand-border rounded-xl min-h-[100px] text-brand-text focus:ring-brand-purple/20" />
                </div>
              </section>
            </TabsContent>
            <TabsContent value="appearance" className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Background Engine */}
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
                <div className="pt-4">
                  <Label className="text-[10px] uppercase tracking-widest text-brand-muted mb-4 block font-bold">Cinematic Pattern</Label>
                  <PatternPicker
                    selected={appearance.bgPattern}
                    onSelect={(id) => updateAppearance({ bgPattern: id as any })}
                  />
                </div>
              </div>
              {/* Typography */}
              <div className="space-y-4">
                <Label className="text-[10px] uppercase tracking-widest text-brand-purple font-bold flex items-center gap-2">
                  <Type className="w-3 h-3" /> Typography Engine
                </Label>
                <FontSelector selected={appearance.fontPairId} onSelect={(id) => updateAppearance({ fontPairId: id })} />
              </div>
              {/* Buttons */}
              <div className="space-y-6">
                <Label className="text-[10px] uppercase tracking-widest text-brand-purple font-bold">Button Architecture</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {BUTTON_SHAPES.map(shape => (
                    <button
                      key={shape.id}
                      onClick={() => updateAppearance({ buttonShape: shape.id as any })}
                      className={cn(
                        "p-4 rounded-xl border text-[10px] font-bold uppercase transition-all",
                        appearance.buttonShape === shape.id ? "bg-brand-purple text-white border-brand-purple shadow-md shadow-brand-purple/10" : "bg-white border-brand-border text-brand-text hover:bg-brand-bg"
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
              {/* Profile Colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-brand-border">
                <ColorPicker label="Primary Text" value={appearance.colors.profileText} onChange={(v) => handleColorChange('profileText', v)} />
                <ColorPicker label="Button Fill" value={appearance.colors.btnFill} onChange={(v) => handleColorChange('btnFill', v)} />
                <ColorPicker label="Button Text" value={appearance.colors.btnText} onChange={(v) => handleColorChange('btnText', v)} />
                <ColorPicker label="Accent Glow" value={appearance.colors.accent} onChange={(v) => handleColorChange('accent', v)} />
              </div>
            </TabsContent>
            <TabsContent value="links" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section className="bg-white border border-brand-border p-8 rounded-2xl shadow-sm space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Button Spacing</Label>
                    <span className="text-xs text-brand-purple font-bold">{appearance.layout.buttonSpacing}px</span>
                  </div>
                  <Slider
                    value={[appearance.layout.buttonSpacing]}
                    max={40}
                    step={2}
                    onValueChange={([v]) => handleLayoutChange('buttonSpacing', v)}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Max Container Width</Label>
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
              </section>
            </TabsContent>
            <TabsContent value="code" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <CodeEditor />
            </TabsContent>
            <TabsContent value="settings" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="bg-white border border-brand-border p-8 rounded-2xl shadow-sm">
                 <p className="text-brand-muted text-sm font-serif italic">Advanced profile SEO and sharing settings are enabled for Pro members.</p>
               </div>
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