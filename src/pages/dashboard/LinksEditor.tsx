import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { useShallow } from 'zustand/react/shallow';
import { CSS } from '@dnd-kit/utilities';
import { Plus, GripVertical, Trash2, Sparkles, Clock } from 'lucide-react';
import { useProfile, Link as LinkType } from '@/store/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { ProfilePreview } from '@/components/dashboard/ProfilePreview';
import { cn } from '@/lib/utils';
import { ICON_OPTIONS, LINK_TYPES, COMMERCE_PROVIDERS } from '@/lib/constants';
function SortableLinkCard({ link }: { link: LinkType }) {
  const updateLink = useProfile(s => s.updateLink);
  const deleteLink = useProfile(s => s.deleteLink);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });
  const IconData = ICON_OPTIONS.find(i => i.id === link.icon) || ICON_OPTIONS[0];
  const Icon = IconData.icon;
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 50 : 'auto' }}
      className={cn(
        "bg-white border border-brand-border rounded-2xl p-6 mb-4 flex items-center gap-5 group transition-all",
        isDragging ? "shadow-2xl ring-2 ring-brand-purple/20 scale-[1.02]" : "hover:border-brand-purple/30 shadow-sm",
        !link.active && "opacity-60 grayscale-[0.5]"
      )}
    >
      <button {...attributes} {...listeners} className="cursor-grab text-brand-muted hover:text-brand-purple p-1 shrink-0">
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="w-14 h-14 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-purple border border-brand-border shrink-0">
        <Icon className="w-7 h-7" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
           <h4 className="font-bold text-sm text-brand-text truncate">{link.title || 'Untitled Link'}</h4>
           {link.featured && <Sparkles className="w-3.5 h-3.5 text-brand-purple" />}
           {link.type !== 'standard' && (
             <span className="text-[9px] font-bold bg-brand-purple/5 text-brand-purple px-2 py-0.5 rounded-lg border border-brand-purple/10 uppercase tracking-tighter">
               {link.type}
             </span>
           )}
        </div>
        <p className="text-xs text-brand-muted font-medium truncate max-w-[240px]">{link.url || 'Dynamic Widget Content'}</p>
        <div className="flex items-center gap-4 mt-1.5">
          {link.schedule?.enabled && (
             <span className="text-[10px] font-bold text-brand-purple flex items-center gap-1.5">
               <Clock className="w-3.5 h-3.5" /> Live Schedule Active
             </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" onClick={() => deleteLink(link.id)} className="h-10 w-10 rounded-xl hover:text-red-500 hover:bg-red-50">
          <Trash2 className="w-4.5 h-4.5" />
        </Button>
      </div>
      <div className="pl-6 border-l border-brand-border ml-2 h-10 flex items-center">
        <Switch 
          checked={!!link.active} 
          onCheckedChange={(checked) => updateLink(link.id, { active: checked })} 
        />
      </div>
    </div>
  );
}
export function LinksEditor() {
  const links = useProfile(useShallow(s => s.links));
  const reorderLinks = useProfile(s => s.reorderLinks);
  const addLink = useProfile(s => s.addLink);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [step, setStep] = useState<'type' | 'details'>('type');
  const [newLink, setNewLink] = useState<Omit<LinkType, 'id'>>({
    title: '', subtitle: '', url: '', icon: 'Globe', active: true, animation: 'none', type: 'standard'
  });
  const sensors = useSensors(
    useSensor(PointerSensor), 
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex((l) => l.id === active.id);
      const newIndex = links.findIndex((l) => l.id === over.id);
      reorderLinks(arrayMove(links, oldIndex, newIndex));
    }
  };
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLink(newLink);
    setNewLink({ title: '', subtitle: '', url: '', icon: 'Globe', active: true, animation: 'none', type: 'standard' });
    setStep('type');
    setIsAddOpen(false);
  };
  const selectType = (typeId: LinkType['type']) => {
    const icon = typeId === 'commerce' ? 'Commerce' : typeId === 'widget' ? 'Music2' : 'Globe';
    setNewLink({ ...newLink, type: typeId, icon });
    setStep('details');
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold text-brand-text tracking-tight font-space uppercase">Inventory</h1>
              <p className="text-brand-muted text-sm font-medium">Curate and manage your primary modules.</p>
            </div>
            <Dialog open={isAddOpen} onOpenChange={(v) => { setIsAddOpen(v); if(!v) setStep('type'); }}>
              <DialogTrigger asChild>
                <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white rounded-2xl px-8 h-14 shadow-xl shadow-brand-purple/20 text-sm font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95">
                  <Plus className="w-5 h-5 mr-3" /> New Module
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-brand-text sm:max-w-[520px] rounded-[2.5rem] p-10 max-h-[90vh] overflow-y-auto border-brand-border">
                <DialogHeader className="space-y-4">
                  <DialogTitle className="text-3xl font-bold text-brand-text font-space uppercase tracking-tight">
                    {step === 'type' ? 'Select Entry Type' : 'Configure Module'}
                  </DialogTitle>
                  <DialogDescription className="text-brand-muted text-sm italic">
                    {step === 'type' 
                      ? 'Choose the format of your next digital entry.' 
                      : 'Define the details for your new curated module.'}
                  </DialogDescription>
                </DialogHeader>
                {step === 'type' ? (
                  <div className="grid grid-cols-1 gap-4 pt-8">
                    {LINK_TYPES.map(type => (
                      <button
                        key={type.id}
                        onClick={() => selectType(type.id as any)}
                        className="flex items-center gap-6 p-6 rounded-[1.5rem] border border-brand-border hover:border-brand-purple hover:bg-brand-bg transition-all group relative overflow-hidden"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-purple group-hover:scale-110 transition-transform shadow-sm">
                           <type.icon className="w-7 h-7" />
                        </div>
                        <div className="text-left flex-1">
                           <p className="font-bold text-brand-text uppercase tracking-widest text-sm mb-1">{type.name}</p>
                           <p className="text-xs text-brand-muted font-medium leading-relaxed">{type.desc}</p>
                        </div>
                        <div className="absolute right-6 opacity-0 group-hover:opacity-20 transition-opacity">
                          <Plus className="w-8 h-8" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleAddSubmit} className="space-y-8 pt-6">
                    <div className="space-y-3">
                      <Label className="font-bold text-[10px] uppercase tracking-[0.2em] text-brand-muted">Title Identity</Label>
                      <Input required value={newLink.title} onChange={(e) => setNewLink({ ...newLink, title: e.target.value })} placeholder="e.g. VISUAL PORTFOLIO 2025" className="h-14 rounded-2xl border-brand-border bg-brand-bg font-bold" />
                    </div>
                    {newLink.type === 'standard' && (
                      <div className="space-y-3">
                        <Label className="font-bold text-[10px] uppercase tracking-[0.2em] text-brand-muted">Destination URL</Label>
                        <Input required value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} placeholder="https://atelier.onyx.design" className="h-14 rounded-2xl border-brand-border bg-brand-bg" />
                      </div>
                    )}
                    {newLink.type === 'commerce' && (
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="font-bold text-[10px] uppercase tracking-[0.2em] text-brand-muted">Base Price</Label>
                          <Input type="number" required onChange={(e) => setNewLink({ ...newLink, commerce: { ...newLink.commerce!, price: Number(e.target.value), currency: 'USD', provider: 'stripe', buttonText: 'Purchase' } })} className="h-14 rounded-2xl border-brand-border bg-brand-bg" />
                        </div>
                        <div className="space-y-3">
                           <Label className="font-bold text-[10px] uppercase tracking-[0.2em] text-brand-muted">Platform Provider</Label>
                           <select className="w-full h-14 rounded-2xl border-brand-border px-4 text-sm font-bold bg-brand-bg appearance-none focus:ring-2 focus:ring-brand-purple/20 transition-all outline-none" onChange={(e) => setNewLink({ ...newLink, commerce: { ...newLink.commerce!, provider: e.target.value as any } })}>
                             {COMMERCE_PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                           </select>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between p-6 bg-brand-purple/5 rounded-[1.5rem] border border-brand-purple/10">
                       <div className="space-y-1">
                          <p className="font-bold text-xs text-brand-text flex items-center gap-2">Featured Entry <Sparkles className="w-3 h-3 text-brand-purple" /></p>
                          <p className="text-[10px] text-brand-muted uppercase tracking-wider font-medium">Highlight with cinematic glow</p>
                       </div>
                       <Switch 
                         checked={!!newLink.featured} 
                         onCheckedChange={(v) => setNewLink({ ...newLink, featured: v })} 
                       />
                    </div>
                    <div className="space-y-3 pt-4">
                      <Button type="submit" className="w-full h-16 bg-brand-purple text-white font-bold rounded-2xl shadow-xl shadow-brand-purple/20 uppercase tracking-[0.2em] text-sm transition-all hover:scale-[1.01] active:scale-95">Add Entry to Atelier</Button>
                      <Button variant="ghost" type="button" onClick={() => setStep('type')} className="w-full text-brand-muted text-[10px] font-bold uppercase tracking-widest h-10 hover:bg-brand-bg rounded-xl">Back to Types</Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={links.map(l => l.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-1">
                <AnimatePresence>
                  {links.map((link) => (
                    <SortableLinkCard key={link.id} link={link} />
                  ))}
                </AnimatePresence>
                {links.length === 0 && (
                  <div className="text-center py-24 bg-brand-bg/50 rounded-[3rem] border-2 border-dashed border-brand-border">
                    <p className="text-brand-muted font-serif italic text-lg">Your inventory is empty. Add your first entry.</p>
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
        <div className="hidden lg:block lg:col-span-5 relative">
          <ProfilePreview />
        </div>
      </div>
    </div>
  );
}