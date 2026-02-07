import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, GripVertical, Trash2, Calendar, Search } from 'lucide-react';
import { useProfile, Link as LinkType } from '@/store/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProfilePreview } from '@/components/dashboard/ProfilePreview';
import { cn } from '@/lib/utils';
import { ICON_OPTIONS } from '@/lib/constants';
function SortableLinkCard({ link }: { link: LinkType }) {
  const updateLink = useProfile((s) => s.updateLink);
  const deleteLink = useProfile((s) => s.deleteLink);
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
      <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-brand-purple border border-brand-border">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-brand-text truncate">{link.title}</h4>
        <p className="text-xs text-brand-muted font-medium truncate">{link.url}</p>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-[10px] font-bold text-brand-muted flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Added recently
          </span>
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
  const links = useProfile((s) => s.links);
  const reorderLinks = useProfile((s) => s.reorderLinks);
  const addLink = useProfile((s) => s.addLink);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [newLink, setNewLink] = useState<Omit<LinkType, 'id'>>({
    title: '',
    subtitle: '',
    url: '',
    icon: 'Globe',
    active: true,
    animation: 'none'
  });
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const filteredIcons = ICON_OPTIONS.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
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
    setNewLink({ title: '', subtitle: '', url: '', icon: 'Globe', active: true, animation: 'none' });
    setIsAddOpen(false);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-brand-text">Links</h1>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl px-6 h-12 shadow-lg shadow-brand-purple/20">
                  <Plus className="w-4 h-4 mr-2" /> Add Link
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-brand-text sm:max-w-[425px] rounded-3xl p-8 max-h-[90vh] overflow-y-auto border-brand-border">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-brand-text">New Link</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddSubmit} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-wider text-brand-muted">Title</Label>
                    <Input required value={newLink.title} onChange={(e) => setNewLink({ ...newLink, title: e.target.value })} placeholder="My Portfolio" className="h-12 rounded-xl border-brand-border bg-brand-bg text-brand-text" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-wider text-brand-muted">URL</Label>
                    <Input required value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} placeholder="https://..." className="h-12 rounded-xl border-brand-border bg-brand-bg text-brand-text" />
                  </div>
                  <div className="space-y-4 pt-2">
                    <Label className="font-bold text-xs uppercase tracking-wider text-brand-muted">Select Icon</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search icons..." className="pl-10 h-10 rounded-xl border-brand-border bg-brand-bg text-brand-text" />
                    </div>
                    <div className="grid grid-cols-7 gap-2 h-40 overflow-y-auto p-2 border border-brand-border rounded-xl bg-brand-bg">
                      {filteredIcons.map((i) => (
                        <button key={i.id} type="button" onClick={() => setNewLink({ ...newLink, icon: i.id })} className={cn("aspect-square flex items-center justify-center rounded-lg border transition-all", newLink.icon === i.id ? "bg-brand-purple text-white border-brand-purple shadow-sm" : "hover:bg-white text-brand-muted border-transparent")}>
                          <i.icon className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 bg-brand-purple text-white font-bold rounded-xl mt-4 shadow-lg shadow-brand-purple/20">Add to Profile</Button>
                </form>
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
                {links.length === 0 && (
                  <div className="bg-white border-2 border-dashed border-brand-border rounded-3xl p-20 text-center space-y-4">
                    <h3 className="font-bold text-brand-text">No links yet</h3>
                    <Button onClick={() => setIsAddOpen(true)} className="bg-brand-purple text-white rounded-xl">Add First Link</Button>
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
        <div className="hidden lg:block lg:col-span-5 relative"><ProfilePreview /></div>
      </div>
    </div>
  );
}