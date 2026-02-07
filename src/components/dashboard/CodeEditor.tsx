import React, { useRef, useEffect, useState } from 'react';
import { useProfile } from '@/store/useProfile';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert, Info, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
interface EditorBlockProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  language?: string;
}
function ProfessionalEditor({ value, onChange, placeholder }: EditorBlockProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const lineCount = value.split('\n').length;
  const lines = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group border border-brand-border rounded-xl overflow-hidden bg-[#0d1117] shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
        <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest font-mono">Editor Buffer</span>
        <button 
          onClick={handleCopy}
          className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-brand-muted hover:text-white"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-brand-lime" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <div className="flex h-[350px] overflow-hidden">
        {/* Line Number Gutter */}
        <div 
          ref={gutterRef}
          className="w-12 bg-[#0d1117] border-r border-[#30363d] py-4 flex flex-col items-center select-none overflow-hidden scrollbar-hide"
        >
          {lines.map(line => (
            <span key={line} className="text-[11px] font-mono text-[#484f58] leading-6 h-6">{line}</span>
          ))}
        </div>
        {/* Main Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          placeholder={placeholder}
          spellCheck={false}
          className="flex-1 bg-transparent text-[#e6edf3] font-mono text-sm leading-6 py-4 px-4 resize-none outline-none scrollbar-thin scrollbar-thumb-[#30363d] scrollbar-track-transparent overflow-x-auto whitespace-pre"
        />
      </div>
    </div>
  );
}
export function CodeEditor() {
  const customCode = useProfile(s => s.customCode);
  const updateCustomCode = useProfile(s => s.updateCustomCode);
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between bg-white border border-brand-border p-6 rounded-2xl shadow-sm">
        <div className="space-y-1">
          <Label className="font-bold text-brand-text text-base">Custom Code Injection</Label>
          <p className="text-[11px] text-brand-muted font-bold uppercase tracking-widest">Active overrides for editorial precision</p>
        </div>
        <Switch
          checked={customCode.enabled}
          onCheckedChange={(checked) => updateCustomCode({ enabled: checked })}
          className="data-[state=checked]:bg-brand-purple"
        />
      </div>
      {!customCode.enabled && (
        <Alert className="bg-brand-purple/5 border-brand-purple/20 rounded-2xl">
          <Info className="h-4 w-4 text-brand-purple" />
          <AlertDescription className="text-xs text-brand-muted font-medium italic pl-2">
            Code injection is currently idle. Enable the toggle above to apply your custom scripts and styles to your atelier.
          </AlertDescription>
        </Alert>
      )}
      <div className={customCode.enabled ? "opacity-100" : "opacity-40 pointer-events-none grayscale-[0.5]"}>
        <Tabs defaultValue="css" className="space-y-6">
          <TabsList className="bg-brand-bg border border-brand-border p-1.5 rounded-xl w-fit h-auto gap-1">
            <TabsTrigger value="css" className="text-[10px] uppercase font-bold tracking-widest px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-brand-purple data-[state=active]:shadow-sm rounded-lg">CSS Styles</TabsTrigger>
            <TabsTrigger value="html" className="text-[10px] uppercase font-bold tracking-widest px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-brand-purple data-[state=active]:shadow-sm rounded-lg">HTML Modules</TabsTrigger>
            <TabsTrigger value="js" className="text-[10px] uppercase font-bold tracking-widest px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-brand-purple data-[state=active]:shadow-sm rounded-lg">Scripting</TabsTrigger>
          </TabsList>
          <TabsContent value="css" className="space-y-4 outline-none">
            <Label className="text-[11px] text-brand-muted font-bold uppercase tracking-widest px-1">Global Style Overrides</Label>
            <ProfessionalEditor
              value={customCode.css}
              onChange={(css) => updateCustomCode({ css })}
              placeholder="/* .onyx-profile { filter: sepia(0.2); } */"
            />
          </TabsContent>
          <TabsContent value="html" className="space-y-4 outline-none">
            <Label className="text-[11px] text-brand-muted font-bold uppercase tracking-widest px-1">Structure Injection</Label>
            <ProfessionalEditor
              value={customCode.html}
              onChange={(html) => updateCustomCode({ html })}
              placeholder="<!-- Add custom tracking pixels or head elements here -->"
            />
          </TabsContent>
          <TabsContent value="js" className="space-y-4 outline-none">
            <div className="flex items-center justify-between px-1">
              <Label className="text-[11px] text-brand-muted font-bold uppercase tracking-widest">Client-Side Logic</Label>
              <div className="flex items-center gap-2 text-[9px] font-bold text-red-500 uppercase tracking-tighter">
                <ShieldAlert className="w-3 h-3" /> Security Warning Active
              </div>
            </div>
            <ProfessionalEditor
              value={customCode.js}
              onChange={(js) => updateCustomCode({ js })}
              placeholder="console.log('Atelier Interface Initialized');"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}