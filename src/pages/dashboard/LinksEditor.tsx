import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Plus,
  GripVertical,
  Trash2,
  Globe,
  Instagram,
  Mail,
  Twitter,
  Youtube,
  Linkedin
} from 'lucide-react';
import { useProfile, Link as LinkType } from '@/store/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
const iconMap: Record<string, any> = { Globe, Instagram, Mail, Twitter, Youtube, Linkedin };
function SortableLinkCard({ link }: { link: LinkType }) {
  const updateLink = useProfile((s) => s.updateLink);
  const deleteLink = useProfile((s) => s.deleteLink);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: link.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };
  const IconComponent = iconMap[link.icon] || Globe;
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "glass-card border-white/5 p-4 mb-4 flex items-center gap-4",
        isDragging && "opacity-50 scale-105",
        !link.active && "opacity-60 grayscale"
      )}
    >
      <button {...attributes} {...listeners} className="cursor-grab text-onyx-gray hover:text-onyx-gold p-1">
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="w-10 h-10 rounded bg-onyx-dark border border-white/10 flex items-center justify-center text-onyx-gold">
        <IconComponent className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-ornament text-sm tracking-widest text-onyx-white uppercase truncate">{link.title}</h4>
        <p className="text-xs text-onyx-gray truncate italic font-serif">{link.subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <Switch
          checked={link.active}
          onCheckedChange={(checked) => updateLink(link.id, { active: checked })}
        />
        <Button
          variant="ghost"
          size="icon"
          className="text-onyx-gray hover:text-red-400"
          onClick={() => deleteLink(link.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
export function LinksEditor() {
  const links = useProfile((s) => s.links);
  const reorderLinks = useProfile((s) => s.reorderLinks);
  const addLink = useProfile((s) => s.addLink);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', subtitle: '', url: '', icon: 'Globe', active: true });
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
    setNewLink({ title: '', subtitle: '', url: '', icon: 'Globe', active: true });
    setIsAddOpen(false);
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-onyx-white uppercase tracking-wider">Links</h1>
          <p className="text-onyx-gray font-serif italic">Curate your digital connections.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-onyx-gold hover:bg-onyx-gold-light text-onyx-dark font-ornament tracking-widest px-6">
              <Plus className="w-4 h-4 mr-2" /> ADD NEW
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-onyx-secondary border-white/10 text-onyx-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-display uppercase tracking-widest text-onyx-gold">New Link</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="font-ornament text-[10px] tracking-widest uppercase">Display Title</Label>
                <Input
                  required
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  placeholder="PORTFOLIO"
                  className="bg-white/5 border-white/10 rounded-none focus-visible:ring-onyx-gold/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-ornament text-[10px] tracking-widest uppercase">Subtitle (Optional)</Label>
                <Input
                  value={newLink.subtitle}
                  onChange={(e) => setNewLink({ ...newLink, subtitle: e.target.value })}
                  placeholder="View my latest works"
                  className="bg-white/5 border-white/10 rounded-none focus-visible:ring-onyx-gold/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-ornament text-[10px] tracking-widest uppercase">Destination URL</Label>
                <Input
                  required
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  placeholder="https://..."
                  className="bg-white/5 border-white/10 rounded-none focus-visible:ring-onyx-gold/50"
                />
              </div>
              <Button type="submit" className="w-full bg-onyx-gold text-onyx-dark font-ornament tracking-[0.2em] rounded-none py-6 mt-4">
                CREATE LINK
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={links.map(l => l.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-1">
            {links.map((link) => (
              <SortableLinkCard key={link.id} link={link} />
            ))}
            {links.length === 0 && (
              <div className="border-2 border-dashed border-white/5 rounded-lg p-12 text-center">
                <p className="text-onyx-gray-dark font-serif italic">Your atelier is empty. Add your first link to begin.</p>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}