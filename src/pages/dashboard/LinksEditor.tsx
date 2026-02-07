import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { useShallow } from 'zustand/react/shallow';
import { CSS } from '@dnd-kit/utilities';
import { Plus, GripVertical, Trash2, Search, CreditCard, Play, Globe, Sparkles, Clock } from 'lucide-react';
import { useProfile, Link as LinkType } from '@/store/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
        "bg-white border border-brand-border rounded-2xl p-5 mb-4 flex items-center gap-4 group transition-all",
        isDragging ? "shadow-2xl ring-2 ring-brand-purple" : "hover:border-brand-purple/30 shadow-sm",
        !link.active && "opacity-60 grayscale-[0.5]"
      )}
    >
      <button {...attributes} {...listeners} className="cursor-grab text-brand-muted hover:text-brand-purple p-1">
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-brand-purple border border-brand-border shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
           <h4 className="font-bold text-sm text-brand-text truncate">{link.title}</h4>
           {link.featured && <Sparkles className="w-3 h-3 text-brand-purple" />}
           {link.type !== 'standard' && (
             <span className="text-[8px] font-bold bg-brand-bg text-brand-purple px-1.5 py-0.5 rounded border border-brand-purple/10 uppercase tracking-tighter">
               {link.type}
             </span>
           )}
        </div>
        <p className="text-xs text-brand-muted font-medium truncate">{link.url || 'Embed/Widget'}</p>
        <div className="flex items-center gap-4 mt-1">
          {link.schedule?.enabled && (
             <span className="text-[10px] font-bold text-brand-purple flex items-center gap-1">
               <Clock className="w-3 h-3" /> Scheduled
             </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" onClick={() => deleteLink(link.id)} className="h-8 w-8 rounded-lg hover:text-red-500 hover:bg-red-50">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="pl-4 border-l border-brand-border ml-2">
        <Switch checked={link.active} onCheckedChange={(checked) => updateLink(link.id, { active: checked })} />
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
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
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
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-brand-text">Links & Modules</h1>
            <Dialog open={isAddOpen} onOpenChange={(v) => { setIsAddOpen(v); if(!v) setStep('type'); }}>
              <DialogTrigger asChild>
                <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl px-6 h-12 shadow-lg shadow-brand-purple/20">
                  <Plus className="w-4 h-4 mr-2" /> New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-brand-text sm:max-w-[480px] rounded-3xl p-8 max-h-[90vh] overflow-y-auto border-brand-border">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-brand-text">
                    {step === 'type' ? 'Select Entry Type' : 'Configure Entry'}
                  </DialogTitle>
                </DialogHeader>
                {step === 'type' ? (
                  <div className="grid grid-cols-1 gap-4 pt-6">
                    {LINK_TYPES.map(type => (
                      <button
                        key={type.id}
                        onClick={() => selectType(type.id as any)}
                        className="flex items-center gap-6 p-6 rounded-2xl border border-brand-border hover:border-brand-purple hover:bg-brand-bg transition-all group"
                      >
                        <div className="w-14 h-14 rounded-xl bg-brand-bg flex items-center justify-center text-brand-purple group-hover:scale-110 transition-transform">
                           <type.icon className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                           <p className="font-bold text-brand-text uppercase tracking-widest text-sm">{type.name}</p>
                           <p className="text-xs text-brand-muted font-medium">{type.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleAddSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <Label className="font-bold text-[10px] uppercase tracking-widest text-brand-muted">Title</Label>
                      <Input required value={newLink.title} onChange={(e) => setNewLink({ ...newLink, title: e.target.value })} placeholder="Entry Display Title" className="h-12 rounded-xl border-brand-border bg-brand-bg" />
                    </div>
                    {newLink.type === 'standard' && (
                      <div className="space-y-2">
                        <Label className="font-bold text-[10px] uppercase tracking-widest text-brand-muted">Destination URL</Label>
                        <Input required value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} placeholder="https://..." className="h-12 rounded-xl border-brand-border bg-brand-bg" />
                      </div>
                    )}
                    {newLink.type === 'commerce' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="font-bold text-[10px] uppercase tracking-widest text-brand-muted">Price</Label>
                          <Input type="number" required onChange={(e) => setNewLink({ ...newLink, commerce: { ...newLink.commerce!, price: Number(e.target.value), currency: 'USD', provider: 'stripe', buttonText: 'Purchase' } })} className="h-12 rounded-xl border-brand-border" />
                        </div>
                        <div className="space-y-2">
                           <Label className="font-bold text-[10px] uppercase tracking-widest text-brand-muted">Provider</Label>
                           <select className="w-full h-12 rounded-xl border-brand-border px-4 text-sm font-bold bg-brand-bg" onChange={(e) => setNewLink({ ...newLink, commerce: { ...newLink.commerce!, provider: e.target.value as any } })}>
                             {COMMERCE_PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                           </select>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between p-4 bg-brand-bg rounded-xl border border-brand-border">
                       <div className="space-y-1">
                          <p className="font-bold text-xs text-brand-text">Featured Link</p>
                          <p className="text-[10px] text-brand-muted uppercase">Spotlight this entry with animations</p>
                       </div>
                       <Switch checked={newLink.featured} onCheckedChange={(v) => setNewLink({ ...newLink, featured: v })} />
                    </div>
                    <Button type="submit" className="w-full h-14 bg-brand-purple text-white font-bold rounded-xl mt-4 shadow-lg shadow-brand-purple/20 uppercase tracking-widest text-sm">Add to Atelier</Button>
                    <Button variant="ghost" onClick={() => setStep('type')} className="w-full text-brand-muted text-xs font-bold uppercase tracking-widest">Back to Types</Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={links.map(l => l.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                <AnimatePresence>
                  {links.map((link) => (
                    <SortableLinkCard key={link.id} link={link} />
                  ))}
                </AnimatePresence>
              </div>
            </SortableContext>
          </DndContext>
        </div>
        <div className="hidden lg:block lg:col-span-5 relative"><ProfilePreview /></div>
      </div>
    </div>
  );
}