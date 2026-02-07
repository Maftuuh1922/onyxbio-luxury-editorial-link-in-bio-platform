import React from 'react';
import { useProfile } from '@/store/useProfile';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert, Info } from 'lucide-react';
export function CodeEditor() {
  const customCode = useProfile(s => s.customCode);
  const updateCustomCode = useProfile(s => s.updateCustomCode);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-2xl">
        <div className="space-y-1">
          <Label className="font-bold text-onyx-white">Enable Custom Code Injection</Label>
          <p className="text-[10px] text-onyx-gray uppercase tracking-widest">Use at your own risk. External scripts may impact performance.</p>
        </div>
        <Switch 
          checked={customCode.enabled} 
          onCheckedChange={(checked) => updateCustomCode({ enabled: checked })} 
        />
      </div>
      {!customCode.enabled && (
        <Alert className="bg-onyx-gold/5 border-onyx-gold/20">
          <Info className="h-4 w-4 text-onyx-gold" />
          <AlertDescription className="text-xs text-onyx-gray italic">
            Custom code is currently disabled. Enable it to apply your custom HTML, CSS, and JavaScript to your public profile.
          </AlertDescription>
        </Alert>
      )}
      <div className={customCode.enabled ? "opacity-100" : "opacity-50 pointer-events-none"}>
        <Tabs defaultValue="css" className="space-y-4">
          <TabsList className="bg-white/5 border border-white/10 p-1 w-fit">
            <TabsTrigger value="css" className="text-[10px] uppercase font-bold tracking-widest data-[state=active]:bg-onyx-gold data-[state=active]:text-onyx-dark">CSS Styles</TabsTrigger>
            <TabsTrigger value="html" className="text-[10px] uppercase font-bold tracking-widest data-[state=active]:bg-onyx-gold data-[state=active]:text-onyx-dark">HTML Injection</TabsTrigger>
            <TabsTrigger value="js" className="text-[10px] uppercase font-bold tracking-widest data-[state=active]:bg-onyx-gold data-[state=active]:text-onyx-dark">JavaScript</TabsTrigger>
          </TabsList>
          <TabsContent value="css" className="space-y-2">
            <Label className="text-[10px] text-onyx-gray uppercase tracking-widest">Global CSS Overrides</Label>
            <Textarea 
              value={customCode.css} 
              onChange={(e) => updateCustomCode({ css: e.target.value })} 
              placeholder="/* Add your custom CSS here */"
              className="min-h-[300px] bg-black/40 border-white/10 font-mono text-xs text-onyx-white focus:border-onyx-gold transition-colors"
            />
          </TabsContent>
          <TabsContent value="html" className="space-y-2">
            <Label className="text-[10px] text-onyx-gray uppercase tracking-widest">Header/Footer HTML</Label>
            <Textarea 
              value={customCode.html} 
              onChange={(e) => updateCustomCode({ html: e.target.value })} 
              placeholder="<!-- Google Analytics tag, Custom Pixel, etc -->"
              className="min-h-[300px] bg-black/40 border-white/10 font-mono text-xs text-onyx-white focus:border-onyx-gold transition-colors"
            />
          </TabsContent>
          <TabsContent value="js" className="space-y-2">
            <Label className="text-[10px] text-onyx-gray uppercase tracking-widest">Client-Side Logic</Label>
            <div className="mb-2">
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 py-2">
                <ShieldAlert className="h-4 w-4" />
                <AlertDescription className="text-[10px] uppercase tracking-tighter">
                  Warning: Malicious scripts can compromise visitor security.
                </AlertDescription>
              </Alert>
            </div>
            <Textarea 
              value={customCode.js} 
              onChange={(e) => updateCustomCode({ js: e.target.value })} 
              placeholder="console.log('OnyxBio Pro Loaded');"
              className="min-h-[250px] bg-black/40 border-white/10 font-mono text-xs text-onyx-white focus:border-onyx-gold transition-colors"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}