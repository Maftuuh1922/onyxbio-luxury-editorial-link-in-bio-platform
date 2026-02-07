import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SYSTEM_FONTS, GOOGLE_FONTS } from '@/lib/constants';
export function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] uppercase tracking-widest text-onyx-gray">{label}</Label>
      <div className="flex gap-2">
        <div 
          className="w-10 h-10 rounded-lg border border-white/10 shrink-0" 
          style={{ backgroundColor: value }} 
        />
        <Input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          className="bg-white/5 border-white/10 h-10 font-mono text-xs"
        />
        <input 
          type="color" 
          value={value.startsWith('#') ? value : '#000000'} 
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
          id={`picker-${label}`}
        />
        <label htmlFor={`picker-${label}`} className="cursor-pointer h-10 px-3 bg-white/5 border border-white/10 rounded-lg flex items-center text-[10px] font-bold hover:bg-white/10">
          PICK
        </label>
      </div>
    </div>
  );
}
export function FontSelector({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const allFonts = [...SYSTEM_FONTS, ...GOOGLE_FONTS];
  return (
    <div className="grid grid-cols-2 gap-2">
      {allFonts.map((font) => (
        <button
          key={font.id}
          onClick={() => onSelect(font.id)}
          className={cn(
            "p-3 rounded-xl border text-left transition-all",
            selected === font.id ? "bg-onyx-gold border-onyx-gold text-onyx-dark" : "bg-white/5 border-white/10 text-onyx-white hover:border-white/20"
          )}
          style={{ fontFamily: font.family }}
        >
          <span className="block text-sm mb-1">Abc</span>
          <span className="text-[9px] uppercase tracking-tighter opacity-70">{font.name}</span>
        </button>
      ))}
    </div>
  );
}
export function ButtonStyleSelector({ 
  style, 
  shadow, 
  onStyleChange, 
  onShadowChange 
}: { 
  style: string; 
  shadow: string; 
  onStyleChange: (v: any) => void; 
  onShadowChange: (v: any) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2">
        {['fill', 'outline'].map((s) => (
          <button
            key={s}
            onClick={() => onStyleChange(s)}
            className={cn(
              "p-4 rounded-xl border transition-all text-[10px] font-bold uppercase tracking-widest",
              style === s ? "bg-onyx-gold border-onyx-gold text-onyx-dark" : "bg-white/5 border-white/10 text-onyx-white"
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {['none', 'soft', 'hard'].map((s) => (
          <button
            key={s}
            onClick={() => onShadowChange(s)}
            className={cn(
              "p-3 rounded-xl border transition-all text-[9px] font-bold uppercase tracking-tighter",
              shadow === s ? "bg-onyx-gold border-onyx-gold text-onyx-dark" : "bg-white/5 border-white/10 text-onyx-white"
            )}
          >
            {s} Shadow
          </button>
        ))}
      </div>
    </div>
  );
}