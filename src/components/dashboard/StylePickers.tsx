import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SYSTEM_FONTS, GOOGLE_FONTS, BG_PATTERNS, GRADIENT_PRESETS } from '@/lib/constants';
import { Appearance } from '@/store/useProfile';
export function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">{label}</Label>
      <div className="flex gap-2">
        <div
          className="w-10 h-10 rounded-lg border border-brand-border shrink-0 shadow-sm"
          style={{ backgroundColor: value }}
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white border-brand-border h-10 font-mono text-xs rounded-lg text-brand-text"
        />
        <input
          type="color"
          value={value.startsWith('#') ? value : '#000000'}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
          id={`picker-${label}`}
        />
        <label htmlFor={`picker-${label}`} className="cursor-pointer h-10 px-4 bg-brand-bg border border-brand-border rounded-lg flex items-center text-[10px] font-bold hover:bg-white text-brand-text uppercase tracking-widest transition-colors shadow-sm">
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
            selected === font.id ? "bg-brand-purple border-brand-purple text-white shadow-md shadow-brand-purple/20" : "bg-white border-brand-border text-brand-text hover:bg-brand-bg"
          )}
          style={{ fontFamily: font.family }}
        >
          <span className="block text-sm mb-1 font-bold">Abc</span>
          <span className="text-[9px] uppercase tracking-tighter opacity-70">{font.name}</span>
        </button>
      ))}
    </div>
  );
}
export function PatternPicker({
  selected,
  onSelect
}: {
  selected: Appearance['bgPattern'];
  onSelect: (id: Appearance['bgPattern']) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {BG_PATTERNS.map((pattern) => (
        <button
          key={pattern.id}
          onClick={() => onSelect(pattern.id as Appearance['bgPattern'])}
          className={cn(
            "p-4 rounded-xl border text-left transition-all group",
            selected === pattern.id ? "bg-brand-purple border-brand-purple text-white shadow-md shadow-brand-purple/20" : "bg-white border-brand-border text-brand-text hover:bg-brand-bg"
          )}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1">{pattern.name}</p>
          <p className="text-[8px] opacity-70 line-clamp-1 font-medium">{pattern.desc}</p>
        </button>
      ))}
    </div>
  );
}
export function GradientSelector({
  selected,
  onSelect
}: {
  selected: Appearance['bgGradient'];
  onSelect: (stops: Appearance['bgGradient']['stops']) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {GRADIENT_PRESETS.map((preset) => {
        const isActive = JSON.stringify(selected.stops) === JSON.stringify(preset.stops);
        return (
          <button
            key={preset.id}
            onClick={() => onSelect(preset.stops)}
            className={cn(
              "p-3 rounded-xl border flex items-center gap-3 transition-all",
              isActive ? "border-brand-purple bg-brand-purple/5 ring-1 ring-brand-purple/20" : "border-brand-border bg-white hover:bg-brand-bg"
            )}
          >
            <div
              className="w-8 h-8 rounded-lg shrink-0 border border-brand-border/10"
              style={{ background: `linear-gradient(180deg, ${preset.stops[0].color}, ${preset.stops[1].color})` }}
            />
            <span className={cn("text-[10px] font-bold uppercase tracking-widest", isActive ? "text-brand-purple" : "text-brand-text")}>
              {preset.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
export function ButtonStyleSelector({
  style,
  shadow,
  onStyleChange,
  onShadowChange
}: {
  style: Appearance['buttonStyle'];
  shadow: Appearance['buttonShadow'];
  onStyleChange: (v: Appearance['buttonStyle']) => void;
  onShadowChange: (v: Appearance['buttonShadow']) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2">
        {(['fill', 'outline'] as const).map((s) => (
          <button
            key={s}
            onClick={() => onStyleChange(s)}
            className={cn(
              "p-4 rounded-xl border transition-all text-[10px] font-bold uppercase tracking-widest",
              style === s ? "bg-brand-purple border-brand-purple text-white shadow-md shadow-brand-purple/20" : "bg-white border-brand-border text-brand-text hover:bg-brand-bg"
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(['none', 'soft', 'hard'] as const).map((s) => (
          <button
            key={s}
            onClick={() => onShadowChange(s)}
            className={cn(
              "p-3 rounded-xl border transition-all text-[9px] font-bold uppercase tracking-tighter",
              shadow === s ? "bg-brand-purple border-brand-purple text-white shadow-md shadow-brand-purple/20" : "bg-white border-brand-border text-brand-text hover:bg-brand-bg"
            )}
          >
            {s} Shadow
          </button>
        ))}
      </div>
    </div>
  );
}